import { defineStore } from "pinia";
import { Product, ProductCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import { helpers } from "@/helpers/helper";

export const productStore = defineStore("product", {
  state: () => ({
    productPage: 1,
    productsPerPage: 12,
    categories: [],
    product: {},
    products: [],
    searchKey: "",
    filterCategory: [],
    filterPrice: [],
    sortBy: "",
    categoryDictionary: {},
    mobileFilterDrawer: false,
  }),
  getters: {
    allFilters() {
      const filterCategories = this.filterCategory.map((categoryId) =>
        get(this.categoryDictionary, categoryId, "Danh mục khác")
      );
      const filterPrices = this.filterPrice.map((filterPrice) =>
        helpers.getFilterPriceText(filterPrice)
      );
      let filters = filterCategories.concat(filterPrices);
      if (this.searchKey) filters.push("Từ khoá: " + this.searchKey);
      return filters;
    },
    slicedProducts() {
      if (!this.products || this.products.length == 0) return [];
      return this.filteredProducts.slice(
        (this.productPage - 1) * this.productsPerPage,
        this.productPage * this.productsPerPage
      );
    },
    filteredProducts() {
      if (!this.products || this.products.length == 0) return [];
      let filtered = this.sortedProducts;
      if (this.searchKey)
        filtered = filtered.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            product.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            product.origin
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterCategory && this.filterCategory.length > 0) {
        filtered = filtered.filter((product) =>
          this.filterCategory.includes(product.productCategory.id)
        );
      }
      if (this.filterPrice && this.filterPrice.length > 0) {
        filtered = filtered.filter((product) => {
          if (!product.price || +product.price < 0) return false;
          if (
            this.filterPrice.includes("lowerThan500k") &&
            +product.price < 500000
          )
            return true;
          if (
            this.filterPrice.includes("between500kAnd1mil") &&
            +product.price >= 500000 &&
            +product.price < 1000000
          )
            return true;
          if (
            this.filterPrice.includes("between1mAnd5mil") &&
            +product.price >= 1000000 &&
            +product.price < 5000000
          )
            return true;
          if (
            this.filterPrice.includes("over5mil") &&
            +product.price >= 5000000
          )
            return true;
          return false;
        });
      }

      return filtered;
    },
    sortedProducts() {
      if (!this.products || this.products.length == 0) return [];
      let sortedProducts = this.products;
      if (!this.sortBy) return sortedProducts;
      switch (this.sortBy) {
        case "name:asc":
          sortedProducts.sort((a, b) => a.name.localeCompare(b.title));
          break;
        case "name:desc":
          sortedProducts.sort((a, b) => b.name.localeCompare(a.title));
          break;
        default:
        case "newest":
          sortedProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedProducts.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "price:asc":
          sortedProducts
            // .filter((voucher) => voucher.price)
            .sort((a, b) => a.price - b.price);
          break;
        case "price:desc":
          sortedProducts
            // .filter((voucher) => voucher.price)
            .sort((a, b) => b.price - a.price);
          break;
      }
      return sortedProducts;
    },
    totalProductPage() {
      if (!this.products || this.filteredProducts.length == 0) return 1;
      if (this.filteredProducts.length % this.productsPerPage == 0)
        return this.filteredProducts.length / this.productsPerPage;
      else
        return (
          Math.floor(this.filteredProducts.length / this.productsPerPage) + 1
        );
    },
    totalFilteredProduct() {
      if (!this.products || this.products.length == 0) return 0;
      return this.filteredProducts.length;
    },
    totalProduct() {
      if (!this.products || this.filteredProducts.length == 0) return 0;
      return this.products.length;
    },
  },
  actions: {
    resetFilter() {
      this.searchKey = "";
      this.filterCategory = [];
      this.filterPrice = [];
    },
    async fetchProducts() {
      try {
        loading.show();
        const res = await Product.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching products!",
            "Please try again later!"
          );
          return;
        }
        const products = get(res, "data.data", []);
        if (!products && products.length == 0) return;
        const mappedProducts = products
          .filter((product) => product.attributes.status == "publish")
          .map((product) => {
            return {
              id: product.id,
              ...product.attributes,
              productCategory: {
                id: get(product, "attributes.productCategory.data.id", -1),
                ...get(
                  product,
                  "attributes.productCategory.data.attributes",
                  {}
                ),
              },
              author: get(product, "attributes.user.data.attributes", {}),
            };
          });
        this.products = mappedProducts;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await ProductCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching product categories!",
            "Please try again later!"
          );
          return;
        }
        const categories = get(res, "data.data", []);
        if (!categories && categories.length == 0) return;
        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
          };
        });
        this.categories = mappedCategories;
        this.categoryDictionary = Object.fromEntries(
          this.categories.map((x) => [x.id, x.name])
        );
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchProduct(productCode) {
      try {
        loading.show();
        const res = await Product.fetch({
          populate: "*",
          filters: {
            code: productCode,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const products = get(res, "data.data", []);
        if (!products || products.length == 0) return;
        this.product = {
          id: products[0],
          ...products[0].attributes,
        };
        this.product.productCategory = get(
          this.product,
          "productCategory.data.attributes.name",
          "---"
        );
        this.product.user = get(this.product, "user.data.attributes");
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

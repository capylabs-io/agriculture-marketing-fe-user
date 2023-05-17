import { defineStore } from "pinia";
import { Product } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const productStore = defineStore("product", {
  state: () => ({
    productPage: 1,
    productsPerPage: 12,
    categories: [],
    product: {},
    products: [],
    searchKey: "",
  }),
  getters: {
    slicedProducts() {
      if (!this.products || this.products.length == 0) return [];
      return this.filteredProducts.slice(
        (this.productPage - 1) * this.productsPerPage,
        this.productPage * this.productsPerPage
      );
    },
    filteredProducts() {
      if (!this.products || this.products.length == 0) return [];
      let filtered = this.products;
      if (this.searchKey)
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
            product.code.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
            product.origin.toLowerCase().includes(this.searchKey.trim().toLowerCase())
        );
      return filtered;
    },
    // sortedCampaigns() {
    //   if (!this.voucherData || this.voucherData.length == 0) return [];
    //   let sortedCampaigns = this.voucherData;
    //   if (!this.sortBy) return sortedCampaigns;
    //   switch (this.sortBy) {
    //     default:
    //     case "asc":
    //       sortedCampaigns.sort((a, b) => a.title.localeCompare(b.title));
    //       break;
    //     case "desc":
    //       sortedCampaigns.sort((a, b) => b.title.localeCompare(a.title));
    //       break;
    //     case "newest":
    //       sortedCampaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    //       break;
    //     case "oldest":
    //       sortedCampaigns.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    //       break;
    //     case "priceUp":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => a.price - b.price);
    //       break;
    //     case "priceDown":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => b.price - a.price);
    //       break;
    //   }
    //   return sortedCampaigns;
    // },
    totalProductPage() {
      if (!this.products || this.filteredProducts.length == 0) return 1;
      if (this.filteredProducts.length % this.productsPerPage == 0)
        return this.filteredProducts.length / this.productsPerPage;
      else return Math.floor(this.filteredProducts.length / this.productsPerPage) + 1;
    },
    totalProduct() {
      if (!this.products || this.filteredProducts.length == 0) return 1;
      return this.filteredProducts.length;
    },
  },
  actions: {
    async fetchProducts() {
      try {
        loading.show();
        const res = await Product.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching products!", "Please try again later!");
          return;
        }
        const products = get(res, "data.data", []);
        if (!products && products.length == 0) return;
        const mappedProducts = products.map((product) => {
          return {
            id: product.id,
            ...product.attributes,
            productCategory: get(product, "attributes.productCategory.data.attributes", {}),
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
        this.product.productCategory = get(this.product, "productCategory.data.attributes.name", "---");
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

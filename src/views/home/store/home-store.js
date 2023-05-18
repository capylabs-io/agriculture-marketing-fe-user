import { defineStore } from "pinia";
import { Product, ProductCategory, Seed, SeedCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const homeStore = defineStore("home", {
  state: () => ({
    productCategory: "",
    productCategories: [],
    products: [],
    seedCategory: "",
    seedCategories: [],
    seeds: [],
  }),
  getters: {
    slicedProducts() {
      if (!this.products || this.products.length == 0) return [];
      return this.filteredProducts.slice(0, 9);
    },
    filteredProducts() {
      if (!this.products || this.products.length == 0) return [];
      if (!this.productCategory) return this.products;
      return this.products.filter(
        (product) =>
          product.productCategory &&
          product.productCategory.id == this.productCategory
      );
    },
    slicedSeeds() {
      if (!this.seeds || this.seeds.length == 0) return [];
      return this.filteredSeeds.slice(0, 9);
    },
    filteredSeeds() {
      if (!this.seeds || this.seeds.length == 0) return [];
      if (!this.seedCategory) return this.seeds;
      return this.seeds.filter(
        (seed) => seed.seedCategory && seed.seedCategory.id == this.seedCategory
      );
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
          alert.error(
            "Error occurred when fetching products!",
            "Please try again later!"
          );
          return;
        }
        const products = get(res, "data.data", []);
        if (!products && products.length == 0) return;
        const mappedProducts = products.map((product) => {
          return {
            id: product.id,
            ...product.attributes,
            productCategory: {
              id: get(product, "attributes.productCategory.data.id", -1),
              ...get(product, "attributes.productCategory.data.attributes", {}),
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
    async fetchProductCategories() {
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
        this.productCategories = mappedCategories;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchSeeds() {
      try {
        loading.show();
        const res = await Seed.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching seeds!",
            "Please try again later!"
          );
          return;
        }
        const seeds = get(res, "data.data", []);
        if (!seeds && seeds.length == 0) return;
        const mappedSeeds = seeds.map((seed) => {
          return {
            id: seed.id,
            ...seed.attributes,
            seedCategory: {
              id: get(seed, "attributes.seedCategory.data.id", -1),
              ...get(seed, "attributes.seedCategory.data.attributes", {}),
            },
            author: get(seed, "attributes.user.data.attributes", {}),
          };
        });
        this.seeds = mappedSeeds;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchSeedCategories() {
      try {
        loading.show();
        const res = await SeedCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching seed categories!",
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
        this.seedCategories = mappedCategories;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

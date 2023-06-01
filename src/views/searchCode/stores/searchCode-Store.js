import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import { helpers } from "@/helpers/helper";
import { Product, Seed, Supply } from "@/plugins/api";

export const searchCodeStore = defineStore("searchCode", {
  state: () => ({
    searchResultsPage: 1,
    searchResultsPerPage: 12,
    categories: [],
    searchCode: "",
    productPage: 1,
    productsPerPage: 12,
    products: [],
    supplies: [],
    seeds: [],
    // searchResults: [],
    // searchCodes: [],
    searchKey: "",
    filterCategory: [],
    filterPrice: [],
    sortBy: "",
    categoryDictionary: {},
    mobileFilterDrawer: false,
  }),
  getters: {
    searchResults() {
      const results = [];
      return results.concat(this.seeds, this.products, this.supplies);
    },
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
    slicedsearchResults() {
      if (!this.searchResults || this.searchResults.length == 0) return [];
      return this.searchResults.slice(
        (this.searchResultsPage - 1) * this.searchResultsPerPage,
        this.searchResultsPage * this.searchResultsPerPage
      );
    },
    totalsearchResultsPage() {
      if (!this.searchResults || this.searchResults.length == 0) return 1;
      if (this.searchResults.length % this.searchResultsPerPage == 0)
        return this.searchResults.length / this.searchResultsPerPage;
      else
        return (
          Math.floor(this.searchResults.length / this.searchResultsPerPage) + 1
        );
    },

    totalsearchCode() {
      if (!this.searchCodes || this.filteredsearchCodes.length == 0) return 0;
      return this.searchCodes.length;
    },
    searchCodeImages() {
      if (!this.searchCode) return [];
      let images = [this.searchCode.images];
      if (
        this.searchCode.imageCollection &&
        this.searchCode.imageCollection.length > 0
      )
        images = images.concat(this.searchCode.imageCollection);
      return images;
    },
  },
  actions: {
    resetFilter() {
      this.searchKey = "";
      this.filterCategory = [];
      this.filterPrice = [];
    },
    async fetchsearchCodes(code) {
      try {
        loading.show();
        const [productRes, supplyRes, seedlingRes] = await Promise.all([
          Product.fetch({
            sort: "updatedAt:desc",
            populate: "*",
          }),
          Supply.fetch({
            sort: "updatedAt:desc",
            populate: "*",
          }),
          Seed.fetch({ sort: "updatedAt:desc", populate: "*" }),
        ]);

        console.log(code);
        const products = get(productRes, "data.data", []);
        const supplies = get(supplyRes, "data.data", []);
        const seeds = get(seedlingRes, "data.data", []);

        if (!products && products.length == 0) return;
        const mappedProducts = products
          .filter((product) => product.attributes.status == "publish")
          .filter((product) =>
            product.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((product) => {
            return {
              //   id: product.id,
              code: product.attributes.code,
              images: product.attributes.images,
              name: product.attributes.name,
              price: product.attributes.price,
              type: "product",
            };
          });

        if (!supplies && supplies.length == 0) return;
        const mappedSupplies = supplies
          .filter((supply) => supply.attributes.status == "publish")
          .filter((supply) =>
            supply.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((supply) => {
            return {
              //   id: supply.id,
              code: supply.attributes.code,
              images: supply.attributes.images,
              name: supply.attributes.name,
              price: supply.attributes.price,
              type: "supply",
            };
          });

        if (!seeds && seeds.length == 0) return;
        const mappedSeeds = seeds
          .filter((seed) => seed.attributes.status == "publish")
          .filter((seed) =>
            seed.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((seed) => {
            return {
              //   id: seed.id,
              code: seed.attributes.code,
              images: seed.attributes.images,
              name: seed.attributes.name,
              price: seed.attributes.price,
              type: "seed",
            };
          });
        this.seeds = mappedSeeds;
        this.supplies = mappedSupplies;
        this.products = mappedProducts;
        console.log("Search Result", this.searchResults);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

import { defineStore } from "pinia";
// import { Htx, HtxCategory } from "@/plugins/api.js";
import { Cooperative, CooperativeCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const htxStore = defineStore("htx", {
  state: () => ({
    htxPage: 1,
    htxsPerPage: 12,
    categories: [],
    htx: {},
    htxs: [],
    searchKey: "",
    filterCategory: null,
    sortBy: "",
    categoryDictionary: {},
    mobileFilterDrawer: false,

    products: [],
    productPage: 1,
    productsPerPage: 6,
  }),
  getters: {
    slicedHtxs() {
      if (!this.htxs || this.htxs.length == 0) return [];
      return this.filteredHtxs.slice(
        (this.htxPage - 1) * this.htxsPerPage,
        this.htxPage * this.htxsPerPage
      );
    },
    filteredHtxs() {
      if (!this.htxs || this.htxs.length == 0) return [];
      let filtered = this.sortedHtxs;
      if (this.searchKey)
        filtered = filtered.filter(
          (htx) =>
            htx.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            htx.code.toLowerCase().includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterCategory) {
        filtered = filtered.filter(
          (htx) => this.filterCategory.id == htx.htxCategory.id
        );
      }
      return filtered;
    },
    sortedHtxs() {
      if (!this.htxs || this.htxs.length == 0) return [];
      let sortedHtxs = this.htxs;
      if (!this.sortBy) return sortedHtxs;
      switch (this.sortBy) {
        case "name:asc":
          sortedHtxs.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name:desc":
          sortedHtxs.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
        case "newest":
          sortedHtxs.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedHtxs.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
      return sortedHtxs;
    },
    totalHtxPage() {
      if (!this.htxs || this.filteredHtxs.length == 0) return 1;
      if (this.filteredHtxs.length % this.htxsPerPage == 0)
        return this.filteredHtxs.length / this.htxsPerPage;
      else return Math.floor(this.filteredHtxs.length / this.htxsPerPage) + 1;
    },
    totalFilteredHtx() {
      if (!this.htxs || this.htxs.length == 0) return 0;
      return this.filteredHtxs.length;
    },
    totalHtx() {
      if (!this.htxs || this.filteredHtxs.length == 0) return 0;
      return this.htxs.length;
    },
    htxImages() {
      if (!this.htx) return [];
      let images = [this.htx.images];
      if (this.htx.imageCollection && this.htx.imageCollection.length > 0)
        images = images.concat(this.htx.imageCollection);
      return images;
    },
    totalProductPage() {
      if (!this.products || this.products.length == 0) return 1;
      if (this.products.length % this.productsPerPage == 0)
        return this.products.length / this.productsPerPage;
      else return Math.floor(this.products.length / this.productsPerPage) + 1;
    },
    slicedProducts() {
      if (!this.products || this.products.length == 0) return [];
      return this.products.slice(
        (this.productPage - 1) * this.productsPerPage,
        this.productPage * this.productsPerPage
      );
    },
  },
  actions: {
    resetFilter() {
      this.searchKey = "";
      this.filterCategory = [];
      this.filterPrice = [];
    },
    async fetchHtxs() {
      try {
        loading.show();
        // const res = await Htx.fetch({
        //   populate: "*",
        // });
        const res = await Cooperative.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching htxs!",
            "Please try again later!"
          );
          return;
        }
        const htxs = get(res, "data.data", []);
        if (!htxs && htxs.length == 0) return;
        const mappedHtxs = htxs.map((htx) => {
          return {
            id: htx.id,
            ...htx.attributes,
            htxCategory: {
              id: get(htx, "attributes.cooperativeCategory.data.id", -1),
              ...get(htx, "attributes.cooperativeCategory.data.attributes", {}),
            },
          };
        });

        this.htxs = mappedHtxs;
        console.log("htxs", this.htxs);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await CooperativeCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching htx categories!",
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
    async fetchHtx(htxCode) {
      try {
        loading.show();
        // const res = await Htx.fetch({
        //   populate: "*",
        //   filters: {
        //     code: htxCode,
        //   },
        // });
        const res = await Cooperative.fetch({
          populate: "*",
          filters: {
            code: htxCode,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const htxs = get(res, "data.data", []);
        if (!htxs || htxs.length == 0) return;
        this.htx = {
          id: htxs[0],
          ...htxs[0].attributes,
          htxCategory: get(
            htxs[0],
            "attributes.cooperativeCategory.data.attributes.name",
            "---"
          ),
          products: get(htxs[0], "attributes.products.data", []),
          certification: get(htxs[0], "attributes.certification", []),

        };
        this.products = this.htx.products
          .filter((product) => product.attributes.status == "publish")
          .map((product) => {
            return {
              id: product.id,
              ...product.attributes,
            };
          });
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

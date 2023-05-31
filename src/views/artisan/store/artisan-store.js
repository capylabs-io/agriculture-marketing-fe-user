import { defineStore } from "pinia";
// import { Artisan, ArtisanCategory } from "@/plugins/api.js";
import { Artisan, ArtisanCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const artisanStore = defineStore("artisan", {
  state: () => ({
    artisanPage: 1,
    artisansPerPage: 12,
    categories: [],
    artisan: {},
    artisans: [],
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
    slicedArtisans() {
      if (!this.artisans || this.artisans.length == 0) return [];
      return this.filteredArtisans.slice(
        (this.artisanPage - 1) * this.artisansPerPage,
        this.artisanPage * this.artisansPerPage
      );
    },
    filteredArtisans() {
      if (!this.artisans || this.artisans.length == 0) return [];
      let filtered = this.sortedArtisans;
      if (this.searchKey)
        filtered = filtered.filter(
          (artisan) =>
            artisan.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            artisan.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterCategory) {
        filtered = filtered.filter(
          (artisan) => this.filterCategory.id == artisan.artisanCategory.id
        );
      }
      return filtered;
    },
    sortedArtisans() {
      if (!this.artisans || this.artisans.length == 0) return [];
      let sortedArtisans = this.artisans;
      if (!this.sortBy) return sortedArtisans;
      switch (this.sortBy) {
        case "name:asc":
          sortedArtisans.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name:desc":
          sortedArtisans.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
        case "newest":
          sortedArtisans.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedArtisans.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
      return sortedArtisans;
    },
    totalArtisanPage() {
      if (!this.artisans || this.filteredArtisans.length == 0) return 1;
      if (this.filteredArtisans.length % this.artisansPerPage == 0)
        return this.filteredArtisans.length / this.artisansPerPage;
      else
        return (
          Math.floor(this.filteredArtisans.length / this.artisansPerPage) + 1
        );
    },
    totalFilteredArtisan() {
      if (!this.artisans || this.artisans.length == 0) return 0;
      return this.filteredArtisans.length;
    },
    totalArtisan() {
      if (!this.artisans || this.filteredArtisans.length == 0) return 0;
      return this.artisans.length;
    },
    artisanImages() {
      if (!this.artisan) return [];
      let images = [this.artisan.images];
      if (
        this.artisan.imageCollection &&
        this.artisan.imageCollection.length > 0
      )
        images = images.concat(this.artisan.imageCollection);
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
    async fetchArtisans() {
      try {
        loading.show();
        const res = await Artisan.fetch({
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching artisans!",
            "Please try again later!"
          );
          return;
        }
        const artisans = get(res, "data.data", []);
        if (!artisans && artisans.length == 0) return;
        const mappedArtisans = artisans.map((artisan) => {
          return {
            id: artisan.id,
            ...artisan.attributes,
            artisanCategory: {
              id: get(artisan, "attributes.artisanCategory.data.id", -1),
              ...get(artisan, "attributes.artisanCategory.data.attributes", {}),
            },
          };
        });

        this.artisans = mappedArtisans;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await ArtisanCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching artisan categories!",
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
    async fetchArtisan(artisanCode) {
      try {
        loading.show();
        const res = await Artisan.fetch({
          sort: "updatedAt:desc",
          populate: "*",
          filters: {
            code: artisanCode,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const artisans = get(res, "data.data", []);
        if (!artisans || artisans.length == 0) return;
        this.artisan = {
          id: artisans[0],
          ...artisans[0].attributes,
          artisanCategory: get(
            artisans[0],
            "attributes.artisanCategory.data.attributes.name",
            []
          ),
          products: get(artisans[0], "attributes.products.data", []),
        };
        this.products = this.artisan.products
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

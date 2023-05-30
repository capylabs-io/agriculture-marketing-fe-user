import { defineStore } from "pinia";
// import { Artisan, ArtisanCategory } from "@/plugins/api.js";
import { Product, ProductCategory } from "@/plugins/api.js";
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
    allFilters() {
      let filters = [];
      if (this.filterCategory) filters.push(this.filterCategory.name);
      if (this.searchKey) filters.push("Từ khoá: " + this.searchKey);
      return filters;
    },
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
              .includes(this.searchKey.trim().toLowerCase()) ||
            artisan.origin
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
          sortedArtisans.sort((a, b) => a.name.localeCompare(b.title));
          break;
        case "name:desc":
          sortedArtisans.sort((a, b) => b.name.localeCompare(a.title));
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
      return this.filteredArtisans.slice(
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
        // const res = await Artisan.fetch({
        //   populate: "*",
        // });
        const res = await Product.fetch({
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
        // const mappedArtisans = artisans
        //   .filter((artisan) => artisan.attributes.status == "publish")
        //   .map((artisan) => {
        //     return {
        //       id: artisan.id,
        //       ...artisan.attributes,
        //       artisanCategory: {
        //         id: get(artisan, "attributes.artisanCategory.data.id", -1),
        //         ...get(artisan, "attributes.artisanCategory.data.attributes", {}),
        //       },
        //       author: get(artisan, "attributes.user.data.attributes", {}),
        //     };
        //   });
        const mappedArtisans = artisans
          .filter((artisan) => artisan.attributes.status == "publish")
          .map((artisan) => {
            return {
              id: artisan.id,
              ...artisan.attributes,
              artisanCategory: {
                id: get(artisan, "attributes.productCategory.data.id", -1),
                ...get(
                  artisan,
                  "attributes.productCategory.data.attributes",
                  {}
                ),
              },
              author: get(artisan, "attributes.user.data.attributes", {}),
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
        // const res = await ArtisanCategory.fetch();
        const res = await ProductCategory.fetch();
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
        // const res = await Artisan.fetch({
        //   populate: "*",
        //   filters: {
        //     code: artisanCode,
        //   },
        // });
        const res = await Product.fetch({
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
        };
        // this.artisan.artisanCategory = get(
        //   this.artisan,
        //   "artisanCategory.data.attributes.name",
        //   "---"
        // );
        this.artisan.artisanCategory = get(
          this.artisan,
          "productCategory.data.attributes.name",
          "---"
        );
        this.artisan.user = get(this.artisan, "user.data.attributes");
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

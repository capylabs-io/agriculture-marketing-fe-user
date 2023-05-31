import { defineStore } from "pinia";
import { Area, AreaCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const regionStore = defineStore("region", {
  state: () => ({
    regionPage: 1,
    regionsPerPage: 12,
    categories: [],
    region: {},
    regions: [],
    searchKey: "",
    filterCategory: null,
    sortBy: "",
    categoryDictionary: {},
    mobileFilterDrawer: false,

    products: [],
    productPage: 1,
    productsPerPage: 6,
    htxs: [],
    htxPage: 1,
    htxsPerPage: 6,
  }),
  getters: {
    slicedRegions() {
      if (!this.regions || this.regions.length == 0) return [];
      return this.filteredRegions.slice(
        (this.regionPage - 1) * this.regionsPerPage,
        this.regionPage * this.regionsPerPage
      );
    },
    filteredRegions() {
      if (!this.regions || this.regions.length == 0) return [];
      let filtered = this.sortedRegions;
      if (this.searchKey)
        filtered = filtered.filter(
          (region) =>
            region.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            region.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterCategory) {
        filtered = filtered.filter(
          (region) => this.filterCategory.id == region.regionCategory.id
        );
      }
      return filtered;
    },
    sortedRegions() {
      if (!this.regions || this.regions.length == 0) return [];
      let sortedRegions = this.regions;
      if (!this.sortBy) return sortedRegions;
      switch (this.sortBy) {
        case "name:asc":
          sortedRegions.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name:desc":
          sortedRegions.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
        case "newest":
          sortedRegions.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedRegions.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
      return sortedRegions;
    },
    totalRegionPage() {
      if (!this.regions || this.filteredRegions.length == 0) return 1;
      if (this.filteredRegions.length % this.regionsPerPage == 0)
        return this.filteredRegions.length / this.regionsPerPage;
      else
        return (
          Math.floor(this.filteredRegions.length / this.regionsPerPage) + 1
        );
    },
    totalFilteredRegion() {
      if (!this.regions || this.regions.length == 0) return 0;
      return this.filteredRegions.length;
    },
    totalRegion() {
      if (!this.regions || this.filteredRegions.length == 0) return 0;
      return this.regions.length;
    },
    regionImages() {
      if (!this.region) return [];
      let images = [this.region.images];
      if (this.region.imageCollection && this.region.imageCollection.length > 0)
        images = images.concat(this.region.imageCollection);
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
      return this.filteredRegions.slice(
        (this.productPage - 1) * this.productsPerPage,
        this.productPage * this.productsPerPage
      );
    },
    totalHtxPage() {
      if (!this.htxs || this.htxs.length == 0) return 1;
      if (this.htxs.length % this.htxsPerPage == 0)
        return this.htxs.length / this.htxsPerPage;
      else return Math.floor(this.htxs.length / this.htxsPerPage) + 1;
    },
    slicedHtxs() {
      if (!this.htxs || this.htxs.length == 0) return [];
      return this.filteredRegions.slice(
        (this.htxPage - 1) * this.htxsPerPage,
        this.htxPage * this.htxsPerPage
      );
    },
  },
  actions: {
    resetFilter() {
      this.searchKey = "";
      this.filterCategory = [];
      this.filterPrice = [];
    },
    async fetchRegions() {
      try {
        loading.show();
        const res = await Area.fetch({
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching regions!",
            "Please try again later!"
          );
          return;
        }
        const regions = get(res, "data.data", []);
        if (!regions && regions.length == 0) return;
        const mappedRegions = regions.map((region) => {
          return {
            id: region.id,
            ...region.attributes,
            regionCategory: {
              id: get(region, "attributes.areaCategory.data.id", -1),
              ...get(region, "attributes.areaCategory.data.attributes", {}),
            },
            author: get(region, "attributes.user.data.attributes", {}),
          };
        });

        this.regions = mappedRegions;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await AreaCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching region categories!",
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
    async fetchRegion(regionCode) {
      try {
        loading.show();
        const res = await Area.fetch({
          populate: "*",
          filters: {
            code: regionCode,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const regions = get(res, "data.data", []);
        if (!regions || regions.length == 0) return;
        this.region = {
          id: regions[0],
          ...regions[0].attributes,
          regionCategory: get(
            regions[0],
            "attributes.areaCategory.data.attributes.name",
            "---"
          ),
          cooperatives: get(regions[0], "attributes.cooperatives.data", []),
          products: get(regions[0], "attributes.products.data", []),
          certification: get(regions[0], "attributes.certification", []),
        };
        this.htxs = this.region.cooperatives.map((htx) => {
          return {
            id: htx.id,
            ...htx.attributes,
            htxCategory: {
              id: get(htx, "attributes.cooperativeCategory.data.id", -1),
              ...get(htx, "attributes.cooperativeCategory.data.attributes", {}),
            },
          };
        });
        this.products = this.region.products
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

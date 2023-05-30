import { defineStore } from "pinia";
// import { Agency, AgencyCategory } from "@/plugins/api.js";
import { Product, ProductCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const agencyStore = defineStore("agency", {
  state: () => ({
    agencyPage: 1,
    agencysPerPage: 12,
    categories: [],
    agency: {},
    agencys: [],
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
    slicedAgencies() {
      if (!this.agencys || this.agencys.length == 0) return [];
      return this.filteredAgencies.slice(
        (this.agencyPage - 1) * this.agencysPerPage,
        this.agencyPage * this.agencysPerPage
      );
    },
    filteredAgencies() {
      if (!this.agencys || this.agencys.length == 0) return [];
      let filtered = this.sortedAgencies;
      if (this.searchKey)
        filtered = filtered.filter(
          (agency) =>
            agency.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            agency.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            agency.origin
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterCategory) {
        filtered = filtered.filter(
          (agency) => this.filterCategory.id == agency.agencyCategory.id
        );
      }
      return filtered;
    },
    sortedAgencies() {
      if (!this.agencys || this.agencys.length == 0) return [];
      let sortedAgencies = this.agencys;
      if (!this.sortBy) return sortedAgencies;
      switch (this.sortBy) {
        case "name:asc":
          sortedAgencies.sort((a, b) => a.name.localeCompare(b.title));
          break;
        case "name:desc":
          sortedAgencies.sort((a, b) => b.name.localeCompare(a.title));
          break;
        default:
        case "newest":
          sortedAgencies.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedAgencies.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
      return sortedAgencies;
    },
    totalAgencyPage() {
      if (!this.agencys || this.filteredAgencies.length == 0) return 1;
      if (this.filteredAgencies.length % this.agencysPerPage == 0)
        return this.filteredAgencies.length / this.agencysPerPage;
      else
        return (
          Math.floor(this.filteredAgencies.length / this.agencysPerPage) + 1
        );
    },
    totalFilteredAgency() {
      if (!this.agencys || this.agencys.length == 0) return 0;
      return this.filteredAgencies.length;
    },
    totalAgency() {
      if (!this.agencys || this.filteredAgencies.length == 0) return 0;
      return this.agencys.length;
    },
    agencyImages() {
      if (!this.agency) return [];
      let images = [this.agency.images];
      if (this.agency.imageCollection && this.agency.imageCollection.length > 0)
        images = images.concat(this.agency.imageCollection);
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
      return this.filteredAgencies.slice(
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
    async fetchAgencies() {
      try {
        loading.show();
        // const res = await Agency.fetch({
        //   populate: "*",
        // });
        const res = await Product.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching agencys!",
            "Please try again later!"
          );
          return;
        }
        const agencys = get(res, "data.data", []);
        if (!agencys && agencys.length == 0) return;
        // const mappedAgencies = agencys
        //   .filter((agency) => agency.attributes.status == "publish")
        //   .map((agency) => {
        //     return {
        //       id: agency.id,
        //       ...agency.attributes,
        //       agencyCategory: {
        //         id: get(agency, "attributes.agencyCategory.data.id", -1),
        //         ...get(agency, "attributes.agencyCategory.data.attributes", {}),
        //       },
        //       author: get(agency, "attributes.user.data.attributes", {}),
        //     };
        //   });
        const mappedAgencies = agencys
          .filter((agency) => agency.attributes.status == "publish")
          .map((agency) => {
            return {
              id: agency.id,
              ...agency.attributes,
              agencyCategory: {
                id: get(agency, "attributes.productCategory.data.id", -1),
                ...get(
                  agency,
                  "attributes.productCategory.data.attributes",
                  {}
                ),
              },
              author: get(agency, "attributes.user.data.attributes", {}),
            };
          });
        this.agencys = mappedAgencies;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        // const res = await AgencyCategory.fetch();
        const res = await ProductCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching agency categories!",
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
    async fetchAgency(agencyCode) {
      try {
        loading.show();
        // const res = await Agency.fetch({
        //   populate: "*",
        //   filters: {
        //     code: agencyCode,
        //   },
        // });
        const res = await Product.fetch({
          populate: "*",
          filters: {
            code: agencyCode,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const agencys = get(res, "data.data", []);
        if (!agencys || agencys.length == 0) return;
        this.agency = {
          id: agencys[0],
          ...agencys[0].attributes,
        };
        // this.agency.agencyCategory = get(
        //   this.agency,
        //   "agencyCategory.data.attributes.name",
        //   "---"
        // );
        this.agency.agencyCategory = get(
          this.agency,
          "productCategory.data.attributes.name",
          "---"
        );
        this.agency.user = get(this.agency, "user.data.attributes");
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

import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import { helpers } from "@/helpers/helper";
import {
  Agency,
  Area,
  Artisan,
  Cooperative,
  Product,
  Seed,
  Supply,
} from "@/plugins/api";

export const searchCodeStore = defineStore("searchCode", {
  state: () => ({
    searchCode: "",
    searchResultsPage: 1,
    searchResultsPerPage: 12,
    categories: [],
    searchSelection: "",
    searchKey: "",
    ////////////////////////// SEARCH-ALL
    products: [],
    supplies: [],
    seeds: [],
    artisans: [],
    regions: [],
    htxs: [],
    agencys: [],
    //////////////////////

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
    //////

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
    slicedsearchAll(results, itemPage, itemPerPage) {
      if (!results || results.length == 0) return [];
      return results.slice(
        (itemPage - 1) * itemPerPage,
        itemPage * itemPerPage
      );
    },
    totalsearchAllPage(results, itemPerPage) {
      if (!results || results.length == 0) return 1;
      if (results.length % itemPerPage == 0)
        return results.length / itemPerPage;
      else return Math.floor(results.length / itemPerPage) + 1;
    },

    //////
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
    async fetchsearchAll(code) {
      try {
        loading.show();
        const [
          productRes,
          supplyRes,
          seedlingRes,
          artisanRes,
          regionRes,
          htxRes,
          agencyRes,
        ] = await Promise.all([
          Product.fetch({
            sort: "updatedAt:desc",
            populate: "*",
          }),
          Supply.fetch({
            sort: "updatedAt:desc",
            populate: "*",
          }),
          Seed.fetch({ sort: "updatedAt:desc", populate: "*" }),
          Artisan.fetch({ sort: "updatedAt:desc", populate: "*" }),
          Area.fetch({ sort: "updatedAt:desc", populate: "*" }),
          Cooperative.fetch({ sort: "updatedAt:desc", populate: "*" }),
          Agency.fetch({ sort: "updatedAt:desc", populate: "*" }),
        ]);

        console.log(code);
        const products = get(productRes, "data.data", []);
        const supplies = get(supplyRes, "data.data", []);
        const seeds = get(seedlingRes, "data.data", []);
        const artisans = get(artisanRes, "data.data", []);
        const regions = get(regionRes, "data.data", []);
        const htxs = get(htxRes, "data.data", []);
        const agencys = get(agencyRes, "data.data", []);

        /////
        if (!agencys && agencys.length == 0) return;
        const mappedAgencies = agencys
          .filter((seed) =>
            seed.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((agency) => {
            return {
              id: agency.id,
              ...agency.attributes,
              agencyCategory: {
                id: get(agency, "attributes.storeCategory.data.id", -1),
                ...get(agency, "attributes.storeCategory.data.attributes", {}),
              },
            };
          });

        this.agencys = mappedAgencies;
        ////
        if (!htxs && htxs.length == 0) return;
        const mappedHtxs = htxs
          .filter((seed) =>
            seed.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((htx) => {
            return {
              id: htx.id,
              ...htx.attributes,
              htxCategory: {
                id: get(htx, "attributes.cooperativeCategory.data.id", -1),
                ...get(
                  htx,
                  "attributes.cooperativeCategory.data.attributes",
                  {}
                ),
              },
            };
          });

        this.htxs = mappedHtxs;
        /////
        if (!regions && regions.length == 0) return;
        const mappedRegions = regions
          .filter((seed) =>
            seed.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((region) => {
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
        /////
        if (!artisans && artisans.length == 0) return;
        const mappedArtisans = artisans
          .filter((seed) =>
            seed.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((artisan) => {
            return {
              id: artisan.id,
              ...artisan.attributes,
              artisanCategory: {
                id: get(artisan, "attributes.artisanCategory.data.id", -1),
                ...get(
                  artisan,
                  "attributes.artisanCategory.data.attributes",
                  {}
                ),
              },
            };
          });

        this.artisans = mappedArtisans;
        //////
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
              id: seed.id,
              ...seed.attributes,
              seedCategory: {
                id: get(seed, "attributes.seedlingCategory.data.id", -1),
                ...get(seed, "attributes.seedlingCategory.data.attributes", {}),
              },
              author: get(seed, "attributes.user.data.attributes", {}),
            };
          });
        this.seeds = mappedSeeds;
        ////
        if (!products && products.length == 0) return;
        const mappedProducts = products
          .filter((product) => product.attributes.status == "publish")
          .filter((seed) =>
            seed.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
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
        ////////
        if (!supplies && supplies.length == 0) return;
        const mappedSupplies = supplies
          .filter((supply) => supply.attributes.status == "publish")
          .filter((seed) =>
            seed.attributes.code
              .toLowerCase()
              .includes(code.trim().toLowerCase())
          )
          .map((supply) => {
            return {
              id: supply.id,
              ...supply.attributes,
              supplyCategory: {
                id: get(supply, "attributes.supplyCategory.data.id", -1),
                ...get(supply, "attributes.supplyCategory.data.attributes", {}),
              },
              author: get(supply, "attributes.user.data.attributes", {}),
            };
          });
        this.supplies = mappedSupplies;
        //////
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

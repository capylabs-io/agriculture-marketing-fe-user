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
  FAQ,
  Post,
  Product,
  Seed,
  Supply,
  Document,
} from "@/plugins/api";

export const searchCodeStore = defineStore("searchCode", {
  state: () => ({
    searchCode: "",
    searchResultsPage: 1,
    searchResultsPerPage: 12,
    categories: [],
    searchSelection: "product",
    searchKey: "",
    ////////////////////////// SEARCH-ALL
    products: [],
    supplies: [],
    seeds: [],
    artisans: [],
    regions: [],
    htxs: [],
    agencys: [],
    posts: [],
    documents: [],
    faqs: [],
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
            filters: {
              status: "publish",
            },
            sort: "updatedAt:desc",

            populate: "*",
          }),
          Supply.fetch({
            filters: {
              status: "publish",
            },
            sort: "updatedAt:desc",
            populate: "*",
          }),
          Seed.fetch({
            filters: {
              status: "publish",
            },
            sort: "updatedAt:desc",
            populate: "*",
          }),
        ]);

        const products = get(productRes, "data.data", []);
        const supplies = get(supplyRes, "data.data", []);
        const seeds = get(seedlingRes, "data.data", []);

        if (!products && products.length == 0) return;
        const mappedProducts = products

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

    ///////////////////////////////
    async fetchSearchAll() {
      try {
        loading.show();
        let res = [];
        if (!this.searchSelection || !this.searchCode) return;
        switch (this.searchSelection) {
          case "product": {
            res = await Product.fetch({
              filters: {
                status: "publish",
              },
              sort: "updatedAt:desc",
              populate: "*",
            });
            const products = get(res, "data.data", []);

            if (!products && products.length == 0) return;
            const mappedProducts = products
              .filter((product) => product.attributes.status == "publish")
              .filter(
                (product) =>
                  product.attributes.code
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  product.attributes.name
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
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
            break;
          }
          case "seed": {
            res = await Seed.fetch({
              filters: {
                status: "publish",
              },
              sort: "updatedAt:desc",
              populate: "*",
            });
            const seeds = get(res, "data.data", []);
            if (!seeds && seeds.length == 0) return;
            const mappedSeeds = seeds
              .filter((seed) => seed.attributes.status == "publish")
              .filter(
                (seed) =>
                  seed.attributes.code
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  seed.attributes.name
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
              )
              .map((seed) => {
                return {
                  id: seed.id,
                  ...seed.attributes,
                  seedCategory: {
                    id: get(seed, "attributes.seedlingCategory.data.id", -1),
                    ...get(
                      seed,
                      "attributes.seedlingCategory.data.attributes",
                      {}
                    ),
                  },
                  author: get(seed, "attributes.user.data.attributes", {}),
                };
              });
            this.seeds = mappedSeeds;
            break;
          }
          case "supply": {
            res = await Supply.fetch({
              filters: {
                status: "publish",
              },
              sort: "updatedAt:desc",
              populate: "*",
            });
            const supplies = get(res, "data.data", []);
            if (!supplies && supplies.length == 0) return;
            const mappedSupplies = supplies
              .filter((supply) => supply.attributes.status == "publish")
              .filter(
                (supply) =>
                  supply.attributes.code
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  supply.attributes.name
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
              )
              .map((supply) => {
                return {
                  id: supply.id,
                  ...supply.attributes,
                  supplyCategory: {
                    id: get(supply, "attributes.supplyCategory.data.id", -1),
                    ...get(
                      supply,
                      "attributes.supplyCategory.data.attributes",
                      {}
                    ),
                  },
                  author: get(supply, "attributes.user.data.attributes", {}),
                };
              });
            this.supplies = mappedSupplies;
            break;
          }
          case "artisan": {
            res = await Artisan.fetch({
              sort: "updatedAt:desc",
              populate: "*",
            });
            const artisans = get(res, "data.data", []);

            if (!artisans && artisans.length == 0) return;
            const mappedArtisans = artisans
              .filter(
                (artisan) =>
                  artisan.attributes.code
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  artisan.attributes.name
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
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
            break;
          }
          case "region": {
            res = await Area.fetch({
              sort: "updatedAt:desc",
              populate: "*",
            });
            const regions = get(res, "data.data", []);
            if (!regions && regions.length == 0) return;
            const mappedRegions = regions
              .filter(
                (region) =>
                  region.attributes.code
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  region.attributes.name
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
              )
              .map((region) => {
                return {
                  id: region.id,
                  ...region.attributes,
                  regionCategory: {
                    id: get(region, "attributes.areaCategory.data.id", -1),
                    ...get(
                      region,
                      "attributes.areaCategory.data.attributes",
                      {}
                    ),
                  },
                  author: get(region, "attributes.user.data.attributes", {}),
                };
              });

            this.regions = mappedRegions;
            break;
          }
          case "htx": {
            res = await Cooperative.fetch({
              sort: "updatedAt:desc",
              populate: "*",
            });
            const htxs = get(res, "data.data", []);

            if (!htxs && htxs.length == 0) return;
            const mappedHtxs = htxs
              .filter(
                (htx) =>
                  htx.attributes.code
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  htx.attributes.name
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
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
            break;
          }
          case "agency": {
            res = await Agency.fetch({
              sort: "updatedAt:desc",
              populate: "*",
            });
            const agencys = get(res, "data.data", []);
            if (!agencys && agencys.length == 0) return;
            const mappedAgencies = agencys
              .filter(
                (agency) =>
                  agency.attributes.code
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  agency.attributes.name
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
              )
              .map((agency) => {
                return {
                  id: agency.id,
                  ...agency.attributes,
                  agencyCategory: {
                    id: get(agency, "attributes.storeCategory.data.id", -1),
                    ...get(
                      agency,
                      "attributes.storeCategory.data.attributes",
                      {}
                    ),
                  },
                };
              });

            this.agencys = mappedAgencies;
            break;
          }
          case "new": {
            res = await Post.fetch({
              filters: {
                status: "publish",
              },
              sort: "updatedAt:desc",
              populate: "*",
            });
            const posts = get(res, "data.data", []);
            if (!posts && posts.length == 0) return;
            const mappedPosts = posts
              .filter((post) =>
                post.attributes.title
                  .toLowerCase()
                  .includes(this.searchCode.trim().toLowerCase())
              )
              .map((post) => {
                return {
                  id: post.id,
                  ...post.attributes,
                  newsCategory: {
                    id: get(post, "attributes.postCategory.data.id", -1),
                    ...get(post, "attributes.postCategory.data.attributes", {}),
                  },
                  author: get(
                    post,
                    "attributes.user.data.attributes.username",
                    "Admin"
                  ),
                };
              });
            this.posts = mappedPosts;
            break;
          }
          case "document": {
            res = await Document.fetch({
              sort: "updatedAt:desc",
              populate: "*",
            });
            const documents = get(res, "data.data", []);
            if (!documents && documents.length == 0) return;
            const mappeddocuments = documents
              .filter(
                (document) =>
                  document.attributes.title
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase()) ||
                  document.attributes.numberOf
                    .toLowerCase()
                    .includes(this.searchCode.trim().toLowerCase())
              )
              .map((document) => {
                return {
                  id: document.id,
                  ...document.attributes,
                  documentCategory: {
                    id: get(
                      document,
                      "attributes.documentCategory.data.id",
                      -1
                    ),
                    ...get(
                      document,
                      "attributes.documentCategory.data.attributes",
                      {}
                    ),
                  },
                };
              });
            this.documents = mappeddocuments;
            break;
          }
          case "faq": {
            res = await FAQ.fetch({
              sort: "updatedAt:desc",
              populate: "*",
            });
            const faqs = get(res, "data.data", []);
            if (!faqs && faqs.length == 0) return;
            const mappedfaqs = faqs
              .filter((faqs) =>
                faqs.attributes.question
                  .toLowerCase()
                  .includes(this.searchCode.trim().toLowerCase())
              )
              .map((faqs) => {
                return {
                  id: faqs.id,
                  ...faqs.attributes,
                  faqCategory: {
                    id: get(faqs, "attributes.faqCategory.data.id", -1),
                    ...get(faqs, "attributes.faqCategory.data.attributes", {}),
                  },
                };
              });
            this.faqs = mappedfaqs;
            break;
          }
        }
        // const [
        //   productRes,
        //   supplyRes,
        //   seedlingRes,
        //   artisanRes,
        //   regionRes,
        //   htxRes,
        //   agencyRes,
        // ] = await Promise.all([
        //   Product.fetch({
        //     sort: "updatedAt:desc",
        //     populate: "*",
        //   }),
        //   Supply.fetch({
        //     sort: "updatedAt:desc",
        //     populate: "*",
        //   }),
        //   Seed.fetch({ sort: "updatedAt:desc", populate: "*" }),
        //   Artisan.fetch({ sort: "updatedAt:desc", populate: "*" }),
        //   Area.fetch({ sort: "updatedAt:desc", populate: "*" }),
        //   Cooperative.fetch({ sort: "updatedAt:desc", populate: "*" }),
        //   Agency.fetch({ sort: "updatedAt:desc", populate: "*" }),
        // ]);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

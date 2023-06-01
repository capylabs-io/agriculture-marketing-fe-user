import { defineStore } from "pinia";
import { Product, Post, Cooperative, Area, Artisan } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const homeStore = defineStore("home", {
  state: () => ({
    productCategory: "all",
    productCategories: [],
    products: [],
    posts: [],
    htxs: [],
    regions: [],
    artisans: [],
    mobileNavigationDrawer: false,
    productNum: 4,
    searchKey: "",
  }),
  getters: {
    slicedProducts() {
      if (!this.products || this.products.length == 0) return [];
      return this.filteredProducts.slice(0, this.productNum);
    },
    filteredProducts() {
      if (!this.products || this.products.length == 0) return [];
      if (!this.productCategory || this.productCategory == "all") return this.products;
      return this.products.filter(
        (product) => product.productCategory && product.productCategory.id == this.productCategory
      );
    },
    newestPost() {
      if (!this.posts || this.posts.length == 0)
        return {
          postCategory: {},
        };
      return this.posts[0];
    },
    otherPosts() {
      if (!this.posts || this.posts.length == 0) return [];
      return this.posts.slice(1, 4);
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const res = await Product.fetch({
          pagination: {
            page: 1,
            pageSize: 4,
          },
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
    async fetchPosts() {
      try {
        const res = await Post.fetch({
          filters: {
            postCategory: {
              id: {
                $notIn: [4, 5],
              },
            },
          },
          pagination: {
            page: 1,
            pageSize: 4,
          },
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching news!", "Please try again later!");
          return;
        }
        const posts = get(res, "data.data", []);
        if (!posts && posts.length == 0) return;
        const mappedPosts = posts.map((post) => {
          return {
            id: post.id,
            ...post.attributes,
            postCategory: {
              id: get(post, "attributes.postCategory.data.id", -1),
              ...get(post, "attributes.postCategory.data.attributes", {}),
            },
            author: get(post, "attributes.user.data.attributes.username", "Admin"),
          };
        });
        this.posts = mappedPosts;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchArtisans() {
      try {
        const res = await Artisan.fetch({
          pagination: {
            page: 1,
            pageSize: 4,
          },
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching artisans!", "Please try again later!");
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
        console.log("artisans", this.artisans);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchHtxs() {
      try {
        // const res = await Htx.fetch({
        //   populate: "*",
        // });
        const res = await Cooperative.fetch({
          pagination: {
            page: 1,
            pageSize: 4,
          },
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching htxs!", "Please try again later!");
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
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchRegions() {
      try {
        const res = await Area.fetch({
          pagination: {
            page: 1,
            pageSize: 4,
          },
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching regions!", "Please try again later!");
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
  },
});
/* eslint-enable */

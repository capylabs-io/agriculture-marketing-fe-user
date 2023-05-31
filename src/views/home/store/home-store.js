import { defineStore } from "pinia";
import { Product, ProductCategory, Post } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const homeStore = defineStore("home", {
  state: () => ({
    productCategory: "all",
    productCategories: [],
    products: [],
    posts: [],
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
        loading.show();
        const res = await Product.fetch({
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
        loading.show();
        const res = await Post.fetch({
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
    async fetchProductCategories() {
      try {
        loading.show();
        const res = await ProductCategory.fetch();
        if (!res) {
          alert.error("Error occurred when fetching product categories!", "Please try again later!");
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
  },
});
/* eslint-enable */

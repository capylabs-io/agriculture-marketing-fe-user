import { defineStore } from "pinia";
import { Post } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const galleryStore = defineStore("gallery", {
  state: () => ({
    postPage: 1,
    postsPerPage: 8,
    categories: [],
    newestPosts: [],
    post: {},
    posts: [],
    // searchKey: "",
    sortBy: "",
    // category: "all",
    sortSelection: [
      {
        value: "asc",
        name: "Tên từ a -> z",
      },
      {
        value: "desc",
        name: "Tên từ z -> a",
      },
      {
        value: "newsest",
        name: "Mới nhất",
      },
      {
        value: "oldest",
        name: "Cũ nhất",
      },
    ],
  }),
  getters: {
    newestPost() {
      if (!this.posts || this.posts.length == 0)
        return {
          postCategory: {},
        };
      return this.posts[0];
    },
    otherPosts() {
      if (!this.posts || this.posts.length == 0) return [];
      return this.posts.slice(1, 5);
    },
    slicedPosts() {
      if (!this.posts || this.posts.length == 0) return [];
      return this.filteredPosts.slice(
        (this.postPage - 1) * this.postsPerPage,
        this.postPage * this.postsPerPage
      );
    },
    filteredPosts() {
      if (!this.posts || this.posts.length == 0) return [];
      let filtered = this.sortedPosts;
      if (this.searchKey)
        filtered = filtered
          // .filter((news) => news.newsCategory.id == this.currentTab)
          .filter(
            (news) =>
              news.title.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
              news.content.toLowerCase().includes(this.searchKey.trim().toLowerCase())
          );
      if (this.category && this.category != "all")
        filtered = filtered.filter((news) => news.newsCategory.id == this.category);
      return filtered;
    },
    sortedPosts() {
      if (!this.posts || this.posts.length == 0) return [];
      let sortedPosts = this.posts;
      if (!this.sortBy) return sortedPosts;
      switch (this.sortBy) {
        default:
        case "asc":
          sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "desc":
          sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "newsest":
          sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "oldest":
          sortedPosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
      }
      return sortedPosts;
    },
    totalPostPage() {
      if (!this.posts || this.filteredPosts.length == 0) return 1;
      if (this.filteredPosts.length % this.postsPerPage == 0)
        return this.filteredPosts.length / this.postsPerPage;
      else return Math.floor(this.filteredPosts.length / this.postsPerPage) + 1;
    },
    totalPost() {
      if (!this.posts || this.filteredPosts.length == 0) return 0;
      return this.filteredPosts.length;
    },
    postImages() {
      if (!this.post) return [];
      return [this.post.images].concat(this.post.imageContent);
    },
  },
  actions: {
    async fetchPosts(params) {
      try {
        loading.show();
        const res = await Post.fetch({
          ...params,
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching news!", "Please try again later!");
          return;
        }
        const posts = get(res, "data.data", []);
        if (!posts && posts.length == 0) return;
        const mappedPosts = posts
          .filter((post) => post.attributes.status == "publish")
          .map((post) => {
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
    async fetchPost(postId) {
      try {
        loading.show();
        const res = await Post.fetchOne(postId, {
          populate: "*",
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const listNew = get(res, "data.data", {});
        if (!listNew || listNew.length == 0) return;
        const post = listNew;
        this.post = {
          id: post.id,
          ...post.attributes,
          postCategory: get(post, "attributes.postCategory.data.attributes.name", "Danh mục bài viết"),
          avatar: get(post, "attributes.user.data.attributes.avatar", ""),
          author: get(post, "attributes.user.data.attributes.username", "Admin"),
        };
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

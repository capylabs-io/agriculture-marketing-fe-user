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
              news.title
                .toLowerCase()
                .includes(this.searchKey.trim().toLowerCase()) ||
              news.content
                .toLowerCase()
                .includes(this.searchKey.trim().toLowerCase())
          );
      if (this.category && this.category != "all")
        filtered = filtered.filter(
          (news) => news.newsCategory.id == this.category
        );
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
          sortedPosts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedPosts.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
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
  },
  actions: {
    async fetchPosts(params) {
      try {
        loading.show();
        const res = await Post.fetch({
          ...params,
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching news!",
            "Please try again later!"
          );
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
              author: get(
                post,
                "attributes.user.data.attributes.username",
                "Admin"
              ),
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
        this.news = {
          id: post.id,
          ...post.attributes,
          newsCategory: get(
            post,
            "attributes.postCategory.data.attributes.name",
            "Danh mục bài viết"
          ),
          avatar: get(post, "attributes.user.data.attributes.avatar", ""),
          author: get(
            post,
            "attributes.user.data.attributes.username",
            "Admin"
          ),
        };
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async fetchTop3Posts(params) {
      try {
        loading.show();
        const res = Post.fetch({
          ...params,
          pagination: {
            page: 1,
            pageSize: 3,
          },
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching listNew!",
            "Please try again later!"
          );
          return;
        }
        const listNew = get(res, "data.data", []);
        if (!listNew && listNew.length == 0) return;
        const mappedlistNew = listNew.map((posts) => {
          return {
            id: posts.id,
            ...posts.attributes,
            newsCategory: get(
              posts,
              "attributes.postCategory.data.attributes",
              {}
            ),
            author: get(posts, "attributes.user.data.attributes", {}),
          };
        });
        this.newestPosts = mappedlistNew;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

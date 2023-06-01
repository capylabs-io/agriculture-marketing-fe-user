import { defineStore } from "pinia";
import { Post, PostCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const newStore = defineStore("new", {
  state: () => ({
    newsPage: 1,
    newsPerPage: 6,
    categories: [],
    news: {},
    listNew: [],
    newPosts: [],
    searchKey: "",
    sortBy: "",
    category: "all",
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
      if (!this.listNew || this.listNew.length == 0)
        return {
          newsCategory: {},
        };
      return this.listNew[0];
    },
    otherPosts() {
      if (!this.listNew || this.listNew.length == 0) return [];
      return this.listNew.slice(1, 4);
    },
    slicedlistNew() {
      if (!this.listNew || this.listNew.length == 0) return [];
      return this.filteredlistNew.slice(
        (this.newsPage - 1) * this.newsPerPage,
        this.newsPage * this.newsPerPage
      );
    },
    filteredlistNew() {
      if (!this.listNew || this.listNew.length == 0) return [];
      let filtered = this.sortedNews;
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
    sortedNews() {
      if (!this.listNew || this.listNew.length == 0) return [];
      let sortedNews = this.listNew;
      if (!this.sortBy) return sortedNews;
      switch (this.sortBy) {
        default:
        case "asc":
          sortedNews.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "desc":
          sortedNews.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "newsest":
          sortedNews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "oldest":
          sortedNews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
      }
      return sortedNews;
    },
    totalnewsPage() {
      if (!this.listNew || this.filteredlistNew.length == 0) return 1;
      if (this.filteredlistNew.length % this.newsPerPage == 0)
        return this.filteredlistNew.length / this.newsPerPage;
      else return Math.floor(this.filteredlistNew.length / this.newsPerPage) + 1;
    },
    totalnews() {
      if (!this.listNew || this.filteredlistNew.length == 0) return 1;
      return this.filteredlistNew.length;
    },
  },
  actions: {
    async fetchCategories() {
      try {
        loading.show();
        const res = await PostCategory.fetch({
          filters: {
            id: {
              $notIn: [4, 5],
            },
          },
        });
        if (!res) {
          alert.error(`Error occurred fetch! Please try again later!`);
          return;
        }
        const categories = get(res, "data.data", []);

        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
          };
        });
        this.categories = mappedCategories;
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async fetchlistNew(params) {
      try {
        loading.show();
        const res = await Post.fetch({
          ...params,
          filters: {
            postCategory: {
              id: {
                $notIn: [4, 5],
              },
            },
          },
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
              newsCategory: {
                id: get(post, "attributes.postCategory.data.id", -1),
                ...get(post, "attributes.postCategory.data.attributes", {}),
              },
              author: get(post, "attributes.user.data.attributes.username", "Admin"),
            };
          });
        this.listNew = mappedPosts;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchnews(newsCode) {
      try {
        loading.show();
        const res = await Post.fetchOne(newsCode, {
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
          newsCategory: get(post, "attributes.postCategory.data.attributes.name", "Danh mục bài viết"),
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
    async top3NewPost() {
      try {
        loading.show();
        const res = Post.topNewPost();
        if (!res) {
          alert.error("Error occurred when fetching listNew!", "Please try again later!");
          return;
        }
        const listNew = get(res, "data.data", []);
        if (!listNew && listNew.length == 0) return;
        const mappedlistNew = listNew.map((news) => {
          return {
            id: news.id,
            ...news.attributes,
            newsCategory: get(news, "attributes.postCategory.data.attributes", {}),
            author: get(news, "attributes.user.data.attributes", {}),
          };
        });
        this.newPosts = mappedlistNew;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

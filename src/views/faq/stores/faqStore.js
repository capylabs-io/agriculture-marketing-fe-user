import { defineStore } from "pinia";
import { FAQ, FAQCategory, faqs } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const faqStore = defineStore("faq", {
  state: () => ({
    faqsPage: 1,
    faqsPerPage: 6,
    categories: [],
    faqs: {},
    listfaq: [],
    faqfaqs: [],
    searchKey: "",
    sortBy: "",
    category: "all",
    currentTab: 0,
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
        value: "faqsest",
        name: "Mới nhất",
      },
      {
        value: "oldest",
        name: "Cũ nhất",
      },
    ],
  }),
  getters: {
    faqestfaqs() {
      if (!this.listfaq || this.listfaq.length == 0)
        return {
          faqCategory: {},
        };
      return this.listfaq[0];
    },
    otherfaqs() {
      if (!this.listfaq || this.listfaq.length == 0) return [];
      return this.listfaq.slice(1, 4);
    },
    slicedlistfaq() {
      if (!this.listfaq || this.listfaq.length == 0) return [];
      return this.filteredlistfaq.slice(
        (this.faqsPage - 1) * this.faqsPerPage,
        this.faqsPage * this.faqsPerPage
      );
    },
    filteredlistfaq() {
      if (!this.listfaq || this.listfaq.length == 0) return [];
      let filtered = this.sortedfaqs;
      if (this.searchKey)
        filtered = filtered.filter((faqs) =>
          faqs.question
            .toLowerCase()
            .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.currentTab && this.currentTab >= 1)
        filtered = filtered.filter(
          (faqs) => faqs.faqCategory.id == this.currentTab
        );
      return filtered;
    },
    sortedfaqs() {
      if (!this.listfaq || this.listfaq.length == 0) return [];
      let sortedfaqs = this.listfaq;
      if (!this.sortBy) return sortedfaqs;
      switch (this.sortBy) {
        default:
        case "asc":
          sortedfaqs.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "desc":
          sortedfaqs.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "faqsest":
          sortedfaqs.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedfaqs.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
      return sortedfaqs;
    },
    totalfaqsPage() {
      if (!this.listfaq || this.filteredlistfaq.length == 0) return 1;
      if (this.filteredlistfaq.length % this.faqsPerPage == 0)
        return this.filteredlistfaq.length / this.faqsPerPage;
      else
        return Math.floor(this.filteredlistfaq.length / this.faqsPerPage) + 1;
    },
    totalfaqs() {
      if (!this.listfaq || this.filteredlistfaq.length == 0) return 1;
      return this.filteredlistfaq.length;
    },
  },
  actions: {
    async fetchCategories() {
      try {
        loading.show();
        const res = await FAQCategory.fetch();
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
    async fetchlistfaq(params) {
      try {
        loading.show();
        const res = await FAQ.fetch({
          ...params,
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching faqs!",
            "Please try again later!"
          );
          return;
        }
        const faqs = get(res, "data.data", []);
        if (!faqs && faqs.length == 0) return;
        const mappedfaqs = faqs.map((faqs) => {
          return {
            id: faqs.id,
            ...faqs.attributes,
            faqCategory: {
              id: get(faqs, "attributes.faqCategory.data.id", -1),
              ...get(faqs, "attributes.faqCategory.data.attributes", {}),
            },
          };
        });
        this.listfaq = mappedfaqs;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchfaqs(faqsCode) {
      try {
        loading.show();
        const res = await faqs.fetchOne(faqsCode, {
          populate: "*",
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const listfaq = get(res, "data.data", {});
        if (!listfaq || listfaq.length == 0) return;
        const faqs = listfaq;
        this.faqs = {
          id: faqs.id,
          ...faqs.attributes,
          faqCategory: get(
            faqs,
            "attributes.faqCategory.data.attributes.name",
            "Danh mục bài viết"
          ),
          avatar: get(faqs, "attributes.user.data.attributes.avatar", ""),
          author: get(
            faqs,
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
    async top3faqfaqs() {
      try {
        loading.show();
        const res = faqs.topfaqfaqs();
        if (!res) {
          alert.error(
            "Error occurred when fetching listfaq!",
            "Please try again later!"
          );
          return;
        }
        const listfaq = get(res, "data.data", []);
        if (!listfaq && listfaq.length == 0) return;
        const mappedlistfaq = listfaq.map((faqs) => {
          return {
            id: faqs.id,
            ...faqs.attributes,
            faqCategory: get(
              faqs,
              "attributes.faqCategory.data.attributes",
              {}
            ),
            author: get(faqs, "attributes.user.data.attributes", {}),
          };
        });
        this.faqfaqs = mappedlistfaq;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

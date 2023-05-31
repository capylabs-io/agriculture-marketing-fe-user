import { defineStore } from "pinia";
import { Contact } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const contactStore = defineStore("contact", {
  state: () => ({
    contactsPage: 1,
    contactsPerPage: 6,
    categories: [],
    contacts: {},
    listcontact: [],
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
        value: "contactsest",
        name: "Mới nhất",
      },
      {
        value: "oldest",
        name: "Cũ nhất",
      },
    ],
  }),
  getters: {
    slicedcontacts() {
      if (!this.listcontact || this.listcontact.length == 0) return [];
      return this.filteredcontacts.slice(
        (this.contactsPage - 1) * this.contactsPerPage,
        this.contactsPage * this.contactsPerPage
      );
    },
    filteredcontacts() {
      if (!this.listcontact || this.listcontact.length == 0) return [];
      let filtered = this.sortedcontacts;
      if (this.searchKey)
        filtered = filtered.filter((contacts) =>
          contacts.question
            .toLowerCase()
            .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.currentTab && this.currentTab >= 1)
        filtered = filtered.filter(
          (contacts) => contacts.contactCategory.id == this.currentTab
        );
      return filtered;
    },
    sortedcontacts() {
      if (!this.listcontact || this.listcontact.length == 0) return [];
      let sortedcontacts = this.listcontact;
      if (!this.sortBy) return sortedcontacts;
      switch (this.sortBy) {
        default:
        case "asc":
          sortedcontacts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "desc":
          sortedcontacts.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "contactsest":
          sortedcontacts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedcontacts.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
      return sortedcontacts;
    },
    totalcontactsPage() {
      if (!this.listcontact || this.filteredcontacts.length == 0) return 1;
      if (this.filteredcontacts.length % this.contactsPerPage == 0)
        return this.filteredcontacts.length / this.contactsPerPage;
      else
        return (
          Math.floor(this.filteredcontacts.length / this.contactsPerPage) + 1
        );
    },
    totalcontacts() {
      if (!this.listcontact || this.filteredcontacts.length == 0) return 1;
      return this.filteredcontacts.length;
    },
  },
  actions: {
    async fetchcontacts(params) {
      try {
        loading.show();
        const res = await Contact.fetch({
          sort: "updatedAt:desc",
          ...params,
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching contacts!",
            "Please try again later!"
          );
          return;
        }
        const contacts = get(res, "data.data", []);
        if (!contacts && contacts.length == 0) return;
        const mappedcontacts = contacts.map((contacts) => {
          return {
            id: contacts.id,
            ...contacts.attributes,
            contactCategory: {
              id: get(contacts, "attributes.contactCategory.data.id", -1),
              ...get(
                contacts,
                "attributes.contactCategory.data.attributes",
                {}
              ),
            },
          };
        });
        this.listcontact = mappedcontacts;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchcontact(contactsCode) {
      try {
        loading.show();
        const res = await contacts.fetchOne(contactsCode, {
          populate: "*",
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const listcontact = get(res, "data.data", {});
        if (!listcontact || listcontact.length == 0) return;
        const contacts = listcontact;
        this.contacts = {
          id: contacts.id,
          ...contacts.attributes,
          contactCategory: get(
            contacts,
            "attributes.contactCategory.data.attributes.name",
            "Danh mục bài viết"
          ),
          avatar: get(contacts, "attributes.user.data.attributes.avatar", ""),
          author: get(
            contacts,
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
    async createContact() {
      try {
        loading.show();
        let query = {
          ...this.contacts,
        };
        const res = await Contact.create(query);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.contacts = {};
        alert.success("Gửi thông tin thành công!");
      } catch (error) {
        alert.error("Create post fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */

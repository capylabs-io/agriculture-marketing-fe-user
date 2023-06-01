import { defineStore } from "pinia";
import { Supply, SupplyCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import { helpers } from "@/helpers/helper";

export const supplyStore = defineStore("supply", {
  state: () => ({
    supplyPage: 1,
    suppliesPerPage: 12,
    categories: [],
    supply: {},
    supplies: [],
    searchKey: "",
    filterCategory: [],
    filterPrice: [],
    sortBy: "",
    categoryDictionary: {},
    mobileFilterDrawer: false,
  }),
  getters: {
    allFilters() {
      const filterCategories = this.filterCategory.map((categoryId) =>
        get(this.categoryDictionary, categoryId, "Danh mục khác")
      );
      const filterPrices = this.filterPrice.map((filterPrice) => helpers.getFilterPriceText(filterPrice));
      let filters = filterCategories.concat(filterPrices);
      if (this.searchKey) filters.push("Từ khoá: " + this.searchKey);
      return filters;
    },
    slicedSupplies() {
      if (!this.supplies || this.supplies.length == 0) return [];
      return this.filteredSupplies.slice(
        (this.supplyPage - 1) * this.suppliesPerPage,
        this.supplyPage * this.suppliesPerPage
      );
    },
    filteredSupplies() {
      if (!this.supplies || this.supplies.length == 0) return [];
      let filtered = this.sortedSupplies;
      if (this.searchKey)
        filtered = filtered.filter(
          (supply) =>
            supply.name.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
            supply.code.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
            supply.origin.toLowerCase().includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterCategory && this.filterCategory.length > 0) {
        filtered = filtered.filter((supply) => this.filterCategory.includes(supply.supplyCategory.id));
      }
      if (this.filterPrice && this.filterPrice.length > 0) {
        filtered = filtered.filter((supply) => {
          if (!supply.price || +supply.price < 0) return false;
          if (this.filterPrice.includes("lowerThan500k") && +supply.price < 500000) return true;
          if (
            this.filterPrice.includes("between500kAnd1mil") &&
            +supply.price >= 500000 &&
            +supply.price < 1000000
          )
            return true;
          if (
            this.filterPrice.includes("between1mAnd5mil") &&
            +supply.price >= 1000000 &&
            +supply.price < 5000000
          )
            return true;
          if (this.filterPrice.includes("over5mil") && +supply.price >= 5000000) return true;
          return false;
        });
      }

      return filtered;
    },
    sortedSupplies() {
      if (!this.supplies || this.supplies.length == 0) return [];
      let sortedSupplies = this.supplies;
      if (!this.sortBy) return sortedSupplies;
      switch (this.sortBy) {
        case "name:asc":
          sortedSupplies.sort((a, b) => a.name.localeCompare(b.title));
          break;
        case "name:desc":
          sortedSupplies.sort((a, b) => b.name.localeCompare(a.title));
          break;
        default:
        case "newest":
          sortedSupplies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "oldest":
          sortedSupplies.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case "price:asc":
          sortedSupplies.sort((a, b) => a.price - b.price);
          break;
        case "price:desc":
          sortedSupplies.sort((a, b) => b.price - a.price);
          break;
      }
      return sortedSupplies;
    },
    totalSupplyPage() {
      if (!this.supplies || this.filteredSupplies.length == 0) return 1;
      if (this.filteredSupplies.length % this.suppliesPerPage == 0)
        return this.filteredSupplies.length / this.suppliesPerPage;
      else return Math.floor(this.filteredSupplies.length / this.suppliesPerPage) + 1;
    },
    totalFilteredSupply() {
      if (!this.supplies || this.supplies.length == 0) return 0;
      return this.filteredSupplies.length;
    },
    totalSupply() {
      if (!this.supplies || this.filteredSupplies.length == 0) return 0;
      return this.supplies.length;
    },
    supplyImages() {
      if (!this.supply) return [];
      let images = [this.supply.images];
      if (this.supply.imageCollection && this.supply.imageCollection.length > 0)
        images = images.concat(this.supply.imageCollection);
      return images;
    },
  },
  actions: {
    resetFilter() {
      this.searchKey = "";
      this.filterCategory = [];
      this.filterPrice = [];
    },
    async fetchSupplies() {
      try {
        loading.show();
        const res = await Supply.fetch({
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching supplies!", "Please try again later!");
          return;
        }
        const supplies = get(res, "data.data", []);
        if (!supplies && supplies.length == 0) return;
        const mappedSupplies = supplies
          .filter((supply) => supply.attributes.status == "publish")
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
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await SupplyCategory.fetch();
        if (!res) {
          alert.error("Error occurred when fetching supply categories!", "Please try again later!");
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
        this.categoryDictionary = Object.fromEntries(this.categories.map((x) => [x.id, x.name]));
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchSupply(supplyCode) {
      try {
        loading.show();
        const res = await Supply.fetch({
          populate: "*",
          filters: {
            code: supplyCode,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const supplies = get(res, "data.data", []);
        if (!supplies || supplies.length == 0) return;
        this.supply = {
          id: supplies[0],
          ...supplies[0].attributes,
        };
        this.supply.supplyCategory = get(this.supply, "supplyCategory.data.attributes.name", "---");
        this.supply.user = get(this.supply, "user.data.attributes");
        this.supply.store = {
          id: get(this.supply, "store.data.id", -1),
          ...get(this.supply, "store.data.attributes", {}),
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

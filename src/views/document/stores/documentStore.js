import { defineStore } from "pinia";
import { Document, DocumentCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import utils from "@/plugins/utils";
// import moment from "moment";
export const documentStore = defineStore("document", {
  state: () => ({
    documentsPage: 1,
    documentsPerPage: 6,
    categories: [],
    documents: {},
    listdocument: [],
    fieldCategory: [],
    fieldSelections: [],
    searchKey: "",
    sortBy: "",
    category: "all",
    currentTab: 0,
    datePicker: [],
    filterForm: {
      field: "",
      numberOf: "",
      documentCategory: "",
      startDate: "",
      endDate: "",
    },
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
        value: "documentsest",
        name: "Mới nhất",
      },
      {
        value: "oldest",
        name: "Cũ nhất",
      },
    ],
  }),
  getters: {
    documentestdocuments() {
      if (!this.listdocument || this.listdocument.length == 0)
        return {
          documentCategory: {},
        };
      return this.listdocument[0];
    },
    otherdocuments() {
      if (!this.listdocument || this.listdocument.length == 0) return [];
      return this.listdocument.slice(1, 4);
    },
    slicedDocuments() {
      if (!this.listdocument || this.listdocument.length == 0) return [];
      return this.filteredDocuments.slice(
        (this.documentsPage - 1) * this.documentsPerPage,
        this.documentsPage * this.documentsPerPage
      );
    },
    filteredDocuments() {
      if (!this.listdocument || this.listdocument.length == 0) return [];
      let filtered = this.sorteddocuments;
      if (this.searchKey)
        filtered = filtered.filter((documents) =>
          documents.title
            .toLowerCase()
            .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.currentTab && this.currentTab >= 1)
        filtered = filtered.filter(
          (documents) => documents.documentCategory.id == this.currentTab
        );
      return filtered;
    },
    sorteddocuments() {
      if (!this.listdocument || this.listdocument.length == 0) return [];
      let sorteddocuments = this.listdocument;
      if (!this.sortBy) return sorteddocuments;
      switch (this.sortBy) {
        default:
        case "asc":
          sorteddocuments.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "desc":
          sorteddocuments.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "documentsest":
          sorteddocuments.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sorteddocuments.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
      return sorteddocuments;
    },
    totaldocumentsPage() {
      if (!this.listdocument || this.filteredDocuments.length == 0) return 1;
      if (this.filteredDocuments.length % this.documentsPerPage == 0)
        return this.filteredDocuments.length / this.documentsPerPage;
      else
        return (
          Math.floor(this.filteredDocuments.length / this.documentsPerPage) + 1
        );
    },
    totaldocuments() {
      if (!this.listdocument || this.filteredDocuments.length == 0) return 1;
      return this.filteredDocuments.length;
    },
  },
  actions: {
    reset() {
      this.categories = [];
      this.filterForm = {};
      this.listdocument = [];
      this.datePicker = [];
      this.fieldSelections = [];
    },
    documentFieldsCategories() {
      if (!this.fieldCategory || this.fieldCategory.length == 0) {
        this.fieldSelections = [];
      }
      this.fieldSelections = this.fieldCategory;
    },
    changeDocumentDuration(date) {
      if (!this.filterForm || !date || date.length < 2) return;
      this.filterForm.startDate = date[0];
      this.filterForm.endDate = date[1];
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await DocumentCategory.fetch();
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
    async fetchDocuments(params) {
      try {
        loading.show();
        console.log("filtes", this.filterForm);
        const res = await Document.fetch({
          sort: "updatedAt:desc",
          ...params,
          filters: {
            field: this.filterForm.field ? this.filterForm.field : {},
            numberOf: this.filterForm.numberOf ? this.filterForm.numberOf : {},
            documentCategory: {
              id: this.filterForm.documentCategory
                ? this.filterForm.documentCategory
                : {},
            },
            $and: [
              {
                issueDate: {
                  $lte: this.filterForm.endDate ? this.filterForm.endDate : {},
                },
              },
              {
                issueDate: {
                  $gte: this.filterForm.startDate
                    ? this.filterForm.startDate
                    : {},
                },
              },
            ],
          },
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching documents!",
            "Please try again later!"
          );
          return;
        }
        const documents = get(res, "data.data", []);
        if (!documents && documents.length == 0) return;
        const mappeddocuments = documents.map((documents) => {
          return {
            id: documents.id,
            ...documents.attributes,
            documentCategory: {
              id: get(documents, "attributes.documentCategory.data.id", -1),
              ...get(
                documents,
                "attributes.documentCategory.data.attributes",
                {}
              ),
            },
          };
        });
        this.listdocument = mappeddocuments;
        this.fieldCategory = mappeddocuments.map(
          (documents) => documents.field
        );
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchDocument(documentsCode) {
      try {
        loading.show();
        const res = await Document.fetchOne(documentsCode, {
          populate: "*",
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const listdocument = get(res, "data.data", {});
        if (!listdocument || listdocument.length == 0) return;
        const documents = listdocument;
        this.documents = {
          id: documents.id,
          ...documents.attributes,
          documentCategory: get(
            documents,
            "attributes.documentCategory.data.attributes.name",
            "Danh mục Tài liệu"
          ),
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

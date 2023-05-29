<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-15 pb-8 px-6">
    <div class="d-fex flex-column justify-center align-center text-center">
      <div class="text-dp-md font-weight-medium">Tài liệu</div>
      <div class="text-md mt-2">
        Các văn bản hành chính, công văn, nghị định,... có liên quan
      </div>
      <div>
        <v-text-field
          class="border-radius-8 border-neutral20 full-width mt-6 search-question mx-auto"
          placeholder="Tìm kiếm theo từ khóa"
          flat
          solo
          outlined
          hide-details
        >
          <template v-slot:append>
            <div class="append-btn border-radius-6 pa-3 mr-n2">
              <v-icon dark> mdi-magnify </v-icon>
            </div>
          </template></v-text-field
        >
      </div>
      <div class="d-flex flex-column align-center justify-center">
        <v-expansion-panels flat accordion class="mt-3 expansion-content">
          <v-expansion-panel
            class="expansion-content d-flex flex-column justify-center align-center"
          >
            <v-expansion-panel-header
              class="text-md expansion-header align-self-end"
            >
              <div>Tìm kiếm nâng cao</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="expansion-content-form mt-5 pa-4">
              <searchForm />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <div class="border-radius-12 neutral20-border overflow-hidden mt-8">
        <v-data-table :headers="headers" :items="items" hide-default-footer>
          <template v-slot:[`item.code`]="{ item }">
            <div class="d-flex align-center justify-center">
              {{ item.code }}
            </div>
          </template>
          <template v-slot:[`item.publishedAt`]="{ item }">
            <div class="d-flex align-center justify-center">
              {{ item.publishedAt }}
            </div>
          </template>
          <template v-slot:[`item.title`]="{ item }">
            <div class="d-flex align-center justify-center text-left">
              {{ item.title }}
            </div>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <div class="d-flex align-center justify-center">
              <v-btn
                text
                dense
                depressed
                @click="onDisableClicked(item.id)"
                class="text-none d-flex flex-column justify-center align-center"
                color="blue70"
                >Chi tiết
                <v-icon small class="ml-1">mdi-chevron-right</v-icon></v-btn
              >
            </div>
          </template>
        </v-data-table>
      </div>
      <div class="mt-4 mb-16">
        <v-pagination color="primary" :length="5"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapStores } from "pinia";
// import { supplyStore } from "../store/supply-store";
import { rules } from "@/plugins/rules";
import { gmapApi } from "vue2-google-maps";

export default {
  computed: {
    // ...mapStores(supplyStore),
    google: gmapApi,
  },
  data() {
    return {
      currentTab: 1,
      rules: rules,
      isShow: true,
      isShowPass: false,
      items: [
        {
          code: "1505/QĐ-BKHCN",
          publishedAt: "19/04/2023",
          title:
            "Quyết định ban hành quy trình dịch vụ sự nghiệp công sử dụng ngân sách nhà nước về thông tin, tuyên truyền trong lĩnh vực tiêu chuẩn đo lường chất lượng",
        },
        {
          code: "1505/QĐ-BKHCN",
          publishedAt: "19/04/2023",
          title:
            "Quyết định ban hành quy trình dịch vụ sự nghiệp công sử dụng ngân sách nhà nước về thông tin, tuyên truyền trong lĩnh vực tiêu chuẩn đo lường chất lượng",
        },
        {
          code: "1505/QĐ-BKHCN",
          publishedAt: "19/04/2023",
          title:
            "Quyết định ban hành quy trình dịch vụ sự nghiệp công sử dụng ngân sách nhà nước về thông tin, tuyên truyền trong lĩnh vực tiêu chuẩn đo lường chất lượng",
        },
        {
          code: "1505/QĐ-BKHCN",
          publishedAt: "19/04/2023",
          title:
            "Quyết định ban hành quy trình dịch vụ sự nghiệp công sử dụng ngân sách nhà nước về thông tin, tuyên truyền trong lĩnh vực tiêu chuẩn đo lường chất lượng",
        },
        {
          code: "1505/QĐ-BKHCN",
          publishedAt: "19/04/2023",
          title:
            "Quyết định ban hành quy trình dịch vụ sự nghiệp công sử dụng ngân sách nhà nước về thông tin, tuyên truyền trong lĩnh vực tiêu chuẩn đo lường chất lượng",
        },
      ],
      headers: [
        {
          text: "Số/Ký hiệu",
          value: "code",
          align: "center",
          width: "150px",
        },
        {
          text: "Ngày ban hành",
          value: "publishedAt",
          align: "center",
          width: "150px",
        },
        {
          text: "Tiêu đề",
          value: "title",
          align: "center",
          width: "500px",
        },
        {
          text: "",
          value: "action",
          align: "center",
          sortable: false,
          width: "90px",
        },
      ],
    };
  },
  components: {
    searchForm: () => import("../components/document-search-form.vue"),
  },

  created() {},
  methods: {
    toggleSearch() {},
    setCurrentTab(index) {
      this.currentTab = index;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: var(--v-primary20-base);
}
.search-question {
  width: 700px !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.05);
}
.append-btn {
  height: 100%;
  background: var(--v-primary60-base);
}
.v-input__slot {
  padding: 0px !important;
}
.question-banner {
  height: 300px;
  background: var(--v-primary5-base);
}

.header-table {
  background: var(--v-primary20-base) !important;
}
.image-banner {
  border-radius: 100px;
}
.expansion-header {
  width: 200px;
}
.expansion-content {
  width: 700px !important;
}
.expansion-content-form {
  width: 700px !important;
  border-radius: 8px !important;
  border: 1px solid var(--v-neutral20-base) !important;
}
</style>

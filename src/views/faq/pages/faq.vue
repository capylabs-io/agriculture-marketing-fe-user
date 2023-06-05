<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-15 pb-8 px-6">
    <div class="d-fex flex-column justify-center align-center text-center">
      <div class="text-dp-md font-weight-medium">Những câu hỏi thường gặp</div>
      <div class="text-md mt-2">
        Giải đáp các thắc mắc thường gặp của người dân
      </div>
      <div>
        <v-text-field
          class="border-radius-8 border-neutral20 full-width mt-6 search-question mx-auto"
          placeholder="Tìm kiếm theo từ khóa"
          flat
          solo
          v-model="faqStore.searchKey"
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
    </div>
    <v-row :class="$vuetify.breakpoint.mdAndUp ? 'mt-10' : 'mt-4'">
      <v-col cols="12" md="2">
        <v-select
          class="border-radius-6"
          v-model="currentTab"
          :class="{ 'sort-select': $vuetify.breakpoint.mdAndUp }"
          :items="categories"
          item-text="name"
          item-value="value"
          @change="(value) => setCurrentTab(value)"
          v-if="$vuetify.breakpoint.smAndDown"
          placeholder="Danh mục"
          hide-details
          outlined
          dense
        ></v-select>
        <div v-else>
          <v-row
            class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
            :class="{ active: currentTab == 0 }"
            @click="setCurrentTab(0)"
          >
            Câu hỏi chung
          </v-row>
          <v-row
            v-for="(cate, index) in faqStore.categories"
            :key="index"
            class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6"
            :class="{ active: currentTab == cate.id + 1 }"
            @click="setCurrentTab(cate.id + 1)"
          >
            {{ cate.name }}
          </v-row>
        </div>

        <!-- <v-row
          class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
          :class="{ active: currentTab == 2 }"
          @click="setCurrentTab(2)"
        >
          Câu hỏi về sản phẩm
        </v-row>
        <v-row
          class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
          :class="{ active: currentTab == 3 }"
          @click="setCurrentTab(3)"
        >
          Câu hỏi về lợi ích
        </v-row>
        <v-row
          class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
          :class="{ active: currentTab == 4 }"
          @click="setCurrentTab(4)"
        >
          Câu hỏi về sản xuất
        </v-row>
        <v-row
          class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
          :class="{ active: currentTab == 5 }"
          @click="setCurrentTab(5)"
        >
          Câu hỏi về hệ thống
        </v-row> -->
      </v-col>
      <v-col
        cols="12"
        md="1"
        v-if="!$vuetify.breakpoint.smAndDown"
        class="text-center"
      >
        <v-divider vertical></v-divider
      ></v-col>
      <v-col cols="12" md="9">
        <div
          v-for="(faq, index) in faqStore.slicedfaqs"
          :key="faq.id"
          :class="{ 'mt-6': index != 0 }"
        >
          <div class="font-weight-semibold text-lg">
            {{ faq.question }}
          </div>
          <div class="mt-2 neutral80--text">
            {{ faq.anwser }}
          </div>
          <v-divider
            v-if="index != faqStore.slicedfaqs.length - 1"
            class="mt-6"
          ></v-divider>
        </div>
        <div class="mt-4 mb-16">
          <v-pagination
            color="primary"
            :length="faqStore.totalfaqsPage"
            v-model="faqStore.faqsPage"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
    <div
      class="question-banner d-flex flex-column justify-center align-center text-center mb-16"
    >
      <!-- <v-img
        width="56px"
        max-height="56px"
        :src="require('@/assets/components/landing/image-4.webp')"
        class="mt-6 image-banner"
      >
      </v-img> -->
      <div>
        <v-icon size="64" color="primary">mdi-comment-question-outline</v-icon>
      </div>
      <div class="text-xl font-weight-medium mt-6">
        Không tìm được câu hỏi phù hợp?
      </div>
      <div class="text-md mt-2">
        Nếu như vẫn còn thắc mắc cần được giải đáp, hãy liên hệ với chúng tôi
      </div>
      <v-btn
        class="border-radius-6 mt-8 text-none"
        href="/lien-he"
        color="primary"
        depressed
      >
        Liên hệ ngay
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { faqStore } from "../stores/faqStore";
import { rules } from "@/plugins/rules";
import { gmapApi } from "vue2-google-maps";

export default {
  computed: {
    ...mapStores(faqStore),
    google: gmapApi,
    categories() {
      let categories = [
        {
          name: "Câu hỏi chung",
          value: 0,
        },
      ];
      if (this.faqStore.categories && this.faqStore.categories.length > 0) {
        categories = categories.concat(
          this.faqStore.categories.map((category) => {
            return {
              name: category.name,
              value: category.id + 1,
            };
          })
        );
      }
      return categories;
    },
  },
  data() {
    return {
      currentTab: 0,
      rules: rules,
      isShow: true,
      isShowPass: false,
    };
  },
  async created() {
    await Promise.all([
      this.faqStore.fetchCategories(),
      this.faqStore.fetchfaqs(),
    ]);
  },
  methods: {
    toggleSearch() {},
    setCurrentTab(index) {
      this.currentTab = index;
      this.faqStore.currentTab = index - 1;
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
.image-banner {
  border-radius: 100px;
}
</style>

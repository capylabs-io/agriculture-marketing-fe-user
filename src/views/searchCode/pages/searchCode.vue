<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-15 pb-8 px-6">
    <div class="d-fex flex-column justify-center align-center text-center">
      <div class="text-dp-md font-weight-medium">
        Truy xuất nguồn gốc cây và hoa cảnh
      </div>
      <div class="text-md mt-2">Chính xác, nhanh chóng, thuận lợi</div>
      <div>
        <v-text-field
          class="border-radius-8 border-neutral20 full-width mt-6 search-question mx-auto"
          placeholder="Tìm kiếm theo Mã Truy Xuất được cung cấp"
          flat
          v-model="searchCodeStore.searchCode"
          solo
          outlined
          hide-details
        >
          <template v-slot:append>
            <div
              class="append-btn border-radius-6 pa-3 mr-n2 cursor-pointer"
              @click="onClickSearchCode"
            >
              <v-icon dark> mdi-magnify </v-icon>
            </div>
          </template></v-text-field
        >
      </div>
    </div>
    <!-- <div class="expansion-content-form mx-auto mt-5 pa-4">
      <v-form>
        <v-row class="">
          <v-col cols="12" md="6">
            <div class="font-weight-semibold mb-2 text-left">Loại</div>
            <v-select
              class="border-radius-8"
              :rules="[$rules.required]"
              item-text="name"
              placeholder="chọn loại"
              item-value="id"
              flat
              solo
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <div class="font-weight-semibold mb-2 text-left">Thời gian</div>
            <RangeDatePicker :chosenDate="[]" />
          </v-col>
        </v-row>
      </v-form>
    </div> -->
    <v-divider class="mt-8"></v-divider>

    <div
      class="mt-8"
      v-if="
        searchCodeStore.slicedsearchResults &&
        searchCodeStore.slicedsearchResults.length !== 0
      "
    >
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.searchResults.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div class="mt-3">
        <v-row>
          <v-col
            class="align-self-scretch"
            v-for="(result, index) in searchCodeStore.slicedsearchResults"
            :key="index"
            cols="12"
            md="3"
            xl="3"
          >
            <searchCard :result="result" />
            <!-- <searchCard :post="result" :url="postUrl(post.id)" /> -->
          </v-col>
        </v-row>
      </div>
      <div class="mt-4">
        <v-pagination
          color="primary"
          :length="searchCodeStore.totalsearchResultsPage"
          v-model="searchCodeStore.searchResultsPage"
        ></v-pagination>
      </div>
      <!-- <div
          v-for="(searchinfo, index) in otherPosts"
          :key="searchinfo.id"
          :class="{ 'mt-6': index != 0 }"
        >
          <searchRow :searchinfo="searchinfo" />
          <v-divider
            v-if="index != otherPosts.length - 1"
            class="mt-4"
          ></v-divider>
        </div>
        <div class="mt-4">
          <v-pagination color="primary" :length="2"></v-pagination>
        </div>
      </div> -->
    </div>
    <div class="mt-8" v-else>
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Không có kết quả nào cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div class="d-flex flex-column align-center justify-center mt-12">
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
      </div>
    </div>
    <div
      class="question-banner d-flex flex-column justify-center align-center text-center mb-16 mt-16"
    >
      <v-img
        width="56px"
        max-height="56px"
        :src="require('@/assets/components/landing/image-4.webp')"
        class="mt-6 image-banner"
      >
      </v-img>
      <div class="text-xl font-weight-medium mt-8">
        Không tìm được câu hỏi phù hợp?
      </div>
      <div class="text-md mt-2">
        Nếu như vẫn còn thắc mắc cần được giải đáp, hãy liên hệ với chúng tôi
      </div>
      <v-btn class="border-radius-6 mt-8 text-none" color="primary" depressed>
        Liên hệ ngay
      </v-btn>
    </div>
  </div>
</template>

<script>
// import { mapStores } from "pinia";
// import { supplyStore } from "../store/supply-store";
import { mapStores } from "pinia";
import { searchCodeStore } from "@/views/searchCode/stores/searchCode-Store";
import { rules } from "@/plugins/rules";
import { gmapApi } from "vue2-google-maps";

export default {
  computed: {
    ...mapStores(searchCodeStore),
    google: gmapApi,
  },
  components: {
    // RangeDatePicker: () => import("@/components/RangeDatePicker.vue"),
    // searchRow: () => import("../components/searchCode-row.vue"),
    searchCard: () => import("../components/searchCode-card.vue"),
  },
  data() {
    return {
      rules: rules,
      isShow: true,
      isShowPass: false,
      showCode: "",
    };
  },

  created() {
    const code = this.$route.query.code;
    this.searchCodeStore.searchCode = code;
    this.showCode = code;
    this.searchCodeStore.fetchsearchCodes(code);
  },
  methods: {
    toggleSearch() {},
    onClickSearchCode() {
      this.showCode = this.searchCodeStore.searchCode;
      this.$router.replace({
        query: { code: this.searchCodeStore.searchCode },
      });
      this.searchCodeStore.fetchsearchCodes(this.searchCodeStore.searchCode);
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
.expansion-content-form {
  width: 700px !important;
  border-radius: 8px !important;
  border: 1px solid var(--v-neutral20-base) !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.05);
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-15 pb-8 px-6">
    <div class="d-fex flex-column justify-center align-center text-center">
      <div
        class="font-weight-semibold"
        :class="$vuetify.breakpoint.smAndDown ? 'text-dp-sm' : 'text-dp-md'"
      >
        Truy xuất nguồn gốc cây và hoa cảnh, vật tư
      </div>
      <div
        class="mt-2"
        :class="$vuetify.breakpoint.smAndDown ? 'text-lg' : 'text-xl'"
      >
        Chính xác, nhanh chóng, thuận lợi
      </div>
      <div class="mt-6">
        <v-text-field
          class="border-radius-8 border-neutral20 full-width search-question mx-auto mt-2"
          placeholder="Tìm kiếm theo Mã Truy Xuất được cung cấp (ví dụ: CTTL-9646b4f3d0)"
          v-model="searchCodeStore.searchCode"
          flat
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
        <div
          class="mt-3 neutral70--text"
          :class="$vuetify.breakpoint.smAndDown ? 'text-sm' : 'text-md'"
        >
          <span class="error--text">(*)</span>
          Xin vui lòng nhập
          <span class="font-weight-semibold text-capitalize">Mã truy xuất</span>
          đúng định dạng
        </div>
      </div>
    </div>
    <v-divider class="my-8"></v-divider>
    <div class="text-xl font-weight-semibold text-center">KẾT QUẢ TÌM KIẾM</div>
    <div
      v-if="
        searchCodeStore.slicedsearchResults &&
        searchCodeStore.slicedsearchResults.length !== 0
      "
    >
      <div class="mt-6">
        <div class="d-flex align-center justify-center mx-auto search-panel">
          <div
            class="full-width"
            v-for="(result, index) in searchCodeStore.slicedsearchResults"
            :key="index"
          >
            <searchCard :result="result" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8" v-else>
      <div class="d-flex flex-column align-center justify-center mt-12">
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
        <div class="text-xl font-weight-semibold">
          Không tìm thấy kết quả nào
        </div>
      </div>
    </div>
    <div
      class="question-banner d-flex flex-column justify-center align-center text-center my-16 border-radius-16"
    >
      <v-icon color="primary" size="42">mdi-help-circle</v-icon>
      <div class="text-xl font-weight-semibold mt-4">
        Không tìm được sản phẩm bạn cần?
      </div>
      <div class="text-lg mt-2">
        Nếu như vẫn còn thắc mắc cần được giải đáp, hãy liên hệ với chúng tôi
      </div>
      <v-btn
        class="border-radius-6 mt-8 text-none"
        color="primary"
        href="/lien-he"
        depressed
      >
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
    this.searchCodeStore.fetchSearchCodes();
  },
  methods: {
    toggleSearch() {},
    onClickSearchCode() {
      if (
        !this.searchCodeStore.searchCode ||
        this.showCode == this.searchCodeStore.searchCode
      )
        return;
      this.$router.replace({
        query: { code: this.searchCodeStore.searchCode },
      });
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
.search-panel {
  max-width: 360px !important;
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

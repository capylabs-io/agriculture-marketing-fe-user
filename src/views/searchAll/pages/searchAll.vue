<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-15 pb-8 px-6">
    <div class="d-fex flex-column justify-center align-center text-center">
      <div class="text-dp-md font-weight-medium">Tìm kiếm</div>
      <div class="text-md mt-2">
        Các văn bản hành chính, công văn, nghị định,... có liên quan
      </div>
      <div>
        <v-text-field
          class="border-radius-8 border-neutral20 full-width mt-6 search-question mx-auto"
          placeholder="Tìm kiếm theo từ khóa"
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
    <div class="expansion-content-form mx-auto mt-5">
      <v-form>
        <v-row class="full">
          <v-col cols="12" md="6">
            <div class="font-weight-semibold mb-2 text-left">Loại</div>
            <v-select
              class="border-radius-8"
              :rules="[$rules.required]"
              v-model="searchCodeStore.searchSelection"
              :items="searchSelection"
              item-text="name"
              item-value="value"
              placeholder="chọn loại"
              flat
              solo
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <v-divider class="mt-8"></v-divider>

    <div class="mt-8" v-if="searchCodeStore.searchSelection == 'product'">
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.products.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div v-if="searchCodeStore.products.length > 0">
        <div class="mt-3">
          <v-row>
            <v-col
              class="align-self-scretch"
              v-for="(result, index) in searchCodeStore.slicedsearchAll(
                searchCodeStore.products,
                1,
                12
              )"
              :key="index"
              cols="12"
              md="3"
              xl="3"
            >
              <productCard :product="result" />
            </v-col>
          </v-row>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="
              searchCodeStore.totalsearchAllPage(searchCodeStore.products, 12)
            "
            :value="1"
          ></v-pagination>
        </div>
      </div>

      <div
        class="d-flex flex-column align-center justify-center mt-12"
        v-if="searchCodeStore.products.length <= 0"
      >
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
      </div>
    </div>
    <div class="mt-8" v-if="searchCodeStore.searchSelection == 'seed'">
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.seeds.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div v-if="searchCodeStore.seeds.length > 0">
        <div class="mt-3">
          <v-row>
            <v-col
              class="align-self-scretch"
              v-for="(result, index) in searchCodeStore.slicedsearchAll(
                searchCodeStore.seeds,
                1,
                12
              )"
              :key="index"
              cols="12"
              md="3"
              xl="3"
            >
              <seedCard :seed="result" />
            </v-col>
          </v-row>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="
              searchCodeStore.totalsearchAllPage(searchCodeStore.seeds, 12)
            "
            :value="1"
          ></v-pagination>
        </div>
      </div>

      <div
        class="d-flex flex-column align-center justify-center mt-12"
        v-if="searchCodeStore.seeds.length <= 0"
      >
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
      </div>
    </div>
    <div class="mt-8" v-if="searchCodeStore.searchSelection == 'supply'">
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.supplies.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div v-if="searchCodeStore.supplies.length > 0">
        <div class="mt-3">
          <v-row>
            <v-col
              class="align-self-scretch"
              v-for="(result, index) in searchCodeStore.slicedsearchAll(
                searchCodeStore.supplies,
                1,
                12
              )"
              :key="index"
              cols="12"
              md="3"
              xl="3"
            >
              <supplyCard :supply="result" />
            </v-col>
          </v-row>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="
              searchCodeStore.totalsearchAllPage(searchCodeStore.supplies, 12)
            "
            :value="1"
          ></v-pagination>
        </div>
      </div>
      <div
        class="d-flex flex-column align-center justify-center mt-12"
        v-if="searchCodeStore.supplies.length <= 0"
      >
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
      </div>
    </div>
    <div class="mt-8" v-if="searchCodeStore.searchSelection == 'artisan'">
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.artisans.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div v-if="searchCodeStore.artisans.length > 0">
        <div class="mt-3">
          <v-row>
            <v-col
              class="align-self-scretch"
              v-for="(result, index) in searchCodeStore.slicedsearchAll(
                searchCodeStore.artisans,
                1,
                12
              )"
              :key="index"
              cols="12"
              md="3"
              xl="3"
            >
              <artisanCard :artisan="result" />
            </v-col>
          </v-row>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="
              searchCodeStore.totalsearchAllPage(searchCodeStore.artisans, 12)
            "
            :value="1"
          ></v-pagination>
        </div>
      </div>

      <div
        class="d-flex flex-column align-center justify-center mt-12"
        v-if="searchCodeStore.artisans.length <= 0"
      >
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
      </div>
    </div>
    <div class="mt-8" v-if="searchCodeStore.searchSelection == 'region'">
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.regions.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div v-if="searchCodeStore.regions.length > 0">
        <div class="mt-3">
          <v-row>
            <v-col
              class="align-self-scretch"
              v-for="(result, index) in searchCodeStore.slicedsearchAll(
                searchCodeStore.regions,
                1,
                12
              )"
              :key="index"
              cols="12"
              md="3"
              xl="3"
            >
              <regionCard :region="result" />
            </v-col>
          </v-row>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="
              searchCodeStore.totalsearchAllPage(searchCodeStore.regions, 12)
            "
            :value="1"
          ></v-pagination>
        </div>
      </div>

      <div
        class="d-flex flex-column align-center justify-center mt-12"
        v-if="searchCodeStore.regions.length <= 0"
      >
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
      </div>
    </div>
    <div class="mt-8" v-if="searchCodeStore.searchSelection == 'htx'">
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.htxs.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div v-if="searchCodeStore.htxs.length > 0">
        <div class="mt-3">
          <v-row>
            <v-col
              class="align-self-scretch"
              v-for="(result, index) in searchCodeStore.slicedsearchAll(
                searchCodeStore.htxs,
                1,
                12
              )"
              :key="index"
              cols="12"
              md="3"
              xl="3"
            >
              <htxCard :htx="result" />
            </v-col>
          </v-row>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="
              searchCodeStore.totalsearchAllPage(searchCodeStore.htxs, 12)
            "
            :value="1"
          ></v-pagination>
        </div>
      </div>
      <div
        class="d-flex flex-column align-center justify-center mt-12"
        v-if="searchCodeStore.htxs.length <= 0"
      >
        <v-img
          max-width="240px"
          height="250px"
          :src="require('@/assets/search-not-found.png')"
          cover
        ></v-img>
      </div>
    </div>
    <div class="mt-8" v-if="searchCodeStore.searchSelection == 'agency'">
      <div
        class="text-xl font-weight-semibold"
        :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
      >
        KẾT QUẢ TÌM KIẾM
      </div>
      <div class="text-md mt-2">
        Có
        <span class="primary--text">
          {{ searchCodeStore.agencys.length || "0" }}
        </span>
        kết quả cho từ khoá
        <span class="primary--text"> "{{ showCode }}" </span>
      </div>
      <div v-if="searchCodeStore.agencys.length > 0">
        <div class="mt-3">
          <v-row>
            <v-col
              class="align-self-scretch"
              v-for="(result, index) in searchCodeStore.slicedsearchAll(
                searchCodeStore.agencys,
                1,
                12
              )"
              :key="index"
              cols="12"
              md="3"
              xl="3"
            >
              <agencyCard :agency="result" />
            </v-col>
          </v-row>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="
              searchCodeStore.totalsearchAllPage(searchCodeStore.agencys, 12)
            "
            :value="1"
          ></v-pagination>
        </div>
      </div>
      <div
        class="d-flex flex-column align-center justify-center mt-12"
        v-if="searchCodeStore.agencys.length <= 0"
      >
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
    productCard: () => import("@/views/product/components/product-card.vue"),
    seedCard: () => import("@/views/seedling/components/seedling-card.vue"),
    supplyCard: () => import("@/views/supply/components/supply-card.vue"),
    artisanCard: () => import("@/views/artisan/components/artisan-card.vue"),
    regionCard: () => import("@/views/region/components/region-card.vue"),
    htxCard: () => import("@/views/htx/components/htx-card.vue"),
    agencyCard: () => import("@/views/agency/components/agency-card.vue"),
  },
  data() {
    return {
      rules: rules,
      isShow: true,
      isShowPass: false,
      showCode: "",
      searchSelection: [
        {
          value: "product",
          name: "Cây Cảnh",
        },
        {
          value: "seed",
          name: "Giống",
        },
        {
          value: "supply",
          name: "Vật tư",
        },
        {
          value: "artisan",
          name: "Nghệ nhân",
        },
        {
          value: "region",
          name: "Vùng sản xuất",
        },
        {
          value: "htx",
          name: "Hợp tác xã",
        },
        {
          value: "agency",
          name: "Đại lý",
        },
      ],
    };
  },

  created() {
    const code = this.$route.query.code;
    this.searchCodeStore.searchCode = code;
    this.showCode = code;
    this.searchCodeStore.fetchsearchAll(code);
  },
  methods: {
    onClickSearchCode() {
      this.showCode = this.searchCodeStore.searchCode;
      this.$router.replace({
        query: { code: this.searchCodeStore.searchCode },
      });
      this.searchCodeStore.fetchsearchAll(this.searchCodeStore.searchCode);
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
  /* border-radius: 8px !important;
  border: 1px solid var(--v-neutral20-base) !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.05);*/
}
</style>

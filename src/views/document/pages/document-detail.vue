<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-6 pb-8 px-6">
    <div class="neutral60--text font-weight-semibold d-flex flex-wrap">
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/tai-lieu', -1)">Tài liệu</div>
      <span class="mx-2">/</span>
      <div class="primary--text text-none">Chi tiết tài liệu</div>
    </div>
    <div class="text-dp-md font-weight-medium mt-10">Chi tiết tài liệu</div>
    <div class="mt-5 table-detail border-radius-16 neutral20-border mb-16">
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Trích yếu</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.title
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Số/Ký hiệu</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.numberOf
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Loại văn bản</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.documentCategory
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Lĩnh vực</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.field
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Cơ quan ban hành</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.issuer
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Người ký</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.signatory
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Nơi nhận</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.receiver
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Ngày ban hành</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">{{
          documentStore.documents.issueDate
        }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Tệp đính kèm</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">
          <div class="d-flex align-center justify-center blue70--text">
            <v-btn
              text
              dense
              depressed
              class="text-none d-flex flex-column justify-center align-center"
              color="blue70"
              :href="documentStore.documents.attachment"
            >
              <v-icon small class="mr-1">mdi-download</v-icon>
              <span class="text-truncate">
                {{ getAttachment(documentStore.documents.attachment) }}</span
              >
            </v-btn>
          </div></v-col
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { documentStore } from "../stores/documentStore";

export default {
  computed: {
    ...mapStores(documentStore),
  },
  data() {
    return {
      currentTab: 0,
      isShow: true,
      isShowPass: false,
    };
  },
  watch: {
    "$route.params.code": {
      async handler() {
        await this.loadDetail();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    async loadDetail() {
      const code = this.$route.params.code;
      await this.documentStore.fetchDocument(code);
    },
    getAttachment(string) {
      return string.substring(string.lastIndexOf("/") + 1);
    },
    onBackClicked() {
      this.documentStore.reset();
      this.$router.push("/tai-lieu");
    },
  },
};
</script>

<style scoped lang="scss">
.table-detail {
  width: 900px;
}
.vl {
  border-right: 1px solid var(--v-neutral20-base) !important;
}
</style>

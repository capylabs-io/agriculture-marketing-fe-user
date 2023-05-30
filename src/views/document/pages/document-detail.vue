<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-6 pb-8 px-6">
    <div class="neutral60--text font-weight-semibold d-flex flex-wrap">
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/tai-lieu')">
        Tài liệu
      </div>
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
        <v-col cols="12" md="8" class="d-flex align-center pa-4"
          >Quyết định ban hành quy trình dịch vụ sự nghiệp công sử dụng ngân
          sách nhà nước về thông tin, tuyên truyền trong lĩnh vực tiêu chuẩn đo
          lường chất lượng</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Số/Ký hiệu</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4"
          >1505/QĐ-BKHCN</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Loại văn bản</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4"
          >Chỉ định</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Lĩnh vực</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">N/A</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Cơ quan ban hành</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4"
          >Bộ Khoa học và Công nghệ</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Người ký</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4"
          >Thứ trưởng Lê Xuân Định</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Nơi nhận</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4"
          >Trung tâm Mã số mã vạch Quốc gia</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Ngày ban hành</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4"
          >18/10/2022</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="d-flex align-center pa-4"
          >Tệp đính kèm</v-col
        >
        <v-col cols="12" md="1" class="vl"></v-col>
        <v-col cols="12" md="8" class="d-flex align-center pa-4">
          <div class="d-flex align-center justify-center">
            <v-btn
              text
              dense
              depressed
              class="text-none d-flex flex-column justify-center align-center"
              color="blue70"
            >
              <v-icon small class="mr-1">mdi-download</v-icon>
              BKHCN.docx
            </v-btn>
          </div></v-col
        >
      </v-row>
    </div>
  </div>
</template>

<script>
// import { mapStores } from "pinia";
// import { supplyStore } from "../store/supply-store";

export default {
  computed: {
    // ...mapStores(supplyStore),
  },
  data() {
    return {
      currentTab: 0,
      isShow: true,
      isShowPass: false,
    };
  },
  created() {},
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

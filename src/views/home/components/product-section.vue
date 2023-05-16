<template>
  <div class="page-container mx-auto py-16">
    <div
      class="font-weight-semibold text-dp-md text-center"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      Sản phẩm tiêu biểu
    </div>
    <div
      class="d-flex justify-center mt-6 gap-8"
      data-aos="zoom-in"
      data-aos-duration="600"
    >
      <v-btn
        class="text-none text-capitalize px-4 border-radius-8 category active-category"
        elevation="0"
        >Nông sản</v-btn
      >
      <v-btn
        class="text-none text-capitalize px-4 border-radius-8 category"
        elevation="0"
        >Thủy sản</v-btn
      >
      <v-btn
        class="text-none text-capitalize px-4 border-radius-8 category"
        elevation="0"
        >Trái cây</v-btn
      >
      <v-btn
        class="text-none text-capitalize px-4 border-radius-8 category"
        elevation="0"
        >Sản phẩm khác</v-btn
      >
    </div>
    <div class="mt-12">
      <v-row data-aos="zoom-in-up" data-aos-duration="1000">
        <v-col cols="12" md="3">
          <productCard />
        </v-col>
        <v-col cols="12" md="3">
          <productCard />
        </v-col>
        <v-col cols="12" md="3">
          <productCard />
        </v-col>
        <v-col cols="12" md="3">
          <productCard />
        </v-col>
      </v-row>
    </div>
    <div class="mt-12 text-center">
      <v-btn
        class="text-none text-capitalize px-3 py-5 border-radius-8 btn-show-more"
        elevation="0"
        >Xem thêm</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {
    productCard: () => import("./home-product-card.vue"),
  },
};
</script>

<style scoped>
.category {
  background-color: transparent !important;
  border: 1px solid var(--v-neutral30-base);
}
.active-category {
  background-color: var(--v-primary20-base) !important;
  border: none !important;
}
</style>

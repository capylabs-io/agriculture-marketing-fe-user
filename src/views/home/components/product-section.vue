<template>
  <div
    class="page-container mx-auto px-6"
    :class="{ 'py-16': $vuetify.breakpoint.mdAndUp }"
  >
    <div
      class="font-weight-semibold text-dp-md text-center"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      Sản phẩm tiêu biểu
    </div>
    <div
      class="d-flex justify-center mt-6 gap-8 flex-wrap"
      data-aos="zoom-in"
      data-aos-duration="600"
    >
      <v-btn
        class="text-none text-capitalize px-4 border-radius-8 category"
        elevation="0"
        :class="{ 'active-category': homeStore.productCategory == 'all' }"
        @click="homeStore.productCategory = 'all'"
        >Tất cả</v-btn
      >
      <v-btn
        class="text-none text-capitalize px-4 border-radius-8 category"
        elevation="0"
        v-for="category in homeStore.productCategories"
        :class="{ 'active-category': category.id == homeStore.productCategory }"
        :key="category.id"
        @click="homeStore.productCategory = category.id"
        >{{ category.name }}</v-btn
      >
    </div>
    <div class="mt-12">
      <v-row data-aos="zoom-in-up" data-aos-duration="1000">
        <v-col
          cols="12"
          md="3"
          v-for="product in homeStore.slicedProducts"
          :key="product.id"
        >
          <productCard :product="product" />
        </v-col>
      </v-row>
    </div>
    <div class="mt-12 text-center">
      <v-btn
        class="text-none text-capitalize px-3 py-5 border-radius-8 btn-show-more"
        elevation="0"
        @click="$router.push('/products')"
        >Xem thêm</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { homeStore } from "../store/home-store";
export default {
  computed: {
    ...mapStores(homeStore),
  },
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

<template>
  <div
    class="page-container mx-auto px-6 full-width"
    :class="{ 'py-16': $vuetify.breakpoint.mdAndUp }"
  >
    <div class="d-flex align-center justify-space-between">
      <div class="font-weight-semibold text-dp-sm text-center">Hợp tác xã</div>
      <v-btn
        class="text-none text-md primary--text px-0"
        text
        @click="$router.push('/hop-tac-xa')"
        >Xem thêm <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <div class="mt-8">
      <v-row data-aos="zoom-in-up" data-aos-duration="1000">
        <v-col
          cols="12"
          md="3"
          sm="6"
          xs="12"
          v-for="product in homeStore.slicedProducts"
          :key="product.id"
        >
          <productCard :product="product" />
        </v-col>
      </v-row>
    </div>
    <div class="d-flex align-center justify-space-between mt-16">
      <div class="font-weight-semibold text-dp-sm text-center">Đại lý</div>
      <v-btn
        class="text-none text-md primary--text px-0"
        text
        @click="$router.push('/hop-tac-xa')"
        >Xem thêm <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <div class="mt-8">
      <v-row data-aos="zoom-in-up" data-aos-duration="1000">
        <v-col
          cols="12"
          md="3"
          sm="6"
          xs="12"
          v-for="product in homeStore.slicedProducts"
          :key="product.id"
        >
          <productCard :product="product" />
        </v-col>
      </v-row>
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
  background-color: white !important;
  border: 1px solid var(--v-neutral30-base);
}
.active-category {
  background-color: var(--v-primary20-base) !important;
  border: none !important;
}
</style>
  
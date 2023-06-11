<template>
  <div
    class="product-section mt-n2 d-flex flex-column justify-center"
    :class="{ 'py-12': $vuetify.breakpoint.smAndDown }"
  >
    <div
      class="page-container mx-auto px-6 full-width"
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
        class="neutral80--text text-lg text-center mt-2"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        Các sản phẩm chất lượng nhất của tỉnh Bến Tre
      </div>
      <div class="mt-12">
        <v-row data-aos="fade-up" data-aos-duration="800">
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
.product-section {
  background: url("@/assets/components/home/bg.webp");
  background-position: right center;
  background-size: cover;
  min-height: 560px;
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex full-height">
    <FilterDrawer v-if="$vuetify.breakpoint.mdAndUp" />
    <div class="full-width">
      <div class="page-container mx-auto pa-6 full-height">
        <div v-if="$vuetify.breakpoint.smAndDown">
          <MobileFilterDrawer />
        </div>
        <div class="d-flex align-center justify-space-between mt-4">
          <div class="neutral70--text">
            Hiển thị
            <span class="text-lg font-weight-bold">{{
              productStore.totalFilteredProduct
            }}</span>
            trên
            <span class="text-lg font-weight-bold">{{
              productStore.totalProduct
            }}</span>
            kết quả
          </div>
          <v-select
            class="sort-select border-radius-6"
            v-model="productStore.sortBy"
            v-if="$vuetify.breakpoint.mdAndUp"
            :items="sortBy"
            item-text="text"
            item-value="value"
            hide-details
            outlined
            dense
          ></v-select>
        </div>
        <div v-if="productStore.totalFilteredProduct > 0">
          <v-row class="mt-4">
            <v-col
              v-for="product in productStore.slicedProducts"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
              xl="3"
            >
              <ProductCard :product="product"></ProductCard>
            </v-col>
          </v-row>

          <div class="mt-4">
            <v-pagination
              color="primary"
              :length="productStore.totalProductPage"
              v-model="productStore.productPage"
            ></v-pagination>
          </div>
        </div>
        <div
          class="font-weight-bold text-center text-dp-md full-height no-item d-flex flex-column justify-center"
          v-else
        >
          Không có sản phẩm nào!
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-item {
  min-height: 100vh !important;
}
</style>

<script>
import { mapStores } from "pinia";
import { productStore } from "../store/product-store";

export default {
  components: {
    FilterDrawer: () => import("../components/filter-drawer.vue"),
    MobileFilterDrawer: () => import("../components/mobile-filter-drawer.vue"),
    ProductCard: () => import("../components/product-card.vue"),
  },
  computed: {
    ...mapStores(productStore),
  },
  async created() {
    await Promise.all([
      this.productStore.fetchProducts(),
      this.productStore.fetchCategories(),
    ]);
  },
  data() {
    return {
      sortBy: [
        {
          text: "Mới nhất",
          value: "newest",
        },
        {
          text: "Cũ nhất",
          value: "oldest",
        },
        {
          text: "Giá thấp dần",
          value: "price:desc",
        },
        {
          text: "Giá tăng dần",
          value: "price:asc",
        },
        {
          text: "Tên A-Z",
          value: "name:asc",
        },
        {
          text: "Tên Z-A",
          value: "name:desc",
        },
      ],
    };
  },
};
</script>

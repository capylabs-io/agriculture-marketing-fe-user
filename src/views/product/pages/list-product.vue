<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <FilterDrawer />
    <div class="page-container mx-auto pa-6">
      <v-row>
        <v-col
          v-for="product in productStore.slicedProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="3"
          xl="2"
        >
          <ProductCard class="card mx-auto" :product="product"></ProductCard>
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
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "../store/product-store";

export default {
  components: {
    FilterDrawer: () => import("../components/filter-drawer.vue"),
    ProductCard: () => import("../components/product-card.vue"),
  },
  computed: {
    ...mapStores(productStore),
  },
  created() {
    this.productStore.fetchProducts();
  },
};
</script>

<style scoped>
.card {
  width: 248px;
  height: max-content;
}
</style>

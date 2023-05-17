<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <FilterDrawer />
    <div class="page-container mx-auto pa-6">
      <v-row>
        <v-col v-for="i in 12" :key="i" cols="12" md="3" xl="2">
          <ProductCard class="card mx-auto"> </ProductCard>
        </v-col>
      </v-row>

      <div class="mt-4">
        <v-pagination color="primary" :length="10"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    FilterDrawer: () => import("../components/filter-drawer.vue"),
    ProductCard: () => import("../components/product-card.vue"),
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.card {
  width: 248px;
  height: max-content;
}
</style>

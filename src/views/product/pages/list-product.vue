<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex">
    <NavigationDrawer />
    <div class="container mx-auto">
      <v-row>
        <v-col v-for="i in 12" :key="i" cols="12" md="3" xl="2">
          <ProductCard class="card mx-auto"> </ProductCard>
        </v-col>
      </v-row>

      <div class="pagination mt-10">
        <v-pagination
          class="pa-0 mr-n2"
          color="primary"
          :length="10"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NavigationDrawer: () => import("../components/navigation-drawer.vue"),
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
.container {
  width: 1700px;
}
</style>

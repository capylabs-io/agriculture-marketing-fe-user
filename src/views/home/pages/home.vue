<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <bannerSection />
    <functionSection />
    <productSection />
    <newsSection />
    <expertSection />
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
    bannerSection: () => import("../components/banner-section.vue"),
    productSection: () => import("../components/product-section.vue"),
    // seedlingSection: () => import("../components/seedling-section.vue"),
    functionSection: () => import("../components/function-section.vue"),
    newsSection: () => import("../components/news-section.vue"),
    expertSection: () => import("../components/expert-section.vue"),
  },
  async created() {
    await Promise.all([
      this.homeStore.fetchProducts(),
      this.homeStore.fetchProductCategories(),
      this.homeStore.fetchSeeds(),
      this.homeStore.fetchSeedCategories(),
    ]);
  },
};
</script>

<style>
.home {
  overflow-x: hidden !important;
  background-color: white;
}
.btn-show-more {
  background-color: transparent !important;
  border: 1px solid var(--v-neutral30-base) !important;
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <!-- <bannerSection /> -->
    <searchSection />
    <!-- <functionSection /> -->
    <newsSection />
    <div>
      <img class="banner-img" src="@/assets/components/home/banner.png" />
    </div>
    <productSection />
    <introSection />
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
    searchSection: () => import("../components/search-section.vue"),
    // bannerSection: () => import("../components/banner-section.vue"),
    // seedlingSection: () => import("../components/seedling-section.vue"),
    // functionSection: () => import("../components/function-section.vue"),
    newsSection: () => import("../components/news-section.vue"),
    productSection: () => import("../components/product-section.vue"),
    expertSection: () => import("../components/expert-section.vue"),
    introSection: () => import("../components/intro-section.vue"),
  },
  async created() {
    await Promise.all([
      this.homeStore.fetchProducts(),
      this.homeStore.fetchProductCategories(),
      this.homeStore.fetchPosts(),
    ]);
  },
};
</script>

<style>
.home {
  overflow-x: hidden !important;
  background-color: white;
}
.banner-img {
  max-height: 480px;
  width: 100%;
}
.btn-show-more {
  background-color: transparent !important;
  border: 1px solid var(--v-neutral30-base) !important;
}
</style>

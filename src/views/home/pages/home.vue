<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <v-btn
      v-if="windowTop > 1000"
      color="primary"
      fab
      depressed
      @click="scrollToTop"
      class="d-flex flex-column align-center justify-center scroll-btn"
      ><v-icon dark large> mdi-arrow-up</v-icon></v-btn
    >
    <searchSection />
    <!-- <functionSection /> -->
    <newsSection />
    <bannerSection />
    <!-- <div>
      <img class="banner-img" src="@/assets/components/home/banner.png" />
    </div> -->
    <productSection />
    <introSection />
    <expertSection />
    <affiliateSection />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { homeStore } from "../store/home-store";
export default {
  computed: {
    ...mapStores(homeStore),
  },
  data() {
    return {
      windowTop: window.top.scrollY,
    };
  },
  components: {
    searchSection: () => import("../components/search-section.vue"),
    bannerSection: () => import("../components/banner-section.vue"),
    // seedlingSection: () => import("../components/seedling-section.vue"),
    // functionSection: () => import("../components/function-section.vue"),
    newsSection: () => import("../components/news-section.vue"),
    productSection: () => import("../components/product-section.vue"),
    expertSection: () => import("../components/expert-section.vue"),
    introSection: () => import("../components/intro-section.vue"),
    affiliateSection: () => import("../components/affiliate-section.vue"),
  },
  async created() {
    window.addEventListener("scroll", this.handleScroll);

    await Promise.all([
      this.homeStore.fetchProducts(),
      this.homeStore.fetchProductCategories(),
      this.homeStore.fetchPosts(),
    ]);
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.windowTop = window.top.scrollY;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
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
.scroll-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 99 !important;
  border-radius: 100%;
}
</style>

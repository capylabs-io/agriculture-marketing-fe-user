<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <searchSection />
    <newsSection />
    <bannerSection v-if="!$vuetify.breakpoint.xsOnly" />
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
    return {};
  },
  components: {
    searchSection: () => import("../components/search-section.vue"),
    bannerSection: () => import("../components/banner-section.vue"),
    newsSection: () => import("../components/news-section.vue"),
    productSection: () => import("../components/product-section.vue"),
    expertSection: () => import("../components/expert-section.vue"),
    introSection: () => import("../components/intro-section.vue"),
    affiliateSection: () => import("../components/affiliate-section.vue"),
  },
  async created() {
    window.addEventListener("scroll", this.handleScroll);

    await Promise.all([
      this.homeStore.fetchHomeConfig(),
      this.homeStore.fetchProducts(),
      this.homeStore.fetchPosts(),
      this.homeStore.fetchHtxs(),
      this.homeStore.fetchRegions(),
      this.homeStore.fetchArtisans(),
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
</style>

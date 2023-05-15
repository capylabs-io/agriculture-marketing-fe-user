<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <firstSection></firstSection>
    <secondSection></secondSection>
    <div class="page-container mx-auto py-16">
      <div class="font-weight-semibold text-dp-md text-center">
        Sản phẩm tiêu biểu
      </div>
      <div class="d-flex justify-center"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    firstSection: () => import("../components/first-section.vue"),
    secondSection: () => import("../components/second-section.vue"),
  },
};
</script>

<style scoped>
.home {
  overflow-x: hidden !important;
  background-color: white;
}
.tab-text {
  border: 1px solid var(--v-neutral30-base) !important;
}
.active .v-tab {
  background: var(--v-primary-base) !important;
  color: black;
}
</style>

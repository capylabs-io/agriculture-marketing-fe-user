<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home mx-auto d-flex flex-column">
    <firstSection></firstSection>
    <secondSection></secondSection>
  </div>
</template>

<script>
export default {
  components: {
    firstSection: () => import("@/views/landing/components/first-section.vue"),
    secondSection: () =>
      import("@/views/landing/components/second-section.vue"),
  },
};
</script>

<style scoped>
.home {
  overflow-x: hidden !important;
  background-color: white;
}
</style>

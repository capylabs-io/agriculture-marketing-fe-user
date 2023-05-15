<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <firstSection></firstSection>
    <secondSection></secondSection>
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
</style>

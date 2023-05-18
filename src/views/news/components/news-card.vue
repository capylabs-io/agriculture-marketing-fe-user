<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer neutral20-border"
    @click="goToNewsDetail()"
    >
    <v-img
      max-height="170px"
      src="@/assets/components/landing/product-example.png"
    ></v-img>
    <!-- <div class="product-id text-center text-sm py-1">NSHN-12345</div> -->
    <div class="pa-5">
      <div class="text-sm font-weight-medium title">KIẾN THỨC</div>
      <div class="text-xl font-weight-semibold mt-2">
        Cây Cau Cảnh – Loại cây mang ý nghĩa tài lộc và phú quý
      </div>
      <div class="text-sm font-weight-medium mt-2 neutral40--text">
        20/10/2023
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToNewsDetail() {
      this.$router.push("/news/1");
    },
  },
};
</script>

<style scoped>
.product-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
.title {
  color: var(--v-green70-base);
}
</style>

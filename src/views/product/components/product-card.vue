<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer"
    @click="goToProductDetail()"
  >
    <v-img src="@/assets/components/landing/product-example.png"></v-img>
    <div class="product-id text-center text-sm py-1">NSHN-12345</div>
    <div class="text-sm font-weight-medium px-4 py-2">
      Bonsai ngân lượng màu vàng kim 2 dòng test thử
    </div>
    <div class="text-sm font-weight-medium px-4 py-1 d-flex align-center">
      <div class="text-dp-xs font-weight-semibold">150.000</div>
      <div class="ml-1 text-sm neutral80--text">vnd</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToProductDetail() {
      this.$router.push("/product/1");
    },
  },
};
</script>

<style scoped>
.product-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>

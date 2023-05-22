<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goToProductDetail()"
  >
    <v-img :src="productImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="product-id text-center text-sm py-1">{{ product.code }}</div>
    <div class="pa-4 d-flex flex-column full-height">
      <div class="text-sm font-weight-semibold flex-grow-1">
        {{ product.name }}
      </div>
      <div class="text-sm font-weight-medium d-flex align-center mt-1">
        <div class="text-dp-xs font-weight-semibold">
          {{ numberWithCommas(product.price) || "---" }}
        </div>
        <div class="ml-1 text-sm neutral80--text">vnd</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    productImage() {
      if (!this.product || !this.product.images)
        return require("@/assets/no-image.png");
      return this.product.images;
    },
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goToProductDetail() {
      if (!this.product) return;
      this.$router.push(`/products/${this.product.code}`);
    },
    numberWithCommas(x) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
      return x;
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

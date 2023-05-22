<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer"
    @click="goTo()"
  >
    <v-img :src="productImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="product-id text-center text-sm py-1">
      {{ productCode }}
    </div>
    <div class="text-center text-xl font-weight-medium pa-4">
      {{ productName }}
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
export default {
  computed: {
    productImage() {
      if (!this.product || !this.product.images)
        return require("@/assets/no-image.png");
      return this.product.images;
    },
    productCode() {
      return get(this.product, "code", "Mã sản phẩm");
    },
    productName() {
      return get(this.product, "name", "Tên sản phẩm");
    },
  },
  props: {
    product: Object,
  },
  methods: {
    goTo() {
      this.$router.push(`/products`);
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

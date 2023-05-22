<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goTo()"
  >
    <v-img :src="productImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="full-height d-flex flex-column py-2">
      <div class="product-id text-center text-sm">
        {{ productCode }}
      </div>
      <div class="text-center text-xl font-weight-medium px-4 pt-1 flex-grow-1">
        {{ productName }}
      </div>
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

<style scoped></style>

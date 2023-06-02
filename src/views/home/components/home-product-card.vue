<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goTo()"
  >
    <v-img
      :src="productImage"
      :aspect-ratio="16 / 9"
      height="164px"
      cover
    ></v-img>
    <div class="full-height d-flex flex-column pt-3 pb-2">
      <div
        class="d-flex align-center justify-center product-id text-center text-sm text-uppercase"
      >
        <v-icon small class="mr-1" color="primary">mdi-qrcode</v-icon>
        {{ productCode }}
      </div>
      <div class="text-center text-xl font-weight-medium px-4 pt-1 flex-grow-1">
        {{ productName }}
      </div>
      <v-divider class="mt-3"></v-divider>
      <div class="text-sm text-center mt-2 primary--text">
        {{ productCategory }}
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
    productCategory() {
      return get(this.product, "productCategory.name", "Danh mục sản phẩm");
    },
  },
  props: {
    product: Object,
  },
  methods: {
    goTo() {
      this.$router.push(`/cay-canh/${this.productCode}`);
    },
  },
};
</script>

<style scoped></style>

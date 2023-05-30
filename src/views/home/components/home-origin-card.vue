<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goTo()"
  >
    <v-img
      :src="originImage"
      :aspect-ratio="16 / 9"
      height="164px"
      cover
    ></v-img>
    <div class="full-height d-flex flex-column pt-3 pb-2">
      <div
        class="d-flex align-center justify-center origin-id text-center text-sm text-uppercase"
      >
        <v-icon small class="mr-1" color="primary">mdi-qrcode</v-icon>
        {{ originCode }}
      </div>
      <div class="text-center text-xl font-weight-medium px-4 pt-1 flex-grow-1">
        {{ originName }}
      </div>
      <v-divider class="mt-3"></v-divider>
      <div class="text-sm text-center mt-2 primary--text">
        {{ originCategory }}
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
export default {
  computed: {
    originImage() {
      if (!this.origin || !this.origin.images)
        return require("@/assets/no-image.png");
      return this.origin.images;
    },
    originCode() {
      return get(this.origin, "code", "Mã sản phẩm");
    },
    originName() {
      return get(this.origin, "name", "Tên sản phẩm");
    },
    originCategory() {
      return get(this.origin, "originCategory.name", "Danh mục sản phẩm");
    },
  },
  props: {
    origin: Object,
  },
  methods: {
    goTo() {
      this.$router.push(`/origins/${this.originCode}`);
    },
  },
};
</script>

<style scoped></style>

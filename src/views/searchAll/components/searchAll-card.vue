<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goToresultDetail()"
  >
    <v-img :src="resultImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="pa-4 d-flex flex-column full-height">
      <div class="text-xs neutral60--text font-weight-medium">
        {{ resultCode }}
      </div>
      <div class="text-sm font-weight-medium flex-grow-1 mt-1">
        {{ resultName }}
      </div>
      <div class="font-weight-medium d-flex align-center mt-3">
        <div class="text-lg font-weight-bold">
          {{ numberWithCommas(resultPrice) || "---" }}
        </div>
        <div class="ml-1 text-xs neutral80--text">vnd</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    resultImage() {
      if (!this.result || !this.result.images)
        return require("@/assets/no-image.webp");
      return this.result.images;
    },
    resultCode() {
      if (!this.result || !this.result.code)
        return "unKnown";
      return this.result.code;
    },
    resultName() {
      if (!this.result || !this.result.name)
        return "unKnown";
      return this.result.name;
    },
    resultPrice() {
      if (!this.result || !this.result.price)
      return "unKnown";
      return this.result.price;
    },
  },
  props: {
    result: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goToresultDetail() {
      if (!this.result) return;
      this.$router.push(`/cay-canh/${this.result.code}`);
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
.result-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>

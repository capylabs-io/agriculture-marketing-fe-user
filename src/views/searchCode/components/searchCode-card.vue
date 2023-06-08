<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goToDetail()"
  >
    <v-img :src="resultImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="pa-4 d-flex full-height align-center">
      <div class="d-flex flex-column flex-grow-1">
        <div class="text-sm neutral60--text font-weight-medium">
          {{ resultCode }}
        </div>
        <div class="text-md font-weight-medium flex-grow-1 mt-1">
          {{ resultName }}
        </div>
        <div class="font-weight-medium d-flex align-center mt-3">
          <div class="text-xl font-weight-bold">
            {{ numberWithCommas(resultPrice) || "---" }}
          </div>
          <div class="ml-1 text-xs neutral80--text">vnd</div>
        </div>
      </div>
      <div class="neutral20-border border-radius-8">
        <v-img
          class="qrcode-img"
          :aspect-ratio="1 / 1"
          :src="productQRImage"
          contain
        ></v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    productQRImage() {
      if (!this.result || !this.result.qrCodeImage)
        return require("@/assets/qrcode-example.png");
      return this.result.qrCodeImage;
    },
    resultImage() {
      if (!this.result || !this.result.images)
        return require("@/assets/no-image.png");
      return this.result.images;
    },
    resultCode() {
      if (!this.result || !this.result.code) return "unKnown";
      return this.result.code;
    },
    resultName() {
      if (!this.result || !this.result.name) return "unKnown";
      return this.result.name;
    },
    resultPrice() {
      if (!this.result || !this.result.price) return "unKnown";
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
    goToDetail() {
      if (!this.result) return;
      switch (this.result.type) {
        default:
        case "product":
          this.$router.push(`/cay-canh/${this.result.code}`);
          break;
        case "seed":
          this.$router.push(`/giong/${this.result.code}`);
          break;
        case "supply":
          this.$router.push(`/vat-tu/${this.result.code}`);
          break;
      }
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
.qrcode-img {
  width: 86px;
  height: 86px;
}
</style>

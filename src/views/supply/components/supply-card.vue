<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goToSupplyDetail()"
  >
    <v-img :src="productImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="pa-4 d-flex flex-column full-height">
      <div class="text-xs neutral60--text font-weight-medium">
        {{ supply.code }}
      </div>
      <div class="text-sm font-weight-medium flex-grow-1 mt-1">
        {{ supply.name }}
      </div>
      <div class="font-weight-medium d-flex align-center mt-3">
        <div class="text-lg font-weight-bold">
          {{ numberWithCommas(supply.price) || "---" }}
        </div>
        <div class="ml-1 text-xs neutral80--text">vnd</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    supplyImage() {
      if (!this.supply || !this.supply.images)
        return require("@/assets/no-image.png");
      return this.supply.images;
    },
  },
  props: {
    supply: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goToSupplyDetail() {
      if (!this.supply) return;
      this.$router.push(`/supplies/${this.supply.code}`);
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
.supply-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>

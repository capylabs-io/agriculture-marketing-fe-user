<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goToSupplyDetail()"
  >
    <v-img :src="supplyImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="supply-id text-center text-sm py-1">{{ supply.code }}</div>
    <div class="pa-4">
      <div class="text-sm font-weight-semibold flex-grow-1">
        {{ supply.name }}
      </div>
      <div class="text-sm font-weight-medium d-flex align-center mt-1">
        <div class="text-dp-xs font-weight-semibold">
          {{ supply.price || "---" }}
        </div>
        <div class="ml-1 text-sm neutral80--text">vnd</div>
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
  },
};
</script>

<style scoped>
.supply-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>

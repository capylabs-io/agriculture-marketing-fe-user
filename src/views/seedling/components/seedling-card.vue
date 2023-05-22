<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goToSeedlingDetail()"
  >
    <v-img :src="seedImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="seed-id text-center text-sm py-1">{{ seed.code }}</div>
    <div class="pa-4">
      <div class="text-sm font-weight-semibold flex-grow-1">
        {{ seed.name }}
      </div>
      <div class="text-sm font-weight-medium d-flex align-center mt-1">
        <div class="text-dp-xs font-weight-semibold">
          {{ numberWithCommas(seed.price) || "---" }}
        </div>
        <div class="ml-1 text-sm neutral80--text">vnd</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    seedImage() {
      if (!this.seed || !this.seed.images)
        return require("@/assets/no-image.png");
      return this.seed.images;
    },
  },
  props: {
    seed: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goToSeedlingDetail() {
      if (!this.seed) return;
      this.$router.push(`/seedlings/${this.seed.code}`);
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
.seed-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>

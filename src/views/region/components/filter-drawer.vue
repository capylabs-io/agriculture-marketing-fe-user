<template>
  <div class="align-self-stretch full-height filter-drawer">
    <div class="pa-6">
      <div class="text-md font-weight-semibold">
        <v-icon class="mr-2">mdi-shape-plus-outline</v-icon>
        Danh mục
      </div>
      <v-divider class="mt-4"></v-divider>
      <v-list>
        <v-list-item
          class="border-radius-8"
          :class="{ 'active-item': !regionStore.filterCategory }"
          @click="regionStore.filterCategory = null"
          dense
        >
          <v-list-item-title class="text-capitalize text-sm"
            >Tất cả</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          class="border-radius-8 mt-1"
          v-for="category in regionStore.categories"
          :class="{ 'active-item': regionStore.filterCategory == category }"
          :key="category.id"
          @click="regionStore.filterCategory = category"
          dense
        >
          <v-list-item-title class="text-capitalize text-sm">{{
            category.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { regionStore } from "../store/region-store";

export default {
  computed: {
    ...mapStores(regionStore),
  },
  methods: {
    onLogoutClicked() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 18px !important;
}

.active-item {
  background: var(--v-primary-base) !important;
  color: white !important;
}

.filter-drawer {
  min-width: 300px;
  border-right: 1px solid var(--v-neutral20-base) !important;
}
</style>

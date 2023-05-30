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
          :class="{ 'active-item': !htxStore.filterCategory }"
          @click="htxStore.filterCategory = null"
          dense
        >
          <v-list-item-title class="text-capitalize text-sm"
            >Tất cả</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          class="border-radius-8 mt-1"
          v-for="category in htxStore.categories"
          :class="{ 'active-item': htxStore.filterCategory == category }"
          :key="category.id"
          @click="htxStore.filterCategory = category"
          dense
        >
          <v-list-item-title class="text-capitalize text-sm">{{
            category.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <!-- <div class="py-2">
        <v-expansion-panels flat accordion>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-md font-weight-bold">
              <div>
                <v-icon class="mr-1" small>mdi-shape-plus-outline</v-icon>
                Danh mục
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
                v-for="category in htxStore.categories"
                v-model="htxStore.filterCategory"
                :key="category.id"
                :value="category.id"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">
                    {{ category.name }}
                  </div>
                </template>
              </v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels flat accordion class="mt-4">
          <v-expansion-panel>
            <v-expansion-panel-header class="text-md font-weight-bold">
              <div>
                <v-icon class="mr-1" small>mdi-tag</v-icon>
                Lọc giá
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
                v-model="htxStore.filterPrice"
                value="lowerThan500k"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Dưới 500k</div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="htxStore.filterPrice"
                value="between500kAnd1mil"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">
                    Từ 500k đến 1 triệu
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="htxStore.filterPrice"
                value="between1mAnd5mil"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">
                    Từ 1 triệu đến 5 triệu
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="htxStore.filterPrice"
                value="over5mil"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Từ 5 triệu trở lên</div>
                </template>
              </v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div> -->
      <!-- <div class="mt-4 text-center">
        <v-btn
          class="elevation-0 border-radius-8 text-none btn-text py-5 mx-auto full-width"
          color="black"
          dark
          >Lọc</v-btn
        >
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { htxStore } from "../store/htx-store";

export default {
  computed: {
    ...mapStores(htxStore),
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

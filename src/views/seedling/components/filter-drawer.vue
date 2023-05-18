<template>
  <div
    class="align-self-stretch full-height filter-drawer"
    width="280"
    permanent
    app
    clipped
  >
    <div class="px-6 py-3">
      <div class="d-flex justify-space-between align-center py-3">
        <div class="text-md font-weight-medium">
          <v-icon class="mr-2 mb-1">mdi-filter-variant</v-icon>Bộ lọc
        </div>
        <v-btn
          class="px-0 text-none neutral80--text font-weight-semibold"
          @click="seedStore.resetFilter()"
          text
          >Xóa bộ lọc</v-btn
        >
      </div>
      <v-divider class="mt-2"></v-divider>
      <div class="d-flex justify-space-between align-center py-4 full-width">
        <v-text-field
          v-model="seedStore.searchKey"
          class="border-radius-6 border-neutral20"
          placeholder="Tìm kiếm từ khóa"
          prepend-inner-icon="mdi-magnify"
          flat
          solo
          outlined
          dense
          hide-details
          clearable
        ></v-text-field>
      </div>
      <v-divider class="mt-2"></v-divider>
      <div class="py-2">
        <v-expansion-panels flat accordion>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-md font-weight-bold">
              <div>
                <v-icon class="mr-1">mdi-shape-plus-outline</v-icon>
                Danh mục
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
                v-for="category in seedStore.categories"
                v-model="seedStore.filterCategory"
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
                <v-icon class="mr-1">mdi-shape-plus-outline</v-icon>
                Giá
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
                v-model="seedStore.filterPrice"
                value="lowerThan500k"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Dưới 500k</div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="seedStore.filterPrice"
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
                v-model="seedStore.filterPrice"
                value="between1mAnd5mil"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">
                    Từ 1 triệu đến 5 Triệu
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="seedStore.filterPrice"
                value="over5mil"
                hide-details
              >
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Từ 5 triệu trở lên</div>
                </template>
              </v-checkbox>
              <!-- <v-checkbox hide-details>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Tuỳ chọn</div>
                </template>
              </v-checkbox> -->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
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
import { seedStore } from "../store/seed-store";

export default {
  computed: {
    ...mapStores(seedStore),
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
  background: var(--v-primary40-base) !important;
}

.filter-drawer {
  min-width: 280px;
  border-right: 1px solid var(--v-neutral30-base) !important;
}
</style>

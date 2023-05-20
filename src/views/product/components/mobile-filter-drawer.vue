<template>
  <div>
    <div>
      <div class="d-flex align-center justify-space-between">
        <div
          class="text-md font-weight-medium cursor-pointer"
          @click="productStore.mobileFilterDrawer = true"
        >
          <v-icon class="mr-2 mb-1">mdi-filter-variant</v-icon> Chọn Bộ lọc ({{
            productStore.allFilters.length
          }})
        </div>
        <v-btn
          class="text-none font-weight-semibold"
          color="primary"
          elevation="0"
          text
          @click="productStore.resetFilter()"
          >Xóa Bộ lọc</v-btn
        >
      </div>
      <div
        class="mt-2 d-flex flex-wrap gap-8"
        v-if="productStore.allFilters.length > 0"
      >
        <v-chip
          color="primary"
          v-for="(filter, index) in productStore.allFilters"
          :key="index"
          small
        >
          {{ filter }}</v-chip
        >
      </div>
    </div>
    <v-navigation-drawer
      class="mobile-filter"
      v-model="productStore.mobileFilterDrawer"
      bottom
      fixed
    >
      <div class="px-6 py-3">
        <div class="d-flex justify-space-between align-center py-3">
          <div class="text-md font-weight-medium">
            <v-icon class="mr-2 mb-1">mdi-filter-variant</v-icon>Bộ lọc
          </div>
          <div>
            <v-btn
              class="px-0 text-none neutral80--text font-weight-semibold"
              @click="productStore.resetFilter()"
              text
              >Xóa bộ lọc</v-btn
            >
            <v-btn
              class="text-none font-weight-semibold ml-4"
              elevation="0"
              color="primary"
              small
              @click="productStore.mobileFilterDrawer = false"
              >Đóng</v-btn
            >
          </div>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div class="d-flex justify-space-between align-center py-4 full-width">
          <v-text-field
            v-model="productStore.searchKey"
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
                  v-for="category in productStore.categories"
                  v-model="productStore.filterCategory"
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
                  v-model="productStore.filterPrice"
                  value="lowerThan500k"
                  hide-details
                >
                  <template v-slot:label>
                    <div class="text-sm font-weight-bold">Dưới 500k</div>
                  </template>
                </v-checkbox>
                <v-checkbox
                  v-model="productStore.filterPrice"
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
                  v-model="productStore.filterPrice"
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
                  v-model="productStore.filterPrice"
                  value="over5mil"
                  hide-details
                >
                  <template v-slot:label>
                    <div class="text-sm font-weight-bold">
                      Từ 5 triệu trở lên
                    </div>
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
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "../store/product-store";
export default {
  computed: {
    ...mapStores(productStore),
  },
};
</script>

<style scoped>
.mobile-filter {
  top: 64px !important;
  height: calc(100vh - 64px) !important;
}
</style>
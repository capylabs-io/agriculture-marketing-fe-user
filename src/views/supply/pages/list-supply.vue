<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex full-height">
    <FilterDrawer />
    <div class="full-width">
      <div class="page-container mx-auto pa-6 full-height">
        <div class="d-flex align-center justify-space-between">
          <div class="neutral70--text">
            Hiển thị
            <span class="text-lg font-weight-bold">{{
              supplyStore.totalFilteredSupply
            }}</span>
            trên
            <span class="text-lg font-weight-bold">{{
              supplyStore.totalSupply
            }}</span>
            kết quả
          </div>
          <v-select
            class="sort-select border-radius-6"
            v-model="supplyStore.sortBy"
            :items="sortBy"
            item-text="text"
            item-value="value"
            hide-details
            outlined
            dense
          ></v-select>
        </div>
        <div v-if="supplyStore.totalFilteredSupply > 0">
          <v-row class="mt-4">
            <v-col
              v-for="supply in supplyStore.slicedSupplies"
              :key="supply.id"
              cols="12"
              sm="6"
              md="4"
              xl="3"
            >
              <SupplyCard :supply="supply"></SupplyCard>
            </v-col>
          </v-row>

          <div class="mt-4">
            <v-pagination
              color="primary"
              :length="supplyStore.totalSupplyPage"
              v-model="supplyStore.supplyPage"
            ></v-pagination>
          </div>
        </div>
        <div
          class="font-weight-bold text-center text-dp-md full-height d-flex flex-column justify-center"
          v-else
        >
          Không có sản phẩm nào!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { supplyStore } from "../store/supply-store";

export default {
  components: {
    FilterDrawer: () => import("../components/filter-drawer.vue"),
    SupplyCard: () => import("../components/supply-card.vue"),
  },
  computed: {
    ...mapStores(supplyStore),
  },
  async created() {
    await Promise.all([
      this.supplyStore.fetchSupplies(),
      this.supplyStore.fetchCategories(),
    ]);
  },
  data() {
    return {
      sortBy: [
        {
          text: "Mới nhất",
          value: "newest",
        },
        {
          text: "Cũ nhất",
          value: "oldest",
        },
        {
          text: "Giá thấp dần",
          value: "price:desc",
        },
        {
          text: "Giá tăng dần",
          value: "price:asc",
        },
        {
          text: "Tên A-Z",
          value: "name:asc",
        },
        {
          text: "Tên Z-A",
          value: "name:desc",
        },
      ],
    };
  },
};
</script>

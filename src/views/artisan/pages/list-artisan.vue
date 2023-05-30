<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex full-height">
    <FilterDrawer v-if="$vuetify.breakpoint.mdAndUp" />
    <div class="full-width">
      <div
        class="page-container mx-auto px-6 py-2 full-height d-flex flex-column"
      >
        <div v-if="$vuetify.breakpoint.smAndDown">
          <MobileFilterDrawer />
        </div>
        <div class="d-flex align-center justify-space-between mt-4">
          <div class="neutral70--text">
            Hiển thị
            <span class="text-lg font-weight-bold">{{
              artisanStore.totalFilteredArtisan
            }}</span>
            trên
            <span class="text-lg font-weight-bold">{{
              artisanStore.totalArtisan
            }}</span>
            kết quả
          </div>
          <div class="d-flex">
            <v-text-field
              v-model="artisanStore.searchKey"
              class="border-radius-6 border-neutral20 mr-2 search-field"
              placeholder="Tìm kiếm từ khóa"
              prepend-inner-icon="mdi-magnify"
              flat
              solo
              outlined
              dense
              hide-details
              clearable
            ></v-text-field>
            <v-select
              class="sort-select border-radius-6"
              v-model="artisanStore.sortBy"
              v-if="$vuetify.breakpoint.mdAndUp"
              :items="sortBy"
              item-text="text"
              item-value="value"
              placeholder="Sắp xếp"
              hide-details
              outlined
              dense
            ></v-select>
          </div>
        </div>
        <div v-if="artisanStore.totalFilteredArtisan > 0">
          <v-row class="mt-4">
            <v-col
              v-for="artisan in artisanStore.slicedArtisans"
              :key="artisan.id"
              cols="12"
              sm="6"
              md="3"
            >
              <ArtisanCard :artisan="artisan"></ArtisanCard>
            </v-col>
          </v-row>

          <div class="mt-4">
            <v-pagination
              color="primary"
              :length="artisanStore.totalArtisanPage"
              v-model="artisanStore.artisanPage"
            ></v-pagination>
          </div>
        </div>
        <div
          class="font-weight-bold text-center text-dp-md flex-grow-1 no-item-div d-flex flex-column justify-center"
          v-else
        >
          Không có thông tin!
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import { mapStores } from "pinia";
import { artisanStore } from "../store/artisan-store";

export default {
  components: {
    FilterDrawer: () => import("../components/filter-drawer.vue"),
    MobileFilterDrawer: () => import("../components/mobile-filter-drawer.vue"),
    ArtisanCard: () => import("../components/artisan-card.vue"),
  },
  computed: {
    ...mapStores(artisanStore),
  },
  async created() {
    await Promise.all([
      this.artisanStore.fetchArtisans(),
      this.artisanStore.fetchCategories(),
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

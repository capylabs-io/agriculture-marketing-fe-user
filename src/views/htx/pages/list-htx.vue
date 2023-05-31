<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex full-height">
    <FilterDrawer v-if="$vuetify.breakpoint.mdAndUp" />
    <div class="full-width">
      <div
        class="page-container mx-auto px-6 py-2 full-height d-flex flex-column"
      >
        <div
          class="d-flex align-center justify-space-between mt-4"
          :class="{
            'flex-column-reverse full-width': $vuetify.breakpoint.smAndDown,
          }"
        >
          <div
            class="neutral70--text"
            :class="{ 'mt-8': $vuetify.breakpoint.smAndDown }"
          >
            Hiển thị
            <span class="text-lg font-weight-bold">{{
              htxStore.totalFilteredHtx
            }}</span>
            trên
            <span class="text-lg font-weight-bold">{{
              htxStore.totalHtx
            }}</span>
            kết quả
          </div>
          <div
            class="d-flex"
            :class="{
              'flex-column-reverse gap-12 full-width':
                $vuetify.breakpoint.smAndDown,
            }"
          >
            <v-text-field
              v-model="htxStore.searchKey"
              class="border-radius-6 border-neutral20"
              :class="{ 'search-field mr-2': $vuetify.breakpoint.mdAndUp }"
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
              class="border-radius-6"
              :class="{ 'sort-select': $vuetify.breakpoint.mdAndUp }"
              v-model="htxStore.sortBy"
              :items="sortBy"
              item-text="text"
              item-value="value"
              placeholder="Sắp xếp"
              hide-details
              outlined
              dense
            ></v-select>
            <v-select
              class="border-radius-6"
              v-model="htxStore.filterCategory"
              v-if="$vuetify.breakpoint.smAndDown"
              :items="htxStore.categories"
              item-text="name"
              placeholder="Danh mục"
              clearable
              return-object
              hide-details
              outlined
              dense
            ></v-select>
          </div>
        </div>
        <div v-if="htxStore.totalFilteredHtx > 0">
          <v-row class="mt-4">
            <v-col
              v-for="htx in htxStore.slicedHtxs"
              :key="htx.id"
              cols="12"
              sm="6"
              md="3"
            >
              <HtxCard :htx="htx"></HtxCard>
            </v-col>
          </v-row>

          <div class="mt-4">
            <v-pagination
              color="primary"
              :length="htxStore.totalHtxPage"
              v-model="htxStore.htxPage"
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
import { htxStore } from "../store/htx-store";

export default {
  components: {
    FilterDrawer: () => import("../components/filter-drawer.vue"),
    HtxCard: () => import("../components/htx-card.vue"),
  },
  computed: {
    ...mapStores(htxStore),
  },
  async created() {
    await Promise.all([
      this.htxStore.fetchHtxs(),
      this.htxStore.fetchCategories(),
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

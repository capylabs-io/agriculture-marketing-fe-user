<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="page-container mx-auto pa-6">
      <div class="text-dp-md font-weight-semibold mt-6">Tin tức</div>
      <div
        class="d-flex align-center justify-space-between my-8"
        :class="{
          'flex-column align-center gap-16': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div
          class="d-inline-flex align-center neutral20-border border-radius-8 overflow-hidden"
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          <div
            class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            :class="{ active: newStore.category == 'all' }"
            @click="newStore.category = 'all'"
          >
            Tất cả
          </div>
          <div
            class="d-flex"
            v-for="category in newStore.categories"
            :key="category.id"
          >
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: newStore.category == category.id }"
              @click="newStore.category = category.id"
            >
              {{ category.name }}
            </div>
          </div>
          <!-- <v-divider vertical></v-divider>
          <div
            class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            :class="{ active: newStore.currentTab == 1 }"
            @click="setCurrentTab(1)"
          >
            Kiến thức
          </div>
          <v-divider vertical></v-divider>
          <div
            class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            :class="{ active: newStore.currentTab == 2 }"
            @click="setCurrentTab(2)"
          >
            Tin mới
          </div>
          <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 3 }"
              @click="currentTab = 3"
            >
              Kĩ thuật
            </div>
          <v-divider vertical></v-divider>
          <div
            class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            :class="{ active: newStore.currentTab == 3 }"
            @click="setCurrentTab(3)"
          >
            Chia sẻ
          </div> -->
        </div>
        <v-select
          class="border-radius-8 full-width"
          placeholder="Chọn danh mục"
          v-model="newStore.category"
          item-text="name"
          item-value="id"
          :class="{ 'sort-select': $vuetify.breakpoint.mdAndUp }"
          :items="newStore.categories"
          v-else
          flat
          solo
          outlined
          dense
          hide-details
          clearable
        ></v-select>
        <v-text-field
          v-model="newStore.searchKey"
          class="border-radius-6 border-neutral20 full-width"
          placeholder="Tìm kiếm từ khóa"
          prepend-inner-icon="mdi-magnify"
          :class="{ 'search-field': $vuetify.breakpoint.mdAndUp }"
          flat
          solo
          outlined
          dense
          hide-details
          clearable
        ></v-text-field>
        <v-select
          class="border-radius-8 full-width"
          placeholder="Sắp xếp"
          v-model="newStore.sortBy"
          item-text="name"
          item-value="value"
          :class="{ 'sort-select': $vuetify.breakpoint.mdAndUp }"
          :items="newStore.sortSelection"
          :menu-props="{ maxHeight: '400' }"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
      </div>

      <div v-if="newStore.slicedlistNew.length > 0">
        <v-row>
          <v-col
            class="align-self-scretch"
            v-for="obj in newStore.slicedlistNew"
            :key="obj.id"
            cols="12"
            md="4"
            xl="4"
          >
            <NewCard :post="obj"> </NewCard>
          </v-col>
        </v-row>

        <div class="mt-4 mb-16">
          <v-pagination
            color="primary"
            :length="newStore.totalnewsPage"
            v-model="newStore.newsPage"
          ></v-pagination>
        </div>
      </div>

      <div
        class="font-weight-bold text-center text-dp-md flex-grow-1 no-item-div d-flex flex-column justify-center"
        v-else
      >
        Không có bài viết nào!
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { newStore } from "../stores/newStore";
export default {
  computed: {
    ...mapStores(newStore),
  },
  components: {
    NewCard: () => import("../components/news-card.vue"),
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  async created() {
    await Promise.all([
      this.newStore.fetchCategories(),
      this.newStore.fetchlistNew(),
    ]);
  },
  methods: {
    setCurrentTab(index) {
      // this.currentTab = index;
      this.newStore.currentTab = index;
      console.log("index", this.newStore.currentTab);
      console.log("filter", this.newStore.filteredlistNew);
    },
  },
};
</script>

<style scoped>
.active {
  color: white !important;
  background-color: var(--v-primary50-base);
}
.card {
  width: 470px;
  height: 320px;
}
.page-container {
  max-width: 1500px;
}
</style>

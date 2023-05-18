<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="page-container mx-auto">
      <v-row class="mt-8">
        <v-col cols="6">
          <div class="text-dp-md font-weight-semibold">Tin tức</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <div
            class="d-inline-flex align-center neutral20-border border-radius-8 mx-auto overflow-hidden"
          >
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 0 }"
              @click="currentTab = 0"
            >
              Tất cả
            </div>
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 1 }"
              @click="currentTab = 1"
            >
              Tin mới
            </div>
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 2 }"
              @click="currentTab = 2"
            >
              kiến thức
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
              :class="{ active: currentTab == 4 }"
              @click="currentTab = 4"
            >
              Chia sẻ
            </div>
          </div>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="newStore.searchKey"
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
        </v-col>
        <v-col cols="2"></v-col>
        <v-col cols="2"
          ><v-select
            class="select border-radius-8"
            label="Lọc: "
            item-text="name"
            :items="sort"
            :menu-props="{ maxHeight: '400' }"
            flat
            solo
            outlined
            dense
            hide-details
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="obj in newStore.slicedlistNew"
          :key="obj.id"
          cols="12"
          md="4"
          xl="4"
        >
          <NewCard class="card mx-auto" :post="obj"> </NewCard>
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
      sort: [
        {
          value: "asc",
          name: "Gần nhất",
        },
        {
          value: "desc",
          name: "Cũ nhất",
        },
      ],
    };
  },
  created() {
    this.newStore.fetchlistNew();
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

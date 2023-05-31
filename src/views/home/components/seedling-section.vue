<template>
  <div class="page-container mx-auto py-16">
    <div
      class="font-weight-semibold text-dp-md text-center"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      Giống tiêu biểu
    </div>
    <div
      class="d-flex justify-center mt-6 gap-8"
      data-aos="zoom-in"
      data-aos-duration="600"
    >
      <v-btn
        class="text-none text-capitalize px-4 border-radius-8 category"
        elevation="0"
        v-for="category in homeStore.seedCategories"
        :class="{ 'active-category': category.id == homeStore.seedCategory }"
        :key="category.id"
        @click="homeStore.seedCategory = category.id"
        >{{ category.name }}</v-btn
      >
    </div>
    <div class="mt-12">
      <v-row data-aos="fade-up" data-aos-duration="1000">
        <v-col
          cols="12"
          md="3"
          v-for="seed in homeStore.slicedSeeds"
          :key="seed.id"
        >
          <seedCard :product="seed" />
        </v-col>
      </v-row>
    </div>
    <div class="mt-12 text-center">
      <v-btn
        class="text-none text-capitalize px-3 py-5 border-radius-8 btn-show-more"
        elevation="0"
        @click="$router.push('/seed')"
        >Xem thêm</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { homeStore } from "../store/home-store";
export default {
  computed: {
    ...mapStores(homeStore),
  },
  components: {
    seedCard: () => import("./home-product-card.vue"),
  },
};
</script>

<style scoped>
.category {
  background-color: transparent !important;
  border: 1px solid var(--v-neutral30-base);
}
.active-category {
  background-color: var(--v-primary20-base) !important;
  border: none !important;
}
</style>

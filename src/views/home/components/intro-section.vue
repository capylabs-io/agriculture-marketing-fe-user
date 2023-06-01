<template>
  <div
    class="page-container mx-auto px-6 full-width"
    :class="$vuetify.breakpoint.mdAndUp ? 'py-16' : 'py-8'"
  >
    <div class="d-flex align-center justify-space-between">
      <div class="font-weight-semibold text-dp-sm text-center">
        Vùng sản xuất
      </div>
      <v-btn
        class="text-none text-md primary--text px-0"
        text
        @click="$router.push('/vung-san-xuat')"
        >Xem thêm <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <div class="mt-8">
      <v-row data-aos="fade-up" data-aos-duration="800">
        <v-col
          cols="12"
          md="3"
          sm="6"
          xs="12"
          v-for="region in homeStore.regions"
          :key="region.id"
        >
          <regionCard :region="region" />
        </v-col>
      </v-row>
    </div>
    <div class="d-flex align-center justify-space-between mt-16">
      <div class="font-weight-semibold text-dp-sm text-center">Hợp tác xã</div>
      <v-btn
        class="text-none text-md primary--text px-0"
        text
        @click="$router.push('/hop-tac-xa')"
        >Xem thêm <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <div class="mt-8">
      <v-row data-aos="fade-up" data-aos-duration="800">
        <v-col
          cols="12"
          md="3"
          sm="6"
          xs="12"
          v-for="htx in homeStore.htxs"
          :key="htx.id"
        >
          <htxCard :htx="htx" />
        </v-col>
      </v-row>
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
    // productCard: () => import("./home-product-card.vue"),
    regionCard: () => import("@/views/region/components/region-card.vue"),
    htxCard: () => import("@/views/htx/components/htx-card.vue"),
  },
};
</script>
  
  <style scoped>
.category {
  background-color: white !important;
  border: 1px solid var(--v-neutral30-base);
}
.active-category {
  background-color: var(--v-primary20-base) !important;
  border: none !important;
}
</style>
  
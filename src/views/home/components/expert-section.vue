<template>
  <div class="page-container mx-auto px-6 mb-16 mt-8">
    <div class="d-flex align-center justify-space-between">
      <div
        class="font-weight-semibold text-dp-sm"
        :class="{ 'text-center': $vuetify.breakpoint.mdAndUp }"
      >
        Nghệ nhân, chuyên gia
      </div>
      <v-btn
        class="text-none text-md primary--text px-0"
        text
        @click="$router.push('/nghe-nhan')"
        >Xem thêm <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <v-row class="mt-8" data-aos="fade-up" data-aos-duration="800">
      <v-col
        cols="12"
        md="3"
        sm="6"
        xs="12"
        v-for="expert in homeStore.artisans"
        :key="expert.id"
      >
        <ExpertCard :expert="expert" />
      </v-col>
    </v-row>
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
    ExpertCard: () => import("./expert-card.vue"),
  },
  data() {
    return {};
  },
};
</script>

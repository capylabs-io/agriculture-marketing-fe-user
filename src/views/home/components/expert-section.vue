<template>
  <div class="expert-section">
    <div class="page-container mx-auto py-16">
      <div class="font-weight-semibold text-dp-md text-center">Chuyên Gia</div>
      <div class="mt-12">
        <!-- <v-slide-group
          :max="4"
          show-arrows="always"
          prev-icon="mdi-arrow-left"
          next-icon="mdi-arrow-right"
          center-active
        >
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
        </v-slide-group> -->

        <v-row>
          <v-col cols="12" md="3">
            <ExpertCard />
          </v-col>
          <v-col cols="12" md="3">
            <ExpertCard />
          </v-col>
          <v-col cols="12" md="3">
            <ExpertCard />
          </v-col>
          <v-col cols="12" md="3">
            <ExpertCard />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ExpertCard: () => import("./expert-card.vue"),
  },
};
</script>

<style scoped>
.expert-section {
  background: url("@/assets/components/landing/section5-bg.png");
  background-position: right center;
  background-size: cover;
  min-height: 640px;
}
</style>

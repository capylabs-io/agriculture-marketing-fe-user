<template>
  <v-app-bar class="mobile-nav" height="72px" app dark>
    <div class="d-flex align-center">
      <v-app-bar-nav-icon
        @click="homeStore.mobileNavigationDrawer = true"
        style="z-index: 10"
      ></v-app-bar-nav-icon>
      <div class="logo d-flex align-center">
        <v-img
          max-width="32px"
          :src="require(`@/assets/components/home/gov-logo.png`)"
          @click="$router.push('/').catch(() => {})"
          contain
        />
        <div class="font-weight-semibold text-lg ml-3">
          Truy xuất nguồn gốc cây cảnh Bến Tre
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapStores } from "pinia";
import { homeStore } from "@/views/home/store/home-store";
export default {
  computed: {
    ...mapStores(homeStore),
  },
};
</script>

<style scoped>
.logo {
  position: absolute;
  min-width: 240px !important;
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
.mobile-nav {
  background-color: var(--v-primary70-base) !important;
}
</style>
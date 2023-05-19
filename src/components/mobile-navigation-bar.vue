<template>
  <v-app-bar height="64px" app>
    <div class="d-flex align-center full-width">
      <v-app-bar-nav-icon
        @click="homeStore.mobileNavigationDrawer = true"
        style="z-index: 10"
      ></v-app-bar-nav-icon>
      <div class="logo">
        <v-img
          max-width="120px"
          :src="require(`@/assets/components/landing/web-logo-black.png`)"
          contain
        />
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
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
</style>
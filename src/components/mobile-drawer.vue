<template>
  <v-navigation-drawer
    v-model="homeStore.mobileNavigationDrawer"
    width="280px"
    absolute
    temporary
  >
    <div class="d-flex flex-column">
      <div class="py-6">
        <v-img
          class="mx-auto"
          max-width="120px"
          :src="require(`@/assets/components/landing/web-logo-black.png`)"
          contain
        />
      </div>
      <v-divider></v-divider>
      <v-list class="px-4 mt-4" dense nav>
        <v-list-item active-class="primary--text" class="py-1" to="/news">
          <v-list-item-title class="text-capitalize text-md"
            >Bảng tin</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="primary--text" class="py-1" to="/product">
          <v-list-item-title class="text-capitalize text-md"
            >Cây cảnh</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="primary--text" class="py-1" to="/seedling">
          <v-list-item-title class="text-capitalize text-md"
            >Trại giống</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="primary--text" class="py-1" to="/supply">
          <v-list-item-title class="text-capitalize text-md"
            >Vật tư</v-list-item-title
          >
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-btn
        class="text-none border-radius-8 mx-auto px-8 mt-8"
        elevation="0"
        dark
        >Đăng nhập</v-btn
      >
    </div>
  </v-navigation-drawer>
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
.drawer {
  height: 100vh !important;
}
.btn-login {
  max-width: 160px !important;
}
</style>

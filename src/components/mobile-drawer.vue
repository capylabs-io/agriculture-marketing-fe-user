<template>
  <v-navigation-drawer
    class="pa-0"
    v-model="homeStore.mobileNavigationDrawer"
    width="320px"
    app
    temporary
  >
    <div class="d-flex flex-column">
      <div class="logo-bg white--text">
        <div class="logo d-flex align-center justify-center mx-auto py-6">
          <v-img
            max-width="32px"
            :src="require(`@/assets/components/home/gov-logo.png`)"
            @click="$router.push('/').catch(() => {})"
            contain
          />
          <div class="font-weight-semibold text-lg ml-2">
            Truy xuất nguồn gốc cây cảnh Bến Tre
          </div>
        </div>
      </div>
      <v-list class="px-4" dense nav>
        <v-list-item active-class="active-nav" to="/trang-chu">
          <v-list-item-title class="text-capitalize text-md"
            >Trang chủ</v-list-item-title
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-group class="mb-1 mt-2">
          <template v-slot:activator>
            <v-list-item-title class="text-capitalize text-md"
              >Giới thiệu</v-list-item-title
            >
          </template>

          <v-list-item active-class="active-nav" to="/cay-canh">
            <v-list-item-title class="text-capitalize text-md"
              >Danh sách Cây cảnh</v-list-item-title
            >
          </v-list-item>
          <v-list-item active-class="active-nav" to="/giong">
            <v-list-item-title class="text-capitalize text-md"
              >Danh sách Giống</v-list-item-title
            >
          </v-list-item>
          <v-list-item active-class="active-nav" to="/vat-tu">
            <v-list-item-title class="text-capitalize text-md"
              >Danh sách Vật tư</v-list-item-title
            >
          </v-list-item>
        </v-list-group>

        <v-list-item active-class="active-nav" to="/nghe-nhan">
          <v-list-item-title class="text-capitalize text-md"
            >Nghệ nhân</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="active-nav" to="/vung-san-xuat">
          <v-list-item-title class="text-capitalize text-md"
            >Vùng sản xuất</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="active-nav" to="/hop-tac-xa">
          <v-list-item-title class="text-capitalize text-md"
            >Hợp tác xã</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="active-nav" to="/dai-ly">
          <v-list-item-title class="text-capitalize text-md"
            >Đại lý</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="active-nav" to="/tin-tuc">
          <v-list-item-title class="text-capitalize text-md"
            >Tin tức</v-list-item-title
          >
        </v-list-item>

        <v-list-group class="mb-1">
          <template v-slot:activator>
            <v-list-item-title class="text-capitalize text-md"
              >Thư viện</v-list-item-title
            >
          </template>

          <v-list-item active-class="active-nav" to="/thu-vien-anh">
            <v-list-item-title class="text-capitalize text-md"
              >Thư viện Ảnh</v-list-item-title
            >
          </v-list-item>
          <v-list-item active-class="active-nav" to="/thu-vien-video">
            <v-list-item-title class="text-capitalize text-md"
              >Thư viện Video</v-list-item-title
            >
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item class="mt-2" active-class="active-nav" to="/lien-he">
          <v-list-item-title class="text-capitalize text-md"
            >Liên Hệ</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="active-nav" to="/tai-lieu">
          <v-list-item-title class="text-capitalize text-md"
            >Văn bản</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-class="active-nav" to="/hoi-dap">
          <v-list-item-title class="text-capitalize text-md"
            >Hỏi đáp</v-list-item-title
          >
        </v-list-item>
      </v-list>
      <!-- <v-divider></v-divider>
      <v-btn
        class="text-none border-radius-8 mx-auto px-8 mt-8"
        elevation="0"
        @click="goToLogin()"
        dark
        >Đăng nhập</v-btn
      > -->
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
  methods: {
    goToLogin() {
      window.open("https://quanly-trungtamcaycanh.capylabs.io");
    },
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
.logo-bg {
  background-color: var(--v-primary70-base) !important;
}
.logo {
  max-width: 240px !important;
}
.active-nav {
  background-color: var(--v-primary70-base) !important;
  color: white !important;
}
</style>

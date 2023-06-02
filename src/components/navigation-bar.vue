<template>
  <v-app-bar
    class="elevation-0"
    height="212px"
    color="white"
    app
    absolute
    flat
    clipped-left
  >
    <div class="full-height full-width d-flex flex-column white--text">
      <div
        class="top-nav d-flex align-center justify-space-between full-width full-height px-8 text-xs py-5"
      >
        <div>
          Trang web trực thuộc quản lý của Bộ Nông Nghiệp và Phát Triển Nông
          Thôn
        </div>
        <div class="d-flex align-center">
          <v-img
            class="mr-2"
            max-width="16"
            max-height="16"
            :src="require('@/assets/components/home/vn-icon.png')"
          ></v-img>
          <div>Tiếng Việt</div>
        </div>
      </div>
      <div class="mid-nav d-flex justify-space-between px-8 pt-7 pb-2">
        <div class="d-flex">
          <v-img
            :src="require('@/assets/components/home/gov-logo.png')"
            max-height="64px"
            max-width="64px"
          ></v-img>
          <div class="text-uppercase font-weight-bold text-dp-xs ml-4">
            Trung Tâm truy xuất nguồn gốc <br />
            cây và hoa cảnh TỈNH Bến Tre
          </div>
        </div>
        <div>
          <div class="d-flex align-center gap-16">
            <v-text-field
              v-model="searchCode"
              class="nav-search-field border-radius-8"
              placeholder="Tìm kiếm"
              append-icon="mdi-magnify"
              @click:append="goToSearch"
              flat
              solo
              outlined
              dense
              hide-details
              clearable
            ></v-text-field>
            <v-btn
              class="text-none text-caplitalize font-weight-medium px-0"
              dark
              text
              >Đăng ký</v-btn
            >
            <v-btn
              class="text-none text-caplitalize font-weight-medium px-0"
              dark
              text
              >Đăng nhập</v-btn
            >
          </div>
          <div class="d-flex align-center justify-end mr-n2">
            <v-btn class="px-0" large dark icon>
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn class="px-0" large dark icon>
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
            <v-btn class="pa-0" large dark icon>
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="bottom-nav d-flex justify-space-between px-8 py-2">
        <div class="d-flex">
          <router-link
            to="/trang-chu"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Trang chủ
            </div>
          </router-link>
          <v-menu transition="slide-y-transition" bottom open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <router-link
                to="/trang-chu"
                class="text-decoration-none align-self-center"
              >
                <div
                  class="text-none white--text text-uppercase font-weight-medium px-3 py-2 pr-0 text-sm d-flex align-center"
                  v-bind="attrs"
                  v-on="on"
                >
                  Giới thiệu
                  <v-icon class="ml-1" small dark>mdi-chevron-down</v-icon>
                </div>
              </router-link>
            </template>
            <v-list>
              <v-list-item to="/cay-canh" active-class="active-nav">
                <v-list-item-title>Danh sách Cây cảnh</v-list-item-title>
              </v-list-item>
              <v-list-item to="/giong" active-class="active-nav">
                <v-list-item-title>Danh sách Giống</v-list-item-title>
              </v-list-item>
              <v-list-item to="/vat-tu" active-class="active-nav">
                <v-list-item-title>Danh sách Vật tư</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <router-link
            to="/nghe-nhan"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Nghệ nhân
            </div>
          </router-link>
          <router-link
            to="/vung-san-xuat"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Vùng sản xuất
            </div>
          </router-link>
          <router-link
            to="/hop-tac-xa"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Hợp tác xã
            </div>
          </router-link>
          <router-link
            to="/dai-ly"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Đại lý
            </div>
          </router-link>
          <router-link
            to="/tin-tuc"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Tin tức
            </div>
          </router-link>
          <v-menu transition="slide-y-transition" bottom open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <router-link
                to="/thu-vien"
                class="text-decoration-none align-self-center"
              >
                <div
                  class="text-none white--text text-uppercase font-weight-medium px-3 py-2 pr-0 text-sm d-flex align-center"
                  v-bind="attrs"
                  v-on="on"
                >
                  Thư viện
                  <v-icon class="ml-1" small dark>mdi-chevron-down</v-icon>
                </div>
              </router-link>
            </template>
            <v-list>
              <v-list-item to="/thu-vien-anh" active-class="active-nav">
                <v-list-item-title>Thư viện Ảnh</v-list-item-title>
              </v-list-item>
              <v-list-item to="/thu-vien-video" active-class="active-nav">
                <v-list-item-title>Thư viện Video</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="d-flex mr-n2">
          <router-link
            to="/lien-he"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Liên hệ
            </div>
          </router-link>
          <router-link
            to="/tai-lieu"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Tài liệu
            </div>
          </router-link>
          <router-link
            to="/hoi-dap"
            class="text-decoration-none align-self-center"
            active-class="active"
          >
            <div
              class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
            >
              Hỏi đáp
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapStores } from "pinia";
import { searchCodeStore } from "@/views/searchCode/stores/searchCode-Store";
export default {
  computed: {
    ...mapStores(searchCodeStore),
  },
  data() {
    return {
      searchCode: "",
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/").catch(() => {});
    },
    goToSearch() {
      if (this.$route.path.includes("tim-kiem-tat-ca")) {
        this.searchCodeStore.searchCode = this.searchCode;
        this.searchCode = "";
        this.searchCodeStore.fetchSearchAll();
        return;
      }
      this.$router.push({
        path: "/tim-kiem-tat-ca",
      });
      this.searchCodeStore.searchCode = this.searchCode;
      this.searchCode = "";
    },
    goToLogin() {
      window.open("https://quanly-trungtamcaycanh.capylabs.io");
    },
  },
};
</script>

<style scoped>
.active div.white--text {
  border-radius: 6px !important;
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: 600 !important;
}
.active-nav {
  background-color: var(--v-primary70-base) !important;
  color: white !important;
}
.top-nav {
  background-color: var(--v-neutral90-base) !important;
  height: 32px !important;
}
.mid-nav {
  background-color: var(--v-primary80-base) !important;
  border-bottom: 1px solid var(--v-primary70-base) !important;
}
.bottom-nav {
  background-color: var(--v-primary80-base) !important;
}
.nav-search-field {
  min-width: 300px !important;
}
</style>

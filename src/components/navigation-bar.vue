<template>
  <v-app-bar
    class="elevation-2"
    width="100%"
    height="64px"
    color="white"
    app
    flat
    clipped-left
  >
    <div class="d-flex justify-space-between full-width align-center">
      <div
        class="nav-left justify-start font-weight-bold cursor-pointer"
        @click="goToHome()"
      >
        <!-- <span class="text-xl">Logo Website</span> -->
        <v-img
          width="164"
          max-height="28"
          :src="require('@/assets/components/landing/web-logo-black.png')"
        ></v-img>
      </div>
      <div class="d-flex col-gap-36">
        <router-link
          to="/news"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Bảng tin</div>
        </router-link>
        <router-link
          to="/product"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Cây cảnh</div>
        </router-link>
        <router-link
          to="/seedling"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Trại giống</div>
        </router-link>
        <router-link
          to="/supply"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Vật tư</div>
        </router-link>
      </div>
      <div>
        <v-btn
          class="elevation-0 border-radius-8 text-none btn-text py-5"
          color="black"
          @click="goToLogin()"
          dark
          >Đăng nhập</v-btn
        >
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    goToLogin() {
      window.open("https://admin-mocmien.capylabs.io");
    },
  },
};
</script>

<style scoped>
.nav-link {
  color: var(--v-neutral60-base);
  font-weight: 500;
}
.active div.nav-link {
  color: var(--v-primary60-base) !important;
  font-weight: 600;
}
</style>

<template>
  <v-app-bar
    class="elevation-2"
    width="100%"
    height="64px"
    app
    flat
    color="white"
  >
    <div class="d-flex justify-space-between full-width align-center">
      <div class="nav-left justify-start font-weight-bold">
        <span class="text-xl">Logo Website</span>
      </div>
      <div class="d-flex col-gap-36">
        <router-link
          to="/"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Trang chủ</div>
        </router-link>
        <router-link
          to="/world"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Giới thiệu</div>
        </router-link>
        <router-link
          to="/redeem"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Sản phẩm</div>
        </router-link>
        <router-link
          to="/login"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Bảng tin</div>
        </router-link>
        <router-link
          to="/login"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-none nav-link">Trại giống</div>
        </router-link>
        <router-link
          to="/login"
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
          dark
          >Đăng nhập</v-btn
        >
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {};
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

<template>
  <v-footer class="footer-bg py-12">
    <div class="page-container mx-auto text-center full-width">
      <img class="footer-logo" :src="require('@/assets/footer-logo.png')" />
      <div class="d-flex col-gap-36 mt-6 justify-center">
        <router-link to="/" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Trang chủ</div>
        </router-link>
        <!-- <router-link to="/world" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Giới thiệu</div>
        </router-link> -->
        <router-link to="/login" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Bảng tin</div>
        </router-link>
        <router-link
          to="/product"
          class="text-decoration-none align-self-center"
        >
          <div class="text-none nav-link">Sản phẩm</div>
        </router-link>
        <router-link
          to="/seedling"
          class="text-decoration-none align-self-center"
        >
          <div class="text-none nav-link">Trại giống</div>
        </router-link>
        <router-link
          to="/supply"
          class="text-decoration-none align-self-center"
        >
          <div class="text-none nav-link">Vật tư</div>
        </router-link>
      </div>
      <div class="d-flex justify-space-between full-width mt-12 pt-6 watermark">
        <div class="white--text">© 2023 CapyLabs. All rights reserved.</div>
        <div class="d-flex col-gap-36">
          <router-link
            to="/login"
            class="text-decoration-none align-self-center"
          >
            <div class="text-none nav-link">Term</div>
          </router-link>
          <router-link
            to="/login"
            class="text-decoration-none align-self-center"
          >
            <div class="text-none nav-link">Privacy</div>
          </router-link>
          <router-link
            to="/login"
            class="text-decoration-none align-self-center"
          >
            <div class="text-none nav-link">Cookie</div>
          </router-link>
        </div>
      </div>
    </div>
  </v-footer>
</template>

<style scoped>
.footer-bg {
  background: #333232 !important;
}
.footer-logo {
  max-width: 282px;
  max-height: 52px;
}
.watermark {
  border-top: 1px solid #666564;
}
.nav-link {
  color: white;
}
</style>

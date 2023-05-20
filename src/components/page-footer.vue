<template>
  <v-footer class="footer-bg py-12">
    <div class="page-container mx-auto text-center full-width">
      <div
        class="mx-auto"
        :class="$vuetify.breakpoint.xsOnly ? 'mobile-logo' : 'footer-logo'"
      >
        <v-img
          :src="require('@/assets/components/landing/web-logo-white.png')"
        ></v-img>
      </div>
      <div
        class="d-flex col-gap-36 mt-6 justify-center flex-wrap"
        :class="{ 'flex-column gap-16': $vuetify.breakpoint.smAndDown }"
      >
        <router-link to="/" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Trang chủ</div>
        </router-link>
        <!-- <router-link to="/world" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Giới thiệu</div>
        </router-link> -->
        <router-link to="/news" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Bảng tin</div>
        </router-link>
        <router-link
          to="/products"
          class="text-decoration-none align-self-center"
        >
          <div class="text-none nav-link">Sản phẩm</div>
        </router-link>
        <router-link
          to="/seedlings"
          class="text-decoration-none align-self-center"
        >
          <div class="text-none nav-link">Trại giống</div>
        </router-link>
        <router-link
          to="/supplies"
          class="text-decoration-none align-self-center"
        >
          <div class="text-none nav-link">Vật tư</div>
        </router-link>
      </div>
      <div
        class="d-flex justify-space-between full-width mt-12 pt-6 watermark"
        :class="{ 'flex-column': $vuetify.breakpoint.smAndDown }"
      >
        <div class="white--text">© 2023 CapyLabs. All rights reserved.</div>
        <div
          class="d-flex col-gap-36 mx-auto text-center"
          :class="{ 'mt-4': $vuetify.breakpoint.smAndDown }"
        >
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
  max-width: 375px;
  max-height: 64px;
}
.mobile-logo {
  max-width: 280px;
}
.watermark {
  border-top: 1px solid #666564;
}
.nav-link {
  color: white;
}
</style>

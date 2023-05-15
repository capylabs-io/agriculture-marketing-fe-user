<template>
  <div class="footer-bg px-16 py-12">
    <div class="page-container mx-auto d-flex flex-column align-center">
      <v-img
        :src="require('@/assets/footer-logo.png')"
        max-height="64px"
        max-width="352px"
      ></v-img>
      <div class="d-flex col-gap-36 mt-6">
        <router-link to="/" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Trang chủ</div>
        </router-link>
        <router-link to="/world" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Giới thiệu</div>
        </router-link>
        <router-link
          to="/redeem"
          class="text-decoration-none align-self-center"
        >
          <div class="text-none nav-link">Sản phẩm</div>
        </router-link>
        <router-link to="/login" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Bảng tin</div>
        </router-link>
        <router-link to="/login" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Trại giống</div>
        </router-link>
        <router-link to="/login" class="text-decoration-none align-self-center">
          <div class="text-none nav-link">Vật tư</div>
        </router-link>
      </div>
      <div class="d-flex justify-space-between full-width mt-10 pt-6 watermark">
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
  </div>
</template>

<style scoped>
.footer-bg {
  background: #333232 !important;
}
.watermark {
  border-top: 1px solid #666564;
}
.nav-link {
  color: white;
}
</style>

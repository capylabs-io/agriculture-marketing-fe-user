<template>
  <div class="d-flex full-width fisrt-section">
    <div class="content">
      <div class="font-weight-bold text-dp-xxl">Nâng tầm nông sản Việt</div>
      <div class="text-xl pt-5 description">
        Nhanh chóng, tiện lợi giúp người nông dân đáp ứng yêu cầu thị trường,
        bảo vệ người tiêu dùng và tiếp cận thị trường mới
      </div>
      <div class="pt-5">
        <v-btn
          class="text-capitalize border-radius-12 text-lg pa-3"
          color="primary40"
          depressed
          >Đăng ký ngay
          <v-icon color="black"> mdi-arrow-right-thin </v-icon></v-btn
        >
      </div>
    </div>

    <v-img :src="require(`@/assets/components/landing/section1-left.webp`)">
    </v-img>
    <v-img :src="require(`@/assets/components/landing/section1-right.webp`)">
    </v-img>
  </div>
</template>

<script>
export default {};
</script>

<style>
.fisrt-section {
  height: 736px;
  z-index: 1;
}
.content {
  position: absolute;
  z-index: 2;
  width: 530px;
  top: 211px;
  left: 111px;
}
.description {
  color: var(--v-neutral80-base) !important;
}
</style>

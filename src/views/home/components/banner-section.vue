<template>
  <v-row class="banner-section" no-gutters>
    <v-col cols="12" md="6">
      <v-img
        class="full-height"
        :src="require(`@/assets/components/landing/section1-left.png`)"
        cover
      >
        <div
          class="content mx-auto d-flex flex-column justify-center full-width"
        >
          <div
            class="font-weight-bold text-dp-xxl"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="0"
          >
            Nâng tầm nông sản Việt
          </div>
          <div
            class="text-xl mt-6"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="300"
          >
            Nhanh chóng, tiện lợi giúp người nông dân đáp ứng yêu cầu thị
            trường, bảo vệ người tiêu dùng và tiếp cận thị trường mới
          </div>
          <div class="mt-8">
            <v-btn
              class="text-none border-radius-12 text-lg py-6"
              color="primary40"
              depressed
              >Đăng ký ngay
              <v-icon color="black"> mdi-arrow-right-thin </v-icon></v-btn
            >
          </div>
        </div>
      </v-img>
    </v-col>
    <v-col cols="12" md="6">
      <v-carousel
        height="100%"
        :interval="10000"
        show-arrows-on-hover
        hide-delimiter-background
        cycle
      >
        <v-carousel-item
          v-for="(url, i) in imageUrls"
          class="banner-img"
          :key="i"
          :src="url"
          cover
        >
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      imageUrls: [
        require("@/assets/components/landing/section1-right3.jpeg"),
        require("@/assets/components/landing/section1-right1.png"),
        require("@/assets/components/landing/section1-right2.jpeg"),
        require("@/assets/components/landing/section1-right4.jpeg"),
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.banner-section {
  height: calc(100vh - 64px) !important;
}
.banner-img {
  max-height: calc(100vh - 64px) !important;
}
.content {
  max-width: 530px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

<template>
  <v-row :class="{ 'banner-section': $vuetify.breakpoint.mdAndUp }" no-gutters>
    <v-col
      cols="12"
      md="6"
      class="inherit-height"
      :class="{ 'mobile-section': $vuetify.breakpoint.smAndDown }"
    >
      <div
        class="full-height full-width d-flex flex-column justify-center"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'left-section-bg px-6'
            : 'left-section-image'
        "
      >
        <div
          class="content mx-auto pa-6"
          :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
        >
          <div
            class="font-weight-bold"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="0"
            :class="$vuetify.breakpoint.mdAndUp ? 'text-dp-lg' : 'text-dp-md'"
          >
            Nâng tầm cây cảnh Việt
          </div>
          <div
            class="neutral80--text"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="300"
            :class="
              $vuetify.breakpoint.mdAndUp ? 'text-dp-xs mt-12' : 'text-lg mt-6'
            "
          >
            Nhanh chóng, tiện lợi giúp người nông dân đáp ứng yêu cầu thị
            trường, bảo vệ người tiêu dùng và tiếp cận thị trường mới
          </div>
          <div class="text-center">
            <v-btn
              class="text-none border-radius-12 mx-auto"
              color="primary60"
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'text-lg py-7 px-5 text-center mt-12'
                  : 'text-md py-6 px-4 mt-8'
              "
              depressed
              dark
              @click="goToLogin()"
              >Đăng ký ngay <v-icon> mdi-arrow-right-thin </v-icon></v-btn
            >
          </div>
        </div>
      </div>
    </v-col>
    <v-col
      cols="12"
      md="6"
      :class="{ 'mobile-section': $vuetify.breakpoint.smAndDown }"
    >
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
  methods: {
    goToLogin() {
      window.open("https://quanly-trungtamcaycanh.capylabs.io/register");
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-section {
  height: calc(100vh - 64px) !important;
}
.left-section-image {
  background: url("@/assets/components/landing/section1-left.png") !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center 80% !important;
}
.left-section-bg {
  background: var(--v-primary10-base) !important;
}
.banner-img {
  max-height: calc(100vh - 64px) !important;
}
.content {
  max-width: 720px !important;
}
.mobile-section {
  height: 420px !important;
}
.inherit-height {
  height: inherit;
}
</style>

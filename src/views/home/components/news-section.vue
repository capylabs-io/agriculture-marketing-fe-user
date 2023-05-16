<template>
  <div class="page-container mx-auto py-16">
    <div
      class="font-weight-semibold text-dp-md text-center"
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay="600"
    >
      Tin tức
    </div>
    <v-row class="mt-12" no-gutters>
      <v-col
        class="d-flex right-border pr-6"
        cols="12"
        md="6"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <v-img
          class="border-radius-16 border-neutral30"
          :src="require('@/assets/components/landing/image-3.webp')"
          max-height="420px"
        >
          <v-img
            class="image-gradient"
            :src="require('@/assets/components/landing/image-gradient.png')"
          ></v-img>
          <div class="big-new-title white--text pa-6">
            <div class="font-weight-semibold text-dp-xs">
              Làm chè X hữu cơ: Lợi ích nhân 3, lợi nhuận nhân đôi
            </div>
            <div class="text-md mt-1 font-weight-light">
              Lorem ipsum dolor sit amet consectetur sit amet consectetur ipsum
              do...
            </div>
          </div>
        </v-img>
      </v-col>
      <v-col
        class="d-flex flex-column justify-space-between pl-6"
        cols="12"
        md="6"
      >
        <div
          class="d-flex"
          v-for="i in 3"
          :key="i"
          data-aos="fade-left"
          data-aos-duration="500"
          :data-aos-delay="300 * i"
        >
          <v-img
            class="border-radius-16 border-neutral30"
            :src="require('@/assets/components/landing/image-3.webp')"
            max-height="132px"
            max-width="176px"
          ></v-img>
          <div class="ml-4">
            <div class="font-weight-semibold text-lg">
              Làm chè X hữu cơ: Lợi ích nhân 3, lợi nhuận nhân đôi
            </div>
            <div class="neutral70--text text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur sit amet consectetur ipsum
              amet consectetur sit amet consectetur ipsum
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="mt-12 text-center">
      <v-btn
        class="text-none text-capitalize px-3 py-5 border-radius-8 btn-show-more"
        elevation="0"
        >Xem thêm</v-btn
      >
    </div>
  </div>
</template>

<style scoped>
.image-gradient {
  position: absolute;
  bottom: 0;
}
.big-new-title {
  position: absolute;
  bottom: 0;
}
.right-border {
  border-right: 1px solid var(--v-neutral20-base) !important;
}
</style>

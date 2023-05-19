<template>
  <div class="page-container mx-auto py-16 px-4">
    <div
      class="font-weight-semibold text-dp-md text-center"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      Tính năng
    </div>
    <v-row no-gutters class="text-center mt-12 row-gap-32">
      <v-col
        cols="12"
        md="4"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="0"
      >
        <div class="image mx-auto">
          <v-img
            :src="require(`@/assets/components/landing/section2-icon1.png`)"
          >
          </v-img>
        </div>
        <div class="font-weight-medium text-dp-xs mt-4">
          Nền tảng truy xuất nguồn gốc
        </div>
        <div class="neutral60--text mt-2 content mx-auto text-lg">
          Tăng tính minh bạch về thông tin sản phẩm khi đến tay người tiêu dùng
        </div>
      </v-col>
      <v-col
        cols="12"
        md="4"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="300"
      >
        <div class="image mx-auto">
          <v-img
            :src="require(`@/assets/components/landing/section2-icon2.png`)"
          >
          </v-img>
        </div>
        <div class="font-weight-medium text-dp-xs mt-4">
          Tem cho sản phẩm xuất khẩu
        </div>
        <div class="neutral60--text mt-2 content mx-auto text-lg">
          Cung cấp tem xuất khẩu đạt chuẩn yêu cầu quốc tế
        </div>
      </v-col>
      <v-col
        cols="12"
        md="4"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="600"
      >
        <div class="image mx-auto">
          <v-img
            :src="require(`@/assets/components/landing/section2-icon3.png`)"
          >
          </v-img>
        </div>
        <div class="font-weight-medium text-dp-xs mt-4">
          Cung cấp mã tiêu chuẩn
        </div>
        <div class="neutral60--text mt-2 content mx-auto text-lg">
          Hỗ trợ việc tìm kiếm nguồn gốc sản phẩm một cách nhanh chóng và tiện
          lợi
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.image {
  width: 80px;
  height: 80px;
}
.content {
  width: 360px;
}
</style>

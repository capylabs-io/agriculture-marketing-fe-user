<template>
  <div
    class="card-shadow border-radius-16 pa-6 text-center overflow-hidden white-bg"
  >
    <div class="avatar mx-auto">
      <v-img :src="require('@/assets/components/landing/image-4.webp')"></v-img>
    </div>
    <div class="mt-6">
      <div class="text-lg font-weight-semibold">Phùng Thanh Độ</div>
      <div class="text-sm neutral70--text">Chuyên viên kiểm định</div>
    </div>
    <v-divider class="my-4"></v-divider>
    <div class="d-flex align-center justify-center">
      <v-icon small>mdi-phone</v-icon>
      <div class="text-sm font-weight-semibold ml-1">(+84) 931382179</div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  max-width: 148px;
  max-height: 148px;
  padding: 10px;
  border: 1px dashed #996535;
  border-radius: 74px !important;
}

.avatar .v-image {
  max-width: 128px;
  max-height: 128px;
  border-radius: 64px !important;
}
</style>

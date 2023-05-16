<template>
  <div class="page-container py-8 mx-auto">
    <div class="neutral60--text font-weight-semibold">
      Trang chủ / Danh mục / Tên sản phẩm / Chi tiết
    </div>
    <v-row class="mt-4" no-gutters>
      <v-col cols="12" md="6" class="right-border pr-6">
        <v-img
          class="border-radius-16"
          src="@/assets/product-image.png"
          aspect-ratio="1/1"
          cover
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" class="pl-6">
        <div class="d-flex justify-space-between">
          <div>
            <div class="font-weight-semibold text-dp-md">Cây Cau Cảnh</div>
            <div
              class="font-weight-semibold text-dp-xs d-flex align-center mt-2"
            >
              150.000<span class="neutral80--text text-xs ml-1">vnđ</span>
            </div>
            <div class="neutral80--text text-sm mt-2">
              Mã sản phẩm: CC-VP-12345
            </div>
            <div class="neutral80--text text-sm mt-2">Xuất xứ: Nhật Bản</div>
          </div>
          <div>
            <v-img
              class="neutral20-border border-radius-16 qrcode-img"
              src="@/assets/qrcode-example.png"
            ></v-img>
          </div>
        </div>
        <div class="neutral20-border border-radius-16 pa-4 mt-6">
          <div
            class="d-inline-flex align-center neutral20-border border-radius-8 mx-auto"
          >
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            >
              Thông tin sản phẩm
            </div>
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            >
              Chuỗi liên kết
            </div>
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            >
              Xác thực
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.qrcode-img {
  width: 128px;
  height: 128px;
}
.right-border {
  border-right: 1px solid var(--v-neutral20-base) !important;
}
</style>
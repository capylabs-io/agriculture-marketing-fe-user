<template>
  <div class="page-container py-8 mx-auto">
    <div class="neutral60--text font-weight-semibold">
      Trang chủ / Danh mục / Tên sản phẩm
    </div>
    <v-row class="mt-4" no-gutters>
      <v-col cols="12" md="6" class="right-border pr-6">
        <v-img
          class="border-radius-16"
          src="@/assets/product-image.png"
          cover
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" class="pl-6">
        <div class="d-flex justify-space-between">
          <div>
            <div class="font-weight-semibold text-dp-md">Cây Cau Cảnh</div>
            <div
              class="font-weight-semibold text-dp-xs d-flex align-center my-2"
            >
              150.000<span class="neutral80--text text-xs ml-1">vnđ</span>
            </div>
            <div class="neutral80--text text-sm">
              Danh mục sản phẩm: Cây cảnh văn phòng
            </div>
            <div class="neutral80--text text-sm mt-1">
              Mã sản phẩm: CC-VP-12345
            </div>
            <div class="neutral80--text text-sm mt-1">Xuất xứ: Nhật Bản</div>
          </div>
          <div>
            <v-img
              class="neutral20-border border-radius-16 qrcode-img"
              src="@/assets/qrcode-example.png"
            ></v-img>
          </div>
        </div>
        <div class="neutral20-border border-radius-16 pa-4 mt-6 text-center">
          <div
            class="d-inline-flex align-center neutral20-border border-radius-8 mx-auto overflow-hidden"
          >
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 0 }"
              @click="currentTab = 0"
            >
              Thông tin
            </div>
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 1 }"
              @click="currentTab = 1"
            >
              Nguồn gốc
            </div>
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 2 }"
              @click="currentTab = 2"
            >
              Xác thực
            </div>
          </div>
          <div class="text-start mt-4" v-if="currentTab == 0">
            <div>
              <div class="font-weight-semibold">Mô tả sản phẩm</div>
              <div class="mt-2">
                Cây Cau Cảnh là loài cây có sức sống mãnh liệt, mang nhiều ý
                nghĩa về may mắn và tài lộc. Hiện nay loại cây này được trồng
                nhiều trong không gian nhà ở, môi trường làm việc hay các quán
                cafe,…
              </div>
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Hướng dẫn sử dụng</div>
              <div class="mt-2">
                Ánh sáng: Để cây luôn có màu lá tươi, giàu sức sống bạn nên đặt
                cây ở những nơi có đủ ánh sáng cần thiết. Nếu đặt cây ở những vị
                trí nắng gay gắt sẽ làm cây dễ bị vàng lá, khô héo và chết dần.
                <br /><br />
                Tưới nước: Cây Cau Cảnh là loại ưa ẩm, cần nhiều nước nhưng
                không ưa ngập úng. Do đó bạn cần chú ý lượng nước khi tưới cây.
                Chỉ nên cung cấp lượng nước vừa đủ để làm ướt đất.
                <br /><br />
                Nhiệt độ: Cây sinh trưởng và phát triển tốt nhất trong 18-23°C.
                Mức nhiệt thấp nhất mà cây có thể chịu được là 10°C. Nếu dưới
                nhiệt độ này cây sẽ chậm phát triển và chết.
                <br /><br />
                Sâu bệnh: Cây thường gặp phải các loại sâu bệnh có hại như nấm,
                rệp lá, hay sâu bọ trú ngụ. Do đó, cần kiểm tra thường xuyên cây
                trồng, cắt bỏ lá khô hay vàng úa và có thể phun thuốc trừ sâu
                trong trường hợp cần thiết.
              </div>
            </div>
          </div>
          <div class="text-start mt-4" v-if="currentTab == 1">
            <div>
              <div class="font-weight-semibold">Nơi trồng</div>
              <div class="mt-2">Cây cảnh đồng bằng sông Cửu Long</div>
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Địa chỉ</div>
              <div class="mt-2">
                Ấp Trường Phước A, xã Tường Long Tây, tỉnh Hậu Long
              </div>
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Số điện thoại</div>
              <div class="mt-2">+84 32958459</div>
            </div>
          </div>
          <div class="text-start mt-4" v-if="currentTab == 2">
            <div>
              <div class="font-weight-semibold">Giấy chứng nhận</div>
              <v-img class="mt-2" src="@/assets/verify-example.png"></v-img>
              <v-divider class="mt-6"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Giấy kiểm định</div>
              <v-img class="mt-2" src="@/assets/verify-example2.png"></v-img>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
    };
  },
};
</script>

<style scoped>
.active {
  color: white !important;
  background-color: var(--v-primary50-base);
}
.qrcode-img {
  width: 128px;
  height: 128px;
}
.right-border {
  border-right: 1px solid var(--v-neutral20-base) !important;
}
</style>
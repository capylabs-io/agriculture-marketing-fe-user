<template>
  <div class="page-container mx-auto pt-6 pb-8 px-6">
    <div class="neutral60--text font-weight-semibold d-flex">
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/seedling')">
        Trại giống
      </div>
      <span class="mx-2">/</span>
      <div class="primary--text text-capitalize">
        {{ seedStore.seed.name || "Seed Name" }}
      </div>
    </div>
    <v-row class="mt-6" no-gutters>
      <v-col cols="12" md="6" class="right-border pr-6">
        <v-img class="border-radius-16" :src="seedImage" cover></v-img>
      </v-col>
      <v-col cols="12" md="6" class="pl-6">
        <div class="d-flex justify-space-between">
          <div>
            <div class="font-weight-semibold text-dp-md text-capitalize">
              {{ seedStore.seed.name || "Seed Name" }}
            </div>
            <div
              class="font-weight-semibold text-dp-xs d-flex align-center my-2"
            >
              {{ seedStore.seed.price || "---"
              }}<span class="neutral80--text text-xs ml-1">vnđ</span>
            </div>
            <div class="neutral80--text text-sm text-capitalize">
              Danh mục sản phẩm:
              {{ seedStore.seed.seedCategory }}
            </div>
            <div class="neutral80--text text-sm mt-1">
              Mã sản phẩm: {{ seedStore.seed.code }}
            </div>
            <div class="neutral80--text text-sm mt-1 text-capitalize">
              Xuất xứ: {{ seedStore.seed.origin }}
            </div>
          </div>
          <div>
            <v-img
              class="neutral20-border border-radius-16 qrcode-img"
              :src="seedQRImage"
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
              <div class="mt-2" v-html="seedStore.seed.description"></div>
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Hướng dẫn chăm sóc</div>
              <div class="mt-2" v-html="seedStore.seed.careInstruction"></div>
            </div>
          </div>
          <div class="text-start mt-4" v-if="currentTab == 1">
            <div>
              <div class="font-weight-semibold">Nơi trồng</div>
              <div class="mt-2">Không có thông tin</div>
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Địa chỉ</div>
              <div class="mt-2">Không có thông tin</div>
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Số điện thoại</div>
              <div class="mt-2">Không có thông tin</div>
            </div>
          </div>
          <div class="text-start mt-4" v-if="currentTab == 2">
            <div>
              <div class="font-weight-semibold">Giấy chứng nhận</div>
              <v-img
                class="mt-2"
                :src="seedCertificationImage"
                :aspect-ratio="16 / 9"
                max-height="200"
                contain
              ></v-img>
              <v-divider class="mt-6"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Giấy kiểm định</div>
              <v-img
                class="mt-2"
                :src="seedAccreditationImage"
                :aspect-ratio="16 / 9"
                max-height="200"
                contain
              ></v-img>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { seedStore } from "../store/seed-store";

export default {
  computed: {
    ...mapStores(seedStore),
    seedImage() {
      if (!this.seedStore.seed || !this.seedStore.seed.images)
        return require("@/assets/no-image.png");
      return this.seedStore.seed.images;
    },
    seedCertificationImage() {
      if (!this.seedStore.seed || !this.seedStore.seed.certificationImages)
        return require("@/assets/no-image.png");
      return this.seedStore.seed.certificationImages;
    },
    seedAccreditationImage() {
      if (!this.seedStore.seed || !this.seedStore.seed.accreditationImages)
        return require("@/assets/no-image.png");
      return this.seedStore.seed.accreditationImages;
    },
    seedQRImage() {
      if (!this.seedStore.seed || !this.seedStore.seed.qrCodeImage)
        return require("@/assets/qrcode-example.png");
      return this.seedStore.seed.qrCodeImage;
    },
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  async created() {
    const code = this.$route.params.code;
    await this.seedStore.fetchSeed(code);
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

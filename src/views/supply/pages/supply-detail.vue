<template>
  <div class="page-container mx-auto pt-6 pb-8 px-6">
    <div class="neutral60--text font-weight-semibold d-flex flex-wrap">
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/supplies')">
        Danh sách vật tư
      </div>
      <span class="mx-2">/</span>
      <div class="primary--text text-capitalize">
        {{ supplyStore.supply.name || "Supply Name" }}
      </div>
    </div>
    <v-row class="mt-6" no-gutters>
      <v-col
        cols="12"
        md="6"
        :class="{ 'right-border pr-6': $vuetify.breakpoint.mdAndUp }"
      >
        <v-img
          class="border-radius-16"
          :src="supplyImage"
          :aspect-ratio="1 / 1"
          cover
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" :class="{ 'pl-6': $vuetify.breakpoint.mdAndUp }">
        <div
          class="d-flex justify-space-between"
          :class="{
            'flex-column align-center mt-6': $vuetify.breakpoint.smAndDown,
          }"
        >
          <div class="flex-grow-1 full-width">
            <div
              class="font-weight-semibold text-capitalize"
              :class="{
                'text-center text-dp-sm': $vuetify.breakpoint.smAndDown,
                'text-dp-md': !$vuetify.breakpoint.smAndDown,
              }"
            >
              {{ supplyStore.supply.name || "Supply Name" }}
            </div>
            <div
              class="font-weight-semibold text-dp-xs d-flex align-center my-2"
              v-if="$vuetify.breakpoint.mdAndUp"
            >
              {{ supplyStore.supply.price || "---"
              }}<span class="neutral80--text text-xs ml-1">vnđ</span>
            </div>
            <div
              class="d-flex align-center mt-4 mb-1 neutral80--text text-sm"
              v-else
            >
              Giá:
              <span class="font-weight-bold ml-1 text-lg"
                >{{ supplyStore.supply.price || "---" }}
              </span>
              <span class="neutral80--text text-xs ml-1">vnđ</span>
            </div>
            <div class="neutral80--text text-sm text-capitalize">
              Danh mục sản phẩm:
              {{ supplyStore.supply.supplyCategory }}
            </div>
            <div class="neutral80--text text-sm mt-1">
              Mã sản phẩm: {{ supplyStore.supply.code }}
            </div>
            <div class="neutral80--text text-sm mt-1 text-capitalize">
              Xuất xứ: {{ supplyStore.supply.origin }}
            </div>
          </div>
          <div
            :class="{
              'mt-6': $vuetify.breakpoint.smAndDown,
            }"
          >
            <v-img
              class="neutral20-border border-radius-16 qrcode-img"
              :src="supplyQRImage"
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
              <div class="mt-2" v-html="supplyStore.supply.description"></div>
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Công dụng sản phẩm</div>
              <div class="mt-2" v-html="supplyStore.supply.usage"></div>
            </div>
            <div class="mt-4">
              <div class="font-weight-semibold">Hướng dẫn sử dụng</div>
              <div
                class="mt-2"
                v-html="supplyStore.supply.useInstruction"
              ></div>
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
                :src="supplyCertificationImage"
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
                :src="supplyAccreditationImage"
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
import { supplyStore } from "../store/supply-store";

export default {
  computed: {
    ...mapStores(supplyStore),
    supplyImage() {
      if (!this.supplyStore.supply || !this.supplyStore.supply.images)
        return require("@/assets/no-image.png");
      return this.supplyStore.supply.images;
    },
    supplyCertificationImage() {
      if (
        !this.supplyStore.supply ||
        !this.supplyStore.supply.certificationImages
      )
        return require("@/assets/no-image.png");
      return this.supplyStore.supply.certificationImages;
    },
    supplyAccreditationImage() {
      if (
        !this.supplyStore.supply ||
        !this.supplyStore.supply.accreditationImages
      )
        return require("@/assets/no-image.png");
      return this.supplyStore.supply.accreditationImages;
    },
    supplyQRImage() {
      if (!this.supplyStore.supply || !this.supplyStore.supply.qrCodeImage)
        return require("@/assets/qrcode-example.png");
      return this.supplyStore.supply.qrCodeImage;
    },
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  async created() {
    const code = this.$route.params.code;
    await this.supplyStore.fetchSupply(code);
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

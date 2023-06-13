<template>
  <div>
    <div
      class="neutral60--text font-weight-semibold text-sm d-flex flex-wrap py-3 breadcrumb full-width"
      :class="$vuetify.breakpoint.smAndDown ? 'px-6' : 'px-11'"
    >
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/vat-tu')">
        Danh sách vật tư
      </div>
      <span class="mx-2">/</span>
      <div class="primary--text text-capitalize">
        {{ supplyStore.supply.name || "Supply Name" }}
      </div>
    </div>
    <div class="page-container mx-auto py-8 px-6">
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
          :class="{ 'right-border pr-6': $vuetify.breakpoint.mdAndUp }"
        >
          <ImageSlider
            :images="supplyStore.supplyImages"
            :imageMainHeight="$vuetify.breakpoint.mdAndUp ? '560px' : '360px'"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          :class="{ 'pl-6': $vuetify.breakpoint.mdAndUp }"
        >
          <div
            class="d-flex justify-space-between"
            :class="{
              'flex-column align-center': $vuetify.breakpoint.smAndDown,
            }"
          >
            <div class="flex-grow-1 full-width">
              <div
                class="font-weight-semibold text-none"
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
                {{ supplyStore.supply.price | numberWithCommas
                }}<span class="neutral80--text text-xs ml-1">vnđ</span>
              </div>
              <div
                class="d-flex align-center mt-4 mb-1 neutral80--text text-sm"
                v-else
              >
                Giá:
                <span class="font-weight-bold ml-1 text-lg"
                  >{{ supplyStore.supply.price | numberWithCommas }}
                </span>
                <span class="neutral80--text text-xs ml-1">vnđ</span>
              </div>
              <div class="neutral80--text text-sm text-none">
                Danh mục sản phẩm:
                {{ supplyStore.supply.supplyCategory }}
              </div>
              <div class="neutral80--text text-sm mt-1">
                Mã sản phẩm: {{ supplyStore.supply.code }}
              </div>
              <div class="neutral80--text text-sm mt-1 text-none">
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
                Chứng nhận
              </div>
            </div>
            <div class="text-start mt-4" v-if="currentTab == 0">
              <div class="cursor-pointer text-lg pb-4 font-weight-medium">
                1. Thông tin
              </div>
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
              <div class="cursor-pointer text-lg pb-4 font-weight-medium">
                2. Nguồn gốc
              </div>
              <div class="mt-3">
                <div class="font-weight-semibold">Đại lý:</div>
                <div class="mt-4 d-flex full-height align-center">
                  <div
                    class="d-flex flex-grow-1"
                    v-if="
                      supplyStore.supply.store &&
                      supplyStore.supply.store.id != -1
                    "
                  >
                    <div>
                      <v-img
                        class="relation-img border-radius-8"
                        :src="relationImage(supplyStore.supply.store.thumbnail)"
                        :aspect-ratio="4 / 3"
                        cover
                      ></v-img>
                    </div>
                    <div class="ml-4 flex-grow-1">
                      <div class="font-weight-semibold text-md">
                        {{ supplyStore.supply.store.name || "Vùng sản xuất" }}
                      </div>
                      <div class="neutral70--text text-sm mt-1">
                        {{ supplyStore.supply.store.code || "Mã truy xuất" }}
                      </div>
                      <v-btn
                        class="text-none text-capitalize mt-3"
                        elevation="0"
                        color="primary"
                        @click="
                          $router.push(
                            '/dai-ly/' + supplyStore.supply.store.code
                          )
                        "
                        small
                      >
                        Xem chi tiết
                      </v-btn>
                    </div>
                  </div>
                  <div
                    class="text-md font-weight-medium text-center py-4"
                    v-else
                  >
                    Không có thông tin!
                  </div>
                  <div
                    class="neutral20-border border-radius-8"
                    v-if="supplyStore.supply.store.qrCode"
                  >
                    <v-img
                      class="qrcode-img-card"
                      :aspect-ratio="1 / 1"
                      :src="relationImage(supplyStore.supply.store.qrCode)"
                      contain
                    ></v-img>
                  </div>
                </div>
              </div>
            </div>
            <v-divider class="mt-4"></v-divider>

            <div class="text-start mt-4" v-if="currentTab == 2">
              <div class="cursor-pointer text-lg pb-4 font-weight-medium">
                3. Chứng nhận
              </div>
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
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { supplyStore } from "../store/supply-store";

export default {
  components: {
    ImageSlider: () => import("@/components/image-slider.vue"),
  },
  computed: {
    ...mapStores(supplyStore),
    supplyImage() {
      if (!this.supplyStore.supply || !this.supplyStore.supply.images)
        return require("@/assets/no-image.webp");
      return this.supplyStore.supply.images;
    },
    supplyCertificationImage() {
      if (
        !this.supplyStore.supply ||
        !this.supplyStore.supply.certificationImages
      )
        return require("@/assets/no-image.webp");
      return this.supplyStore.supply.certificationImages;
    },
    supplyAccreditationImage() {
      if (
        !this.supplyStore.supply ||
        !this.supplyStore.supply.accreditationImages
      )
        return require("@/assets/no-image.webp");
      return this.supplyStore.supply.accreditationImages;
    },
    supplyQRImage() {
      if (!this.supplyStore.supply || !this.supplyStore.supply.qrCodeImage)
        return require("@/assets/qrcode-example.png");
      return this.supplyStore.supply.qrCodeImage;
    },
  },
  methods: {
    relationImage(image) {
      if (!image) return require("@/assets/no-image.webp");
      return image;
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
.relation-img {
  width: 96px;
  height: 96px;
}
.qrcode-img-card {
  width: 92px;
  height: 92px;
}
</style>

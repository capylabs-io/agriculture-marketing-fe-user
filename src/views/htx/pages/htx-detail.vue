<template>
  <div>
    <div
      class="neutral60--text font-weight-semibold text-sm d-flex flex-wrap px-11 py-3 breadcrumb full-width"
    >
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/hop-tac-xa')">
        Danh sách Hợp tác xã
      </div>
      <span class="mx-2">/</span>
      <div class="primary--text text-none">
        {{ htxStore.htx.name || "Hợp tác xã" }}
      </div>
    </div>
    <div class="page-container mx-auto py-8 px-6">
      <div class="d-flex">
        <v-img
          class="thumbnail-img border-radius-16"
          :src="htxImage"
          :aspect-ratio="1 / 1"
          cover
        ></v-img>
        <div class="flex-grow-1 full-width ml-6">
          <div
            class="font-weight-semibold text-none"
            :class="{
              'text-center text-lg': $vuetify.breakpoint.smAndDown,
              'text-dp-sm': !$vuetify.breakpoint.smAndDown,
            }"
          >
            {{ htxStore.htx.name || "Hợp tác xã" }}
          </div>
          <div class="mt-2">
            <div class="neutral80--text text-md font-weight-medium">
              <v-icon class="mr-1" color="primary">mdi-account</v-icon>
              Nguyễn Văn Anh
            </div>
            <div class="neutral80--text text-md font-weight-medium mt-1">
              <v-icon class="mr-1" color="primary">mdi-leaf</v-icon>
              Hợp tác xã trồng trọt
            </div>
            <div class="neutral80--text text-md font-weight-medium mt-1">
              <v-icon class="mr-1" color="primary">mdi-phone</v-icon>
              (+84) 99561111
            </div>
            <div class="neutral80--text text-md font-weight-medium mt-1">
              <v-icon class="mr-1" color="primary">mdi-map-marker</v-icon>
              Bến Tre
            </div>
          </div>
        </div>
        <v-img
          class="neutral20-border border-radius-16 qrcode-img"
          :src="htxQRImage"
        ></v-img>
      </div>

      <div class="neutral20-border border-radius-16 pa-6 mt-6 text-center">
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
            Sản phẩm
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
        <div class="text-start mt-6" v-if="currentTab == 0">
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Tên Hợp tác xã</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>{{ htxStore.htx.name }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Mã truy xuất</div>
            </v-col>
            <v-col cols="12" md="9">
              <div class="text-uppercase">{{ htxStore.htx.code }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Giới thiệu tổng quan</div>
            </v-col>
            <v-col cols="12" md="9">
              <div v-html="htxStore.htx.description"></div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Người đại diện</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>Nguyễn Văn Anh</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Loại hình</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>Trồng trọt</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Mã số thuế</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>111000378274</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Mã số Đăng kí kinh doanh</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>942854984</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Số điện thoại</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>09458141111</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Email</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>HTX.BenTre@gmail.com</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Địa chỉ</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>Số 12 xã Tân Thời tỉnh Bến Tre</div>
            </v-col>
          </v-row>
        </div>
        <div class="text-start mt-6" v-if="currentTab == 1">
          <!-- <div v-if="htxStore.slicedProducts.length > 0"> -->
          <div>
            <v-row class="mt-4">
              <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="3">
                <ProductCard :product="htxStore.htx"></ProductCard>
              </v-col>
            </v-row>

            <v-pagination
              color="primary"
              :length="htxStore.totalProductPage"
              v-model="htxStore.productPage"
            ></v-pagination>
          </div>
          <!-- <div
            class="font-weight-bold text-center text-dp-md flex-grow-1 no-item-div d-flex flex-column justify-center"
            v-else
          >
            Không có sản phẩm nào!
          </div> -->
        </div>
        <div class="text-start mt-6" v-if="currentTab == 2">
          <v-row>
            <v-col cols="12" md="4">
              <div class="font-weight-semibold">Hình ảnh Giấy chứng nhận</div>
              <div>Giấy chứng nhận cần đầy đủ 2 mặt</div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="d-flex align-center flex-wrap full-width gap-12">
                <img
                  class="certification-img"
                  :src="htxCertificationImage"
                  v-for="i in 3"
                  :key="i"
                />
              </div>
            </v-col>
          </v-row>
          <v-divider class="my-6"></v-divider>
          <v-row>
            <v-col cols="12" md="4">
              <div class="font-weight-semibold">Hình ảnh Giấy kiểm định</div>
              <div>Giấy kiểm định cần đầy đủ 2 mặt</div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="d-flex align-center flex-wrap full-width gap-12">
                <img
                  class="certification-img"
                  :src="htxAccreditationImage"
                  v-for="i in 3"
                  :key="i"
                />
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { htxStore } from "../store/htx-store";

export default {
  components: {
    ProductCard: () => import("@/views/product/components/product-card.vue"),
  },
  computed: {
    ...mapStores(htxStore),
    htxImage() {
      if (!this.htxStore.htx || !this.htxStore.htx.images)
        return require("@/assets/no-image.png");
      return this.htxStore.htx.images;
    },
    htxCertificationImage() {
      if (!this.htxStore.htx || !this.htxStore.htx.certificationImages)
        return require("@/assets/no-image.png");
      return this.htxStore.htx.certificationImages;
    },
    htxAccreditationImage() {
      if (!this.htxStore.htx || !this.htxStore.htx.accreditationImages)
        return require("@/assets/no-image.png");
      return this.htxStore.htx.accreditationImages;
    },
    htxQRImage() {
      if (!this.htxStore.htx || !this.htxStore.htx.qrCodeImage)
        return require("@/assets/qrcode-example.png");
      return this.htxStore.htx.qrCodeImage;
    },
  },
  data() {
    return {
      currentTab: 0,
      items: [
        {
          text: "Trang chủ",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Danh sách sản phẩm",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Cây cau cạn link rất rất dài",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
    };
  },
  async created() {
    const code = this.$route.params.code;
    await this.htxStore.fetchHtx(code);
  },
};
</script>

<style scoped>
.active {
  color: white !important;
  background-color: var(--v-primary50-base);
}
.thumbnail-img {
  width: 200px;
  height: 200px;
}
.qrcode-img {
  width: 184px;
  height: 184px;
}
.right-border {
  border-right: 1px solid var(--v-neutral20-base) !important;
}
.certification-img {
  max-height: 320px;
  max-width: 30%;
}
</style>

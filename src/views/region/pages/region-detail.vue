<template>
  <div>
    <div
      class="neutral60--text font-weight-semibold text-sm d-flex flex-wrap py-3 breadcrumb full-width"
      :class="$vuetify.breakpoint.smAndDown ? 'px-6' : 'px-11'"
    >
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/vung-san-xuat')">
        Danh sách Vùng sản xuất
      </div>
      <span class="mx-2">/</span>
      <div class="primary--text text-none">
        {{ regionStore.region.name || "Vùng sản xuất" }}
      </div>
    </div>
    <div class="page-container mx-auto mt-12 px-6">
      <div class="neutral20-border border-radius-16 overflow-hidden">
        <v-img
          class="full-width"
          :src="regionImage"
          :aspect-ratio="16 / 9"
          max-height="360px"
          cover
        >
          <v-img
            class="border-radius-16 qrcode-img"
            :src="regionQRImage"
          ></v-img>
        </v-img>
      </div>
    </div>
    <div class="page-container mx-auto py-8 px-6">
      <div class="neutral20-border border-radius-16 pa-6 mt-6 text-center">
        <div
          class="d-inline-flex align-center neutral20-border border-radius-8 mx-auto overflow-hidden"
          v-if="$vuetify.breakpoint.mdAndUp"
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
            Hợp tác xã
          </div>
          <v-divider vertical></v-divider>
          <div
            class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            :class="{ active: currentTab == 2 }"
            @click="currentTab = 2"
          >
            Sản phẩm
          </div>
          <v-divider vertical></v-divider>
          <div
            class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            :class="{ active: currentTab == 3 }"
            @click="currentTab = 3"
          >
            Chứng nhận
          </div>
        </div>
        <v-row
          class="neutral20-border border-radius-16 overflow-hidden"
          no-gutters
          v-else
        >
          <v-col cols="6">
            <div
              class="neutral20-border cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 0 }"
              @click="currentTab = 0"
            >
              Thông tin
            </div>
          </v-col>
          <v-col cols="6">
            <div
              class="neutral20-border cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 1 }"
              @click="currentTab = 1"
            >
              Hợp tác xã
            </div>
          </v-col>
          <v-col cols="6">
            <div
              class="neutral20-border cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 2 }"
              @click="currentTab = 2"
            >
              Sản phẩm
            </div>
          </v-col>
          <v-col cols="6">
            <div
              class="neutral20-border cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: currentTab == 3 }"
              @click="currentTab = 3"
            >
              Chứng nhận
            </div>
          </v-col>
        </v-row>
        <div class="text-start mt-6" v-if="currentTab == 0">
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Tên vùng</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>{{ regionStore.region.name }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Mã truy xuất</div>
            </v-col>
            <v-col cols="12" md="9">
              <div class="text-uppercase">{{ regionStore.region.code }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Giới thiệu tổng quan</div>
            </v-col>
            <v-col cols="12" md="9">
              <div v-html="regionStore.region.description"></div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Loại</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>
                {{ regionStore.region.regionCategory || "Vùng trồng trọt" }}
              </div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Địa giới</div>
            </v-col>
            <v-col cols="12" md="9">
              <div></div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Diện tích</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>{{ regionStore.region.acreage || "0" }} km2</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Số điện thoại</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>{{ regionStore.region.phone || "09458141111" }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Email</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>
                {{ regionStore.region.email || "HTX.BenTre@gmail.com" }}
              </div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Người đại diện</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>
                {{ regionStore.region.representative || "Nguyễn Văn Anh" }}
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="text-start mt-6" v-if="currentTab == 1">
          <div v-if="regionStore.htxs.length > 0">
            <!-- <div> -->
            <v-row class="mt-4">
              <v-col
                v-for="htx in regionStore.slicedHtxs"
                :key="htx.id"
                cols="12"
                sm="6"
                md="3"
              >
                <HtxCard :htx="htx"></HtxCard>
              </v-col>
            </v-row>

            <v-pagination
              color="primary"
              :length="regionStore.totalHtxPage"
              v-model="regionStore.htxPage"
            ></v-pagination>
          </div>
          <div
            class="font-weight-bold text-center text-dp-md flex-grow-1 no-item-div d-flex flex-column justify-center"
            v-else
          >
            Không có sản phẩm nào!
          </div>
        </div>
        <div class="text-start mt-6" v-if="currentTab == 2">
          <!-- <div v-if="regionStore.slicedProducts.length > 0"> -->
          <div>
            <v-row class="mt-4">
              <v-col
                v-for="product in regionStore.products"
                :key="product.id"
                cols="12"
                sm="6"
                md="3"
              >
                <ProductCard :product="product"></ProductCard>
              </v-col>
            </v-row>

            <v-pagination
              color="primary"
              :length="regionStore.totalProductPage"
              v-model="regionStore.productPage"
            ></v-pagination>
          </div>
          <!-- <div
            class="font-weight-bold text-center text-dp-md flex-grow-1 no-item-div d-flex flex-column justify-center"
            v-else
          >
            Không có sản phẩm nào!
          </div> -->
        </div>
        <div class="text-start mt-6" v-if="currentTab == 3">
          <v-row>
            <v-col cols="12" md="4">
              <div class="font-weight-semibold">Hình ảnh Giấy chứng nhận</div>
              <div>Giấy chứng nhận cần đầy đủ 2 mặt</div>
            </v-col>
            <v-col cols="12" md="8">
              <div
                class="d-flex align-center flex-wrap full-width gap-12"
                :class="{
                  'flex-column gap-16': $vuetify.breakpoint.smAndDown,
                }"
              >
                <img
                  :class="
                    $vuetify.breakpoint.smAndDown
                      ? 'mobile-cert-img'
                      : 'certification-img'
                  "
                  :src="image"
                  v-for="image in regionCertificationImage"
                  :key="image"
                />
              </div>
            </v-col>
          </v-row>
          <!-- <v-divider class="my-6"></v-divider>
          <v-row>
            <v-col cols="12" md="4">
              <div class="font-weight-semibold">Hình ảnh Giấy kiểm định</div>
              <div>Giấy kiểm định cần đầy đủ 2 mặt</div>
            </v-col>
            <v-col cols="12" md="8">
              <div
                class="d-flex align-center flex-wrap full-width gap-12"
                :class="{ 'flex-column gap-16': $vuetify.breakpoint.smAndDown }"
              >
                <img
                  :class="
                    $vuetify.breakpoint.smAndDown
                      ? 'mobile-cert-img'
                      : 'certification-img'
                  "
                  :src="regionAccreditationImage"
                  v-for="i in 3"
                  :key="i"
                />
              </div>
            </v-col>
          </v-row> -->
        </div>
      </div>
      <div class="mt-6 border-radius-16 overflow-hidden">
        <iframe
          :src="regionMap"
          height="475"
          width="100%"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { regionStore } from "../store/region-store";

export default {
  components: {
    ProductCard: () => import("@/views/product/components/product-card.vue"),
    HtxCard: () => import("@/views/htx/components/htx-card.vue"),
  },
  computed: {
    ...mapStores(regionStore),
    regionMap() {
      if (
        !this.regionStore.region ||
        !this.regionStore.region.long ||
        !this.regionStore.region.lat
      )
        return process.env.VUE_APP_GOOGLEMAP_DEFAULT_URL;
      return `https://maps.google.com/maps/embed/v1/place?key=${process.env.VUE_APP_GOOGLEMAP_API_KEY}&q=${this.regionStore.region.lat},${this.regionStore.region.long}`;
    },
    regionImage() {
      if (!this.regionStore.region || !this.regionStore.region.thumbnail)
        return require("@/assets/no-image.png");
      return this.regionStore.region.thumbnail;
    },
    regionCertificationImage() {
      if (!this.regionStore.region || !this.regionStore.region.certification)
        return [
          require("@/assets/no-image.png"),
          require("@/assets/no-image.png"),
          require("@/assets/no-image.png"),
        ];
      return this.regionStore.region.certification;
    },
    regionAccreditationImage() {
      if (
        !this.regionStore.region ||
        !this.regionStore.region.accreditationImages
      )
        return require("@/assets/no-image.png");
      return this.regionStore.region.accreditationImages;
    },
    regionQRImage() {
      if (!this.regionStore.region || !this.regionStore.region.qrCode)
        return require("@/assets/qrcode-example.png");
      return this.regionStore.region.qrCode;
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
    await this.regionStore.fetchRegion(code);
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
  position: absolute;
  left: 24px;
  bottom: 24px;
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
.mobile-cert-img {
  width: 100%;
}
</style>

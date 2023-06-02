<template>
  <div>
    <div
      class="neutral60--text font-weight-semibold text-sm d-flex flex-wrap py-3 breadcrumb full-width"
      :class="$vuetify.breakpoint.smAndDown ? 'px-6' : 'px-11'"
    >
      <div class="cursor-pointer" @click="$router.push('/')">Trang chủ</div>
      <span class="mx-2">/</span>
      <div class="cursor-pointer" @click="$router.push('/nghe-nhan')">
        Danh sách Nghệ nhân, Chuyên gia
      </div>
      <span class="mx-2">/</span>
      <div class="primary--text text-none">
        {{ artisanStore.artisan.name || "Nghệ nhân" }}
      </div>
    </div>
    <div class="page-container mx-auto py-8 px-6">
      <div
        class="d-flex"
        :class="{ 'flex-column align-center': $vuetify.breakpoint.smAndDown }"
      >
        <v-img
          class="thumbnail-img border-radius-16"
          :src="artisanImage"
          :aspect-ratio="1 / 1"
          cover
        ></v-img>
        <div
          class="flex-grow-1 full-width"
          :class="{
            'ml-6': !$vuetify.breakpoint.smAndDown,
            'py-6': $vuetify.breakpoint.smAndDown,
          }"
        >
          <div
            class="font-weight-semibold text-none"
            :class="{
              'text-center text-lg': $vuetify.breakpoint.smAndDown,
              'text-dp-sm': !$vuetify.breakpoint.smAndDown,
            }"
          >
            {{ artisanStore.artisan.name || "Unkown" }}
          </div>
          <div class="mt-2">
            <div class="neutral80--text text-md font-weight-medium">
              <v-icon class="mr-1" color="primary">mdi-leaf</v-icon>
              {{ artisanStore.artisan.artisanCategory || "Nghệ nhân" }}
            </div>
            <div class="neutral80--text text-md font-weight-medium mt-1">
              <v-icon class="mr-1" color="primary">mdi-phone</v-icon>
              {{ artisanStore.artisan.phone || "99561111" }}
            </div>
            <div
              class="neutral80--text text-md font-weight-medium mt-1 text-capitalize"
            >
              <v-icon class="mr-1" color="primary">mdi-map-marker</v-icon>
              {{ artisanStore.artisan.address || "Bến tre" }}
            </div>
          </div>
        </div>
        <v-img
          class="neutral20-border border-radius-16 qrcode-img"
          :src="artisanQRImage"
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
        </div>
        <div class="text-start mt-6" v-if="currentTab == 0">
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Họ và tên</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>{{ artisanStore.artisan.name }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Mã truy xuất</div>
            </v-col>
            <v-col cols="12" md="9">
              <div class="text-uppercase">{{ artisanStore.artisan.code }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Giới thiệu tổng quan</div>
            </v-col>
            <v-col cols="12" md="9">
              <div v-html="artisanStore.artisan.description"></div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Danh xưng</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>
                {{ artisanStore.artisan.artisanCategory || "Nghệ nhân" }}
              </div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Số điện thoại</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>{{ artisanStore.artisan.phone || "99561111" }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <div class="font-weight-semibold">Email</div>
            </v-col>
            <v-col cols="12" md="9">
              <div>
                {{ artisanStore.artisan.email || "HTX.BenTre@gmail.com " }}
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="text-start mt-6" v-if="currentTab == 1">
          <div v-if="artisanStore.slicedProducts.length > 0">
            <!-- <div> -->
            <v-row class="mt-4">
              <v-col
                v-for="product in artisanStore.slicedProducts"
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
              :length="artisanStore.totalProductPage"
              v-model="artisanStore.productPage"
            ></v-pagination>
          </div>
          <div
            class="font-weight-bold text-center text-dp-md flex-grow-1 no-item-div d-flex flex-column justify-center"
            v-else
          >
            Không có sản phẩm nào!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { artisanStore } from "../store/artisan-store";

export default {
  components: {
    ProductCard: () => import("@/views/product/components/product-card.vue"),
  },
  computed: {
    ...mapStores(artisanStore),
    artisanImage() {
      if (!this.artisanStore.artisan || !this.artisanStore.artisan.thumbnail)
        return require("@/assets/no-image.png");
      return this.artisanStore.artisan.thumbnail;
    },
    artisanCertificationImage() {
      if (
        !this.artisanStore.artisan ||
        !this.artisanStore.artisan.certificationImages
      )
        return require("@/assets/no-image.png");
      return this.artisanStore.artisan.certificationImages;
    },
    artisanAccreditationImage() {
      if (
        !this.artisanStore.artisan ||
        !this.artisanStore.artisan.accreditationImages
      )
        return require("@/assets/no-image.png");
      return this.artisanStore.artisan.accreditationImages;
    },
    artisanQRImage() {
      if (!this.artisanStore.artisan || !this.artisanStore.artisan.qrCode)
        return require("@/assets/qrcode-example.png");
      return this.artisanStore.artisan.qrCode;
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
    await this.artisanStore.fetchArtisan(code);
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
.mobile-cert-img {
  width: 100%;
}
</style>

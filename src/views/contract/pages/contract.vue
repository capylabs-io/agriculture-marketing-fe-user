<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-6 pb-8 px-6">
    <v-row class="mt-6" no-gutters>
      <v-col
        class="d-flex flex-column justify-center login-container mx-auto form"
        cols="12"
        md="6"
      >
        <v-form
          ref="form"
          lazy-validation
          class="full-width d-flex flex-column justify-center"
        >
          <div class="text-dp-md font-weight-medium">Liên hệ ngay</div>
          <div class="text-md mt-2">
            Hãy gửi các thắc mắc hoặc các câu hỏi đến cho chúng tôi
          </div>
          <div class="d-flex flex-column full-width form-input">
            <div class="text-sm font-weight-bold mt-6">Họ tên</div>
            <v-text-field
              height="36px"
              type="text"
              :rules="rules.checkIdentifier"
              class="pa-0 mt-2"
              placeholder="Nguyễn Văn A"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold mt-2">Email</div>
            <v-text-field
              height="36px"
              type="text"
              :rules="rules.checkIdentifier"
              class="pa-0 mt-2"
              placeholder="abc@gmail.com"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold mt-2">
              Số điện thoại
              <span class="neutral60--text">(không bắt buộc)</span>
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 mt-2"
              placeholder="09xxxxxx"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold mt-2">Tiêu đề thư</div>
            <v-text-field
              height="36px"
              type="text"
              :rules="rules.checkIdentifier"
              class="pa-0 mt-2"
              placeholder="Nhập thông tin"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold mt-2">Nội dung</div>
            <v-textarea
              type="text"
              class="border-radius-8 pa-0 mt-2"
              placeholder="Nhập thông tin"
              :rules="[$rules.required]"
              auto-grow
              flat
              solo
              outlined
            />
            <v-btn
              class="mt-7 full-width border-radius-12"
              color="primary"
              height="56px"
              @click="submitForm"
              depressed
              ><span class="text-none text-btn">Gửi thông tin</span></v-btn
            >
          </div>
        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <div
          class="neutral20-border border-radius-16 py-6 px-7 d-flex flex-column justify-center"
        >
          <div class="d-flex">
            <v-img
              max-width="48px"
              height="48px"
              :src="require('@/assets/quochuy.png')"
              cover
            ></v-img>
            <div class="text-capitalize font-weight-bold text-xl ml-3">
              Trung Tâm truy xuất nguồn gốc cây và hoa cảnh TỈNH Bến Tre
            </div>
          </div>
          <div class="d-flex mt-4 align-center">
            <v-icon color="primary">mdi-account-multiple</v-icon>
            <div class="text-md ml-1">Ông Phạm Văn A</div>
          </div>
          <div class="d-flex mt-2 align-center">
            <v-icon color="primary">mdi-city</v-icon>
            <div class="text-md ml-1">
              số 12 đường B, quận C, thành phố Bến Tre
            </div>
          </div>
          <div class="d-flex mt-2 align-center">
            <v-icon color="primary">mdi-phone</v-icon>
            <div class="text-md ml-1">09xxxxxxxxxxx</div>
          </div>
          <div class="d-flex mt-2 align-center">
            <v-icon color="primary">mdi-email</v-icon>
            <div class="text-md ml-1">TTCC.BenTre@gov.vn</div>
          </div>
        </div>

        <GmapMap
          :center="{ lat: 10, lng: 10 }"
          :zoom="7"
          map-type-id="terrain"
          class="mt-4 border-radius-16 overflow-hidden"
          style="width: 100%; height: 500px"
        >
          <GmapMarker
            ref="myMarker"
            :position="google && new google.maps.LatLng(1.38, 103.8)"
          />
        </GmapMap>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mapStores } from "pinia";
// import { supplyStore } from "../store/supply-store";
import { rules } from "@/plugins/rules";
import { gmapApi } from "vue2-google-maps";

export default {
  computed: {
    // ...mapStores(supplyStore),
    google: gmapApi,
  },
  data() {
    return {
      currentTab: 0,
      rules: rules,
      isShow: true,
      isShowPass: false,
    };
  },
  created() {},
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
.form-input {
  width: 80% !important;
}
.vue-map-container {
  position: relative;
  border: 4px solid white;
  border-radius: 16px !important;
}

.vue-map-container .vue-map {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 16px !important;
  position: absolute;
}
</style>

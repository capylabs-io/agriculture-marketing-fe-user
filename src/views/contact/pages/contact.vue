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
          v-model="contactForm"
          ref="form"
          class="full-width d-flex flex-column justify-center"
        >
          <div
            class="text-dp-md font-weight-medium"
            :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
          >
            Liên hệ ngay
          </div>
          <div
            class="text-md mt-2"
            :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
          >
            Hãy gửi các thắc mắc hoặc các câu hỏi đến cho chúng tôi
          </div>
          <div
            class="d-flex flex-column full-width"
            :class="{ 'form-input': $vuetify.breakpoint.mdAndUp }"
          >
            <div class="text-sm font-weight-bold mt-6">Họ tên</div>
            <v-text-field
              height="36px"
              type="text"
              v-model="contactStore.contacts.name"
              :rules="[$rules.required]"
              class="pa-0 mt-2"
              placeholder="Nguyễn Văn A"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold">Email</div>
            <v-text-field
              height="36px"
              type="text"
              v-model="contactStore.contacts.email"
              :rules="$rules.email"
              class="pa-0 mt-2"
              placeholder="abc@gmail.com"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold">
              Số điện thoại
              <span class="neutral60--text">(không bắt buộc)</span>
            </div>
            <v-text-field
              v-model="contactStore.contacts.phone"
              height="36px"
              type="text"
              class="pa-0 mt-2"
              placeholder="09xxxxxx"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold">Tiêu đề thư</div>
            <v-text-field
              v-model="contactStore.contacts.title"
              height="36px"
              type="text"
              :rules="[$rules.required]"
              class="pa-0 mt-2"
              placeholder="Nhập thông tin"
              outlined
              dense
            />
            <div class="text-sm font-weight-bold">Nội dung</div>
            <v-textarea
              v-model="contactStore.contacts.content"
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
              class="full-width border-radius-12"
              color="primary"
              height="56px"
              :disabled="!contactForm"
              :class="$vuetify.breakpoint.smAndDown ? 'mt-0' : 'mt-7'"
              @click="submitForm"
              depressed
              ><span class="text-none text-btn">Gửi thông tin</span></v-btn
            >
          </div>
        </v-form>
      </v-col>
      <v-col
        cols="12"
        md="6"
        :class="{ 'mt-6': $vuetify.breakpoint.smAndDown }"
      >
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
            <div class="text-capitalize font-weight-bold text-lg ml-3">
              Trung Tâm truy xuất nguồn gốc cây và hoa cảnh TỈNH Bến Tre
            </div>
          </div>
          <div class="d-flex mt-4 align-center">
            <v-icon color="primary">mdi-account-multiple</v-icon>
            <div class="text-md ml-2">Ông Phạm Văn A</div>
          </div>
          <div class="d-flex mt-2 align-center">
            <v-icon color="primary">mdi-city</v-icon>
            <div class="text-md ml-2">
              số 12 đường B, quận C, thành phố Bến Tre
            </div>
          </div>
          <div class="d-flex mt-2 align-center">
            <v-icon color="primary">mdi-phone</v-icon>
            <div class="text-md ml-2">09xxxxxxxxxxx</div>
          </div>
          <div class="d-flex mt-2 align-center">
            <v-icon color="primary">mdi-email</v-icon>
            <div class="text-md ml-2">TTCC.BenTre@gov.vn</div>
          </div>
        </div>
        <iframe
          src="https://maps.google.com/maps?height=400&amp;hl=en&amp;q=21.028511,105.804817&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          height="500"
          width="100%"
          style="border: 0"
          loading="lazy"
          class="mt-4 border-radius-16 overflow-hidden"
        ></iframe>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { rules } from "@/plugins/rules";
import { contactStore } from "../stores/contactStore";

import { gmapApi } from "vue2-google-maps";

export default {
  computed: {
    ...mapStores(contactStore),
    google: gmapApi,
  },
  data() {
    return {
      currentTab: 0,
      rules: rules,
      contactForm: false,
    };
  },
  created() {},
  methods: {
     async submitForm() {
      await this.contactStore.createContact();
      window.location.reload();
    },
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

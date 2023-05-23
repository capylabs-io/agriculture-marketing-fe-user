<template>
  <div
    class="card-shadow border-radius-16 pa-6 text-center overflow-hidden white-bg"
  >
    <div class="avatar mx-auto">
      <v-img :src="expertImage" :aspect-ratio="1 / 1"></v-img>
    </div>
    <div class="mt-6">
      <div class="text-lg font-weight-semibold">{{ expertName }}</div>
      <div class="text-sm neutral70--text">{{ expertTitle }}</div>
    </div>
    <v-divider class="my-4"></v-divider>
    <div class="d-flex align-center justify-center">
      <v-icon small>mdi-phone</v-icon>
      <div class="text-sm font-weight-semibold ml-1">{{ expertPhone }}</div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
export default {
  computed: {
    expertImage() {
      if (!this.expert || !this.expert.avatar)
        return require("@/assets/components/landing/image-3.webp");
      return this.expert.avatar;
    },
    expertName() {
      return get(this.expert, "name", "Họ và tên");
    },
    expertTitle() {
      return get(this.expert, "name", "Chuyên gia");
    },
    expertPhone() {
      return get(this.expert, "phone", "Số điện thoại");
    },
  },
  props: {
    expert: Object,
  },
};
</script>

<style scoped>
.avatar {
  max-width: 148px;
  max-height: 148px;
  padding: 10px;
  border: 1px dashed #996535;
  border-radius: 74px !important;
}

.avatar .v-image {
  max-width: 128px;
  max-height: 128px;
  border-radius: 64px !important;
}

.expert-card {
  max-width: 520px;
}
</style>

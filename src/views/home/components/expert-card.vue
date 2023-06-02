<template>
  <div
    class="card-shadow border-radius-16 pa-6 text-center overflow-hidden white-bg full-height d-flex flex-column"
  >
    <div class="avatar mx-auto">
      <v-img :src="expertImage" :aspect-ratio="1 / 1"></v-img>
    </div>
    <div class="text-lg font-weight-semibold mt-6">{{ expertName }}</div>
    <div class="text-sm neutral70--text flex-grow-1 mt-1">
      {{ expertTitle }}
    </div>
    <v-btn
      class="neutral30-border text-none text-sm py-4 border-radius-8 mt-6 mx-auto"
      max-width="128px"
      @click="$router.push('/nghe-nhan/' + expert.code)"
      outlined
      small
    >
      Chi Tiết
    </v-btn>
  </div>
</template>

<script>
import { get } from "lodash";
export default {
  computed: {
    expertImage() {
      if (!this.expert || !this.expert.thumbnail)
        return require("@/assets/components/landing/image-3.webp");
      return this.expert.thumbnail;
    },
    expertName() {
      return get(this.expert, "name", "Họ và tên");
    },
    expertTitle() {
      return get(this.expert, "artisanCategory.name", "Chuyên gia");
    },
  },
  props: {
    expert: Object,
  },
};
</script>

<style scoped>
.avatar {
  width: 148px;
  height: 148px;
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

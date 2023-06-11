<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goTo()"
  >
    <v-img
      :src="agentImage"
      :aspect-ratio="16 / 9"
      height="164px"
      cover
    ></v-img>
    <div class="full-height d-flex flex-column pt-3 pb-2">
      <div
        class="d-flex align-center justify-center agent-id text-center text-sm text-uppercase"
      >
        <v-icon small class="mr-1" color="primary">mdi-qrcode</v-icon>
        {{ agentCode }}
      </div>
      <div class="text-center text-xl font-weight-medium px-4 pt-1 flex-grow-1">
        {{ agentName }}
      </div>
      <v-divider class="mt-3"></v-divider>
      <div class="text-sm text-center mt-2 primary--text">
        {{ agentCategory }}
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
export default {
  computed: {
    agentImage() {
      if (!this.agent || !this.agent.images)
        return require("@/assets/no-image.webp");
      return this.agent.images;
    },
    agentCode() {
      return get(this.agent, "code", "Mã sản phẩm");
    },
    agentName() {
      return get(this.agent, "name", "Tên sản phẩm");
    },
    agentCategory() {
      return get(this.agent, "agentCategory.name", "Danh mục sản phẩm");
    },
  },
  props: {
    agent: Object,
  },
  methods: {
    goTo() {
      this.$router.push(`/agents/${this.agentCode}`);
    },
  },
};
</script>

<style scoped></style>

<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer neutral20-border full-height d-flex flex-column"
    @click="goToNewsDetail()"
  >
    <v-img :aspect-ratio="16 / 9" :src="postImage" cover></v-img>
    <!-- <div class="product-id text-center text-sm py-1">NSHN-12345</div> -->
    <div class="pa-5 d-flex flex-column full-height">
      <div class="text-sm font-weight-medium title">
        {{ post.newsCategory.name }}
      </div>
      <div class="text-xl font-weight-semibold mt-2 flex-grow-1">
        {{ post.title }}
      </div>
      <div class="text-sm font-weight-medium mt-2 neutral40--text">
        {{ post.createdAt | ddmmyyyyhhmmss }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { newStore } from "../stores/newStore";

export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(newStore),
    postImage() {
      if (!this.post || !this.post.images)
        return require("@/assets/no-image.png");
      return this.post.images;
    },
  },
  methods: {
    goToNewsDetail() {
      if(this.newStore.news && this.post && this.newStore.news.id == this.post.id) return;
      this.$router.push(`/news/${this.post.id}`);
    },
  },
};
</script>

<style scoped>
.product-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
.title {
  color: var(--v-green70-base);
}
</style>

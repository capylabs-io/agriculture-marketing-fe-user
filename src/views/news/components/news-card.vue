<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer neutral20-border full-height d-flex flex-column"
    @click="goToNewsDetail()"
  >
    <v-img :aspect-ratio="16 / 9" :src="postImage" cover></v-img>
    <!-- <div class="product-id text-center text-sm py-1">NSHN-12345</div> -->
    <div class="pa-5 d-flex flex-column full-height">
      <div class="d-flex align-center justify-space-between">
        <div class="text-md font-weight-medium primary--text">
          {{ post.newsCategory.name }}
        </div>
        <div class="text-sm font-weight-medium neutral40--text">
          {{ post.createdAt | ddmmyyyy }}
        </div>
      </div>
      <div class="text-xl font-weight-bold mt-2 flex-grow-1">
        {{ post.title }}
      </div>
      <div class="text-sm font-weight-medium mt-2">
        {{ post.author }}
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
        return require("@/assets/no-image.webp");
      return this.post.images;
    },
  },
  methods: {
    goToNewsDetail() {
      if (
        this.newStore.news &&
        this.post &&
        this.newStore.news.id == this.post.id
      )
        return;
      this.$router.push(`/bai-viet/${this.post.id}`);
    },
  },
};
</script>

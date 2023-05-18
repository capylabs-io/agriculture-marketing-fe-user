<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer neutral20-border"
    @click="goToNewsDetail()"
  >
    <v-img max-height="170px" :src="postImage"></v-img>
    <!-- <div class="product-id text-center text-sm py-1">NSHN-12345</div> -->
    <div class="pa-5">
      <div class="text-sm font-weight-medium title">
        {{ post.newsCategory.name }}
      </div>
      <div class="text-xl font-weight-semibold mt-2">
        {{ post.title }}
      </div>
      <div class="text-sm font-weight-medium mt-2 neutral40--text">
        {{ post.createdAt | ddmmyyyyhhmmss }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    postImage() {
      if (!this.new || !this.new.images)
        return require("@/assets/no-image.png");
      return this.new.images;
    },
  },
  methods: {
    goToNewsDetail() {
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

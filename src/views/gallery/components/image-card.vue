<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer neutral20-border full-height d-flex flex-column"
    @click="goToNewsDetail()"
  >
    <v-img :src="postImage" :aspect-ratio="16 / 9" cover></v-img>
    <div class="pa-5 d-flex flex-column full-height">
      <v-clamp class="font-weight-bold text-md" :max-lines="2">
        {{ post.title }}</v-clamp
      >
      <div class="text-sm font-weight-medium neutral40--text mt-2">
        {{ post.createdAt | ddmmyyyy }}
      </div>
    </div>
  </div>
</template>

<script>
import VClamp from "vue-clamp";

export default {
  components: {
    VClamp,
  },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    url: String,
  },
  computed: {
    postImage() {
      if (!this.post || !this.post.images)
        return require("@/assets/no-image.webp");
      return this.post.images;
    },
  },
  methods: {
    goToNewsDetail() {
      if (!this.url) return;
      this.$router.push(this.url);
    },
  },
};
</script>

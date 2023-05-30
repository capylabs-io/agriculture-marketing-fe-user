<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer neutral20-border full-height d-flex flex-column"
  >
    <v-img
      :src="require('@/assets/gallery-image.png')"
      :aspect-ratio="16 / 9"
      cover
    ></v-img>
    <div class="pa-5 d-flex flex-column full-height">
      <div class="d-flex align-center justify-space-between">
        <div class="text-md font-weight-medium neutral40--text">Eventname</div>
      </div>
      <v-clamp class="font-weight-bold mt-2 text-md" :max-lines="2">
        Hội thảo chuyên sâu về phát triển công nghệ cho miệt vườn vùng Tây Nam
        Bộ</v-clamp
      >
      <div class="text-sm font-weight-medium neutral40--text mt-2">
        12/08/2023
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
  },
  computed: {
    postImage() {
      if (!this.post || !this.post.images)
        return require("@/assets/no-image.png");
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

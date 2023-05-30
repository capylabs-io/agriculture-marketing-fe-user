<template>
  <v-row>
    <v-col cols="3"
      ><img
        class="post-img border-radius-8 cursor-pointer flex-grow-1"
        :src="postImage"
    /></v-col>
    <v-col cols="9">
      <div class="ml-6 cursor-pointer">
        <v-clamp class="font-weight-semibold text-lg" :max-lines="2">{{
          post.title
        }}</v-clamp>
        <v-clamp class="text-sm mt-3" :max-lines="4">{{
          stripHtml(post.content)
        }}</v-clamp>
        <div class="d-flex justify-space-between align-center mt-3 text-sm">
          <div class="text-sm mt-1 neutral70--text">
            <v-icon small class="mr-1">mdi-camera </v-icon>{{ post.author }}
          </div>
          <div class="text-sm mt-1 neutral70--text">
            <v-icon small class="mr-1">mdi-clock-outline </v-icon
            >{{ post.createdAt | ddmmyyyy }}
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
// import { mapStores } from "pinia";
// import { newStore } from "../stores/newStore";
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
    // ...mapStores(newStore),
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
    stripHtml(html) {
      // Create a new div element
      var temporalDivElement = document.createElement("div");
      // Set the HTML content with the providen
      temporalDivElement.innerHTML = html;
      // Retrieve the text property of the element (cross-browser support)
      return (
        temporalDivElement.textContent || temporalDivElement.innerText || ""
      );
    },
  },
};
</script>

<style scoped>
.post-img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9 !important;
  object-fit: cover !important;
}
.title {
  color: var(--v-green70-base);
}
</style>

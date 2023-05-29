<template>
  <v-row>
    <v-col class="d-flex full-width" cols="12" md="9">
      <img
        class="post-img border-radius-8 cursor-pointer"
        :src="postImage"
        @click="goToNewsDetail()"
      />
      <div class="ml-6 cursor-pointer" @click="goToNewsDetail()">
        <v-clamp class="font-weight-semibold text-lg" :max-lines="2">{{
          stripHtml(post.title)
        }}</v-clamp>
        <v-clamp class="text-sm mt-3" :max-lines="3">{{
          stripHtml(post.content)
        }}</v-clamp>
        <div class="d-flex justify-space-between align-center mt-3 text-sm">
          <div class="neutral80--text font-weight-medium">
            {{ post.author }}
          </div>
          <div class="font-weight-medium neutral40--text">
            {{ post.createdAt | ddmmyyyy }}
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="3">
      <div class="text-end primary--text text-uppercase text-sm">
        {{ post.newsCategory.name }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { newStore } from "../stores/newStore";
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
    ...mapStores(newStore),
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
  width: 232px !important;
  aspect-ratio: 16 / 9 !important;
  object-fit: cover;
}
.title {
  color: var(--v-green70-base);
}
</style>

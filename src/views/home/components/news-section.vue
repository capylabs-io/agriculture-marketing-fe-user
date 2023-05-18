<template>
  <div class="page-container mx-auto py-16 px-6">
    <div
      class="font-weight-semibold text-dp-md text-center"
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay="600"
    >
      Tin tức
    </div>
    <v-row class="mt-12" no-gutters>
      <v-col
        class="d-flex right-border pr-6"
        cols="12"
        md="6"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <v-img
          class="border-radius-16 neutral30-border cursor-pointer"
          :src="productImage(homeStore.newestPost.images)"
          max-height="420px"
          @click="goToPost(homeStore.newestPost.id)"
        >
          <v-img
            class="image-gradient"
            :src="require('@/assets/components/landing/image-gradient.png')"
          ></v-img>
          <div class="big-new-title white--text pa-6">
            <div class="font-weight-semibold text-dp-xs">
              {{ newestPostTitle }}
            </div>
            <div class="text-md mt-1 font-weight-light">
              {{ newestPostContent }}
            </div>
          </div>
        </v-img>
      </v-col>
      <v-col
        class="d-flex flex-column justify-space-between pl-6"
        cols="12"
        md="6"
      >
        <div
          class="d-flex cursor-pointer"
          v-for="(post, i) in homeStore.otherPosts"
          :key="post.id"
          data-aos="fade-left"
          data-aos-duration="500"
          :data-aos-delay="300 * i"
          @click="goToPost(post.id)"
        >
          <div>
            <v-img
              class="border-radius-16 neutral30-border"
              :src="productImage(post.images)"
              height="132px"
              width="176px"
            ></v-img>
          </div>
          <div class="ml-4">
            <div class="font-weight-semibold text-lg">
              {{ post.title }}
            </div>
            <div class="neutral70--text text-sm mt-1">
              {{ post.content.slice(0, 100) }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="mt-12 text-center">
      <v-btn
        class="text-none text-capitalize px-3 py-5 border-radius-8 btn-show-more"
        elevation="0"
        >Xem thêm</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { homeStore } from "../store/home-store";
import { get } from "lodash";
export default {
  computed: {
    ...mapStores(homeStore),
    newestPostTitle() {
      return get(homeStore.newestPost, "title", "Tiêu đề");
    },
    newestPostContent() {
      let content = get(homeStore.newestPost, "content", "Nội dung bài viết");
      content = content.length >= 100 ? content.slice(0, 100) + "..." : content;
      return content;
    },
  },
  methods: {
    productImage(image) {
      if (!image) return require("@/assets/no-image.png");
      return image;
    },
    goToPost(id) {
      if (!id) return;
      this.$router.push("/news/" + id);
    },
  },
};
</script>

<style scoped>
.image-gradient {
  position: absolute;
  bottom: 0;
}
.big-new-title {
  position: absolute;
  bottom: 0;
}
.right-border {
  border-right: 1px solid var(--v-neutral20-base) !important;
}
</style>

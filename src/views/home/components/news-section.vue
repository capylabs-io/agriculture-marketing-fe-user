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
        cols="12"
        md="6"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="500"
        :class="{ 'right-border pr-6': $vuetify.breakpoint.mdAndUp }"
      >
        <v-img
          class="border-radius-16 neutral30-border cursor-pointer big-post"
          :src="productImage(homeStore.newestPost.images)"
          @click="goToPost(homeStore.newestPost.id)"
        >
          <v-img
            class="image-gradient"
            :class="{ 'full-height': $vuetify.breakpoint.smAndDown }"
            :src="require('@/assets/components/landing/image-gradient.png')"
          ></v-img>
          <div class="big-new-title white--text pa-6 full-width">
            <div class="font-weight-semibold text-dp-xs">
              {{ homeStore.newestPost.title }}
            </div>
            <div
              class="text-md mt-1 font-weight-light text-truncate"
              v-if="$vuetify.breakpoint.mdAndUp"
            >
              {{ stripHtml(homeStore.newestPost.content) }}
            </div>
          </div>
        </v-img>
      </v-col>
      <v-col
        class="d-flex flex-column justify-space-between pl-6 gap-16"
        cols="12"
        md="6"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <div
          v-for="(post, i) in homeStore.otherPosts"
          class="d-flex cursor-pointer"
          data-aos="fade-left"
          data-aos-duration="500"
          :key="post.id"
          :data-aos-delay="300 * i"
          @click="goToPost(post.id)"
        >
          <div>
            <v-img
              class="border-radius-16 neutral30-border"
              width="200px"
              :aspect-ratio="16 / 9"
              :src="productImage(post.images)"
              cover
            />
          </div>
          <div class="ml-4 flex-grow-1">
            <div class="font-weight-semibold text-lg">
              {{ post.title }}
            </div>
            <!-- <div class="neutral70--text text-sm mt-1 text-truncate">
              {{ stripHtml(post.content) }}
            </div> -->
            <div class="primary--text font-weight-bold mt-2">
              {{ post.postCategory.name }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <v-divider class="mt-6"></v-divider>
      <div>
        <div
          class="cursor-pointer mt-6"
          v-for="(post, i) in homeStore.otherPosts"
          :key="post.id"
          data-aos="fade-left"
          data-aos-duration="500"
          :data-aos-delay="300 * i"
          @click="goToPost(post.id)"
        >
          <v-img
            class="border-radius-16 neutral30-border full-width"
            :src="productImage(post.images)"
            height="172px"
            cover
          ></v-img>
          <div class="full-width d-flex flex-column mt-3">
            <div class="font-weight-semibold text-lg">
              {{ post.title }}
            </div>
            <!-- <div class="neutral70--text text-sm mt-1 flex-grow-1 text-truncate">
              {{ stripHtml(post.content) }}
            </div> -->
            <div class="primary--text font-weight-semibold mt-1">
              {{ post.postCategory.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12 text-center">
      <v-btn
        class="text-none text-capitalize px-3 py-5 border-radius-8 btn-show-more"
        elevation="0"
        @click="$router.push('/news')"
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
.image-gradient {
  position: absolute;
  bottom: 0;
}
.big-post {
  max-height: 377px;
}
.big-new-title {
  position: absolute;
  bottom: 0;
}
.right-border {
  border-right: 1px solid var(--v-neutral20-base) !important;
}
.sm-post-title {
  display: block;
  max-height: 48px;
}
</style>

<template>
  <div class="page-container mx-auto py-16 px-6">
    <div class="d-flex align-center justify-space-between">
      <div class="font-weight-semibold text-dp-sm text-center">Tin tức</div>
      <v-btn
        class="text-none text-md primary--text px-0"
        text
        @click="$router.push('/tin-tuc')"
        >Xem thêm <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <v-row class="mt-4">
      <v-col class="align-self-scretch" cols="12" md="7">
        <div
          class="d-flex border-radius-16 cursor-pointer big-post overflow-hidden full-height"
          :class="{ 'flex-column': $vuetify.breakpoint.smAndDown }"
          @click="goToPost(homeStore.newestPost.id)"
          data-aos="fade-right"
          data-aos-duration="500"
        >
          <img
            :class="
              $vuetify.breakpoint.smAndDown
                ? 'mobile-big-post-img'
                : 'big-post-img full-height'
            "
            :src="productImage(homeStore.newestPost.images)"
          />
          <div class="pa-4">
            <div class="primary--text font-weight-semibold">
              {{ homeStore.newestPost.postCategory.name }}
            </div>
            <v-clamp
              class="font-weight-semibold text-dp-xs mt-2"
              :max-lines="4"
              >{{ stripHtml(homeStore.newestPost.title) }}</v-clamp
            >
            <v-clamp class="mt-3" :max-lines="6">{{
              stripHtml(homeStore.newestPost.content)
            }}</v-clamp>
          </div>
        </div>
      </v-col>
      <v-col
        class="d-flex flex-column justify-space-between gap-16"
        cols="12"
        md="5"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <div
          v-for="(post, i) in homeStore.otherPosts"
          class="d-flex cursor-pointer"
          data-aos="fade-left"
          data-aos-duration="500"
          :key="post.id"
          :data-aos-delay="i * 200"
          @click="goToPost(post.id)"
        >
          <div>
            <img
              class="border-radius-16 post-img"
              :src="productImage(post.images)"
              cover
            />
          </div>
          <div class="ml-4">
            <div class="primary--text text-sm font-weight-semibold">
              {{ post.postCategory.name }}
            </div>
            <v-clamp class="font-weight-semibold text-md" :max-lines="2">{{
              stripHtml(post.title)
            }}</v-clamp>
            <v-clamp class="text-sm mt-1" :max-lines="2">{{
              stripHtml(post.content)
            }}</v-clamp>
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
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { homeStore } from "../store/home-store";
import { get } from "lodash";
import VClamp from "vue-clamp";
export default {
  components: {
    VClamp,
  },
  computed: {
    ...mapStores(homeStore),
    newestPostTitle() {
      return get(homeStore.newestPost, "title", "Tiêu đề");
    },
  },
  methods: {
    productImage(image) {
      if (!image) return require("@/assets/no-image.png");
      return image;
    },
    goToPost(id) {
      if (!id) return;
      this.$router.push("/bai-viet/" + id);
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
  background-color: var(--v-primary5-base) !important;
}
.big-post-img {
  max-width: 274px;
  height: 100%;
  object-fit: cover;
}
.mobile-big-post-img {
  max-width: 100%;
  object-fit: cover;
  aspect-ratio: 16/9 !important;
}
.post-img {
  width: 100px;
  aspect-ratio: 1/1 !important;
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

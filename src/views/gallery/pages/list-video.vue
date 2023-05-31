<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="page-container mx-auto py-12 px-8">
      <div class="text-center">
        <div class="text-dp-md font-weight-semibold">Thư viện Video</div>
        <div class="text-lg mt-2">
          Giải đáp các thắc mắc thường gặp của người dân
        </div>
      </div>

      <div
        class="card-shadow border-radius-16 overflow-hidden white-bg mt-12 pa-6 text-center"
      >
        <div class="text-dp-xs font-weight-semibold">Video nổi bật</div>
        <div
          class="mt-4 d-flex flex-column align-center justify-center border-radius-8 overflow-hidden mx-8"
        >
          <video
            width="100%"
            :src="galleryStore.newestPost.videoContent"
            controls
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          class="text-xl font-weight-semibold neutral60--text mt-6 px-8 cursor-pointer"
          @click="$router.push('/thu-vien-video/' + galleryStore.newestPost.id)"
        >
          {{ galleryStore.newestPost.title }}
        </div>
      </div>

      <v-divider class="mt-8"></v-divider>

      <div
        class="d-flex align-center justify-space-between my-8"
        :class="{
          'flex-column align-center gap-16': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div class="text-xl font-weight-semibold">Video mới</div>

        <div class="d-flex align-center gap-8">
          <div
            class="d-inline-flex align-center neutral20-border border-radius-8 overflow-hidden"
          >
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: isGrid }"
              @click="isGrid = true"
            >
              <v-icon small :dark="isGrid">mdi-grid</v-icon>
            </div>
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: !isGrid }"
              @click="isGrid = false"
            >
              <v-icon small :dark="!isGrid">mdi-view-list</v-icon>
            </div>
          </div>
          <v-select
            class="border-radius-8 full-width"
            height="42px"
            placeholder="Sắp xếp"
            item-text="name"
            item-value="value"
            v-model="galleryStore.sortBy"
            :items="galleryStore.sortSelection"
            :class="{ 'sort-select': $vuetify.breakpoint.mdAndUp }"
            :menu-props="{ maxHeight: '400' }"
            flat
            solo
            outlined
            dense
            hide-details
          ></v-select>
        </div>
      </div>

      <div v-if="galleryStore.slicedPosts.length > 0 && isGrid" class="mt-3">
        <v-row>
          <v-col
            class="align-self-scretch"
            v-for="post in galleryStore.slicedPosts"
            :key="post.id"
            cols="12"
            md="3"
            xl="3"
          >
            <imageCard :post="post" :url="postUrl(post.id)" />
          </v-col>
        </v-row>

        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="galleryStore.totalPostPage"
            v-model="galleryStore.postPage"
          ></v-pagination>
        </div>
      </div>

      <div
        v-else-if="galleryStore.slicedPosts.length > 0 && !isGrid"
        class="mt-3"
      >
        <div
          v-for="(post, index) in galleryStore.slicedPosts"
          :key="post.id"
          :class="{ 'mt-6': index != 0 }"
        >
          <imageRow :post="post" :url="postUrl(post.id)" />
          <v-divider
            v-if="index != galleryStore.slicedPosts.length - 1"
            class="mt-4"
          ></v-divider>
        </div>
        <div class="mt-4">
          <v-pagination
            color="primary"
            :length="galleryStore.totalPostPage"
            v-model="galleryStore.postPage"
          ></v-pagination>
        </div>
      </div>

      <div
        class="font-weight-bold text-center text-dp-md flex-grow-1 no-item-div d-flex flex-column justify-center"
        v-else
      >
        Không có bài viết nào!
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { galleryStore } from "../stores/galleryStore";
export default {
  computed: {
    ...mapStores(galleryStore),
    // newestPostTitle() {
    //   return get(newStore.newestPost, "title", "Tiêu đề");
    // },
  },
  components: {
    // NewCard: () => import("../components/news-card.vue"),
    imageRow: () => import("../components/image-row.vue"),
    imageCard: () => import("../components/image-card.vue"),
  },
  data() {
    return {
      currentTab: 0,
      isGrid: true,
    };
  },
  async created() {
    await this.galleryStore.fetchPosts({
      filters: {
        postCategory: 5,
      },
    });
  },
  methods: {
    setCurrentTab(index) {
      this.newStore.currentTab = index;
    },
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
    postUrl(id) {
      if (!id) return;
      return "/thu-vien-video/" + id;
    },
  },
};
</script>

<style scoped>
.active {
  color: white !important;
  background-color: var(--v-primary50-base);
}
.card {
  width: 470px;
  height: 320px;
}
.page-container {
  max-width: 1500px;
}
.image-gradient {
  position: absolute;
  bottom: 0;
}
.big-post-img {
  max-width: 274px;
  height: 100%;
  object-fit: cover;
}
.post-img {
  width: 180px;
  aspect-ratio: 16/9 !important;
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
.big-image {
  height: 310px;
}
</style>

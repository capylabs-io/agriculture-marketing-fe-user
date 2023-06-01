<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="page-container mx-auto py-12 px-8">
      <div class="text-center">
        <div class="text-dp-md font-weight-semibold">Thư viện Ảnh</div>
        <div class="text-lg mt-2">
          Tổng hợp hình ảnh của các sự kiện mới nhất
        </div>
      </div>
      <div class="mt-13">
        <v-row>
          <v-col class="align-self-scretch" cols="12" md="7">
            <div
              class="text-xl font-weight-semibold"
              :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
            >
              Ảnh nổi bật
            </div>
            <div
              class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer d-flex flex-column mt-4"
              @click="goToPost(galleryStore.newestPost.id)"
            >
              <img
                class="big-post-img full-width"
                :aspect-ratio="1 / 1"
                :src="productImage(galleryStore.newestPost.images)"
                cover
              />
              <div class="pa-5 d-flex flex-column full-height">
                <div class="text-sm font-weight-medium neutral40--text">
                  {{ galleryStore.newestPost.createdAt | ddmmyyyy }}
                </div>
                <v-clamp
                  class="font-weight-semibold mt-2 text-xl"
                  :max-lines="3"
                >
                  {{ galleryStore.newestPost.title }}</v-clamp
                >
                <div class="text-sm mt-2">
                  {{ galleryStore.newestPost.author }}
                </div>
              </div>
            </div>
          </v-col>
          <v-col
            class="d-flex flex-column gap-16"
            cols="12"
            md="5"
            v-if="$vuetify.breakpoint.mdAndUp"
          >
            <div class="text-xl font-weight-semibold">Ảnh được xem nhiều</div>
            <div
              v-for="post in galleryStore.otherPosts"
              class="d-flex cursor-pointer flex-grow-1"
              @click="goToPost(post.id)"
              :key="post.id"
            >
              <img class="border-radius-16 post-img" :src="post.images" />
              <div class="ml-4">
                <v-clamp class="font-weight-semibold text-md" :max-lines="2">{{
                  stripHtml(post.title)
                }}</v-clamp>
                <div class="text-sm mt-1 neutral70--text">
                  <v-icon small class="mr-1">mdi-camera </v-icon
                  >{{ post.author }}
                </div>
                <div class="text-sm mt-1 neutral70--text">
                  <v-icon small class="mr-1">mdi-clock-outline </v-icon
                  >{{ post.createdAt | ddmmyyyy }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-divider class="mt-8"></v-divider>

      <div
        class="d-flex align-center justify-space-between my-8"
        :class="{
          'flex-column align-center gap-16': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div class="text-xl font-weight-semibold">Ảnh mới</div>

        <div
          class="d-flex align-center gap-8"
          :class="{ 'full-width': $vuetify.breakpoint.smAndDown }"
        >
          <div
            class="d-inline-flex align-center neutral20-border border-radius-8 overflow-hidden"
            v-if="!$vuetify.breakpoint.smAndDown"
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
import VClamp from "vue-clamp";
export default {
  computed: {
    ...mapStores(galleryStore),
    // newestPostTitle() {
    //   return get(galleryStore.newestPost, "title", "Tiêu đề");
    // },
  },
  components: {
    // NewCard: () => import("../components/news-card.vue"),
    imageRow: () => import("../components/image-row.vue"),
    imageCard: () => import("../components/image-card.vue"),
    VClamp,
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
        postCategory: 4,
      },
    });
  },
  methods: {
    setCurrentTab(index) {
      this.galleryStore.currentTab = index;
    },
    productImage(image) {
      if (!image) return require("@/assets/no-image.png");
      return image;
    },
    goToPost(id) {
      if (!id) return;
      this.$router.push("/thu-vien-anh/" + id);
    },
    postUrl(id) {
      if (!id) return;
      return "/thu-vien-anh/" + id;
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
.active {
  color: white !important;
  background-color: var(--v-primary50-base);
}
.card {
  width: 470px;
  height: 320px;
}
.page-container {
  max-width: 1400px;
}
.image-gradient {
  position: absolute;
  bottom: 0;
}
.big-post-img {
  height: 320px;
  object-fit: cover;
}
.post-img {
  width: 180px;
  aspect-ratio: 16/9 !important;
  object-fit: cover !important;
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

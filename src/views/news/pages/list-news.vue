<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="page-container mx-auto py-12 px-8">
      <div class="text-center">
        <div class="text-dp-md font-weight-semibold text-uppercase">
          Tin tức
        </div>
        <div class="text-md mt-2">
          Nơi cung cấp các thông tin, kiến thức, kinh nghiệm mới nhất
        </div>
      </div>

      <div class="mt-12">
        <v-row>
          <v-col class="align-self-scretch" cols="12" md="7">
            <div
              class="d-flex border-radius-16 cursor-pointer big-post overflow-hidden full-height"
              @click="goToPost(newStore.newestPost.id)"
            >
              <img
                class="big-post-img full-height"
                :src="productImage(newStore.newestPost.images)"
              />
              <div class="pa-4">
                <div class="primary--text font-weight-semibold">
                  {{ newStore.newestPost.newsCategory.name }}
                </div>
                <v-clamp
                  class="font-weight-semibold text-dp-xs mt-2"
                  :max-lines="4"
                  >{{ stripHtml(newStore.newestPost.title) }}</v-clamp
                >
                <v-clamp class="mt-3" :max-lines="6">{{
                  stripHtml(newStore.newestPost.content)
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
              v-for="post in newStore.otherPosts"
              class="d-flex cursor-pointer"
              :key="post.id"
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
                  {{ post.newsCategory.name }}
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
              v-for="(post, i) in newStore.otherPosts"
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
                <div class="primary--text font-weight-semibold mt-1">
                  {{ post.newsCategory.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-divider class="mt-8"></v-divider>

      <div
        class="d-flex align-center justify-space-between my-8"
        :class="{
          'flex-column align-center gap-16': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div
          class="d-inline-flex align-center neutral20-border border-radius-8 overflow-hidden"
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          <div
            class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
            :class="{ active: newStore.category == 'all' }"
            @click="newStore.category = 'all'"
          >
            Tất cả
          </div>
          <div
            class="d-flex"
            v-for="category in newStore.categories"
            :key="category.id"
          >
            <v-divider vertical></v-divider>
            <div
              class="cursor-pointer px-4 py-2 neutral80--text font-weight-medium"
              :class="{ active: newStore.category == category.id }"
              @click="newStore.category = category.id"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
        <v-select
          class="border-radius-8 full-width"
          placeholder="Chọn danh mục"
          v-model="newStore.category"
          item-text="name"
          item-value="id"
          :class="{ 'sort-select': $vuetify.breakpoint.mdAndUp }"
          :items="newStore.categories"
          v-else
          flat
          solo
          outlined
          dense
          hide-details
          clearable
        ></v-select>
        <!-- <v-text-field
          v-model="newStore.searchKey"
          class="border-radius-6 border-neutral20 full-width"
          placeholder="Tìm kiếm từ khóa"
          prepend-inner-icon="mdi-magnify"
          :class="{ 'search-field': $vuetify.breakpoint.mdAndUp }"
          flat
          solo
          outlined
          dense
          hide-details
          clearable
        ></v-text-field> -->
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
            v-model="newStore.sortBy"
            item-text="name"
            item-value="value"
            :class="{ 'sort-select': $vuetify.breakpoint.mdAndUp }"
            :items="newStore.sortSelection"
            :menu-props="{ maxHeight: '400' }"
            flat
            solo
            outlined
            dense
            hide-details
          ></v-select>
        </div>
      </div>

      <div v-if="newStore.slicedlistNew.length > 0 && isGrid">
        <v-row>
          <v-col
            class="align-self-scretch"
            v-for="obj in newStore.slicedlistNew"
            :key="obj.id"
            cols="12"
            md="4"
            xl="4"
          >
            <NewCard :post="obj"> </NewCard>
          </v-col>
        </v-row>

        <div class="mt-4 mb-16">
          <v-pagination
            color="primary"
            :length="newStore.totalnewsPage"
            v-model="newStore.newsPage"
          ></v-pagination>
        </div>
      </div>

      <div v-else-if="newStore.slicedlistNew.length > 0 && !isGrid">
        <div
          v-for="(post, index) in newStore.slicedlistNew"
          :key="post.id"
          :class="{ 'mt-6': index != 0 }"
        >
          <NewRow :post="post" />
          <v-divider
            v-if="index != newStore.slicedlistNew.length - 1"
            class="mt-6"
          ></v-divider>
        </div>
        <div class="mt-4 mb-16">
          <v-pagination
            color="primary"
            :length="newStore.totalnewsPage"
            v-model="newStore.newsPage"
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
import { newStore } from "../stores/newStore";
import { get } from "lodash";
import VClamp from "vue-clamp";
export default {
  computed: {
    ...mapStores(newStore),
    newestPostTitle() {
      return get(newStore.newestPost, "title", "Tiêu đề");
    },
  },
  components: {
    NewCard: () => import("../components/news-card.vue"),
    NewRow: () => import("../components/news-row.vue"),
    VClamp,
  },
  data() {
    return {
      currentTab: 0,
      isGrid: false,
    };
  },
  async created() {
    this.newStore.currentTab = 0;
    await Promise.all([
      this.newStore.fetchCategories(),
      this.newStore.fetchlistNew(),
    ]);
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
.big-post {
  background-color: var(--v-primary5-base) !important;
}
.big-post-img {
  max-width: 274px;
  height: 100%;
  object-fit: cover;
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

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="page-container mx-auto py-12 px-8">
      <div class="text-center">
        <div class="text-dp-md font-weight-semibold">Thư viện ảnh, video</div>
        <div class="text-lg mt-2">
          Giải đáp các thắc mắc thường gặp của người dân
        </div>
      </div>
      <div class="mt-13">
        <v-row>
          <v-col cols="12" md="7">
            <div class="text-xl font-weight-semibold">Ảnh nổi bật</div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="text-xl font-weight-semibold">Ảnh được xem nhiều</div>
          </v-col>
        </v-row>
      </div>
      <div class="mt-3">
        <v-row>
          <v-col class="align-self-scretch" cols="12" md="7">
            <div
              class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer neutral20-border full-height d-flex flex-column"
            >
              <v-img
                :src="require('@/assets/gallery-image.png')"
                :aspect-ratio="22 / 9"
                cover
              ></v-img>
              <div class="pa-5 d-flex flex-column full-height">
                <div class="d-flex align-center justify-space-between">
                  <div class="text-md font-weight-medium neutral40--text">
                    Eventname
                  </div>
                </div>
                <v-clamp class="font-weight-bold mt-2 text-md" :max-lines="2">
                  Hội thảo chuyên sâu về phát triển công nghệ cho miệt vườn vùng
                  Tây Nam Bộ</v-clamp
                >
                <div class="text-sm font-weight-medium neutral40--text mt-2">
                  12/08/2023
                </div>
              </div>
            </div>
          </v-col>
          <v-col
            class="d-flex flex-column justify-space-between gap-16 align-self-scretch"
            cols="12"
            md="5"
            v-if="$vuetify.breakpoint.mdAndUp"
          >
            <div
              v-for="post in otherPosts"
              class="d-flex cursor-pointer align-self-scretch"
              :key="post.id"
            >
              <div>
                <img
                  class="border-radius-16 post-img"
                  :src="post.images"
                  cover
                />
              </div>
              <div class="ml-4">
                <v-clamp class="font-weight-semibold text-md" :max-lines="3">{{
                  stripHtml(post.title)
                }}</v-clamp>
                <div class="text-sm mt-1 neutral70--text">
                  <v-icon small class="mr-1">mdi-camera </v-icon
                  >{{ stripHtml(post.name) }}
                </div>
                <div class="text-sm mt-1 neutral70--text">
                  <v-icon small class="mr-1">mdi-clock-outline </v-icon
                  >{{ stripHtml(post.date) }}
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
        <!-- <div
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
        ></v-select> -->
        <div class="text-xl font-weight-semibold">Ảnh mới</div>

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

      <div v-if="isGrid" class="mt-3">
        <v-row>
          <v-col
            class="align-self-scretch"
            v-for="obj in 8"
            :key="obj.id"
            cols="12"
            md="3"
            xl="3"
          >
            <imageCard />
          </v-col>
        </v-row>

        <div class="mt-4 mb-16">
          <v-pagination color="primary" :length="2"></v-pagination>
        </div>
      </div>

      <div v-else-if="!isGrid" class="mt-3">
        <div
          v-for="(post, index) in 8"
          :key="post.id"
          :class="{ 'mt-6': index != 0 }"
        >
          <imageRow />
          <v-divider
            v-if="index != otherPosts.length - 1"
            class="mt-6"
          ></v-divider>
        </div>
        <div class="mt-4 mb-16">
          <v-pagination color="primary" :length="2"></v-pagination>
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
// import { mapStores } from "pinia";
// import { newStore } from "../stores/newStore";
// import { get } from "lodash";
import VClamp from "vue-clamp";
export default {
  computed: {
    // ...mapStores(newStore),
    // newestPostTitle() {
    //   return get(newStore.newestPost, "title", "Tiêu đề");
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
      otherPosts: [
        {
          id: 1,
          images:
            "https://agriculture-marketing.s3.amazonaws.com/Vuon_cay_di_san_cua_ong_vua_cay_canh_Viet_Nam_dai_gia_Trung_Quoc_tra_hon_500_ty_khong_ban_9_1610763158_959_width660height440_a90a5b27a6.jpg",
          name: "Mạc Linh Chi",
          title: "Hội thảo phát triển hoa cây cảnh - ngành kinh tế sinh thái",
          date: "11/10/2023",
        },
        {
          id: 2,
          images:
            "https://agriculture-marketing.s3.amazonaws.com/Vuon_cay_di_san_cua_ong_vua_cay_canh_Viet_Nam_dai_gia_Trung_Quoc_tra_hon_500_ty_khong_ban_9_1610763158_959_width660height440_a90a5b27a6.jpg",
          name: "Mạc Linh Chi",
          title: "Hội thảo phát triển hoa cây cảnh - ngành kinh tế sinh thái",

          date: "11/10/2023",
        },
        {
          id: 3,
          images:
            "https://agriculture-marketing.s3.amazonaws.com/Vuon_cay_di_san_cua_ong_vua_cay_canh_Viet_Nam_dai_gia_Trung_Quoc_tra_hon_500_ty_khong_ban_9_1610763158_959_width660height440_a90a5b27a6.jpg",
          name: "Mạc Linh Chi",
          title: "Hội thảo phát triển hoa cây cảnh - ngành kinh tế sinh thái",
          date: "11/10/2023",
        },
        {
          id: 4,
          images:
            "https://agriculture-marketing.s3.amazonaws.com/Vuon_cay_di_san_cua_ong_vua_cay_canh_Viet_Nam_dai_gia_Trung_Quoc_tra_hon_500_ty_khong_ban_9_1610763158_959_width660height440_a90a5b27a6.jpg",
          name: "Mạc Linh Chi",
          title: "Hội thảo phát triển hoa cây cảnh - ngành kinh tế sinh thái",
          date: "11/10/2023",
        },
      ],
    };
  },
  async created() {
    // this.newStore.currentTab = 0;
    // await Promise.all([
    //   this.newStore.fetchCategories(),
    //   this.newStore.fetchlistNew(),
    // ]);
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

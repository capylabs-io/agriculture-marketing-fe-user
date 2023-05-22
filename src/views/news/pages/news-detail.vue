<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-img
      max-width="100%"
      max-height="560px"
      :src="postImage"
      :aspect-ratio="16 / 9"
    ></v-img>
    <div class="mt-8 content-container mx-auto px-6">
      <div class="d-flex align-center justify-space-between mt-6">
        <div class="d-flex align-center">
          <v-img
            class="avatar-img"
            :src="
              newStore.news.avatar
                ? newStore.news.avatar
                : require(`@/assets/components/landing/profile.webp`)
            "
          />
          <div class="ml-4">
            <div class="font-weight-bold text-sm neutral100--text text-none">
              {{ newStore.news.author }}
            </div>
            <div class="text-caption neutral70--text mt-1">
              {{ newStore.news.createdAt | ddmmyyyy }}
            </div>
          </div>
        </div>
        <div class="text-sm font-weight-medium title">
          {{ newStore.news.newsCategory }}
        </div>
      </div>
      <div class="tex-left mt-7">
        <div
          class="font-weight-semibold"
          :class="$vuetify.breakpoint.mdAndUp ? 'text-dp-lg ' : 'text-dp-sm'"
        >
          {{ newStore.news.title }}
        </div>
        <div class="mt-8">
          <div v-html="newStore.news.content" />
        </div>
      </div>
      <v-divider class="mt-16"></v-divider>
    </div>
    <div class="page-container mx-auto pb-16 mt-12 page-container px-6">
      <v-row>
        <v-col cols="12" class="d-flex justify-space-between">
          <div class="text-dp-md font-weight-semibold">Tin mới</div>

          <v-btn
            class="neutral20-border border-radius-8 text-none text-capitalize px-3 py-5"
            @click="gotoListNews()"
            depressed
            >Xem tất cả</v-btn
          >
        </v-col>
      </v-row>
      <div class="text-lg neutral80--text my-6">
        Cập nhật tất cả những thông tin mới nhất về cây cảnh
      </div>
      <v-row>
        <v-col
          v-for="obj in newStore.listNew"
          :key="obj.id"
          cols="12"
          md="4"
          xl="4"
        >
          <NewCard :post="obj"> </NewCard>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { newStore } from "../stores/newStore";
export default {
  computed: {
    ...mapStores(newStore),
    postImage() {
      if (!this.newStore.news || !this.newStore.news.images)
        return require("@/assets/no-image.png");
      return this.newStore.news.images;
    },
  },
  components: {
    NewCard: () => import("../components/news-card.vue"),
  },
  data() {
    return {
      sort: [
        {
          value: "asc",
          name: "Gần nhất",
        },
        {
          value: "desc",
          name: "Cũ nhất",
        },
      ],
    };
  },
  watch: {
    "$route.params.code": {
      async handler() {
        await this.loadDetail();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    gotoListNews() {
      this.$router.push(`/news`);
    },
    async loadDetail() {
      const code = this.$route.params.code;
      await this.newStore.fetchnews(code);
      await this.newStore.fetchlistNew({
        pagination: {
          page: 1,
          pageSize: 3,
        },
      });
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
.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 100px !important;
}
.content-container {
  max-width: 1080px;
}
.title {
  color: var(--v-green70-base);
}
</style>

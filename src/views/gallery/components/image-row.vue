<template>
  <v-row>
    <v-col class="d-flex full-width" cols="12" md="12">
      <img
        class="post-img border-radius-8 cursor-pointer"
        :src="require('@/assets/gallery-image.png')"
      />
      <div class="ml-6 cursor-pointer">
        <v-clamp class="font-weight-semibold text-lg" :max-lines="1"
          >Khai mạc Hội nghị Pháp quy hạt nhân toàn quốc lần thứ V</v-clamp
        >
        <v-clamp class="text-sm mt-3" :max-lines="3"
          >Tham dự Hội nghị, về phía Bộ KHCN có: ông Huỳnh Thành Đạt, Uỷ viên
          Ban Chấp hành Trung ương Đảng, Bộ trưởng Bộ KHCN; ông Lê Xuân Định, Bí
          thư Đảng uỷ, Thứ trưởng Bộ KHCN; ông Phạm Gia Chương, Phó Bí thư Đảng
          uỷ Bộ KHCN; đại diện lãnh đạo một số đơn vị trực thuộc Bộ KHCN. Về
          phía tỉnh Lạng Sơn có: ông Hồ Tiến Thiệu, Phó Bí thư Tỉnh ủy, Chủ tịch
          UBND tỉnh Lạng Sơn; bà Nguyễn Thị Hà, Giám đốc Sở KHCN Lạng Sơn. Khách
          mời tham dự Hội nghị có: Thiếu tướng Phạm Văn Tỵ, Phó Chánh Văn phòng
          Uỷ ban Quốc gia Ứng phó sự cố, thiên tai và Tìm kiếm cứu nạn, Phó Cục
          trưởng Cục Cứu hộ - Cứu nạn, Bộ Quốc phòng; đại tá Phạm Xuân Hưng, Phó
          Tư lệnh Binh chủng Hoá học, Bộ Quốc phòng; PGS.TS. Vương Hữu Tấn, Chủ
          tịch Hội năng lượng nguyên tử Việt Nam.</v-clamp
        >
        <div class="d-flex justify-space-between align-center mt-3 text-sm">
          <div class="text-sm mt-1 neutral70--text">
            <v-icon small class="mr-1">mdi-camera </v-icon>Mạc Linh Chi
          </div>
          <div class="text-sm mt-1 neutral70--text">
            <v-icon small class="mr-1">mdi-clock-outline </v-icon>11/10/2023
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
  width: 232px !important;
  aspect-ratio: 16 / 9 !important;
  object-fit: cover;
}
.title {
  color: var(--v-green70-base);
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-img
      max-width="100%"
      max-height="560px"
      :src="postImage"
      :aspect-ratio="16 / 9"
    ></v-img>
    <div class="mt-8 content-container mx-auto">
      <div class="d-flex align-center justify-space-between mt-6">
        <div class="d-flex align-center">
          <v-img
            class="avatar-img"
            :src="require(`@/assets/components/landing/profile.webp`)"
          />
          <div class="ml-4">
            <div
              class="font-weight-bold text-sm neutral100--text text-capitalize"
            >
              Phùng Thanh Độ
            </div>
            <div class="text-caption neutral70--text">
              {{ newStore.news.createdAt | ddmmyyyyhhmmss }}
            </div>
          </div>
        </div>
        <div class="text-sm font-weight-medium title">
          {{ newStore.news.newsCategory.name }}
        </div>
      </div>
      <div class="tex-left mt-7">
        <div class="text-dp-lg font-weight-semibold">
          {{ newStore.news.title }}
        </div>
        <div class="mt-8">
          <div v-html="newStore.news.content" />
          <!-- <p class="text-dp-sm font-weight-semibold">
            Đặc điểm của cây Cau Cảnh
          </p>
          <div class="text-lg neutral80--text">
           {{newStore.news.content}}
          </div> -->
          <!-- <p class="text-dp-sm font-weight-semibold">
            Cách trồng Cau Cảnh tại nhà
          </p>
          <div class="text-lg neutral80--text">
            <p>
              Được nhận định là loài cây dễ sinh trưởng và phát triển. Vì vậy
              việc trồng và chăm sóc cây Cau Cảnh khá đơn giản. Tuy nhiên, cũng
              cần lưu ý một vài vấn đề dưới đây trước khi trồng để cây được khỏe
              mạnh và tạo cảnh quan đẹp mắt.
            </p>
            <p>
              - Nhân giống: Cau Cảnh có thể trồng bằng hạt. Quả Cau khi khô lại
              có thể gieo vào trong đất ẩm, đặt ở nơi khô thoáng là có thể mọc
              mầm và lên cây no. Tuy nhiên, để nảy mầm và phát triển thành cây
              con sẽ mất rất nhiều thời gian.
            </p>
            <p>
              - Đất trồng: Cây Cau Cảnh thích hợp với những loại đất tơi xốp,
              thoát nước tốt và chứa nhiều chất mùn. Thường thì sẽ sử dụng hỗn
              hợp gồm 4 phần đất mục, 2 phần đất hữu cơ, 1 phần cát đã được phân
              hủy. Lưu ý những loại đất như đất phèn, đất sét, đất pha đều không
              phù hợp với loại cây này. Nếu trồng cây trong chậu thì trung bình
              từ 4-6 tháng thay đất một lần và bón thêm các loại phân hữu cơ
              hoặc NPK để cây phát triển tốt hơn.
            </p>
          </div>
          <p class="text-dp-sm font-weight-semibold">
            Cách trồng Cau Cảnh tại nhà
          </p>
          <div class="text-lg neutral80--text">
            <p>
              Cau cảnh có sức sống vô cùng mãnh liệt, bền bỉ, dễ thích nghi nên
              rất dễ chăm sóc. Tuy nhiên, để cây có thể phát triển tươi tốt bạn
              cần chú ý những vấn đề dưới đây:
            </p>
            <p>
              - Ánh sáng: Để cây luôn có màu lá tươi, giàu sức sống bạn nên đặt
              cây ở những nơi có đủ ánh sáng cần thiết. Nếu đặt cây ở những vị
              trí nắng gay gắt sẽ làm cây dễ bị vàng lá, khô héo và chết dần.
            </p>
            <p>
              - Tưới nước: Cây Cau Cảnh là loại ưa ẩm, cần nhiều nước nhưng
              không ưa ngập úng. Do đó bạn cần chú ý lượng nước khi tưới cây.
              Chỉ nên cung cấp lượng nước vừa đủ để làm ướt đất.
            </p>
            <p>
              Nhiệt độ: Cây sinh trưởng và phát triển tốt nhất trong 18-23°C.
              Mức nhiệt thấp nhất mà cây có thể chịu được là 10°C. Nếu dưới
              nhiệt độ này cây sẽ chậm phát triển và chết.
            </p>
            <p>
              Sâu bệnh: Cây thường gặp phải các loại sâu bệnh có hại như nấm,
              rệp lá, hay sâu bọ trú ngụ. Do đó, cần kiểm tra thường xuyên cây
              trồng, cắt bỏ lá khô hay vàng úa và có thể phun thuốc trừ sâu
              trong trường hợp cần thiết.
            </p>
          </div> -->
        </div>
      </div>
      <v-divider class="mt-16"></v-divider>
    </div>
    <div class="page-container mx-auto mb-16 mt-16">
      <v-row class="mt-16">
        <v-col cols="12" class="d-flex justify-space-between">
          <div class="text-dp-md font-weight-semibold">Tin mới</div>

          <v-btn
            class="neutral20-border border-radius-8 text-none text-capitalize px-3 py-5"
            depressed
            >Xem tất cả</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-lg neutral80--text">
            Cập nhật tất cả những thông tin mới nhất về cây cảnh
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="obj in newStore.slicedlistNew"
          :key="obj.id"
          cols="12"
          md="4"
          xl="4"
        >
          <NewCard class="card mx-auto" :post="obj"> </NewCard>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col
          v-for="obj in newStore.newPosts"
          :key="obj.id"
          cols="12"
          md="4"
          xl="4"
        >
          <NewCard class="card mx-auto" :post="obj"> </NewCard>
        </v-col>
      </v-row> -->
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
      currentTab: 0,
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
  async created() {
    const code = this.$route.params.code;
    await this.newStore.fetchnews(code);
    await this.newStore.fetchlistNew();
    // await this.newStore.top3NewPost();
    console.log("data", this.newStore.newPosts);
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
.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 100px !important;
}
.content-container {
  max-width: 900px;
}
.title {
  color: var(--v-green70-base);
}
</style>

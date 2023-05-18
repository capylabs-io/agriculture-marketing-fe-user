<template>
  <div class="expert-section">
    <div class="page-container mx-auto py-16 px-6">
      <div
        class="font-weight-semibold text-dp-md text-center"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        Chuyên Gia
      </div>
      <div class="mt-12">
        <!-- <v-slide-group
          :max="4"
          show-arrows="always"
          prev-icon="mdi-arrow-left"
          next-icon="mdi-arrow-right"
          center-active
        >
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
          <v-slide-group-item>
            <ExpertCard />
          </v-slide-group-item>
        </v-slide-group> -->

        <v-row>
          <v-col
            cols="12"
            md="3"
            v-for="(expert, i) in experts"
            :key="expert.name"
            data-aos="fade-up"
            data-aos-duration="600"
            :data-aos-delay="300 * i"
          >
            <ExpertCard :expert="expert" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ExpertCard: () => import("./expert-card.vue"),
  },
  data() {
    return {
      experts: [
        {
          name: "Mai Hồng Hạnh",
          title: "Tiến sĩ Nông nghiệp quốc gia",
          phone: "0342371435",
          avatar: require("@/assets/components/landing/avatar.png"),
        },
        {
          name: "Hoàng Bửu Phát",
          title: "Giám đốc Hiệp hội cây cảnh Việt Nam",
          phone: "0274562213",
          avatar: require("@/assets/components/landing/avatar2.png"),
        },
        {
          name: "Nguyễn Linh Trương",
          title: "Chủ tịch Hiệp hội bảo toàn Cây và Hoa",
          phone: "0253782234",
          avatar: require("@/assets/components/landing/avatar3.png"),
        },
        {
          name: "Phùng Thanh Độ",
          title: "Chuyên viên kiểm định",
          phone: "0931382179",
          avatar: require("@/assets/components/landing/image-3.webp"),
        },
      ],
    };
  },
};
</script>

<style scoped>
.expert-section {
  background: url("@/assets/components/landing/section5-bg.png");
  background-position: right center;
  background-size: cover;
  min-height: 640px;
}
</style>

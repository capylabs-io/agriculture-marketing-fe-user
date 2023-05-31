<template>
  <div class="page-container mx-auto px-6 mb-16 mt-8">
    <div class="d-flex align-center justify-space-between">
      <div
        class="font-weight-semibold text-dp-sm"
        :class="{ 'text-center': $vuetify.breakpoint.mdAndUp }"
      >
        Nghệ nhân, chuyên gia
      </div>
      <v-btn
        class="text-none text-md primary--text px-0"
        text
        @click="$router.push('/hop-tac-xa')"
        >Xem thêm <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <v-row class="mt-8" data-aos="fade-up" data-aos-duration="800">
      <v-col
        cols="12"
        md="3"
        sm="6"
        xs="12"
        v-for="expert in experts"
        :key="expert.name"
      >
        <ExpertCard :expert="expert" />
      </v-col>
    </v-row>
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

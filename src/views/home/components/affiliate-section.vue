<template>
  <div class="affiliate-section">
    <div class="page-container mx-auto px-6 py-16">
      <div class="font-weight-semibold text-dp-sm text-center">Liên kết</div>
      <div class="mt-16">
        <vueper-slides
          class="no-shadow"
          slide-multiple
          arrows-outside
          bullets-outside
          fixed-height="100px"
          :bullets="false"
          :visible-slides="8"
          :slide-ratio="1 / 1"
          :breakpoints="breakpoints"
        >
          <vueper-slide
            class="partner-slide"
            v-for="(partner, i) in partners"
            :key="i"
          >
            <template #content>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    class="partner-logo"
                    :src="partner.logo"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>{{ partner.title }}</span>
              </v-tooltip>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      partners: [
        {
          logo: require("@/assets/components/home/logos/Logo.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-1.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-2.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-3.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-4.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-5.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-6.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-1.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-1.png"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
      ],
      breakpoints: {
        1024: { visibleSlides: 6, slideMultiple: 6 },
        600: { visibleSlides: 2, slideMultiple: 2 },
      },
    };
  },
};
</script>

<style scoped>
.affiliate-section {
  background-color: var(--v-primary10-base);
}
.partner-logo {
  max-width: 100px;
  max-height: 100px;
}
.partner-slide {
  max-height: 100px !important;
}
</style>

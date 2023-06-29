<template>
  <div class="affiliate-section">
    <div class="page-container mx-auto px-6 py-16">
      <div class="font-weight-semibold text-dp-sm text-center">Liên kết</div>
      <div class="mt-16" :class="{ 'px-8': $vuetify.breakpoint.smAndDown }">
        <vueper-slides
          class="no-shadow"
          slide-multiple
          arrows-outside
          bullets-outside
          :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
          :fixed-height="$vuetify.breakpoint.smAndDown ? '120px' : '100px'"
          :bullets="false"
          :visible-slides="8"
          :slide-ratio="1 / 1"
          :breakpoints="breakpoints"
        >
          <vueper-slide v-for="(partner, i) in homeStore.favPartners" :key="i">
            <template #content>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <a :href="partner.webUrl" target="_blank">
                    <img
                      :class="
                        $vuetify.breakpoint.smAndDown
                          ? 'mobile-partner-logo'
                          : 'partner-logo'
                      "
                      :src="partner.partnerUrl"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </a>
                </template>
                <span>{{ partner.name }}</span>
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
import { mapStores } from "pinia";
import { homeStore } from "../store/home-store";
export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  computed: {
    ...mapStores(homeStore),
  },
  data() {
    return {
      partners: [
        {
          logo: require("@/assets/components/home/logos/Logo.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-1.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-2.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-3.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-4.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-5.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-6.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-1.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
        {
          logo: require("@/assets/components/home/logos/Logo-1.webp"),
          link: "https://vnpc.gs1.gov.vn/",
          title:
            "Tổng cục tiêu chuẩn đo lường chất lượng trung tâm mã số, mã vạch Quốc Gia",
        },
      ],
      breakpoints: {
        1024: { visibleSlides: 4, slideMultiple: 4 },
        600: { visibleSlides: 2, slideMultiple: 2 },
        400: { visibleSlides: 1, slideMultiple: 1 },
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
.mobile-partner-logo {
  object-fit: contain;
}
.partner-slide {
  max-height: 100px !important;
}
</style>

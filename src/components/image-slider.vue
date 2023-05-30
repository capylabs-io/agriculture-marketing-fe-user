<template>
  <div>
    <vueper-slides
      ref="vueperslides1"
      @slide="
        $refs.vueperslides2 &&
          $refs.vueperslides2.goToSlide($event.currentSlide.index, {
            emit: false,
          })
      "
      :slide-ratio="1 / 1"
      :bullets="false"
      class="border-radius-16 overflow-hidden no-shadow"
    >
      <template #arrow-left>
        <v-btn class="px-0" color="primary" fab x-small>
          <v-icon size="24">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template #arrow-right>
        <v-btn class="px-0" color="primary" fab x-small>
          <v-icon size="24">mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <vueper-slide
        v-for="(image, index) in images"
        :key="index"
        :image="image"
      />
    </vueper-slides>

    <vueper-slides
      ref="vueperslides2"
      class="no-shadow slides mt-2"
      @slide="
        $refs.vueperslides1 &&
          $refs.vueperslides1.goToSlide($event.currentSlide.index, {
            emit: false,
          })
      "
      :slide-ratio="1 / 1"
      :dragging-distance="50"
      :arrows="false"
      :visible-slides="imagesPerPage"
      :breakpoints="breakpoints"
      :gap="1.5"
      :fixed-height="imagesFixedHeight"
    >
      <vueper-slide
        v-for="(image, index) in images"
        :key="index"
        :image="image"
        :slide-ratio="1 / 1"
        class="border-radius-8 overflow-hidden"
        @click.native="
          $refs.vueperslides2 && $refs.vueperslides2.goToSlide(index)
        "
      >
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  props: {
    images: Array, //String Array includes image urls
    imagesPerPage: {
      type: Number,
      default: 5,
    },
    imagesFixedHeight: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      breakpoints: {
        600: { visibleSlides: 3, slideMultiple: 2 },
      },
    };
  },
};
</script>

<style scoped>
.slides .vueperslide--active {
  border: 2px solid var(--v-primary-base) !important;
}
</style>

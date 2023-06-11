<template>
  <v-row>
    <v-col class="d-flex full-width" cols="12" md="9">
      <img
        class="searchinfo-img border-radius-8 cursor-pointer"
        :src="searchImage"
      />
      <div class="ml-6 cursor-pointer">
        <v-clamp class="font-weight-semibold text-lg" :max-lines="2">{{
          stripHtml(searchinfo.title)
        }}</v-clamp>
        <v-clamp class="text-sm mt-3" :max-lines="3">{{
          stripHtml(searchinfo.content)
        }}</v-clamp>
      </div>
    </v-col>
    <v-col cols="12" md="1"> </v-col>
    <v-col cols="12" md="2">
      <div class="font-weight-medium text-right text-md">
        {{ searchinfo.date | ddmmyyyy }}
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
    searchinfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // ...mapStores(newStore),
    searchImage() {
      if (!this.searchinfo || !this.searchinfo.images)
        return require("@/assets/no-image.webp");
      return this.searchinfo.images;
    },
  },
  methods: {
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
.searchinfo-img {
  width: 232px !important;
  aspect-ratio: 16 / 9 !important;
  object-fit: cover;
}
.title {
  color: var(--v-green70-base);
}
</style>

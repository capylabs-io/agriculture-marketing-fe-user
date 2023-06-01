<template>
  <v-row>
    <v-col class="d-flex full-width" cols="12" md="9">
      <v-icon x-large color="primary">mdi-chat-question-outline</v-icon>
      <!-- <img class="post-img border-radius-8" :src="postImage" /> -->
      <div class="ml-6">
        <v-clamp
          class="font-weight-semibold text-lg text-decoration-underline Blue10--text"
          :max-lines="2"
          >{{ stripHtml(faq.question) }}</v-clamp
        >
        <v-clamp class="text-sm mt-3" :max-lines="4">{{
          stripHtml(faq.anwser)
        }}</v-clamp>
      </div>
    </v-col>
    <v-col cols="12" md="3">
      <div class="text-end text-uppercase text-md">
        {{ faq.createdAt | ddmmyyyy }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { faqStore } from "../stores/faqStore";
import VClamp from "vue-clamp";
export default {
  components: {
    VClamp,
  },
  props: {
    faq: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(faqStore),
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
.faq-img {
  width: 232px !important;
  aspect-ratio: 16 / 9 !important;
  object-fit: cover;
}
.title {
  color: var(--v-green70-base);
}
</style>

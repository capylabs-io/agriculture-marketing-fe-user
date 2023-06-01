<template>
  <v-row>
    <v-col class="d-flex full-width" cols="12" md="9">
      <div class="cursor-pointer" @click="goToNewsDetail()">
        <v-clamp
          class="font-weight-semibold text-lg text-decoration-underline Blue10--text cursor-pointer"
          :max-lines="2"
          >{{ stripHtml(document.field) }}</v-clamp
        >
        <v-clamp class="text-sm mt-3" :max-lines="3">{{
          stripHtml(document.title)
        }}</v-clamp>
        <div class="d-flex justify-space-between align-center mt-3 text-sm">
          <div class="neutral80--text font-weight-medium">
            <v-icon class="mr-1" color="primary" large>mdi-account</v-icon>
            {{ document.issuer }}
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-space-between">
      <div class="text-end text-uppercase text-md">
        {{ document.issueDate | ddmmyyyy }}
      </div>
      <div class="font-weight-medium primary--text text-end">
        {{ document.documentCategory.name }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { documentStore } from "../stores/documentStore";
import VClamp from "vue-clamp";
export default {
  components: {
    VClamp,
  },
  props: {
    document: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(documentStore),
  },
  methods: {
    goToNewsDetail() {
      if (this.document && this.document.id) return;
      this.$router.push(`/tai-lieu/${this.document.id}`);
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
.document-img {
  width: 232px !important;
  aspect-ratio: 16 / 9 !important;
  object-fit: cover;
}
.title {
  color: var(--v-green70-base);
}
</style>

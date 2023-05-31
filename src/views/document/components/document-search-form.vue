<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2 text-left">Lĩnh vực văn bản</div>
        <v-select
          class="border-radius-8"
          v-model="documentStore.filterForm.field"
          :items="documentStore.fieldSelections"
          item-text="id"
          item-value="name"
          placeholder="chọn lĩnh vực"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2 text-left">Loại văn bản</div>
        <v-select
          class="border-radius-8"
          v-model="documentStore.filterForm.documentCategory"
          :items="documentStore.categories"
          item-value="id"
          item-text="name"
          placeholder="chọn loại"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-n5">
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2 text-left">Số ký hiệu</div>
        <v-text-field
          type="text"
          class="border-radius-8"
          placeholder="Nhập mã số "
          v-model="documentStore.filterForm.numberOf"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2 text-left">
          Thời gian ban hành
        </div>
        <RangeDatePicker @change="documentStore.changeDocumentDuration" />
      </v-col>
    </v-row>
    <div class="d-flex align-center justify-start">
      <v-btn
        class="border-radius-6 mt-1 text-none"
        color="primary"
        depressed
        @click="onSearchClick()"
      >
        Áp dụng
      </v-btn>
      <v-btn
        class="border-radius-6 mt-1 ml-2 text-none"
        color="neutral20"
        depressed
        @click="onClearClick()"
      >
        Xóa tìm kiếm
      </v-btn>
    </div>
    <!-- <v-row class="mt-n4">
      <v-col cols="12" md="6">
       
      </v-col>
      <v-col cols="12" md="6"></v-col>
    </v-row> -->
  </v-form>
</template>

<script>
import { mapStores } from "pinia";
import { documentStore } from "../stores/documentStore";
import { rules } from "@/plugins/rules";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    RangeDatePicker: () => import("@/components/RangeDatePicker.vue"),
  },
  computed: {
    ...mapStores(documentStore),
  },
  data() {
    return {
      rules: rules,
    };
  },
  methods: {
    onSearchClick() {
      this.documentStore.fetchDocuments();
    },
    onClearClick() {
      this.documentStore.filterForm = {
        field: "",
        numberOf: "",
        documentCategory: "",
        startDate: "",
        endDate: "",
      };
      this.documentStore.datePicker = [];
    },
  },
};
</script>

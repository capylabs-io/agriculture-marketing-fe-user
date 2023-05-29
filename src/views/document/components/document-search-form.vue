<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2 text-left">Lĩnh vực văn bản</div>
        <v-select
          class="border-radius-8"
          :rules="[$rules.required]"
          item-text="name"
          item-value="id"
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
          :rules="[$rules.required]"
          item-text="name"
          placeholder="chọn loại"
          item-value="id"
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
          :rules="[$rules.required]"
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
        <RangeDatePicker :chosenDate="[]" />
      </v-col>
    </v-row>
    <div class="d-flex align-center justify-start">
      <v-btn class="border-radius-6 mt-1 text-none" color="primary" depressed>
        Áp dụng
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
//   import { postStore } from "../stores/news-store";
//   import { mapStores } from "pinia";
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
    //   ...mapStores(postStore),
  },
  methods: {},
};
</script>

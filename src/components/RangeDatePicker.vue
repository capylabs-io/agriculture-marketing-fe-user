<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="documentStore.datePicker"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="formattedDate"
        background-color="white"
        append-icon="mdi-calendar"
        class="border-radius-8"
        readonly
        outlined
        hide-details
        dense
        placeholder="Chọn khoảng thời gian"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="documentStore.datePicker"
      formatting
      no-title
      scrollable
      range
      color="primary"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Hủy </v-btn>
      <v-btn text color="primary" @click="dateChange"> Xong </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import { mapStores } from "pinia";
import { documentStore } from "@/views/document/stores/documentStore";
import moment from "moment";
export default {
  props: {
    chosenDate: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapStores(documentStore),
    formattedDate() {
      if (
        !this.documentStore.datePicker ||
        this.documentStore.datePicker.length == 0
      )
        return;
      return (
        moment.utc(this.documentStore.datePicker[0]).format("DD/MM/YYYY") +
        "-" +
        moment.utc(this.documentStore.datePicker[1]).format("DD/MM/YYYY")
      );
    },
  },
  data: () => ({
    menu: false,
  }),
  watch: {
    chosenDate: {
      handler(currentDate) {
        if (!currentDate || currentDate.length == 0) return;
        if (currentDate.length == 1)
          this.documentStore.datePicker = [
            moment.now().toISOString().substring(0, 10),
            moment(currentDate[0]).toISOString().substring(0, 10),
          ];
        else
          this.documentStore.datePicker = [
            moment(currentDate[0]).toISOString().substring(0, 10),
            moment(currentDate[1]).toISOString().substring(0, 10),
          ];
      },
      immediate: true,
    },
  },
  methods: {
    dateChange() {
      if (
        moment
          .utc(this.documentStore.datePicker[0], "YYYY-MM-DD")
          .isAfter(moment.utc(this.documentStore.datePicker[1], "YYYY-MM-DD"))
      ) {
        let temp = this.documentStore.datePicker[0];
        this.documentStore.datePicker[0] = this.documentStore.datePicker[1];
        this.documentStore.datePicker[1] = temp;
      }
      this.$refs.menu.save(this.documentStore.datePicker);
      this.$emit("change", [
        moment
          .utc(this.documentStore.datePicker[0], "YYYY-MM-DD")
          .startOf("day")
          .toISOString(),
        moment
          .utc(this.documentStore.datePicker[1], "YYYY-MM-DD")
          .endOf("day")
          .toISOString(),
      ]);
      this.menu = false;
    },
  },
};
</script>

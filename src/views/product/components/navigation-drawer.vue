<template>
  <v-navigation-drawer class="pa-0" max-width="284px" permanent height="1000px">
    <div class="d-flex flex-column full-height overflow-hidden pa-5">
      <div class="d-flex justify-space-between align-center py-3 full-width">
        <div class="text-md">
          <v-icon class="mr-2 mb-1">mdi-filter-variant</v-icon>Bộ lọc
        </div>
        <div class="neutral80--text">Reset filter</div>
      </div>
      <v-divider class="mt-2"></v-divider>

      <div class="d-flex justify-space-between align-center py-4 full-width">
        <v-text-field
          class="border-radius-6 border-neutral20"
          placeholder="Tìm kiếm từ khóa"
          prepend-inner-icon="mdi-magnify"
          flat
          solo
          outlined
          dense
          hide-details
          clearable
        ></v-text-field>
      </div>

      <v-divider class="mt-2"></v-divider>
      <div class="py-2">
        <v-expansion-panels flat accordion>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-md font-weight-bold">
              <div>
                <v-icon class="mr-1">mdi-shape-plus-outline</v-icon>
                Danh mục
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Cây cảnh</div>
                </template>
              </v-checkbox>
              <v-checkbox>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Hoa kiểng</div>
                </template>
              </v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels flat accordion class="mt-4">
          <v-expansion-panel>
            <v-expansion-panel-header class="text-md font-weight-bold">
              <div>
                <v-icon class="mr-1">mdi-shape-plus-outline</v-icon>
                Giá
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Dưới 500k</div>
                </template>
              </v-checkbox>
              <v-checkbox>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">
                    Từ 500k đến 1 triệu
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">
                    Từ 1 triệu đến 5 Triệu
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Từ 5 triệu trở lên</div>
                </template>
              </v-checkbox>
              <v-checkbox>
                <template v-slot:label>
                  <div class="text-sm font-weight-bold">Tuỳ chọn</div>
                </template>
              </v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="mt-4 text-center">
        <v-btn
          class="elevation-0 border-radius-8 text-none btn-text py-5 mx-auto full-width"
          color="black"
          dark
          >Lọc khoảng giá</v-btn
        >
      </div>
      <v-spacer></v-spacer>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {},
  methods: {
    onLogoutClicked() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 18px !important;
}

.active-item {
  background: var(--v-primary40-base) !important;
}
</style>

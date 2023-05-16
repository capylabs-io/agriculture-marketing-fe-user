<template>
  <v-navigation-drawer class="pa-0" max-width="284px" permanent height="1000px">
    <div class="d-flex flex-column full-height overflow-hidden pa-4">
      <div class="d-flex justify-space-between align-center py-3 full-width">
        <div class="text-md">
          <v-icon class="mr-2">mdi-filter-outline</v-icon>Bộ lọc
        </div>
        <div class="neutral80--text">Reset filter</div>
      </div>
      <v-divider class="mt-2"></v-divider>

      <div class="d-flex justify-space-between align-center py-4 full-width">
        <v-text-field
          class="border-radius-6"
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
      <div class="py-6">
        <v-expansion-panels flat accordion mandatory>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-md font-weight-bold"
              >Danh mục</v-expansion-panel-header
            >
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
        <!-- <v-list class="py-0">
          <v-list-item
            class="border-radius-8 py-0 px-2"
            active-class="active-item"
            dense
          >
           
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon> 
            <v-list-item-title class="text-md font-weight-medium"
              >Báo cáo thống kê</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/product"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-pine-tree</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
              >Quản lý sản phẩm</v-list-item-title
            >
          </v-list-item>
        </v-list> -->
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

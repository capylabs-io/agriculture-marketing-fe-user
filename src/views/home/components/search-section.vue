<template>
  <div
    class="search-section d-flex flex-column align-center"
    :class="{ 'py-8': $vuetify.breakpoint.smAndDown }"
  >
    <v-row class="align-scretch full-width page-container mx-auto px-2">
      <v-col
        class="d-flex flex-column justify-center align-center"
        cols="12"
        md="7"
      >
        <div class="full-width" data-aos="fade-right" data-aos-duration="500">
          <div
            class="font-weight-bold text-uppercase"
            :class="$vuetify.breakpoint.smAndDown ? 'text-dp-md' : 'text-dp-lg'"
          >
            Truy xuất nguồn gốc <br v-if="!$vuetify.breakpoint.smAndDown" />
            Cây và hoa cảnh
          </div>
          <div
            class="neutral80--text mt-2"
            :class="$vuetify.breakpoint.smAndDown ? 'text-dp-xs' : 'text-dp-sm'"
          >
            Chính xác, nhanh chóng, thuận lợi
          </div>
          <v-text-field
            class="full-width border-radius-12 mt-8"
            height="56"
            placeholder="Nhập mã truy xuất"
            flat
            solo
            outlined
            hide-details
            block
          >
            <template v-slot:append>
              <div
                class="btn-search d-flex flex-column align-center justify-center mr-n2"
              >
                <v-icon dark>mdi-magnify</v-icon>
              </div>
            </template>
          </v-text-field>
          <v-radio-group
            :row="$vuetify.breakpoint.mdAndUp"
            mandatory
            hide-details
          >
            <v-radio>
              <template v-slot:label>
                <div class="d-flex align-center">
                  <div>Mã truy xuất nguồn gốc sản phẩm</div>
                  <v-icon class="ml-1" color="primary">mdi-qrcode</v-icon>
                </div>
              </template>
            </v-radio>
            <v-radio>
              <template v-slot:label>
                <div class="d-flex align-center">
                  <div>Mã GTIN</div>
                  <v-icon class="ml-1" color="primary">mdi-barcode</v-icon>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </v-col>
      <v-col
        class="d-flex flex-column justify-center align-center"
        cols="12"
        md="5"
        :class="{ 'mt-4': $vuetify.breakpoint.smAndDown }"
      >
        <img
          class="map-img"
          :src="require('@/assets/components/home/map.png')"
        />
      </v-col>
    </v-row>
  </div>
</template>
  
  <script>
export default {};
</script>
  
<style scoped>
.search-section {
  background: url("@/assets/components/home/search-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 640px;
}
.map-img {
  max-width: 420px;
  max-height: 456px;
}

.btn-search {
  width: 48px !important;
  height: 48px !important;
  background-color: var(--v-primary-base);
  border-radius: 10px;
}
</style>
  
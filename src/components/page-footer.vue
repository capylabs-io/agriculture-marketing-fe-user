<template>
  <div class="footer-bg white--text">
    <div class="pt-14 pb-8 border-bottom">
      <div class="text-dp-sm font-weight-semibold text-center">
        Trở thành hội viên ngay
      </div>
      <div class="text-center neutral20--text mt-2">
        Tham gia ngay để hiểu rõ thêm về các lợi ích của nền tảng
      </div>
      <div class="d-flex align-center justify-center mt-6">
        <v-text-field
          class="search-field border-radius-8 mr-2"
          height="36"
          placeholder="Mời bạn nhập email"
          flat
          solo
          outlined
          hide-details
          dense
        >
        </v-text-field>
        <v-btn
          class="text-none text-capitalize border-radius-8 pa-5"
          color="primary"
          elevation="0"
          >Đăng ký</v-btn
        >
      </div>
    </div>
    <div class="d-flex align-start justify-space-between py-8 px-12">
      <div>
        <div class="d-flex">
          <v-img
            :src="require('@/assets/components/home/gov-logo.png')"
            max-height="64px"
            max-width="64px"
          ></v-img>
          <div class="text-uppercase font-weight-bold text-dp-xs ml-4">
            Trung Tâm truy xuất nguồn gốc <br />
            cây và hoa cảnh TỈNH Bến Tre
          </div>
        </div>
        <div class="mt-6">
          <div class="d-flex align-center">
            <v-icon small dark>mdi-office-building</v-icon>
            <div class="text-sm ml-2">
              Số 12 đường B, quận C, Thành phố Bến Tre
            </div>
          </div>
          <div class="d-flex align-center mt-2">
            <v-icon small dark>mdi-phone</v-icon>
            <div class="text-sm ml-2">09xxxxxxxxxxx</div>
          </div>
          <div class="d-flex align-center mt-2">
            <v-icon small dark>mdi-email</v-icon>
            <div class="text-sm ml-2">TTCC.BenTre@gov.vn</div>
          </div>
        </div>
      </div>
      <div class="footer-menu d-flex flex-wrap col-gap-16">
        <router-link
          to="/gioi-thieu"
          class="text-decoration-none align-self-center footer-nav-link"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Giới thiệu
          </div>
        </router-link>
        <router-link
          to="/tin-tuc"
          class="text-decoration-none align-self-center footer-nav-link"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Tin tức
          </div>
        </router-link>
        <router-link
          to="/nghe-nhan"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Nghệ nhân
          </div>
        </router-link>
        <router-link
          to="/hop-tac-xa"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Hợp tác xã
          </div>
        </router-link>
        <router-link
          to="/dai-ly"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Đại lý
          </div>
        </router-link>
        <router-link
          to="/tin-tuc"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Tin tức
          </div>
        </router-link>
        <router-link
          to="/lien-he"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Liên hệ
          </div>
        </router-link>
        <router-link
          to="/thu-vien"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Thư viện ảnh
          </div>
        </router-link>
        <router-link
          to="/tai-lieu"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Tài liệu
          </div>
        </router-link>
        <router-link
          to="/hoi-dap"
          class="text-decoration-none align-self-center footer-nav-link"
          active-class="active"
        >
          <div
            class="text-none white--text text-uppercase font-weight-medium px-3 py-2 text-sm"
          >
            Hỏi đáp
          </div>
        </router-link>
      </div>
    </div>
    <div class="footer-bottom d-flex justify-space-between px-12 align-center">
      <div class="text-xs">
        © Phát triển bởi CapyLabs - Công ty giải pháp phần mềm Dinosys
      </div>
      <div class="d-flex align-center justify-end mr-n2">
        <v-btn class="px-0" large dark icon>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn class="px-0" large dark icon>
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn class="pa-0" large dark icon>
          <v-icon>mdi-linkedin</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-bg {
  background: var(--v-primary90-base) !important;
}
.border-bottom {
  border-bottom: 1px solid var(--v-primary70-base) !important;
}
.footer-menu {
  max-width: 416px;
}
.footer-nav-link {
  flex-basis: 128px !important;
}
.footer-bottom {
  background-color: var(--v-neutral90-base) !important;
}
</style>

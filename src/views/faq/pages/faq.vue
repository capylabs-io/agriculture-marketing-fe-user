<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container mx-auto pt-15 pb-8 px-6">
    <div class="d-fex flex-column justify-center align-center text-center">
      <div class="text-dp-md font-weight-medium">Những câu hỏi thường gặp</div>
      <div class="text-md mt-2">
        Giải đáp các thắc mắc thường gặp của người dân
      </div>
      <div>
        <v-text-field
          class="border-radius-8 border-neutral20 full-width mt-6 search-question mx-auto"
          placeholder="Tìm kiếm theo từ khóa"
          flat
          solo
          outlined
          hide-details
          clearable
        >
          <template v-slot:append>
            <div class="append-btn border-radius-6 pa-3 mr-n2">
              <v-icon dark> mdi-magnify </v-icon>
            </div>
          </template></v-text-field
        >
      </div>
    </div>
    <v-row class="mt-10">
      <v-col cols="12" md="4">
        <div class="d-inline-flex flex-column justify-center">
          <div
            class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6"
            :class="{ active: currentTab == 1 }"
            @click="setCurrentTab(1)"
          >
            Câu hỏi chung
          </div>
          <div
            class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
            :class="{ active: currentTab == 2 }"
            @click="setCurrentTab(2)"
          >
            Câu hỏi về sản phẩm
          </div>
          <div
            class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
            :class="{ active: currentTab == 3 }"
            @click="setCurrentTab(3)"
          >
            Câu hỏi về lợi ích
          </div>
          <div
            class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
            :class="{ active: currentTab == 4 }"
            @click="setCurrentTab(4)"
          >
            Câu hỏi về sản xuất
          </div>
          <div
            class="cursor-pointer pa-2 font-weight-medium text-md border-radius-6 mt-2"
            :class="{ active: currentTab == 5 }"
            @click="setCurrentTab(5)"
          >
            Câu hỏi về hệ thống
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="font-weight-semibold text-lg">
          Làm thế nào để tôi có thể đăng ký tài khoản?
        </div>
        <div class="mt-2 neutral80--text">
          Việc đăng ký tài khoản diễn ra rất đơn giản, người dùng chỉ cần nhấn
          vào phần đăng nhập, lựa chọn loại tài khoản tuỳ thuộc vào hình thức mà
          bạn mong muốn rồi điền đầy đủ thông tin theo form yêu cầu đã định sẵn
        </div>
        <v-divider class="mt-6"></v-divider>
        <div class="font-weight-semibold text-lg mt-6">
          Có bao nhiêu loại tài khoản để đăng ký?
        </div>
        <div class="mt-2 neutral80--text">
          Các dạng tài khoản có thể tham gia hệ thống bao gồm: Hợp tác xã, Nghệ
          nhân, và Đại lý. Mỗi loại tài khoản sẽ có khả năng truy cập vào các
          tính năng khác nhau trên hệ thống
        </div>
        <v-divider class="mt-6"></v-divider>
        <div class="font-weight-semibold text-lg mt-6">
          Tôi phải làm gì nếu tôi bị mất tài khoản?
        </div>
        <div class="mt-2 neutral80--text">
          Nếu vì 1 lí do nào đó mà bạn bị mất tài khoản, bạn có thể liên hệ trực
          tiếp với chúng tôi để được yêu cầu cấp lại tài khoản thông qua phần
          Liên hệ ở trang chủ hoặc truy cập trực tiếp vào phần Quên mật khấu ở
          trang Đăng nhập
        </div>
        <v-divider class="mt-6"></v-divider>
        <div class="font-weight-semibold text-lg mt-6">
          Làm thế nào để tôi có thể đăng ký tài khoản?
        </div>
        <div class="mt-2 neutral80--text">
          Việc đăng ký tài khoản diễn ra rất đơn giản, người dùng chỉ cần nhấn
          vào phần đăng nhập, lựa chọn loại tài khoản tuỳ thuộc vào hình thức mà
          bạn mong muốn rồi điền đầy đủ thông tin theo form yêu cầu đã định sẵn
        </div>
        <v-divider class="mt-6"></v-divider>
        <div class="font-weight-semibold text-lg mt-6">
          Làm thế nào để tôi có thể đăng ký tài khoản?
        </div>
        <div class="mt-2 neutral80--text">
          Việc đăng ký tài khoản diễn ra rất đơn giản, người dùng chỉ cần nhấn
          vào phần đăng nhập, lựa chọn loại tài khoản tuỳ thuộc vào hình thức mà
          bạn mong muốn rồi điền đầy đủ thông tin theo form yêu cầu đã định sẵn
        </div>
        <v-divider class="mt-6"></v-divider>
        <div class="font-weight-semibold text-lg mt-6">
          Làm thế nào để tôi có thể đăng ký tài khoản?
        </div>
        <div class="mt-2 neutral80--text">
          Việc đăng ký tài khoản diễn ra rất đơn giản, người dùng chỉ cần nhấn
          vào phần đăng nhập, lựa chọn loại tài khoản tuỳ thuộc vào hình thức mà
          bạn mong muốn rồi điền đầy đủ thông tin theo form yêu cầu đã định sẵn
        </div>
        <div class="mt-4 mb-16">
          <v-pagination color="primary" :length="5"></v-pagination>
        </div>
      </v-col>
    </v-row>
    <div
      class="question-banner d-flex flex-column justify-center align-center text-center mb-16"
    >
      <v-img
        width="56px"
        max-height="56px"
        :src="require('@/assets/components/landing/image-4.webp')"
        class="mt-6 image-banner"
      >
      </v-img>
      <div class="text-xl font-weight-medium mt-8">
        Không tìm được câu hỏi phù hợp?
      </div>
      <div class="text-md mt-2">
        Nếu như vẫn còn thắc mắc cần được giải đáp, hãy liên hệ với chúng tôi
      </div>
      <v-btn class="border-radius-6 mt-8 text-none" color="primary" depressed>
        Liên hệ ngay
      </v-btn>
    </div>
  </div>
</template>

<script>
// import { mapStores } from "pinia";
// import { supplyStore } from "../store/supply-store";
import { rules } from "@/plugins/rules";
import { gmapApi } from "vue2-google-maps";

export default {
  computed: {
    // ...mapStores(supplyStore),
    google: gmapApi,
  },
  data() {
    return {
      currentTab: 1,
      rules: rules,
      isShow: true,
      isShowPass: false,
    };
  },
  created() {},
  methods: {
    toggleSearch() {},
    setCurrentTab(index) {
      this.currentTab = index;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: var(--v-primary20-base);
}
.search-question {
  width: 700px !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.05);
}
.append-btn {
  height: 100%;
  background: var(--v-primary60-base);
}
.v-input__slot {
  padding: 0px !important;
}
.question-banner {
  height: 300px;
  background: var(--v-primary5-base);
}
.image-banner {
  border-radius: 100px;
}
</style>

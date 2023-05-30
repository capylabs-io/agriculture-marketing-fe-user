import Vue from "vue";
import VueRouter from "vue-router";

// import alert from "@/plugins/alert";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/trang-chu",
  },
  {
    path: "/trang-chu",
    name: "Trang chủ",
    component: () => import("../views/home/pages/home.vue"),
  },
  {
    path: "/cay-canh",
    name: "Danh sách Cây cảnh",
    component: () => import("../views/product/pages/list-product.vue"),
  },
  {
    path: "/cay-canh/:code",
    name: "Chi tiết cây cảnh",
    component: () => import("../views/product/pages/product-detail.vue"),
  },
  {
    path: "/giong",
    name: "Danh sách Giống",
    component: () => import("../views/seedling/pages/list-seedling.vue"),
  },
  {
    path: "/giong/:code",
    name: "Chi tiết Giống",
    component: () => import("../views/seedling/pages/seedling-detail.vue"),
  },
  {
    path: "/vat-tu",
    name: "Danh sách Vật tư",
    component: () => import("../views/supply/pages/list-supply.vue"),
  },
  {
    path: "/vat-tu/:code",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
  },
  {
    path: "/tin-tuc",
    name: "Tin tức",
    component: () => import("../views/news/pages/list-news.vue"),
  },
  {
    path: "/bai-viet/:code",
    name: "Bài viết",
    component: () => import("../views/news/pages/news-detail.vue"),
  },
  {
    path: "/hop-tac-xa",
    name: "Danh sách Hợp tác xã",
    component: () => import("../views/htx/pages/list-htx.vue"),
  },
  {
    path: "/hop-tac-xa/:code",
    name: "Hợp tác xã",
    component: () => import("../views/htx/pages/htx-detail.vue"),
  },
  {
    path: "/nghe-nhan",
    name: "Danh sách Nghệ nhân, Chuyên gia",
    component: () => import("../views/artisan/pages/list-artisan.vue"),
  },
  {
    path: "/nghe-nhan/:code",
    name: "Nghệ nhân, Chuyên gia",
    component: () => import("../views/artisan/pages/artisan-detail.vue"),
  },
  {
    path: "/dai-ly",
    name: "Danh sách Đại lý",
    component: () => import("../views/agency/pages/list-agency.vue"),
  },
  {
    path: "/dai-ly/:code",
    name: "Đại lý",
    component: () => import("../views/agency/pages/agency-detail.vue"),
  },
  {
    path: "/vung-san-xuat",
    name: "Danh sách Vùng sản xuất",
    component: () => import("../views/region/pages/list-region.vue"),
  },
  {
    path: "/vung-san-xuat/:code",
    name: "Vùng sản xuất",
    component: () => import("../views/region/pages/region-detail.vue"),
  },
  {
    path: "/thu-vien",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
  },
  {
    path: "/lien-he",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
  },
  {
    path: "/tai-lieu",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
  },
  {
    path: "/hoi-dap",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;

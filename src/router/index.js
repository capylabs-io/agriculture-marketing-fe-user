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
    name: "List New",
    component: () => import("../views/news/pages/list-news.vue"),
  },
  {
    path: "/bai-viet/:code",
    name: "News Detail",
    component: () => import("../views/news/pages/news-detail.vue"),
  },
  {
    path: "/hop-tac-xa/:code",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
  },
  {
    path: "/nghe-nhan/:code",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
  },
  {
    path: "/dai-ly/:code",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
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

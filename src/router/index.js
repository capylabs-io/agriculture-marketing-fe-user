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
    path: "/gioi-thieu",
    name: "Product",
    component: () => import("../views/product/pages/list-product.vue"),
  },
  {
    path: "/cay-canh/:code",
    name: "Product Detail",
    component: () => import("../views/product/pages/product-detail.vue"),
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
    path: "/giong/:code",
    name: "Seedling Detail",
    component: () => import("../views/seedling/pages/seedling-detail.vue"),
  },
  {
    path: "/vat-tu/:code",
    name: "Supply Detail",
    component: () => import("../views/supply/pages/supply-detail.vue"),
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
  {
    path: "/contract",
    name: "Contract us",
    component: () => import("../views/contract/pages/contract.vue"),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("../views/faq/pages/faq.vue"),
  },
  {
    path: "/document",
    name: "Document",
    component: () => import("../views/document/pages/document.vue"),
  },
  {
    path: "/document-detail",
    name: "Document Detail",
    component: () => import("../views/document/pages/document-detail.vue"),
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

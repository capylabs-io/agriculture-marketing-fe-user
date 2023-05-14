import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { createPinia, PiniaVuePlugin } from "pinia";
import { markRaw } from "vue";
Vue.config.productionTip = false;

const pinia = createPinia();
Vue.use(PiniaVuePlugin);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
Vue.use(pinia);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

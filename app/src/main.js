import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import bootstrap from "./assets/bootstrap.min.css";
import animate from "./assets/animate.css";
import jquery from "../node_modules/jquery/dist/jquery.slim.js";
import $ from "../node_modules/jquery/dist/jquery.slim.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  bootstrap,
  jquery,
  $,
  animate,
  render: h => h(App)
}).$mount("#app");


//

import Vue from "vue";
import DevApp from "@/dev/Dev";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(DevApp)
}).$mount("#dev-app");

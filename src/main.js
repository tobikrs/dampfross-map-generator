import Vue from "vue";
import vuetify from "@/plugins/vuetify";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  data: {
    grid: null
  },
  render: h => h(App)
}).$mount("#app");

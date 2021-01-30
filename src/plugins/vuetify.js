import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import de from "vuetify/lib/locale/de";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: "de"
  },
  icons: {
    iconfont: "mdi"
  }
});

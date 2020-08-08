import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import EleForm from "vue-ele-form";
import EleFormTableEditor from "../src/index.js";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(EleForm);
Vue.component("table-editor", EleFormTableEditor);

new Vue({
  render: h => h(App)
}).$mount("#app");

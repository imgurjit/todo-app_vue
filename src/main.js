import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./helpers/router";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
import "../custom.scss";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...required,
  message: "Invalid email"
});

Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)
});

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// vuelidate
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

// moment
Vue.use(require("vue-moment"));

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

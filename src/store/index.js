import Vue from "vue";
import Vuex from "vuex";
import hosts from "./hosts/";
import workspace from "./workspace";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		hosts: hosts,
		workspace: workspace,
	},
});

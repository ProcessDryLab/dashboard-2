import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		hosts: {
			repositories: [
				{ name: "http://repo.test1.com", status: "offline" },
				{ name: "http://repo.test2.com", status: "online" },
			],
			miners: [
				{ name: "http://miner.test1.com", status: "online" },
				{ name: "http://miner.test2.com", status: "loading" },
			],
		},
	},
	mutations: {
		// synchronous
		addHost(state, payload) {
			if (payload.type === "repository") {
				state.hosts.repositories.push({ name: payload.host, status: "loading" });
			} else if (payload.type === "miner") {
				state.hosts.miners.push({ name: payload.host, status: "loading" });
			}
		},
		removeHost(state, payload) {
			if (payload.type === "repository") {
				const index = state.hosts.repositories.map((e) => e.name).indexOf(payload.name);
				state.hosts.repositories.splice(index, 1);
			} else if (payload.type === "miner") {
				const index = state.hosts.miners.map((e) => e.name).indexOf(payload.name);
				state.hosts.miners.splice(index, 1);
			}
		},
	},
	actions: {
		// asynchronous
	},
	modules: {},
	getters: {
		getHostsMiner: (state) => state.hosts.miners,
		getHostsRepository: (state) => state.hosts.repositories,
	},
});

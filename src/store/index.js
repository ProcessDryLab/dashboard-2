import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { RepositoryService } from "../services/repository";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		hosts: {
			repositories: [
				{ name: "http://pdl-repository-eu1.herokuapp.com", status: "loading" },
				{ name: "http://pdl-repository-eu2.herokuapp.com", status: "loading" },
			],
			miners: [
				{ name: "http://miner.test1.com", status: "online" },
				{ name: "http://miner.test2.com", status: "online" },
			],
		},
		workspace: [],
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
		addResource(state, payload) {
			state.workspace.push(payload);
		},
	},
	actions: {
		// asynchronous
		async checkIndividualHosts({ state }) {
			for (const h of state.hosts.miners) {
				axios
					.get(RepositoryService.buildPingUrl(h.name))
					.then((res) =>
						Vue.set(h, "status", (this.systemStatus = res.data === "pong" ? "online" : "offline"))
					)
					.catch(() => {
						Vue.set(h, "status", "offline");
					});
			}
			for (const h of state.hosts.repositories) {
				axios
					.get(RepositoryService.buildPingUrl(h.name))
					.then((res) =>
						Vue.set(h, "status", (this.systemStatus = res.data === "pong" ? "online" : "offline"))
					)
					.catch(() => {
						Vue.set(h, "status", "offline");
					});
			}
		},

		async checkHosts({ dispatch }) {
			dispatch("checkIndividualHosts");
			setInterval(() => {
				dispatch("checkIndividualHosts");
			}, 1000 * 5);
		},
	},
	modules: {},
	getters: {
		getHostsMiner: (state) => state.hosts.miners,
		getHostsRepository: (state) => state.hosts.repositories,
		getWorkspace: (state) => state.workspace,
		getSystemStatus(state) {
			var status = "online";
			for (const item of state.hosts.miners.concat(state.hosts.repositories)) {
				if (item.status === "offline") {
					status = "offline";
					break;
				}
				if (item.status === "loading") {
					status = "loading";
				}
			}
			return status;
		},
	},
});

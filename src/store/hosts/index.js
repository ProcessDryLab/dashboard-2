import Vue from "vue";
import axios from "axios";
import { RepositoryService } from "../../services/repository";

export default {
	state: {
		hosts: [
			{ name: "https://pdl-repository-eu1.azurewebsites.net", status: "loading", type: "repository" },
			// { name: "http://localhost:8080", status: "loading", type: "miner" },
		],
	},
	mutations: {
		// synchronous
		addHost(state, payload) {
			state.hosts.push({ name: payload.host, status: "loading", type: payload.type });
		},
		removeHost(state, payload) {
			state.hosts.forEach(function (value, i) {
				if (value.type == payload.type && value.name == payload.name) {
					state.hosts.splice(i, 1);
				}
			});
		},
	},
	actions: {
		// asynchronous
		async checkIndividualHosts({ state }) {
			for (const h of state.hosts) {
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
		getHostsMiner: (state) => state.hosts.filter((h) => h.type === "miner"),
		getHostsRepository: (state) => state.hosts.filter((h) => h.type === "repository"),
		getSystemStatus(state) {
			var status = "online";
			for (const item of state.hosts) {
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
};

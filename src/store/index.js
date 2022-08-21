import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { RepositoryService } from "../services/repository";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		hosts: [
			{ name: "http://pdl-repository-eu1.herokuapp.com", status: "loading", type: "repository" },
			{ name: "http://pdl-repository-eu2.herokuapp.com", status: "loading", type: "repository" },
			{ name: "http://miner.test1.com", status: "online", type: "miner" },
			{ name: "http://miner.test2.com", status: "online", type: "miner" },
		],
		workspace: [],
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
		addResource(state, payload) {
			state.workspace.push(payload);
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
		getWorkspace: (state) => state.workspace,
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
});

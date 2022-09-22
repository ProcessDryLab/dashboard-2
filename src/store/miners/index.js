import Vue from "vue";
import axios from "axios";
import { MinerService } from "../../services/miner";

export default {
	state: {
		miners: [
			{
				id: "id1",
				name: "miner1",
				description: "desc1",
				input: {
					source: {
						name: "in1",
						description: "id1",
						visualizations: [],
					},
				},
				parameters: [
					{
						name: "p1",
						type: "DOUBLE",
						default: 0.1,
					},
				],
				output: [{ name: "on1", description: "od1", visualizations: [] }],
				host: "",
			},
		],
	},
	mutations: {
		// synchronous
		addResource(state, payload) {
			state.miners.push(payload);
		},
		updateMiners(state, payload) {
			Vue.set(state, "miners", payload);
		},
	},
	actions: {
		// asynchronous
		async checkMinerHosts({ commit, rootGetters }) {
			var newMiners = [];
			for (const h of rootGetters.getHostsMiner) {
				if (h.status === "online") {
					await axios.get(MinerService.buildMinersListUrl(h.name)).then((res) => {
						newMiners = newMiners.concat(res.data.map((r) => ({ ...r, host: h.name })));
					});
				}
			}
			commit("updateMiners", newMiners);
		},

		async checkWorkspaces({ dispatch }) {
			dispatch("checkMinerHosts");
			setInterval(() => {
				dispatch("checkMinerHosts");
			}, 1000 * 5);
		},
	},
	modules: {},
	getters: {
		getMiners: (state) => state.miners,
	},
};

import Vue from "vue";
import axios from "axios";
import { RepositoryService } from "../../services/repository";

export default {
	state: {
		workspace: [
			{
				id: "id1",
				name: "resource1",
				type: {
					name: "xes",
					description: "A file with extension .xes",
					visualizations: [
						{ id: "v1", name: "Vis 1" },
						{ id: "v2", name: "Vis 2" },
					],
				},
				host: "",
			},
		],
	},
	mutations: {
		// synchronous
		addResource(state, payload) {
			state.workspace.push(payload);
		},
		updateWorkspace(state, payload) {
			Vue.set(state, "workspace", payload);
		},
	},
	actions: {
		// asynchronous
		async checkWorkspaceHosts({ commit, rootGetters }) {
			var newWorkspace = [];
			for (const h of rootGetters.getHostsRepository) {
				if (h.status === "online") {
					await axios.get(RepositoryService.buildResourceListUrl(h.name)).then((res) => {
						newWorkspace = newWorkspace.concat(res.data.map((r) => ({ ...r, host: h.name })));
					});
				}
			}
			newWorkspace.sort(function (a, b) {
				return new Date(b.creationDate) - new Date(a.creationDate);
			});
			commit("updateWorkspace", newWorkspace);
		},

		async checkWorkspaces({ dispatch }) {
			dispatch("checkWorkspaceHosts");
			setInterval(() => {
				dispatch("checkWorkspaceHosts");
			}, 1000 * 1);
		},
	},
	modules: {},
	getters: {
		getWorkspace: (state) => state.workspace,
		getResource: (state) => (id) => state.workspace.filter((r) => r.id === id),
	},
};

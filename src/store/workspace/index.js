export default {
	state: {
		workspace: [
			// { id: "aaaa1", name: "f1", type: "t1" },
			// { id: "aaaa2", name: "f2", type: "t2" },
		],
	},
	mutations: {
		// synchronous
		addResource(state, payload) {
			state.workspace.push(payload);
		},
	},
	actions: {
		// asynchronous
	},
	modules: {},
	getters: {
		getWorkspace: (state) => state.workspace,
	},
};

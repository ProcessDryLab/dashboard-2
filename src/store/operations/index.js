export default {
	state: {
		operations: [],
	},
	mutations: {
		// synchronous
		addOperation(state, payload) {
			state.operations.unshift({
				title: payload.description,
				started: Date.now(),
				completed: null,
				host: payload.host,
				type: payload.type,
			});
		},
	},
	actions: {
		// asynchronous
	},
	modules: {},
	getters: {
		getOperations: (state) => state.operations,
	},
};

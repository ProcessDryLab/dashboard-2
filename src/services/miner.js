export class MinerService {
	static buildPingUrl(hostname) {
		return hostname + "/api/v1/system/ping";
	}

	static buildMinersListUrl(hostname) {
		return hostname + "/api/v1/miners";
	}

	static buildNewMinerInstanceUrl(hostname) {
		return hostname + "/api/v1/miners/instance";
	}
}

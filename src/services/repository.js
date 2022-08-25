export class RepositoryService {
	static buildPingUrl(hostname) {
		return hostname + "/api/v1/system/ping";
	}

	static buildUploadUrl(hostname) {
		return hostname + "/api/v1/resources";
	}

	static buildResourceListUrl(hostname) {
		return hostname + "/api/v1/resources";
	}
}

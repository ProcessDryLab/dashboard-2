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

	static deleteResource(hostname, id) {
		return hostname + "/api/v1/resources/" + id;
	}

	static buildResourceVisualization(hostname, resourceId, visualizationId) {
		return hostname + "/api/v1/resources/" + resourceId + "/view/" + visualizationId;
	}
}

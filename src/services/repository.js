export class RepositoryService {
	static buildPingUrl(url) {
		return url + "/api/v1/system/ping";
	}
}
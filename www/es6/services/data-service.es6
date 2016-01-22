class DataService {
    constructor ($http, restApiUrl, ActivitiesService, PositionService, maxDistance) {
        // DI
        this.$http = $http;
        this.restApiUrl = restApiUrl;
        this.ActivitiesService = ActivitiesService;
		this.PositionService = PositionService;
        this.maxDistance = maxDistance;
    }
    getResults () {
        return this.$http.get(this.restApiUrl +
			'retrieve_active' +
			'?lat=' + this.PositionService.chosenPosition.latitude +
			'&lon=' + this.PositionService.chosenPosition.longitude +
			'&max=' + this.maxDistance +
			'&offer_id=' + this.ActivitiesService.offerId +
			'&search_id=' + this.ActivitiesService.searchId +
			'&time=' + new Date().getTime());
    }
	postLogin (data) {
		return this.$http.post(this.restApiUrl +
			'login' +
			'?time=' + new Date().getTime(), data);
	}
	postChange (data) {
		return this.$http.post(this.restApiUrl +
			'change' +
			'?time=' + new Date().getTime(), data);
	}
	postRegistration (data) {
		return this.$http.post(this.restApiUrl +
			'register' +
			'?time=' + new Date().getTime(), data);
	}
	contactTandem (data) {
		return this.$http.post(this.restApiUrl +
			'contact_tandem' +
			'?time=' + new Date().getTime(), data);
	}

}

DataService.$inject = ['$http', 'restApiUrl', 'ActivitiesService', 'PositionService', 'maxDistance'];

export { DataService };


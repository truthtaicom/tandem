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

}

DataService.$inject = ['$http', 'restApiUrl', 'ActivitiesService', 'PositionService', 'maxDistance'];

export { DataService };


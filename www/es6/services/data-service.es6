class DataService {
    constructor ($http, restApiUrl, ActivitiesService, maxDistance) {
        // DI
        this.$http = $http;
        this.restApiUrl = restApiUrl;
        this.ActivitiesService = ActivitiesService;
        this.maxDistance = maxDistance;
    }
    getResults () {
        return this.$http.get(this.restApiUrl +
			'retrieve_active' +
			'?lat=' + window.latitude +
			'&lon=' + window.longitude +
			'&max=' + this.maxDistance +
			'&offer_id=' + this.ActivitiesService.offerId +
			'&search_id=' + this.ActivitiesService.searchId +
			'&time=' + new Date().getTime());
    }

}

DataService.$inject = ['$http', 'restApiUrl', 'ActivitiesService', 'maxDistance'];

export { DataService };


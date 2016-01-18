'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataService = (function () {
	function DataService($http, restApiUrl, ActivitiesService, PositionService, maxDistance) {
		_classCallCheck(this, DataService);

		// DI
		this.$http = $http;
		this.restApiUrl = restApiUrl;
		this.ActivitiesService = ActivitiesService;
		this.PositionService = PositionService;
		this.maxDistance = maxDistance;
	}

	_createClass(DataService, [{
		key: 'getResults',
		value: function getResults() {
			return this.$http.get(this.restApiUrl + 'retrieve_active' + '?lat=' + this.PositionService.chosenPosition.latitude + '&lon=' + this.PositionService.chosenPosition.longitude + '&max=' + this.maxDistance + '&offer_id=' + this.ActivitiesService.offerId + '&search_id=' + this.ActivitiesService.searchId + '&time=' + new Date().getTime());
		}
	}, {
		key: 'postLogin',
		value: function postLogin(data) {
			return this.$http.post(this.restApiUrl + 'login' + '?time=' + new Date().getTime(), data);
		}
	}, {
		key: 'postChange',
		value: function postChange(data) {
			return this.$http.post(this.restApiUrl + 'change' + '?time=' + new Date().getTime(), data);
		}
	}, {
		key: 'postRegistration',
		value: function postRegistration(data) {
			return this.$http.post(this.restApiUrl + 'register' + '?time=' + new Date().getTime(), data);
		}
	}]);

	return DataService;
})();

DataService.$inject = ['$http', 'restApiUrl', 'ActivitiesService', 'PositionService', 'maxDistance'];

exports.DataService = DataService;
//# sourceMappingURL=data-service.js.map

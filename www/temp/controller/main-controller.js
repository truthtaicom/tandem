'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = (function () {
	function MainController($rootScope, $timeout, ActivitiesService, LanguageService, positionsData, AlertService, PositionService) {
		_classCallCheck(this, MainController);

		// DI
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.positions = positionsData;
		this.AlertService = AlertService;
		this.PositionService = PositionService;
		// local vars
		this.positions[0].name = this.LanguageService.selectedLanguage === 'de' ? 'meiner Position' : 'my position';
		this.language = this.LanguageService.selectedLanguage;
		this.activities = this.ActivitiesService.activities;
		this.offerObj = this.ActivitiesService.offerObj;
		this.searchObj = this.ActivitiesService.searchObj;
		this.chosenPosition = this.PositionService.chosenPosition;
		this.showAlert();
	}

	_createClass(MainController, [{
		key: 'showAlert',
		value: function showAlert() {
			var _this = this;

			this.PositionService.updatePosition();
			if (!this.chosenPosition.longitude || !this.chosenPosition.latitude) {
				this.AlertService.alerts.retrieving_position = true;
				this.$rootScope.$broadcast('show-alert');
				this.$timeout(function () {
					_this.showAlert();
				}, 2000, true);
			} else {
				this.AlertService.alerts.retrieving_position = false;
				this.$rootScope.$broadcast('show-alert');
			}
		}
	}, {
		key: 'changeOffer',
		value: function changeOffer() {
			this.ActivitiesService.offerId = this.offerObj.id;
			this.ActivitiesService.update();
			this.showAlert();
		}
	}, {
		key: 'changeSearch',
		value: function changeSearch() {
			this.ActivitiesService.searchId = this.searchObj.id;
			this.ActivitiesService.update();
			this.showAlert();
		}
	}, {
		key: 'changePosition',
		value: function changePosition() {
			this.PositionService.update(this.chosenPosition);
			this.showAlert();
		}
	}]);

	return MainController;
})();

MainController.$inject = ['$rootScope', '$timeout', 'ActivitiesService', 'LanguageService', 'positionsData', 'AlertService', 'PositionService'];

exports.MainController = MainController;
//# sourceMappingURL=main-controller.js.map

class MainController {
    constructor ($rootScope, $timeout, ActivitiesService, LanguageService, positionsData, AlertService, PositionService) {
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
	showAlert () {
		console.log('...', this.chosenPosition);
		this.PositionService.updatePosition();
		console.log('...', this.chosenPosition);
		if (!this.chosenPosition.longitude || !this.chosenPosition.latitude) {
			console.log('no longitude or no latitude');
			window.tandemAppConfig.geoLocation();
			this.AlertService.alerts.retrieving_position = true;
			this.$rootScope.$broadcast('show-alert');
			this.$timeout(() => {
				this.showAlert();
			}, 2000, true);
		} else {
			console.log('longitude and latitude');
			this.AlertService.alerts.retrieving_position = false;
			this.$rootScope.$broadcast('show-alert');
		}
	}
    changeOffer () {
		this.ActivitiesService.offerId = this.offerObj.id;
        this.ActivitiesService.update();
		this.showAlert();
    }
	changeSearch () {
		this.ActivitiesService.searchId = this.searchObj.id;
		this.ActivitiesService.update();
		this.showAlert();
	}
    changePosition () {
		this.PositionService.update(this.chosenPosition);
		this.showAlert();
	}
}


MainController.$inject = ['$rootScope', '$timeout', 'ActivitiesService', 'LanguageService', 'positionsData', 'AlertService', 'PositionService'];

export { MainController };

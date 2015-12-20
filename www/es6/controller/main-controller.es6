class MainController {
    constructor ($rootScope, ActivitiesService, LanguageService, positionsData, AlertService, PositionService) {
        // DI
        this.$rootScope = $rootScope;
        this.LanguageService = LanguageService;
        this.ActivitiesService = ActivitiesService;
        this.positions = positionsData;
        this.AlertService = AlertService;
        this.PositionService = PositionService;
        // local vars
        this.positions[0].name = this.LanguageService.selectedLanguage === 'de' ? '*deiner Position' : '*your position';
        this.language = this.LanguageService.selectedLanguage;
        this.activities = this.ActivitiesService.activities;
        this.chosenActivity = this.ActivitiesService.chosenActivity;
        this.chosenPosition = this.PositionService.chosenPosition;
    }
    changeActivity () {
        this.ActivitiesService.activityId = this.chosenActivity.id;
        this.ActivitiesService.update();
    }
    changePosition () {
        window.longitude = this.chosenPosition.longitude;
        window.latitude = this.chosenPosition.latitude;
        this.PositionService.update(this.chosenPosition);
        if (!window.longitude || !window.latitude) {
            this.AlertService.alerts.retrieving_position = true;
            window.tandemAppConfig.geoLocation();
            //broadcast event
            this.$rootScope.$broadcast('show-alert');
        } else {
            this.AlertService.alerts.retrieving_position = false;
        }
    }
}


MainController.$inject = ['$rootScope', 'ActivitiesService', 'LanguageService', 'positionsData', 'AlertService', 'PositionService'];

export { MainController };

class ActivitiesService {
    constructor ($rootScope, activitiesData, FilterService, LanguageService) {
        // DI
        this.activitiesData = activitiesData;
        this.FilterService = FilterService;
        this.LanguageService = LanguageService;
        // internal vars
        this.activityId = localStorage.getItem('tandemApp_selectedActivity') ? localStorage.getItem('tandemApp_selectedActivity') : 36; // 36 === deutsch
        this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
        this.chosenActivity = this.FilterService.filterObjectFromArray(this.activities, 'id', this.activityId);
        $rootScope.$on('language-changed', () => {
            this.updateActivities();
        });
    }

    updateActivities () {
        this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
        this.update();
    }

    update () {
        localStorage.setItem('tandemApp_selectedActivity', this.activityId);
        this.chosenActivity = this.FilterService.filterObjectFromArray(this.activities, 'id', this.activityId);
    }

}

ActivitiesService.$inject = ['$rootScope', 'activitiesData', 'FilterService', 'LanguageService'];

export { ActivitiesService };

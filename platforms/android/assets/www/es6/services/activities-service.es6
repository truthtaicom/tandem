class ActivitiesService {
    constructor (activitiesData, FilterService, LanguageService) {
        // DI
        this.activitiesData = activitiesData;
        this.FilterService = FilterService;
        this.LanguageService = LanguageService;
        // internal vars
        this.offerId = localStorage.getItem('tandemApp_activities_offerId') ? localStorage.getItem('tandemApp_activities_offerId') : 36; // 36 === deutsch
		this.searchId = localStorage.getItem('tandemApp_activities_searchId') ? localStorage.getItem('tandemApp_activities_searchId') : 36; // 36 === deutsch
		this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
        this.offerObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.offerId);
		this.searchObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.searchId);
    }

    updateActivities () {
        this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
        this.update();
    }

    update () {
        localStorage.setItem('tandemApp_activities_offerId', this.offerId);
		this.offerObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.offerId);
		localStorage.setItem('tandemApp_activities_searchId', this.searchId);
		this.searchObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.searchId);
	}

}

ActivitiesService.$inject = ['activitiesData', 'FilterService', 'LanguageService'];

export { ActivitiesService };

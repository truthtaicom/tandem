class SettingsController {
    constructor ($route, languageSettings, LanguageService, ActivitiesService) {
        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.$route = $route;
		// local vars
		this.language = this.LanguageService.selectedLanguage;
        this.data = {
            availableOptions: this.languageSettings,
            selectedOption: this.language === 'de' ? this.languageSettings[0] : this.languageSettings[1]
		};
		this.token = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).token : null;
		this.name = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).name : '';
	}
    changeLanguage (id) {
        this.language = id;
        this.LanguageService.resetLanguage(this.language);
		//reload route
        this.$route.reload();
    }
	logout () {
		localStorage.removeItem('tandemApp_userData');
		this.token = null;
		//reload route
		this.$route.reload();
	}
}

SettingsController.$inject = ['$route', 'languageSettings', 'LanguageService', 'ActivitiesService'];

export { SettingsController };

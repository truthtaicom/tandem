class SettingsController {
    constructor (languageSettings, LanguageService, ActivitiesService) {
        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		// local vars
		this.language = this.LanguageService.selectedLanguage;
        this.data = {
            availableOptions: this.languageSettings,
            selectedOption: this.language === 'de' ? this.languageSettings[0] : this.languageSettings[1]
		};
		this.token = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).token : null;

	}
    changeLanguage (id) {
        this.language = id;
        this.LanguageService.resetLanguage(this.language);
        //TODO : reload app
        //window.location.reload();
    }
	logout () {
		localStorage.removeItem('tandemApp_userData');
		this.token = null;
		//TODO : reload app
		//window.location.reload();
	}
}

SettingsController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService'];

export { SettingsController };

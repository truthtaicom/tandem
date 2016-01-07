class MyProfileController {
	constructor (languageSettings, LanguageService, ActivitiesService) {
		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.language = this.LanguageService.selectedLanguage;
	}
}

MyProfileController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService'];

export { MyProfileController };

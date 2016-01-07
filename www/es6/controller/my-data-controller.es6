class MyDataController {
	constructor (languageSettings, LanguageService, ActivitiesService) {
		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		// local vars
		this.userData = localStorage.getItem('tandemApp_userData') ? localStorage.getItem('tandemApp_userData') : {
			name: 'Hans',
			email: '',
			zip: '',
			city: '',
			description: '',
			lang_have: this.ActivitiesService.offerId,
			lang_seek: this.ActivitiesService.searchId
		};
		this.language = this.LanguageService.selectedLanguage;
	}
}

MyDataController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService'];

export { MyDataController };

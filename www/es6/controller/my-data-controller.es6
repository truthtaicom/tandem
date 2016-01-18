class MyDataController {
	constructor (languageSettings, LanguageService, ActivitiesService, DataService) {
		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.DataService = DataService;
		// local vars
		this.myDataForm = {};
		this.submitted = false;
		this.userData = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')) : {
			name: '',
			email: '',
			zip: '',
			city: '',
			description: '',
			lang_have: this.ActivitiesService.offerId,
			lang_seek: this.ActivitiesService.searchId
		};
		this.language = this.LanguageService.selectedLanguage;
		this.activities = this.ActivitiesService.activities;
		this.offerObj = this.ActivitiesService.offerObj;
		this.searchObj = this.ActivitiesService.searchObj;
	}
	changeOffer () {
		this.ActivitiesService.offerId = this.offerObj.id;
		this.ActivitiesService.update();
	}
	changeSearch () {
		this.ActivitiesService.searchId = this.searchObj.id;
		this.ActivitiesService.update();
	}
	submitForm () {
		console.log('submitForm');
		this.submitted = true;
		//console.log('this.userData : ', this.userData);
		this.DataService.postChange(this.userData).then( () => {
			console.log('SUCCESS');
		}, () => {
			console.log('ERROR');
		});

	}
}

MyDataController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService', 'DataService'];

export { MyDataController };

class MyDataController {
	constructor (languageSettings, LanguageService, ActivitiesService, DataService) {
		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.DataService = DataService;
		// local vars
		this.myDataForm = {};
		this.formState = {
			submitted: false,
			success: false,
			error: false
		};
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
		this.formState.submitted = true;
		if (this.myDataForm.$valid) {
		if (typeof this.userData.token !== 'undefined') {
				/**
				 * change / update
				 */
				this.DataService.postChange(this.userData).then((data) => {
					if (data.data.toString() === 'true') {
						localStorage.setItem('tandemApp_userData', JSON.stringify(this.userData));
						this.formState.success = true;
						this.formState.error = false;
					} else {
						this.formState.success = false;
						this.formState.error = true;
					}
				}, () => {
					this.formState.success = false;
					this.formState.error = true;
				});
			} else {
				/**
				 * register
				 */
				this.userData.lat = typeof window.latitude !== 'undefined' ? window.latitude : 0;
				this.userData.lon = typeof window.longitude !== 'undefined' ? window.longitude : 0;
				this.userData.lang_used = this.language;
				this.DataService.postRegistration(this.userData).then((data) => {
					if (typeof data.data.token !== 'undefined') {
						this.userData = data.data;
						localStorage.setItem('tandemApp_userData', JSON.stringify(this.userData));
						this.formState.success = true;
						this.formState.error = false;
					} else {
						this.formState.success = false;
						this.formState.error = true;
					}
				}, () => {
					this.formState.success = false;
					this.formState.error = true;
				});
			}
		}
	}
}


MyDataController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService', 'DataService'];

export { MyDataController };

class MyDataController {
	constructor (languageSettings, LanguageService, ActivitiesService, DataService, FilterService, $timeout) {
		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.DataService = DataService;
		this.FilterService = FilterService;
		this.$timeout = $timeout;
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
			lang_have_id: this.ActivitiesService.offerId,
			lang_seek_id: this.ActivitiesService.searchId
		};
		this.language = this.LanguageService.selectedLanguage;
		this.activities = this.ActivitiesService.activities;
		this.updateLangObjects();
	}
	updateLangObjects () {
		this.lang_have = this.FilterService.filterObjectFromArray(this.activities, 'id', this.userData.lang_have_id);
		this.lang_seek = this.FilterService.filterObjectFromArray(this.activities, 'id', this.userData.lang_seek_id);
	}
	submitForm () {
		/*
		 * set form to submitted = true
		 */
		this.formState.submitted = true;
		if (this.myDataForm.$valid) {
			/*
			 * update lang_have_id && lang_seek_id
			 */
			this.userData.lang_have_id = this.lang_have.id;
			this.userData.lang_seek_id = this.lang_seek.id;
			/*
			 * submit
			 */
			if (typeof this.userData.token !== 'undefined') {
				/**
				 * change / update
				 */
				this.DataService.postChange(this.userData).then((data) => {
					if (data.data.toString() === 'true') {
						localStorage.setItem('tandemApp_userData', JSON.stringify(this.userData));
						this.formState.success = true;
						this.formState.error = false;
						//scroll to top
						this.$timeout(()=> {
							window.scrollTo(0, 0);
						});
					} else {
						this.formState.success = false;
						this.formState.error = true;
						//scroll to top
						this.$timeout(()=> {
							window.scrollTo(0, 0);
						});
					}
				}, () => {
					this.formState.success = false;
					this.formState.error = true;
					//scroll to top
					this.$timeout(()=> {
						window.scrollTo(0, 0);
					});
				});
			} else {
				/**
				 * register
				 */
				this.userData.lat = typeof window.latitude !== 'undefined' ? window.latitude : 0;
				this.userData.lon = typeof window.longitude !== 'undefined' ? window.longitude : 0;
				this.userData.lang_used = this.language;
				this.DataService.postRegistration(this.userData).then((data) => {

					//toggle formState
					if (typeof data.data.token !== 'undefined') {
						this.userData = data.data;
						localStorage.setItem('tandemApp_userData', JSON.stringify(this.userData));
						this.formState.success = true;
						this.formState.error = false;
						//scroll to top
						this.$timeout(()=> {
							window.scrollTo(0, 0);
						});
					} else {
						this.formState.success = false;
						this.formState.error = true;
						//scroll to top
						this.$timeout(()=> {
							window.scrollTo(0, 0);
						});
					}
				}, () => {
					//toggle formState
					this.formState.success = false;
					this.formState.error = true;
					//scroll to top
					this.$timeout(()=> {
						window.scrollTo(0, 0);
					});
				});
			}
		}
	}
}


MyDataController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService', 'DataService', 'FilterService', '$timeout'];

export { MyDataController };

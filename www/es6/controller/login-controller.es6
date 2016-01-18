class LoginController {
	constructor (languageSettings, LanguageService, $location, DataService, encKey) {
		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.DataService = DataService;
		this.encKey = encKey;
		this.$location = $location;
		// local vars
		this.loginForm = {};
		this.submitted = false;
		this.error = false;
		this.userData = {
			username: '',
			password: ''
		};
		this.token = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).token : null;
		if (this.token) {
			this.$location.path('/settings');
		}

	}
	submit () {
		let postData = {
			username: window.GibberishAES.enc(this.userData.username, this.encKey),
			password: window.GibberishAES.enc(this.userData.password, this.encKey)
		};
		this.submitted = true;
		if (this.userData.username.toString().length > 0 && this.userData.password.toString().length > 0) {
			this.DataService.postLogin(postData).then((data) => {
				console.log('success !!! ', data);
				let userData = data.data;
				console.log('userData : ', userData);
				userData.email = this.userData.username;
				localStorage.setItem('tandemApp_userData', JSON.stringify(userData));
				this.$location.path('/settings');
			}, () => {
				console.log('error !!! ');
				this.error = true;
			});
		}
	}
}

LoginController.$inject = ['languageSettings', 'LanguageService', '$location', 'DataService', 'encKey'];

export { LoginController };

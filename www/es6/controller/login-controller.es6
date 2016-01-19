class LoginController {
    constructor(languageSettings, LanguageService, $location, DataService, encKey) {
        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        this.DataService = DataService;
        this.encKey = encKey;
        this.$location = $location;
        // local vars
        this.loginForm = {};
        this.formState = {
            submitted: false,
            error: false
        };
        this.userData = {
            username: '',
            password: ''
        };
        this.token = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).token : null;
        if (this.token) {
            this.$location.path('/settings');
        }

    }

    submit() {
        let postData = {
            username: window.GibberishAES.enc(this.userData.username, this.encKey),
            password: window.GibberishAES.enc(this.userData.password, this.encKey)
        };
        this.formState.submitted = true;

        if (this.loginForm.$valid) {
            this.DataService.postLogin(postData).then((data) => {
                if (data.data.toString() !== 'false') {
                    // save as temp var
                    let userData = data.data;
                    // add email
                    userData.email = this.userData.username;
                    // overwrite old data
                    this.userData = userData;
                    // and save in localstorage
                    localStorage.setItem('tandemApp_userData', JSON.stringify(this.userData));
                    this.$location.path('/settings');
                } else {
                    this.formState.error = true;
                }
            }, () => {
                this.formState.error = true;
            });

        }
    }
}

LoginController.$inject = ['languageSettings', 'LanguageService', '$location', 'DataService', 'encKey'];

export { LoginController };

class ResetController {
    constructor (languageSettings, LanguageService, DataService, encKey, $timeout) {
        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        this.DataService = DataService;
        this.encKey = encKey;
		this.$timeout = $timeout;
        // local vars
        this.resetForm = {};
        this.formState = {
            submitted: false,
            error: false,
            success: false
        };
        this.language = this.LanguageService.selectedLanguage;
        this.userData = {
            username: '',
            lang_used: this.language
        };
    }
    submit () {
        this.formState.submitted = true;

        if (this.resetForm.$valid) {
            this.DataService.postReset(this.userData).then((data) => {
				if (data.data.toString() === 'true') {
                    this.formState.error = false;
                    this.formState.success = true;
					//scroll to top
					this.$timeout(()=> {
						window.scrollTo(0, 0);
					});
                } else {
                    this.formState.error = true;
                    this.formState.success = false;
					//scroll to top
					this.$timeout(()=> {
						window.scrollTo(0, 0);
					});
                }
            }, () => {
				this.formState.error = true;
                this.formState.success = false;
				//scroll to top
				this.$timeout(()=> {
					window.scrollTo(0, 0);
				});
            });
        }
    }
}

ResetController.$inject = ['languageSettings', 'LanguageService', 'DataService', 'encKey', '$timeout'];

export { ResetController };

class ResetController {
    constructor (languageSettings, LanguageService, DataService, encKey) {
        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        this.DataService = DataService;
        this.encKey = encKey;
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
                } else {
                    this.formState.error = true;
                    this.formState.success = false;
                }
            }, () => {
                this.formState.error = true;
                this.formState.success = false;
            });
        }
    }
}

ResetController.$inject = ['languageSettings', 'LanguageService', 'DataService', 'encKey'];

export { ResetController };

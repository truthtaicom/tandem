class SettingsController {
    constructor ($rootScope, languageSettings, LanguageService) {
        // DI
        this.$rootScope = $rootScope;
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        // local vars
        this.language = this.LanguageService.selectedLanguage;
        this.data = {
            availableOptions: this.languageSettings,
            selectedOption: this.language === 'de' ? this.languageSettings[0] : this.languageSettings[1]
        };
    }
    changeLanguage () {
        this.language = this.data.selectedOption.id;
        this.LanguageService.resetLanguage(this.language);
        // broadcast to translation directive
        this.$rootScope.$broadcast('language-changed');
    }
}

SettingsController.$inject = ['$rootScope', 'languageSettings', 'LanguageService'];

export { SettingsController };

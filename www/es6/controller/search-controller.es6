class SearchController {
    constructor ($rootScope, languageSettings, LanguageService) {
        // DI
        this.$rootScope = $rootScope;
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;


    }
}

SearchController.$inject = ['$rootScope', 'languageSettings', 'LanguageService'];

export { SearchController };

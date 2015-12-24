class SearchController {
    constructor ($rootScope, $location, languageSettings, LanguageService, DataService) {
        // DI
        this.$rootScope = $rootScope;
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        if (!window.latitude || !window.longitude) {
            $location.path('/');
        } else {
            this.searchResults = DataService.getResults().then((data) => {
                this.renderResults(data);
            });
        }
    }
    renderResults (data) {
		console.log('got data ', data);
    }

}

SearchController.$inject = ['$rootScope', '$location', 'languageSettings', 'LanguageService', 'DataService'];

export { SearchController };

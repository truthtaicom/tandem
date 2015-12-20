'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchController = function SearchController($rootScope, languageSettings, LanguageService) {
    _classCallCheck(this, SearchController);

    // DI
    this.$rootScope = $rootScope;
    this.languageSettings = languageSettings;
    this.LanguageService = LanguageService;
};

SearchController.$inject = ['$rootScope', 'languageSettings', 'LanguageService'];

exports.SearchController = SearchController;
//# sourceMappingURL=search-controller.js.map

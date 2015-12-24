'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchController = (function () {
    function SearchController($rootScope, $location, languageSettings, LanguageService, DataService) {
        var _this = this;

        _classCallCheck(this, SearchController);

        // DI
        this.$rootScope = $rootScope;
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        if (!window.latitude || !window.longitude) {
            $location.path('/');
        } else {
            this.searchResults = DataService.getResults().then(function (data) {
                _this.renderResults(data);
            });
        }
    }

    _createClass(SearchController, [{
        key: 'renderResults',
        value: function renderResults(data) {
            console.log('got data ', data);
        }
    }]);

    return SearchController;
})();

SearchController.$inject = ['$rootScope', '$location', 'languageSettings', 'LanguageService', 'DataService'];

exports.SearchController = SearchController;
//# sourceMappingURL=search-controller.js.map

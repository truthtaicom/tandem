'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = (function () {
    function SettingsController($rootScope, languageSettings, LanguageService) {
        _classCallCheck(this, SettingsController);

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

    _createClass(SettingsController, [{
        key: 'changeLanguage',
        value: function changeLanguage() {
            this.language = this.data.selectedOption.id;
            this.LanguageService.resetLanguage(this.language);
            // broadcast to translation directive
            this.$rootScope.$broadcast('language-changed');
        }
    }]);

    return SettingsController;
})();

SettingsController.$inject = ['$rootScope', 'languageSettings', 'LanguageService'];

exports.SettingsController = SettingsController;
//# sourceMappingURL=settings-controller.js.map

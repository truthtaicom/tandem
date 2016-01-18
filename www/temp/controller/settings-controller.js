'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = (function () {
    function SettingsController(languageSettings, LanguageService, ActivitiesService) {
        _classCallCheck(this, SettingsController);

        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        this.ActivitiesService = ActivitiesService;
        // local vars
        this.language = this.LanguageService.selectedLanguage;
        this.data = {
            availableOptions: this.languageSettings,
            selectedOption: this.language === 'de' ? this.languageSettings[0] : this.languageSettings[1]
        };
        this.token = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).token : null;
    }

    _createClass(SettingsController, [{
        key: 'changeLanguage',
        value: function changeLanguage(id) {
            this.language = id;
            this.LanguageService.resetLanguage(this.language);
            //reload app
            window.location.reload();
        }
    }]);

    return SettingsController;
})();

SettingsController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService'];

exports.SettingsController = SettingsController;
//# sourceMappingURL=settings-controller.js.map

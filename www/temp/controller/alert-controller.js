'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertController = function AlertController($rootScope, LanguageService, AlertService) {
    var _this = this;

    _classCallCheck(this, AlertController);

    // DI
    this.$rootScope = $rootScope;
    this.AlertService = AlertService;
    this.alerts = this.AlertService.alerts;
    this.LanguageService = LanguageService;
    this.language = this.LanguageService.selectedLanguage;
    this.$rootScope.$on('show-alert', function () {
        _this.alerts = _this.AlertService.alerts;
    });
};

AlertController.$inject = ['$rootScope', 'LanguageService', 'AlertService'];

exports.AlertController = AlertController;
//# sourceMappingURL=alert-controller.js.map

class AlertController {
    constructor ($rootScope, LanguageService, AlertService) {
        // DI
        this.$rootScope = $rootScope;
        this.AlertService = AlertService;
        this.alerts = this.AlertService.alerts;
		this.LanguageService = LanguageService;
        this.language = this.LanguageService.selectedLanguage;
		this.$rootScope.$on('show-alert', () => {
		 	this.alerts = this.AlertService.alerts;
		});
    }
}

AlertController.$inject = ['$rootScope', 'LanguageService', 'AlertService'];

export { AlertController };

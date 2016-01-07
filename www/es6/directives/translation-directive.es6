class TranslationDirective {
    constructor (LanguageService) {
		this.restrict = 'A';
        this.transclude = true;
        this.template = '<span>{{transCtrl.translation}}</span>';
        this.scope = {};
		this.bindToController = {
			'myTranslation': '@'
		};
		this.controllerAs = 'transCtrl';
		this.controller = function () {
			console.log('LanguageService : ', LanguageService);
			this.translation = window.tandemAppConfig.translation[ LanguageService.selectedLanguage ][ this.myTranslation ];

		};
    }

    static directiveFactory (LanguageService) {
        TranslationDirective.instance = new TranslationDirective(LanguageService);
        return TranslationDirective.instance;
    }
}

TranslationDirective.$inject = ['LanguageService'];

export { TranslationDirective };

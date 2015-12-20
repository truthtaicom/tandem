class TranslationDirective {
    constructor ($rootScope) {
        this.$rootScope = $rootScope;
        this.restrict = 'A';
        this.transclude = true;
        this.template = '<span>{{translation}}</span>';
        this.scope = {
            'myTranslation': '@',
            'language': '='
        };
    }

    link (scope) {
        if (!scope.language) {
            scope.language = localStorage.getItem('tandemApp_selectedLanguage') ? localStorage.getItem('tandemApp_selectedLanguage') : 'en';
        }
        scope.translation = window.tandemAppConfig.translation[ scope.language ][ scope.myTranslation ];
        scope.$watch('language', () => {
            scope.translation = window.tandemAppConfig.translation[ scope.language ][ scope.myTranslation ];
        });
    }

    static directiveFactory ($rootScope) {
        TranslationDirective.instance = new TranslationDirective($rootScope);
        return TranslationDirective.instance;
    }
}

TranslationDirective.$inject = ['$rootScope'];

export { TranslationDirective };

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TranslationDirective = (function () {
    function TranslationDirective($rootScope) {
        _classCallCheck(this, TranslationDirective);

        this.$rootScope = $rootScope;
        this.restrict = 'A';
        this.transclude = true;
        this.template = '<span>{{translation}}</span>';
        this.scope = {
            'myTranslation': '@',
            'language': '='
        };
    }

    _createClass(TranslationDirective, [{
        key: 'link',
        value: function link(scope) {
            if (!scope.language) {
                scope.language = localStorage.getItem('tandemApp_selectedLanguage') ? localStorage.getItem('tandemApp_selectedLanguage') : 'en';
            }
            scope.translation = window.tandemAppConfig.translation[scope.language][scope.myTranslation];
            scope.$watch('language', function () {
                scope.translation = window.tandemAppConfig.translation[scope.language][scope.myTranslation];
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($rootScope) {
            TranslationDirective.instance = new TranslationDirective($rootScope);
            return TranslationDirective.instance;
        }
    }]);

    return TranslationDirective;
})();

TranslationDirective.$inject = ['$rootScope'];

exports.TranslationDirective = TranslationDirective;
//# sourceMappingURL=translation-directive.js.map

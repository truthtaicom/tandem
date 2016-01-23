'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TranslationDirective = function () {
  function TranslationDirective(LanguageService) {
    _classCallCheck(this, TranslationDirective);

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
      this.translation = window.tandemAppConfig.translation[LanguageService.selectedLanguage][this.myTranslation];
    };
  }

  _createClass(TranslationDirective, null, [{
    key: 'directiveFactory',
    value: function directiveFactory(LanguageService) {
      TranslationDirective.instance = new TranslationDirective(LanguageService);
      return TranslationDirective.instance;
    }
  }]);

  return TranslationDirective;
}();

TranslationDirective.$inject = ['LanguageService'];

exports.TranslationDirective = TranslationDirective;
//# sourceMappingURL=translation-directive.js.map

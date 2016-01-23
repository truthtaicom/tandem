'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LanguageService = function () {
    function LanguageService() {
        _classCallCheck(this, LanguageService);

        this.selectedLanguage = localStorage.getItem('tandemApp_selectedLanguage') ? localStorage.getItem('tandemApp_selectedLanguage') : 'en';
    }

    _createClass(LanguageService, [{
        key: 'resetLanguage',
        value: function resetLanguage(newLang) {
            this.selectedLanguage = newLang;
            localStorage.setItem('tandemApp_selectedLanguage', newLang);
        }
    }]);

    return LanguageService;
}();

LanguageService.$inject = [];

exports.LanguageService = LanguageService;
//# sourceMappingURL=language-service.js.map

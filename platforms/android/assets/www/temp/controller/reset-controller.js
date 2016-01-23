'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResetController = function () {
    function ResetController(languageSettings, LanguageService, DataService, encKey) {
        _classCallCheck(this, ResetController);

        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        this.DataService = DataService;
        this.encKey = encKey;
        // local vars
        this.resetForm = {};
        this.formState = {
            submitted: false,
            error: false,
            success: false
        };
        this.language = this.LanguageService.selectedLanguage;
        this.userData = {
            username: '',
            lang_used: this.language
        };
    }

    _createClass(ResetController, [{
        key: 'submit',
        value: function submit() {
            var _this = this;

            this.formState.submitted = true;

            if (this.resetForm.$valid) {
                this.DataService.postReset(this.userData).then(function (data) {
                    if (data.data.toString() === 'true') {
                        _this.formState.error = false;
                        _this.formState.success = true;
                    } else {
                        _this.formState.error = true;
                        _this.formState.success = false;
                    }
                }, function () {
                    _this.formState.error = true;
                    _this.formState.success = false;
                });
            }
        }
    }]);

    return ResetController;
}();

ResetController.$inject = ['languageSettings', 'LanguageService', 'DataService', 'encKey'];

exports.ResetController = ResetController;
//# sourceMappingURL=reset-controller.js.map

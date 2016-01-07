'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyProfileController = function MyProfileController(languageSettings, LanguageService, ActivitiesService) {
	_classCallCheck(this, MyProfileController);

	// DI
	this.languageSettings = languageSettings;
	this.LanguageService = LanguageService;
	this.ActivitiesService = ActivitiesService;
	this.language = this.LanguageService.selectedLanguage;
};

MyProfileController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService'];

exports.MyProfileController = MyProfileController;
//# sourceMappingURL=my-profile-controller.js.map

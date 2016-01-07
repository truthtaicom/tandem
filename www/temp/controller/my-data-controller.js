'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyDataController = function MyDataController(languageSettings, LanguageService, ActivitiesService) {
	_classCallCheck(this, MyDataController);

	// DI
	this.languageSettings = languageSettings;
	this.LanguageService = LanguageService;
	this.ActivitiesService = ActivitiesService;
	// local vars
	this.userData = localStorage.getItem('tandemApp_userData') ? localStorage.getItem('tandemApp_userData') : {
		name: 'Hans',
		email: '',
		zip: '',
		city: '',
		description: '',
		lang_have: this.ActivitiesService.offerId,
		lang_seek: this.ActivitiesService.searchId
	};
	this.language = this.LanguageService.selectedLanguage;
};

MyDataController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService'];

exports.MyDataController = MyDataController;
//# sourceMappingURL=my-data-controller.js.map

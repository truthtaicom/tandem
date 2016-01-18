'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyDataController = (function () {
	function MyDataController(languageSettings, LanguageService, ActivitiesService, DataService) {
		_classCallCheck(this, MyDataController);

		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.DataService = DataService;
		// local vars
		this.myDataForm = {};
		this.submitted = false;
		this.userData = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')) : {
			name: '',
			email: '',
			zip: '',
			city: '',
			description: '',
			lang_have: this.ActivitiesService.offerId,
			lang_seek: this.ActivitiesService.searchId
		};
		this.language = this.LanguageService.selectedLanguage;
		this.activities = this.ActivitiesService.activities;
		this.offerObj = this.ActivitiesService.offerObj;
		this.searchObj = this.ActivitiesService.searchObj;
	}

	_createClass(MyDataController, [{
		key: 'changeOffer',
		value: function changeOffer() {
			this.ActivitiesService.offerId = this.offerObj.id;
			this.ActivitiesService.update();
		}
	}, {
		key: 'changeSearch',
		value: function changeSearch() {
			this.ActivitiesService.searchId = this.searchObj.id;
			this.ActivitiesService.update();
		}
	}, {
		key: 'submitForm',
		value: function submitForm() {
			console.log('submitForm');
			this.submitted = true;
			//console.log('this.userData : ', this.userData);
			this.DataService.postChange(this.userData).then(function () {
				console.log('SUCCESS');
			}, function () {
				console.log('ERROR');
			});
		}
	}]);

	return MyDataController;
})();

MyDataController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService', 'DataService'];

exports.MyDataController = MyDataController;
//# sourceMappingURL=my-data-controller.js.map

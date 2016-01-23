'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyDataController = function () {
	function MyDataController(languageSettings, LanguageService, ActivitiesService, DataService, FilterService) {
		_classCallCheck(this, MyDataController);

		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.DataService = DataService;
		this.FilterService = FilterService;
		// local vars
		this.myDataForm = {};
		this.formState = {
			submitted: false,
			success: false,
			error: false
		};
		this.userData = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')) : {
			name: '',
			email: '',
			zip: '',
			city: '',
			description: '',
			lang_have_id: this.ActivitiesService.offerId,
			lang_seek_id: this.ActivitiesService.searchId
		};
		this.language = this.LanguageService.selectedLanguage;
		this.activities = this.ActivitiesService.activities;
		this.updateLangObjects();
	}

	_createClass(MyDataController, [{
		key: 'updateLangObjects',
		value: function updateLangObjects() {
			this.lang_have = this.FilterService.filterObjectFromArray(this.activities, 'id', this.userData.lang_have_id);
			this.lang_seek = this.FilterService.filterObjectFromArray(this.activities, 'id', this.userData.lang_seek_id);
		}
	}, {
		key: 'submitForm',
		value: function submitForm() {
			var _this = this;

			/*
    * set form to submitted = true
    */
			this.formState.submitted = true;
			if (this.myDataForm.$valid) {
				/*
     * update lang_have_id && lang_seek_id
     */
				this.userData.lang_have_id = this.lang_have.id;
				this.userData.lang_seek_id = this.lang_seek.id;
				/*
     * submit
     */
				if (typeof this.userData.token !== 'undefined') {
					/**
      * change / update
      */
					this.DataService.postChange(this.userData).then(function (data) {
						if (data.data.toString() === 'true') {
							localStorage.setItem('tandemApp_userData', JSON.stringify(_this.userData));
							_this.formState.success = true;
							_this.formState.error = false;
						} else {
							_this.formState.success = false;
							_this.formState.error = true;
						}
					}, function () {
						_this.formState.success = false;
						_this.formState.error = true;
					});
				} else {
					/**
      * register
      */
					this.userData.lat = typeof window.latitude !== 'undefined' ? window.latitude : 0;
					this.userData.lon = typeof window.longitude !== 'undefined' ? window.longitude : 0;
					this.userData.lang_used = this.language;
					this.DataService.postRegistration(this.userData).then(function (data) {
						if (typeof data.data.token !== 'undefined') {
							_this.userData = data.data;
							localStorage.setItem('tandemApp_userData', JSON.stringify(_this.userData));
							_this.formState.success = true;
							_this.formState.error = false;
						} else {
							_this.formState.success = false;
							_this.formState.error = true;
						}
					}, function () {
						_this.formState.success = false;
						_this.formState.error = true;
					});
				}
			}
		}
	}]);

	return MyDataController;
}();

MyDataController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService', 'DataService', 'FilterService'];

exports.MyDataController = MyDataController;
//# sourceMappingURL=my-data-controller.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = (function () {
	function LoginController(languageSettings, LanguageService, $location, DataService, encKey) {
		_classCallCheck(this, LoginController);

		// DI
		this.languageSettings = languageSettings;
		this.LanguageService = LanguageService;
		this.DataService = DataService;
		this.encKey = encKey;
		this.$location = $location;
		// local vars
		this.loginForm = {};
		this.formState = {
			submitted: false,
			error: false
		};
		this.userData = {
			username: '',
			password: ''
		};
		this.token = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).token : null;
		if (this.token) {
			this.$location.path('/settings');
		}
	}

	_createClass(LoginController, [{
		key: 'submit',
		value: function submit() {
			var _this = this;

			var postData = {
				username: window.GibberishAES.enc(this.userData.username, this.encKey),
				password: window.GibberishAES.enc(this.userData.password, this.encKey)
			};
			this.formState.submitted = true;

			if (this.loginForm.$valid) {
				this.DataService.postLogin(postData).then(function (data) {
					if (data.data.toString() !== 'false') {
						var userData = data.data;
						userData.email = _this.userData.username;
						localStorage.setItem('tandemApp_userData', JSON.stringify(userData));
						_this.$location.path('/settings');
					} else {
						_this.formState.error = true;
					}
				}, function () {
					_this.formState.error = true;
				});
			}
		}
	}]);

	return LoginController;
})();

LoginController.$inject = ['languageSettings', 'LanguageService', '$location', 'DataService', 'encKey'];

exports.LoginController = LoginController;
//# sourceMappingURL=login-controller.js.map

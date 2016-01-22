(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _de = require('./data/positions/de');

var _activities = require('./data/activities/activities');

var _mainController = require('./controller/main-controller');

var _searchController = require('./controller/search-controller');

var _settingsController = require('./controller/settings-controller');

var _myDataController = require('./controller/my-data-controller');

var _loginController = require('./controller/login-controller');

var _resetController = require('./controller/reset-controller');

var _alertController = require('./controller/alert-controller');

var _footerController = require('./controller/footer-controller');

var _translationDirective = require('./directives/translation-directive');

var _tandemProfileDirective = require('./directives/tandem-profile-directive');

var _dataService = require('./services/data-service');

var _activitiesService = require('./services/activities-service');

var _filterService = require('./services/filter-service');

var _languageService = require('./services/language-service');

var _alertService = require('./services/alert-service');

var _positionService = require('./services/position-service');

// services

// directives

// controller
// data

angular.module('tandemApp', ['ngRoute', 'ui.slider']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    }).when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchController',
        controllerAs: 'search'
    }).when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
    }).when('/data', {
        templateUrl: 'views/my-data.html',
        controller: 'MyDataController',
        controllerAs: 'mydata'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
    }).when('/reset', {
        templateUrl: 'views/reset.html',
        controller: 'ResetController',
        controllerAs: 'reset'
    }).when('/impressum', {
        templateUrl: 'views/impressum.html'
    }).when('/datenschutz', {
        templateUrl: 'views/datenschutz.html'
    }).otherwise({
        redirectTo: '/'
    });
}]).constant('restApiUrl', 'http://cafelingo.de/private/api/tandem/').constant('languageSettings', [{ id: 'de', name: 'Deutsch' }, { id: 'en', name: 'English' }]).constant('encKey', '2343desdfsf!"§$ffds44').constant('defaultDistance', 10).constant('maxDistance', 100).constant('svgIcon', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">' + '<path d="M311.413 351.368c-11.055-1.759-11.307-32.157-11.307-32.157s32.484-32.158 39.564-75.401c19.045 0 30.809-45.973 11.761-62.148 0.795-17.027 24.48-133.662-95.431-133.662s-96.225 116.635-95.432 133.662c-19.047 16.175-7.285 62.148 11.761 62.148 7.079 43.243 39.564 75.401 39.564 75.401s-0.252 30.398-11.307 32.157c-35.61 5.666-168.586 64.317-168.586 128.632h448c0-64.315-132.976-122.966-168.587-128.632z"></path>' + '</svg>').constant('positionsData', _de.positionsData).constant('activitiesData', _activities.activitiesData).run(function () {}).controller('MainController', _mainController.MainController).controller('SearchController', _searchController.SearchController).controller('SettingsController', _settingsController.SettingsController).controller('MyDataController', _myDataController.MyDataController).controller('LoginController', _loginController.LoginController).controller('ResetController', _resetController.ResetController).controller('AlertController', _alertController.AlertController).controller('FooterController', _footerController.FooterController).service('ActivitiesService', _activitiesService.ActivitiesService).service('FilterService', _filterService.FilterService).service('LanguageService', _languageService.LanguageService).service('AlertService', _alertService.AlertService).service('DataService', _dataService.DataService).service('PositionService', _positionService.PositionService).directive('myTranslation', _translationDirective.TranslationDirective.directiveFactory).directive('tandemProfile', _tandemProfileDirective.TandemProfileDirective.directiveFactory);


},{"./controller/alert-controller":2,"./controller/footer-controller":3,"./controller/login-controller":4,"./controller/main-controller":5,"./controller/my-data-controller":6,"./controller/reset-controller":7,"./controller/search-controller":8,"./controller/settings-controller":9,"./data/activities/activities":10,"./data/positions/de":11,"./directives/tandem-profile-directive":12,"./directives/translation-directive":13,"./services/activities-service":14,"./services/alert-service":15,"./services/data-service":16,"./services/filter-service":17,"./services/language-service":18,"./services/position-service":19}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertController = function AlertController($rootScope, LanguageService, AlertService) {
	var _this = this;

	_classCallCheck(this, AlertController);

	// DI
	this.$rootScope = $rootScope;
	this.AlertService = AlertService;
	this.alerts = this.AlertService.alerts;
	this.LanguageService = LanguageService;
	this.language = this.LanguageService.selectedLanguage;
	this.$rootScope.$on('show-alert', function () {
		_this.alerts = _this.AlertService.alerts;
	});
};

AlertController.$inject = ['$rootScope', 'LanguageService', 'AlertService'];

exports.AlertController = AlertController;


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterController = function FooterController($rootScope, $location) {
	var _this = this;

	_classCallCheck(this, FooterController);

	/*
  * $scope , da auch in index.html in bottom links
  */
	this.location = $location.$$path;
	$rootScope.$on('$routeChangeStart', function () {
		_this.location = $location.$$path;
	});
};

FooterController.$inject = ['$rootScope', '$location'];

exports.FooterController = FooterController;


},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
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
                        // save as temp var
                        var userData = data.data;
                        // add email
                        userData.email = _this.userData.username;
                        // overwrite old data
                        _this.userData = userData;
                        // and save in localstorage
                        localStorage.setItem('tandemApp_userData', JSON.stringify(_this.userData));
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
}();

LoginController.$inject = ['languageSettings', 'LanguageService', '$location', 'DataService', 'encKey'];

exports.LoginController = LoginController;


},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = function () {
	function MainController($rootScope, $timeout, ActivitiesService, LanguageService, positionsData, AlertService, PositionService) {
		_classCallCheck(this, MainController);

		// DI
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.LanguageService = LanguageService;
		this.ActivitiesService = ActivitiesService;
		this.positions = positionsData;
		this.AlertService = AlertService;
		this.PositionService = PositionService;
		// local vars
		this.positions[0].name = this.LanguageService.selectedLanguage === 'de' ? 'meiner Position' : 'my position';
		this.language = this.LanguageService.selectedLanguage;
		this.activities = this.ActivitiesService.activities;
		this.offerObj = this.ActivitiesService.offerObj;
		this.searchObj = this.ActivitiesService.searchObj;
		this.chosenPosition = this.PositionService.chosenPosition;
		this.showAlert();
	}

	_createClass(MainController, [{
		key: 'showAlert',
		value: function showAlert() {
			var _this = this;

			this.PositionService.updatePosition();
			if (!this.chosenPosition.longitude || !this.chosenPosition.latitude) {
				window.tandemAppConfig.geoLocation();
				this.AlertService.alerts.retrieving_position = true;
				this.$rootScope.$broadcast('show-alert');
				this.$timeout(function () {
					_this.showAlert();
				}, 2000, true);
			} else {
				this.AlertService.alerts.retrieving_position = false;
				this.$rootScope.$broadcast('show-alert');
			}
		}
	}, {
		key: 'changeOffer',
		value: function changeOffer() {
			this.ActivitiesService.offerId = this.offerObj.id;
			this.ActivitiesService.update();
			this.showAlert();
		}
	}, {
		key: 'changeSearch',
		value: function changeSearch() {
			this.ActivitiesService.searchId = this.searchObj.id;
			this.ActivitiesService.update();
			this.showAlert();
		}
	}, {
		key: 'changePosition',
		value: function changePosition() {
			this.PositionService.update(this.chosenPosition);
			this.showAlert();
		}
	}]);

	return MainController;
}();

MainController.$inject = ['$rootScope', '$timeout', 'ActivitiesService', 'LanguageService', 'positionsData', 'AlertService', 'PositionService'];

exports.MainController = MainController;


},{}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchController = function () {
	function SearchController($rootScope, $timeout, svgIcon, $location, defaultDistance, maxDistance, languageSettings, ActivitiesService, LanguageService, DataService, AlertService, PositionService) {
		var _this = this;

		_classCallCheck(this, SearchController);

		//local
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.height = window.innerHeight - 110; //for global_alerts & slider & footer
		this.width = window.innerWidth;
		this.centerY = parseInt(this.height / 2, 10);
		this.centerX = parseInt(this.width / 2, 10);
		this.svg = svgIcon;
		this.svgWidth = 25;
		// DI
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.$location = $location;
		this.languageSettings = languageSettings;
		this.ActivitiesService = ActivitiesService;
		this.LanguageService = LanguageService;
		this.selectedDistance = defaultDistance;
		this.lastSelectedDistance = defaultDistance;
		this.maxDistance = maxDistance;
		this.AlertService = AlertService;
		this.PositionService = PositionService;
		this.$rootScope.$broadcast('show-alert');
		this.searchResults = {};
		this.tandemData = {};
		this.drawRadar();
		if (!this.PositionService.chosenPosition.latitude || !this.PositionService.chosenPosition.longitude) {
			this.AlertService.alerts.retrieving_searchresults = false;
			this.$location.path('/');
		} else if (parseInt(localStorage.getItem('tandemApp_lastSearch_offerId')) === parseInt(localStorage.getItem('tandemApp_activities_offerId')) && parseInt(localStorage.getItem('tandemApp_lastSearch_searchId')) === parseInt(localStorage.getItem('tandemApp_activities_searchId')) && this.PositionService.chosenPosition.longitude.toString() === localStorage.getItem('tandemApp_lastSearch_longitude') && this.PositionService.chosenPosition.latitude.toString() === localStorage.getItem('tandemApp_lastSearch_latitude') && localStorage.getItem('tandemApp_lastSearch_results') // actually have the result
		) {
				this.searchResults = JSON.parse(localStorage.getItem('tandemApp_lastSearch_results'));
				this.drawUsers();
			} else {
			this.AlertService.alerts.retrieving_searchresults = true;
			DataService.getResults().then(function (data) {
				_this.AlertService.alerts.retrieving_searchresults = false;
				_this.$rootScope.$broadcast('show-alert');
				if (data && data.data.length > 0) {
					var randomize = _this.randomizeResults();
					_this.searchResults = randomize(data.data);
					localStorage.setItem('tandemApp_lastSearch_offerId', _this.ActivitiesService.offerObj.id);
					localStorage.setItem('tandemApp_lastSearch_searchId', _this.ActivitiesService.searchObj.id);
					localStorage.setItem('tandemApp_lastSearch_latitude', _this.PositionService.chosenPosition.latitude);
					localStorage.setItem('tandemApp_lastSearch_longitude', _this.PositionService.chosenPosition.longitude);
					localStorage.setItem('tandemApp_lastSearch_results', JSON.stringify(_this.searchResults));
					_this.drawUsers();
				}
			});
		}
	}

	_createClass(SearchController, [{
		key: 'changeDistance',
		value: function changeDistance() {
			var _this2 = this;

			/*
    * wait 2 seconds to see if the user actually changed the distance
    */
			this.$timeout(function () {
				if (_this2.lastSelectedDistance !== _this2.selectedDistance) {
					_this2.drawRadar();
					_this2.drawUsers();
					_this2.lastSelectedDistance = _this2.selectedDistance;
				}
			}, 2000);
		}
	}, {
		key: 'getOffset',
		value: function getOffset(selectDistance, resultDistance) {
			var x = Math.random() * (this.width - 2),
			    y = Math.random() * (this.height - 2),
			    x2 = x / 2,
			    y2 = y / 2,
			    quote = resultDistance / selectDistance;
			return [x2 * quote, y2 * quote];
		}
	}, {
		key: 'drawImage',
		value: function drawImage(id, x, y) {
			var _this3 = this;

			var mySvg = undefined,
			    mySrc = undefined,
			    source = undefined;
			mySvg = this.svg;
			mySrc = 'data:image/svg+xml;base64,' + window.btoa(mySvg);
			source = new Image();
			source.id = 'user_' + id;
			source.src = mySrc;
			source.onload = function () {
				_this3.context.globalAlpha = 0.8;
				_this3.context.drawImage(source, x, y, _this3.svgWidth, _this3.svgWidth);
				_this3.context.restore();
			};
			return source;
		}
	}, {
		key: 'randomizeResults',
		value: function randomizeResults() {
			var _this4 = this;

			return function (data) {
				var resultArray = [];
				for (var resultArrayCounter = 0; resultArrayCounter < data.length; resultArrayCounter++) {
					var percentX = 0,
					    percentY = 0,
					    offset = _this4.getOffset(_this4.maxDistance, data[resultArrayCounter].distance, resultArrayCounter),
					    offsetX = offset[0],
					    offsetY = offset[1],
					    randomDirection = parseInt(Math.random() * 4 + 1, 10);

					percentX = offsetX / (_this4.width / 2) * 100;
					percentY = offsetY / (_this4.height / 2) * 100;
					data[resultArrayCounter].percentX = percentX;
					data[resultArrayCounter].percentY = percentY;
					data[resultArrayCounter].randomDirection = randomDirection;
					resultArray.push(data[resultArrayCounter]);
				}
				return resultArray;
			};
		}
	}, {
		key: 'drawRadar',
		value: function drawRadar() {
			var _this5 = this;

			if (document.getElementById('forRadar')) {
				/*
     * delete existing canvases
     */
				document.getElementById('forRadar').innerHTML = '';

				if (document.getElementById('forRadar').children.length > 0) {
					document.getElementById('forRadar').children[0].remove();
				}

				var radius = 10,
				    radarRingCounter = 0,
				    minRadiusFor5Rings = parseInt(this.width, 10) / 1.2 / 5;

				this.canvas.setAttribute('width', this.width);
				this.canvas.setAttribute('height', this.height);
				this.canvas.setAttribute('style', 'position: absolute; x:0; y:0;');

				document.getElementById('forRadar').appendChild(this.canvas);

				this.context.clearRect(0, 0, this.width, this.height);

				this.context.beginPath();
				this.context.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
				this.context.fillStyle = '#000';
				this.context.fill();
				this.context.stroke();

				for (radarRingCounter = 0; radarRingCounter < 5; radarRingCounter++) {
					this.context.beginPath();
					this.context.arc(this.centerX, this.centerY, minRadiusFor5Rings * radarRingCounter, 0, 2 * Math.PI, false);
					if (radarRingCounter < 4) {
						this.context.fill();
						this.context.fillStyle = '#8bc717';
						this.context.globalAlpha = parseFloat(radarRingCounter / 10) - 0.1;
					}
					this.context.stroke();
				}

				this.canvas.onclick = function (e) {

					var thisX = parseInt(e.clientX, 10),
					    thisY = parseInt(e.clientY, 10);

					angular.forEach(_this5.searchResults, function (result) {
						/*
       * check if any of the people in the array have the coordinates clicked
       * (+/- 5px as this is the radius)
       * AND
       *  --- substract 60 px because of header !!! ---> 0 at the moment
       * (look above : we substracted 120px from total height)
       */
						if (parseInt(result.x) + parseInt(_this5.svgWidth) >= thisX && result.x <= thisX && parseInt(result.y) + parseInt(_this5.svgWidth) >= thisY - 60 && result.y <= thisY - 60) {
							//currentProfileIndex=i;
							console.log('User ', result);
							//this.$location.path('#tandem/' + result.id);
							_this5.$timeout(function () {
								//this.$location.path('/iii');
								//console.log('this.$location : ', this.$location);
								_this5.tandemData = result;
							});
							//localStorage.setItem('tandemApp_lastSearch_tandemData', JSON.stringify(result));
							//this.$rootScope.$broadcast('tandem-data-found');
						}
					});
				};
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'drawUsers',
		value: function drawUsers() {
			var done = false;
			for (var resultArrayCounter = 0; resultArrayCounter < this.searchResults.length; resultArrayCounter++) {
				var newX,
				    newY,
				    forX = this.maxDistance / parseInt(this.selectedDistance, 10) * this.searchResults[resultArrayCounter].percentX,
				    forY = this.maxDistance / parseInt(this.selectedDistance, 10) * this.searchResults[resultArrayCounter].percentY,
				    offsetX = forX,
				    // (forX * 100) / (width / 2), //apply the percent to half the width (x)
				offsetY = forY,
				    //(forY * 100) / (height / 2), //apply the percent to half the height (x)
				randomDirection = this.searchResults[resultArrayCounter].randomDirection;
				/*
     * show only results with 100% or less (if magnified)
     */
				if (parseInt(offsetX / 2, 10) <= 100 && parseInt(offsetY / 2, 10) <= 100) {
					switch (randomDirection) {
						case 1:
							newX = parseInt(this.centerX + offsetX, 10);
							newY = parseInt(this.centerY + offsetY, 10);
							break;
						case 2:
							newX = parseInt(this.centerX - offsetX, 10);
							newY = parseInt(this.centerY - offsetY, 10);
							break;
						case 3:
							newX = parseInt(this.centerX + offsetX, 10);
							newY = parseInt(this.centerY - offsetY, 10);
							break;
						case 4:
							newX = parseInt(this.centerX - offsetX, 10);
							newY = parseInt(this.centerY + offsetY, 10);
							break;
						default:
							newX = parseInt(this.centerX + 0, 10);
							newY = parseInt(this.centerY + 0, 10);
							break;
					}
					/*
      * -> resultArray.push coordinates
      */
					this.searchResults[resultArrayCounter].x = newX;
					this.searchResults[resultArrayCounter].y = newY;
					this.drawImage(this.searchResults[resultArrayCounter].tandem_id, this.searchResults[resultArrayCounter].x, this.searchResults[resultArrayCounter].y);
				}
				if (parseInt(resultArrayCounter) + 1 === this.searchResults.length) {
					done = true;
				}
			}
			return done;
		}
	}]);

	return SearchController;
}();

SearchController.$inject = ['$rootScope', '$timeout', 'svgIcon', '$location', 'defaultDistance', 'maxDistance', 'languageSettings', 'ActivitiesService', 'LanguageService', 'DataService', 'AlertService', 'PositionService'];

exports.SearchController = SearchController;


},{}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = function () {
    function SettingsController(languageSettings, LanguageService, ActivitiesService) {
        _classCallCheck(this, SettingsController);

        // DI
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        this.ActivitiesService = ActivitiesService;
        // local vars
        this.language = this.LanguageService.selectedLanguage;
        this.data = {
            availableOptions: this.languageSettings,
            selectedOption: this.language === 'de' ? this.languageSettings[0] : this.languageSettings[1]
        };
        this.token = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')).token : null;
    }

    _createClass(SettingsController, [{
        key: 'changeLanguage',
        value: function changeLanguage(id) {
            this.language = id;
            this.LanguageService.resetLanguage(this.language);
            //TODO : reload app
            //window.location.reload();
        }
    }, {
        key: 'logout',
        value: function logout() {
            localStorage.removeItem('tandemApp_userData');
            this.token = null;
            //TODO : reload app
            //window.location.reload();
        }
    }]);

    return SettingsController;
}();

SettingsController.$inject = ['languageSettings', 'LanguageService', 'ActivitiesService'];

exports.SettingsController = SettingsController;


},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var activitiesData = exports.activitiesData = [{
    'id': 1,
    'de': 'Afrikaans',
    'en': 'Afrikaans'
}, {
    'id': 2,
    'de': 'Albanisch',
    'en': 'Albanian'
}, {
    'id': 3,
    'de': 'Algerisch',
    'en': 'Algerian'
}, {
    'id': 4,
    'de': 'Amharisch',
    'en': 'Amharic'
}, {
    'id': 5,
    'de': 'Arabisch',
    'en': 'Arabic'
}, {
    'id': 6,
    'de': 'Armenisch',
    'en': 'Armenian'
}, {
    'id': 7,
    'de': 'Assamesich',
    'en': 'Assamese'
}, {
    'id': 8,
    'de': 'Aserbeidschanisch',
    'en': 'Azerbaijani'
}, {
    'id': 9,
    'de': 'Bahasa Indonesia',
    'en': 'Bahasa Indonesia'
}, {
    'id': 10,
    'de': 'Balinesisch',
    'en': 'Balinese'
}, {
    'id': 11,
    'de': 'Belorussisch',
    'en': 'Belarussian'
}, {
    'id': 12,
    'de': 'Bengalisch',
    'en': 'Bengali'
}, {
    'id': 13,
    'de': 'Berberisch',
    'en': 'Berber'
}, {
    'id': 14,
    'de': 'Bhojpuri',
    'en': 'Bhojpuri'
}, {
    'id': 15,
    'de': 'Bulgarisch',
    'en': 'Bulgarian'
}, {
    'id': 16,
    'de': 'Burmesisch',
    'en': 'Burmese'
}, {
    'id': 17,
    'de': 'Katalanisch',
    'en': 'Catalan'
}, {
    'id': 18,
    'de': 'Cebuanisch',
    'en': 'Cebuano'
}, {
    'id': 19,
    'de': 'Chinesich(Kantonesisch)',
    'en': 'Chinese (Cantonese)'
}, {
    'id': 20,
    'de': 'Chinesisch(Mandarin)',
    'en': 'Chinese (Mandarin)'
}, {
    'id': 21,
    'de': 'Chinesisch(Taiwanesisch)',
    'en': 'Chinese (Taiwanese)'
}, {
    'id': 22,
    'de': 'Chichewa',
    'en': 'Chichewa'
}, {
    'id': 23,
    'de': 'Kroatisch',
    'en': 'Croatian'
}, {
    'id': 24,
    'de': 'Tcheschich',
    'en': 'Czech'
}, {
    'id': 25,
    'de': 'Dänisch',
    'en': 'Danish'
}, {
    'id': 26,
    'de': 'Niederländisch',
    'en': 'Dutch'
}, {
    'id': 27,
    'de': 'Englisch',
    'en': 'English'
}, {
    'id': 28,
    'de': 'Estländisch',
    'en': 'Estonian'
}, {
    'id': 29,
    'de': 'Farsisch',
    'en': 'Farsi'
}, {
    'id': 30,
    'de': 'Filipino',
    'en': 'Filipino'
}, {
    'id': 31,
    'de': 'Finnisch',
    'en': 'Finnish'
}, {
    'id': 32,
    'de': 'FranzÃ¶sisch',
    'en': 'French'
}, {
    'id': 33,
    'de': 'Fula',
    'en': 'Fula'
}, {
    'id': 34,
    'de': 'Gälisch',
    'en': 'Gaelic'
}, {
    'id': 35,
    'de': 'Georgisch',
    'en': 'Georgian'
}, {
    'id': 36,
    'de': 'Deutsch',
    'en': 'German'
}, {
    'id': 37,
    'de': 'Griechisch',
    'en': 'Greek'
}, {
    'id': 38,
    'de': 'Guarani',
    'en': 'Guarani'
}, {
    'id': 39,
    'de': 'Gujaratisch',
    'en': 'Gujarati'
}, {
    'id': 40,
    'de': 'Haitianisch',
    'en': 'Haitian'
}, {
    'id': 41,
    'de': 'Hausa',
    'en': 'Hausa'
}, {
    'id': 42,
    'de': 'Hebräisch',
    'en': 'Hebrew'
}, {
    'id': 43,
    'de': 'Hindi',
    'en': 'Hindi'
}, {
    'id': 44,
    'de': 'Ungarisch',
    'en': 'Hungarian'
}, {
    'id': 45,
    'de': 'Islandisch',
    'en': 'Icelandic'
}, {
    'id': 46,
    'de': 'Indonesisch',
    'en': 'Indonesian'
}, {
    'id': 47,
    'de': 'Italienisch',
    'en': 'Italian'
}, {
    'id': 48,
    'de': 'Kreolisch',
    'en': 'Jamacian Creole'
}, {
    'id': 49,
    'de': 'Japanisch',
    'en': 'Japanese'
}, {
    'id': 50,
    'de': 'Javanisch',
    'en': 'Javanese'
}, {
    'id': 51,
    'de': 'Kannada',
    'en': 'Kannada'
}, {
    'id': 52,
    'de': 'Kaschmirisch',
    'en': 'Kashmiri'
}, {
    'id': 53,
    'de': 'Kasasisch',
    'en': 'Kazakh'
}, {
    'id': 54,
    'de': 'Khmer',
    'en': 'Khmer'
}, {
    'id': 55,
    'de': 'Kongo',
    'en': 'Kongo'
}, {
    'id': 56,
    'de': 'Koreanisch',
    'en': 'Korean'
}, {
    'id': 57,
    'de': 'Kurdisch',
    'en': 'Kurdish'
}, {
    'id': 58,
    'de': 'Lettisch',
    'en': 'Latvian'
}, {
    'id': 59,
    'de': 'Laotisch',
    'en': 'Lao'
}, {
    'id': 60,
    'de': 'Litauisch',
    'en': 'Lithuanian'
}, {
    'id': 61,
    'de': 'Langobardisch',
    'en': 'Lombard'
}, {
    'id': 62,
    'de': 'Maithili',
    'en': 'Maithili'
}, {
    'id': 63,
    'de': 'Madagassisch',
    'en': 'Malagasy'
}, {
    'id': 64,
    'de': 'Malayalam',
    'en': 'Malayalam'
}, {
    'id': 65,
    'de': 'Malaysisch',
    'en': 'Malaysian'
}, {
    'id': 66,
    'de': 'Marathi',
    'en': 'Marathi'
}, {
    'id': 67,
    'de': 'Mongolisch',
    'en': 'Mongolian'
}, {
    'id': 68,
    'de': 'Nepalisch',
    'en': 'Nepali'
}, {
    'id': 69,
    'de': 'Norwegisch',
    'en': 'Norwegian'
}, {
    'id': 70,
    'de': 'Oriya',
    'en': 'Oriya'
}, {
    'id': 71,
    'de': 'Oromo',
    'en': 'Oromo'
}, {
    'id': 72,
    'de': 'Paschtunisch',
    'en': 'Pashto'
}, {
    'id': 73,
    'de': 'Persisch',
    'en': 'Persian'
}, {
    'id': 74,
    'de': 'Polnisch',
    'en': 'Polish'
}, {
    'id': 75,
    'de': 'Portugisisch',
    'en': 'Portuguese'
}, {
    'id': 76,
    'de': 'Punjabi',
    'en': 'Punjabi'
}, {
    'id': 77,
    'de': 'Quechua',
    'en': 'Quechua'
}, {
    'id': 78,
    'de': 'Rumänisch',
    'en': 'Romanian'
}, {
    'id': 79,
    'de': 'Russisch',
    'en': 'Russian'
}, {
    'id': 80,
    'de': 'Ruandisch',
    'en': 'Rwandan'
}, {
    'id': 81,
    'de': 'Serbisch-Kroatisch',
    'en': 'Serbo-Crotatian'
}, {
    'id': 82,
    'de': 'Showa',
    'en': 'Showa'
}, {
    'id': 83,
    'de': 'Sindhi',
    'en': 'Sindhi'
}, {
    'id': 84,
    'de': 'Singhalesisch',
    'en': 'Sinhalese'
}, {
    'id': 85,
    'de': 'Slovakisch',
    'en': 'Slovak'
}, {
    'id': 86,
    'de': 'Somalisch',
    'en': 'Somali'
}, {
    'id': 87,
    'de': 'Songhay',
    'en': 'Songhay'
}, {
    'id': 88,
    'de': 'Sotho',
    'en': 'Sotho'
}, {
    'id': 89,
    'de': 'Spanisch',
    'en': 'Spanish'
}, {
    'id': 90,
    'de': 'Sri-Lankisch',
    'en': 'Sri Lankan'
}, {
    'id': 91,
    'de': 'Sudanesisch',
    'en': 'Sundanese'
}, {
    'id': 92,
    'de': 'Suaheli',
    'en': 'Swahili'
}, {
    'id': 93,
    'de': 'Schwedisch',
    'en': 'Swedish'
}, {
    'id': 94,
    'de': 'Tagalog',
    'en': 'Tagalog'
}, {
    'id': 95,
    'de': 'Tadschikisch',
    'en': 'Tajik'
}, {
    'id': 96,
    'de': 'Tamilisch',
    'en': 'Tamil'
}, {
    'id': 97,
    'de': 'Telugu',
    'en': 'Telugu'
}, {
    'id': 98,
    'de': 'Thailändisch',
    'en': 'Thai'
}, {
    'id': 99,
    'de': 'Tibetisch',
    'en': 'Tibetan'
}, {
    'id': 100,
    'de': 'Tunesisch',
    'en': 'Tunisian'
}, {
    'id': 101,
    'de': 'Türkisch',
    'en': 'Turkish'
}, {
    'id': 102,
    'de': 'Ukrainisch',
    'en': 'Ukranian'
}, {
    'id': 103,
    'de': 'Urdu',
    'en': 'Urdu'
}, {
    'id': 104,
    'de': 'Usbekisch',
    'en': 'Uzbek'
}, {
    'id': 105,
    'de': 'Vietnamesisch',
    'en': 'Vietnamese'
}, {
    'id': 106,
    'de': 'Walisisch',
    'en': 'Welsh'
}, {
    'id': 107,
    'de': 'Xhosa',
    'en': 'Xhosa'
}, {
    'id': 108,
    'de': 'Jiddisch',
    'en': 'Yiddish'
}, {
    'id': 109,
    'de': 'Yoruba',
    'en': 'Yoruba'
}, {
    'id': 110,
    'de': 'Zulu',
    'en': 'Zulu'
}];


},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var positionsData = exports.positionsData = [{
    id: 0,
    name: null,
    latitude: null,
    longitude: null
}, {
    id: 1,
    name: 'Aachen',
    latitude: 50.783,
    longitude: 6.083
}, {
    id: 2,
    name: 'Berlin',
    latitude: 52.523,
    longitude: 13.413
}, {
    id: 3,
    name: 'Hamburg',
    latitude: 53.567,
    longitude: 10.033
}, {
    id: 4,
    name: 'München',
    latitude: 48.133,
    longitude: 11.567
}, {
    id: 5,
    name: 'Köln',
    latitude: 50.950,
    longitude: 6.950
}, {
    id: 6,
    name: 'Frankfurt am Main',
    latitude: 50.117,
    longitude: 8.683
}, {
    id: 7,
    name: 'Stuttgart',
    latitude: 48.783,
    longitude: 9.183
}, {
    id: 8,
    name: 'Düsseldorf',
    latitude: 51.233,
    longitude: 6.783
}, {
    id: 9,
    name: 'Dortmund',
    latitude: 51.517,
    longitude: 7.467
}, {
    id: 10,
    name: 'Essen',
    latitude: 51.467,
    longitude: 7.017
}, {
    id: 11,
    name: 'Bremen',
    latitude: 53.083,
    longitude: 8.817
}, {
    id: 12,
    name: 'Dresden',
    latitude: 51.050,
    longitude: 13.739
}, {
    id: 13,
    name: 'Leipzig',
    latitude: 51.339,
    longitude: 12.377
}, {
    id: 14,
    name: 'Hannover',
    latitude: 52.383,
    longitude: 9.733
}, {
    id: 15,
    name: 'Nürnberg',
    latitude: 49.450,
    longitude: 11.083
}, {
    id: 16,
    name: 'Bochum',
    latitude: 51.483,
    longitude: 7.217
}, {
    id: 17,
    name: 'Wuppertal',
    latitude: 51.267,
    longitude: 7.200
}, {
    id: 18,
    name: 'Bielefeld',
    latitude: 52.017,
    longitude: 8.533
}, {
    id: 19,
    name: 'Bonn',
    latitude: 50.733,
    longitude: 7.100
}, {
    id: 20,
    name: 'Münster',
    latitude: 49.933,
    longitude: 8.867
}, {
    id: 21,
    name: 'Karlsruhe',
    latitude: 49.017,
    longitude: 8.400
}, {
    id: 22,
    name: 'Mannheim',
    latitude: 49.483,
    longitude: 8.467
}, {
    id: 23,
    name: 'Augsburg',
    latitude: 48.367,
    longitude: 10.900
}, {
    id: 24,
    name: 'Wiesbaden',
    latitude: 50.100,
    longitude: 8.233
}, {
    id: 25,
    name: 'Gelsenkirchen',
    latitude: 51.550,
    longitude: 7.100
}, {
    id: 26,
    name: 'Mönchengladbach',
    latitude: 51.200,
    longitude: 6.433
}, {
    id: 27,
    name: 'Braunschweig',
    latitude: 52.267,
    longitude: 10.533
}, {
    id: 28,
    name: 'Chemnitz',
    latitude: 50.830,
    longitude: 12.917
}, {
    id: 29,
    name: 'Kiel',
    latitude: 54.333,
    longitude: 10.133
}, {
    id: 30,
    name: 'Halle (Saale)',
    latitude: 51.479,
    longitude: 11.978
}, {
    id: 31,
    name: 'Magdeburg',
    latitude: 52.122,
    longitude: 11.619
}, {
    id: 32,
    name: 'Krefeld',
    latitude: 51.333,
    longitude: 6.567
}, {
    id: 33,
    name: 'Freiburg (im Breisgau)',
    latitude: 48.000,
    longitude: 7.850
}, {
    id: 34,
    name: 'Lübeck',
    latitude: 53.867,
    longitude: 10.683
}, {
    id: 35,
    name: 'Oberhausen',
    latitude: 51.483,
    longitude: 6.867
}, {
    id: 36,
    name: 'Erfurt',
    latitude: 50.986,
    longitude: 11.022
}, {
    id: 37,
    name: 'Rostock',
    latitude: 54.089,
    longitude: 12.125
}, {
    id: 38,
    name: 'Mainz',
    latitude: 50.000,
    longitude: 8.267
}, {
    id: 39,
    name: 'Kassel',
    latitude: 51.317,
    longitude: 9.500
}];


},{}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TandemProfileDirective = function () {
    function TandemProfileDirective() {
        _classCallCheck(this, TandemProfileDirective);

        this.restrict = 'A';
        this.transclude = true;
        this.templateUrl = '../views/tandem-data.html'; //'<span>{{tandemProfile.tandemData}}</span>';
        this.scope = {};
        this.bindToController = {
            'tandemData': '='
        };
        this.controllerAs = 'tandemProfile';
        this.controller = function (DataService) {
            var _this = this;

            this.close = function () {
                delete this.tandemData;
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
            this.myTandemForm = {};
            this.formState = {
                submitted: false,
                error: false,
                success: false
            };
            this.formData = {
                tandem_id: this.tandemData.tandem_id,
                name: this.userData.name,
                email: this.userData.email,
                text: ''
            };
            this.submitForm = function () {
                _this.formState.submitted = true;
                console.log('this.myTandemForm.$valid : ', _this.myTandemForm.$valid);
                if (_this.myTandemForm.$valid) {
                    DataService.contactTandem(_this.formData).then(function (returnData) {
                        console.log('returnData : ', returnData);
                        if (returnData.data && returnData.data.toString() === 'true') {
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
            };
        };
    }

    _createClass(TandemProfileDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory(DataService) {
            TandemProfileDirective.instance = new TandemProfileDirective(DataService);
            return TandemProfileDirective.instance;
        }
    }]);

    return TandemProfileDirective;
}();

TandemProfileDirective.$inject = ['DataService'];

exports.TandemProfileDirective = TandemProfileDirective;


},{}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActivitiesService = function () {
    function ActivitiesService(activitiesData, FilterService, LanguageService) {
        _classCallCheck(this, ActivitiesService);

        // DI
        this.activitiesData = activitiesData;
        this.FilterService = FilterService;
        this.LanguageService = LanguageService;
        // internal vars
        this.offerId = localStorage.getItem('tandemApp_activities_offerId') ? localStorage.getItem('tandemApp_activities_offerId') : 36; // 36 === deutsch
        this.searchId = localStorage.getItem('tandemApp_activities_searchId') ? localStorage.getItem('tandemApp_activities_searchId') : 36; // 36 === deutsch
        this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
        this.offerObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.offerId);
        this.searchObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.searchId);
    }

    _createClass(ActivitiesService, [{
        key: 'updateActivities',
        value: function updateActivities() {
            this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
            this.update();
        }
    }, {
        key: 'update',
        value: function update() {
            localStorage.setItem('tandemApp_activities_offerId', this.offerId);
            this.offerObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.offerId);
            localStorage.setItem('tandemApp_activities_searchId', this.searchId);
            this.searchObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.searchId);
        }
    }]);

    return ActivitiesService;
}();

ActivitiesService.$inject = ['activitiesData', 'FilterService', 'LanguageService'];

exports.ActivitiesService = ActivitiesService;


},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertService = function AlertService() {
    _classCallCheck(this, AlertService);

    // push into them !
    this.alerts = {
        retrieving_position: false,
        retrieving_searchresults: false
    };
};

AlertService.$inject = [];

exports.AlertService = AlertService;


},{}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataService = function () {
	function DataService($http, restApiUrl, ActivitiesService, PositionService, maxDistance) {
		_classCallCheck(this, DataService);

		// DI
		this.$http = $http;
		this.restApiUrl = restApiUrl;
		this.ActivitiesService = ActivitiesService;
		this.PositionService = PositionService;
		this.maxDistance = maxDistance;
	}

	_createClass(DataService, [{
		key: 'getResults',
		value: function getResults() {
			return this.$http.get(this.restApiUrl + 'retrieve_active' + '?lat=' + this.PositionService.chosenPosition.latitude + '&lon=' + this.PositionService.chosenPosition.longitude + '&max=' + this.maxDistance + '&offer_id=' + this.ActivitiesService.offerId + '&search_id=' + this.ActivitiesService.searchId + '&time=' + new Date().getTime());
		}
	}, {
		key: 'postLogin',
		value: function postLogin(data) {
			return this.$http.post(this.restApiUrl + 'login' + '?time=' + new Date().getTime(), data);
		}
	}, {
		key: 'postReset',
		value: function postReset(data) {
			return this.$http.post(this.restApiUrl + 'reset' + '?time=' + new Date().getTime(), data);
		}
	}, {
		key: 'postChange',
		value: function postChange(data) {
			return this.$http.post(this.restApiUrl + 'change' + '?time=' + new Date().getTime(), data);
		}
	}, {
		key: 'postRegistration',
		value: function postRegistration(data) {
			return this.$http.post(this.restApiUrl + 'register' + '?time=' + new Date().getTime(), data);
		}
	}, {
		key: 'contactTandem',
		value: function contactTandem(data) {
			return this.$http.post(this.restApiUrl + 'contact_tandem' + '?time=' + new Date().getTime(), data);
		}
	}]);

	return DataService;
}();

DataService.$inject = ['$http', 'restApiUrl', 'ActivitiesService', 'PositionService', 'maxDistance'];

exports.DataService = DataService;


},{}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterService = function () {
    function FilterService() {
        _classCallCheck(this, FilterService);
    }

    _createClass(FilterService, [{
        key: 'filterArray',
        value: function filterArray(arr, prop) {
            var newArray = [];
            angular.forEach(arr, function (_val) {
                newArray.push({ id: _val['id'], 'name': _val[prop] });
            });
            return newArray;
        }
    }, {
        key: 'filterObjectFromArray',
        value: function filterObjectFromArray(arr, prop, val) {
            var returnObj = {};
            angular.forEach(arr, function (_val) {
                if (parseInt(_val[prop]) === parseInt(val)) {
                    returnObj = _val;
                }
            });
            return returnObj;
        }
    }]);

    return FilterService;
}();

FilterService.$inject = [];

exports.FilterService = FilterService;


},{}],18:[function(require,module,exports){
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


},{}],19:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PositionService = function () {
	function PositionService(positionsData) {
		_classCallCheck(this, PositionService);

		// DI
		this.positionsData = positionsData;
		// local vars
		this.chosenPosition = localStorage.getItem('tandemApp_position') ? JSON.parse(localStorage.getItem('tandemApp_position')) : this.positionsData[2]; //Berlin
	}

	_createClass(PositionService, [{
		key: 'updatePosition',
		value: function updatePosition() {
			if (parseInt(this.chosenPosition.id) === 0) {
				this.chosenPosition.latitude = typeof window.latitude !== 'undefined' && window.latitude ? window.latitude : null;
				this.chosenPosition.longitude = typeof window.longitude !== 'undefined' && window.longitude ? window.longitude : null;
			}
		}
	}, {
		key: 'update',
		value: function update(posObj) {
			this.chosenPosition = posObj;
			localStorage.setItem('tandemApp_position', JSON.stringify(posObj));
		}
	}]);

	return PositionService;
}();

PositionService.$inject = ['positionsData'];

exports.PositionService = PositionService;


},{}]},{},[1]);

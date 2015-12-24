(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _de = require('./data/positions/de');

var _activities = require('./data/activities/activities');

var _mainController = require('./controller/main-controller');

var _searchController = require('./controller/search-controller');

var _settingsController = require('./controller/settings-controller');

var _alertController = require('./controller/alert-controller');

var _footerController = require('./controller/footer-controller');

var _translationDirective = require('./directives/translation-directive');

var _dataService = require('./services/data-service');

var _activitiesService = require('./services/activities-service');

var _filterService = require('./services/filter-service');

var _languageService = require('./services/language-service');

var _alertService = require('./services/alert-service');

var _positionService = require('./services/position-service');

// services

// controller
// data

angular.module('tandemApp', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
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
    }).otherwise({
        redirectTo: '/'
    });
}]).constant('restApiUrl', 'http://localhost/cafelingo/api/tandem/').constant('languageSettings', [{ id: 'de', name: 'Deutsch' }, { id: 'en', name: 'English' }]).constant('defaultDistance', 10).constant('maxDistance', 100).constant('positionsData', _de.positionsData).constant('activitiesData', _activities.activitiesData).run(function () {}).controller('MainController', _mainController.MainController).controller('SearchController', _searchController.SearchController).controller('SettingsController', _settingsController.SettingsController).controller('AlertController', _alertController.AlertController).controller('FooterController', _footerController.FooterController).service('ActivitiesService', _activitiesService.ActivitiesService).service('FilterService', _filterService.FilterService).service('LanguageService', _languageService.LanguageService).service('AlertService', _alertService.AlertService).service('DataService', _dataService.DataService).service('PositionService', _positionService.PositionService).directive('myTranslation', _translationDirective.TranslationDirective.directiveFactory);

// directives


},{"./controller/alert-controller":2,"./controller/footer-controller":3,"./controller/main-controller":4,"./controller/search-controller":5,"./controller/settings-controller":6,"./data/activities/activities":7,"./data/positions/de":8,"./directives/translation-directive":9,"./services/activities-service":10,"./services/alert-service":11,"./services/data-service":12,"./services/filter-service":13,"./services/language-service":14,"./services/position-service":15}],2:[function(require,module,exports){
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = (function () {
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
})();

MainController.$inject = ['$rootScope', '$timeout', 'ActivitiesService', 'LanguageService', 'positionsData', 'AlertService', 'PositionService'];

exports.MainController = MainController;


},{}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchController = (function () {
    function SearchController($rootScope, $location, languageSettings, LanguageService, DataService) {
        var _this = this;

        _classCallCheck(this, SearchController);

        // DI
        this.$rootScope = $rootScope;
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        if (!window.latitude || !window.longitude) {
            $location.path('/');
        } else {
            this.searchResults = DataService.getResults().then(function (data) {
                _this.renderResults(data);
            });
        }
    }

    _createClass(SearchController, [{
        key: 'renderResults',
        value: function renderResults(data) {
            console.log('got data ', data);
        }
    }]);

    return SearchController;
})();

SearchController.$inject = ['$rootScope', '$location', 'languageSettings', 'LanguageService', 'DataService'];

exports.SearchController = SearchController;


},{}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = (function () {
    function SettingsController($rootScope, languageSettings, LanguageService) {
        _classCallCheck(this, SettingsController);

        // DI
        this.$rootScope = $rootScope;
        this.languageSettings = languageSettings;
        this.LanguageService = LanguageService;
        // local vars
        this.language = this.LanguageService.selectedLanguage;
        this.data = {
            availableOptions: this.languageSettings,
            selectedOption: this.language === 'de' ? this.languageSettings[0] : this.languageSettings[1]
        };
    }

    _createClass(SettingsController, [{
        key: 'changeLanguage',
        value: function changeLanguage() {
            this.language = this.data.selectedOption.id;
            this.LanguageService.resetLanguage(this.language);
            // broadcast to translation directive
            this.$rootScope.$broadcast('language-changed');
        }
    }]);

    return SettingsController;
})();

SettingsController.$inject = ['$rootScope', 'languageSettings', 'LanguageService'];

exports.SettingsController = SettingsController;


},{}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
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
    latitude: '50.783',
    longitude: '6.083'
}, {
    id: 2,
    name: 'Berlin',
    latitude: '52.523',
    longitude: '13.413'
}, {
    id: 3,
    name: 'Hamburg',
    latitude: '53.567',
    longitude: '10.033'
}, {
    id: 4,
    name: 'München',
    latitude: '48.133',
    longitude: '11.567'
}, {
    id: 5,
    name: 'Köln',
    latitude: '50.950',
    longitude: '6.950'
}, {
    id: 6,
    name: 'Frankfurt am Main',
    latitude: '50.117',
    longitude: '8.683'
}, {
    id: 7,
    name: 'Stuttgart',
    latitude: '48.783',
    longitude: '9.183'
}, {
    id: 8,
    name: 'Düsseldorf',
    latitude: '51.233',
    longitude: '6.783'
}, {
    id: 9,
    name: 'Dortmund',
    latitude: '51.517',
    longitude: '7.467'
}, {
    id: 10,
    name: 'Essen',
    latitude: '51.467',
    longitude: '7.017'
}, {
    id: 11,
    name: 'Bremen',
    latitude: '53.083',
    longitude: '8.817'
}, {
    id: 12,
    name: 'Dresden',
    latitude: '51.050',
    longitude: '13.739'
}, {
    id: 13,
    name: 'Leipzig',
    latitude: '51.339',
    longitude: '12.377'
}, {
    id: 14,
    name: 'Hannover',
    latitude: '52.383',
    longitude: '9.733'
}, {
    id: 15,
    name: 'Nürnberg',
    latitude: '49.450',
    longitude: '11.083'
}, {
    id: 16,
    name: 'Bochum',
    latitude: '51.483',
    longitude: '7.217'
}, {
    id: 17,
    name: 'Wuppertal',
    latitude: '51.267',
    longitude: '7.200'
}, {
    id: 18,
    name: 'Bielefeld',
    latitude: '52.017',
    longitude: '8.533'
}, {
    id: 19,
    name: 'Bonn',
    latitude: '50.733',
    longitude: '7.100'
}, {
    id: 20,
    name: 'Münster',
    latitude: '49.933',
    longitude: '8.867'
}, {
    id: 21,
    name: 'Karlsruhe',
    latitude: '49.017',
    longitude: '8.400'
}, {
    id: 22,
    name: 'Mannheim',
    latitude: '49.483',
    longitude: '8.467'
}, {
    id: 23,
    name: 'Augsburg',
    latitude: '48.367',
    longitude: '10.900'
}, {
    id: 24,
    name: 'Wiesbaden',
    latitude: '50.100',
    longitude: '8.233'
}, {
    id: 25,
    name: 'Gelsenkirchen',
    latitude: '51.550',
    longitude: '7.100'
}, {
    id: 26,
    name: 'Mönchengladbach',
    latitude: '51.200',
    longitude: '6.433'
}, {
    id: 27,
    name: 'Braunschweig',
    latitude: '52.267',
    longitude: '10.533'
}, {
    id: 28,
    name: 'Chemnitz',
    latitude: '50.830',
    longitude: '12.917'
}, {
    id: 29,
    name: 'Kiel',
    latitude: '54.333',
    longitude: '10.133'
}, {
    id: 30,
    name: 'Halle (Saale)',
    latitude: '51.479',
    longitude: '11.978'
}, {
    id: 31,
    name: 'Magdeburg',
    latitude: '52.122',
    longitude: '11.619'
}, {
    id: 32,
    name: 'Krefeld',
    latitude: '51.333',
    longitude: '6.567'
}, {
    id: 33,
    name: 'Freiburg (im Breisgau)',
    latitude: '48.000',
    longitude: '7.850'
}, {
    id: 34,
    name: 'Lübeck',
    latitude: '53.867',
    longitude: '10.683'
}, {
    id: 35,
    name: 'Oberhausen',
    latitude: '51.483',
    longitude: '6.867'
}, {
    id: 36,
    name: 'Erfurt',
    latitude: '50.986',
    longitude: '11.022'
}, {
    id: 37,
    name: 'Rostock',
    latitude: '54.089',
    longitude: '12.125'
}, {
    id: 38,
    name: 'Mainz',
    latitude: '50.000',
    longitude: '8.267'
}, {
    id: 39,
    name: 'Kassel',
    latitude: '51.317',
    longitude: '9.500'
}];


},{}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActivitiesService = (function () {
    function ActivitiesService($rootScope, activitiesData, FilterService, LanguageService) {
        var _this = this;

        _classCallCheck(this, ActivitiesService);

        // DI
        this.activitiesData = activitiesData;
        this.FilterService = FilterService;
        this.LanguageService = LanguageService;
        this.$rootScope = $rootScope;
        // internal vars
        this.offerId = localStorage.getItem('tandemApp_activities_offerId') ? localStorage.getItem('tandemApp_activities_offerId') : 36; // 36 === deutsch
        this.searchId = localStorage.getItem('tandemApp_activities_searchId') ? localStorage.getItem('tandemApp_activities_searchId') : 36; // 36 === deutsch
        this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
        this.offerObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.offerId);
        this.searchObj = this.FilterService.filterObjectFromArray(this.activities, 'id', this.searchId);
        this.$rootScope.$on('language-changed', function () {
            _this.updateActivities();
        });
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
})();

ActivitiesService.$inject = ['$rootScope', 'activitiesData', 'FilterService', 'LanguageService'];

exports.ActivitiesService = ActivitiesService;


},{}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataService = (function () {
    function DataService($http, restApiUrl, ActivitiesService, maxDistance) {
        _classCallCheck(this, DataService);

        // DI
        this.$http = $http;
        this.restApiUrl = restApiUrl;
        this.ActivitiesService = ActivitiesService;
        this.maxDistance = maxDistance;
    }

    _createClass(DataService, [{
        key: 'getResults',
        value: function getResults() {
            return this.$http.get(this.restApiUrl + 'retrieve_active' + '?lat=' + window.latitude + '&lon=' + window.longitude + '&max=' + this.maxDistance + '&offer_id=' + this.ActivitiesService.offerId + '&search_id=' + this.ActivitiesService.searchId + '&time=' + new Date().getTime());
        }
    }]);

    return DataService;
})();

DataService.$inject = ['$http', 'restApiUrl', 'ActivitiesService', 'maxDistance'];

exports.DataService = DataService;


},{}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterService = (function () {
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
})();

FilterService.$inject = [];

exports.FilterService = FilterService;


},{}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LanguageService = (function () {
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
})();

LanguageService.$inject = [];

exports.LanguageService = LanguageService;


},{}],15:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PositionService = (function () {
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
				this.chosenPosition.latitude = window.latitude;
				this.chosenPosition.longitude = window.longitude;
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
})();

PositionService.$inject = ['positionsData'];

exports.PositionService = PositionService;


},{}]},{},[1]);

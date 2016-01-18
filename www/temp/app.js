'use strict';

var _de = require('./data/positions/de');

var _activities = require('./data/activities/activities');

var _mainController = require('./controller/main-controller');

var _searchController = require('./controller/search-controller');

var _settingsController = require('./controller/settings-controller');

var _myDataController = require('./controller/my-data-controller');

var _loginController = require('./controller/login-controller');

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

angular.module('tandemApp', ['ngRoute', 'ngSanitize', 'ui.slider']).config(['$routeProvider', function ($routeProvider) {
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
    }).when('/impressum', {
        templateUrl: 'views/impressum.html'
    }).when('/datenschutz', {
        templateUrl: 'views/datenschutz.html'
    }).otherwise({
        redirectTo: '/'
    });
}]).constant('restApiUrl', 'http://localhost/cafelingo/api/tandem/').constant('languageSettings', [{ id: 'de', name: 'Deutsch' }, { id: 'en', name: 'English' }]).constant('encKey', '2343desdfsf!"§$ffds44').constant('defaultDistance', 10).constant('maxDistance', 100).constant('svgIcon', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">' + '<path d="M311.413 351.368c-11.055-1.759-11.307-32.157-11.307-32.157s32.484-32.158 39.564-75.401c19.045 0 30.809-45.973 11.761-62.148 0.795-17.027 24.48-133.662-95.431-133.662s-96.225 116.635-95.432 133.662c-19.047 16.175-7.285 62.148 11.761 62.148 7.079 43.243 39.564 75.401 39.564 75.401s-0.252 30.398-11.307 32.157c-35.61 5.666-168.586 64.317-168.586 128.632h448c0-64.315-132.976-122.966-168.587-128.632z"></path>' + '</svg>').constant('positionsData', _de.positionsData).constant('activitiesData', _activities.activitiesData).run(function () {}).controller('MainController', _mainController.MainController).controller('SearchController', _searchController.SearchController).controller('SettingsController', _settingsController.SettingsController).controller('MyDataController', _myDataController.MyDataController).controller('LoginController', _loginController.LoginController).controller('AlertController', _alertController.AlertController).controller('FooterController', _footerController.FooterController).service('ActivitiesService', _activitiesService.ActivitiesService).service('FilterService', _filterService.FilterService).service('LanguageService', _languageService.LanguageService).service('AlertService', _alertService.AlertService).service('DataService', _dataService.DataService).service('PositionService', _positionService.PositionService).directive('myTranslation', _translationDirective.TranslationDirective.directiveFactory);

// directives
//# sourceMappingURL=app.js.map

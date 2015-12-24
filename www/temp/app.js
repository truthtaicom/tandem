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
//# sourceMappingURL=app.js.map

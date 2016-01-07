// data
import { positionsData } from './data/positions/de';
import { activitiesData } from './data/activities/activities';

// controller
import { MainController } from './controller/main-controller';
import { SearchController } from './controller/search-controller';
import { SettingsController } from './controller/settings-controller';
import { MyDataController } from './controller/my-data-controller';
import { MyProfileController } from './controller/my-profile-controller';
import { AlertController } from './controller/alert-controller';
import { FooterController } from './controller/footer-controller';

// directives
import { TranslationDirective } from './directives/translation-directive';

// services
import { DataService } from './services/data-service';
import { ActivitiesService } from './services/activities-service';
import { FilterService } from './services/filter-service';
import { LanguageService } from './services/language-service';
import { AlertService } from './services/alert-service';
import { PositionService } from './services/position-service';

angular.module('tandemApp', ['ngRoute', 'ngSanitize', 'ui.slider'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchController',
                controllerAs: 'search'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'SettingsController',
                controllerAs: 'settings'
            })
			.when('/data', {
				templateUrl: 'views/my-data.html',
				controller: 'MyDataController',
				controllerAs: 'data'
			})
			.when('/profile', {
				templateUrl: 'views/my-profile.html',
				controller: 'MyProfileController',
				controllerAs: 'profile'
			})
			.when('/impressum', {
				templateUrl: 'views/impressum.html'
			})
			.when('/datenschutz', {
				templateUrl: 'views/datenschutz.html'
			})
            .otherwise({
                redirectTo: '/'
            });
    }])
    .constant('restApiUrl', 'http://localhost/cafelingo/api/tandem/')
    .constant('languageSettings', [
        {id: 'de', name: 'Deutsch'},
        {id: 'en', name: 'English'}
    ])
    .constant('defaultDistance', 10)
    .constant('maxDistance', 100)
    .constant('svgIcon',
		'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">' +
		'<path d="M311.413 351.368c-11.055-1.759-11.307-32.157-11.307-32.157s32.484-32.158 39.564-75.401c19.045 0 30.809-45.973 11.761-62.148 0.795-17.027 24.48-133.662-95.431-133.662s-96.225 116.635-95.432 133.662c-19.047 16.175-7.285 62.148 11.761 62.148 7.079 43.243 39.564 75.401 39.564 75.401s-0.252 30.398-11.307 32.157c-35.61 5.666-168.586 64.317-168.586 128.632h448c0-64.315-132.976-122.966-168.587-128.632z"></path>' +
		'</svg>'
	)
	.constant('positionsData', positionsData)
    .constant('activitiesData', activitiesData)
    .run(function () {
    })
    .controller('MainController', MainController)
    .controller('SearchController', SearchController)
    .controller('SettingsController', SettingsController)
	.controller('MyDataController', MyDataController)
	.controller('MyProfileController', MyProfileController)
    .controller('AlertController', AlertController)
    .controller('FooterController', FooterController)
    .service('ActivitiesService', ActivitiesService)
    .service('FilterService', FilterService)
    .service('LanguageService', LanguageService)
    .service('AlertService', AlertService)
    .service('DataService', DataService)
    .service('PositionService', PositionService)
    .directive('myTranslation', TranslationDirective.directiveFactory);

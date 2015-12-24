// data
import { positionsData } from './data/positions/de';
import { activitiesData } from './data/activities/activities';

// controller
import { MainController } from './controller/main-controller';
import { SearchController } from './controller/search-controller';
import { SettingsController } from './controller/settings-controller';
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

angular.module('tandemApp', ['ngRoute'])
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
    .constant('positionsData', positionsData)
    .constant('activitiesData', activitiesData)
    .run(function () {
    })
    .controller('MainController', MainController)
    .controller('SearchController', SearchController)
    .controller('SettingsController', SettingsController)
    .controller('AlertController', AlertController)
    .controller('FooterController', FooterController)
    .service('ActivitiesService', ActivitiesService)
    .service('FilterService', FilterService)
    .service('LanguageService', LanguageService)
    .service('AlertService', AlertService)
    .service('DataService', DataService)
    .service('PositionService', PositionService)
    .directive('myTranslation', TranslationDirective.directiveFactory);

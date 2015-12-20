'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = (function () {
    function MainController($rootScope, ActivitiesService, LanguageService, positionsData, AlertService, PositionService) {
        _classCallCheck(this, MainController);

        // DI
        this.$rootScope = $rootScope;
        this.LanguageService = LanguageService;
        this.ActivitiesService = ActivitiesService;
        this.positions = positionsData;
        this.AlertService = AlertService;
        this.PositionService = PositionService;
        // local vars
        this.positions[0].name = this.LanguageService.selectedLanguage === 'de' ? '*deiner Position' : '*your position';
        this.language = this.LanguageService.selectedLanguage;
        this.activities = this.ActivitiesService.activities;
        this.chosenActivity = this.ActivitiesService.chosenActivity;
        this.chosenPosition = this.PositionService.chosenPosition;
    }

    _createClass(MainController, [{
        key: 'changeActivity',
        value: function changeActivity() {
            this.ActivitiesService.activityId = this.chosenActivity.id;
            this.ActivitiesService.update();
        }
    }, {
        key: 'changePosition',
        value: function changePosition() {
            window.longitude = this.chosenPosition.longitude;
            window.latitude = this.chosenPosition.latitude;
            this.PositionService.update(this.chosenPosition);
            if (!window.longitude || !window.latitude) {
                this.AlertService.alerts.retrieving_position = true;
                window.tandemAppConfig.geoLocation();
                //broadcast event
                this.$rootScope.$broadcast('show-alert');
            } else {
                this.AlertService.alerts.retrieving_position = false;
            }
        }
    }]);

    return MainController;
})();

MainController.$inject = ['$rootScope', 'ActivitiesService', 'LanguageService', 'positionsData', 'AlertService', 'PositionService'];

exports.MainController = MainController;
//# sourceMappingURL=main-controller.js.map

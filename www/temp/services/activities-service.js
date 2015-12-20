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
        // internal vars
        this.activityId = localStorage.getItem('tandemApp_selectedActivity') ? localStorage.getItem('tandemApp_selectedActivity') : 36; // 36 === deutsch
        this.activities = this.FilterService.filterArray(this.activitiesData, this.LanguageService.selectedLanguage);
        this.chosenActivity = this.FilterService.filterObjectFromArray(this.activities, 'id', this.activityId);
        $rootScope.$on('language-changed', function () {
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
            localStorage.setItem('tandemApp_selectedActivity', this.activityId);
            this.chosenActivity = this.FilterService.filterObjectFromArray(this.activities, 'id', this.activityId);
        }
    }]);

    return ActivitiesService;
})();

ActivitiesService.$inject = ['$rootScope', 'activitiesData', 'FilterService', 'LanguageService'];

exports.ActivitiesService = ActivitiesService;
//# sourceMappingURL=activities-service.js.map

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
//# sourceMappingURL=activities-service.js.map

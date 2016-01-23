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
        this.controller = function (ActivitiesService, DataService) {
            var _this = this;

            this.ActivitiesService = ActivitiesService;
            this.DataService = DataService;
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
                if (_this.myTandemForm.$valid) {
                    _this.DataService.contactTandem(_this.formData).then(function (returnData) {
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
        value: function directiveFactory(ActivitiesService, DataService) {
            TandemProfileDirective.instance = new TandemProfileDirective(ActivitiesService, DataService);
            return TandemProfileDirective.instance;
        }
    }]);

    return TandemProfileDirective;
}();

TandemProfileDirective.$inject = ['ActivitiesService', 'DataService'];

exports.TandemProfileDirective = TandemProfileDirective;
//# sourceMappingURL=tandem-profile-directive.js.map

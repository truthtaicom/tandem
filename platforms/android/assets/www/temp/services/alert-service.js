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
//# sourceMappingURL=alert-service.js.map

'use strict';

describe('Service: AlertService', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var alertService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, AlertService) {
        alertService = AlertService;
    }));

    it('should initialize a service', inject(function () {
        expect(alertService).toBeDefined();
    }));

    it('should have a property alerts; to be an object', inject(function () {
        expect(typeof alertService.alerts).toBe('object');
    }));

    it('should have a property alerts.retrieving_position; to be false', inject(function () {
        expect(alertService.alerts.retrieving_position).toBe(false);
    }));

    it('should have a property alerts.retrieving_searchresults; to be false', inject(function () {
        expect(alertService.alerts.retrieving_searchresults).toBe(false);
    }));

});

'use strict';

describe('Service: DataService', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var dataService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, DataService) {
        dataService = DataService;
    }));

    it('should initialize a service', inject(function () {
        expect(dataService).toBeDefined();
    }));

});

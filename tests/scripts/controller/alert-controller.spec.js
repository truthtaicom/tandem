'use strict';

describe('Controller: AlertController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var AlertController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AlertController = $controller('AlertController', {
            $scope: scope
        });
    }));

    it('should initialize a controller', inject(function () {
        expect(AlertController).toBeDefined();
    }));

    it('should have a property AlertService', inject(function () {
        expect(AlertController.AlertService).toBeDefined();
    }));

    it('should have a property alerts', inject(function () {
        expect(AlertController.alerts).toBeDefined();
    }));

    it('should have a property alerts.retrieving_position to be false ', inject(function () {
        expect(AlertController.alerts.retrieving_position).toBe(false);
    }));

    it('should have a property alerts.retrieving_searchresults to be false ', inject(function () {
        expect(AlertController.alerts.retrieving_searchresults).toBe(false);
    }));

    it('should have a property LanguageService', inject(function () {
        expect(AlertController.LanguageService).toBeDefined();
    }));

    it('should have a property language', inject(function () {
        expect(AlertController.language).toBeDefined();
    }));

    it('should have a property language; to be "en"', inject(function () {
        expect(AlertController.language).toBe('en');
    }));

    it('should receive a broadcast', inject(function () {
        var eventEmitted = false;
        AlertController.$rootScope.$on("show-alert", function() {
            eventEmitted = true;
        });
        AlertController.$rootScope.$broadcast('show-alert');
        //run code to test
        expect(eventEmitted).toBe(true);
    }));
});

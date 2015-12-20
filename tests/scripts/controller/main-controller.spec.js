'use strict';

describe('Controller: MainController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var MainController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainController = $controller('MainController', {
            $scope: scope
        });
        window.tandemAppConfig = {};
        window.tandemAppConfig.geoLocation = function(){
            // Steinleinhalle
            window.longitude = 13.4607137;
            window.latitude = 52.5203457;
        }
    }));

    it('should initialize a controller', inject(function () {
        expect(MainController).toBeDefined();
    }));

    it('should have a property LanguageService', inject(function () {
        expect(MainController.LanguageService).toBeDefined();
    }));

    it('should have a property language to be "en"', inject(function () {
        expect(MainController.language).toBe('en');
    }));

    it('should have a property ActivitiesService', inject(function () {
        expect(MainController.ActivitiesService).toBeDefined();
    }));

    it('should have a property activities', inject(function () {
        expect(MainController.activities).toBeDefined();
    }));

    it('should have a property activities, length to be 110', inject(function () {
        expect(MainController.activities.length).toBe(110);
    }));

    it('should have a property chosenActivity id to be 36', inject(function () {
        expect(MainController.chosenActivity.id).toBe(36);
    }));

    it('should have a property positions', inject(function () {
        expect(MainController.positions).toBeDefined();
    }));

    it('should have a property positions, length to be 40', inject(function () {
        expect(MainController.positions.length).toBe(40);
    }));

    it('should have a property positions, 0th element name to be "*your position"', inject(function () {
        expect(MainController.positions[0].name).toBe('*your position');
    }));

    it('should have a property chosenPosition', inject(function () {
        expect(MainController.chosenPosition).toBeDefined();
    }));

    it('should have a property chosenPosition; id to be 2', inject(function () {
        expect(MainController.chosenPosition.id).toBe(2);
    }));

    it('should have a changeActivity method', inject(function () {
        expect(MainController.changeActivity).toBeDefined();
    }));

    it('should reset the chosenActivity when calling the changeActivity method ', inject(function () {
        MainController.chosenActivity = MainController.activities[56];
        MainController.changeActivity();
        expect(MainController.ActivitiesService.activityId).toBe(57);
    }));

    it('should call a ActivitiesService.update() when calling the changeActivity method', inject(function () {
        //MainController.chosenActivity = MainController.activities[56];
        spyOn(MainController.ActivitiesService, 'update');
        MainController.changeActivity();
        expect(MainController.ActivitiesService.update).toHaveBeenCalled();
    }));

    it('should have a changePosition method', inject(function () {
        expect(MainController.changePosition).toBeDefined();
    }));

    it('should reset alert when calling changePosition to 1; and set Alert to false', inject(function () {
        MainController.chosenPosition = MainController.positions[1];
        MainController.changePosition();
        expect(MainController.AlertService.alerts.retrieving_position).toBe(false);
    }));

    it('should call a PositionService.update() when calling the changePosition method', inject(function () {
        spyOn(MainController.PositionService, 'update');
        MainController.changePosition();
        expect(MainController.PositionService.update).toHaveBeenCalled();
    }));

    it('should reset alert when calling changePosition to 0; and set Alert to true', inject(function () {
        MainController.chosenPosition = MainController.positions[0];
        MainController.changePosition();
        expect(MainController.AlertService.alerts.retrieving_position).toBe(true);
    }));

    it('should set window.longitude and window.latitude after calling window.tandemAppConfig.geoLocation()', inject(function () {
        MainController.chosenPosition = MainController.positions[0];
        MainController.changePosition();
        expect(window.latitude).toBe(52.5203457);
        expect(window.longitude).toBe(13.4607137);
    }));
});

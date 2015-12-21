'use strict';

describe('Service: ActivitiesService', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var activitiesService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, ActivitiesService) {
        localStorage.removeItem('tandemApp_selectedActivity');
        activitiesService = ActivitiesService;
    }));

    it('should initialize a service', inject(function () {
        expect(activitiesService).toBeDefined();
    }));

    it('should have a property activitiesData', inject(function () {
        expect(activitiesService.activitiesData).toBeDefined();
    }));

    it('should have a property activitiesData with length 110', inject(function () {
        expect(activitiesService.activitiesData.length).toBe(110);
    }));

    it('should have a property activitiesData', inject(function () {
        expect(activitiesService.activities).toBeDefined();
    }));

    it('should have a property FilterService to be defined', inject(function () {
        expect(activitiesService.FilterService).toBeDefined();
    }));

    it('should have a property LanguageService', inject(function () {
        expect(activitiesService.LanguageService).toBeDefined();
    }));

    it('should have a property activities', inject(function () {
        expect(activitiesService.activities).toBeDefined();
    }));

    it('should have a property activities', inject(function () {
        expect(activitiesService.activities.length).toBe(110);
    }));

    it('should have a property activities, 1th element to be "Albanian"', inject(function () {
        expect(activitiesService.activities[1].name).toBe('Albanian');
    }));

    it('should have a property chosenActivity', inject(function () {
        expect(activitiesService.chosenActivity).toBeDefined();
    }));

    it('should have a property chosenActivity; to be German', inject(function () {
        expect(activitiesService.chosenActivity.name).toBe('German');
    }));

    it('should have a method updateActivities', inject(function () {
        expect(activitiesService.updateActivities).toBeDefined();
    }));

    it('should have a method updateActivities; to call FilterService.filterArray', inject(function () {
        spyOn(activitiesService.FilterService,'filterArray');
        activitiesService.updateActivities();
        expect(activitiesService.FilterService.filterArray).toHaveBeenCalled();
    }));

    it('should have a method update; to call FilterService.filterObjectFromArray', inject(function () {
        spyOn(activitiesService.FilterService,'filterObjectFromArray');
        activitiesService.update();
        expect(activitiesService.FilterService.filterObjectFromArray).toHaveBeenCalled();
    }));

    it('should receive a broadcast', inject(function () {
        var eventEmitted = false;
        activitiesService.$rootScope.$on("language-changed", function() {
            eventEmitted = true;
        });
        activitiesService.$rootScope.$broadcast('language-changed');
        //run code to test
        expect(eventEmitted).toBe(true);
    }));
});

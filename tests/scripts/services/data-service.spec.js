'use strict';

describe('Service: DataService', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var dataService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, DataService) {
        dataService = DataService;
        dataService.$http = {
            post : function() {
                return true;
            },
            get : function() {
                return true;
            }
        }
    }));

    it('should initialize a service', inject(function () {
        expect(dataService).toBeDefined();
    }));

    it('should have a property $http', inject(function () {
        expect(dataService.$http).toBeDefined();
    }));

    it('should have a property restApiUrl', inject(function () {
        expect(dataService.restApiUrl).toBeDefined();
    }));

    it('should have a property ActivitiesService', inject(function () {
        expect(dataService.ActivitiesService).toBeDefined();
    }));

    it('should have a property PositionService', inject(function () {
        expect(dataService.PositionService).toBeDefined();
    }));

    it('should have a property maxDistance', inject(function () {
        expect(dataService.maxDistance).toBeDefined();
    }));

    it('should have a method getResults', inject(function () {
        expect(dataService.getResults).toBeDefined();
    }));

    it('should call http.get when calling method getResults', inject(function () {
        spyOn(dataService.$http, 'get').andCallThrough();
        dataService.getResults();
        expect(dataService.$http.get).toHaveBeenCalled();
    }));

    it('should have a method postLogin', inject(function () {
        expect(dataService.postLogin).toBeDefined();
    }));

    it('should call http.post when calling method postLogin', inject(function () {
        spyOn(dataService.$http, 'post').andCallThrough();
        dataService.postLogin();
        expect(dataService.$http.post).toHaveBeenCalled();
    }));

    it('should have a method postChange', inject(function () {
        expect(dataService.postChange).toBeDefined();
    }));

    it('should call http.post when calling method postChange', inject(function () {
        spyOn(dataService.$http, 'post').andCallThrough();
        dataService.postChange();
        expect(dataService.$http.post).toHaveBeenCalled();
    }));

    it('should have a method postRegistration', inject(function () {
        expect(dataService.postRegistration).toBeDefined();
    }));

    it('should call http.post when calling method postRegistration', inject(function () {
        spyOn(dataService.$http, 'post').andCallThrough();
        dataService.postRegistration();
        expect(dataService.$http.post).toHaveBeenCalled();
    }));

});

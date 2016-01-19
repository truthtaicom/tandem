'use strict';

describe('Controller: MainController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var MainController,
        timeout,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $timeout) {
        scope = $rootScope.$new();
        timeout = $timeout;
        MainController = $controller('MainController', {
            $scope: scope
        });
        localStorage.removeItem('tandemApp_position');
		window.tandemAppConfig = {};
		window.tandemAppConfig.geoLocation = function(){
			return true;
		};

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

    it('should have a property positions', inject(function () {
        expect(MainController.positions).toBeDefined();
    }));

    it('should have a property positions, length to be 40', inject(function () {
        expect(MainController.positions.length).toBe(40);
    }));

    it('should have a property positions, 0th element name to be "*your position"', inject(function () {
        expect(MainController.positions[0].name).toBe('my position');
    }));

    it('should have a property offerObj', inject(function () {
        expect(MainController.offerObj).toBeDefined();
    }));

    it('should have a property offerObj; id to be 36', inject(function () {
        expect(MainController.offerObj.id).toBe(36);
    }));

    it('should have a showAlert method', inject(function () {
        expect(MainController.showAlert).toBeDefined();
    }));

    it('should have a showAlert method, updatePosition to have been called', inject(function () {
        spyOn(MainController.PositionService, 'updatePosition');
        MainController.showAlert();
        expect(MainController.PositionService.updatePosition).toHaveBeenCalled();
    }));

    it('should have a showAlert method, longitude = null; AlertService.alerts.retrieving_position = true', inject(function () {
        MainController.chosenPosition.longitude = null;
        MainController.showAlert();
        expect(MainController.AlertService.alerts.retrieving_position).toBe(true);
        MainController.chosenPosition.longitude = 13.413;
    }));

    it('should have a showAlert method, longitude = null; $broadcast to have been called', inject(function () {
        spyOn(MainController.$rootScope, '$broadcast');
        MainController.chosenPosition.longitude = null;
        MainController.showAlert();
        expect(MainController.$rootScope.$broadcast).toHaveBeenCalled();
        MainController.chosenPosition.longitude = 13.413;
    }));

    it('should have a showAlert method, longitude = null; showAlert to have been called after timeout!', inject(function () {
        MainController.chosenPosition.longitude = null;
        MainController.showAlert();
        spyOn(MainController, 'showAlert');
        timeout.flush();
        expect(MainController.showAlert).toHaveBeenCalled();
        MainController.chosenPosition.longitude = 13.413;
    }));

    it('should have a changeActivity method', inject(function () {
        expect(MainController.changeOffer).toBeDefined();
    }));

    it('should reset offerId when calling the changeOffer method', inject(function () {
        MainController.offerObj = MainController.activities[56];
        MainController.changeOffer();
        expect(MainController.ActivitiesService.offerId).toBe(57);
    }));

    it('should call a ActivitiesService.update() when calling the changeOffer method', inject(function () {
        spyOn(MainController.ActivitiesService, 'update');
        MainController.changeOffer();
        expect(MainController.ActivitiesService.update).toHaveBeenCalled();
    }));

	it('should have a property searchObj', inject(function () {
		expect(MainController.searchObj).toBeDefined();
	}));

	it('should have a property searchObj; id to be 36', inject(function () {
		expect(MainController.searchObj.id).toBe(36);
	}));

	it('should reset searchId when calling the changeSearch method', inject(function () {
		MainController.searchObj = MainController.activities[56];
		MainController.changeSearch();
		expect(MainController.ActivitiesService.searchId).toBe(57);
	}));

	it('should call a ActivitiesService.update() when calling the changeSearch method', inject(function () {
		spyOn(MainController.ActivitiesService, 'update');
		MainController.changeSearch();
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
        MainController.chosenPosition = MainController.positions[1];
        MainController.changePosition();
        expect(MainController.chosenPosition.latitude).toBe(50.783);
        expect(MainController.chosenPosition.longitude).toBe(6.083);
    }));

    //it('should call $rootScope.$broadcast', inject(function () {
    //    spyOn(MainController.$rootScope, '$broadcast');
    //    window.longitude = null;
    //    MainController.changePosition();
    //    expect(MainController.$rootScope.$broadcast).toHaveBeenCalled();
    //}));

});

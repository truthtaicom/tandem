'use strict';

describe('Service: PositionService', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var positionService,
        posObj = {
            id: 1,
            name: 'Aachen',
            latitude: '50.783',
            longitude: '6.083'
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, PositionService) {
        localStorage.removeItem('tandemApp_position');
        positionService = PositionService;
    }));

    it('should initialize a service', inject(function () {
        expect(positionService).toBeDefined();
    }));

    it('should have a property positionsData', inject(function () {
        expect(positionService.positionsData).toBeDefined();
    }));

    it('should have a property positionsData; length 40', inject(function () {
        expect(positionService.positionsData.length).toBe(40);
    }));

    it('should have a property chosenPosition; to be Berlin', inject(function () {
        expect(positionService.chosenPosition.name).toBe('Berlin');
    }));

    it('should have a property update', inject(function () {
        expect(positionService.update).toBeDefined();
    }));

    it('should have a property update', inject(function () {
        positionService.update(posObj);
        expect(positionService.chosenPosition).toBe(posObj);
    }));

    it('localStorage to be updated', inject(function () {
        positionService.update(posObj);
        expect(JSON.parse(localStorage.getItem('tandemApp_position')).name).toBe(posObj.name);
    }));
});

'use strict';

describe('Service: filterService', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var filterService,
        activities = [
            {
                'id': 1,
                'de': 'Afrikaans',
                'en': 'Afrikaans'
            },
            {
                'id': 2,
                'de': 'Albanisch',
                'en': 'Albanian'
            }
        ];

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, FilterService) {
        localStorage.removeItem('tandemApp_selectedActivity');
        filterService = FilterService;
    }));

    it('should initialize a service', inject(function () {
        expect(filterService).toBeDefined();
    }));

    it('to have a property filterArray', inject(function () {
        expect(filterService.filterArray).toBeDefined();
    }));

    it('to have a property filterArray', inject(function () {
        var x = filterService.filterArray(activities, 'de');
        expect(x[1].name).toBe('Albanisch');
    }));

    it('to have a property filterObjectFromArray', inject(function () {
        expect(filterService.filterObjectFromArray).toBeDefined();
    }));

    it('to have a property filterObjectFromArray; to work', inject(function () {
        var x = filterService.filterObjectFromArray([{ id : 1, name : 'One' } , { id : 2, name : 'Two' }], 'id', 1);
        expect(x.name).toBe('One');
    }));
});

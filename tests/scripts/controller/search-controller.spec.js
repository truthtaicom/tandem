'use strict';

describe('Controller: SearchController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var SearchController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SearchController = $controller('SearchController', {
            $scope: scope
        });
    }));

    it('should initialize a controller', inject(function () {
        expect(SearchController).toBeDefined();
    }));

});

'use strict';

describe('Controller: FooterController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var FooterController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        FooterController = $controller('FooterController', {
            $scope: scope
        });
    }));

    it('should initialize a controller', inject(function () {
        expect(FooterController).toBeDefined();
    }));

});

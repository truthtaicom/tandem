'use strict';

describe('Controller: SettingsController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var SettingsController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SettingsController = $controller('SettingsController', {
            $scope: scope
        });
    }));

    it('should initialize a controller', inject(function () {
        expect(SettingsController).toBeDefined();
    }));

    it('should have a property languageSettings', inject(function () {
        expect(SettingsController.languageSettings).toBeDefined();
    }));

    it('should have a property LanguageService', inject(function () {
        expect(SettingsController.LanguageService).toBeDefined();
    }));

    it('should have a property language', inject(function () {
        expect(SettingsController.language).toBeDefined();
    }));

    it('should have a property language; to be "en"', inject(function () {
        expect(SettingsController.language).toBe('en');
    }));

    it('should have a property data', inject(function () {
        expect(SettingsController.data).toBeDefined();
    }));

    it('should have a property data.availableOptions', inject(function () {
        expect(SettingsController.data.availableOptions).toBe(SettingsController.languageSettings);
    }));

    it('should have a property data.selectedOption', inject(function () {
        expect(SettingsController.data.selectedOption).toBe(SettingsController.languageSettings[1]);
    }));

    it('should have a property token', inject(function () {
        expect(SettingsController.token).toBeDefined();
    }));

    it('should reset SettingsController.language when calling function changeLanguage with "en" ', inject(function () {
        SettingsController.changeLanguage('en');
        expect(SettingsController.language).toBe('en');
    }));

    it('should have a method "logout"', inject(function () {
        expect(SettingsController.logout).toBeDefined();
    }));

    it('should reset token to null after calling method "logout"', inject(function () {
        SettingsController.logout();
        expect(SettingsController.token).toBe(null);
    }));
});

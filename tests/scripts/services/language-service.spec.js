'use strict';

describe('Service: LanguageService', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var languageService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, LanguageService) {
        localStorage.removeItem('tandemApp_selectedLanguage');
        languageService = LanguageService;
    }));

    it('should initialize a service', inject(function () {
        expect(languageService).toBeDefined();
    }));

    it('should have a property selectedLanguage', inject(function () {
        expect(languageService.selectedLanguage).toBeDefined();
    }));

    it('should have a property selectedLanguage; to be "en"', inject(function () {
        expect(languageService.selectedLanguage).toBe('en');
    }));

    it('should have a property resetLanguage', inject(function () {
        expect(languageService.resetLanguage).toBeDefined();
    }));

    it('should have a property selectedLanguage to be "de" after calling resetLanguage', inject(function () {
        languageService.resetLanguage('de');
        expect(languageService.selectedLanguage).toBe('de');
    }));

    it('should set localStorage tandemApp_selectedLanguage to "de"', inject(function () {
        languageService.resetLanguage('de');
        expect(localStorage.getItem('tandemApp_selectedLanguage')).toBe('de');
    }));

});

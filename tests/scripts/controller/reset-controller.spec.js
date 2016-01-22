'use strict';

describe('Controller: ResetController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var ResetController,
        q,
        deferred,
        timeout,
        scope,
        fakeData0 = {
            data : false
        },
        fakeData = {
            data : true
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $timeout, _$q_) {
        scope = $rootScope.$new();
        timeout = $timeout;
        q = _$q_;
        deferred = q.defer({});

        ResetController = $controller('ResetController', {
            $scope: scope
        });
        ResetController.DataService = {
            postReset : function(){
                console.log('posting login');
                return deferred.promise;
            }
        };
    }));

    it('should initialize a controller', inject(function () {
        expect(ResetController).toBeDefined();
    }));

    it('should have a variable languageSettings', inject(function () {
        expect(ResetController.languageSettings).toBeDefined();
    }));

    it('should have a variable LanguageService', inject(function () {
        expect(ResetController.LanguageService).toBeDefined();
    }));

    it('should have a variable language', inject(function () {
        expect(ResetController.language).toBe('en');
    }));

    it('should have a variable DataService', inject(function () {
        expect(ResetController.DataService).toBeDefined();
    }));

    it('should have a variable encKey', inject(function () {
        expect(ResetController.encKey).toBeDefined();
    }));

    it('should have a variable encKey, to be ', inject(function () {
        expect(ResetController.encKey.indexOf('2343desdfs')).not.toBe(-1);
    }));

    it('should have a variable resetForm', inject(function () {
        expect(ResetController.resetForm).toBeDefined();
    }));

    it('should have a variable formState', inject(function () {
        expect(ResetController.formState).toBeDefined();
    }));

    it('should have a variable formState.submitted', inject(function () {
        expect(ResetController.formState.submitted).toBe(false);
    }));

    it('should have a variable formState.error', inject(function () {
        expect(ResetController.formState.error).toBe(false);
    }));

    it('should have a variable formState.success', inject(function () {
        expect(ResetController.formState.success).toBe(false);
    }));

    it('should have a method submit', inject(function () {
        expect(ResetController.submit).toBeDefined();
    }));

    it('should have a method submit; should set formState.submitted to TRUE', inject(function () {
        ResetController.submit();
        expect(ResetController.formState.submitted).toBe(true);
    }));

    it('should have a method submit; should post Login', inject(function () {
        spyOn(ResetController.DataService, 'postReset').andCallThrough();
        ResetController.userData = {
            username : 'blah',
            lang_used : 'en'
        };
        ResetController.resetForm.$valid = true;
        ResetController.submit();
        expect(ResetController.DataService.postReset).toHaveBeenCalled();
    }));

    it('should have a method submit; should post RESET with success', inject(function () {
        spyOn(ResetController.DataService, 'postReset').andCallThrough();
        ResetController.userData = {
            username : 'blah',
            lang_used : 'en'
        };
        ResetController.resetForm.$valid = true;
        ResetController.submit();
        deferred.resolve(fakeData);
        scope.$apply();
        expect(ResetController.formState.success).toBe(true);
    }));

    it('should have a method submit; should post RESET with error', inject(function () {
        spyOn(ResetController.DataService, 'postReset').andCallThrough();
        ResetController.userData = {
            username : 'blah',
            lang_used : 'en'
        };
        ResetController.resetForm.$valid = true;
        ResetController.submit();
        deferred.resolve(fakeData0);
        scope.$apply();
        expect(ResetController.formState.error).toBe(true);
    }));

    it('should have a method submit; should post RESET with error (rejected)', inject(function () {
        spyOn(ResetController.DataService, 'postReset').andCallThrough();
        ResetController.userData = {
            username : 'blah',
            lang_used : 'en'
        };
        ResetController.resetForm.$valid = true;
        ResetController.submit();
        deferred.reject();
        scope.$apply();
        expect(ResetController.formState.error).toBe(true);
    }));

});

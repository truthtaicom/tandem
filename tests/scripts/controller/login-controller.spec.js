'use strict';

describe('Controller: LoginController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var LoginController,
        q,
        deferred,
        timeout,
        scope,
        fakeData0 = {
            data : false
        },
        fakeData = {
            data : {token : '123', email : 'blah@blau.com'}
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $timeout, _$q_) {
        scope = $rootScope.$new();
        timeout = $timeout;
        q = _$q_;
        deferred = q.defer({});

        LoginController = $controller('LoginController', {
            $scope: scope
        });
        LoginController.DataService = {
            postLogin : function(){
                console.log('posting login');
                return deferred.promise;
            }
        };
        localStorage.setItem('tandemApp_userData', JSON.stringify(fakeData.data));

        window.GibberishAES = {
            enc : function(x,y) {
                return x;
            }
        }
    }));

    it('should initialize a controller', inject(function () {
        expect(LoginController).toBeDefined();
    }));

    it('should have a variable languageSettings', inject(function () {
        expect(LoginController.languageSettings).toBeDefined();
    }));

    it('should have a variable LanguageService', inject(function () {
        expect(LoginController.LanguageService).toBeDefined();
    }));

    it('should have a variable DataService', inject(function () {
        expect(LoginController.DataService).toBeDefined();
    }));

    it('should have a variable encKey', inject(function () {
        expect(LoginController.encKey).toBeDefined();
    }));

    it('should have a variable encKey, to be ', inject(function () {
        expect(LoginController.encKey.indexOf('2343desdfs')).not.toBe(-1);
    }));

    it('should have a variable $location', inject(function () {
        expect(LoginController.$location).toBeDefined();
    }));

    it('should have a variable loginForm', inject(function () {
        expect(LoginController.loginForm).toBeDefined();
    }));

    it('should have a variable formState', inject(function () {
        expect(LoginController.formState).toBeDefined();
    }));

    it('should have a variable formState.submitted', inject(function () {
        expect(LoginController.formState.submitted).toBe(false);
    }));

    it('should have a variable formState.error', inject(function () {
        expect(LoginController.formState.error).toBe(false);
    }));

    it('should have a variable token', inject(function () {
        expect(LoginController.token).toBeDefined();
    }));

    it('should have a variable token to be 123, and location path  = /settings', inject(function () {
        LoginController.userData = {
            token : '123'
        };
        console.log('LoginController.$location.$path : ',LoginController.$location.path())
        expect(LoginController.$location.path()).toBe('/settings');
    }));

    it('should have a method submit', inject(function () {
        expect(LoginController.submit).toBeDefined();
    }));

    it('should have a method submit; should set formState.submitted to TRUE', inject(function () {
        LoginController.submit();
        expect(LoginController.formState.submitted).toBe(true);
    }));

    it('should have a method submit; should post Login', inject(function () {
        spyOn(LoginController.DataService, 'postLogin').andCallThrough();
        LoginController.userData = {
            username : 'blah',
            password : 'blah'
        };
        LoginController.loginForm.$valid = true;
        LoginController.submit();
        expect(LoginController.DataService.postLogin).toHaveBeenCalled();
    }));

    it('should have a method submit; should post Login', inject(function () {
        spyOn(LoginController.DataService, 'postLogin').andCallThrough();
        LoginController.userData = {
            username : 'blah',
            password : 'blah'
        };
        LoginController.loginForm.$valid = true;
        LoginController.submit();
        deferred.resolve(fakeData);
        scope.$apply();
        expect(LoginController.userData.token).toBe('123');
    }));

    it('should have a method submit; should post Login -> return false -> error = true', inject(function () {
        spyOn(LoginController.DataService, 'postLogin').andCallThrough();
        LoginController.userData = {
            username : 'blah',
            password : 'blah'
        };
        LoginController.loginForm.$valid = true;
        LoginController.submit();
        deferred.resolve(fakeData0);
        scope.$apply();
        expect(LoginController.formState.error).toBe(true);
    }));


    it('should have a method submit; should post Login -> rejected (500) -> error = true', inject(function () {
        spyOn(LoginController.DataService, 'postLogin').andCallThrough();
        LoginController.userData = {
            username : 'blah',
            password : 'blah'
        };
        LoginController.loginForm.$valid = true;
        LoginController.submit();
        deferred.reject();
        scope.$apply();
        expect(LoginController.formState.error).toBe(true);
    }))
});

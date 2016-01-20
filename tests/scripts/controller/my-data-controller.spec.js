'use strict';

describe('Controller: MyDataController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var MyDataController,
        q,
        deferred,
        deferred1,
        timeout,
        scope,
        fakeData_true = {
            data : true
        },
        fakeData_false = {
            data : false
        },
        fakeData = {
            data : {
                token : '123',
                name: 'marek',
                email: 'marek@marek.de',
                zip: '111111',
                city: 'Berlin',
                description: 'yo!',
                lang_have: 36,
                lang_seek: 36
            }
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $timeout, _$q_) {
        scope = $rootScope.$new();
        timeout = $timeout;
        q = _$q_;
        deferred = q.defer({});
        deferred1 = q.defer({});

        MyDataController = $controller('MyDataController', {
            $scope: scope
        });
        MyDataController.DataService = {
            postChange : function(){
                console.log('posting login');
                return deferred.promise;
            },
            postRegistration : function(){
                console.log('posting registration');
                return deferred1.promise;
            }
        };

        localStorage.removeItem('tandemApp_activities_offerId');
        localStorage.removeItem('tandemApp_activities_searchId');
        localStorage.removeItem('tandemApp_selectedLanguage');
        localStorage.removeItem('tandemApp_userData');

    }));

    it('should initialize a controller', inject(function () {
        expect(MyDataController).toBeDefined();
    }));

    it('should have a variable languageSettings', inject(function () {
        expect(MyDataController.languageSettings).toBeDefined();
    }));

    it('should have a variable LanguageService', inject(function () {
        expect(MyDataController.LanguageService).toBeDefined();
    }));

    it('should have a property language; to be "en"', inject(function () {
        expect(MyDataController.language).toBe('en');
    }));

    it('should have a variable language', inject(function () {
        expect(MyDataController.language).toBeDefined();
    }));

    it('should have a variable ActivitiesService', inject(function () {
        expect(MyDataController.ActivitiesService).toBeDefined();
    }));

    it('should have a variable activities', inject(function () {
        expect(MyDataController.activities).toBeDefined();
    }));

    it('should have a variable activities, length to be 110', inject(function () {
        expect(MyDataController.activities.length).toBe(110);
    }));

    it('should have a variable DataService', inject(function () {
        expect(MyDataController.DataService).toBeDefined();
    }));

    it('should have a variable myDataForm', inject(function () {
        expect(MyDataController.myDataForm).toBeDefined();
    }));

    it('should have a variable formState', inject(function () {
        expect(MyDataController.formState).toBeDefined();
    }));

    it('should have a variable formState.submitted', inject(function () {
        expect(MyDataController.formState.submitted).toBe(false);
    }));

    it('should have a variable formState.success', inject(function () {
        expect(MyDataController.formState.success).toBe(false);
    }));

    it('should have a variable formState.error', inject(function () {
        expect(MyDataController.formState.error).toBe(false);
    }));

    it('should have a method updateLangObjects', inject(function () {
        expect(MyDataController.updateLangObjects).toBeDefined();
    }));

    it('should have a property lang_have; id to be 36', inject(function () {
        MyDataController.updateLangObjects();
        expect(MyDataController.lang_have.id).toBe(36);
    }));

    it('should have a property lang_seek; id to be 36', inject(function () {
        MyDataController.updateLangObjects();
        expect(MyDataController.lang_seek.id).toBe(36);
    }));

    it('should have a property userData', inject(function () {
        expect(MyDataController.userData).toBeDefined();
    }));

    it('should have a property userData.name', inject(function () {
        expect(MyDataController.userData.name).toBeDefined();
    }));

    it('should have a property userData.email', inject(function () {
        expect(MyDataController.userData.email).toBeDefined();
    }));

    it('should have a property userData.zip', inject(function () {
        expect(MyDataController.userData.zip).toBeDefined();
    }));

    it('should have a property userData.city', inject(function () {
        expect(MyDataController.userData.city).toBeDefined();
    }));

    it('should have a property userData.description', inject(function () {
        expect(MyDataController.userData.description).toBeDefined();
    }));

    it('should have a property userData.lang_have_id', inject(function () {
        expect(MyDataController.userData.lang_have_id).toBe(MyDataController.ActivitiesService.offerId);
    }));

    it('should have a property userData.lang_seek_id', inject(function () {
        expect(MyDataController.userData.lang_seek_id).toBe(MyDataController.ActivitiesService.searchId);
    }));

    it('should have a method submitForm', inject(function () {
        expect(MyDataController.submitForm).toBeDefined();
    }));

    it('should set formState.submitted to true after calling method submitForm', inject(function () {
        MyDataController.submitForm();
        expect(MyDataController.formState.submitted).toBe(true);
    }));

    it('should call DataService.postChange if token is set', inject(function () {
        spyOn(MyDataController.DataService, 'postChange').andCallThrough();
        MyDataController.myDataForm.$valid = true;
        MyDataController.userData.token = '123';
        MyDataController.submitForm();
        expect(MyDataController.DataService.postChange).toHaveBeenCalled();
    }));

    it('should call DataService.postChange if token is set; should be successful', inject(function () {
        MyDataController.myDataForm.$valid = true;
        MyDataController.userData.token = '123';
        MyDataController.submitForm();
        deferred.resolve(fakeData_true);
        scope.$apply();
        expect(MyDataController.formState.success).toBe(true);
    }));

    it('should call DataService.postChange if token is set; should NOT be successful', inject(function () {
        MyDataController.myDataForm.$valid = true;
        MyDataController.userData.token = '123';
        MyDataController.submitForm();
        deferred.resolve(fakeData_false);
        scope.$apply();
        expect(MyDataController.formState.success).toBe(false);
    }));

    it('should call DataService.postChange if token is set; error 500', inject(function () {
        MyDataController.myDataForm.$valid = true;
        MyDataController.userData.token = '123';
        MyDataController.submitForm();
        deferred.reject();
        scope.$apply();
        expect(MyDataController.formState.success).toBe(false);
    }));


    it('should call DataService.postRegistration if token is set', inject(function () {
        spyOn(MyDataController.DataService, 'postRegistration').andCallThrough();
        MyDataController.myDataForm.$valid = true;
        delete MyDataController.userData.token;
        MyDataController.submitForm();
        expect(MyDataController.DataService.postRegistration).toHaveBeenCalled();
    }));

    it('should call DataService.postRegistration if token is set; should be successful', inject(function () {
        MyDataController.myDataForm.$valid = true;
        delete MyDataController.userData.token;
        MyDataController.submitForm();
        deferred1.resolve(fakeData);
        scope.$apply();
        expect(MyDataController.formState.success).toBe(true);
    }));

    it('should call DataService.postRegistration if token is set; userData should be reset', inject(function () {
        MyDataController.myDataForm.$valid = true;
        delete MyDataController.userData.token;
        MyDataController.submitForm();
        deferred1.resolve(fakeData);
        scope.$apply();
        expect(MyDataController.formState.success).toBe(true);
    }));

    it('should call DataService.postRegistration if token is set; userData should NOT be reset', inject(function () {
        MyDataController.myDataForm.$valid = true;
        delete MyDataController.userData.token;
        MyDataController.submitForm();
        deferred1.resolve(fakeData_true);
        scope.$apply();
        expect(MyDataController.formState.success).toBe(false);
    }));

    it('should call DataService.postRegistration if token is set; error 500', inject(function () {
        MyDataController.myDataForm.$valid = true;
        delete MyDataController.userData.token;
        MyDataController.submitForm();
        deferred1.reject();
        scope.$apply();
        expect(MyDataController.formState.success).toBe(false);
    }));
});

'use strict';

describe('Directive: my-translation', function () {

    // load the directive's module
    var element;

    beforeEach(function () {
        module('tandemApp');

        window.tandemAppConfig = window.tandemAppConfig || {};
        window.tandemAppConfig.translation = window.tandemAppConfig.translation || {};
        window.tandemAppConfig.translation.en = {
            'challenge_someone' : 'I am testing.'
        };

        console.log('window.tandemAppConfig.translation : ',window.tandemAppConfig.translation);
        element = angular.element('<span data-my-translation="challenge_someone" data-language="en"></span>');
        inject(function ($rootScope, $compile) {
            var scope = $rootScope.$new();
            scope.name = name;
            $compile(element)(scope);
            scope.$digest();
        });
    });

    it('to translate and interpolate to ', function () {
        expect(element.text()).toBe('I am testing.');
    });
});
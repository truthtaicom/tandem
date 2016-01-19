'use strict';

describe('Controller: SearchController', function () {

    // load the controller's module
    beforeEach(module('tandemApp'));

    var SearchController,
		q,
		deferred,
		dataService,
        scope,
		timeout,
		fakeData =  { data : [{"tandem_id":528,"name":"Andreas","description":"Hello. My name is Andreas (53).I´m going to improve my English(B2). I need it for my work abroad.","distance":97,"percentX":26.21589286501137,"percentY":52.387279834760804,"randomDirection":4}] };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $timeout, _$q_) {
		scope = $rootScope.$new();
		timeout = $timeout;
		q = _$q_;
		deferred = q.defer({});
		window.innerHeight = 210;
		window.innerWidth = 100;
		window.latitude = null;
		window.longitude = null;
		localStorage.removeItem('tandemApp_lastSearch_maxDistance');
		localStorage.removeItem('tandemApp_lastSearch_latitude');
		localStorage.removeItem('tandemApp_lastSearch_longitude');
		localStorage.removeItem('tandemApp_position');
		dataService = {
			getResults : function(){
				return deferred.promise;
			}
		};
		SearchController = $controller('SearchController', {
            $scope: scope,
			DataService : dataService
        });
		spyOn(dataService, 'getResults');
		spyOn(SearchController, 'randomizeResults').andCallThrough();
		spyOn(SearchController, 'drawRadar').andCallThrough();
		spyOn(SearchController, 'drawUsers').andCallThrough();
	}));

    it('should initialize a controller', inject(function () {
        expect(SearchController).toBeDefined();
    }));

	it('should have a property canvas', inject(function () {
		expect(SearchController.canvas).toBeDefined();
	}));

	it('should have a property context', inject(function () {
		expect(SearchController.context).toBeDefined();
	}));

	it('should have a property height', inject(function () {
		expect(SearchController.height).toBeDefined();
	}));

	it('should have a property height to be 100', inject(function () {
		expect(SearchController.height).toBe(100);
	}));

	it('should have a property width', inject(function () {
		expect(SearchController.height).toBeDefined();
	}));

	it('should have a property width to be 100', inject(function () {
		expect(SearchController.height).toBe(100);
	}));

	it('should have a property centerY', inject(function () {
		expect(SearchController.centerY).toBeDefined();
	}));

	it('should have a property centerY to be 50', inject(function () {
		expect(SearchController.centerY).toBe(50);
	}));

	it('should have a property centerX', inject(function () {
		expect(SearchController.centerY).toBeDefined();
	}));

	it('should have a property centerX to be 50', inject(function () {
		expect(SearchController.centerY).toBe(50);
	}));

	it('should have a property svg', inject(function () {
		expect(SearchController.svg).toBeDefined();
	}));

	it('should have a property svg', inject(function () {
		expect(SearchController.svg).toBeDefined();
	}));

	it('should have a property languageSettings', inject(function () {
		expect(SearchController.languageSettings).toBeDefined();
	}));

	it('should have a property ActivitiesService', inject(function () {
		expect(SearchController.ActivitiesService).toBeDefined();
	}));

	it('should have a property LanguageService', inject(function () {
		expect(SearchController.LanguageService).toBeDefined();
	}));

	it('should have a property selectedDistance', inject(function () {
		expect(SearchController.selectedDistance).toBeDefined();
	}));

	it('should have a property maxDistance to be 100', inject(function () {
		expect(SearchController.maxDistance).toBe(100);
	}));

	it('should have a property AlertService', inject(function () {
		expect(SearchController.AlertService).toBeDefined();
	}));

	it('should have a property PositionService', inject(function () {
		expect(SearchController.PositionService).toBeDefined();
	}));

	it('should have a property searchResults', inject(function () {
		expect(SearchController.searchResults).toBeDefined();
	}));

	it('should have a property PositionService.chosenPosition.latitude', inject(function () {
		expect(SearchController.PositionService.chosenPosition.latitude).toBe(52.523);
	}));

	it('should have a property PositionService.chosenPosition.longitude', inject(function () {
		expect(SearchController.PositionService.chosenPosition.longitude).toBe(13.413);
	}));

	it('should have a property AlertService.alerts.retrieving_searchresults to be true', inject(function () {
		expect(SearchController.AlertService.alerts.retrieving_searchresults).toBe(true);
	}));

	it('should call SearchController.searchResults.length to be 1', inject(function () {
		deferred.resolve(fakeData);
		scope.$apply();
		expect(SearchController.searchResults.length).toBe(1);
	}));

	it('should call AlertService.alerts.retrieving_searchresults to be false', inject(function () {
		deferred.resolve(fakeData);
		scope.$apply();
		expect(SearchController.AlertService.alerts.retrieving_searchresults).toBe(false);
	}));

	it('should call drawUsers; when request returns', inject(function () {
		deferred.resolve(fakeData);
		scope.$apply();
		expect(SearchController.drawUsers).toHaveBeenCalled();
	}));

	it('should have a property searchResults', inject(function () {
		expect(SearchController.searchResults).toBeDefined();
	}));

	it('should have a method changeDistance', inject(function () {
		expect(SearchController.changeDistance).toBeDefined();
	}));

	it('should have a method changeDistance, not to call drawRadar if distance did not change', inject(function () {
		SearchController.changeDistance();
		timeout.flush();
		expect(SearchController.drawRadar).not.toHaveBeenCalled();
	}));

	it('should have a method changeDistance, to call drawRadar if distance changed', inject(function () {
		SearchController.lastSelectedDistance = 0;
		SearchController.changeDistance();
		timeout.flush();
		expect(SearchController.drawRadar).toHaveBeenCalled();
	}));

	it('should have a method changeDistance, not to call drawUsers if distance did not change', inject(function () {
		SearchController.changeDistance();
		timeout.flush();
		expect(SearchController.drawUsers).not.toHaveBeenCalled();
	}));

	it('should have a method changeDistance, to call drawUsers if distance did change indeed', inject(function () {
		SearchController.lastSelectedDistance = 0;
		SearchController.changeDistance();
		timeout.flush();
		expect(SearchController.drawUsers).toHaveBeenCalled();
	}));

	it('should have a method getOffset', inject(function () {
		expect(SearchController.getOffset).toBeDefined();
	}));

	it('should have a method getOffset; should return an array with lenght 2', inject(function () {
		expect(SearchController.getOffset(2,3).length).toBe(2);
	}));

	it('should have a method getOffset', inject(function () {
		expect(SearchController.getOffset).toBeDefined();
	}));

	it('should have a method getOffset; should return an array with lenght 2', inject(function () {
		expect(SearchController.getOffset(2,3).length).toBe(2);
	}));

	it('should have a method drawImage', inject(function () {
		expect(SearchController.drawImage).toBeDefined();
	}));

	it('should have a method drawImage; should return an image object', inject(function () {
		expect(typeof SearchController.drawImage(2,3)).toBe('object');
	}));

	it('should have a method randomizeResults', inject(function () {
		expect(SearchController.randomizeResults).toBeDefined();
	}));

	it('should have a method randomizeResults; to return an array with length same as array passed', inject(function () {
		var randomize = SearchController.randomizeResults();
		expect(randomize(fakeData.data).length).toBe(fakeData.data.length);
	}));

	it('should have a method drawRadar', inject(function () {
		expect(SearchController.drawRadar).toBeDefined();
	}));

	it('should have a method drawRadar', inject(function () {
		expect(SearchController.drawRadar).toBeDefined();
	}));

	it('should have a method drawRadar; to return false when no DOM element present', inject(function () {
		expect(SearchController.drawRadar()).toBe(false);
	}));

	it('should have a method drawRadar; to return true when no DOM element present', inject(function () {
		var node = document.createElement("DIV");                 // Create a <li> node
		node.setAttribute("id", "forRadar");
		document.body.appendChild(node);
		expect(SearchController.drawRadar()).toBe(true);
	}));

	it('should have a method drawUsers', inject(function () {
		expect(SearchController.drawUsers).toBeDefined();
	}));

	it('should have a method drawUsers; searchResults to now contain property x', inject(function () {
		SearchController.searchResults = fakeData.data;
		var userResult = SearchController.drawUsers();
		setTimeout(function(){
			expect(SearchController.searchResults[0].x).toBeDefined();
		},500);
	}));

	it('should have a method drawUsers; searchResults to now contain property y', inject(function () {
		SearchController.searchResults = fakeData.data;
		var userResult = SearchController.drawUsers();
		setTimeout(function(){
			expect(SearchController.searchResults[0].y).toBeDefined();
		},500);
	}));
});

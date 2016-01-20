class SearchController {
	constructor ($rootScope, $timeout, svgIcon, $location, defaultDistance, maxDistance, languageSettings, ActivitiesService, LanguageService, DataService, AlertService, PositionService) {
		//local
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.height = window.innerHeight - 110; //for global_alerts & slider & footer
		this.width = window.innerWidth;
		this.centerY = parseInt((this.height / 2), 10);
		this.centerX = parseInt((this.width / 2), 10);
		this.svg = svgIcon;
		this.svgWidth = 25;
		// DI
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.languageSettings = languageSettings;
		this.ActivitiesService = ActivitiesService;
		this.LanguageService = LanguageService;
		this.selectedDistance = defaultDistance;
		this.lastSelectedDistance = defaultDistance;
		this.maxDistance = maxDistance;
		this.AlertService = AlertService;
		this.PositionService = PositionService;
		this.$rootScope.$broadcast('show-alert');
		this.searchResults = [];
		this.drawRadar();
		if (!this.PositionService.chosenPosition.latitude || !this.PositionService.chosenPosition.longitude) {
			this.AlertService.alerts.retrieving_searchresults = false;
			$location.path('/');
		} else if (
			(parseInt(this.ActivitiesService.offerObj.id) === parseInt(localStorage.getItem('tandemApp_activities_offerId'))) &&
			(parseInt(this.ActivitiesService.searchObj.id) === parseInt(localStorage.getItem('tandemApp_activities_searchId'))) &&
			(parseInt(this.maxDistance) === parseInt(localStorage.getItem('tandemApp_lastSearch_maxDistance'))) &&
			(this.PositionService.chosenPosition.longitude.toString() === localStorage.getItem('tandemApp_lastSearch_longitude')) &&
			(this.PositionService.chosenPosition.latitude.toString() === localStorage.getItem('tandemApp_lastSearch_latitude'))
		) {
			this.searchResults = JSON.parse(localStorage.getItem('tandemApp_lastSearch_results'));
			this.drawUsers(true);
		} else {
			this.AlertService.alerts.retrieving_searchresults = true;
			DataService.getResults().then((data) => {
				localStorage.setItem('tandemApp_lastSearch_maxDistance', this.maxDistance);
				localStorage.setItem('tandemApp_lastSearch_latitude', this.PositionService.chosenPosition.latitude);
				localStorage.setItem('tandemApp_lastSearch_longitude', this.PositionService.chosenPosition.longitude);
				this.AlertService.alerts.retrieving_searchresults = false;
				this.$rootScope.$broadcast('show-alert');
				if (data && data.data.length > 0) {
					let randomize = this.randomizeResults();
					this.searchResults = randomize(data.data);
					localStorage.setItem('tandemApp_lastSearch_results', JSON.stringify(this.searchResults));
					this.drawUsers();
				}
			});
		}
	}
	changeDistance () {
		/*
		 * wait 2 seconds to see if the user actually changed the distance
		 */
		this.$timeout(() => {
			if (this.lastSelectedDistance !== this.selectedDistance) {
				this.drawRadar();
				this.drawUsers();
				this.lastSelectedDistance = this.selectedDistance;
			}
		}, 2000);
	}
	getOffset (selectDistance, resultDistance) {
		let x = Math.random() * (this.width - 2),
			y = Math.random() * (this.height - 2),
			x2 = x / 2,
			y2 = y / 2,
			quote = resultDistance / selectDistance;
		return [x2 * quote, y2 * quote];
	}
	drawImage (x, y) {
		let mySvg,
			mySrc,
			source;
		mySvg = this.svg;
		mySrc = 'data:image/svg+xml;base64,' + window.btoa(mySvg);
		source = new Image();
		source.src = mySrc;
		source.onload = () => {
			this.context.globalAlpha = 0.8;
			this.context.drawImage(source, x, y, this.svgWidth, this.svgWidth);
			this.context.restore();
		};
		return source;
	}
	randomizeResults () {
		return (data) => {
			var resultArray = [];
			for (let resultArrayCounter = 0; resultArrayCounter < data.length; resultArrayCounter++) {
				let percentX = 0,
					percentY = 0,
					offset = this.getOffset(this.maxDistance, data[resultArrayCounter].distance, resultArrayCounter),
					offsetX = offset[0],
					offsetY = offset[1],
					randomDirection = parseInt(Math.random() * 4 + 1, 10);

				percentX = (offsetX / (this.width / 2)) * 100;
				percentY = (offsetY / (this.height / 2)) * 100;
				data[resultArrayCounter].percentX = percentX;
				data[resultArrayCounter].percentY = percentY;
				data[resultArrayCounter].randomDirection = randomDirection;
				resultArray.push(data[resultArrayCounter]);
			}
			return resultArray;
		};
	}
	drawRadar () {
		if (document.getElementById('forRadar')) {
			/*
			 * delete existing canvases
			 */
			document.getElementById('forRadar').innerHTML = '';

			if (document.getElementById('forRadar').children.length > 0) {
				document.getElementById('forRadar').children[0].remove();
			}

			let radius = 10,
				radarRingCounter = 0,
				minRadiusFor5Rings = parseInt(this.width, 10) / 1.2 / 5;

			this.canvas.setAttribute('width', this.width);
			this.canvas.setAttribute('height', this.height);
			this.canvas.setAttribute('style', 'position: absolute; x:0; y:0;');

			document.getElementById('forRadar').appendChild(this.canvas);

			this.context.clearRect(0, 0, this.width, this.height);

			this.context.beginPath();
			this.context.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
			this.context.fillStyle = '#000';
			this.context.fill();
			this.context.stroke();

			for (radarRingCounter = 0; radarRingCounter < 5; radarRingCounter++) {
				this.context.beginPath();
				this.context.arc(this.centerX, this.centerY, minRadiusFor5Rings * radarRingCounter, 0, 2 * Math.PI, false);
				if (radarRingCounter < 4) {
					this.context.fill();
					this.context.fillStyle = '#8bc717';
					this.context.globalAlpha = parseFloat(radarRingCounter / 10) - 0.1;
				}
				this.context.stroke();
			}

			this.canvas.onclick = (e) => {

				var thisX = parseInt(e.clientX, 10),
					thisY = parseInt(e.clientY, 10);

				for (let i = 0; i < this.searchResults.length; i++) {
					/*
					 * check if any of the people in the array have the coordinates clicked
					 * (+/- 5px as this is the radius)
					 * AND
					 *  --- substract 60 px because of header !!! ---> 0 at the moment
					 * (look above : we substracted 120px from total height)
					 */

					if (
						((parseInt(this.searchResults[i].x) + parseInt(this.svgWidth)) >= thisX && this.searchResults[i].x <= thisX) &&
						((parseInt(this.searchResults[i].y) + parseInt(this.svgWidth)) >= (thisY - 60) && this.searchResults[i].y <= thisY - 60)
					) {
						//currentProfileIndex=i;
						console.log('User ', i);
					}
				}

			};

			return true;
		} else {
			return false;
		}
	}
	drawUsers (hasReturned) {
		var done = false;
		for (let resultArrayCounter = 0; resultArrayCounter < this.searchResults.length; resultArrayCounter++) {
			/*
			 * hasReturned === true ; if the data is already existing
			 * hasReturned === false; if the data needs to be set
			 */
			if (!hasReturned) {
				var newX,
					newY,
					forX = ((this.maxDistance / parseInt(this.selectedDistance, 10)) * this.searchResults[resultArrayCounter].percentX),
					forY = ((this.maxDistance / parseInt(this.selectedDistance, 10)) * this.searchResults[resultArrayCounter].percentY),
					offsetX = forX, // (forX * 100) / (width / 2), //apply the percent to half the width (x)
					offsetY = forY, //(forY * 100) / (height / 2), //apply the percent to half the height (x)
					randomDirection = this.searchResults[resultArrayCounter].randomDirection;
				/*
				 * show only results with 100% or less (if magnified)
				 */
				if (parseInt(offsetX / 2, 10) <= 100 && parseInt(offsetY / 2, 10) <= 100) {
					switch (randomDirection) {
						case 1:
							newX = parseInt(this.centerX + offsetX, 10);
							newY = parseInt(this.centerY + offsetY, 10);
							break;
						case 2:
							newX = parseInt(this.centerX - offsetX, 10);
							newY = parseInt(this.centerY - offsetY, 10);
							break;
						case 3:
							newX = parseInt(this.centerX + offsetX, 10);
							newY = parseInt(this.centerY - offsetY, 10);
							break;
						case 4:
							newX = parseInt(this.centerX - offsetX, 10);
							newY = parseInt(this.centerY + offsetY, 10);
							break;
						default:
							newX = parseInt(this.centerX + 0, 10);
							newY = parseInt(this.centerY + 0, 10);
							break;
					}
					/*
					 * -> resultArray.push coordinates
					 */
					this.searchResults[resultArrayCounter].x = newX;
					this.searchResults[resultArrayCounter].y = newY;
					this.drawImage(this.searchResults[resultArrayCounter].x, this.searchResults[resultArrayCounter].y);
				}
			} else {
				this.drawImage(this.searchResults[resultArrayCounter].x, this.this.searchResults[resultArrayCounter].y);
			}
			if (parseInt(resultArrayCounter) + 1 === this.searchResults.length) {
				done = true;
			}
		}
		return done;
	}
}

SearchController.$inject = ['$rootScope', '$timeout', 'svgIcon', '$location', 'defaultDistance', 'maxDistance', 'languageSettings', 'ActivitiesService', 'LanguageService', 'DataService', 'AlertService', 'PositionService'];

export { SearchController };

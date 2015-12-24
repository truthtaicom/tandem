class PositionService {
    constructor (positionsData) {
        // DI
        this.positionsData = positionsData;
        // local vars
        this.chosenPosition = localStorage.getItem('tandemApp_position') ? JSON.parse(localStorage.getItem('tandemApp_position')) : this.positionsData[2]; //Berlin
	}

	updatePosition () {
		if (parseInt(this.chosenPosition.id) === 0) {
			this.chosenPosition.latitude = window.latitude;
			this.chosenPosition.longitude = window.longitude;
		}
	}

    update (posObj) {
	    this.chosenPosition = posObj;
        localStorage.setItem('tandemApp_position', JSON.stringify(posObj));
	}
}

PositionService.$inject = ['positionsData'];

export { PositionService };

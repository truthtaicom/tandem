class PositionService {
    constructor (positionsData) {
        // DI
        this.positionsData = positionsData;
        // local vars
        this.chosenPosition = localStorage.getItem('tandemApp_position') ? JSON.parse(localStorage.getItem('tandemApp_position')) : this.positionsData[2]; //Berlin
	}
	updatePosition () {
		if (parseInt(this.chosenPosition.id) === 0) {
			this.chosenPosition.latitude = typeof window.latitude !== 'undefined' && window.latitude ? window.latitude : null;
			this.chosenPosition.longitude = typeof window.longitude !== 'undefined' && window.longitude ? window.longitude : null;
		}
	}
    update (posObj) {
		this.chosenPosition = posObj;
        localStorage.setItem('tandemApp_position', JSON.stringify(posObj));
	}
}

PositionService.$inject = ['positionsData'];

export { PositionService };

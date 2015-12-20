class PositionService {
    constructor (positionsData) {
        // DI
        this.positionsData = positionsData;
        // local vars
        this.chosenPosition = localStorage.getItem('tandemApp_position') ? JSON.parse(localStorage.getItem('tandemApp_position')) : this.positionsData[2]; //Berlin
    }

    update (posObj) {
        this.chosenPosition = posObj;
        localStorage.setItem('tandemApp_position', JSON.stringify(posObj));
    }
}

PositionService.$inject = ['positionsData'];

export { PositionService };

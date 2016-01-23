class AlertService {
    constructor () {
        // push into them !
        this.alerts = {
            retrieving_position: false,
            retrieving_searchresults: false
        };
    }
}

AlertService.$inject = [];

export { AlertService };

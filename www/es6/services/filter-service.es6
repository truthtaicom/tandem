class FilterService {
    constructor () {

    }
    filterArray (arr, prop) {
        var newArray = [];
        angular.forEach(arr, (_val) => {
            newArray.push({ id: _val['id'], 'name': _val[prop] });
        });
        return newArray;
    }
    filterObjectFromArray (arr, prop, val) {
            var returnObj = {};
        angular.forEach(arr, (_val) => {
            if (parseInt(_val[prop]) === parseInt(val)) {
                returnObj = _val;
            }
        });
        return returnObj;
    }

}

FilterService.$inject = [];

export { FilterService };

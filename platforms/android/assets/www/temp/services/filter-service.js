'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterService = function () {
    function FilterService() {
        _classCallCheck(this, FilterService);
    }

    _createClass(FilterService, [{
        key: 'filterArray',
        value: function filterArray(arr, prop) {
            var newArray = [];
            angular.forEach(arr, function (_val) {
                newArray.push({ id: _val['id'], 'name': _val[prop] });
            });
            return newArray;
        }
    }, {
        key: 'filterObjectFromArray',
        value: function filterObjectFromArray(arr, prop, val) {
            var returnObj = {};
            angular.forEach(arr, function (_val) {
                if (parseInt(_val[prop]) === parseInt(val)) {
                    returnObj = _val;
                }
            });
            return returnObj;
        }
    }]);

    return FilterService;
}();

FilterService.$inject = [];

exports.FilterService = FilterService;
//# sourceMappingURL=filter-service.js.map

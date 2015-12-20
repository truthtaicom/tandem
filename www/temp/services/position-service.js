'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PositionService = (function () {
    function PositionService(positionsData) {
        _classCallCheck(this, PositionService);

        // DI
        this.positionsData = positionsData;
        // local vars
        this.chosenPosition = localStorage.getItem('tandemApp_position') ? JSON.parse(localStorage.getItem('tandemApp_position')) : this.positionsData[2]; //Berlin
    }

    _createClass(PositionService, [{
        key: 'update',
        value: function update(posObj) {
            this.chosenPosition = posObj;
            localStorage.setItem('tandemApp_position', JSON.stringify(posObj));
        }
    }]);

    return PositionService;
})();

PositionService.$inject = ['positionsData'];

exports.PositionService = PositionService;
//# sourceMappingURL=position-service.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterController = function FooterController($rootScope, $location) {
	var _this = this;

	_classCallCheck(this, FooterController);

	/*
  * $scope , da auch in index.html in bottom links
  */
	this.location = $location.$$path;
	$rootScope.$on('$routeChangeStart', function () {
		_this.location = $location.$$path;
	});
};

FooterController.$inject = ['$rootScope', '$location'];

exports.FooterController = FooterController;
//# sourceMappingURL=footer-controller.js.map

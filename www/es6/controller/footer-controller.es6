class FooterController {
    constructor ($rootScope, $location) {
		/*
		 * $scope , da auch in index.html in bottom links
		 */
		this.location = $location.$$path;
		$rootScope.$on('$routeChangeStart', () => {
			this.location = $location.$$path;
		});
    }
}

FooterController.$inject = ['$rootScope', '$location'];

export { FooterController };

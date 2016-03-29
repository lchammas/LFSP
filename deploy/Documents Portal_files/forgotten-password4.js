angular.module('portal.forgottenPassword4', []).controller(
		'forgottenPassword4',
		[ '$scope', '$http', '$location', function($scope, $http, $location) {

		// Call a function declared in home.js to manage
		// NavBar menus
		$scope.setNavMenus($location.path());
		
		$scope.forwardToLogin = function() {	
			$location.path("/login");
		};
	} ]);
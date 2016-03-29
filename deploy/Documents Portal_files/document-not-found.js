angular.module('portal.documentNotFoundController',[])
.controller('DocumentNotFoundController', [ '$scope', '$http', '$location', '$rootScope', 
        function($scope, $http, $location, $rootScope) {

		$("header").show();
		
		//TODO clear scope
		$scope.setNavMenus($location.path());
		$scope.user.email = $scope.readCookie("ADMODP-userEmail");
		$scope.user.password = "";
		$scope.user.dob.date = "";
		$scope.user.dob.month = "";
		$scope.user.dob.year = "";
		$rootScope.auth.token = 0;
		$rootScope.auth.timeout  = 0;

		// Go to the login page
		$scope.goLogin = function(){

			$location.path('/login');

		}
		
} ]);

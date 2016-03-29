angular.module('portal.forgottenPassword1', []).controller(
		'forgottenPassword1',
		[ '$scope', '$http', '$location', function($scope, $http, $location) {

		// Call a function declared in home.js to manage
		// NavBar menus
		$scope.setNavMenus($location.path());

		/*$scope.checkForgotPassword1Valid = function() {

			$scope.forgotPasswordError = false;
			if ($scope.user.dob.date.length > 0
					&& $scope.user.dob.month.length > 0
					&& $scope.user.dob.year.length == 4
					&& $scope.user.email != null
					&& $scope.user.email != "")
				$scope.forgotP1Invalid = false;
			else
				$scope.forgotP1Invalid = true;
		};*/

		$scope.checkForgotPassword1OK = function() {
			return true;
		};

		$scope.checkForgotPassEmail = function(){
			$scope.hasForgotPassEmailError = $scope.forgotP1Form.email.$invalid ? true : false;
		};
		
		$scope.helpClasses = new Array("help-icon",
				"help-close");
		$scope.helpBox1 = "help-icon";
		$scope.counter1 = 0;
		$scope.helpTip1 = false;
		$scope.helpBox2 = "help-icon";
		$scope.counter2 = 0;
		$scope.helpTip2 = false;
		$scope.qAnswered = false;

		$scope.helpBoxClick = function(num) {
			switch (num) {
			case 1:
				$scope.counter1 += 1;
				$scope.helpBox1 = $scope.helpClasses[$scope.counter1 % 2];
				$scope.helpTip1 = !$scope.helpTip1;
				break;
			case 2:
				$scope.counter2 += 1;
				$scope.helpBox2 = $scope.helpClasses[$scope.counter2 % 2];
				$scope.helpTip2 = !$scope.helpTip2;
				break;
			case 3:
				$scope.counter3 += 1;
				$scope.helpBox3 = $scope.helpClasses[$scope.counter3 % 2];
				$scope.helpTip3 = !$scope.helpTip3;
				break;
			}
		};

		$scope.setForgotP1Form = function(form) {
			$scope.forgotP1Form = form;
		};

		$scope.forgotPasswordError = false;
		$scope.forgotPasswordOne = function() {
			$scope.forgotPasswordError = false;
			var forgotPasswordRequest = new Object();
			forgotPasswordRequest.email = $scope.user.email;
			forgotPasswordRequest.dob = $scope.user.dob.ddmmyyyy();
			forgotPasswordRequest.brand = $scope.user.policyReference.brand;

			$http(
					{
						method : 'POST',
						url : "//"
								+ window.location.hostname
								+ "/OPS/service/LDAPService/forgotPassword",
						params : {
							forgotPasswordRequest : forgotPasswordRequest
						}
					})
					.success(
							function(data, status, headers,
									config) {
								if (data == '-1') {
									$scope.forgotPasswordError = true;
								} else {
									$scope.forgotPasswordError = false;
									$scope.user.securityQIndexes = data;
									$location
											.path("/forgotten-password2");
								}
							}).error(
							function(data, status, headers,
									config) {
								$scope.forgotPasswordError = true;
							});
		};

	} ]);
angular.module('portal.forgottenPassword2', []).controller(
		'forgottenPassword2',
		[ '$scope', '$http', '$location', function($scope, $http, $location) {

		// Call a function declared in home.js to manage
		// NavBar menus
		$scope.setNavMenus($location.path());

		$scope.setForgotP1Form = function(form) {
			$scope.forgotP1Form = form;
		};

		$scope.resetChoice = '';
		$scope.forgotPassword2Init = function(){
			if($scope.user.dob.ddmmyyyy() == "00")
				$location.path("/forgotten-password1");
		};
		$scope.forgotPassword2Init();

		$scope.forgotPasswordTwo = function() {
			if ($scope.resetChoice == "email") {
				$scope.sendForgottenPasswordEmail();
			} else if ($scope.resetChoice == "questions") {
				$scope.getChosenSecurityQuestions();
				$location.path("/forgotten-password3");
			}
		};

		$scope.sendForgottenPasswordEmail = function() {
			var forgotPasswordEmailRequest = new Object();
			forgotPasswordEmailRequest.brand = $scope.user.policyReference.brand;
			forgotPasswordEmailRequest.email = $scope.user.email;
			forgotPasswordEmailRequest.dob = $scope.user.dob.ddmmyyyy();

			$http(
					{
						method : 'POST',
						url : "//"
								+ window.location.hostname
								+ "/OPS/service/LDAPService/forgotPasswordEmail",
						params : {
							forgotPasswordEmailRequest : forgotPasswordEmailRequest
						}
					})
					.success(
							function(data, status, headers,
									config) {
								$location.path("/forgotten-password4");
							})
					.error(
							function(data, status, headers,
									config) {
								$scope.showLoadingModal = false;
								$scope.openPortalDownModal();
							});
		};

		$scope.getChosenSecurityQuestions = function() {
			$http(
					{
						method : 'POST',
						url : "//"
								+ window.location.hostname
								+ "/OPS/service/DatabaseService/chosenSecurityQuestions",
						params : {
							chosenQuestions : $scope.user.securityQIndexes
						}
					})
					.success(
							function(data, status, headers,
									config) {
								for (var i = 0; i < data.length; i++) {
									var o = new Object();
									o.content = data[i]["question"];
									o.id = data[i]["id"];
									o.status = false;
									o.answer = "";
									if ($scope.selectedQuestions[i] == null) {
										$scope.selectedQuestions
												.push(o);
									}
								}
								return;
							})
					.error(
							function(data, status, headers,
									config) {
								$scope.showLoadingModal = false;
								$scope.openPortalDownModal();
							});
		};

	} ]);
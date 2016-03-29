angular.module('portal.accountSettings', [])
.controller('accountSettings',
	['$scope', '$http', '$location', 'dataSecQ', 
	function($scope, $http, $location, dataSecQ) {

		// Initialisation
		// NavBar menus
		$scope.setNavMenus($location.path());
		// Get the security question indexes and then get the matching questions
		getSecQsInds();

//////////// Implementation /////////////////////

		function getSecQsInds(){
			//
			var loginRequest = {
				email: $scope.user.email,
				dob: $scope.user.dob.ddmmyyyy(),
				brand: $scope.user.policyReference.brand
			}

			var promise = dataSecQ.getSecQsInds(loginRequest);
			promise.then(
				function(result) {
					if(!result.err) {
						// Saves indexes to the user object in scope
						$scope.user.securityQIndexes = result.data;
						// Call a routine to get the question text
						getChosenSecQs();
					} else {
						// Match the error code to the scope var which shows a modal
						if(result.type === 'failedSearch') {
							$scope.failedSearch = true;
						} else {
							$scope.showLoadingModal = false;
							$scope.openPortalDownModal();
						}
					}
				}
			);
		}


		function getChosenSecQs(){
			//
			var promise = dataSecQ.getChosenQs($scope.user.securityQIndexes);
			promise.then(
				function(result) {
					if(!result.err) {
						// Display the questions
						$scope.selectedQuestions = result;
					} else {
						// Display the error message
						$scope.showLoadingModal = false;
						$scope.openPortalDownModal();
					}
				}
			);
		}


	} 
]);
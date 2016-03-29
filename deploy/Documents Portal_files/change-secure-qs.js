angular.module('portal.changeSecureQs', [])
.controller('changeSecureQs',
	['$scope', '$http', '$location', 'dataSecQ', 
	function($scope, $http, $location, dataSecQ) {

		// Initialisation
		$scope.chosenQs = [];
		getSecQuestions();

		// NavBar menus
		$scope.setNavMenus($location.path());

		// Associate click events with handler functions
		$scope.checkSAnswers = checkSAnswers;
		$scope.checkSQuestions = checkSQuestions;
		$scope.submitChangedSecQs = submitChangedSecQs;


//////////// Implementation /////////////////////

		function submitChangedSecQs() {

			$scope.securityQ1 = $scope.chosenQs[0].id;
			$scope.securityQ2 = $scope.chosenQs[1].id;
			$scope.securityA1 = $scope.chosenQs[0].answer;
			$scope.securityA2 = $scope.chosenQs[1].answer;

			// Security answers have not been provided
			if(($scope.securityA1 === "") || ($scope.securityA2 === "")) return;
			var securityQuestionsRequest = {
				email: $scope.user.email,
				dob: $scope.user.dob.ddmmyyyy(),
				brand: $scope.user.policyReference.brand,
				secQ1Index: $scope.securityQ1,
				secQ2Index: $scope.securityQ2,
				secQ1Answer: $scope.securityA1,
				secQ2Answer: $scope.securityA2
			};
			//console.log('submitChangedSecQs clicked')

			var promise = dataSecQ.updateChangedSecQs(securityQuestionsRequest);
			promise.then(
				function(result) {
					if(!result.err) {
						//$scope.policyNumbers = result.data;
						//console.log(result);
						$location.path("/account-settings");
					} else {
						$scope.openPortalDownModal();
					}
				}
			);
			/*
			$http(
					{
						method : 'POST',
						url : "//"
								+ window.location.hostname
								+ "/OPS/service/LDAPService/changeSecurityQuestions",
						params : {
							securityQuestionsRequest : securityQuestionsRequest
						}
					})
					.success(
							function(data, status, headers,
									config) {
								if (data == '-1') {
									$scope.nosecurity = true;
								} else {
									$scope.nosecurity = false;
									//$scope.user.securityQIndexes = data;
									$location
											.path("/account-settings");
								}
							}).error(
							function(data, status, headers,
									config) {
								$scope.nosecurity = true;
							});
*/
			


		};


		function checkSAnswers() {
			var chosenQs = $scope.chosenQs;
			var numOfQues = 2;
			// Set the visibility of the Finish Registration button
			if((chosenQs.length >= numOfQues) 
				&& (chosenQs[0].answer !== '') 
				&& (chosenQs[1].answer !== '')) {
				$scope.qsReady = true;
			}else{
				$scope.qsReady = false;
			}
		};

    function checkSQuestions(newId) {
			var chosenQs = $scope.chosenQs;
			var numOfQues = 2;
			var chosenQ;
			var inChosen;

			// Get the chosen question
			chosenQ = getByProp('id', newId, $scope.questions);
			// If question is in the chosen questions get the index
			inChosen = getIndByProp('id', newId, chosenQs);
			// If not in chosen questions
			if(inChosen < 0){
				// If less than number of questions
				if (chosenQs.length < (numOfQues)){
					chosenQs.push(chosenQ);
				} else {
					// Unset the status flag
					chosenQ.status = false;
				}
			} else { // Already in chosen, remove and reset status
				chosenQs.splice(inChosen, 1);
				chosenQ.status = false;
			}

			$scope.checkSAnswers();
		};


		function getSecQuestions() {
			// Call method from security questions data service
			var promise = dataSecQ.getSecurityQuestions();
			promise.then(
				function(result) {
					if(!result.err) {
						// Display the questions
						$scope.questions = result.dat;
					} else {
						// Display the error message
						$scope.openPortalDownModal();
					}
				}
			);

		}


		// Get an item from an array by property
		function getByProp(propertyName, propertyValue, collection) {
			var i=0, len=collection.length;
			for (; i<len; i++) {
				if (collection[i][propertyName] == propertyValue) {
					//return collection[i];
					return collection[i];
				}
			}
		}


		// Get the index of an item from an array by property
		function getIndByProp(propertyName, propertyValue, collection) {
			var i=0, len=collection.length;
			for (i; i<len; i++) {
				if (collection[i][propertyName] == propertyValue) {
					return i;
				}
			}
			return -1;
		}


	} 
]);
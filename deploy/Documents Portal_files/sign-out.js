angular.module('portal.signOut', []).controller(
		'signOut',
		[ '$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {

			//TODO clear scope
			$scope.setNavMenus($location.path());
			$scope.user.email = $scope.readCookie("ADMODP-userEmail");

			$scope.user.dob.date = "";
			$scope.user.dob.month = "";
			$scope.user.dob.year = "";

			$scope.user.firstName = "";
			$scope.user.surname = "";
			$scope.user.postcode = "";

			$scope.user.password = "";
			$scope.user.pw1 = "";
			$scope.user.pw2 = "";
			
			 for (i=0;i<$scope.questions.length;i++){
			    	//reset the status and answer 
			    	$scope.questions[i].status=false;
			    	$scope.questions[i].answer="";
			    }	
			$scope.selectedQuestions=[];
			$scope.user.securityQIndexes = {};
			$scope.chosenQs = [];
			$scope.securityQ1 = null;
			$scope.securityQ2 = null;
			$scope.securityA1 = "";
			$scope.securityA2 = "";


			$rootScope.auth.token = 0;
			$rootScope.auth.timeout  = 0;
			$location.path('#/login');
	      
		}]);
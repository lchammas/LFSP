angular.module('portal.forgottenPassword3', []).controller(
		'forgottenPassword3',
		[ '$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {

		// Call a function declared in home.js to manage
		// NavBar menus
		
		$scope.secQsLocked = false;
			
		$scope.setNavMenus($location.path());

		$scope.forgottenPassword3Init = function(){
			
			if($scope.user.dob.ddmmyyyy() == "00")
				$location.path("/forgotten-password1");
			
			$scope.user.passwordConfirm = "";
			$scope.user.pw1 = "";
			$scope.user.pw2 = "";
			
			if ($scope.selectedQuestions.length >= 2){
				$scope.selectedQuestions[0].answer= "";
				$scope.selectedQuestions[1].answer= "";
			}
		
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

		$scope.checkSecurityAnswers = function() {
			$scope.secQsLocked = false;
			
			var securityQuestionsRequest = new Object();
			securityQuestionsRequest.email = $scope.user.email;
			securityQuestionsRequest.dob = $scope.user.dob.ddmmyyyy();
			securityQuestionsRequest.brand = $scope.user.policyReference.brand;
			if ($scope.selectedQuestions.length >= 2) {
				securityQuestionsRequest.secQ1Index = $scope.selectedQuestions[0].id;
				securityQuestionsRequest.secQ1Answer = $scope.selectedQuestions[0].answer;
				securityQuestionsRequest.secQ2Index = $scope.selectedQuestions[1].id;
				securityQuestionsRequest.secQ2Answer = $scope.selectedQuestions[1].answer;
			}
			;

			$http(
					{
						method : 'POST',
						url : "//"
								+ window.location.hostname
								+ "/OPS/service/LDAPService/securityQuestions",
						params : {
							securityQuestionsRequest : securityQuestionsRequest
						}
					})
					.success(
							function(data, status, headers,
									config) {
								if (data == '-1'){
									$scope.securityQError = true;
								} else if(data == '-2'){
									$scope.openPortalDownModal();
								} else if(data == '-3'){
									$scope.securityQError = false;
									$scope.secQsLocked = true;
					 			} else {
					 				$scope.securityQError = false;
					 				var array = data.split(";");
					 	    		for(var i=1;i<array.length;i++) {
					 	    			// If the last item of data
					 	    			if(i==array.length-1){
					 	    				var timeout = (new Date()).getTime() + 60000;
					 	    				$rootScope.auth.timeout  = timeout;
					 	    				$rootScope.auth.token = array[i];
					 	    			// If the last but two item of data
					 	    			}else if(i==array.length-2){
					 	    				$scope.user.surname = array[i];
					 	    			// If the last but three item of data
					 	    			}else if(i==array.length-3){
					 	    				$scope.user.firstName = array[i];
					 	    			}else if($.inArray(array[i], $scope.policyNumbers) < 0){
					 	    				$scope.policyNumbers.push(array[i]);
					 	    			}
					 	    		}
									$scope.qAnswered = true;
								}
								return;
							}).error(
							function(data, status, headers,
									config) {
								  
								 return;
							});
		};
		
		$scope.updatePassword = function() {
			$scope.showLoadingModal = true;
	 		var updatePasswordRequest = new Object();
	 		updatePasswordRequest.email = $scope.user.email;
	 		updatePasswordRequest.password = $scope.user.pw1;
	 		updatePasswordRequest.dob = $scope.user.dob.ddmmyyyy();
	 		updatePasswordRequest.brand = $scope.user.policyReference.brand;
	 		updatePasswordRequest.secQ1Index = $scope.selectedQuestions[0].id;
	 		updatePasswordRequest.secQ1Answer = $scope.selectedQuestions[0].answer;
	 		updatePasswordRequest.secQ2Index = $scope.selectedQuestions[1].id;
	 		updatePasswordRequest.secQ2Answer = $scope.selectedQuestions[1].answer;
	 		

	 		$http({
	 			method: 'POST', 
	 			url: "//" + window.location.hostname + "/OPS/service/LDAPService/updatePassword",
	 			headers: { 'portal-access-token': $rootScope.auth.token },
	 			params: {updatePasswordRequest: updatePasswordRequest }
	 		}).
	 		success(function(data, status, headers, config) {
	 			 if(data == -1){
	 				$scope.securityQError = true;
	 			 }else if(data == -2){
	 				$scope.openPortalDownModal();
	 			 }else{
	 				$scope.user.password = $scope.user.pw1;
	 				$scope.processLoginData(data); 
		 			$location.path("/policies");
	 			 }
	 		}).
	 		error(function(data, status, headers, config) {
	 			alert("UpdatePassword call failed");
	 		});
		};
		
		$scope.sendEmail = function() {
				$scope.sendForgottenPasswordEmail();
		};

		$scope.sendForgottenPasswordEmail = function() {
			$scope.showLoadingModal = true;
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
								$scope.showLoadingModal = false;
								$location.path("/forgotten-password4");
							})
					.error(
							function(data, status, headers,
									config) {
								$scope.showLoadingModal = false;
								$scope.openPortalDownModal();
							});
		};
		
		$scope.checkpassword = function(){
			
			$scope.nomatchpassword = false;
			$scope.weakpassword = false;
			$scope.hasPasswordError = false;
			
			var same = ($scope.user.pw1 === $scope.user.pw2);
			var p = $scope.user.pw1
			var _code = 0;                                            
	         var _lowerLetters = /[a-z]+/.test(p);   		//lower case                 
	         var _upperLetters = /[A-Z]+/.test(p);			//upper case
	         var _numbers = /[0-9]+/.test(p);				//number
	         var _symbols1 = /[\W_]/.test(p);	//symbol
	         var _notspace = /[\S]/.test(p);	//not a space
	         var _symbols = false;
	         if (_symbols1 && _notspace ){
	         	_symbols = true;
	         }
	         var _length6 = p.length >= 6;					//longer than 6
	         var _length8 = p.length >= 8;					//longer than 8

	         if (_length6 & _numbers) _code = 1;
	         if (_length8 & _numbers & _lowerLetters & _upperLetters) _code = 2;
	         if (_length8 & _numbers & _lowerLetters & _upperLetters & _symbols) _code = 3;

			
			
			
			 if ((_code>0) && (same == true)){
				
				 $scope.updatePassword();
			 }
			 else if (same == false){
				
				 $scope.nomatchpassword = true;
				$scope.hasPasswordError = true;
				return false;
				}
			 
			 else if (_code==0){
				 
				 $scope.weakpassword = true;
				$scope.hasPasswordError = true;
				return false;
			 }
		 
		 };
		 
		
		

	} ]);
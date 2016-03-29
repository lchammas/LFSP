angular.module('portal.registerController',[])
.controller('RegisterController', ['$scope', '$http', '$location', 'dataDocuments', '$rootScope',
	function ($scope, $http, $location, dataDocuments, $rootScope) {
	$("header").show();
	$scope.retrievedPolicies = [];
	$scope.user.newemail = "";
	$scope.user.newemailconf = "";
	var nua = navigator.userAgent;
	$scope.isIE8 = nua.indexOf('MSIE 8') > 0;
	$scope.isIE9 = nua.indexOf('MSIE 9') > 0;
	
	$scope.isNativeAndroid = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Mobile') > -1 && nua.indexOf('Version') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1));
	
	if( $scope.isIE9 || !($scope.isIE8 ||$scope.isNativeAndroid) ){
 		$("#incompBrowser").css("display", "none");
 	}
		
	$scope.changePasswordInit = function(){
		$scope.user.passwordConfirm = "";
		$scope.user.pw1 = "";
		$scope.user.pw2 = "";
	};
	
	$scope.addPolicyInit = function(){
		$scope.user.policyReference.number = "";
		$scope.newPolicy.type = 1;
	};
	
	$scope.resetPolicyNumber = function () {
			$scope.newPolicy.number = "";
			$scope.user.policyReference.number = "";
    };
	
	$scope.reg4Init = function(){
		
		
	    if( $scope.chosenQs.length >= 2) {
	    	//remove the chose questions 
	    	$scope.chosenQs.splice(1,1);
	    	$scope.chosenQs.splice(0,1); 	

	    }
	    
	    for (i=0;i<$scope.questions.length;i++){
	    	//reset the status and answer 
	    	$scope.questions[i].status=false;
	    	$scope.questions[i].answer="";
	    }	
	   
	    
	};
	
	// Call a function declared in home.js to manage NavBar menus
	$scope.setNavMenus($location.path());

	if(isNaN($scope.day))$scope.day="not a number";
	
	$scope.signInInvalid = true;
	
	$scope.checkValid = function(){
		$scope.user.password = $('#loginPassword').val();
		if($scope.user.dob.date.length>0 && $scope.user.dob.month.length>0 && $scope.user.dob.year.length==4
				&& $scope.user.email != null && $scope.user.password != null  && $scope.user.password != "")
			$scope.signInInvalid = false;
		else
			$scope.signInInvalid = true;
	};
	
	$scope.getSecurityQuestions = function()
	{	
		$http({
			method: 'POST', 
			url: "//" + window.location.hostname + "/OPS/service/DatabaseService/securityQuestions",
			headers: { 'portal-access-token': $rootScope.auth.token }
		}).
		success(function(data, status, headers, config) {
			if (data != ""){
				for(var i = 0; i < data.length; i++){
					var o = new Object();
					o.content = data[i]["question"];
					o.id = data[i]["id"];
					o.status = false;
					o.answer = "";
					$scope.questions.push(o);
				}
			} 
		}).
		error(function(data, status, headers, config) {
			$scope.showLoadingModal = false;
			$scope.openPortalDownModal(); 
		});
	};

	if (!($scope.questions.length > 0)){
		$scope.getSecurityQuestions();
	}

	$scope.noAccountFound = false;
	
	$scope.helpClasses = new Array("help-icon","help-close");
	$scope.helpBox1="help-icon";
	$scope.counter1=0;
	$scope.helpTip1 = false;
	$scope.helpBox2="help-icon";
	$scope.counter2=0;
	$scope.helpTip2 = false;
	$scope.helpBox3="help-icon";
	$scope.counter3=0;
	$scope.helpTip3 = false;
	$scope.helpBox4="help-icon";
	$scope.counter4=0;
	$scope.helpTip4= false;
	$scope.helpBox5="help-icon";
	$scope.counter5=0;
	$scope.helpTip5 = false;
	
	$scope.helpBoxClick = function(num){
		switch(num){
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
			case 4: 
				$scope.counter4 += 1;
				$scope.helpBox4 = $scope.helpClasses[$scope.counter4 % 2];
				$scope.helpTip4 = !$scope.helpTip4;
				break;
			case 5:
				$scope.counter5 += 1;
				$scope.helpBox5 = $scope.helpClasses[$scope.counter5 % 2];
				$scope.helpTip5 = !$scope.helpTip5;
				break;
		}
	};
	$scope.loginReady = false;
	$scope.hasLoginError = false;
	$scope.hasFormError = false;
	$scope.hasEmailError = false;
	$scope.setLoginForm = function(form){
		$scope.loginForm = form;
	};
	
	$scope.checkEmail = function(){
		if($scope.loginForm.email.$dirty){
			$scope.hasEmailError = $scope.loginForm.email.$invalid ? true : false;
			if($scope.hasEmailError){$scope.hasFormError = false;return true;}
			return false;
		}
	};
	
	$scope.checkUserFormEmail = function(){
		if($scope.userForm.email.$dirty){
			$scope.hasEmailError = $scope.userForm.email.$invalid ? true : false;
			return $scope.hasEmailError;
		}
	};
	
	$scope.newEmailReady = false;
	$scope.checkNewEmail = function(){
		var newemail = $("#newEmail").val();
		var newemailconf = $("#newEmailConf").val();
		if(newemail.length > 0 && (newemail.toUpperCase() === newemailconf.toUpperCase()) && !$scope.hasEmailError)
			$scope.newEmailReady = true;
		else
			$scope.newEmailReady = false;
	};
	$scope.checkLoginForm = function(){
		$scope.loginReady = false;
		var loginForm = $scope.loginForm;
		if($scope.checkEmail())return;
		if($scope.user.password == null || $scope.user.password.length < 1 ){
			var password = $('#loginPassword').val();
			if($scope.isEmpty(password)){
				$scope.hasFormError = true;
				return;
			}else{
				$scope.user.password = password;
			}
		}
		if(($scope.user.password == null || $scope.user.password.length < 1 ) || 
				loginForm.day.$invalid || loginForm.month.$invalid || loginForm.year.$invalid){
			$scope.hasFormError = true;
		}else{
			$scope.hasFormError = false;
			$scope.loginReady = true;
		}
	};
	$scope.hasDPAError = false;
	
	$scope.checkDPA = function(){
		var dpr = new Object();
		dpr.email = $scope.user.email;
		dpr.dob = $scope.user.dob.yyyymmdd();
		dpr.brand = $scope.user.policyReference.brand;
		dpr.product = $scope.getProduct();
		dpr.policyNumber =  $scope.user.policyReference.number;
		dpr.firstName = $scope.user.firstName.toLowerCase();
		dpr.surname = $scope.user.surname.toLowerCase();
		dpr.postcode = $scope.user.postcode;
		 
		$http({
			method: 'POST', 
			url: "//" + window.location.hostname + "/OPS/service/WrapperService/checkDataProtection",
			headers: { 'portal-access-token': $rootScope.auth.token },
			params: {dataProtectionRequest: dpr }
		}).
		success(function(data, status, headers, config) {
			if(data == 1){
				$scope.toggleModal();
			}else if(data == -1){
				$scope.hasDPAError = true;
			}else if(data == 0){
				$scope.alreadyRegistered();
			}else if(data == -2){
				$scope.hasDPAError = true;
			}
			
		}).
		error(function(data, status, headers, config) {
			$scope.showLoadingModal = false;
			$scope.openPortalDownModal(); 
		});
	};
	
	$scope.continueReady = false;
	$scope.setReady = function(val){
		$scope.continueReady = val;
	};
	
	$scope.checkForReady = function(){
		if($scope.user.firstName != null && $scope.user.firstName != "" &&
		   $scope.user.surname != null && $scope.user.surname != "" &&
		   $scope.user.postcode != null && $scope.user.postcode != ""){
			if($scope.continueReady == false)$scope.setReady(true);
		}else{
			if($scope.continueReady == true)$scope.setReady(false);
		}
	};
	
	$scope.login = function(){
		$scope.hasLoginError = false;
		$scope.checkLoginForm();
		if($scope.loginReady){
			$scope.showLoadingModal = true;
			$scope.signInInvalid = true;
			if($scope.rememberEmail)$scope.setEmailCookie(365);
			var loginRequest = new Object();
			loginRequest.email = $scope.user.email;
			loginRequest.password = $scope.user.password;
			loginRequest.dob = $scope.user.dob.ddmmyyyy();
			loginRequest.brand = $scope.user.policyReference.brand;
			
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/LDAPService/login",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {loginRequest: loginRequest }
			}).
			success(function(data, status, headers, config) {
				if(data == "-1"){			//login failed i.e. invalid credentials
					$scope.hasLoginError = true;
					$scope.showLoadingModal = false;
				}else if(data == "-2"){		// check return code for locked out
					$scope.modalAccountLockedShown = true; 
					$scope.showLoadingModal = false;
				}else{	// returned a list of the users registered policy numbers
					$scope.processLoginData(data);
				}
				$scope.signInInvalid = false;
			}).
			error(function(data, status, headers, config) {
				//console.log("Login call failed");
				$scope.openPortalDownModal();
				$scope.signInInvalid = false;
				$scope.showLoadingModal = false;
			});
		}
	};

	
	$scope.getProduct = function(){
		switch($scope.newPolicy.type){
			case 1: return $scope.user.policyReference.product;
			case 2: return "APT";
			case 3: return "P";
		}
	};
	
	$scope.policyAlreadyRegistered = false;
	
	$scope.getDataProtection = function(){
		if (!($scope.questions.length > 0)){
			$scope.openPortalDownModal();
			$scope.showLoadingModal = false;
			return;
		}
		//TODO: fix validation
		var formValid = true;
		$scope.policyAlreadyRegistered = false;
		$scope.noAccountFound = false;
		
		if($scope.user.email == null || $scope.user.dob.yyyymmdd() == null || $scope.user.policyReference.number == null ||
		$scope.user.policyReference.brand == null || $scope.user.policyReference.product == null ) formValid = false;
		
		if(formValid == true){
			var dpr = new Object();
			dpr.email = $scope.user.email;
			dpr.dob = $scope.user.dob.yyyymmdd();
			dpr.brand =  $scope.user.policyReference.brand;
			dpr.product = $scope.getProduct();
			dpr.policyNumber = $scope.user.policyReference.number;
			
			//TODO: perform validation on dpr
			
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/WrapperService/getDataProtection",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {dataProtectionRequest: dpr }
			}).
			success(function(data, status, headers, config) {
				if(data == 0){
					$scope.noAccountFound = false;
					$location.path("/register2");
				}else if(data == -1 ){
					$scope.noAccountFound = true;
					$scope.toggleModal();
				}else if(data == -2){
					$scope.policyAlreadyRegistered = true;
				}
			}).
			error(function(data, status, headers, config) {
				$scope.showLoadingModal = false;
				$scope.openPortalDownModal();
			});
		}
	};
	
	 $scope.alreadyRegistered = function(){
 		var reg = false;
	 	var alreadyRegisteredRequest = new Object();
 		alreadyRegisteredRequest.email = $scope.user.email;
 		alreadyRegisteredRequest.dob = $scope.user.dob.ddmmyyyy();
 		alreadyRegisteredRequest.brand =$scope.user.policyReference.brand;
 				 				 		
 		$http({
 			method: 'POST', 
 			url: "//" + window.location.hostname + "/OPS/service/LDAPService/alreadyRegistered",
 			headers: { 'portal-access-token': $rootScope.auth.token },
 			params: {alreadyRegisteredRequest: alreadyRegisteredRequest }
 		}).
 		success(function(data, status, headers, config) {
 			if(data == "0" || data == "-2"){
 				if(data == "-2")
 					$scope.ldapRecordLocked = true;
 				$location.path("/already-registered");
 			}else{
				$scope.cont();
 			}
 		}).
 		error(function(data, status, headers, config) {
 			$scope.showLoadingModal = false;
 			$scope.openPortalDownModal();
 		});
 		
 	}; 
	
 	$scope.checkForCookie = function(){
 		var cname = "ADMODP-cookiePolicy";
 		var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return false;
	    }
	    return true;
 	};
 	
 	$scope.modalAccountLockedShown = false; 
 	$scope.closeAccountLockedModal = function(){
 		$scope.modalAccountLockedShown = false; 
 	};
 	$scope.modalShown = false;
 	$scope.toggleModal = function() {
	    $scope.modalShown = !$scope.modalShown;
	};
	$scope.modalCookiePolicyShown = $scope.checkForCookie("ADMODP-cookiePolicy"); 
 	$scope.closeCookiePolicyModal = function(){
		var date = new Date();
		date.setTime(date.getTime()+(365*24*60*60*1000));
 		$scope.modalCookiePolicyShown = false;
 		document.cookie="ADMODP-cookiePolicy=Accepted; expires="+date.toGMTString();
 	};
 	
 	if($scope.isIE9){
		$scope.modalCookiePolicyShown = false;
	}
	  
 	var currentpage = $location.path();
	var page = currentpage.substr(currentpage.length - 1);
	page = parseInt(page, 10);

	$scope.cont = function() {
		var next = page + 1;
		$location.path("/register" + next);
	};

	$scope.prev = function() {
		var previous = page - 1;
		alert("/register" + previous);
		$location.path("/register" + previous);
	};	  

	$scope.qsReady = false;
	//$scope.chosenQs = [];
    $scope.checkSQuestions = function(newId){
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

$scope.checkSAnswers = function(){
	var chosenQs = $scope.chosenQs;
    var numOfQues = 2;
    // Set the visibility of the Finish Registration button
    if((chosenQs.length >= numOfQues) 
		&& (chosenQs[0].answer !== '') 
		&& (chosenQs[1].answer !== '')){
			$scope.qsReady = true;
    }else{
    		$scope.qsReady = false;
    }
};

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

	
        $scope.checkSecurityAnswers = function(){
        	$scope.showLoadingModal = true;
            $scope.securityQ1 = $scope.chosenQs[0].id;
            $scope.securityQ2 = $scope.chosenQs[1].id;
            $scope.securityA1 = $scope.chosenQs[0].answer;
            $scope.securityA2 = $scope.chosenQs[1].answer; 
            if(!($scope.securityA1 === "") && !($scope.securityA2 === "")){
                            // Security answers have been provided
                            $scope.register();
            }
};

	$scope.changePassword = function(){
		$scope.showLoadingModal = true;
		$scope.pwchanged = false;
		$scope.nomatchpassword = false;
		$scope.weakpassword = false;
		$scope.hasPasswordError = false;
		$scope.currentpasswordfail = false;
		$scope.emailNotSent = false;
		var same = ($scope.user.pw1 === $scope.user.pw2);
		
		if (($scope.strContinue()) && (same == true)){
	 		var changePasswordRequest = new Object();
	 		changePasswordRequest.email = $scope.user.email;
	 		
	 		if(typeof $scope.user.oldpass != 'undefined' && $scope.user.oldpass != "")
	 			changePasswordRequest.oldPassword = $scope.user.oldpass;
	 		else if(typeof $scope.user.password != 'undefined' && $scope.user.password != "")
	 			changePasswordRequest.oldPassword = $scope.user.password;
			else if(typeof $scope.user.aregpassword != 'undefined' && $scope.user.aregpassword != "")
				changePasswordRequest.oldPassword = $scope.user.aregpassword;
	 		
	 		changePasswordRequest.newPassword = $scope.user.pw1;
	 		changePasswordRequest.dob = $scope.user.dob.ddmmyyyy();
	 		changePasswordRequest.brand = $scope.user.policyReference.brand;
			
	 		$http({
	 			method: 'POST', 
	 			url: "//" + window.location.hostname + "/OPS/service/LDAPService/changePassword",
	 			headers: { 'portal-access-token': $rootScope.auth.token },
	 			params: {changePasswordRequest: changePasswordRequest }
	 		}).
	 		success(function(data, status, headers, config) {
	 			 if(data == -1){
	 				$scope.showLoadingModal = false;
	 				$scope.openPortalDownModal();
	 			
	 		}
	 			 else if(data == -2){
	 				$scope.showLoadingModal = false;
	 				$scope.openPortalDownModal();
	 				
	 			 }
	 			 else if(data == -3){
	 				 $scope.currentpasswordfail = true;
	 				$scope.showLoadingModal = false;
	 		}
	 			 else {
	 				var array = data.split(";");
    				var timeout = (new Date()).getTime();
    				$rootScope.auth.timeout  = timeout;
    				$rootScope.auth.token = array[array.length-1];
	    	
	 				$scope.user.password = $scope.user.pw1;
	 				 
	 				 	// Check if just come from temp password
	 				 if($location.path() === '/tmp_pass_upd') {
	 					// Also redirects to policies
		 				$scope.getDocumentLists();
	 				}else{
	 					$scope.pwchanged = true;
		 				$scope.user.oldpass = "";
			 			$scope.showLoadingModal = false;
	 				}
	 			 }
	 		}).
	 		error(function(data, status, headers, config) {
	 			$scope.openPortalDownModal();
	 			$scope.showLoadingModal = false;
	 		});
		}
		
		 else if (same == false){
				$scope.nomatchpassword = true;
				$scope.hasPasswordError = true;
				$scope.closePortalDownModal();
				$scope.showLoadingModal = false;
				return false;
				}
			 
			 else if (!$scope.strContinue()){
				$scope.weakpassword = true;
				$scope.hasPasswordError = true;
				$scope.showLoadingModal = false;
				$scope.closePortalDownModal();
				return false;
			 }
	};
	
	$scope.changeEmailInit = function(){
		$scope.emailChanged = false;
	};
	
 	$scope.newEmailAlreadyRegistered = false;
 	$scope.emailsMatchError = false;
 	$scope.changeEmail = function(){
 		if($scope.user.email == $scope.user.newemail)
 			$scope.emailsMatchError = true;
 		else if($scope.user.newemail !== $scope.user.newemailconf) {
 			// Test that the new email and confirm email match	
 			// Flag is used to display a message
 			$scope.nomatchemail = true;
 		} else {
 			$scope.showLoadingModal = true;
 			$scope.nomatchemail = false;
 			$scope.emailsMatchError = false;
	 		
	 		var changeEmailRequest = new Object();
	 		changeEmailRequest.oldEmail = $scope.user.email;
	 		changeEmailRequest.newEmail = $scope.user.newemail;
	 		changeEmailRequest.firstName = $scope.user.firstName;
	 		changeEmailRequest.secondName = $scope.user.surname;
	 		changeEmailRequest.password = $scope.user.password;
	 		changeEmailRequest.dob = $scope.user.dob.yyyymmdd();
	 		changeEmailRequest.brand = $scope.user.policyReference.brand;
	 		changeEmailRequest.policyReference = $scope.policyNumbers[0];
	
	 		$http({
	 			method: 'POST', 
	 			url: "//" + window.location.hostname + "/OPS/service/LDAPService/changeEmail",
	 			headers: { 'portal-access-token': $rootScope.auth.token },
	 			params: {changeEmailRequest: changeEmailRequest }
	 		}).
	 		success(function(data, status, headers, config) {
	 			if(data==-1 || data==-3){
	 				$scope.showLoadingModal = false;
	 				$scope.openPortalDownModal();
	 			}else if(data==-2 || data==-4){
	 				$scope.newEmailAlreadyRegistered = true;
	 			}else{
	 				$scope.closePortalDownModal();
		 			$scope.emailchanged = true;
	 				$scope.user.email = $scope.user.newemail;
	 				$scope.user.newemail = "";
	 				$scope.user.newemailconf = "";
	 				$scope.showLoadingModal = false;
					var timeout = (new Date()).getTime();
					$rootScope.auth.timeout  = timeout;
					$rootScope.auth.token = data;
	 			}
	 		}).
	 		error(function(data, status, headers, config) {
	 			$scope.openPortalDownModal();
	 			$scope.showLoadingModal = false;
	 		});
 		}
 	};
 	
	
 	$scope.checkpassword = function(){
			$scope.nomatchpassword = false;
			$scope.weakpassword = false;
			$scope.hasPasswordError = false;
			var same = ($scope.user.pw1 === $scope.user.pw2);
			
			 if (($scope.strContinue()) && (same == true)){
				 $scope.cont();
			 }
			 else if (same == false){
				$scope.nomatchpassword = true;
				$scope.hasPasswordError = true;
				return false;
				}
			 
			 else if (!$scope.strContinue()){
				$scope.weakpassword = true;
				$scope.hasPasswordError = true;
				return false;
			 }
		 
		 };
		 	 	
		$scope.register = function(){
			$scope.showLoadingModal = true;
			var registrationRequest = new Object();
			registrationRequest.password = $scope.user.pw1;
			registrationRequest.firstName = $scope.user.firstName;
			registrationRequest.surname = $scope.user.surname;
			registrationRequest.customerID = 1;
			registrationRequest.brand =  $scope.user.policyReference.brand;
			registrationRequest.product = $scope.getProduct();
			registrationRequest.number =  $scope.user.policyReference.number;
			registrationRequest.email = $scope.user.email;
			registrationRequest.securityquestion1 = $scope.securityQ1;
			registrationRequest.securityquestion2 = $scope.securityQ2;
			registrationRequest.securityquestion3 = '';
			registrationRequest.securityanswer1 = $scope.securityA1;
			registrationRequest.securityanswer2 = $scope.securityA2;
			registrationRequest.securityanswer3 = '';
			registrationRequest.dob = $scope.user.dob.yyyymmdd();
			
			$scope.user.password = registrationRequest.password;
			
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/LDAPService/regPolicy",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {registrationRequest: registrationRequest }
			}).
			success(function(data, status, headers, config) {
				if(data == "-1"){
					$scope.showLoadingModal = false;
					$scope.openPortalDownModal();
				}else
					$scope.processLoginData(data);
			}).
			error(function(data, status, headers, config) {
				$scope.openPortalDownModal();
				$scope.showLoadingModal = false;
			});
		};
		
		$scope.otherPolicyLocked = false;
		$scope.addPolicy = function(isUserLoggedIn){
			$scope.showLoadingModal = true;
			$scope.otherError = false;
			$scope.currentpasswordfail = false;
			var addPolicyRequest = new Object();
			addPolicyRequest.brand = $scope.user.policyReference.brand;
			addPolicyRequest.product = $scope.getProduct();
			
			if(isUserLoggedIn)
				addPolicyRequest.number =  $scope.newPolicy.number;
			else
				addPolicyRequest.number =  $scope.user.policyReference.number;
			
			addPolicyRequest.email = $scope.user.email;
			addPolicyRequest.dob = $scope.user.dob.yyyymmdd();
			
			if(typeof $scope.user.aregpassword != 'undefined' && $scope.user.aregpassword != "")
				addPolicyRequest.password = $scope.user.aregpassword;
			else if(typeof $scope.user.password != 'undefined' && $scope.user.password != "")
				addPolicyRequest.password = $scope.user.password;
			else if(typeof $scope.user.pw1 != 'undefined' && $scope.user.pw1 != "")
				addPolicyRequest.password = $scope.user.pw1;
			
			$scope.user.password = addPolicyRequest.password;
			
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/LDAPService/addPolicy",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {addPolicyRequest:  addPolicyRequest}
			}).
			success(function(data, status, headers, config) {
				if(data == -1){
					$scope.showLoadingModal = false;
					$scope.currentpasswordfail = true;
				}else if(data == -2){
					$scope.showLoadingModal = false;
					$scope.policyAlreadyRegistered = true;
				}else if(data == -3){
					$scope.showLoadingModal = false;
					$scope.otherPolicyLocked = true;
				}else if(data == -4){
					$scope.showLoadingModal = false;
					$scope.otherError = true;
				}else{
					$scope.newPolicy.number = "";
					$scope.processLoginData(data);
				}
			}).
			error(function(data, status, headers, config) {
				$scope.openPortalDownModal();
				$scope.showLoadingModal = false;
			});
		};
		
		$scope.isNewPolicyBolt = false;
		$scope.helpBoxClickNotP = function(){
			$scope.showHelpNotP = !$scope.showHelpNotP;
		};
		$scope.helpBoxClickP = function(){
			$scope.showHelpP = !$scope.showHelpP;
		};
		
		$scope.checkDPAAddPolicy = function(isUserLoggedIn){
			$scope.newPolicyNotValid = false;
			var dpr = new Object();
			dpr.email = $scope.user.email;
			dpr.dob = $scope.user.dob.yyyymmdd();
			dpr.brand = $scope.user.policyReference.brand;
			dpr.product = $scope.getProduct();
			dpr.policyNumber =  $scope.newPolicy.number;
			dpr.firstName = $scope.user.firstName.toLowerCase();
			dpr.surname = $scope.user.surname.toLowerCase();
			dpr.postcode = $scope.user.postcode;
			 
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/WrapperService/checkDataProtection",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {dataProtectionRequest: dpr }
			}).
			success(function(data, status, headers, config) {
				if(data == 1){
					$scope.toggleModal();
				}else if(data == 0){
					$scope.addPolicy(isUserLoggedIn);
				}else if(data == -1){
					$scope.newPolicyNotValid = true;
				}else{
					$scope.otherError = true;
				}
				
			}).
			error(function(data, status, headers, config) {
				$scope.openPortalDownModal();
				$scope.showLoadingModal = false;
			});
		};
  }]);






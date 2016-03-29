  angular.module('portal.homeController',[])
.controller('HomeController', ['$scope', '$http', 'dataDocuments', '$location','portalData', 'marketingImage', '$rootScope',
	function ($scope, $http, dataDocuments, $location, portalData, marketingImage, $rootScope) {

		$scope.showLoadingModal = false;
		$scope.modalPortalDownShown = false; 
	 	$scope.closePortalDownModal = function(){
	 		$scope.modalPortalDownShown = false; 
	 	};
	 	$scope.openPortalDownModal = function(){
	 		$scope.modalPortalDownShown = true; 
	 	};
	
		$scope.ready = true;
		$scope.helpTip=false;
		$scope.readCookie = function(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    var cValue = "";
		    for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1,c.length);
		        if (c.indexOf(nameEQ) == 0) cValue = c.substring(nameEQ.length,c.length);
		    }
		    return cValue;
		};
		getmarketingImage();
		getportalData();
		$scope.content = {};
	  	$scope.ui = {};
	    $scope.ui.brand = 'admot';
		$scope.displayNav = false;
		
		$scope.enableNav = function(){ $scope.displayNav = true; };
		$scope.disableNav = function(){ $scope.displayNav = false; };
		
		$scope.questions=[];
		$scope.selectedQuestions=[];
		$scope.policyNumbers = [];

		$scope.selectedRisk = [];
		$scope.activeVehicleRisks = [];
		$scope.activeResidenceRisks = [];
		$scope.archiveVehicleRisks = [];
		$scope.archiveResidenceRisks = [];
		$rootScope.documents = {};
		$rootScope.documents.key = "";
		$rootScope.selectedRisk = {};
		$rootScope.selectedRisk.polRef = "";
		
		$scope.loadRisks = function(result){
			$scope.activeVehicleRisks = result.risks.activeVehicleRisks.concat([]);
			$scope.archiveVehicleRisks = result.risks.archiveVehicleRisks.concat([]);
			$scope.activeResidenceRisks = result.risks.activeResidenceRisks.concat([]);
			$scope.archiveResidenceRisks = result.risks.archiveResidenceRisks.concat([]);
		};
		
        $scope.DPAResponse = {};
        $scope.DPAResponse.first_name = "";
        $scope.DPAResponse.surname = "";
        $scope.DPAResponse.postcode = "";
        $scope.pw1 = '';
        $scope.pw2 = '';
        $scope.user = {};
        $scope.user.firstName = "";
        $scope.user.surname = "";
        $scope.user.fullName = function(){
        	return $scope.user.firstName + " " + $scope.user.surname;
        };
        $scope.setName = function(name){
        	var names = name.split(" ");
        	$scope.user.firstName = names[0];
        	$scope.user.surname = names[1];
        };
        $scope.user.dob = {};
        $scope.user.dob.date = "";
        $scope.user.dob.month = "";
        $scope.user.dob.year = "";
        $scope.user.dob.yyyymmdd = function(){
        	var dobString = "" + $scope.user.dob.year;
        	var month = $scope.user.dob.month;
        	var date = $scope.user.dob.date;
        	if(month<10 && month.toString().length<2){	month = "0" + month;}
        	dobString += month;
        	if(date<10 && date.toString().length<2){	date = "0" + date;	}
        	dobString += date;
        	return dobString;
        };
        $scope.user.dob.ddmmyyyy = function(){
        	var date = $scope.user.dob.date;
        	if(date<10 && date.toString().length<2){	date = "0" + date;	}
        	var dobString = "" + date;
        	var month = $scope.user.dob.month;
        	if(month<10 && month.toString().length<2){	month = "0" + month;}
        	dobString += month;
        	dobString += $scope.user.dob.year;
        	return dobString;
        };
        $scope.user.email = $scope.readCookie("ADMODP-userEmail");
        $scope.user.password = "";
        $scope.user.postcode = "";
        $scope.user.policyReference = {};
        $scope.user.policyReference.brand = "";
        $scope.user.policyReference.product = "";
        $scope.user.policyReference.number = "";
        $scope.user.policyReference.getFullString = function(){
        	return $scope.user.policyReference.brand + $scope.user.policyReference.product + $scope.user.policyReference.number;};
        	
        $scope.securityQ1 = null;
        $scope.securityQ2 = null;
        $scope.securityQ3 = null;
        $scope.securityA1 = "";
        $scope.securityA2 = "";
        $scope.securityA3 = "";
        
        $scope.newPolicy = {};
        $scope.newPolicy.number = "";
        $scope.newPolicy.showBoltPolicies = false;
        
    	$scope.reg1Init = function(){
    		var deep =  $location.search();
    		
    		if(typeof $scope.newPolicy.type == 'undefined' || $scope.newPolicy.type == null){
    			$scope.newPolicy.type = 1;   		
    		}
    		
    		if (deep!=null){
	    		$scope.user.email = deep.emailAddress;		
	    		$scope.user.policyReference.number = parseInt(deep.policyNum);
	    		if (deep.product=="APT"){
	    			$scope.newPolicy.type = 2;   
	    		}else if(deep.product=="P")
	    			$scope.newPolicy.type = 3;
    		}
    		
    		$scope.user.dob.date = "";
	        $scope.user.dob.month = "";
	        $scope.user.dob.year = "";
    	};
              
        $scope.changeState = function(newState){
        	$scope.state = newState;
        	/*$scope.setStateFlag();*/
        };
        
        $scope.auditLink = function(link){
        	var auditRequest = new Object();
        	auditRequest.transactionId = $scope.user.firstName + ' ' + $scope.user.surname;
        	auditRequest.action = link;
        	auditRequest.brand = $scope.user.policyReference.brand;
        	auditRequest.polno = $scope.policyNumbers.toString();
        	auditRequest.product = '';

			$http(
					{
						method : 'POST',
						url : "//"
								+ window.location.hostname
								+ "/OPS/service/DatabaseService/audit",
						params : {
							auditRequest : auditRequest
						}
					})
					.success(
							function(data, status, headers,
									config) {
								//do nothing
							}).error(
							function(data, status, headers,
									config) {
								//again do nothing
							});
		};
        
        $scope.removeSpaces = function(string){
        	return string.replace(/\s+/g, '');
        };
        
    	$scope.printArray = function(arr){
    		var str = "";
    		for(var i=0;i<arr.length;i++){
    			str += arr[i];
    			str += "; ";
    		}alert(str);
    	};
    	
    	$scope.isEmpty = function(str) {
    	    return (!str || 0 === str.length);
    	};
    	
    	$scope.setEmailCookie = function(days){
    		var date = new Date();
    		date.setTime(date.getTime()+(days*24*60*60*1000));
    		document.cookie="ADMODP-userEmail="+$scope.user.email+"; expires="+date.toGMTString();
    	};
    	
    	$scope.convertDateString = function(yyyymmdd){
			// to dd/mm/yyyy
			var dateString = "";
			dateString += yyyymmdd.substring(6,8) + "/";
			dateString += yyyymmdd.substring(4,6) + "/";
			dateString += yyyymmdd.substring(0,4);
			return dateString;
		};

        $scope.user.securityQIndexes = {};
        $scope.chosenQs = [];

        /* 
        This function has been moved to the '$routeChangeStart' watch in config run in the app.js file. The stubb has been left here for the moment as it is called from quiet a few places
        */ 
        $scope.setNavMenus = function(curRoute) {

            return;
        };
        
        $scope.dashboardURL = "";

        $scope.getBrand = function(){
        	var brandGTMCode;
        	var location = window.location.host;
        	var res = location.split("."); 
    		$scope.brandImageDir = "ADM";
    		$scope.user.policyReference.brand = "AD";
			$scope.user.policyReference.product = "MOT";
			$scope.brandCode = "admot";
			$scope.brandName = "Admiral";
			$scope.brandNameLowerCase = "admiral";
			$scope.brandColour = "red";
			$scope.generalCSS = "Resources/styles/AD.css";
			$scope.navCSS = "Resources/styles/AD-nav.css";
			brandGTMCode = "88JZ";
			
        	if (res[1] != null){
        	
			var url = res[1].substring(0, 3);
			
        	switch(url){ 
	        	case "adm" :
	        		$scope.brandImageDir = "ADM";
	        		$scope.user.policyReference.brand = "AD";
	    			$scope.user.policyReference.product = "MOT";
	    			$scope.brandCode = "admot";
	    			$scope.brandName = "Admiral";
	    			$scope.brandNameLowerCase = "admiral";
	    			$scope.brandColour = "red";
	    			$scope.generalCSS = "Resources/styles/AD.css";
	    			$scope.navCSS = "Resources/styles/AD-nav.css";
	    			brandGTMCode = "88JZ";
	    			break;
	        	case "bel" :
	        		$scope.brandImageDir = "BL";
	        		$scope.user.policyReference.brand = "BL";
        			$scope.user.policyReference.product = "CAR";
        			$scope.brandCode = "blcar";
        			$scope.brandName = "Bell";
        			$scope.brandNameLowerCase = "bell";
        			$scope.brandColour = "red";
        			$scope.generalCSS = "Resources/styles/BL.css";
        			$scope.navCSS = "Resources/styles/BL-nav.css";
        			brandGTMCode = "W4DGDT";
        			break;
	        	case "dia" :
	        		$scope.brandImageDir = "DI";
        			$scope.user.policyReference.brand = "DI";
        			$scope.user.policyReference.product = "AMO";
        			$scope.brandCode = "diamo";
        			$scope.brandName = "Diamond";
        			$scope.brandNameLowerCase = "diamond";
        			$scope.brandColour = "orange";
        			$scope.generalCSS = "Resources/styles/DI.css";
        			$scope.navCSS = "Resources/styles/DI-nav.css";
        			brandGTMCode = "2F7P";
        			break;
        		case "ele" :
        			$scope.brandImageDir = "EL";
        			$scope.user.policyReference.brand = "EL";
        			$scope.user.policyReference.product = "INT";
        			$scope.brandCode = "elint";
        			$scope.brandName = "Elephant";
        			$scope.brandNameLowerCase = "elephant";
        			$scope.brandColour = "orange";
        			$scope.generalCSS = "Resources/styles/EL.css";
        			$scope.navCSS = "Resources/styles/EL-nav.css";
        			brandGTMCode = "NGX3VM";
        			break;
        	}
			}
        	
            var gtmString = "\n<script>dataLayer = [];</script>\n";
        	gtmString += "<!-- Google Tag Manager -->\n";
        	gtmString += "<noscript><iframe src=\"//www.googletagmanager.com/ns.html?id=GTM-"+brandGTMCode+"\"";
        	gtmString += " height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n";
        	gtmString += "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
    		gtmString += "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
			gtmString += "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
			gtmString += "'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
			gtmString += "})(window,document,'script','dataLayer','GTM-"+brandGTMCode+"');</script>";
			gtmString += "\n<!-- End Google Tag Manager -->";
			$('body').prepend(gtmString);
        };
        $scope.getBrand();
        
     // Process login response now updated for detecting temporary passwords
    	$scope.processLoginData = function(data){
    		$scope.showLoadingModal = true;
    		// Split the data from LDAP call into an array of parts
    		var array = data.split(";");
    		// Loop through elements to get policy numbers... deal with array[0] later 
    		for(var i=1;i<array.length;i++) {
    			// If the last item of data
    			if(i==array.length-1){
    				var timeout = (new Date()).getTime();
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
    		
    		// Check first position of data for temporary password flag
			if(array[0] == 'true'){
    			$location.path("/tmp_pass_upd");
    			$scope.showLoadingModal = false;
			}
			else
				$scope.getDocumentLists();
    		
    	};
    	
    	$scope.getDocumentLists = function(){
    		$scope.showLoadingModal = true;
    		// call the get documents service
			var promise = dataDocuments.getDocumentList($scope.policyNumbers, 
				$scope.user.email, $scope.user.dob.yyyymmdd());
			// wait for the response, then...
			promise.then(
				function(result) {
					// check for error
					if(!result.err) {
						$scope.loadRisks(result);
						$location.path("/policies");
						$scope.signInInvalid = false;
						$scope.showLoadingModal = false;
						if (result.muledown){
							$scope.muledown = true;
						} else {
							$scope.muledown = false;
						}
					} else {
						$scope.openPortalDownModal();
						$scope.signInInvalid = false;
						$scope.showLoadingModal = false;
					}
				}
			);
    	};
    	
    	$scope.forgotPassword5 = function(){$location.path('/login');};
        
          function getportalData(){
  			//
  			var promise = portalData.getPortalData();
  			
  			promise.then(
  				function(portaldata) {
  					if(!portaldata.err) {
  						// Display the questions
  						$scope.portaldata = portaldata;
  						if($scope.brandCode == "admot"){
  							$scope.dashboardURL = $scope.portaldata.admot.dashboardurl;
  							$scope.newPolicy.showBoltPolicies = $scope.portaldata.admot.showboltpolicies;
  						}
  						if($scope.brandCode == "blcar"){
  							$scope.dashboardURL = $scope.portaldata.blcar.dashboardurl;
  							$scope.newPolicy.showBoltPolicies = $scope.portaldata.blcar.showboltpolicies;
  						}
  						if($scope.brandCode == "diamo")
  							$scope.newPolicy.showBoltPolicies = $scope.portaldata.diamo.showboltpolicies;	
  						if($scope.brandCode == "elint")
  							$scope.newPolicy.showBoltPolicies = $scope.portaldata.elint.showboltpolicies;
  					} 
  					else {
  						// Display the error message
  						$scope.openPortalDownModal();
  					}
  				});
  		};
  		
  		function getmarketingImage(){
  			//
  			var promise = marketingImage.getMarketingImage();
  			
  			promise.then(
  				function(marketingimage) {
  					
  					if(!marketingimage.err) {
  						// Display the questions
  						$scope.marketingimage = marketingimage;
  						
  					} 
  					else {
  						// Display the error message
  						$scope.modalPortalDownShown = true;
  					}
  				});
  		} 
          
  }]);
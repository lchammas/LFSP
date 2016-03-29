angular.module('portal.policyController',[])
.controller('PolicyController', ['$scope', '$http', '$location', '$rootScope',
	function ($scope, $http, $location, $rootScope) {
	
	// Call a function declared in home.js to manage NavBar menus
	$scope.setNavMenus($location.path());

	$scope.hasTelematicsRisk = false;
	
	$scope.showActiveRisks = true;
	$scope.showArchiveRisks = false;
	
	$scope.toggleActiveRisks = function(){$scope.showActiveRisks = true;$scope.showArchiveRisks = false;};
	$scope.toggleArchiveRisks = function(){$scope.showArchiveRisks = true;$scope.showActiveRisks = false;};
	
	$scope.risksEmpty = false;
	
	$scope.sortRisks = function(){
		if($scope.activeVehicleRisks.length>1){$scope.activeVehicleRisks.sort($scope.sort);}
		if($scope.activeResidenceRisks.length>1){$scope.activeResidenceRisks.sort($scope.sort);}
		if($scope.archiveVehicleRisks.length>1){$scope.archiveVehicleRisks.sort($scope.sort);}
		if($scope.archiveResidenceRisks.length>1){$scope.archiveResidenceRisks.sort($scope.sort);}
		if($scope.activeVehicleRisks.length==0 && $scope.activeResidenceRisks.length==0 &&
				$scope.archiveVehicleRisks.length==0 && $scope.archiveResidenceRisks.length==0)
			$scope.risksEmpty = true;
	};
	
	$scope.sort = function(a,b){
		if(a != null && b != null && 
				a.document_packs != null && typeof a.document_packs != 'undefined' &&
				b.document_packs != null && typeof b.document_packs != 'undefined' &&
				a.risk_status != 'P' && b.risk_status != 'P'){
			var dateString  = a.document_packs.risk_start_date;
			var c, d;
			if(dateString != null){
				var year        = dateString.substring(0,4);
				var month       = dateString.substring(4,6);
				var day         = dateString.substring(6,8);
				c = new Date(year, month-1, day);
			}
			dateString  = b.document_packs.risk_start_date;
			if(dateString != null){
				year        = dateString.substring(0,4);
				month       = dateString.substring(4,6);
				day         = dateString.substring(6,8);
				var d = new Date(year, month-1, day);
			}
			if(	c != null && typeof c != 'undefined' &&
				d != null && typeof d != 'undefined')
				return c-d;
			else return;
		}
	};
	
	$scope.selectRisk = function(risk){
		$scope.selectedRisk.unshift(risk);
		$location.path("/documents");
	};
	
	$scope.prepareDashboardLink = function(risk){
		
		$scope.hasTelematicsRisk = true;
		var uid = $scope.generateUID();
		
		var dashboardLoginRequest = new Object();
		dashboardLoginRequest.email = $scope.user.email;
		dashboardLoginRequest.dob = $scope.user.dob.yyyymmdd();
		dashboardLoginRequest.policyReference = risk.policy_reference+risk.risk_location+risk.risk_number;
		dashboardLoginRequest.vrn = risk.registration_number;
		dashboardLoginRequest.vehicleMake = risk.make;
		dashboardLoginRequest.vehicleModel = risk.model;
		dashboardLoginRequest.firstName = $scope.user.firstName;
		dashboardLoginRequest.surname = $scope.user.surname;
		dashboardLoginRequest.uid = uid;
		
		$http({
			method: 'POST', 
			url: "//" + window.location.hostname + "/OPS/service/DatabaseService/dashboard", 
			headers: { 'portal-access-token': $rootScope.auth.token },
			params: {dashboardLoginRequest: dashboardLoginRequest }
		}).
		success(function(data, status, headers, config) {
			//console.log("sucess login : " + uid );
			risk.telematics = $scope.dashboardURL + "?uid="+uid;
			//console.log("telematics :"+ $scope.telematics );
		}).
		error(function(data, status, headers, config) {
			alert("OpenDashboard call failed");
		});
	};
	
	$scope.generateUID = function(){
		var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < 28; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};
	
	$scope.policiesInit = function(){
		$scope.enableNav();
		$scope.sortRisks();
	};
	
	$scope.policiesInit();
	
}]);

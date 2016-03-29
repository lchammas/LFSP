(function() {
	'use strict';

	angular
		.module('portal.doxService', []) // Instantiate the module
		.factory('dataDocuments', dataDocuments);

	dataDocuments.$inject = ['$http', '$q', '$location', '$rootScope']

	function dataDocuments($http, $q, $location, $rootScope) { 

		var service = {
				getDocumentList: getDocumentList
			};
			return service;
		
		function getDocumentList(policyNumbers, email, dob){
			var result = {};
			var deferred = $q.defer();
			
			var documentListRequest = new Object();
			documentListRequest.email = email;
			documentListRequest.dob = dob;
			documentListRequest.policyNumbers = "";
			var retrievedPolicies = [];
			for(var i=0;i<policyNumbers.length;i++){
				if($.inArray(policyNumbers[i], retrievedPolicies) < 0){
					documentListRequest.policyNumbers += policyNumbers[i] + ";";
					retrievedPolicies.push(policyNumbers[i]);
				}
			}
			if(documentListRequest.policyNumbers.length > 0){
				$http({
					method: 'POST', 
					url: "//" + window.location.hostname + "/OPS/service/WrapperService/documentList",
					headers: { 'portal-access-token': $rootScope.auth.token },
					params: {documentListRequest: documentListRequest }
				}).
				success(function(data, status, headers, config) {
					//console.log(data);
					if (data == "-1"){
						var activeResidenceRisks = [], archiveResidenceRisks = [];
						var activeVehicleRisks = [], archiveVehicleRisks = [];
						var policyRisks = new Object();
						policyRisks.activeResidenceRisks = activeResidenceRisks;
						policyRisks.archiveResidenceRisks = archiveResidenceRisks;
						policyRisks.activeVehicleRisks = activeVehicleRisks;
						policyRisks.archiveVehicleRisks = archiveVehicleRisks;
						result.risks = policyRisks;
						result.muledown = true;
						result.err = false;
						deferred.resolve(result);
					} else {
						var str = data+'';
						var array = str.split(";");
						$rootScope.documents.key = array[1];
						result.risks = processRisks(JSON.parse(array[0]));
						result.err = false;
						deferred.resolve(result);
					}
				}).
				error(function(data, status, headers, config) {
					// Handle http errors
					deferred.resolve({
						err: true,
						type: 'portalDown'
					});
				});
			}
			return deferred.promise;
		};
			
		function processRisks(risks){
			var activeResidenceRisks = [], archiveResidenceRisks = [];
			var activeVehicleRisks = [], archiveVehicleRisks = [];
			var hasTelematicsRisk = false;
			// multi product
			if(typeof risks.risk != 'undefined'){
				if(!hasTelematicsRisk && risks.risk.telematics_risk == "Y")
					hasTelematicsRisk = true;
				// display only 'pending' risks and risks with documents 
				if(!(risks.risk.document_packs == null && risks.risk.risk_status != 'P')){
					if(risks.risk.risk_type=="VEHICLE"){
						addRiskToModel(risks.risk, activeVehicleRisks, archiveVehicleRisks);
					}else if(risks.risk.risk_type=="HOUSEHOLD"){
						addRiskToModel(risks.risk, activeResidenceRisks, archiveResidenceRisks);
					}
				}
			}else{
				// single product
				for(var i=0;i<risks.length;i++){
					var risk = risks[i];
					if(!(risk.document_packs == null && risk.risk_status != 'P')){
						if(risk.risk_type=="VEHICLE"){
							if(!hasTelematicsRisk && risk.telematics_risk == "Y")
								hasTelematicsRisk = true;
							addRiskToModel(risk, activeVehicleRisks, archiveVehicleRisks);
						}else{
							addRiskToModel(risk, activeResidenceRisks, archiveResidenceRisks);
						}
					}
				}
			}
			var policyRisks = new Object();
			policyRisks.activeResidenceRisks = activeResidenceRisks;
			policyRisks.archiveResidenceRisks = archiveResidenceRisks;
			policyRisks.activeVehicleRisks = activeVehicleRisks;
			policyRisks.archiveVehicleRisks = archiveVehicleRisks;
			return policyRisks;
		};
		
		function addRiskToModel(risk, activeArray, archiveArray){
			if(risk.policy_status == "C" || risk.risk_status == "N" || risk.risk_status == "C")
				archiveArray.push(risk);
			else
				activeArray.push(risk);
		};
	}
})();
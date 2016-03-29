angular.module('portal.documentsController',[])
.controller('DocumentsController', ['$scope', '$http', '$location', '$rootScope', 'ieDocumentService',
	function ($scope, $http, $location, $rootScope, ieDocumentService) {
	
		// Call a function declared in home.js to manage NavBar menus
		$scope.setNavMenus($location.path());
		var timeout = (new Date()).getTime();
		$rootScope.auth.timeout  = timeout;
		$scope.activeDocuments = [];
		$scope.archiveDocuments = [];
		$scope.activeDocumentCodes = [];
		$scope.documents = {};
		$scope.isImportVehicle = false;
		$scope.documents.key = $rootScope.documents.key;
		$scope.documents.policyRef = "";
		
		$scope.riskID = ""; // postcode / VRN 
	
		$scope.isIE = false;
		$scope.doxInit = function(){
			if( ie_ver()>= 9){
				$scope.isIE = true;		
			}

			$scope.showLoadingModal = true;
			var risk = $scope.selectedRisk[0];
			$scope.formatted_pol_ref = getFormatPolRef(risk.policy_reference);	
			$scope.risk = risk;
			$scope.documents.policyRef = risk.policy_reference;
			if(risk.postcode){
				$scope.riskID = risk.postcode;
				risk.isHHRisk = true;				
				$scope.isHHRisk = true;
			}
			else{
				$scope.riskID = risk.registration_number;
				risk.isHHRisk = false;
				$scope.isHHRisk = false;
				
				if($scope.riskID.substring(0,1) == '*'){
					$scope.isImportVehicle = true;	
				}
				if($scope.riskID.substring(0,1) == '#'){
					$scope.isImportVehicle = true;	
					$scope.riskID = $scope.riskID.substring(1,$scope.riskID.lenght)
				}
				
			}
			
			$scope.selectedRisk = [];
			$scope.selectedRisk.push(risk);
			if(risk.document_packs.length>1){
				for(var i=0;i<risk.document_packs.length;i++){
					$scope.processDocumentPacks(risk.document_packs[i],risk.isHHRisk, risk.policy_status);
				}
			}else{
				$scope.processDocumentPacks(risk.document_packs,risk.isHHRisk, risk.policy_status);
			}
			
			if($scope.activeDocuments.length == 0)
				$scope.noActiveDocuments = true;
		};

		// This function produces a formated version of the Policy reference
		// Assumes the format will be two chars followed by three chars then the number
		// Unless the it is a bolt number which will be a letter P and then the number
		function getFormatPolRef(polRef){
			var fmtdPolRef;
			if(polRef.substr(0, 1).toUpperCase() !== 'P'){
				fmtdPolRef = polRef.substr(0, 2) + ' ' + polRef.substr(2, 3) + ' ' + polRef.substr(5);
				return fmtdPolRef;
			} else {
				fmtdPolRef = polRef.substr(0, 1) + ' ' + polRef.substr(1)
			}
		}
		
		$scope.getDoc = function(doc, documents){
			ieDocumentService.getDocument(doc.docCode, doc.filePath, doc.startDate,
					doc.link, doc.line1, doc.line2, doc.line3,
					documents.key, documents.policyRef, doc.isHHRisk, doc.packType);
		};
		
		$scope.processDocumentPacks = function(documentPack, isHHRisk, policy_status){
			var docPack = documentPack;
			var startDate = docPack.risk_start_date;
			var endDate = docPack.risk_end_date;
			var transactionDate = docPack.transaction_date;
			var filePath = docPack.xml_file_location;
			var packType = docPack.pack_type;
			
			
			if(docPack.document.length>1){			
				for(var i=0;i<docPack.document.length;i++){
					$scope.processDocument(docPack.document[i], startDate, endDate, transactionDate, filePath, isHHRisk, policy_status, packType);
				}
			}else{
				$scope.processDocument(docPack.document, startDate, endDate, transactionDate, filePath, isHHRisk, policy_status, packType);
			}
		};
		
		$scope.processDocument = function(doc, startDate, endDate, transactionDate, filePath, isHHRisk, policy_status, packType){
			var document = new Object();
			document.isHHRisk = isHHRisk;
			document.docCode = doc.doc_code;
			document.startDate = startDate;
			document.endDate = endDate;
			document.formattedStartDate = $scope.convertDateString(startDate);
			document.formattedEndDate = $scope.convertDateString(endDate);
			document.filePath = filePath;
			document.transactionDate = transactionDate;
			document.line1 = ($scope.risk.address_line1 != null)?$scope.risk.address_line1:'none';
			document.line2 = ($scope.risk.address_line2 != null && !( Object.prototype.toString.call( $scope.risk.address_line2 ) === '[object Array]' ))?$scope.risk.address_line2:'none';
			document.line3 = ($scope.risk.address_line3 != null && !( Object.prototype.toString.call( $scope.risk.address_line3 ) === '[object Array]' ))?$scope.risk.address_line3:'none';
			document.prefix = getDocumentNameFromCode(doc.doc_code, isHHRisk, packType); // custom-js.js
			document.packType = packType;
			
			
			if(policy_status == "C" && doc.doc_code == "CT"){
				document.link = -1;
			}else{
				if($scope.risk.postcode){
					document.link = $scope.risk.postcode;
				} else {
					document.link = $scope.risk.registration_number;
				}
			}
			$scope.showLoadingModal = false;

			var today = parseInt(yyyymmdd(new Date()));
			// see if the a version of the current doc is already in the active list
			var index = $scope.activeDocumentCodes.indexOf(document.docCode);

			if(index>=0){
				// get the other version of the doc to compare it to
				var docToCheck = $scope.activeDocuments[index];
				// if the current doc has ended put it in archived
				if(!(document.endDate < today) && 
						// only doc with latest transaction date should be shown in active list 
					(   docToCheck.transactionDate < document.transactionDate ||
					(	docToCheck.transactionDate == document.transactionDate &&
						docToCheck.transactionTime < document.transactionDate )
						)){
					// replace the old version with the new
					$scope.activeDocuments.splice(index, 1, document);
				}else{
					$scope.archiveDocuments.push(document);	
				}
			}else{
				$scope.activeDocuments.push(document);
				$scope.activeDocumentCodes.push(document.docCode);
			}
		};
		
		$scope.displayArchiveDocs = false;
		$scope.toggleDocs = function(){
			$scope.displayArchiveDocs = !$scope.displayArchiveDocs;
		};
		
        $scope.auditDoc = function(doc_code, isHHRisk, packType){
        	var risk = $scope.selectedRisk[0];
        	var auditRequest = new Object();
        	auditRequest.transactionId = $scope.user.firstName + ' ' + $scope.user.surname;
        	auditRequest.brand = $scope.user.policyReference.brand;
        	auditRequest.polno = risk.policy_reference;
        	auditRequest.product = '';
        	auditRequest.action = "View document: " + getDocumentNameFromCode(doc_code, isHHRisk, packType); // custom-js.js
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
}]);

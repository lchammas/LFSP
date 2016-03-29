(function() {
	'use strict';

	angular
		.module('portal.ieDocumentService', []) // Instantiate the module
		.factory('ieDocumentService', ieDocumentService);

	ieDocumentService.$inject = ['$http', '$q', '$location', '$rootScope']

	function ieDocumentService($http, $q, $location, $rootScope) { 

		var service = {
				getDocument: getDocument
			};
			return service;
		
		function getDocument(docCode, filePath, startDate, riskID, address1, address2, address3,
				docKey, policyRef, isHHRisk, packType){
			var documentRequest = new Object();
			documentRequest.docCode = docCode;
			documentRequest.filePath = filePath;
			documentRequest.startDate = startDate;//*
			documentRequest.riskID = riskID;
			documentRequest.addressLine1 = address1;
			documentRequest.addressLine2 = address2;
			documentRequest.addressLine3 = address3;
			documentRequest.documentKey = docKey;
			documentRequest.policyRef = policyRef;
			documentRequest.isHHRisk = isHHRisk;
			documentRequest.packType = packType;
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/WrapperService/getDocumentById",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {documentRequest: documentRequest },
				responseType: 'arraybuffer'
			}).success(function (data, status, headers, config) {
				var file = new Blob([data], {type: 'application/pdf'});
				window.navigator.msSaveOrOpenBlob(file, getDocumentNameFromCode(docCode, isHHRisk, packType)+policyRef+".pdf");
			}).
			error(function(data, status, headers, config) {
				$rootScope.auth.token = 0;
				$location.path('/document-not-found');
			});
		};
			
	}
})();
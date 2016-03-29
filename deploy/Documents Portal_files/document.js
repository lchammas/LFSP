angular.module('portal.documentController',[])
.controller('DocumentController', ['$scope', '$route', '$routeParams', '$http', '$location', '$rootScope', '$sce', '$timeout', '$window',
	function ($scope, $route, $routeParams, $http, $location, $rootScope, $sce, $timeout, $window) {

			$("header").hide();
			
			var timeout = (new Date()).getTime();
			var timer = $routeParams.time;
			$rootScope.auth.token = $routeParams.token;
			

        	if ((timeout - timer) > 600000){
        		$location.path('/login');
        	}

			$scope.ios = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

			
			$scope.getDocumentById = function(){

				var documentRequest = new Object();
				documentRequest.docCode = $routeParams.code;
				documentRequest.filePath = $routeParams.path;
				documentRequest.startDate = $routeParams.year+$routeParams.month+$routeParams.day;
				documentRequest.riskID = $routeParams.id;
				documentRequest.addressLine1 = ($routeParams.line1 == 'none')?'':$routeParams.line1;
				documentRequest.addressLine2 = ($routeParams.line2 == 'none')?'':$routeParams.line2;
				documentRequest.addressLine3 = ($routeParams.line3 == 'none')?'':$routeParams.line3;
				documentRequest.documentKey = $routeParams.documentKey;
				documentRequest.policyRef = $routeParams.policyRef;
				documentRequest.isHHRisk = $routeParams.isHHRisk;
				documentRequest.packType = $routeParams.packType;
				
				$http({
					method: 'POST', 
					url: "//" + window.location.hostname + "/OPS/service/WrapperService/getDocumentById",
					headers: { 'portal-access-token': $rootScope.auth.token },
					params: {documentRequest: documentRequest },
					responseType: 'arraybuffer'
				}).success(function (data, status, headers, config) {
					var file = new Blob([data], {type: 'application/pdf'});
					var fileURL = URL.createObjectURL(file);

					$scope.content = $sce.trustAsResourceUrl(fileURL);
					$scope.showDoc = true;

					// Handle display on IOS devices
					if ($scope.ios) {
						fileURLToUint8Array(file);
					}
				}).
				error(function(data, status, headers, config) {
					$rootScope.auth.token = 0;
					$location.path('/document-not-found');
				});

	
			}

			// Converts Base64 streaming format into uint8Array format
			// which is usable by PDFJS
			function fileURLToUint8Array(file) {
				var reader = new FileReader();
				var dataURI;

				// Read the base64 file
				reader.readAsBinaryString(file);

				// When its finished loading
				reader.onload = function(e){
					var bdata = btoa(reader.result);
					dataURI = 'data:application/pdf;base64,' + bdata;
				
					var BASE64_MARKER = ';base64,';
					var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
					var base64 = dataURI.substring(base64Index);

					//This is a native function that decodes a base64-encoded string.
					var raw = atob(base64); 

					var uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
					for (var i = 0; i < raw.length; i++) {
						uint8Array[i] = raw.charCodeAt(i);
					}

					// Call the PDF rendering
					renderPDF(uint8Array, document.getElementById('holder'));
				}
			}

			// Uses Mozilla PDFJS to render the document on IOS
			function renderPDF(url, canvasContainer) {
			     scale= 1.3;  //"zoom" factor for the PDF
			       
			    function renderPage(page) {
			        var viewport = page.getViewport(scale);
			        var canvas = document.createElement('canvas');
			        var ctx = canvas.getContext('2d');
			        var renderContext = {
			          canvasContext: ctx,
			          viewport: viewport
			        };
			       
			        canvas.height = viewport.height;
			        canvas.width = viewport.width;

			        canvasContainer.appendChild(canvas);
			       
			        page.render(renderContext);
			    }
			  
			    function renderPages(pdfDoc) {
			        for(var num = 1; num <= pdfDoc.numPages; num++)
			            pdfDoc.getPage(num).then(renderPage);
			    }

			    PDFJS.disableWorker = true;
			    PDFJS.getDocument(url).then(renderPages);
			}


			// Not used as canvas was used on all ios devices
			function isIOS8() {
				var deviceAgent = navigator.userAgent.toLowerCase();
				return /ipad|iphone|ipod os 8_/.test(deviceAgent);
			};

			
			$scope.getDocumentById();


		
}]);

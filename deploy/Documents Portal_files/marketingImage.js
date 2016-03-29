
(function() {
	'use strict';

	angular
		.module('portal.marketingImage', []) // Instantiate the module
		.factory('marketingImage', marketingImage);

	marketingImage.$inject = ['$http', '$q', '$rootScope']

	function marketingImage($http, $q, $rootScope) { 

		var hst = window.location.hostname;

		var service = {
				getMarketingImage: getMarketingImage			
		};
		
		return service;

		////////////


		function getMarketingImage() {
		
			var deferred = $q.defer();
		
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/DatabaseService/image",			
				headers: { 'portal-access-token': $rootScope.auth.token },
			})
			
			.success(function(data, status, headers, config) {
				var marketingimage = {
                      
                        admot: { },
                        blcar: { },
                        diamo: { },
                        elint: { }
				};
				
				
				for (var i = 0; i < data.length; i++) {
				
					
					var brand = data[i]["msgbrand"].replace(/\s+/g, '');
					var name = data[i]["msgname"].replace(/\s+/g, '');
					var value = data[i]["msgval"];
					marketingimage[brand][name]= value;0
					
				}		

				deferred.resolve(marketingimage);
		
			})
			
			.error(function(data, status, headers, config) {
				// Handle http errors
				deferred.resolve({
					err: true,
					type: 'portalDown'
				});
			});

			return deferred.promise;
			};

	}
})();
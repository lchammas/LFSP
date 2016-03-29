
(function() {
	'use strict';

	angular
		.module('portal.portalData', []) // Instantiate the module
		.factory('portalData', portalData);

	portalData.$inject = ['$http', '$q', '$rootScope']

	function portalData($http, $q, $rootScope) { 

		var hst = window.location.hostname;

		var service = {
				getPortalData: getPortalData			
		};
		
		return service;

		////////////


		function getPortalData() {
		
			var deferred = $q.defer();
		
			$http({
				method: 'POST', 
				url: "//" + window.location.hostname + "/OPS/service/DatabaseService/appdata",			
				headers: { 'portal-access-token': $rootScope.auth.token },
			})
			
			.success(function(data, status, headers, config) {
				var portaldata = {
                        all:{},
                        admot: { },
                        blcar: { },
                        diamo: { },
                        elint: { }
				};
				
				
				for (var i = 0; i < data.length; i++) {
				
					
					var brand = data[i]["msgbrand"].replace(/\s+/g, '');
					var name = data[i]["msgname"].replace(/\s+/g, '');
					var value = data[i]["msgval"];
					portaldata[brand][name]= value;
					
				}		

				deferred.resolve(portaldata);
		
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
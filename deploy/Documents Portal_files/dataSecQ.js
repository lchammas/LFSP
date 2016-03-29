/* dataSecQ.js - Implements data functions used for security questions: getSecQsInds, getSecurityQuestions, updateChangedSecQs and getChosenQs, the functions use a promise to return data when the http call has resolved */
(function() {
	'use strict';

	angular
		.module('portal.dataService', []) // Instantiate the module
		.factory('dataSecQ', dataSecQ);

	dataSecQ.$inject = ['$http', '$q', '$rootScope']

	function dataSecQ($http, $q, $rootScope) { 

		var hst = window.location.hostname;

		// Export these functions
		var service = {
			getSecQsInds: getSecQsInds,
			getSecurityQuestions: getSecurityQuestions,
			updateChangedSecQs: updateChangedSecQs,
			getChosenQs: getChosenQs
		};
		return service;

		////////////

		// Used in account settings to change security questions
		function updateChangedSecQs(request) {
			var result = {};
			var deferred = $q.defer();

			$http({
				method: 'POST', 
				headers: { 'portal-access-token': $rootScope.auth.token },
				url: "//" + hst + "/OPS/service/LDAPService/changeSecurityQuestions",
				params: {securityQuestionsRequest: request }

			}).success(function(data, status, headers, config) {
				if(data == -1) {
					result.err = true;
					result.type = 'portalDown';
				} else {
					deferred.resolve({err: false});
				}
			}).error(function(data, status, headers, config) {
				// Handle http errors
				deferred.resolve({
					err: true,
					type: 'portalDown'
				});
			});

			return deferred.promise;
		};


		// Gets the current list of security questions
		function getSecurityQuestions()	{
			//
			var result = {}; result.dat = [];
			var deferred = $q.defer();


			$http({
				method: 'POST', 
				url: "//" + hst + "/OPS/service/DatabaseService/securityQuestions"

			}).success(function(data, status, headers, config) {

				for(var i = 0; i < data.length; i++){
					var o = new Object();
					o.content = data[i]["question"];
					o.id = data[i]["id"];
					o.status = false;
					o.answer = "";
					result.dat.push(o);
				}
				result.err = false;
				deferred.resolve(result);

			}).error(function(data, status, headers, config) {
				// Handle http errors
				result.err = true;
				deferred.resolve(result);
			});

			return deferred.promise;
		};


		// Get the index or ids for a customers security questions
		function getSecQsInds(request) {

			var result = {};
			var deferred = $q.defer();

			$http({
				method: 'POST', 
				url: "//" + hst + "/OPS/service/LDAPService/forgotPassword",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {forgotPasswordRequest: request }

			}).success(function(data, status, headers, config) {
				// Executed when the promise returns
				if(data == -1) {
					result.err = true;
					result.type = 'failedSearch';
				} else {
					result.err = false;
					result.data = data;
				}
				deferred.resolve(result);

			}).error(function(data, status, headers, config) {
				// Handle http errors
				deferred.resolve({
					err: true,
					type: 'portalDown'
				});
			});

			return deferred.promise;
		};


		// Looks up text for security questions given the index ids
		function getChosenQs(request) {

			var result = [];
			var deferred = $q.defer();

			$http({
				method: 'POST', 
				url: "//" + hst + "/OPS/service/DatabaseService/chosenSecurityQuestions",
				headers: { 'portal-access-token': $rootScope.auth.token },
				params: {chosenQuestions: request}

			}).success(function(data, status, headers, config) {

				for (var i = 0; i < data.length; i++) {
					var o = {
						content: data[i]["question"],
						id: data[i]["id"],
						status: false,
						answer: ""
					}
					result.push(o);
				}

				deferred.resolve(result);

			}).error(function(data, status, headers, config) {
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
/* 
Manage time out. Check if excluded from time-out (Defined in constants above). There is a partner function to this in the http interceptor below which caters for a page timing out before any background http calls have been completed. The interceptor just adds another timeout interval.

The situation was further complicated by the timeout not working on mobiles if the mobile was put in sleep mode. Because of this we had use an interval to test whether the timeout was out of date on a regular basis.
*/
(function() {
	'use strict';

	angular
		.module('portal.timeOutServ', []) // Instantiate the module
		.factory('timeOutServ', timeOutServ);

	timeOutServ.$inject = ['$rootScope', '$location', '$timeout', '$interval']

	function timeOutServ($rootScope, $location, $timeout, $interval) { 

		var hst = window.location.hostname;

		var service = {
				setTimeOut: setTimeOut			
		};
		
		return service;

		////////////


		function setTimeOut() {
		
			// Cancel the last timeout before setting new one
			$timeout.cancel($rootScope.auth.timer);
			//console.log('In http timer block: ' + loc + ' , Time canX: ' + t);

			// Raise the timeout
			var timer = $timeout(function() {
				// After the timeout period Redirect to timer page
				$rootScope.$evalAsync(function () {
					// Log person out to stop nav bar displaying
					$rootScope.auth.token = 0;
					$interval.cancel($rootScope.auth.inter);
					$location.path('/time-out');
				});						
			}, 600000); // Time in millisecs
			// Save the timeout promise so it can be cancelled if an event occurs before it finishes
			$rootScope.auth.timer = timer;

			/* This 'fix' if statement detects whether ie11 is running and stops a case where, logging out twice in a row throws 250K of debug info at the cosole window twice a second. The code below is only used as a fix on mobile devices causing timing out problems */
			if(!!navigator.userAgent.match(/Trident\/7\./)) return;

			$interval.cancel($rootScope.auth.inter);
			// Set interval to check on timeout every second
			var inter = $interval(function() {
				// Get new time
				var iNow = new Date().getTime();
				// Compare current time with time when http timeout was set out
				if (iNow > $rootScope.timeouttime){
					// Reset the auth token and go to timeout page
					$rootScope.auth.token = 0;
					$interval.cancel($rootScope.auth.inter);
					$location.path('/time-out');
				}
			}, 1000);

			// Get new timestamp and add ten minutes
			var now = new Date().getTime();
			$rootScope.timeouttime = now + 600000;
			// Save interval promise
			$rootScope.auth.inter = inter;
		};

	}
})();
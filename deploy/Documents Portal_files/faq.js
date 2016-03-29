angular.module('portal.faqCont', [])
.controller('FaqCont',
	[ '$scope', '$http', '$location','portalData',
	  function($scope, $http, $location, portalData) {

			// Call a function declared in home.js to manage
			// NavBar menus
			$scope.setNavMenus($location.path());
				
} ]);
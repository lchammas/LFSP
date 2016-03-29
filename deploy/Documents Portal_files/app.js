var app = angular
	.module('portalApp',[
        'ngRoute',
        'portal.faqCont',
        'portal.homeController',
        'portal.registerController',
        'portal.policyController',
        'portal.documentsController',
        'portal.documentController',
        'portal.documentNotFoundController',
        'portal.accountSettings',
        'portal.changeSecureQs',
        'portal.dataService',        
        'portal.portalData',
        'portal.marketingImage',
        'portal.doxService',
        'portal.signOut',
        'portal.timeOut',
        'portal.timeOutServ',
        'portal.forgottenPassword1',
        'portal.forgottenPassword2',
        'portal.forgottenPassword3',
        'portal.forgottenPassword4',
        'portal.ieDocumentService'
    ])
		// Secure Views is used in the route change watch below
		.constant('secureViews', [
			'Resources/views/change-email.html',
			'Resources/views/change-password.html',
			'Resources/views/change-secure-qs.html',
			'Resources/views/account-settings.html',
			'Resources/views/add-policy.html',
			'Resources/views/policies.html',
			'Resources/views/documents.html'
		])
		// Non Timeout Pages is used in the route change watch below
		.constant('nonTimeOutPgs', [
			'Resources/views/time-out.html',
			'Resources/views/register1.html',
			'Resources/views/sign-in.html'
		])
		// Non Timeout Routes are used in the http interceptor and should match 
		// nonTimeOutPgs above (the slash and empty string are required for edge cases)
		.constant('nonTimeOutRoutes', [
			'/',
			'/time-out',
			'/register',
			'/login',
			''
		])
		// Logged in Pages where we dont want to show the Nav bar
		.constant('dontShowNav', [
			'Resources/views/tmp_pass_upd.html',
			'Resources/views/sign-in.html',
			'Resources/views/register1.html',
			'Resources/views/register2.html',
			'Resources/views/register3.html',
			'Resources/views/register4.html',
			'Resources/views/already-registered.html',
			'Resources/views/forgotten-password1.html',
			'Resources/views/forgotten-password2.html',
			'Resources/views/forgotten-password3.html',
			'Resources/views/forgotten-password4.html',
			'Resources/views/sign-out.html',
			'Resources/views/time-out.html'
		])
    
	  /* Runs when the app is initiated */
	  .run(function($rootScope, $location, $timeout, $interval, secureViews, nonTimeOutPgs, dontShowNav, timeOutServ) {
			$rootScope.auth = {};
			$rootScope.auth.token = 0;
			$rootScope.auth.timer = {};

			// Watches for route changes and manages timeout, page auth and nav bars
			$rootScope.$on('$routeChangeStart', function(event, next, prev) {

				// Check if no auth token and secure page (Defined in constants above)
				if ($rootScope.auth.token == 0 && 
							secureViews.indexOf(next.templateUrl) != -1){
					// Redirect to the login page
					$rootScope.$evalAsync(function () {
						$location.path('/login');
					});						
				}

				// Tell Google tag manager that a page change has happened
				virtualPageview();

				/* 
				Routines to control the NavBar, they calls global functions which are defined in custom-js. Clear any displayed menus Check first if desktop or mobile 
				*/
				if(eventDelegation.eventGroup === "desktop") {
					hideDesktopMenu();
					closeBlackoutLayer();
				} else {
					closeMenu();
					resetMobileMenu();
				}

				// Determine whether nav bar icons should be shown
				if ($rootScope.auth.token !== 0 && 
							dontShowNav.indexOf(next.templateUrl) == -1) {
					showNavIcons();
				} else {
					hideNavIcons();
				}

				/* Use a service to manage time out on page change	*/
				if (nonTimeOutPgs.indexOf(next.templateUrl) == -1 && typeof next.templateUrl !== 'undefined') {
					// Call time setTimeOut function in timeout service
					timeOutServ.setTimeOut();
				}

			});
		})
	.config(['$routeProvider', '$locationProvider', '$httpProvider',  function ($routeProvider, $locationProvider, $httpProvider) {
	    $routeProvider
	    .when('/register', {templateUrl: 'Resources/views/register1.html', controller: 'RegisterController' })
 	    .when('/register2', {templateUrl: 'Resources/views/register2.html', controller: 'RegisterController' })
 	    .when('/register3', {templateUrl: 'Resources/views/register3.html', controller: 'RegisterController' })
 	    .when('/register4', {templateUrl: 'Resources/views/register4.html', controller: 'RegisterController' })
 	    .when('/already-registered', {templateUrl: 'Resources/views/already-registered.html', controller: 'RegisterController' })
 	    .when('/change-email', {templateUrl: 'Resources/views/change-email.html', controller: 'RegisterController' })
 	    .when('/change-password', {templateUrl: 'Resources/views/change-password.html', controller: 'RegisterController' })
        .when('/change-secure-qs', {templateUrl: 'Resources/views/change-secure-qs.html', controller: 'changeSecureQs' })
 	    .when('/account-settings', {templateUrl: 'Resources/views/account-settings.html', controller: 'accountSettings' })
 	    .when('/forgotten-password1', {templateUrl: 'Resources/views/forgotten-password1.html', controller: 'forgottenPassword1' })
 	    .when('/forgotten-password2', {templateUrl: 'Resources/views/forgotten-password2.html', controller: 'forgottenPassword2' })
 	    .when('/forgotten-password3', {templateUrl: 'Resources/views/forgotten-password3.html', controller: 'forgottenPassword3' })
 	    .when('/forgotten-password4', {templateUrl: 'Resources/views/forgotten-password4.html', controller: 'forgottenPassword4' })
 	    .when('/add-policy', {templateUrl: 'Resources/views/add-policy.html', controller: 'RegisterController' })
 	    .when('/faq', {templateUrl: 'Resources/views/faq.html', controller: 'FaqCont' })
 	    .when('/login', {templateUrl: 'Resources/views/sign-in.html', controller: 'RegisterController' })
 	    .when('/policies', {templateUrl: 'Resources/views/policies.html', controller: 'PolicyController' })
 	    .when('/documents', {templateUrl: 'Resources/views/documents.html', controller: 'DocumentsController' })
 	    .when('/document-not-found', {templateUrl: 'Resources/views/document-not-found.html', controller: 'DocumentNotFoundController' })
 	    .when('/document/:code/:path/:day/:month/:year/:id/:line1/:line2/:line3/:token/:time/:policyRef/:isHHRisk/:documentKey/:packType', {templateUrl: 'Resources/views/document.html', controller: 'DocumentController' })
        .when('/sign-out', {templateUrl: 'Resources/views/sign-out.html', controller: 'signOut' })
        .when('/time-out', {templateUrl: 'Resources/views/time-out.html', controller: 'timeOut' })
 	    .when('/tmp_pass_upd', {templateUrl: 'Resources/views/tmp_pass_upd.html', controller: 'RegisterController' })
	    .otherwise({
	    	 redirectTo: '/login'
	    });
	    
	    $httpProvider.interceptors.push(function ($q, $location, $rootScope, $timeout, $interval, nonTimeOutRoutes, timeOutServ) {
	        return {
			    /* 
			    This request interceptor works with timeout component of the 'route change start' watch  defined in config run. It handles cases where someone is working on a page like email change and the page times out after a backend update has been sent but not returned. It basically extends the timeout by an extra ten minutes.
			    */
          'request': function (config) {

          	// Get the url from the config object
          	var loc = config.url;
          	// See if it starts with http, to exclude template requests
          	if(loc.substr(0, 4) === 'http'){

							// Is the request called from a page where timeout is needed
							if (nonTimeOutRoutes.indexOf($location.path()) == -1) {
								// Call time setTimeOut function in timeout service
								timeOutServ.setTimeOut();
							}
          	}

            return config || $q.when(config);
          },

					'response': function(response) {

						//handles error response before the controllers are called.
						if (response.status == '401'){
							$location.path("/time-out");
						} else if (response.status == '403'){
							$location.path("/sign-out");
						}
						
						return response;
					}

        }
	    });

	   
	}]);



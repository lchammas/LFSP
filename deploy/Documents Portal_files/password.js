'use strict';
app.directive('admCheckSame', function () {

    return {
        replace: false,
        restrict: 'A', //called via a DOM element containing with a custom attribute check-strength
        //template: '<div class="pwd-str group"><p><span></span></p></div>',  
        link: function (scope, iElement, iAttrs) {
        	
            scope.$watch(iAttrs.admCheckSame, function () {
            		var _same = (scope.user.pw1 === scope.user.pw2);
	            	// Check that the password fields are not empty
                    if (typeof scope.user.pw2 == 'undefined' || scope.user.pw2 == ''){
	            		_same = false;
	            	}
                    if (!_same){
                    	$("#passwordTick").removeClass('tick-icon');
                    	return false;
                    } else {
                    	$("#passwordTick").addClass('tick-icon');
                    	return true;
                    }
            });

            scope.matchContinue = function() {
            
            	var _same = (scope.user.pw1 === scope.user.pw2);
            	if (typeof scope.user.pw2 == 'undefined' || scope.user.pw2 == ''){
            		_same = false;
            	}
                if (!_same){
                	return false;
                }
                else {
                	
                	return true;
                }
            	
            	
            };
            
            
        },
    };

});



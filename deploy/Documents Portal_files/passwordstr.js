'use strict';
app.directive('admCheckStrength', function () {

    return {
        replace: false,
        restrict: 'A', //called via a DOM element containing with a custom attribute check-strength
        template: '<div class="pwd-str group" style="margin-bottom:20px;"><p class="red-copy">Password Strength: <span id="str" ng-bind="strword"></span></p>'
		+'<ul>'
		+'<li ng-if="attr == 0" class="no_value"></li>'
		+'<li ng-if="attr  > 0" class="poor">    </li>'
		+'<li ng-if="attr  > 1" class="weak">    </li>'
		+'<li ng-if="attr  > 2" class="medium">  </li>'
		+'<li ng-if="attr  > 3" class="strong">  </li>'
	+'</ul></div>',  
        link: function (scope, iElement, iAttrs) {

            scope.$watch(iAttrs.admCheckStrength, function () {
                var attr = strength.measureStrength(scope.user.pw1);
                if(typeof attr != 'undefined'){
                	var strengthCode = attr.index;
                	scope.attr = strengthCode;
                	scope.strword = attr.word;
                }
            });
            
            scope.strContinue = function() {
            var str = strength.measureStrength(scope.user.pw1);
            var passStr = 0
            passStr = str.index;
            if (passStr>1){
            	return true;
            }
            else {
            	return false;
            }
            };
        	
        	var strength = {
                words: ['', 'Poor', 'Weak', 'Medium', 'Strong'],
                measureStrength: function (p) {
                	if(typeof p != 'undefined'){
	                    var _code = 0;                                            
	                    var _lowerLetters = /[a-z]+/.test(p);   		//lower case                 
	                    var _upperLetters = /[A-Z]+/.test(p);			//upper case
	                    var _numbers = /[0-9]+/.test(p);				//number
	                    var _symbols1 = /[\W_]/.test(p);	//symbol
	                    var _notspace = /[\S]/.test(p);	//not a space
	                    var _symbols = false;
	                    if (_symbols1 && _notspace ){
	                    	_symbols = true;
	                    }
	                    var _length6 = p.length >= 6;					//longer than 6
	                    var _length8 = p.length >= 8;					//longer than 8
	                    var no_value = p.length == 0;
	                    
	                    if (!_length6 || !_numbers || !no_value ) _code = 1;
	                    if (_length6 & _numbers) _code = 2;
	                    if (_length8 & _numbers & _lowerLetters & _upperLetters) _code = 3;
	                    if (_length8 & _numbers & _lowerLetters & _upperLetters & _symbols) _code = 4;
	                    if (no_value) _code = 0; 
	                    
	                    return { word: this.words[_code], index:_code };
                	}
                },
            };

        },
    };

});



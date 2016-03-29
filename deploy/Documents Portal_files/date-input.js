app.directive('checkDay', function(){
  return{
    require:'ngModel',
    link: function(scope, elem, attrs, ctrl){
      ctrl.$parsers.unshift(checkForDay);
      ctrl.$formatters.shift(checkForDay);
      var typeOfData=attrs.name;

      function checkForDay(viewValue){
        if(angular.equals(typeOfData,"day")){
    	  if (parseInt(viewValue) > 0 && parseInt(viewValue) <32) {
          ctrl.$setValidity('checkDay',true);
        }
        else{
          ctrl.$setValidity('checkDay', false);
        }
        }
        if(angular.equals(typeOfData,"month")){
        	 if (parseInt(viewValue) > 0 && parseInt(viewValue) <13) {
                 ctrl.$setValidity('checkDay',true); 
               }
               else{
                 ctrl.$setValidity('checkDay', false);
               }
        }
        
        if(angular.equals(typeOfData,"year")){
        	if (parseInt(viewValue) > 1900 && parseInt(viewValue) <2015) {
                ctrl.$setValidity('checkDay',true); 
              }
              else{
                ctrl.$setValidity('checkDay', false);
              }
        }
        
        return viewValue;
      }
    }
  };
  
});

app.directive('numbersOnly', function(){
	   return {
	     require: 'ngModel',
	     link: function(scope, element, attrs, modelCtrl) {
	       modelCtrl.$parsers.push(function (inputValue) {
	    	   if (inputValue == undefined) return '';
	           var typeOfInput = attrs.name;
	           var inputType = 0; 
	           if(angular.equals(typeOfInput,"day"))
	        	   inputType = 1;
	           if(angular.equals(typeOfInput,"month"))
	        	   inputType = 2;
	           if(angular.equals(typeOfInput,"year"))
	        	   inputType = 3;
	           var transformedInput;
	           if(inputType == 1 || inputType == 2)
	        	   transformedInput = inputValue.replace(/[^0-9]|^\d{3,9}$/g, ''); 
	           else {
	        	   transformedInput = inputValue.replace(/[^0-9]|^\d{6}$/g, '');
	           }
	           var maxLength;
	           if(inputType == 3)maxLength = 4;
	           else maxLength = 2; 
	           if(transformedInput.length >= maxLength){
	        	   	        		   
	        	   if(inputType == 3)
	        		   transformedInput = transformedInput.substring(0,4);
	           
	        	   else{
	        		   transformedInput.substring(0,2);
	        	   }
	           
	           
	           } 
	           if (transformedInput!=inputValue) {
	              modelCtrl.$setViewValue(transformedInput);
	              modelCtrl.$render();
	           }
	           return transformedInput;  
	       });
	     }
	   };
	});

app.directive('numericOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue.replace(/[^\d.-]/g,'');

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});


app.directive('jumpnext', ['$parse', function($parse) {
    return {
        restrict: 'A',
        require: ['ngModel'],
        link: function(scope, element, attrs, ctrls) {
            var model=ctrls[0], form=ctrls[1];
            
            scope.next = function(){
                return model.$valid
            }
            
            scope.$watch(scope.next, function(newValue, oldValue){
                if (newValue && model.$dirty)
                {
                    var nextinput = element.next('input');
                    nextinput[0].focus();
                }
            })
        }
    }
}])
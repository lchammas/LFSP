app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '=',
      toggleShow: '&'
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, elem, attrs) {
      scope.dialogStyle = {};
     /* if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;*/
    },
    template: "<div class='ng-modal' ng-show='show'> " +
    		" <div class='blackoutScreen-ang' ng-click='toggleShow()'></div> " +
    		" <div class='standard-modal-ang' ng-style='dialogStyle'>" +
    		"<div class='ng-modal-dialog-content' ng-transclude></div>" +
    		"</div></div>"
  };
 
});
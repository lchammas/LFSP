app.directive('scrollTop', function () {
	return {
		controller: function() {			
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	}
});



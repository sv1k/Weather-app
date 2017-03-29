(function() {
	"use strict";

	PullToRefresh.init({
		mainElement: '.location',
		onRefresh: function(){
				// What do you want to do when the user does the pull-to-refresh gesture
				window.location.reload(); 
		}
});
})();


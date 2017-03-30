(function() {
	"use strict";

	PullToRefresh.init({
		mainElement: '.location',
		triggerElement: '.location',
		onRefresh: function(){
				window.location.reload(); 
		}
});
})();


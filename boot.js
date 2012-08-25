var application;

var images = {
	"bg"   : "images/bg.png",
	"ship" : "images/shipForeground.png"
};

$(function() {
	Util.preloadImages(images, function(result) {
		images = result;
		application = new Application();
	});
});

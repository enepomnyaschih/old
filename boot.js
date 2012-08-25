var application;

var images = {
	"bg" : "images/bg.png"
};

$(function() {
	Util.preloadImages(images, function(result) {
		images = result;
		application = new Application();
	});
});

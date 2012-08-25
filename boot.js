var application;

var images = {
	"test" : "images/test.png"
};

$(function() {
	Util.preloadImages(images, function(result) {
		images = result;
		application = new Application();
		$("body").append(application.el);
	});
});

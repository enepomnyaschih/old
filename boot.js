var application;

var images = {
	"bg"   : "images/bg.png",
	"ship" : "images/shipForeground.png"
};

var soundsToLoad = {
	"exp1" : "sounds/exp.mp3",
	"exp2" : "sounds/exp.ogg"
};

var tracks = {
	"exp" : new JW.Audio.Track({
		mp3 : "sounds/exp.mp3",
		ogg : "sounds/exp.ogg"
	})
};

$(function() {
	Util.preloadImages(images, function(result) {
		images = result;
		Util.preloadImages(soundsToLoad, function() {
			application = new Application();
		});
	});
});

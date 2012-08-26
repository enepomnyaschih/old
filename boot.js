var application;

var images = {
	"bg"      : "images/bg.png",
	"ship"    : "images/shipForeground.png",
	"monster" : "images/monster.png"
};

var soundsToLoad = {
	"exp1"    : "sounds/exp.mp3",
	"exp2"    : "sounds/exp.ogg",
	"engine1" : "sounds/engine.mp3",
	"engine2" : "sounds/engine.ogg",
	"drain1"  : "sounds/drain.mp3",
	"drain2"  : "sounds/drain.ogg"
};

var tracks = {
	"exp" : new Util.Track({
		mp3 : "sounds/exp.mp3",
		ogg : "sounds/exp.ogg"
	}),
	"engine" : new Util.Track({
		period : 4,
		mp3    : "sounds/engine.mp3",
		ogg    : "sounds/engine.ogg"
	}),
	"drain" : new Util.Track({
		period : 4,
		mp3    : "sounds/drain.mp3",
		ogg    : "sounds/drain.ogg"
	})
};

var playlist = new JW.Audio.Playlist({
	tracks : [
		new JW.Audio.Track({
			mp3 : "music/1.mp3",
			ogg : "music/1.ogg"
		}),
		new JW.Audio.Track({
			mp3 : "music/2.mp3",
			ogg : "music/2.ogg"
		})
	]
});

$(function() {
	Util.preloadImages(images, function(result) {
		images = result;
		Util.preloadImages(soundsToLoad, function() {
			application = new Application();
		});
	});
});

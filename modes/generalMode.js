Modes = window.Modes || {};

Modes.GeneralMode = Class.extend({
	generatedScreensNumber : 0,
	maxStars               : 0,

	init : function(maxStars)
	{
		this.maxStars = maxStars
	},

	generateScreen : function(col, row, shipX, shipY)
	{
		var starsNumber = Util.random(3/4 * this.maxStars) + 1/4 * this.maxStars;

		var x0y0 = World.Screen.getX0Y0(col, row, shipX, shipY);
		var stars = [];
        for (var i = 0; i < starsNumber; i++)
        {
            stars[i] = this.generateStar(x0y0[0], x0y0[1], shipX, shipY);
        }

		return new World.Screen(col, row, stars);
	},

	generateStar : function(x, y, shipX, shipY)
	{
		return new World.Star(x, y, 
			new World.Features(Math.random(), Math.random(), Math.random()),
			shipX, shipY);
	}
});
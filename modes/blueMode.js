Modes = window.Modes || {};

Modes.BlueMode = Class.extend({
	generatedScreensNumber : 0,
	maxStars               : 0,

	init : function(maxStars)
	{
		this.maxStars = maxStars;
	},

	generateScreen : function(col, row)
	{
		var x0y0 = World.Screen.getX0Y0(col, row);
		var stars = [];
        for (var i = 0; i < this.maxStars; i++)
        {
            stars[i] = this.generateStar(x0y0[0], x0y0[1]);
        }

   		this.generatedScreensNumber += 1;


		return new World.Screen(col, row, stars);
	},

	generateStar : function(x, y)
	{
		return new World.Star(x, y, new World.Features(0, 0, 1));
	}
});
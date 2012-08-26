Modes = window.Modes || {};

Modes.GeneralMode = Class.extend({
	generatedScreensNumber: 0,

	generateScreen : function(col, row)
	{
		var maxStars = Util.random(3/4 * World.starInScreenAmount) + 1/4 * World.starInScreenAmount;
		var x0y0 = World.Screen.getX0Y0(col, row);
		var stars = [];
        for (var i = 0; i < maxStars; i++)
        {
            stars[i] = this.generateStar(x0y0[0], x0y0[1]);
        }

		return new World.Screen(col, row, stars);
	},

	generateStar : function(x, y)
	{
		return new World.Star(x, y, new World.Features(Math.random(), Math.random(), Math.random()));
	}
});
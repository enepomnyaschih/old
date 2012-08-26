Modes = window.Modes || {};

Modes.CleanColorMode = Class.extend({
	generatedScreensNumber : 0,
	minColorSaturation     : 1,
	modeType               : 0,
	features               : null, // Array: [r, g, b];

	init : function (modeType, features)
	{
		this.modeType = modeType;
		this.features = features;
	},

	generateScreen : function(col, row)
	{
		var maxStars = 1 + this.generatedScreensNumber / 8;
		var x0y0 = World.Screen.getX0Y0(col, row);
		var stars = [];
        for (var i = 0; i < maxStars; i++)
        {
            stars[i] = this.generateStar(x0y0[0], x0y0[1]);
        }

   		this.generatedScreensNumber += 1;


		return new World.Screen(col, row, stars);
	},

	generateStar : function(x, y)
	{
		var satDif = 1 - this.minColorSaturation;
		var saturation = Math.random() * satDif + this.minColorSaturation;
		var starFeatures = new World.Features();

		var srcFeatures = this.features;
		if(this.modeType == Modes.CleanColorMode.typeAllColors)
		{
			srcFeatures = new World.Features(Util.random(1), Util.random(1), Util.random(1));
		}

		starFeatures.fuel = this.getFeatureBySaturation(srcFeatures.fuel, saturation);
		starFeatures.batteryPower = this.getFeatureBySaturation(srcFeatures.batteryPower, saturation);
		starFeatures.enginePower = this.getFeatureBySaturation(srcFeatures.enginePower, saturation);


		return new World.Star(x, y, starFeatures);
	},

	getFeatureBySaturation : function(value, saturation)
	{
		return value > 0 ? saturation : 0;
	}
});

Modes.CleanColorMode.typeOneColor = 0;
Modes.CleanColorMode.typeAllColors = 1;
Modes = window.Modes || {};

Modes.CleanColorMode = Class.extend({
	generatedScreensNumber : 0,
	minColorSaturation     : 1,
	modeType               : 0,
	features               : null, // Array: [r, g, b];
	maxStars               : 0,

	init : function (modeType, featuresArr, maxStars)
	{
		this.modeType = modeType;
		this.features = new World.Features(featuresArr[0], featuresArr[1], featuresArr[2]);
		this.maxStars = maxStars
	},

	generateScreen : function(col, row, shipX, shipY)
	{
		var maxStars = Math.round(Util.random(this.maxStars * 3/4) + this.maxStars * 1/4);
		var stars = [];
		var x0y0 = World.Screen.getX0Y0(col, row);

        for (var i = 0; i < maxStars; i++)
        {
            stars[i] = this.generateStar(x0y0[0], x0y0[1], shipX, shipY);
        }

   		this.generatedScreensNumber += 1;


		return new World.Screen(col, row, stars);
	},

	generateStar : function(x, y, shipX, shipY)
	{
		var satDif = 1 - this.minColorSaturation;
		var saturation = Math.random() * satDif + this.minColorSaturation;
		var starFeatures = new World.Features();

		var srcFeatures = this.features;
		if(this.modeType == Modes.CleanColorMode.typeAllColors)
		{
			srcFeatures = new World.Features(Util.random(2), Util.random(2), Util.random(2));
			if(srcFeatures.fuel == 0 && srcFeatures.batteryPower == 0 && srcFeatures.enginePower == 0)
			{
				srcFeatures.fuel = 1;
			}
		}

		starFeatures.fuel = this.getFeatureBySaturation(srcFeatures.fuel, saturation);
		starFeatures.batteryPower = this.getFeatureBySaturation(srcFeatures.batteryPower, saturation);
		starFeatures.enginePower = this.getFeatureBySaturation(srcFeatures.enginePower, saturation);


		return new World.Star(x, y, starFeatures, shipX, shipY);
	},

	getFeatureBySaturation : function(value, saturation)
	{
		return value > 0 ? saturation : 0;
	}
});

Modes.CleanColorMode.typeOneColor = 0;
Modes.CleanColorMode.typeAllColors = 1;
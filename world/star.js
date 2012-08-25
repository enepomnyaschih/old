World.Star = Class.extend({
	x        : null,  // absolute
	y        : null,  // absolute
	radius   : null,

    features : null,  // Array [ red, green, blue ], 0-1

    init:function(screenX, screenY)
    {
        this.x = screenX + Util.random(World.Screen.size);
        this.y = screenY + Util.random(World.Screen.size);
        this.radius = Util.random(20) + 10;
        this.features = [Math.random(), Math.random(), Math.random()];
    },

	getWeight: function()
	{
		return this.radius * this.radius * this.radius;
	}
});

World.Star.maxFeaturesSum = .7;

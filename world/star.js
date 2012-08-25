World.Star = Class.extend({
	x        : null,  // absolute
	y        : null,  // absolute
	radius   : null,
	features : null,  // Array [ red, green, blue ], 0-1
	
	getWeight: function()
	{
		return this.radius * this.radius * this.radius;
	}
});

World.Star.maxFeaturesSum = .7;

World.Star = Class.extend({
	x        : null,  // absolute
	y        : null,  // absolute
	radius   : null,
	features : null,  // Array [ red, green, blue ]
	
	getWeight: function()
	{
		return this.radius * this.radius * this.radius;
	}
});

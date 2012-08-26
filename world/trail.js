World.Trail = Class.extend({
	x    : null,  // absolute coord of ship at moment of trail creation
	y    : null,  // absolute
	time : 0,
	
	init: function(x, y)
	{
		this.x = x;
		this.y = y;
	},
	
	getOpacity: function()
	{
		var t = 1 - this.time / World.trailLifeTime;
		return .3 * t * t;
	}
});


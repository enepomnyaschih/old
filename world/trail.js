﻿World.Trail = Class.extend({
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
		var t = 1 - this.time / World.Trail.lifeTime;
		return t * t;
	}
});

World.Trail.lifeTime = 80;

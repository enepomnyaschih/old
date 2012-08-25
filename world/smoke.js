World.Smoke = Class.extend({
	x0    : null,  // absolute coord of ship engine at moment of smoke creation
	y0    : null,  // absolute
	angle : null,  // fly direction
	time  : 0,
	
	init: function(x0, y0, angle)
	{
		this.x0 = x0;
		this.y0 = y0;
		this.angle = angle;
	},
	
	getX: function()
	{
		return this.x0 + this.getDist() * Math.cos(this.angle);
	},
	
	getY: function()
	{
		return this.y0 + this.getDist() * Math.sin(this.angle);
	},
	
	getColor: function()
	{
		return JW.Color.multiGradient(World.Smoke.colors, this.time);
	},
	
	getOpacity: function()
	{
		return Math.max(0, 1 - this.time / World.Smoke.lifeTime);
	},
	
	getDist: function()
	{
		var t = Math.min(this.time / World.Smoke.lifeTime, 1);
		return World.Smoke.flyDist * t * t;
	}
});

World.Smoke.lifeTime = 40;
World.Smoke.flyDist = 50;
World.Smoke.colors = [
	[ 0, "#EF0C1C" ],
	[ World.Smoke.lifeTime / 2, "#333110" ]
];

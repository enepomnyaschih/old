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
	},

    calculateGravity : function(x, y, gravity)
    {
        var s = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        var acceleration = World.kGravity * this.getWeight() / (s * s);
        gravity.accelerationX += acceleration * (this.x - x) / s;
        gravity.accelerationY += acceleration * (this.y - y) / s;
    }
});

World.Star.maxFeaturesSum = 1.0;

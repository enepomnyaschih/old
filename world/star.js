World.Star = Class.extend({
	x        : null,  // absolute
	y        : null,  // absolute
	radius   : null,

    features : null,  // Array [ red, green, blue ], 0-1

    init:function(screenX, screenY)
    {
        this.x = screenX + Util.random(World.Screen.size);
        this.y = screenY + Util.random(World.Screen.size);
        this.radius = Util.random(World.Star.maxRadius * 3/4) + 1/4 * World.Star.maxRadius;
        this.features = [Math.random(), Math.random(), Math.random()];
    },

	getWeight: function()
	{
		return this.radius * this.radius * this.radius;
	},

    calculateGravity : function(x, y, gravity)
    {
        var s = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        if (s < this.radius)
            gravity.isExploded = true;
        var acceleration = World.kGravity * this.getWeight() / (s * s);
        gravity.accelerationX += acceleration * (this.x - x) / s;
        gravity.accelerationY += acceleration * (this.y - y) / s;

        if (s <= World.Star.maxRadius * 7) {
            var absoluteDrain = World.Star.kDrain / (s * s);
            gravity.drain[0] = this.features[0] * absoluteDrain * World.Star.kStarToShipDrainProportion;
            this.features[0] -= this.features[0] * absoluteDrain;
            gravity.drain[1] = this.features[1] * absoluteDrain * World.Star.kStarToShipDrainProportion;
            this.features[1] -= this.features[1] * absoluteDrain;
            gravity.drain[2] = this.features[2] * absoluteDrain * World.Star.kStarToShipDrainProportion;
            this.features[2] -= this.features[2] * absoluteDrain;
        }
    }
});

World.Star.maxFeaturesSum = 1.0;
World.Star.maxRadius = 12;
World.Star.kDrain = .1;
World.Star.kStarToShipDrainProportion = .01;

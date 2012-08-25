World.Star = Class.extend({
	x        : null,  // absolute
	y        : null,  // absolute
	radius   : null,

    features    : null, // World.Features

    init:function(screenX, screenY, features)
    {
        this.x = screenX + Util.random(World.Screen.size);
        this.y = screenY + Util.random(World.Screen.size);

        this.radius = Util.random(World.Star.maxRadius * 3/4) + 1/4 * World.Star.maxRadius;
        this.features = features;
    },

	getWeight: function()
	{
		return this.radius * this.radius;
	},

    calculateGravity : function(x, y, batteryPower, gravity)
    {
        var s = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        if (s < this.radius)
		{
            gravity.isExploded = true;
			return;
		}
		
        var acceleration = World.kGravity * this.getWeight() / (s * s);
        gravity.accelerationX += acceleration * (this.x - x) / s;
        gravity.accelerationY += acceleration * (this.y - y) / s;

        if (s <= World.Star.maxRadius * 7) {
            var absoluteDrain = World.Star.kDrain * Math.max(0, 1 - s / (World.Star.drainRadiusPerWeight * this.getWeight()));
            gravity.features.changeFuel(this.features.fuel * absoluteDrain * World.Star.kStarToShipDrainProportion * (1 + batteryPower) * World.Star.kBatteryPower);
            this.features.changeFuel(-this.features.fuel * absoluteDrain);

            gravity.features.changeBatteryPower(this.features.batteryPower * absoluteDrain * World.Star.kStarToShipDrainProportion);
            this.features.changeBatteryPower(-this.features.batteryPower * absoluteDrain);

            gravity.features.changeEnginePower(this.features.enginePower * absoluteDrain * World.Star.kStarToShipDrainProportion);
            this.features.changeEnginePower(-this.features.enginePower * absoluteDrain);
        }
    }
});

World.Star.maxFeaturesSum = 1.0;
World.Star.maxRadius = 20;
World.Star.drainRadiusPerWeight = .8;
World.Star.kDrain = .1;
World.Star.kStarToShipDrainProportion = .03;
World.Star.kBatteryPower = 3;
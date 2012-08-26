World.Star = Class.extend({
	x        : null,  // absolute
	y        : null,  // absolute
	radius   : null,
	blur     : 0,

    features    : null, // World.Features

    init:function(screenX, screenY, features)
    {
        this.x = screenX + Util.random(World.screenSize);
        this.y = screenY + Util.random(World.screenSize);

        this.radius = Util.random(World.starMaxRadius * 3/4) + 1/4 * World.starMaxRadius;
        this.blur = Util.random(Math.PI);
        this.features = features;
    },

	getWeight: function()
	{
		return this.radius * this.radius;
	},

    calculateGravity : function(x, y, batteryPower, ddt, gravity)
    {
		this.blur += .05 * ddt;
        var s = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        if (s < this.radius)
		{
            gravity.isExploded = true;
			return;
		}
		
        var acceleration = World.kGravity * this.getWeight() / (s * s);
        gravity.accelerationX += acceleration * (this.x - x) / s;
        gravity.accelerationY += acceleration * (this.y - y) / s;

        if (s <= World.starMaxRadius * 7) {
            var absoluteDrain = ddt * World.kStarDrain * Math.max(0, 1 - s / (World.drainRadiusPerWeight * this.getWeight()));
            gravity.features.changeFuel(this.features.fuel * absoluteDrain * World.kStarToShipDrainProportion * (1 + batteryPower) * World.kBatteryPower);
            this.features.changeFuel(-this.features.fuel * absoluteDrain);

            gravity.features.changeBatteryPower(this.features.batteryPower * absoluteDrain * World.kStarToShipDrainProportion);
            this.features.changeBatteryPower(-this.features.batteryPower * absoluteDrain);

            gravity.features.changeEnginePower(this.features.enginePower * absoluteDrain * World.kStarToShipDrainProportion);
            this.features.changeEnginePower(-this.features.enginePower * absoluteDrain);
        }
    }
});

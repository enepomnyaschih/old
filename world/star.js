World.Star = Class.extend({
	x        : null,  // absolute
	y        : null,  // absolute
	radius   : null,
	blur     : 0,

    features    : null, // World.Features

    init:function(screenX, screenY, features)
    {
        this.x = screenX + Util.random(Level.current.screenSize);
        this.y = screenY + Util.random(Level.current.screenSize);

        this.radius = Util.random(Level.current.starMaxRadius  * 3/4) + 1/4 * Level.current.starMaxRadius ;
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
		
        var acceleration = Level.current.kGravity * this.getWeight() / (s * s);
        gravity.accelerationX += acceleration * (this.x - x) / s;
        gravity.accelerationY += acceleration * (this.y - y) / s;

        if (s <= Level.current.starMaxRadius  * 7) {
            var absoluteDrain = ddt * Level.current.kStarDrain * Math.max(0, 1 - s / (Level.current.drainRadiusPerWeight * this.getWeight()));
            gravity.features.changeFuel(this.features.fuel * absoluteDrain * Level.current.kStarToShipDrainProportion * (1 + batteryPower) * Level.current.kBatteryPower);
            this.features.changeFuel(-this.features.fuel * absoluteDrain);

            gravity.features.changeBatteryPower(this.features.batteryPower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeBatteryPower(-this.features.batteryPower * absoluteDrain);

            gravity.features.changeEnginePower(this.features.enginePower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeEnginePower(-this.features.enginePower * absoluteDrain);
        }
    }
});

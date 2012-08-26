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

    calculateGravity : function(ship, ddt, gravity)
    {
        var x = ship.x;
        var y = ship.y;
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
            var angleStar = Math.atan2(this.y - y, this.x - x);
            var dAngleStar = Math.asin(this.radius / s);
            var angleStar1 = JW.mod(angleStar - dAngleStar, Math.PI * 2);
            var angleStar2 = JW.mod(angleStar + dAngleStar, Math.PI * 2);

            var angleShip1 = JW.mod(ship.angle - ship.getRayAngle(), Math.PI * 2);
            var angleShip2 = JW.mod(ship.angle + ship.getRayAngle(), Math.PI * 2);

            if (Math.abs(angleStar - ship.angle) < ship.getRayAngle() ||
                Math.abs(Math.PI * 2 + angleStar - ship.angle) < ship.getRayAngle() ||
                Math.abs(-Math.PI * 2 + angleStar - ship.angle) < ship.getRayAngle()
                )
            {
                if  (angleStar1 < angleShip1 && angleStar2 > angleShip1)
                    angleStar1 = angleShip1;
                if  (angleStar2 > angleShip2 && angleStar1 < angleShip2)
                    angleStar2 = angleShip2;
            }

            var drainingStar = new World.DrainingStar(angleStar1, angleStar2, s, this);
            var realStarAngle = 0;
            if (angleStar2 > angleStar1)
                realStarAngle = angleStar2 - angleStar1;
            else
                realStarAngle = Math.PI * 2 + angleStar2 - angleStar1;

            //var absoluteDrain = ddt * Level.current.kStarDrain * Math.max(0, 1 - s / (Level.current.drainRadiusPerWeight * this.getWeight()));
            var absoluteDrain = ddt * Level.current.kStarDrain * realStarAngle;
            gravity.features.changeFuel(this.features.fuel * absoluteDrain * Level.current.kStarToShipDrainProportion * (1 + ship.features.batteryPower) * Level.current.kBatteryPower);
            this.features.changeFuel(-this.features.fuel * absoluteDrain);

            gravity.features.changeBatteryPower(this.features.batteryPower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeBatteryPower(-this.features.batteryPower * absoluteDrain);

            gravity.features.changeEnginePower(this.features.enginePower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeEnginePower(-this.features.enginePower * absoluteDrain);
        }
    }
});

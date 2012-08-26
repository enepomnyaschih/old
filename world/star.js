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

    calculateInteraction : function(ship, interaction) {
        var x = ship.x;
        var y = ship.y;
        this.blur += .05 * Level.current.dt;
        var s = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        if (s < this.radius)
        {
            interaction.isExploded = true;
            return;
        }

        if (s <= Level.current.starMaxRadius  * 7) {
            var angleStar = JW.mod(Math.atan2(this.y - y, this.x - x), Math.PI * 2);
            var dAngleStar = Math.asin(this.radius / s);
            var angleStar1 = JW.mod(angleStar - dAngleStar, Math.PI * 2);
            var angleStar2 = JW.mod(angleStar + dAngleStar, Math.PI * 2);

            var angleShip1 = JW.mod(ship.angle - ship.getRayAngle(), Math.PI * 2);
            var angleShip2 = JW.mod(ship.angle + ship.getRayAngle(), Math.PI * 2);

            var resultAngles = [];
            var result1 = Util.intersectionLength(angleShip1, angleShip2, angleStar1, angleStar2);
            if (result1 != null)
                resultAngles.push(result1);
            var result2 = Util.intersectionLength(2 * Math.PI + angleShip1, 2 * Math.PI + angleShip2, angleStar1, angleStar2);
            if (result2 != null)
                resultAngles.push(result2);
            var result3 = Util.intersectionLength(-2 * Math.PI + angleShip1, -2 * Math.PI + angleShip2, angleStar1, angleStar2);
            if (result3 != null)
                resultAngles.push(result3);

            var sumStarAngle = 0;
            for (var i = 0; i < resultAngles.length; i++) {
                sumStarAngle += (resultAngles[i][1] - resultAngles[i][0]);
            }

            var drainingStar = new World.DrainingStar(resultAngles, s, this);
            interaction.drainingStars.push(drainingStar);
            //var absoluteDrain = ddt * Level.current.kStarDrain * Math.max(0, 1 - s / (Level.current.drainRadiusPerWeight * this.getWeight()));
            var absoluteDrain = Level.current.dt * Level.current.kStarDrain * sumStarAngle;
            interaction.features.changeFuel(this.features.fuel * absoluteDrain * Level.current.kStarToShipDrainProportion * (1 + ship.features.batteryPower) * Level.current.kBatteryPower);
            this.features.changeFuel(-this.features.fuel * absoluteDrain);

            interaction.features.changeBatteryPower(this.features.batteryPower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeBatteryPower(-this.features.batteryPower * absoluteDrain);

            interaction.features.changeEnginePower(this.features.enginePower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeEnginePower(-this.features.enginePower * absoluteDrain);
        }
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
            var angleStar = JW.mod(Math.atan2(this.y - y, this.x - x), Math.PI * 2);
            var dAngleStar = Math.asin(this.radius / s);
            var angleStar1 = JW.mod(angleStar - dAngleStar, Math.PI * 2);
            var angleStar2 = JW.mod(angleStar + dAngleStar, Math.PI * 2);

            var angleShip1 = JW.mod(ship.angle - ship.getRayAngle(), Math.PI * 2);
            var angleShip2 = JW.mod(ship.angle + ship.getRayAngle(), Math.PI * 2);

            var resultAngles = [];
            var result1 = Util.intersectionLength(angleShip1, angleShip2, angleStar1, angleStar2);
            if (result1 != null)
                resultAngles.push(result1);
            var result2 = Util.intersectionLength(2 * Math.PI + angleShip1, 2 * Math.PI + angleShip2, angleStar1, angleStar2);
            if (result2 != null)
                resultAngles.push(result2);
            var result3 = Util.intersectionLength(-2 * Math.PI + angleShip1, -2 * Math.PI + angleShip2, angleStar1, angleStar2);
            if (result3 != null)
                resultAngles.push(result3);

            var sumStarAngle = 0;
            for (var i = 0; i < resultAngles.length; i++) {
                sumStarAngle += (resultAngles[i][1] - resultAngles[i][0]);
            }

            var drainingStar = new World.DrainingStar(resultAngles, s, this);
            gravity.drainingStars.push(drainingStar);
            //var absoluteDrain = ddt * Level.current.kStarDrain * Math.max(0, 1 - s / (Level.current.drainRadiusPerWeight * this.getWeight()));
            var absoluteDrain = ddt * Level.current.kStarDrain * sumStarAngle;
            gravity.features.changeFuel(this.features.fuel * absoluteDrain * Level.current.kStarToShipDrainProportion * (1 + ship.features.batteryPower) * Level.current.kBatteryPower);
            this.features.changeFuel(-this.features.fuel * absoluteDrain);

            gravity.features.changeBatteryPower(this.features.batteryPower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeBatteryPower(-this.features.batteryPower * absoluteDrain);

            gravity.features.changeEnginePower(this.features.enginePower * absoluteDrain * Level.current.kStarToShipDrainProportion);
            this.features.changeEnginePower(-this.features.enginePower * absoluteDrain);
        }
    }
});

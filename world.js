var World = Class.extend({
	ship    : null,  // Ship
	screens : null,  // Map from col to Map from row to Screen
	trails  : null,  // Array of World.Trail
	smokes  : null,  // Array of World.Smoke
	screenAmount : 0,
    mode         : null,
    createdModes : null,

	init: function()
	{
		this.ship = new World.Ship();
		this.screens = {};
		this.trails = [];
		this.smokes = [];
        this.mode = new Modes.BlueMode();
        this.createdModes = {
            blue       : true,
            general    : false,
            cleanColor : false
        }
		this.generateScreens(this.ship.x, this.ship.y);
	},
	
    generateScreens : function (x, y)
    {
        var screenCol = Math.floor(x / World.screenSize);
        var screenRow = Math.floor(y / World.screenSize);

        this.eachScreenIndex(screenCol, screenRow, function(col, row)
        {
            this.generateScreen(col, row);
        });
    },

    generateScreen : function (screenCol, screenRow)
    {
        if (this.screens[screenCol] == null)
        {
            this.screens[screenCol] = {};
        }

        if (this.screens[screenCol][screenRow] == null)
        {
            this.checkMode();

            this.screens[screenCol][screenRow] = this.mode.generateScreen(screenCol, screenRow);
            this.screenAmount++;
        }
    },

    checkMode : function ()
    {
        if(this.screenAmount <= 9)
        {
            return;
        }
        if(this.screenAmount > 9)
        {
            if(!this.createdModes.general)
            {
                this.mode = new Modes.GeneralMode();
                this.createdModes.general = true;
            }
        }
        else if(false)
        {
        }
    },

    generateNextState : function()
    {
		if (this.ship.deadTime)
		{
			++this.ship.deadTime;
			this.ship.x += this.ship.speedX;
			this.ship.y += this.ship.speedY;
            this.generateScreens(this.ship.x, this.ship.y);
		}
		
		this.moveShip();
		
		this.trails = this.trails.filter(function(trail) { return ++trail.time <= World.trailLifeTime; });
		this.smokes = this.smokes.filter(function(smoke) { return ++smoke.time <= World.Smoke.lifeTime; });
	},
	
	moveShip: function()
	{
        var ship = this.ship;
		if (ship.deadTime)
			return;
		
        var x = ship.x;
        var y = ship.y;

        var speedX = ship.speedX;
        var speedY = ship.speedY;

        var ddt = World.dt / 100;
        var gravity = new World.Gravity();

        for (var i = 0; i < World.dt; i+=ddt) {
        // calculate gravity
            this.generateScreens(x, y);

            var screenCol = Math.floor(x / World.screenSize);
            var screenRow = Math.floor(y / World.screenSize);

            this.eachScreenIndex(screenCol, screenRow, function(col, row)
            {
                this.screens[col][row].calculateGravity(x, y, ship.features.batteryPower, ddt, gravity);
            });

            speedX += gravity.accelerationX * ddt;
            speedY += gravity.accelerationY * ddt;

            x += speedX * ddt;
            y += speedY * ddt;
        }
        this.generateScreens(x, y);
        ship.x = x;
        ship.y = y;


        var dSpeed = 0;
        var realEnginePower = ship.features.enginePower + World.minimumEnginePower;
		var dFuel = realEnginePower * World.dFuel;

        if (ship.engineLeft) {
            ship.angle += World.dt * realEnginePower * World.kRotate;
        }
        if (ship.engineRight) {
            ship.angle -= World.dt * realEnginePower * World.kRotate;
        }

        if (ship.features.fuel > 0 && ship.engineUp) {
            ship.features.changeFuel(-dFuel);
            dSpeed += World.dt * realEnginePower * World.kEnginePower;
			this.createSmokes(false);
        }
        if (ship.features.fuel > 0 && ship.engineDown) {
            ship.features.changeFuel(-dFuel);
            dSpeed -= World.dt * realEnginePower * World.kEnginePower;
			this.createSmokes(true);
        }

        speedX += dSpeed * Math.cos(ship.angle) * World.dt;
        speedY += dSpeed * Math.sin(ship.angle) * World.dt;

        ship.speedX = speedX;
        ship.speedY = speedY;

        ship.features.changeFuel(gravity.features.fuel);
        ship.features.changeBatteryPower(gravity.features.batteryPower);
        ship.features.changeEnginePower(gravity.features.enginePower);

        ship.speedX += dSpeed * Math.cos(ship.angle) + gravity.accelerationX;
        ship.speedY += dSpeed * Math.sin(ship.angle) + gravity.accelerationY;

        var speedModule = Math.sqrt((Math.pow(ship.speedX, 2) + Math.pow(ship.speedY, 2)));
        if (speedModule > World.maxSpeed) {
            ship.speedX = World.maxSpeed * ship.speedX / speedModule;
            ship.speedY = World.maxSpeed * ship.speedY / speedModule;
        }

        if (gravity.isExploded) {
            ship.deadTime = 1;
			ship.deadX = ship.x;
			ship.deadY = ship.y;
			
			var s = Math.sqrt(ship.speedX * ship.speedX + ship.speedY * ship.speedY);
			ship.speedX /= s;
			ship.speedY /= s;
        }

        // check if the ship is a winner.
        if (ship.features.fuel == 1 && ship.features.enginePower == 1 && ship.features.batteryPower == 1)
            ship.isWinner = true;

		this.trails.push(new World.Trail(this.ship.x, this.ship.y));
    },
	
	createSmokes: function(back)
	{
		var smokes = this.ship.createSmokes(back);
		this.smokes.pushAll(smokes);
	},
	
	eachScreen: function(col, row, callback, scope)
	{
        for (var c = col - 1; c <= col + 1; ++c)
    		for (var r = row - 1; r <= row + 1; ++r)
				callback.call(scope || this, this.screens[c][r]);
	},

    eachScreenIndex: function(col, row, callback, scope)
    {
        for (var c = col - 1; c <= col + 1; ++c)
            for (var r = row -1; r <= row + 1; ++r)
                callback.call(scope || this, c, r);
    }
});

World.dt = 1;
World.kEnginePower = .2;
World.kRotate = .2;
World.kGravity = .05;
World.minimumEnginePower = .25;
World.dFuel = .02;
World.maxSpeed = 15;
World.starMaxRadius = 20;
World.drainRadiusPerWeight = .8;
World.kStarDrain = .1;
World.kStarToShipDrainProportion = .03;
World.kBatteryPower = 3;
World.trailLifeTime = 80;
World.screenSize = 600;
World.starInScreenAmount = 6;
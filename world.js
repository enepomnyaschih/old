var World = Class.extend({
	ship    : null,  // Ship
	screens : null,  // Map from col to Map from row to Screen
	trails  : null,  // Array of World.Trail
	smokes  : null,  // Array of World.Smoke
	screenAmount : 0,
    mode         : null,
    createdModes : null,
    lastInteraction  : null,
    monster         : null,

	init: function()
	{
		this.ship = new World.Ship();
		this.screens = {};
		this.trails = [];
		this.smokes = [];
        //this.mode = new Modes.BlueMode(2);
        this.mode = new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, new World.Features(1, 0, 1));
        this.createdModes = {
            blue       : true,
            general    : false,
            cleanColor : false
        }
		this.generateScreens(this.ship.x, this.ship.y);
	},
	
    generateScreens : function (x, y)
    {
        var screenCol = Math.floor(x / Level.current.screenSize);
        var screenRow = Math.floor(y / Level.current.screenSize);

        this.eachScreenIndex(screenCol, screenRow, function(col, row)
        {
            this.generateScreen(col, row, x, y);
        });
    },

    generateScreen : function (screenCol, screenRow, shipX, shipY)
    {
        if (this.screens[screenCol] == null)
        {
            this.screens[screenCol] = {};
        }

        if (this.screens[screenCol][screenRow] == null)
        {
            this.checkMode();

            this.screens[screenCol][screenRow] = this.mode.generateScreen(screenCol, screenRow, shipX, shipY);
            this.screenAmount++;
        }
    },

    checkMode : function ()
    {
        this.mode = Level.current.getCurrentMode(this.screenAmount);
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

        if(this.ship.isWinner)
        {
            this.ship.x += this.ship.speedX;
            this.ship.y += this.ship.speedY;
            this.generateScreens(this.ship.x, this.ship.y);            
        }

        this.moveShip();
		
		this.trails = this.trails.filter(function(trail) { return ++trail.time <= Level.current.trailLifeTime; });
		this.smokes = this.smokes.filter(function(smoke) { return ++smoke.time <= World.Smoke.lifeTime; });
	},
	
	moveShip: function()
	{
        var ship = this.ship;
		if (ship.deadTime || ship.isWinner)
			return;
		
        var x = ship.x;
        var y = ship.y;

        var speedX = ship.speedX;
        var speedY = ship.speedY;

        var ddt = Level.current.dt / 100;
        var gravity = new World.Gravity();

        for (var i = 0; i < Level.current.dt; i+=ddt) {
        // calculate gravity
            this.generateScreens(x, y);

            var screenCol = Math.floor(x / Level.current.screenSize);
            var screenRow = Math.floor(y / Level.current.screenSize);

            this.eachScreenIndex(screenCol, screenRow, function(col, row)
            {
                this.screens[col][row].calculateGravity(ship, ddt, gravity);
            });

            speedX += gravity.accelerationX * ddt;
            speedY += gravity.accelerationY * ddt;

            x += speedX * ddt;
            y += speedY * ddt;
        }
        this.generateScreens(x, y);

        var screenCol = Math.floor(x / Level.current.screenSize);
        var screenRow = Math.floor(y / Level.current.screenSize);

        ship.x = x;
        ship.y = y;

        var interaction = new World.StarsShipInteraction();
        this.eachScreenIndex(screenCol, screenRow, function(col, row)
        {
            this.screens[col][row].calculateInteraction(ship, interaction);
        });


        var dSpeed = 0;
        var realEnginePower = ship.features.enginePower + Level.current.minimumEnginePower;
		var dFuel = realEnginePower * Level.current.dFuel;

        if (ship.engineLeft) {
            ship.angle += Level.current.dt * realEnginePower * Level.current.kRotate;
        }
        if (ship.engineRight) {
            ship.angle -= Level.current.dt * realEnginePower * Level.current.kRotate;
        }

        if (ship.features.fuel > 0 && ship.engineUp && !ship.engineDown) {
            ship.features.changeFuel(-dFuel);
            dSpeed += Level.current.dt * realEnginePower * Level.current.kEnginePower;
			this.createSmokes(false);
			tracks.engine.play();
        }
        if (ship.features.fuel > 0 && ship.engineDown && !ship.engineUp) {
            ship.features.changeFuel(-dFuel);
            dSpeed -= Level.current.dt * realEnginePower * Level.current.kEnginePower;
			this.createSmokes(true);
			tracks.engine.play();
        }

        speedX += dSpeed * Math.cos(ship.angle) * Level.current.dt;
        speedY += dSpeed * Math.sin(ship.angle) * Level.current.dt;

        ship.speedX = speedX;
        ship.speedY = speedY;

        ship.features.changeFuel(interaction.features.fuel);
        ship.features.changeBatteryPower(interaction.features.batteryPower);
        ship.features.changeEnginePower(interaction.features.enginePower);

        ship.speedX += dSpeed * Math.cos(ship.angle) + gravity.accelerationX;
        ship.speedY += dSpeed * Math.sin(ship.angle) + gravity.accelerationY;

        var speedModule = Math.sqrt((Math.pow(ship.speedX, 2) + Math.pow(ship.speedY, 2)));
        if (speedModule > World.maxSpeed) {
            ship.speedX = Level.current.maxSpeed * ship.speedX / speedModule;
            ship.speedY = Level.current.maxSpeed * ship.speedY / speedModule;
        }

        if (this.monster == null && this.ship.features.enginePower > 0.7 && this.ship.features.batteryPower > 0.7) {
            this.monster = new World.Monster(this.ship.x - 1000, this.ship.y);
        }


        if (this.monster != null)
            this.monster.move(this.ship);

        if (interaction.isExploded || ship.isEaten) {
            ship.deadTime = 1;
			ship.deadX = ship.x;
			ship.deadY = ship.y;
			
			var s = Math.sqrt(ship.speedX * ship.speedX + ship.speedY * ship.speedY);
			ship.speedX /= s;
			ship.speedY /= s;
			
			tracks.exp.play();
        }

        this.lastInteraction = interaction;
		
		if (interaction.drainingStars.length)
			tracks.drain.play();

        // check if the ship is a winner.
        if (ship.features.fuel >= 1 
            && ship.features.batteryPower >= 1 
            && ship.features.enginePower >= 1)
        {
            ship.isWinner = true;
            ship.speedX = 100;
            ship.speedY = 0;
            ship.angle = 0;
        }

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

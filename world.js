﻿var World = Class.extend({
	ship    : null,  // Ship
	screens : null,  // Map from col to Map from row to Screen
	trails  : null,  // Array of World.Trail
	
	init: function()
	{
		this.ship = new World.Ship();
		this.screens = {};
		this.trails = [];
		this.generateScreens(this.ship.x, this.ship.y);
	},
	
    generateScreens : function (x, y) {

        //console.log("koords" + x + " " + y);

        var screenCol = Math.floor(x / World.Screen.size);
        var screenRow = Math.floor(y / World.Screen.size);

        //console.log("col&row" + screenCol + " " + screenRow);

        this.generateScreen(screenCol, screenRow);
        this.generateScreen(screenCol, screenRow - 1);
        this.generateScreen(screenCol, screenRow + 1);
        this.generateScreen(screenCol - 1, screenRow);
        this.generateScreen(screenCol - 1, screenRow - 1);
        this.generateScreen(screenCol - 1, screenRow + 1);
        this.generateScreen(screenCol + 1, screenRow);
        this.generateScreen(screenCol + 1, screenRow - 1);
        this.generateScreen(screenCol + 1, screenRow + 1);
    },

    generateScreen : function (screenCol, screenRow) {
        if (this.screens[screenCol] == null)
            this.screens[screenCol] = {};

        if (this.screens[screenCol][screenRow] == null)
            this.screens[screenCol][screenRow] = new World.Screen(screenCol, screenRow);
        else
            return;

    },

    generateNextState : function()
    {
		if (this.ship.deadTime)
			++this.ship.deadTime;
		
		this.moveShip();
		
		this.trails = this.trails.filter(function(trail) { return ++trail.time <= World.Trail.lifeTime; });
		this.trails.push(new World.Trail(this.ship.x, this.ship.y));
	},
	
	moveShip: function()
	{
        var ship = this.ship;
		if (ship.deadTime)
			return;
		
        var x = ship.x;
        var y = ship.y;

        // calculate gravity
        var accelerationX = 0;
        var accelerationY = 0;

        var screenCol = Math.floor(x / World.Screen.size);
        var screenRow = Math.floor(y / World.Screen.size);

        var gravity = new World.Gravity();
        this.screens[screenCol][screenRow].calculateGravity(x, y, gravity);
        this.screens[screenCol][screenRow - 1].calculateGravity(x, y, gravity);
        this.screens[screenCol][screenRow + 1].calculateGravity(x, y, gravity);
        this.screens[screenCol - 1][screenRow].calculateGravity(x, y, gravity);
        this.screens[screenCol - 1][screenRow - 1].calculateGravity(x, y, gravity);
        this.screens[screenCol - 1][screenRow + 1].calculateGravity(x, y, gravity);
        this.screens[screenCol + 1][screenRow].calculateGravity(x, y, gravity);
        this.screens[screenCol + 1][screenRow - 1].calculateGravity(x, y, gravity);
        this.screens[screenCol + 1][screenRow + 1].calculateGravity(x, y, gravity);

        var dSpeed = 0;
        var realEnginePower = ship.enginePower + World.minimumEnginePower;

        if (ship.engineLeft) {
            ship.angle += World.dt * realEnginePower * World.kRotate;
        }
        if (ship.engineRight) {
            ship.angle -= World.dt * realEnginePower * World.kRotate;
        }

        if (ship.engineUp) {
            dSpeed += World.dt * realEnginePower * World.kEnginePower;
        }
        if (ship.engineDown) {
            dSpeed -= World.dt * realEnginePower * World.kEnginePower;
        }

        ship.x = ship.x + ship.speedX * World.dt;
        ship.y = ship.y + ship.speedY * World.dt;

        if (gravity.isExploded) {
            ship.deadTime = 1;
        }
		
        ship.speedX += dSpeed * Math.cos(ship.angle) + gravity.accelerationX;
        ship.speedY += dSpeed * Math.sin(ship.angle) + gravity.accelerationY;

        this.generateScreens(ship.x, ship.y);
    }
});

World.dt = 1;

World.kEnginePower = 1;

World.kRotate = .1;

World.kGravity = .05;

World.minimumEnginePower = .05;

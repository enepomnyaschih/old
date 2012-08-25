﻿var World = Class.extend({
	ship    : null,  // Ship
	screens : null,   // Map from col to Map from row to Screen
	
	init: function()
	{
		this.ship = new World.Ship();
		this.screens = {};
		this.generateScreens(this.ship.x, this.ship.y);
	},
	
    generateScreens : function (x, y) {
        var screenCol = Math.floor(x / World.Screen.size);
        var screenRow = Math.floor(y / World.Screen.size);

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
        ship.x = ship.x + ship.speedX * this.dt;
        ship.y = ship.y + ship.speedY * this.dt;
        generateScreens(ship.x, ship.y);
    }
});

World.dt = 1;


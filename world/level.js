var Level = JW.Config.extend({
	index : 0,
	description : null, // Array of String
    dt : 1,
    kEnginePower : .2,
    kRotate : .2,
    kGravity : .05,
    minimumEnginePower : .25,
    dFuel : .02,
    maxSpeed : 15,
    starMaxRadius : 20,
    drainRadiusPerWeight : .8,
    kStarDrain : .1,
    kStarToShipDrainProportion : .03,
    kBatteryPower : 3,
    trailLifeTime : 80,
    screenSize : 600,
    starInScreenAmount : 0,
    modes : null, //modes properties;
	
	init: function(config, index)
	{
		this._super(config);
		this.index = index;
        this.starInScreenAmount = Level.starInScreenAmount;
	},
	
    getCurrentMode : function (screensAmount)
    {
        var currentMode = this.modes[0][1];
        var modesNumber = this.modes.length;
        for(var i = 0;  i < modesNumber; ++i)
        {
            if(this.modes[i][0] <= screensAmount)
            {
                currentMode = this.modes[i][1];
            }
        }

        return currentMode;
    }
});

Level.starInScreenAmount = 4;

Level.levels = [
	{
		description : [
			"Fly closely to the stars and",
			"consume their power to improve",
			"your starship. Save energy"
		],
		modes : [
			[0,  new Modes.BlueMode(2)],
			[9,  new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 0, 0], 2) ],
			[15, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [0, 1, 0], 2 ) ],
			[20, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [0, 1, 1], 3 ) ],
			[25, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 0, 1], 3 ) ],
			[30, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 1, 0], 4 ) ],
			[35, new Modes.CleanColorMode(Modes.CleanColorMode.typeAllColors, [1, 1, 1], 6 ) ],
			[50, new Modes.GeneralMode(8) ]
		],
		kStarToShipDrainProportion : 3
	},
	{
		description : [
			"Stars are shining colder"
		],
		modes : [
			[0,  new Modes.BlueMode(2)],
			[9,  new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 0, 0], 2) ],
			[15, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [0, 1, 0], 2 ) ],
			[20, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [0, 1, 1], 3 ) ],
			[25, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 0, 1], 3 ) ],
			[30, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 1, 0], 4 ) ],
			[35, new Modes.CleanColorMode(Modes.CleanColorMode.typeAllColors, [1, 1, 1], 6 ) ],
			[50, new Modes.GeneralMode(8) ]
		],
		kStarToShipDrainProportion : 1
	},
	{
		description : [
			"New galaxy brings new pain"
		],
		modes : [
			[0, new Modes.CleanColorMode(Modes.CleanColorMode.typeAllColors, [1, 1, 1], 4 ) ],
			[9, new Modes.CleanColorMode(Modes.CleanColorMode.typeAllColors, [1, 1, 1], 6 ) ],
			[20, new Modes.CleanColorMode(Modes.CleanColorMode.typeAllColors, [1, 1, 1], 10 ) ],
			[30, new Modes.GeneralMode(10) ]
		],
		kStarToShipDrainProportion : .75
	},
	{
		description : [
			"Your destiny is eternal",
			"search of the Homeworld"
		],
		modes : [[0, new Modes.GeneralMode(12) ]],
		kStarToShipDrainProportion : .6
	}
];

Level.getLevel = function(index) {
	return new Level(Level.levels[Math.min(index, Level.levels.length - 1)], index);
}

Level.getFirstLevel = function()
{
	var level = parseInt($.cookie("level"));
	return (isNaN(level) || level < 0) ? 0 : level;
}

Level.current = Level.getLevel(Level.getFirstLevel());

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
    starInScreenAmount : 4,
	
	init: function(config, index)
	{
		this._super(config);
		this.index = index;
	}
});

Level.levels = [
	{
		description : [
			"Fly closely to the stars and",
			"consume their power to improve",
			"your starship. Save energy"
		],
		kStarToShipDrainProportion : .2
	},
	{
		description : [
			"Stars are shining colder"
		],
		kStarToShipDrainProportion : .1
	},
	{
		description : [
			"New galaxy brings new pain"
		],
		kStarToShipDrainProportion : .05
	},
	{
		description : [
			"Your destiny is eternal",
			"search of the Homeworld"
		],
		kStarToShipDrainProportion : .025
	}
];

Level.getLevel = function(index) {
	return new Level(Level.levels[Math.min(index, Level.levels.length - 1)], index);
}

Level.current = Level.getLevel(0);

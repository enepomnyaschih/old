var Level = Class.extend({
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

    init : function(kStarToShipDrainProportion, modes) {
        this.kStarToShipDrainProportion = kStarToShipDrainProportion;
        this.modes = modes;
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
    new Level(.4, [
        [0,  new Modes.BlueMode(2)],
        [9,  new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 0, 0], 2) ],
        [15, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [0, 1, 0], 2 ) ],
        [20, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [0, 1, 1], 3 ) ],
        [25, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 0, 1], 3 ) ],
        [30, new Modes.CleanColorMode(Modes.CleanColorMode.typeOneColor, [1, 1, 0], 4 ) ],
        [35, new Modes.CleanColorMode(Modes.CleanColorMode.typeAllColors, [1, 1, 1], 6 ) ],
        [50, new Modes.GeneralMode(8) ]
        ]),

    new Level(.1,    [[0, new Modes.GeneralMode(Level.starInScreenAmount) ]] ),
    new Level(.05,   [[0, new Modes.GeneralMode(Level.starInScreenAmount) ]] ),
    new Level(.025,  [[0, new Modes.GeneralMode(Level.starInScreenAmount) ]] )
];

Level.current = Level.levels[0];
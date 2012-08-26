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
    starInScreenAmount : 4,

    init : function(kStarToShipDrainProportion) {
        this.kStarToShipDrainProportion = kStarToShipDrainProportion;
    }
});

Level.levels = [new Level(.2), new Level(.1), new Level(.05), new Level(.025)];

Level.current = Level.levels[0];
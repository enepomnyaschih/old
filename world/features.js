World.Features = Class.extend({
    enginePower : 0,  // 0-1
    batteryPower : 0,  // 0-1
    fuel        : 0,  // 0-1

    init : function(enginePower,  batteryPower, fuel)
    {
        this.fuel = fuel;
        this.enginePower = enginePower;
        this.batteryPower = batteryPower;
    },

    changeFuel : function(d)
    {
        this.fuel += d;
        if (this.fuel > 1)
            this.fuel = 1;
        if (this.fuel < 0)
            this.fuel = 0;
    },

    changeEnginePower : function(d)
    {
        this.enginePower += d;
        if (this.enginePower > 1)
            this.enginePower = 1;
        if (this.enginePower < 0)
            this.enginePower = 0;
    },

    changeBatteryPower : function(d)
    {
        this.batteryPower += d;
        if (this.batteryPower > 1)
            this.batteryPower = 1;
        if (this.batteryPower < 0)
            this.batteryPower = 0;
    },

    iterate : function (handler)
    {
        handler("enginePower");
        handler("batteryPower");
        handler("fuel");
    },
	
	getMax: function()
	{
		return Math.max(this.enginePower, this.batteryPower, this.fuel);
	}
});
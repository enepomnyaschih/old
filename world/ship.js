World.Ship = Class.extend({
	x           : 0,
	y           : 0,
	speedX      : 0,
	speedY      : 0,
	angle       : 0,
	enginePower : 0,  // 0-1
	batteryPower : 0,  // 0-1
	fuel        : 0,  // 0-1

    engineUp    : false, // modify according user's control
    engineDown  : false, // modify according user's control
    engineLeft  : false, // modify according user's control
    engineRight : false, // modify according user's control
	
	getScreenCol: function()
	{
		return Math.floor(this.x / World.Screen.size);
	},
	
	getScreenRow: function()
	{
		return Math.floor(this.x / World.Screen.size);
	}
});

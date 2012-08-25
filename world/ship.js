World.Ship = Class.extend({
	x           : 0,
	y           : 0,
	speedX      : 0,
	speedY      : 0,
	angle       : 0,
	enginePower : 0,  // 0-1
	bateryPower : 0,  // 0-1
	fuel        : 0,  // 0-1
	
	getScreenCol: function()
	{
		return Math.floor(this.x / World.Screen.size);
	},
	
	getScreenRow: function()
	{
		return Math.floor(this.x / World.Screen.size);
	}
});

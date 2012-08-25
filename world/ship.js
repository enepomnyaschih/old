World.Ship = Class.extend({
	x           : null,
	y           : null,
	speed       : null,
	angle       : null,
	enginePower : null,  // 0-1
	bateryPower : null,  // 0-1
	fuel        : null,  // 0-1
	
	getScreenCol: function()
	{
		return Math.floor(this.x / World.Screen.size);
	},
	
	getScreenRow: function()
	{
		return Math.floor(this.x / World.Screen.size);
	}
});

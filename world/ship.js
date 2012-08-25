World.Ship = Class.extend({
	x           : 0,
	y           : 0,
	speedX      : 0,
	speedY      : 0,
	angle       : 0,
    features    : null, // World.Features
	deadTime    : 0,  // if 0 - alive

    engineUp    : false, // modify according user's control
    engineDown  : false, // modify according user's control
    engineLeft  : false, // modify according user's control
    engineRight : false, // modify according user's control

    init: function() {
        this.features = new World.Features(0,0,1);
    },

	getScreenCol: function()
	{
		return Math.floor(this.x / World.Screen.size);
	},
	
	getScreenRow: function()
	{
		return Math.floor(this.y / World.Screen.size);
	}
});

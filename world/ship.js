World.Ship = Class.extend({
	x           : 0,
	y           : 0,
	speedX      : 0,
	speedY      : 0,
	angle       : 0,
	deadX       : 0,
	deadY       : 0,
    features    : null, // World.Features
	deadTime    : 0,  // if 0 - alive
    isWinner    : false, // no comments

    engineUp    : false, // modify according user's control
    engineDown  : false, // modify according user's control
    engineLeft  : false, // modify according user's control
    engineRight : false, // modify according user's control

    init: function() {
        this.features = new World.Features(0,0,.2);
    },

	getScreenCol: function()
	{
		return Math.floor(this.x / Level.current.screenSize);
	},
	
	getScreenRow: function()
	{
		return Math.floor(this.y / Level.current.screenSize);
	},
	
	createSmokes: function( // Array of World.Smoke
		back)
	{
		var result = [];
		var floatCount = 3 * (Level.current.minimumEnginePower + this.features.enginePower);
		var count = Math.floor(floatCount);
		if (floatCount - count >= Math.random())
			++count;
		
		var engines = this.getEnginesXY();
		
		var angle = (back ? 0 : Math.PI) + this.angle;
		for (var i = 0; i < count; ++i)
		{
			for (var j = 0; j < 2; ++j)
				result.push(new World.Smoke(this.x + engines[j][0], this.y + engines[j][1], angle + 2 * (Math.random() - .5)));
		}
		
		return result;
	},
	
	getEnginesXY: function()
	{
		var dx = Math.cos(this.angle);
		var dy = Math.sin(this.angle);
		
		var v1 = [ -8 * dx, -8 * dy ];
		var v2 = [  6 * dy, -6 * dx ];
		
		return [
			[ v1[0] + v2[0], v1[1] + v2[1] ],
			[ v1[0] - v2[0], v1[1] - v2[1] ]
		];
	}
});

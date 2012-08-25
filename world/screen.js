World.Screen = Class.extend({
	col   : null,
	row   : null,
	stars : null, // Array of Star

    init:function(col, row, screenAmount)
    {
        this.col = col;
        this.row = row;
        this.stars = [];
        var gamePhase = 0;
        if (screenAmount > 9)
            gamePhase = 1;
        var maxStars = Util.random(3/4 * World.Screen.starAmount) + 1/4 * World.Screen.starAmount;
        for (var i = 0; i < maxStars; i++)
        {
            this.stars[i] = new World.Star(this.getX0(), this.getY0(), gamePhase);
        }

    },

	getX0: function()
	{
		return this.col * World.Screen.size;
	},
	
	getY0: function()
	{
		return this.row * World.Screen.size;
	},

    /// calculate gravity from every star in the screen.
    calculateGravity : function(x, y, batteryPower, gravity)
    {
        this.stars.eachByMethod("calculateGravity", [x, y, batteryPower, gravity]);
    }
});

World.Screen.size = 600;
World.Screen.starAmount = 7;

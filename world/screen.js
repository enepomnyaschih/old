World.Screen = Class.extend({
	col   : null,
	row   : null,
	stars : null, // Array of Star

    init:function(col, row, stars)
    {
        this.col = col;
        this.row = row;
        this.stars = stars;
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
World.Screen.starAmount = 6;

World.Screen.getX0Y0 = function (col, row)
{
    return [col * World.Screen.size, row * World.Screen.size];
}


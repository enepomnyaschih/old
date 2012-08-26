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
		return this.col * World.screenSize;
	},
	
	getY0: function()
	{
		return this.row * World.screenSize;
	},

    /// calculate gravity from every star in the screen.
    calculateGravity : function(x, y, batteryPower, ddt, gravity)
    {
        this.stars.eachByMethod("calculateGravity", [x, y, batteryPower, ddt, gravity]);
    }
});

World.Screen.getX0Y0 = function (col, row)
{
    return [col * World.screenSize, row * World.screenSize];
}


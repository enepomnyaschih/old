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
		return this.col * Level.current.screenSize;
	},
	
	getY0: function()
	{
		return this.row * Level.current.screenSize;
	},

    /// calculate gravity from every star in the screen.
    calculateGravity : function(ship, ddt, gravity)
    {
        this.stars.eachByMethod("calculateGravity", [ship, ddt, gravity]);
    },

    calculateInteraction : function(ship, interaction) {
        this.stars.eachByMethod("calculateInteraction", [ship, interaction]);
    }
});

World.Screen.getX0Y0 = function (col, row, shipX, shipY)
{
    return [col * Level.current.screenSize, row * Level.current.screenSize];
}


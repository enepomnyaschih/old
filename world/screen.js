World.Screen = Class.extend({
	col   : null,
	row   : null,
	stars : null, // Array of Star
	
	getX0: function()
	{
		return this.col * World.Screen.size;
	},
	
	getY0: function()
	{
		return this.row * World.Screen.size;
	}
});

World.Screen.size = 600;

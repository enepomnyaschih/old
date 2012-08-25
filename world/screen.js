World.Screen = Class.extend({
	col   : null,
	row   : null,
	stars : null, // Array of Star

    init:function(col, row)
    {
        this.col = col;
        this.row = row;
        this.stars = [];
        var maxStars = Util.random(10);
        for (var i = 0; i < maxStars; i++)
        {
            this.stars[i] = new World.Star();
        }

    },

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

var Application = Class.extend({
	world  : null,  // World
	canvas : null,  // Canvas
	
	init: function()
	{
		this.world = new World();
		this.canvas = new Canvas(this.world);
		
		$("body").append(this.canvas.el);
		$("body").keydown(this._onKeyDown.inScope(this));
		$("body").keyup(this._onKeyUp.inScope(this));
		
		setInterval(this._onTimer.inScope(this), 40);
	},
	
	_onTimer: function()
	{
		this.world.generateNextState();
		this.canvas.draw();
	},
	
	_onKeyDown: function(event)
	{
		switch (event.which)
		{
			case 37: this.world.ship.engineLeft = true; break;
			case 38: this.world.ship.engineUp = true; break;
			case 39: this.world.ship.engineRight = true; break;
			case 40: this.world.ship.engineDown = true; break;
			default: return;
		}
		
		event.preventDefault();
	},
	
	_onKeyUp: function(event)
	{
		switch (event.which)
		{
			case 37: this.world.ship.engineLeft = false; break;
			case 38: this.world.ship.engineUp = false; break;
			case 39: this.world.ship.engineRight = false; break;
			case 40: this.world.ship.engineDown = false; break;
			default: return;
		}
		
		event.preventDefault();
	}
});

var Application = Class.extend({
	world  : null,  // World
	canvas : null,  // Canvas
	timer  : false, // Integer
	nLevel : 0,
	
	init: function()
	{
		this.canvas = new Canvas();
		
		$("body").append(this.canvas.el);
		$("body").keydown(this._onKeyDown.inScope(this));
		$("body").keyup(this._onKeyUp.inScope(this));
		
		this._clickHandler = this._onClick.inScope(this);
		this.canvas.el.bind("click", this._clickHandler);
		
		this.restart();
	},
	
	restart: function()
	{
		this.stop();
		this.world = new World();
		this.canvas.world = this.world;
		this.canvas.draw();
		this.canvas.showStart();
	},
	
	nextLevel: function()
	{
		Level.current = Level.getLevel(Level.current.index + 1);
		$.cookie("level", Level.current.index);
		this.restart();
	},
	
	start: function()
	{
		if (this.world.ship.isWinner)
			return this.nextLevel();
		
		if (this.world.ship.deadTime)
			return this.restart();
		
		if (this.timer)
			return;
		
		this.timer = setInterval(this._onTimer.inScope(this), 40);
	},
	
	stop: function()
	{
		this.canvas.showPaused();
		clearInterval(this.timer);
		delete this.timer;
	},
	
	_onClick: function()
	{
		this.start();
	},
	
	_onTimer: function()
	{
		this.world.generateNextState();
		this.canvas.draw();
	},
	
	_onKeyDown: function(event)
	{
		if (event.which == 32)
		{
			if (this.timer && !this.world.ship.deadTime && !this.world.ship.isWinner)
				this.stop();
			else
				this.start();
			
			event.preventDefault();
			return;
		}
		
		if (!this.world)
			return;
		
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
		if (!this.world)
			return;
		
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

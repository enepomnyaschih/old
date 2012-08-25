var Application = Class.extend({
	world  : null,  // World
	canvas : null,  // Canvas
	
	init: function()
	{
		this.world = new World();
		this.canvas = new Canvas(this.world);
		$("body").append(this.canvas.el);
		
		this.canvas.draw();
		//setInterval(this._onTimer.inScope(this), 40);
	},
	
	_onTimer: function()
	{
		this.canvas.draw();
	}
});

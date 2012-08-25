var Canvas = Class.extend({
	world   : null,  // World
	el      : null,  // jQuery element
	context : null,  // CanvasContext2D
	
	init: function(world)
	{
		this.world = world;
		
		this.el = $('<canvas width="' + World.Screen.size + '" height="' + World.Screen.size + '" />');
		this.context = this.el[0].getContext("2d");
	},
	
	draw: function()
	{
		this.context.fillStyle = "black";
		this.context.fillRect(0, 0, World.Screen.size, World.Screen.size);
		
		this.context.save();
		
		this.context.translate(-this.world.ship.x, -this.world.ship.y);
		this.context.rotate(this.world.ship.angle);
		//this.context.translate(100, 100);//World.Screen.size / 2, World.Screen.size / 2);
		
		var screenCol = this.world.ship.getScreenCol();
		var screenRow = this.world.ship.getScreenRow();
		
		for (var row = screenRow - 1; row <= screenRow + 1; ++row)
		{
			for (var col = screenCol - 1; col <= screenCol + 1; ++col)
				this.drawScreen(this.world.screens[screenCol][screenRow]);
		}
		
		this.context.restore();
	},
	
	drawScreen: function(screen)
	{
		for (var i = 0; i < screen.stars.length; ++i)
			this.drawStar(screen.stars[i]);
	},
	
	drawStar: function(star)
	{
		this.context.fillStyle = JW.Color.str(this.getStarRgb(star));
		this.context.strokeStyle = "gray";
		
		this.context.beginPath();
		this.context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
		this.context.closePath();
		
		this.context.fill();
	},
	
	getStarRgb: function(star)
	{
		var featuresSum = 0;
		for (var i = 0; i < 3; ++i)
			featuresSum += star.features[i];
		
		featuresSum = Math.min(World.Star.maxFeaturesSum, featuresSum);
		
		var featuresMax = Math.max(star.features[0], star.features[1], star.features[2]);
		
		var rgb = [];
		for (var i = 0; i < 3; ++i)
		{
			var minC = 0.5 * (255 - featuresMax * 255);
			rgb.push(Math.max(0, Math.min(255,
				minC + star.features[i] * (255 - minC)
			/*	(star.features[i] * Canvas.starColorCoef[i] +
				featuresSum * Canvas.starFullColor[i] +
				(World.Star.maxFeaturesSum - featuresSum) * Canvas.starEmptyColor[i]) / World.Star.maxFeaturesSum*/
			)));
		}
		
		//console.log(featuresSum, star.features, rgb);
		
		return rgb;
	}
});

Canvas.starFullColor  = [  80,  80,  80 ];
Canvas.starEmptyColor = [ 120, 120, 120 ];
Canvas.starColorCoef  = [ 175, 175, 175 ];

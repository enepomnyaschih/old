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
		
		this.context.translate(World.Screen.size / 2, World.Screen.size / 2);
		this.context.scale(1, -1);
		this.context.rotate(-this.world.ship.angle + Math.PI / 2);
		this.context.translate(-this.world.ship.x, -this.world.ship.y);
		
		this.world.trails.each(this.drawTrail, this);
		
		var screenCol = this.world.ship.getScreenCol();
		var screenRow = this.world.ship.getScreenRow();	
		
		for (var row = screenRow - 1; row <= screenRow + 1; ++row)
		{
			for (var col = screenCol - 1; col <= screenCol + 1; ++col)
				this.drawScreen(this.world.screens[col][row]);
		}
		
		this.drawShip(this.world.ship);
		
		this.context.restore();
		
		this.drawIndicators();
	},
	
	drawTrail: function(trail)
	{
		this.context.save();
		
		this.context.beginPath();
		this.context.arc(trail.x, trail.y, 3, 0, 2 * Math.PI);
		this.context.closePath();
		
		this.context.globalAlpha = trail.getOpacity();
		this.context.fillStyle = "#C1C13E";
		this.context.fill();
		
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
	},
	
	drawShip: function(ship)
	{
		this.context.save();
		
		this.context.translate(ship.x, ship.y);
		this.context.rotate(ship.angle);
		
		if (ship.deadTime)
		{
			var t = ship.deadTime / 20 - 1;
			var radius = 40 * Math.max(0, 1 - t * t);
			var opacity = 1 - ship.deadTime / 40;
			
			this.context.beginPath();
			this.context.arc(0, 0, radius, 0, 2 * Math.PI);
			this.context.closePath();
			
			this.context.fillStyle = "#C1C13E";
			this.context.globalAlpha = opacity;
			this.context.fill();
		}
		else
		{
			this.context.fillStyle = "white";
			
			this.context.beginPath();
			this.context.moveTo( 10,  0);
			this.context.lineTo(-10,  8);
			this.context.lineTo(-10, -8);
			this.context.closePath();
			
			this.context.fill();
		}
		
		this.context.restore();
	},
	
	drawIndicators: function()
	{
		this.drawIndicator("Engine",    this.world.ship.enginePower, "#ff0000",   0);
		this.drawIndicator("Generator", this.world.ship.batteryPower, "#00ff00", 200);
		this.drawIndicator("Energy",    this.world.ship.fuel,        "#0000ff",  400);
	},
	
	drawIndicator: function(label, value, color, x)
	{
		this.context.fillStyle = "#222";
		this.context.fillRect  (x + 100.5, 18.5, 80, 10);
		
		this.context.font = "11pt sans-serif";
		this.context.fillStyle = color;
		this.context.fillText(label, x + 20, 27.5);
		this.context.fillRect(x + 100.5, 18.5, 80 * value, 10);
		
		this.context.strokeStyle = "white";
		this.context.strokeRect(x + 100.5, 18.5, 80, 10);
	}
});

Canvas.starFullColor  = [  80,  80,  80 ];
Canvas.starEmptyColor = [ 120, 120, 120 ];
Canvas.starColorCoef  = [ 175, 175, 175 ];

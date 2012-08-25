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
		
		var screenCol = this.world.ship.getScreenCol();
		var screenRow = this.world.ship.getScreenRow();
		
		this.world.eachScreen(screenCol, screenRow, this.drawBg, this);
		this.world.trails.each(this.drawTrail, this);
		this.world.eachScreen(screenCol, screenRow, this.drawScreenStars, this);
		this.world.smokes.each(this.drawSmoke, this);
		
		if (this.world.ship.deadTime)
			this.drawExplosion(this.world.ship)
		else
			this.drawShip(this.world.ship);
		
		this.context.restore();
		
		this.drawIndicators();
		
		if (this.world.ship.deadTime > 30)
		{
			this.context.font = "20pt sans-serif";
			this.context.textAlign = "center";
			this.drawText("Last hope of humanity", 300, 250, "red");
			this.drawText("has been lost", 300, 280, "red");
			this.drawText("Press Space or click to try again", 300, 340, "red");
		}
	},
	
	drawTrail: function(trail)
	{
		this.context.save();
		
		this.context.beginPath();
		this.context.arc(trail.x, trail.y, 2, 0, 2 * Math.PI);
		this.context.closePath();
		
		this.context.globalAlpha = trail.getOpacity();
		this.context.fillStyle = "#C1C13E";
		this.context.fill();
		
		this.context.restore();
	},
	
	drawSmoke: function(smoke)
	{
		this.context.save();
		
		this.context.beginPath();
		this.context.arc(smoke.getX(), smoke.getY(), 2, 0, 2 * Math.PI);
		this.context.closePath();
		
		this.context.globalAlpha = smoke.getOpacity();
		this.context.fillStyle = JW.Color.str(smoke.getColor());
		this.context.fill();
		
		this.context.restore();
	},
	
	drawBg: function(screen)
	{
		this.context.drawImage(images.bg[0], screen.getX0(), screen.getY0());
	},
	
	drawScreenStars: function(screen)
	{
		for (var i = 0; i < screen.stars.length; ++i)
			this.drawStar(screen.stars[i]);
	},
	
	drawStar: function(star)
	{
		this.context.save();
		
		this.context.translate(star.x, star.y);
		this.context.scale(star.radius, star.radius);
		
		var rgb = this.getFeaturesRgb(star.features, .5);
		
		var featuresMax = Math.max(star.features.fuel, star.features.enginePower, star.features.batteryPower);
		var gradient = this.context.createRadialGradient(0, 0, .5, 0, 0, 1 + .7 * (.5 + .5 * Math.abs(Math.cos(star.blur))) * featuresMax);
		gradient.addColorStop(0, Util.rgbaStr(rgb, 1));
		gradient.addColorStop(1, Util.rgbaStr(rgb, 0));
		
		this.context.beginPath();
		this.context.arc(0, 0, 2, 0, 2 * Math.PI);
		this.context.closePath();
		
		this.context.fillStyle = gradient;
		this.context.fill();
		
		this.context.beginPath();
		this.context.arc(0, 0, 1, 0, 2 * Math.PI);
		this.context.closePath();
		
		this.context.fillStyle = JW.Color.str(rgb);
		this.context.fill();
		
		this.context.restore();
	},
	
	getFeaturesRgb: function(features, coef)
	{
		var featuresMax = Math.max(features.enginePower, features.batteryPower, features.fuel);
		
		var rgb = [];

        features.iterate(function(key)
        {
            var minC = coef * (255 - featuresMax * 255);
            rgb.push(Math.max(0, Math.min(255,
                minC + features[key] * (255 - minC)
            )));
        });
		
		return rgb;
	},
	
	drawExplosion: function(ship)
	{
		this.context.save();
		
		this.context.translate(ship.deadX, ship.deadY);
		
		var t = ship.deadTime / 20 - 1;
		var radius = 40 * Math.max(0, 1 - t * t);
		var opacity = 1 - ship.deadTime / 40;
		
		this.context.beginPath();
		this.context.arc(0, 0, radius, 0, 2 * Math.PI);
		this.context.closePath();
		
		this.context.fillStyle = "#C1C13E";
		this.context.globalAlpha = opacity;
		this.context.fill();
		
		this.context.restore();
	},
	
	drawShip: function(ship)
	{
		this.context.save();
		
		this.context.translate(ship.x, ship.y);
		this.context.rotate(ship.angle);
		
		this.context.fillStyle = JW.Color.str(this.getFeaturesRgb(this.world.ship.features, 0.1));
		
		this.context.beginPath();
		this.context.moveTo( 10,  0);
		this.context.lineTo(-10,  8);
		this.context.lineTo(-10, -8);
		this.context.closePath();
		
		this.context.fill();
		
		this.context.drawImage(images.ship[0], -20, -20);
		
		this.context.restore();
	},
	
	drawIndicators: function()
	{
        this.drawIndicator("Engine",    this.world.ship.features.enginePower, "#ff0000",   0);
        this.drawIndicator("Generator", this.world.ship.features.batteryPower, "#00ff00", 200);
        this.drawIndicator("Energy",    this.world.ship.features.fuel,        "#0000ff",  400);
    },
	
	drawIndicator: function(label, value, color, x)
	{
		this.context.fillStyle = "#222";
		this.context.fillRect(x + 100.5, 18.5, 80, 10);
		
		this.context.font = "11pt sans-serif";
		this.context.textAlign = "end";
		this.drawText(label, x + 80, 27.5, color);
		this.context.fillRect(x + 100.5, 18.5, 80 * value, 10);
		
		this.context.strokeStyle = "white";
		this.context.strokeRect(x + 100.5, 18.5, 80, 10);
	},
	
	drawText: function(text, x, y, color)
	{
		this.context.fillStyle = "white";
		this.context.fillText(text, x + 1, y + 1);
		this.context.fillStyle = color;
		this.context.fillText(text, x, y);
	},
	
	showStart: function()
	{
		this.context.font = "20pt sans-serif";
		this.context.textAlign = "center";
		this.drawText("Fly closely to the stars and", 300, 220, "#0F0");
		this.drawText("consume their power to improve", 300, 250, "#0F0");
		this.drawText("your starship. Save energy", 300, 280, "#0F0");
		this.drawText("Press Space or click to start", 300, 340, "#0F0");
	}
});

Canvas.starFullColor  = [  80,  80,  80 ];
Canvas.starEmptyColor = [ 120, 120, 120 ];
Canvas.starColorCoef  = [ 175, 175, 175 ];

var Canvas = Class.extend({
	world   : null,  // World
	el      : null,  // jQuery element
	context : null,  // CanvasContext2D
	
	init: function()
	{
		this.el = $('<canvas width="' + Level.current.screenSize + '" height="' + Level.current.screenSize + '" />');
		this.context = this.el[0].getContext("2d");
	},
	
	draw: function()
	{
		this.context.fillStyle = "black";
		this.context.fillRect(0, 0, Level.current.screenSize, Level.current.screenSize);
		
		this.context.save();
		
		this.context.translate(Level.current.screenSize / 2, Level.current.screenSize / 2);
		this.context.scale(1, -1);
		this.context.rotate(-this.world.ship.angle + Math.PI / 2);
		this.context.translate(-this.world.ship.x, -this.world.ship.y);
		
		var screenCol = this.world.ship.getScreenCol();
		var screenRow = this.world.ship.getScreenRow();
		
		this.world.eachScreen(screenCol, screenRow, this.drawBg, this);
		this.drawRay();
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

		if (this.world.ship.isWinner)
		{
			this.context.font = "20pt sans-serif";
			this.context.textAlign = "center";
			this.drawText("Congratulation!", 300, 200, "white");
			this.drawText("You are on the top of Color EVOLUTION", 300, 230, "white");
			this.drawText("Press Space or click to start next level", 300, 440, "gray");
		}
	},
	
	drawRay: function()
	{
		if (this.world.ship.deadTime)
			return;
		
		this.context.save();
		
		var maxRayLength = 7 * Level.current.starMaxRadius;
		var shipAngle = this.world.ship.angle;
		var rayAngle = this.world.ship.getRayAngle();
		
		this.context.translate(this.world.ship.x, this.world.ship.y);
		this.context.scale(maxRayLength, maxRayLength);
		
		this.context.beginPath();
		this.context.arc(0, 0, 1, shipAngle - rayAngle, shipAngle + rayAngle);
		this.context.lineTo(0, 0);
		this.context.closePath();
		
		this.context.fillStyle = this.createRadialGradient("rgba(128, 128, 128, 1)", "rgba(128, 128, 128, 0)");
		this.context.fill();
		
		//this.drawDrainingRay({ y1 : -Math.PI / 16, y2 : -Math.PI / 25, star: new World.Star(0, 0, new World.Features(1, 0, 0)), s: 80 });
		
		if (this.world.gravity)
			this.world.gravity.drainingStars.each(this.drawDrainingRay, this);
		
		this.context.restore();
	},
	
	drawDrainingRay: function(drainingStar)
	{
		var maxRayLength = 7 * Level.current.starMaxRadius;
		
		this.context.beginPath();
		this.context.arc(0, 0, drainingStar.s / maxRayLength, drainingStar.y1, drainingStar.y2);
		this.context.lineTo(0, 0);
		this.context.closePath();
		
		var rgb = this.getFeaturesRgb(drainingStar.star.features, 0);
		var featuresMax = drainingStar.star.features.getMax();
		
		this.context.fillStyle = this.createRadialGradient(Util.rgbaStr(rgb, featuresMax), Util.rgbaStr(rgb, 0));
		this.context.fill();
		
		this.context.beginPath();
		this.context.arc(0, 0, drainingStar.s / maxRayLength, drainingStar.y1, drainingStar.y2);
		this.context.arc(0, 0, maxRayLength, drainingStar.y2, drainingStar.y1, true);
		this.context.closePath();
		
		this.context.fillStyle = this.createRadialGradient("rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)");
		this.context.fill();
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
		
		var level = Level.current;
		level.description.each(function(str, index) {
			this.drawText(str, 300, 310 - 30 * (level.description.length - index), "#0F0");
		}, this);
		this.drawText("Level " + (Level.current.index + 1), 300, 330, "#0F0");
		this.drawText("Press Space or click to start", 300, 380, "#0F0");
	},
	
	showPaused: function()
	{
		this.context.font = "20pt sans-serif";
		this.context.textAlign = "center";
		this.drawText("Paused", 300, 270, "#FF0");
		this.drawText("Press Space or click to continue", 300, 340, "#FF0");
	},
	
	createRadialGradient: function(a, b)
	{
		var gradient = this.context.createRadialGradient(0, 0, 0, 0, 0, 1);
		gradient.addColorStop(0, a);
		gradient.addColorStop(1, b);
		return gradient;
	}
});

Canvas.starFullColor  = [  80,  80,  80 ];
Canvas.starEmptyColor = [ 120, 120, 120 ];
Canvas.starColorCoef  = [ 175, 175, 175 ];

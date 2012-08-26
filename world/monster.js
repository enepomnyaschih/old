World.Monster = Class.extend({
    x           : 0,
    y           : 0,
    angle       : 0,

    init : function (x, y) {
        this.x = x;
        this.y = y;
    },

    move : function (ship) {
        var s = Math.sqrt(Math.pow(ship.y - this.y, 2) + Math.pow(ship.x - this.x, 2));
        if (s < 30)
		{
            ship.isEaten = true;
			return;
		}
		
        this.angle = JW.mod(Math.atan2(ship.y - this.y, ship.x - this.x), 2 * Math.PI);
        var speed = Level.current.maxSpeed * ((s > 1000) ? .6 : .2);
        this.x += Math.cos(this.angle) * speed * Level.current.dt;
        this.y += Math.sin(this.angle) * speed * Level.current.dt;
    }

});

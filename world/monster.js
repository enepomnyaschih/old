World.Monster = Class.extend({
    x           : 0,
    y           : 0,
    angle       : 0,

    init : function (x, y) {
        this.x = x;
        this.y = y;
    },

    move : function (ship) {
        this.angle = JW.mod(Math.atan2(ship.y - this.y, ship.x - this.x), 2 * Math.PI);
        var s = Math.sqrt(Math.pow(ship.y - this.y, 2) + Math.pow(ship.x - this.x, 2));
        if (s < 30)
            ship.isEaten = true;
        var speed = Level.current.maxSpeed * 3/4;
        this.x += (speed * Level.current.dt) / s * ship.x - this.x;
        this.y += (speed * Level.current.dt) / s * ship.y - this.y;
    }

});

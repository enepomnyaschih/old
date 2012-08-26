World.DrainingStar = Class.extend({
    angles : null, // array of pairs (array)
    s      : 0,
    star   : null,

    init : function(angles, s, star) {
        this.angles = angles;
        this.s = s;
        this.star = star;
    }
});

World.DrainingStar = Class.extend({
    y1  :0,
    y2  :0,
    s   :0,
    star:null,

    init : function(y1, y2, s, star) {
        this.y1 = y1;
        this.y2 = y2;
        this.s = s;
        this.star = star;
    }
});

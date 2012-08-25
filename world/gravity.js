World.Gravity = Class.extend({
    accelerationX       : 0,
    accelerationY       : 0,
    isExploded          : false,
    drain               : null, // array of three color

    init : function() {
        this.drain = [0, 0, 0];
    }
});

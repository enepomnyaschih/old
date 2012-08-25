World.Gravity = Class.extend({
    accelerationX       : 0,
    accelerationY       : 0,
    isExploded          : false,
    features            : null, //World.Features

    init : function() {
        this.features = new World.Features(0, 0, 0);
    }
});

World.StarsShipInteraction = Class.extend({
    isExploded          : false,
    features            : null, //World.Features
    drainingStars       : null,

    init : function() {
        this.features = new World.Features(0, 0, 0);
        this.drainingStars = [];
    }
});

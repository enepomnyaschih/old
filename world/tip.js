var Tip = Class.extend({
    activated   : false,
    text        : null,
    used        : false,

    init : function(text) {
        this.text = text;
    }
});

Tip.tips = [new Tip("Your ship is not far from a star, you can drain color energy from it and you can push into the star. Use arrows to avoid crash")];
Tip.activated = -1;
Tip.checkSituationOnTip = function(x, y, star) {





};

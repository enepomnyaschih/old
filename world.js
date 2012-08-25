var World = Class.extend({
	ship    : null,  // Ship
	screens : null   // Map from col to Map from row to Screen
    generateScreens : function (x, y) {
        var screenCol = Math.floor(x / World.Screen.size);
        var screenRow = Math.floor(y / World.Screen.size);

        if (screens[screenCol] == null [screenRow] == null)


    }
});


World.Feature = Class.extend({
	color     : null,
	shipParam : null,
	
	init: function(color, shipParam)
	{
		this.color = color;
		this.shipParam = shipParam;
	}
});

World.Feature.items = [
	new World.Feature("red", "enginePower"),
	new World.Feature("green", "bateryPower"),
	new World.Feature("blue", "fuel")
];

World.Feature.getByColor = function(color)
{
	return World.Feature.items.searchBy("color", color);
}

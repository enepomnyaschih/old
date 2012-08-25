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
	new Feature("red", "enginePower"),
	new Feature("green", "bateryPower"),
	new Feature("blue", "fuel")
];

World.Feature.getByColor = function(color)
{
	return World.Feature.items.searchBy("color", color);
}

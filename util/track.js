Util.Track = JW.Audio.Track.extend({
	period    : 1,
	iteration : 0,
	
	play: function()
	{
		if (this.iteration === 0)
			this._super();
		
		this.iteration = (this.iteration + 1) % this.period;
	}
});

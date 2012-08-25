var Util = {
	preloadImage: function(
		src,      // [required] String
		callback, // [optional] Function(image), image is undefined if error
		scope)    // [optional] Object
	{
		var image = jQuery(new Image());
		image.
			load(function() {
				if (callback)
					callback.call(scope || this, image);
			}).
			error(function() {
				if (callback)
					callback.call(scope || this);
			}).
			attr("src", src);
	},
	
	preloadImages: function(
		srcs,     // [required] Map from key:String to url:String
		callback, // [optional] Function(images)
		scope)    // [optional] Object
	{
		var images = {};
		var pending = 1;
		
		function onLoaded()
		{
			--pending;
			if (pending === 0)
				callback.call(scope || this, images);
		}
		
		function getLoadHandler(key)
		{
			return function(image)
			{
				images[key] = image;
				onLoaded();
			}
		}
		
		for (var key in srcs)
		{
			++pending;
			Util.preloadImage(srcs[key], getLoadHandler(key));
		}
		
		onLoaded();
	},

    /// random from 0 to max
    random : function(max)
    {
        return Math.floor(Math.random() * max);
    }
};

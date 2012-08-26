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
    },
	
	rgbaStr : function(rgb, a)
	{
		return "rgba(" + Math.floor(rgb[0]) + ", " + Math.floor(rgb[1]) + ", " + Math.floor(rgb[2]) + ", " + a + ")";
	},

    intersectionLength : function (segment1x1, segment1x2, segment2x1, segment2x2)
    {
        if (segment1x1 > segment1x2)
            segment1x1 -= Math.PI * 2;

        if (segment2x1 > segment2x2)
            segment2x1 -= Math.PI * 2;

        if (segment1x1 >= segment2x1 && segment1x1 <= segment2x2) {
            return [segment1x1, Math.min(segment1x2, segment2x2)];
        }

        if (segment1x2 >= segment2x1 && segment1x2 <= segment2x2) {
            return [Math.max(segment1x1, segment2x1), segment1x2];
        }

        if (segment2x1 >= segment1x1 && segment2x1 <= segment1x2) {
            return [segment2x1, segment2x2];
        }

        return null;

        //var min = return Math.min(segment2x1 - segment1x1, segment2x1 - segment1x1, segment2x1 - segment1x1, segment2x1 - segment1x1);



    }
};

/*
    jWidget Audio 0.1
    
    Copyright (C) 2011 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ns("JW.Audio");

JW.Audio.Playback = JW.ObservableConfig.extend({
    // Events:
    // finish(event)
    
    track     : null,  // [required] JW.Audio.Track
    autoStart : false, // [optional] Boolean
    
    audioEl   : null,  // [readonly] Audio
    status    : 0,     // [readonly] Integer, 0 - ready, 1 - play, 2 - finished
    
    init: function(config)
    {
        this._super(config);
        
        this.__onEnded = this._onEnded.as(this);
        this.track = JW.Audio.Track.create(this.track);
        
        this.audioEl = new Audio();
        
        var src = this.track.ogg;
        if (!this.audioEl.canPlayType("audio/ogg") && this.audioEl.canPlayType("audio/mpeg"))
            src = this.track.mp3;
        
        this.audioEl.src = src;
        
        if (this.audioEl.addEventListener)
            this.audioEl.addEventListener('ended', this.__onEnded, false);
        else
            this.audioEl.onended = this.__onEnded;
        
        if (this.autoStart)
            this.__startTimer = setTimeout(this.start.as(this), 1);
    },
    
    destroy: function()
    {
        this.stop();
        
        this._super();
    },
    
    start: function()
    {
        this._abortAutoStart();
        if (!this.isReady())
            return;
        
        this.status = 1;
        this.audioEl.play();
    },
    
    stop: function()
    {
        this._abortAutoStart();
        if (this.isFinished())
            return;
        
        if (this.isPlay())
            this.audioEl.pause();
        
        if (this.audioEl.addEventListener)
            this.audioEl.removeEventListener('ended', this.__onEnded, false);
        else
            delete this.audioEl.onended;
        
        this.status = 2;
        this.audioEl.src = "/dummy";
        delete this.audioEl;
    },
    
    isReady: function()
    {
        return this.status === 0;
    },
    
    isPlay: function()
    {
        return this.status === 1;
    },
    
    isFinished: function()
    {
        return this.status === 2;
    },
    
    _abortAutoStart: function()
    {
        if (!this.__startTimer)
            return;
        
        clearTimeout(this.__startTimer);
        delete this.__startTimer;
    },
    
    _onEnded: function()
    {
        this.stop();
        this.trigger("finish");
    }
});

JW.Audio.Playlist = JW.ObservableConfig.extend({
    // Events:
    // trackchange(event, track)
    
    tracks   : null,  // [optional] Array of JW.Audio.Track
    
    playback : null,  // [readonly] JW.Audio.Playback
    index    : null,  // [readonly] Integer
    
    init: function(config)
    {
        this._super(config);
        
        this.tracks = JW.makeArray(this.tracks).map(JW.Audio.Track.create);
    },
    
    destroy: function()
    {
        this.stop();
        
        this._super();
    },
    
    next: function()
    {
        this.stop();
        
        if (this.tracks.isEmpty())
            return;
        
        if (JW.isSet(this.index))
            this.index = (this.index + 1) % this.tracks.length;
        
        this.play();
    },
    
    play: function()
    {
        this.stop();
        
        if (this.tracks.isEmpty())
            return;
        
        this.index = JW.defn(this.index, 0);
        
        var track = this.getCurrentTrack();
        
        this.playback = track.play();
        this.playback.bind("finish", this.next.as(this), this);
        
        this.trigger("trackchange", track);
    },
    
    stop: function()
    {
        if (!this.isPlay())
            return;
        
        this.playback.destroy();
        delete this.playback;
    },
    
    getCurrentTrack: function()
    {
        if (this.tracks.isEmpty() || !JW.isSet(this.index))
            return null;
        
        return this.tracks[this.index];
    },
    
    isPlay: function()
    {
        return JW.isSet(this.playback);
    }
});

JW.Audio.Track = JW.Config.extend({
    mp3 : null, // [required] String, URL
    ogg : null, // [required] String, URL
    
    play: function()
    {
        return new JW.Audio.Playback({
            track     : this,
            autoStart : true
        });
    },
    
    createPlayback: function()
    {
        return new JW.Audio.Playback({
            track : this
        });
    }
});


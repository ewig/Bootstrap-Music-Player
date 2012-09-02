define([
  "app",

  // Libs
  "backbone"

  // Modules

  // Plugins
],

function(app, Backbone) {

  // Create a new module
  var Player = app.module();




  Player.Views.Albums = Backbone.LayoutView.extend({
    template: 'albums',
    serialize: function(){
      return {
        collection: this.collection.toJSON()
      };
    },
    initialize: function(a){
      this.collection.on('reset', this.render, this);
    }
  });




  Player.Views.Playlist = Backbone.LayoutView.extend({
    template: 'playlist',
    serialize: function(){
      return this.model.toJSON();
    },
    initialize: function(){
      this.model.on('change', this.render, this);
    }
  });




  Player.Views.NowPlaying = Backbone.LayoutView.extend({
    template: 'now.playing',
    serialize: function(){
      return this.model.toJSON();
    },
    afterRender: function(){
      var file = this.model.get('files');
      if(typeof file !== "undefined"){
        this.audio.src = file.src;
        this.audio.load();
      }
    },
    initialize: function(){
      var that = this;
      delete app.audio;
      delete window._audio;
      this.audio = app.audio = window._audio = new Audio();
      this.audio.addEventListener("loadedmetadata", this.getMetadata, false);
      this.audio.addEventListener("timeupdate", this.updateTime, false);
      this.audio.addEventListener("play", this.playing, false);
      this.audio.addEventListener("pause", this.paused, false);
      this.audio.addEventListener('ended', function(){that.next();}, false);

      this.model.on('change', this.render, this);
    },
    getMetadata: function(){
      var mins = ~~(this.duration / 60);
      var secs = (this.duration % 60).toFixed();
      secs = (secs.length < 2) ? "0" + secs : secs;
      app.layout.$el.find('.time-total').html(mins + ":" + secs);
      app.layout.$el.find('.btn-loading').removeClass('btn-loading').addClass('btn-play').find('i').removeClass('icon-refresh').removeClass('spin').addClass('icon-play');
      if(app.playing){
          this.play();
          app.playing = true;
          app.layout.$el.find('.progress').addClass('active');
          app.layout.$el.find('.btn-play').removeClass('btn-play').addClass('btn-pause').find('i').removeClass('icon-play').addClass('icon-pause');
        }
    },
    updateTime: function(){
      var mins = ~~(this.currentTime / 60);
      var secs = (this.currentTime % 60).toFixed() + '';
      secs = (secs.length < 2) ? "0" + secs : secs;
      var playedPercent =  ((this.currentTime / this.duration) * 100) + "%";

      app.layout.$el.find('.time-elapsed').html(mins + ':' + secs);
      app.layout.$el.find('.bar').css({ width: playedPercent });
    },
    play: function(evt){
      if(!app.playing){
        this.audio.play();
        app.playing = true;
        app.layout.$el.find('.progress').addClass('active');
        $(evt.currentTarget).removeClass('btn-play').addClass('btn-pause').find('i').removeClass('icon-play').addClass('icon-pause');
      }
    },
    pause: function(evt){
      this.audio.pause();
      app.playing = false;
      app.layout.$el.find('.progress').removeClass('active');
      $(evt.currentTarget).removeClass('btn-pause').addClass('btn-play').find('i').removeClass('icon-pause').addClass('icon-play');
    },
    next: function(){
      var track = this.model.get('track');
      var nextTrack = {};

      if(track < this.collection.length){
        nextTrack = this.collection.at(track);
        Backbone.history.navigate(this.options.album.get('id') + '/' + nextTrack.get('id'), true );
      } else {
        nextTrack = this.collection.at(0);
        Backbone.history.navigate(this.options.album.get('id') + '/' + nextTrack.get('id'), true );
      }
    },
    back: function(){
      var track = this.model.get('track');
      var nextTrack = {};
      if(track > 1){
        nextTrack = this.collection.at(track-2);
        Backbone.history.navigate(this.options.album.get('id') + '/' + nextTrack.get('id'), true );
      } else {
        nextTrack = this.collection.at(this.collection.length -1);
        Backbone.history.navigate(this.options.album.get('id') + '/' + nextTrack.get('id'), true );
      }
    },
    scrub: function(evt){
      if(typeof evt.offsetX === "undefined") {
        var targetOffset = $(evt.currentTarget).offset();
        evt.offsetX = evt.pageX - targetOffset.left;
      }
      var clickPercent = (evt.offsetX / evt.currentTarget.offsetWidth);
      var newLocation = (clickPercent * this.audio.duration);
      this.audio.currentTime = newLocation;
    },
    events: {
      'click .btn-play'  : 'play',
      'click .btn-pause' : 'pause',
      'click .btn-next'  : 'next',
      'click .btn-back'  : 'back',
      'mousedown .progress'  : 'scrub',
      'mouseup .progress'  : 'scrub'
    }

  });

  // Required, return the module for AMD compliance
  return Player;

});
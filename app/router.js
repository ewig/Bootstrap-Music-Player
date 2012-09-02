define([
  // Application.
  "app",

  // Modules.
  "modules/player",
  "modules/devNotes",

  // JSON
  'json!data/playlist.json'
],

function(app, Player, DevNotes, Playlist) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      ":albumid": "album",
      ":albumid/:songid": "song"
    },
    
    index: function() {
      this.albums.reset(Playlist.albums);
      var firstAlbum = this.albums.at(0);
      var firstSong = firstAlbum.get('songs')[0];
      Backbone.history.navigate(firstAlbum.id + '/' + firstSong.id, true);
    },

    album: function(albumId) {
      this.albums.reset(Playlist.albums);
      this.album.set(this.albums.get(albumId));
    },

    song: function(albumId, songId){
      this.albums.reset(Playlist.albums);
      this.album.set(this.albums.get(albumId));
      this.songs.reset(this.album.get('songs'));
      this.song.set(this.songs.get(songId));
    },

    initialize: function(){
      var that = this;
      this.albums = new Backbone.Collection();
      this.album  = new Backbone.Model();
      this.songs  = new Backbone.Collection();
      this.song   = new Backbone.Model();
      app.playing = false;

      app.layout = new Backbone.Layout({
        el: '#main',
        template: "main",
        views: {
          ".albums":       new Player.Views.Albums({ collection: this.albums}),
          ".playlist":     new Player.Views.Playlist({ model: this.album }),
          ".now-playing":  new Player.Views.NowPlaying({ model: this.song, collection: this.songs, album: this.album }),
          ".dev-notes":    new DevNotes.Views.Main()
        }
      });
    
      // Render the layout into the DOM.
      app.layout.render();

    }
  });

  return Router;

});

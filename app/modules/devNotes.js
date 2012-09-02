define([
  "app",

  // Libs
  "backbone"

  // Modules

  // Plugins
],

function(app, Backbone) {


  // Create a new module
  var DevNotes = app.module();

  DevNotes.Views.Main = Backbone.View.extend({
	template: 'dev.notes',
	manage: true,
	afterRender: function(){
		$('#notesModal').modal();
	}
  });
   // Required, return the module for AMD compliance
  return DevNotes;

});
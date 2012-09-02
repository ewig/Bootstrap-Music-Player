// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries.
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    handlebars: "../assets/js/libs/handlebars",

    //Plugins
    bootstrap: "../assets/js/plugins/bootstrap",
    json: '../assets/js/plugins/json',
    text: '../assets/js/plugins/text'
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    handlebars: {
      exports: "Handlebars"
    },

    bootstrap: {
      deps: ["jquery"]
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"]
  }

});

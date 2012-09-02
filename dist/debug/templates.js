this['JST'] = this['JST'] || {};

this['JST']['app/templates/albums.html'] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n	<a href=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"thumbnail\" width=\"160\" height=\"160\">\n		<img src=\"";
  foundHelper = helpers.cover;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cover; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" alt=\"";
  foundHelper = helpers.album;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.album; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" title=\"";
  foundHelper = helpers.album;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.album; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n	</a>\n";
  return buffer;}

  buffer += "<h6>Albums</h6>\n";
  stack1 = depth0.collection;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}

this['JST']['app/templates/dev.notes.html'] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"modal hide fade\" id=\"notesModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"notesModalLabel\" aria-hidden=\"true\">\n	<div class=\"modal-header\">\n		<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n		<h3 id=\"notesModalLabel\">Developer Notes</h3>\n	</div>\n	<div class=\"modal-body\">\n		<h3>Hi, guys.</h3>\n		<p>Here's a quick mp3/ogg player based on backbone.js. It works in Safari/Firefox/Chrome (tested in iOS 6 and iOS 5 iphone/ipad). Here are a few of the decisions I made and why I made them. I was told not to spend more than four hours on it. Truthfully, I spent a little more than that on account of trying a few new tools I hadn't used before and getting the build process tweaked for posting to github-hosted pages.</p>\n		<p><strong>Backbone Boilerplate</strong><br>The quickest way I know of to get a solid modular backbone.js project up and running is Backbone Boilerplate. A few taps on the command line and you've got the scaffolding set up for a project. I have to admit that a good bit of the early time I spent on this was wasted by trying to use some of the newer Backbone Layout Manager techniques without having updated the code to the latest version. Once that was updated, it was simply a matter of creating the modules necessary for the app.</p>\n		<p><strong>Twitter Bootstrap</strong><br>Since time was of the essence and because I'm not the prettiest drawer, I used the Twitter Bootstrap library to round the corners and set up the grid. It does leave it a bit generic looking, but it is clean and reflects my general style choices.</p>\n		<p><strong>HTML5 Audio</strong><br>I gave HTML5 audio a shot for one big reason... this is a new laptop and I don't have flash installed. It's a fairly simple API, compared to some of the new browser APIs. Anything that can play mp3 will go for it, but I did have to convert the music to OGG format in order to get something working on Safari, Chrome and Firefox. If you look at the data structure, you'll see I initially planned to have a flash fallback for browsers that don't support the new HTML5 Audio tag, but I tried to keep the total time on the project as close to the allotted 4 hours as I could.</p>\n		<p><strong>Performance / Class Warfare</strong><br>If you look at the code, you'll notice I used all classes. Even in the cases where an ID would have been much more performant. I did this for one reason: because I initially was going to try to make the player modular enough that you could drop two on the same page. I eventually realized that I didn't have the time for that. When I usually release things, I have a run through Chrome's CSS Selector Audits and try and nail down the costly ones. I also used a number of views. Views can get a little expensive, but make it so much easier to pass data around. There have been times where the best bet for me was to have thirty views on a page. Although I only used four here. (This popup is one of them.)</p>\n		<p><strong>PushState: False</strong><br>Up until I posted this on the server, I was using PushState: true. Sadly, the github servers that I host this site on wouldn't work with that. If you tried to refresh a deep-link, you would get a 404. I turned pushstate off to get those links working again. Rest assured that pushstate works.</p>\n		<p><strong>Url Scheme</strong><br>After I got about halfway through the project, I realized that I had picked a non-restful URL scheme. I went forward with it, but if I were spending any more time on this, I would definitely fix that first.</p>\n		<p><strong>Meta Data</strong><br>I made an initial attempt to load the raw data into an object in javascript and parse out the ID3 data, but realized that it wouldn't work unless the music files and the app were hosted on the same domain. I stored the files on dropbox, so that wouldn't work. I stored some meta data in the JSON and used that to display the album/cover/titles/artist. The current/total times are calculated entirely in javascript. With more time, I would have tried getting the files on the same domain and parseing that info out. It wouldn't be too hard to fall back to relying on Flash for that information if I wasn't able to parse.</p>\n		<p><strong>Modular</strong><br>I tried to separate everything nicely to be reusable. For the most part I'm happy with the way things went, though I'd take a huge swing at another chance to write the code that actually interacts with the browser's Audio API. That could have been abstracted a little better.</p>\n		<p><strong>CSS3</strong><br>I didn't make huge use of CSS3, but the spinning loading indicator on the play button and the animated progress bar are CSS3.</p>\n		<p><strong>Features</strong><br>Maybe that's too strong of a word for what these are...</p>\n		<dl>\n			<dt>Play/Pause</dt>\n			<dd>Like a boss.</dd>\n			<dt>Back/Next</dt>\n			<dd>You can also loop around from front->back and back->front</dd>\n			<dt>Scrubbing</dt>\n			<dd>Click anywhere on the progress indicator.</dd>\n			<dt>Autoplay</dt>\n			<dd>It will automatically start the next track when a song finishes.</dd>\n			<dt>Browsing</dt>\n			<dd>You can look through the other albums while you're playing.</dd>\n			<dt>G.o.o.d. Music</dt>\n			<dd>Gates is my favorite new band. New Jersey exports one good thing... music. These early Straylight Run demos may not sound special, but they blew my 18 year old mind. When they were posted in 2003, it was the first time I had heard a 'real' band posting free music on their website to get interest/buzz.</dd>\n		</dl>\n		<p>Let me know if you have any questions/comments/concerns!</p>\n		<div><h3>Thanks,</h3><p><a href=\"mailto:johnmegahan@gmail.com\">Johnny Megahan</a></p></div>\n	</div>\n	<div class=\"modal-footer\">\n		<button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>\n	</div>\n</div>";}

this['JST']['app/templates/layouts/main.html'] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"container\">\n	<div class=\"page-header\">\n		<h1>Backbone.js Music Player <small>by <a href=\"http://www.johnmegahan.me\">Johnny Megahan</a> // music from <a href=\"http://www.gatesnj.com\">gates</a> & <a href=\"http://straylightrun.com\">Straylight Run</a></small></h1>\n	</div>\n	<div class=\"row\">\n		<div class=\"span2\">\n			<nav class=\"albums\"></nav>\n		</div>\n		<div class=\"span3\">\n			<nav class=\"playlist\"></nav>\n		</div>\n		<div class=\"span7\">\n			<div class=\"now-playing\"></div>\n		</div>\n	</div>\n	<footer class=\"footer\">\n		<div class=\"alert alert-info\"><strong>FYI:</strong> All music included was at one point made available online free by the artists. <a href=\"#notesModal\" role=\"button\" class=\"pull-right\" data-toggle=\"modal\">View Dev Notes</a></div>\n		<div class=\"dev-notes\"></div>\n	</footer>\n</div>";}

this['JST']['app/templates/now.playing.html'] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n	<div class=\"well\">\n		<h2>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n		<div class=\"progress progress-striped\">\n	  		<div class=\"bar\" style=\"width: 0%;\"></div>\n		</div>\n		<div class=\"time\">\n			<span class=\"time-elapsed\">0:00</span> / <span class=\"time-total\">0:00</span>\n		</div>\n		<div class=\"controls\">\n			<div class=\"btn-group\">\n				<button class=\"btn btn-loading\"><i class=\"icon-refresh spin\"></i></button>\n				<button class=\"btn btn-back\"><i class=\"icon-step-backward\"></i></button>\n				<button class=\"btn btn-next\"><i class=\"icon-step-forward\"></i></button>\n			</div>\n		</div>\n	</div>\n";
  return buffer;}

  buffer += "<h6>Now Playing</h6>\n";
  stack1 = depth0.title;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}

this['JST']['app/templates/playlist.html'] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n	<img src=\"";
  foundHelper = helpers.cover;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.cover; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" alt=\"\" class=\"img-rounded\" width=\"270\" height=\"270\">\n	<h4>";
  foundHelper = helpers.album;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.album; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h4>\n	<h5>by ";
  foundHelper = helpers.artist;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.artist; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h5>\n	<ol>\n		";
  stack1 = depth0.songs;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program2, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ol>\n";
  return buffer;}
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<li><a href=\"";
  stack1 = depth1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a></li>\n		";
  return buffer;}

function program4(depth0,data) {
  
  
  return "\n<p>Select an album</p>\n";}

  buffer += "<h6>Current Album</h6>\n";
  stack1 = depth0.album;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
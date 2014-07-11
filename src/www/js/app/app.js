define(function(require) {
  var History = require('lavaca/net/History');
  var HomeController = require('./net/HomeController');
  var ModalController = require('./net/ModalController');
  var Connectivity = require('lavaca/net/Connectivity');
  var Application = require('lavaca/mvc/Application');
  var Translation = require('lavaca/util/Translation');
  var headerView = require('app/ui/views/controls/HeaderView');
  require('lavaca/ui/DustTemplate');
  require('hammer');


  // Uncomment this section to use hash-based browser history instead of HTML5 history.
  // You should use hash-based history if there's no server-side component supporting your app's routes.
  History.overrideStandardsMode();

  /**
   * Global application-specific object
   * @class app
   * @extends Lavaca.mvc.Application
   */
  var app = new Application(function() {
    // Add routes
    this.router.add({
      '/': [HomeController, 'index'],
      '/all_player': [HomeController, 'all_players'],
      '/batting_order': [HomeController, 'batting_order'],
      '/available_player': [HomeController, 'available_players'],
      '/field': [HomeController, 'field'],
      '/modalAvailablePlayer': [ModalController, 'availablePlayers']
    });
    // Initialize messages
    Translation.init('en_US');
    //render header
    headerView.render();
  });

  // Setup offline AJAX handler
  Connectivity.registerOfflineAjaxHandler(function() {
    var hasLoaded = Translation.hasLoaded;
    alert(hasLoaded ? Translation.get('error_offline') : 'No internet connection available. Please check your settings and connection and try again.');
  });

  return app;

});
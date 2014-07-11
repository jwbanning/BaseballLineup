define(function(require) {

  var ModalView = require('app/ui/views/ModalView'),
      BaseController = require('app/net/BaseController'),
      Model = require('lavaca/mvc/Model'),
      Promise = require('lavaca/util/Promise'),
      modalAvailablePlayerView = require('app/ui/views/modalAvailablePlayerView'),
      dust = require('dust'),
      Modernizr = window.Modernizr;
  /**
   * Create Order controller
   * @class app.net.ModalController
   * @extends app.net.BaseController
   */
  var ModalController = BaseController.extend({
    availablePlayers: function(params) {
      var model = params.model;
      ModalView.showModal({
        TView: modalAvailablePlayerView,
        model: params.model,
        direction: params.direction
      });
    }
  });

  return ModalController;

});

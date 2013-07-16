define(function(require) {

  var ExampleView = require('app/ui/views/ExampleView'),
      SetLineupView = require('app/ui/views/SetLineupView'),
      TestView = require('app/ui/views/TestView'),
      BaseController = require('app/net/BaseController'),
      Translation = require('lavaca/util/Translation'),
      localStore = require('app/cache/localStore'),
      stateModel = require('app/models/StateModel');

  /**
   * Example controller
   * @class app.net.SetLineupController
   * @extends app.net.BaseController
   */
  var SetLineupController = BaseController.extend({
    /**
     * Home action, creates a history state and shows a view
     * @method home
     *
     * @param {Object} params  Action arguments
     * @param {Object} model  History state model
     * @return {Lavaca.util.Promise}  A promise
     */
    home: function(params, model) {
          if (!model) {
        model = {};
      }
      var viewProperties = {
        pageTransition: {
          'in': 'pt-page-rotatePullRight pt-page-delay180',
          'out': 'pt-page-rotatePushLeft',
          'inReverse': 'pt-page-rotatePullLeft pt-page-delay180',
          'outReverse': 'pt-page-rotatePushRight'
        }
      };
      return this
        .view(null, SetLineupView, model, viewProperties)
        .then(this.updateState(model, 'Set Lineup Page', params.url));
    }
  });

  return SetLineupController;

});

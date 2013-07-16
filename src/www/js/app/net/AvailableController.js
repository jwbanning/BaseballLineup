define(function(require) {

  var ExampleView = require('app/ui/views/ExampleView'),
      SetLineupView = require('app/ui/views/SetLineupView'),
      AvailableView = require('app/ui/views/AvailableView'),
      TestView = require('app/ui/views/TestView'),
      BaseController = require('app/net/BaseController'),
      Translation = require('lavaca/util/Translation'),
      localStore = require('app/cache/localStore'),
      stateModel = require('app/models/StateModel');

  /**
   * Example controller
   * @class app.net.AvailableController
   * @extends app.net.BaseController
   */
  var AvailableController = BaseController.extend({
    list: function(params, model) {
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
        .view(null, AvailableView, model, viewProperties)
        .then(this.updateState(model, 'View Available Players Page', params.url));
    }
  });

  return AvailableController;

});

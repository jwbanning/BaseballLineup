define(function(require) {

  var ExampleView = require('app/ui/views/ExampleView'),
      SetLineupView = require('app/ui/views/SetLineupView'),
      AvailableView = require('app/ui/views/AvailableView'),
      TestView = require('app/ui/views/TestView'),
      BaseController = require('app/net/BaseController'),
      Translation = require('lavaca/util/Translation'),
      localStore = require('app/cache/localStore'),
      stateModel = require('app/models/StateModel'),
      Promise = require('lavaca/util/Promise'),
      teamCollection = require('app/models/teamCollection');

  /**
   * Example controller
   * @class app.net.AvailableController
   * @extends app.net.BaseController
   */
  var AvailableController = BaseController.extend({
    list: function(params, model) {
      var promise = new Promise(this);
      if (!model) {
        model = {};
      }
      teamCollection = new teamCollection();
      teamCollection.fetch('/mock/team.json')
        .then(function() {
          var viewProperties = {
                pageTransition: {
                  'in': 'pt-page-rotatePullRight pt-page-delay180',
                  'out': 'pt-page-rotatePushLeft',
                  'inReverse': 'pt-page-rotatePullLeft pt-page-delay180',
                  'outReverse': 'pt-page-rotatePushRight'
                }
              };
          this
            .view(null, AvailableView, teamCollection, viewProperties)
            .then(function() {
              this.updateState(model, 'Available Players', params.url);
              promise.resolve();
            }.bind(this));
        }.bind(this));
      return promise;
    }
  });

  return AvailableController;

});

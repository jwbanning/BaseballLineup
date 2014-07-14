define(function(require) {

  var HomeView = require('app/ui/views/HomeView'),
      BaseController = require('app/net/BaseController'),
      stateModel = require('app/models/StateModel'),
      Promise = require('lavaca/util/Promise'),
      AllPlayersView = require('app/ui/views/AllPlayersView'),
      BattingOrderView = require('app/ui/views/BattingOrderView'),
      // PlayerDetailsView = require('app/ui/views/BattingOrderView'),
      PlayerDetailsView = require('app/ui/views/PlayerDetailsView'),
      AvailablePlayersView = require('app/ui/views/AvailablePlayersView'),
      FieldView = require('app/ui/views/FieldView'),
      PlayerModel = require('app/models/PlayerModel'),
      TeamCollection = require('app/models/TeamCollection'),
      BatterCollection = require('app/models/BatterCollection'),
      Model = require('lavaca/mvc/Model');

  /**
   * Home controller
   * @class app.net.HomeController
   * @extends app.net.BaseController
   */
  var HomeController = BaseController.extend({
    /**
     * Home action, creates a history state and shows a view
     * @method home
     *
     * @param {Object} params  Action arguments
     * @param {Object} history  History state model
     * @return {Lavaca.util.Promise}  A promise
     */
    index: function(params, history) {
      var model = new Model();
      return this
        .view(null, HomeView, model)
        .then(this.updateState(history, 'Jardineros Lineup', params.url));
    },
    lang: function(params) {
      var locale = params.locale || 'en_US';
      Translation.setDefault(locale);
      localStore.set('lang', locale);
      this.viewManager.flush();
      stateModel.set('lang', locale);
      return this.redirect('/?lang={0}', [locale]);
    },
     field: function(params, model) {
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
        .view(null, FieldView, TeamCollection, viewProperties)
        .then(this.updateState(model, 'Who is Where', params.url));
    },
    all_players: function(params, model) {
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
        .view(null, AllPlayersView, TeamCollection, viewProperties)
        .then(this.updateState(model, 'All Players', params.url));
    },
    available_players: function(params, model) {
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
      // teamCollection.sort('battingPosition', false);
      return this
        .view(null, AvailablePlayersView, TeamCollection, viewProperties)
        .then(this.updateState(model, 'Available - Bench', params.url));
    },
    batting_order: function(params, model) {
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
      var model = new BatterCollection();
      return this
        .view(null, BattingOrderView, model, viewProperties)
        .then(this.updateState(model, 'Current Batting Order', params.url));
    },
    player_detail: function(params, model) {
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
      var model = PlayerModel;
      return this
        .view(null, PlayerDetailsView, model, viewProperties)
        .then(this.updateState(model, 'Player Details', params.url));
    }
  });

  return HomeController;

});

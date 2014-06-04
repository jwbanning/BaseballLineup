define(function(require) {

  var HomeView = require('app/ui/views/HomeView'),
      BaseController = require('app/net/BaseController'),
      stateModel = require('app/models/StateModel'),
      Promise = require('lavaca/util/Promise'),
      BattingOrderView = require('app/ui/views/BattingOrderView'),
      availablePlayersView = require('app/ui/views/availablePlayersView'),
      FieldView = require('app/ui/views/fieldView'),
      teamCollection = require('app/models/teamCollection'),
      Model = require('lavaca/mvc/Model');
      var m = new teamCollection();
      var p = m;

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
    // something: function(params, model) {
    //   if (!model) {
    //     model = {};
    //   }
    //   var viewProperties = {
    //     pageTransition: {
    //       'in': 'pt-page-rotatePullRight pt-page-delay180',
    //       'out': 'pt-page-rotatePushLeft',
    //       'inReverse': 'pt-page-rotatePullLeft pt-page-delay180',
    //       'outReverse': 'pt-page-rotatePushRight'
    //     }
    //   };
    //   return this
    //     .view(null, TestView, model, viewProperties)
    //     .then(this.updateState(model, 'Test Page', params.url));
    // },
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
        },
        sort: 'Name'
      };
      
      // teamCollection.sort('battingPosition', false);
      return this
        .view(null, FieldView, p, viewProperties)
        .then(this.updateState(model, 'Who is Where', params.url));
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
        },
        sort: 'Name'
      };
      // teamCollection.sort('battingPosition', false);
      return this
        .view(null, AvailablePlayersView, p, viewProperties)
        .then(this.updateState(model, 'Available Players', params.url));
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
        },
        sort: 'battingPosition'
      };
      // teamCollection.sort('battingPosition', false);
      return this
        .view(null, BattingOrderView, p, viewProperties)
        .then(this.updateState(model, 'Current Batting Order', params.url));
    }
  });

  return HomeController;

});

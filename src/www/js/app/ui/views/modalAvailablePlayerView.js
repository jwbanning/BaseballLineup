define(function(require) {

  var View = require('lavaca/mvc/View'),
      dust = require('dust'),
      router = require('lavaca/mvc/Router');
  require('rdust!templates/modalAvailablePlayer');
  /**
   * SetLineup view type
   * @class app.ui.views.SetLineup
   * @extends app.ui.views.BaseView
   */
  var modalAvailablePlayerView = View.extend(function() {
    View.apply(this, arguments);
    this.mapEvent({
      '.sortContainer ul li' : {
        tap : this.sortPlayers.bind(this)
      },
      '.closeContainer' : {
        tap : this.dismiss.bind(this)
      },
      'ul li' : {
        tap : this.addAndRemove.bind(this)
      }
    });
  },{
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/modalAvailablePlayer',
    className: 'modalAvailablePlayer',
    autoRender: true,
    templateRedraw: function() {
      this.redraw();
    },
     dismiss: function(){
      this.parentView.closeModal();
    },
    sortPlayers: function(e){
      var sortVal = $(e.currentTarget).attr('id');
      this.model.sort(sortVal);
      this.model.trigger('change');
    },
    addAndRemove: function(e) {
      debugger;
      var playerToAdd = $(e.currentTarget).data('position');
      var inactivePlayers = this.model.get('inactive');

      for (var i = 0; i < inactivePlayers.length; i++) {
        if (i == playerToAdd) {
          var playerModel = inactivePlayers[i];
        };
      };

      var playertoRemove = this.model.get('playerToRemove');
      debugger;
      this.model.add(playerModel);
      this.model.remove()
    }

  });

  return modalAvailablePlayerView;

});
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
    }

  });

  return modalAvailablePlayerView;

});
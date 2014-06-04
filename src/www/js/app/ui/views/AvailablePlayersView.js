define(function(require) {

  var BaseView = require('./BaseView');
  require('rdust!templates/available');
  /**
   * SetLineup view type
   * @class app.ui.views.SetLineup
   * @extends app.ui.views.BaseView
   */
  var availablePlayersView = BaseView.extend(function(){
    BaseView.apply(this, arguments);
    this.mapEvent({
      'model': {
        'change': this.redrawView.bind(this)
      }

    });
  },{
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/available',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'available',
    onRenderSuccess: function(){
      BaseView.prototype.onRenderSuccess.apply(this, arguments);
    },
    redrawView:function() {
      this.redraw();
    }

  });

  return availablePlayersView;

});
define(function(require) {

  var BaseView = require('./BaseView');
  require('rdust!templates/battingOrder');
  /**
   * SetLineup view type
   * @class app.ui.views.SetLineup
   * @extends app.ui.views.BaseView
   */
  var BattingOrderView = BaseView.extend(function(){
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
    template: 'templates/battingOrder',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'battingOrder',
    onRenderSuccess: function(){
      BaseView.prototype.onRenderSuccess.apply(this, arguments);
    },
    redrawView:function() {
      this.redraw();
    }

  });

  return BattingOrderView;

});

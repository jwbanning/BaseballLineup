define(function(require) {

  var BaseView = require('./BaseView');
      router = require('lavaca/mvc/Router');
  require('rdust!templates/playerDetails');
  /**
   * SetLineup view type
   * @class app.ui.views.SetLineup
   * @extends app.ui.views.BaseView
   */
  var PlayerDetailsView = BaseView.extend(function(){
    BaseView.apply(this, arguments);
    this.mapEvent({
      'model': {
        'change': this.redrawView.bind(this),
        'fetchSuccess': this.onFetchSuccess.bind(this)
      }
    });
  },{
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/playerDetails',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'playerDetails',
    onRenderSuccess: function(){
      BaseView.prototype.onRenderSuccess.apply(this, arguments);
    },
    onFetchSuccess:function() {
      this.redraw();
    },
    redrawView:function() {
      this.redraw();
    },
  });

  return PlayerDetailsView;

});

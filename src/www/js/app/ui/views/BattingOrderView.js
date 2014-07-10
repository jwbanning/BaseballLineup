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
        'change': this.redrawView.bind(this),
        'fetchSuccess': this.onFetchSuccess.bind(this)
      },
     'ul li' : {
        hold: this.reOrderLineUp.bind(this)
      },
      'ul li.moveable' : {
        dragstart:this.dragStart.bind(this),
        drag:this.drag.bind(this),
        dragend:this.dragEnd.bind(this)
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
    onFetchSuccess:function() {
      this.redraw();
    },
    redrawView:function() {
      this.redraw();
    },
    reOrderLineUp:function(e) {
      $(e.currentTarget).addClass('moveable');
    },
    dragStart:function(e){
      $(e.currentTarget).css('-webkit-transition','all 0 none');
    },
    drag:function(e){
      $(e.currentTarget).css('-webkit-transform','translate3d('+ 0+'px,'+ e.gesture.deltaY+'px,'+ 0+ ')');
    },
    dragEnd:function(e){
      $(e.currentTarget).removeClass('moveable');
      //$(e.currentTarget).css('-webkit-transform','translate3d('+ 0+'px,'+ 0+'px,'+ 0+ ')');
      var idx = $(e.currentTarget).data('position');
      var distance = Math.round(e.gesture.deltaY / 60);
      console.log('distance'+ ' '+ distance);
      this.model.moveTo(idx, idx+distance);
      for (var i = 0; i < this.model.models.length; i++) {
        this.model.models[i].set('battingPosition', i+1);
      };
      this.redraw();
      this.model.updateBattingOrder();
    }

  });

  return BattingOrderView;

});

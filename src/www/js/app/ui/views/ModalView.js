define(function(require) {

  var Transition = require('lavaca/fx/Transition');
  var View = require('lavaca/mvc/View');
  require('rdust!templates/modalview');

  var ModalView = View.extend(function ModalView() {
    View.apply(this, arguments);
    this.mapEvent({
      
    });
    // state.on('closeModal', this.closeModal.bind(this));
  },{
    template: 'templates/modalview',
    className: 'modal',

    onRenderSuccess: function() {
      View.prototype.onRenderSuccess.apply(this, arguments);
      this.init();
      this.trigger('enterComplete');
    },
    init: function() {
      var self = this;
      if (this.hasRendered) {
        if (self.el) {
          self.width = self.el.width();
          self.height = self.el.height();
        }
      }
    },
    showModal: function(options){
      $(this.el).removeClass('bottom');
      if (options.direction) {
        this.el.addClass(options.direction);
      };
      this.mapChildView({
        '#modal-inner': {
          TView: options.TView,
          model: options.model
        }
      });
      if(options.parentModel){
        this.parentModel = options.parentModel;
      }
      if(options.TView.prototype.swipeToClose){
        this.swipeToClose = true;
      }
      else{
        this.swipeToClose = false;
      }
      this.redraw();

      setTimeout(function(){
        this.el.find('#modal').nextTransitionEnd(function(){
          this.trigger('entercomplete');
        }.bind(this));
        if (!this.el.hasClass('show')) {
          this.el.addClass('show');
        }
      }.bind(this),100);
    },
    closeModal: function(options){
      this.trigger('close');
      this.el.find('#modal').nextTransitionEnd(function(){
        setTimeout(function(){
          this.el.find('#modal-inner').detach();
          this.childViews.each(function(index, item){
            item.dispose();
          });
          this.childViews.clear();
          this.trigger('modalClosed');
        }.bind(this), 20);
      }.bind(this));
      this.el.removeClass('show');
    },
    dispose:function(){
      View.prototype.dispose.apply(this,arguments);
    }
  });
  return new ModalView('#modal-container');
});
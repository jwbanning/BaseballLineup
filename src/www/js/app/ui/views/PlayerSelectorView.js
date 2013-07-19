define(function(require) {

  var View = require('lavaca/mvc/View');
  require('rdust!templates/playerSelector');

  var PlayerSelectorView = View.extend(function(){
    View.apply(this, arguments);
    this.render();
  },{

    template: 'templates/playerSelector',

    className: 'playerSelector',
    onRenderSuccess: function(){
      View.prototype.onRenderSuccess.apply(this, arguments);
    }
  });

  return PlayerSelectorView;

});

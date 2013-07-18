define(function(require) {

  var BaseView = require('./BaseView');
  require('rdust!templates/field');
  /**
   * SetLineup view type
   * @class app.ui.views.SetLineup
   * @extends app.ui.views.BaseView
   */
  var FieldView = BaseView.extend(function(){
    BaseView.apply(this, arguments);
  },{
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/field',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'field',
    onRenderSuccess: function(){
      BaseView.prototype.onRenderSuccess.apply(this, arguments);

    }

  });

  return FieldView;

});

define(function(require) {

  var BaseView = require('./BaseView');
  require('rdust!templates/setlineup');
  var Config = require('lavaca/util/Config');

  /**
   * SetLineup view type
   * @class app.ui.views.SetLineup
   * @extends app.ui.views.BaseView
   */
  var SetLineupView = BaseView.extend({
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'example'
     */
    template: 'templates/setlineup',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'example'
     */
    className: 'setLineUp'

  });

  return SetLineupView;

});

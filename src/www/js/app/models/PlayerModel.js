define(function(require) {
  var Model = require('lavaca/mvc/Model');
  var APIdoc = require('app/utils/ApiDoc');

  var PlayerModel = Model.extend(function() {
    Model.apply(this, arguments);
    _fetch.call(this);
  },{

  });

  function _fetch() {
    APIdoc.getPlayerDetails(this.get('id')).then(function(response) {
      this.set('data', response.results[0]);
      this.trigger('change');
    }.bind(this));
  }

  return PlayerModel;
});

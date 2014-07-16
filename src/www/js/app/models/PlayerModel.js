define(function(require) {
  var Player = require('lavaca/mvc/Model');
  var APIdoc = require('app/utils/ApiDoc');


  function _fetch() {
    debugger;
    APIdoc.getPlayerDetails().then(function(response) {
      this.add(response.results);
      this.trigger('change');
      this.trigger('fetchSuccess');
    }.bind(this));
  }
  return new Player();
});
define(function(require) {
  var Collection = require('lavaca/mvc/Collection');
  var APIdoc = require('app/utils/ApiDoc');

  var TeamCollection = Collection.extend(function() {
    Collection.apply(this, arguments);
    _fetch.call(this);
  },{
    itemsProperty: 'player',
  });

  function _fetch() {
    APIdoc.getPlayers().then(function(response) {
      this.add(response.results);
      this.sort('battingPosition', false);
      this.trigger('change');
    }.bind(this));
  }
  return TeamCollection;
});

define(function(require) {
  var Collection = require('lavaca/mvc/Collection');
  var APIdoc = require('app/utils/ApiDoc');

  var TeamCollection = Collection.extend(function() {
    Collection.apply(this, arguments);
    _fetch.call(this);
  },{
    itemsProperty: 'player',

    sortBattingOrder:function() {
      this.sort('battingPosition')
    },
    sortName:function() {
      this.sort('Name')
    },
    sortThrows:function() {
      this.sort('Throws')
    },
    sortPosition:function() {
      this.sort('Position')
    },
  });

  function _fetch() {
    APIdoc.getPlayers().then(function(response) {
      this.add(response.results);
      this.sort('Name');
      this.trigger('change');
      this.trigger('fetchSuccess');
    }.bind(this));
  }
  return new TeamCollection();
});

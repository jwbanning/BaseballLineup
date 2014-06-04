define(function(require) {
  var Collection = require('lavaca/mvc/collection');
  var teamCollection = Collection.extend(function() {
    Collection.apply(this, arguments);
    _fetch.call(this);
  },{
    itemsProperty: 'player',
  });

  function _fetch() {
    // debugger;
    this.fetch('/mock/team.json').always(function(response) {
      this.sort('battingPosition', false);
      this.trigger('change');
    });
  }
  return teamCollection;
});

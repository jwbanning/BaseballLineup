define(function(require) {
  var Collection = require('lavaca/mvc/collection');
  var teamCollection = Collection.extend(function() {
    Collection.apply(this, arguments);
  },{
    itemsProperty: 'player'
  });
  return teamCollection;
});

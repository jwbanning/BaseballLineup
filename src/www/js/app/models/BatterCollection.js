define(function(require) {
  var Collection = require('lavaca/mvc/Collection');
  var APIdoc = require('app/utils/ApiDoc');

  var BatterCollection = Collection.extend(function() {
    Collection.apply(this, arguments);
    _fetch.call(this);
  },{
    itemsProperty: 'batter',
    updateBattingOrder:  function(){
      APIdoc.updateBattingOrder(this.toObject()).success(function(status) {
      });
    }
  });

  function _fetch() {
    APIdoc.getPlayers().then(function(response) {
      this.players = response.results;
      determineActive.call(this);
      this.trigger('change');
      this.trigger('fetchSuccess');
    }.bind(this));
  }

  function determineActive() {
    var active = [];
    var inactive = [];
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].battingPosition > 0) {
        this.add(this.players[i]);
        active.push(this.players[i]);
      }
      else {
        inactive.push(this.players[i]);
      }
    };
   
    this.set('active', active);
    this.set('inactive',inactive);
    this.sort('battingPosition');

  }
  return BatterCollection;
});

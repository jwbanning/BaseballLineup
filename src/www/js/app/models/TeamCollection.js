define(function(require) {
	var Collection = require('lavaca/mvc/collection'),
	Promise = require('lavaca/util/Promise'),
	stateModel = require('app/models/StateModel'),
    ajax = require('$');
	playerModel = require('app/models/PlayerModel');

	var teamCollection = Collection.extend(function() {
		Collection.apply(this, arguments);
	},{
	//get the data
	fetch: function() {
		var promise = new Promise();
		this.fetchAllAvailable()
		.then(function() {
            promise.resolve();
        }.bind(this));
      return promise;
    },
    fetchAllAvailable: function() {
        //return this.service.request('mock/team.json');
        return $.ajax({
            url: '/mock/team.json',
            dataType: 'json'
          })
          .then(function(data) {
            //console.log(data);
            this.add(data);
          }.bind(this));
    },
    dispose: function() {

	}
	});
	return teamCollection;
});

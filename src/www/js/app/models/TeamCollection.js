(function(ns, BaseCollection, Promise, StringUtils) {

ns.team = BaseCollection.extend(function() {
this.fetch();
}, {

	//get all Players from the Mock data. 

	  fetch: function() {
	    return this.service.request('mock/team.json')
	      .then(function(data) {
	        this.clear();
	        this.add(data.recentlyViewed);

	        this.trigger('reset');
	      }.bind(this));
	  }
	}
}
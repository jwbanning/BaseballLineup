define(function(require) {

  var Service = require('app/utils/Service'),
      Config = require('lavaca/util/Config');

  var APIdoc = {
    endpoint:Config.get('parseClass'),
  
    getPlayers: function() {
      //var brewery = 'where={"brewery":"'+this.endpoint+'"}'
      return Service.makeRequest('classes/players', '', 'GET');
    },
    updateBattingOrder: function(obj) {
      var requestArray = [];
      for (var i = 0; i < obj.batter.length; i++) {
        var foo =  {
            "method": "PUT",
            "path": "/1/classes/players/"+obj.batter[i].objectId,
            "body": {
              "battingPosition": obj.batter[i].battingPosition
            }
          }
        requestArray.push(foo);
      }
      // var request = JSON.stringify(requestArray);
      // var qPut = {"requests": request};
      return Service.makeRequest('batch', {"requests":requestArray}, 'POST');
    },
    // VINCE CODE AFTER
    removeInventory: function(id) {
      return Service.makeRequest('classes/currentBeers/'+id, null, 'DELETE');
    },
    editInventoryItem: function(obj, id) {
      return Service.makeRequest('classes/currentBeers/'+id, obj, 'PUT');
    },
    setInventory: function(inventory, id) {
      if (id) {
        var type = 'PUT';
      }
      else {
        var type = 'POST';
        id = '';
      }
      return Service.makeRequest('classes/breweryProfile/'+id, {'computerReadInventory':inventory, 'brewery': this.endpoint}, type);
    },

    getLocations: function(id, destinationLocationLat,destinationLocationLong, numberOfLocations) {
      if (!numberOfLocations) {
        numberOfLocations = 50;
      };
      var c = 'limit='+numberOfLocations+'&where={"geoPoint":{"$nearSphere":{"__type":"GeoPoint","latitude":'+destinationLocationLat+',"longitude":'+destinationLocationLong+'},"$maxDistanceInMiles":50000.0}}';
      return Service.makeRequest('classes/'+this.endpoint, c, 'GET');
    },
    getLocationForReview: function(skip) {
      if (skip) {
        var limit = 'keys=LocationId,LocationName,LocationType,LocationAddress,LocationCity,LocationState,LocationBeers,active&limit=1000&skip='+skip
      }
      else {
        var limit = 'keys=LocationId,LocationName,LocationType,LocationAddress,LocationCity,LocationState,LocationBeers,active&limit=1000'
      }
      return Service.makeRequest('classes/'+this.endpoint, limit, 'GET');
    },


    submitLocation: function(obj) {
      return Service.makeRequest('classes/'+this.endpoint, obj, 'POST');
    },
    editLocationActive: function(active, id) {
      return Service.makeRequest('classes/'+this.endpoint+'/'+id, {'active': active}, 'PUT');
    },
    editLocation: function(obj, id) {
      return Service.makeRequest('classes/'+this.endpoint+'/'+id, obj, 'PUT');
    },
    removeLocation: function(id) {
      return Service.makeRequest('classes/'+this.endpoint+'/'+id, null, 'DELETE');
    },

  };

  return APIdoc;
});
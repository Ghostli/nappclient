angular.module('notepadApp').service('Variables', function($q) {
  var userId = -1;
  var serverAdress = 'https://46.101.191.174:8443/';
  return {
    getUserId: function() {
      return this.userId;
    },
    setUserId: function(id){
      this.userId = id;
    }
  };
});

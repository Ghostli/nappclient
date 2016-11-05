angular.module('notepadApp').factory('User', function($resource){
    return $resource(Variables.serverAddress + 'user/:id');
});
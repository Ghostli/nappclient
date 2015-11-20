
angular.module('notepadApp').controller('NoteController', function($scope, $state, $ionicHistory, $resource, $stateParams, Variables){

  var id = $stateParams.id;
  if(id !== ""){
    var userId = Variables.getUserId();
    $scope.note = $resource('https://46.101.191.174:8443/' + userId + '/notes/' + id).get();
  }else{
    $scope.note = {};
  }

  $scope.back = function() {
    $state.go('notes', {}, {reload: true});
  };

  $scope.saveNote = function() {
    var note = $scope.note;
    var userId = Variables.getUserId();
    if(note.id !== undefined){
        $scope.note = $resource('https://46.101.191.174:8443/' + userId + '/notes/' + id, null, {
          'update': {method:'PUT'}
        }).update(note);
        $state.go('notes', {}, {reload: true});
        $scope.$emit('reloadNotes');
    }else{
        $resource('https://46.101.191.174:8443/' + userId + '/notes/').save(note);
        $state.go('notes', {}, {reload: true});
        $scope.$emit('reloadNotes');
    }
  };
});


angular.module('notepadApp').controller('NoteController', function($scope, $state, $resource, $stateParams, Variables, Notification){

  var id = $stateParams.id;
  if(id !== ""){
    $scope.note = $resource(Variables.serverAddress + userId + '/notes/' + id).get();
  }else{
    $scope.note = {};
  }

  $scope.back = function() {
    $state.go('notes', {}, {reload: true});
  };

  $scope.saveNote = function() {
    var note = $scope.note;
    var userId = Variables.getUserId();

    if(note.title === undefined || note.content === undefined){
      Notification.show('Wypełnij pola');
      return;
    }

    if(note.id !== undefined){
        $scope.note = $resource('https://46.101.191.174:8443/' + userId + '/notes/' + id, null, {
          'update': {method:'PUT'}
        }).update(note);
        $state.go('notes', {}, {reload: true});
        $scope.$emit('reloadNotes');
        Notification.show('Zaktualizowano notatkę');
    }else{
        $resource('https://46.101.191.174:8443/' + userId + '/notes/').save(note);
        $state.go('notes', {}, {reload: true});
        $scope.$emit('reloadNotes');
        Notification.show('Dodano notatkę');
    }
  };
});


angular.module('notepadApp').controller('ItemListController', function($scope, $http, $ionicPopup, $state, $ionicHistory, $resource, $ionicSideMenuDelegate, Variables, Notification, User){

  $scope.data = {
    showDelete: false
  };

  $scope.$on('reloadNotes', function() {
    $scope.loadNotes();
  });

  $scope.onItemDelete = function(note) {
    $resource('https://46.101.191.174:8443/' + Variables.getUserId(1) + '/notes/' + note.id).delete();
    $scope.notes.splice($scope.notes.indexOf(note), 1);
  };

  $scope.loadNotes = function(){
    var sessionToken = sessionStorage.getItem("token");
    var userId = sessionStorage.getItem("userId");
    $http.defaults.headers.common['x-access-token'] =  sessionToken;
    var user = $User.get({ id: userId}, function () {
      console.log(user)
    })
  };

  $scope.toggleSideMenu = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.addNewNote = function(){
    $state.go('note');
  };

  $scope.logout = function() {
    $ionicHistory.clearCache();
    $state.go('login', {}, {reload: true});
  };

  $scope.deleteAccount = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Usuwania konta',
      template: 'Czy na pewno chcesz usunąć konto?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        // var userId = Variables.getUserId();
        var registerUrl = "https://46.101.191.174:8443" + "/unregister?userId=" + userId;
        $http({ method: 'POST', url: registerUrl }).success(function (response){
          $state.go('login');
          Notification.show("Usunięto konto");
        }).error(function (data, status, response){
          if(status === 0){
            Notification.show('Błąd połączenia');
          }else if(status == 406){
            Notification.show('Błąd usuwania konta');
          }
        });
      }
    });
  };

  $scope.loadNotes();
});

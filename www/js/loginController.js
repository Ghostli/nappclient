
angular.module('notepadApp').controller('LoginController', function($state, $http, $scope, $rootScope, $ionicHistory, $ionicLoading, $cordovaToast, Variables, Notification){

  $scope.user = { };

  $scope.login = function() {
    var user = $scope.user;
    var registerUrl = "https://46.101.191.174:8443" + "/login?login=" + user.loginField + "&password=" + user.password;
    $http({ method: 'GET', url: registerUrl }).success(function (response){
      var id = response.userId;
      Variables.setUserId(id);
      $state.go('notes', {}, {reload: true});
      Notification.show('Zalogowano');
    }).error(function (data, status, response){
      if(status === 0){
          Notification.show('Błąd połączenia');
      }else if(status == 406){
          Notification.show('Błąd logowania');
      }
    });
  };

  $scope.register = function(){
    var user = $scope.user;

    if(user.loginField === undefined || user.password === undefined){
      Notification.show('Wypełnij wszystkie pola');
      return;
    }

    if(user.loginField.length < 5){
      Notification.show('Login musi mieć ponad 6 znaków');
      return;
    }

    if(user.password.length < 6){
      Notification.show('Hasło musi mieć ponad 6 znaków');
      return;
    }

    var registerUrl = "https://46.101.191.174:8443" + "/register?login=" + user.loginField + "&password=" + user.password;
    $http({ method: 'GET', url: registerUrl }).success(function (response){
      Variables.setUserId(response.userId);
      $state.go('notes', {}, {reload: true});
      Notification.show('Zarejestrowano');
    }).error(function (data, status, response){
      if(status === 0){
          Notification.show('Błąd połączenia');
      }else if(status == 406){
          Notification.show('Błąd rejestracji');
      }
    });
  };
});

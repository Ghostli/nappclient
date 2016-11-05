
angular.module('notepadApp').controller('LoginController', function($state, $http, $scope, $rootScope, $ionicHistory, $ionicLoading, $cordovaToast, Variables, Notification){

  $scope.user = { };

  $scope.login = function() {
    var user = $scope.user;
    var loginUrl = Variables.serverAddress + "login";

    $http({ method: 'POST', url: loginUrl, data: { email: user.loginField, password: user.password} }).success(function (response){
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("userId", response.userId);
      Notification.show('Zalogowano');
      $state.go("itemList")
    }).error(function (data, status){
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

    var registerUrl = Variables.serverAddress + "register"
    $http({ method: 'POST', url: registerUrl, data: { email: user.loginField, password: user.password} }).success(function (response){
      console.log(response.message)
      Notification.show(response.message);
    }).error(function (data, status, response){
      if(status === 0){
          Notification.show('Błąd połączenia');
      }else if(status == 406){
          Notification.show('Błąd rejestracji');
      }
    });
  };
});

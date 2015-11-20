
angular.module('notepadApp').controller('LoginController', function($state, $http, $scope, $rootScope, $ionicHistory, $ionicLoading, $cordovaToast, Variables){

  $scope.user = { };

  $scope.login = function() {
    var user = $scope.user;
    var registerUrl = "https://46.101.191.174:8443" + "/login?login=" + user.loginField + "&password=" + user.password;
    $http({ method: 'GET', url: registerUrl }).success(function (response){
      var id = response.userId;
      Variables.setUserId(id);
      $state.go('notes', {}, {reload: true});
      alert('Zalogowano');
    }).error(function (data, status, response){
      if(status === 0){
          alert('Błąd połączenia');
      }else if(status == 406){
          alert('Błąd logowania');
      }
    });
  };

  $scope.register = function(){
    var user = $scope.user;

    if(user.loginField === undefined || user.password === undefined){
      alert('Wypełnij wszystkie pola');
      return;
    }

    if(user.loginField.length < 5){
      //$scope.showToast('Login musi mieć ponad 5 znaków', 'short', 'bottom');
      alert('Login musi mieć ponad 6 znaków');
      return;
    }

    if(user.password.length < 6){
      //$scope.showToast('Hasło musi mieć ponad 6 znaków', 'short', 'bottom');
      alert('Hasło musi mieć ponad 6 znaków');
      return;
    }

    var registerUrl = "https://46.101.191.174:8443" + "/register?login=" + user.loginField + "&password=" + user.password;
    $http({ method: 'GET', url: registerUrl }).success(function (response){
      var id = response.userId;
      Variables.setUserId(id);
      $state.go('notes', {}, {reload: true});
      $scope.showToast('Zarejestrowano', 'short', 'bottom');
    }).error(function (data, status, response){
      console.log(response);
      if(status === 0){
          alert('Błąd połącenia');
      }else if(status == 406){
          alert('Błąd rejestracji');
      }
    });
  };
});

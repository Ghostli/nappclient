// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('notepadApp', ['ionic', 'ngCordova', 'ngResource'])
.service('Variables', function($q) {
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
})

.config(function($stateProvider, $urlRouterProvider){

  //$scope.serverAdress = "https://localhost:8443";

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'login.html',
    controller: 'LoginController'
  })
  .state('notes', {
    url: '/notes',
    templateUrl: 'noteList.html',
    controller: 'NoteListController'
  }).state('note', {
    url: '/note/{id}',
    templateUrl: 'note.html',
    controller: 'NoteController'
  });

  $urlRouterProvider.otherwise('/login');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('NoteListController', function($scope, $state, $ionicHistory, $resource, Variables){

  $scope.data = {
    showDelete: false
  };

  $scope.onItemDelete = function(note) {
    $resource('https://46.101.191.174:8443/' + Variables.getUserId(1) + '/notes/' + note.id).delete();
    $scope.notes.splice($scope.notes.indexOf(note), 1);
  };

  $scope.loadNotes = function(){
    var userId = Variables.getUserId();
    if(userId !== undefined){
        $scope.notes = $resource('https://46.101.191.174:8443/' + userId + '/notes/').query();
      }
  };

  $scope.addNewNote = function(){
    $state.go('note');
  };

  $scope.logout = function() {
    $ionicHistory.clearCache();
    Variables.setUserId(-1);
    $state.go('login', {}, {reload: true});
  };

  $scope.loadNotes();
})

.controller('NoteController', function($scope, $state, $ionicHistory, $resource, $stateParams, Variables){
  var id = $stateParams.id;
  if(id !== ""){
    var userId = Variables.getUserId();
    $scope.note = $resource('https://46.101.191.174:8443/' + userId + '/notes/' + id).get();
  }else{
    $scope.note = {};
  }


  $scope.saveNote = function() {
    var note = $scope.note;
    var userId = Variables.getUserId();
    if(note.id !== undefined){
        $scope.note = $resource('https://46.101.191.174:8443/' + userId + '/notes/' + id, null, {
          'update': {method:'PUT'}
        }).update(note);
        $state.go('notes', {}, {reload: true});
    }else{
        $resource('https://46.101.191.174:8443/' + userId + '/notes/').save(note);
        $state.go('notes', {}, {reload: true});
    }
  };
})

.controller('LoginController', function($state, $http, $scope, $rootScope, $ionicHistory, $ionicLoading, $cordovaToast, Variables){

  $scope.user = { };

  $scope.showToast = function(message, duration, location) {
    $cordovaToast.show(message, duration, location).then(function(success) {
      console.log("The toast was shown");
    }, function (error) {
      console.log("The toast was not shown due to " + error);
    });
  };

  $scope.login = function() {
    var user = $scope.user;
    var registerUrl = "https://46.101.191.174:8443" + "/login?login=" + user.loginField + "&password=" + user.password;
    $http({ method: 'GET', url: registerUrl }).success(function (response){
      var id = response.userId;
      Variables.setUserId(id);
      $ionicHistory.clearCache();
      $state.go('notes', {}, {reload: true});
      $scope.showToast('Login successful', 'short', 'bottom');
    }).error(function (data, status, response){
      console.log(response);
      if(status === 0){
          $scope.showToast('Connection failed', 'short', 'bottom');
      }else if(status == 406){
          $scope.showToast('Login failed', 'short', 'bottom');
      }
    });

  };

  $scope.register = function(){
    var user = $scope.user;

    if(user.loginField.length < 5){
      $scope.showToast('Login must have more than 5 characters', 'short', 'bottom');
      return;
    }

    if(user.password.length < 6){
      $scope.showToast('Password must have more than 5 characters', 'short', 'bottom');
      return;
    }

    var registerUrl = "https://46.101.191.174:8443" + "/register?login=" + user.loginField + "&password=" + user.password;
    $http({ method: 'GET', url: registerUrl }).success(function (response){
      var id = response.userId;
      Variables.setUserId(id);
      $ionicHistory.clearCache();
      $state.go('notes', {}, {reload: true});
      $scope.showToast('Registered new user', 'short', 'bottom');
    }).error(function (data, status, response){
      console.log(response);
      if(status === 0){
          $scope.showToast('Connection failed', 'short', 'bottom');
      }else if(status == 406){
          $scope.showToast('Register failed', 'short', 'bottom');
      }
    });
  };
}


);

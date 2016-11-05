// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('notepadApp', ['ionic', 'ngCordova', 'ngResource', 'ngStorage'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'login.html',
    controller: 'LoginController',
    cache: false
  })
  .state('itemList', {
    url: '/items',
    templateUrl: 'itemList.html',
    controller: 'ItemListController',
    cache: false
  }).state('item', {
    url: '/item/{id}',
    templateUrl: 'item.html',
    controller: 'ItemController',
    cache: false
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
});

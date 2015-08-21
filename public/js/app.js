var app = angular.module('voteApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html',
      controller: 'HomeCtrl'
    })
    .state('admin', {
      templateUrl: './views/admin.html',
      controller: 'AdminCtrl'
    });
});

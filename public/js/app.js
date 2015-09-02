var app = angular.module('voteApp', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main/home");

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: './views/main.html',
      controller: 'MainCtrl'
    })
    .state('main.home', {
      url: '/home',
      templateUrl: './views/main.home.html',
      controller: 'HomeCtrl'
    })
    .state('main.comments', {
      url: '/comments/:billId',
      templateUrl: './views/main.comments.html',
      controller: 'CommentsCtrl',
      resolve: {
        bill: function(commentsService, $stateParams) {
          return commentsService.getComments($stateParams.billId);
        }
      }
    })
    .state('main.profile', {
      url: '/profile/:userId',
      templateUrl: './views/main.profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        user: function(profileService, $stateParams) {
          return profileService.getUser($stateParams.userId);
        }
      }
    });
});

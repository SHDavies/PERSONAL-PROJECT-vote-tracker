app.controller('MainCtrl', function($scope, mainService, $cookies, $modal) {
  if ($cookies.getObject('signedIn')) {
    $scope.signedIn = true;
    $scope.user = $cookies.getObject('signedIn');
  } else {
    $cookies.putObject('signedIn', "");
    $scope.signedIn = false;
  }

  $scope.signedInAlerts = [];

  $scope.openSignUp = function() {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: "signUpModal.html",
      controller: 'SignUpCtrl'
    });

    modalInstance.result.then(function(user) {
      $scope.user = user;
      $cookies.putObject('signedIn', $scope.user);
      $scope.signedIn = true;
      $scope.$broadcast('authEvent');
    });
  };

  $scope.openSignIn = function() {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: "signInModal.html",
      controller: 'SignInCtrl'
    });

    modalInstance.result.then(function(user) {
      $scope.user = user;
      $cookies.putObject('signedIn', $scope.user);
      $scope.signedIn = true;
      $scope.$broadcast('authEvent');
    });
  };

  $scope.logout = function() {
    mainService.logout().then(function() {
      $cookies.putObject('signedIn', "");
      $scope.signedIn = false;
      $scope.signedInAlerts.push({type: 'success', msg: "Logout successful"});
      $scope.user = {};
      $scope.$broadcast('authEvent');
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.closeSignedInAlert = function(index) {
    $scope.signedInAlerts.splice(index, 1);
  };
});

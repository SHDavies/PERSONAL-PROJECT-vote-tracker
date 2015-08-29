app.controller('MainCtrl', function($scope, mainService, $cookies) {
  if ($cookies.getObject('signedIn') === 1) {
    $scope.signedIn = true;
  } else {
    $cookies.putObject('signedIn', 0);
    $scope.signedIn = false;
  }
  $scope.alerts = [];
  $scope.logoutAlerts = [];

  $scope.addUser = function() {
    if ($scope.newUserPassword !== $scope.verifyNewUserPassword) {
      $scope.alerts.push({type: "danger", msg: "Passwords do not match. Please try again."});
    } else {
      mainService.addUser($scope.newUsername, $scope.newUserPassword)
      .then(function(response) {
        $scope.newUsername = "";
        $scope.newUserPassword = "";
        $scope.verifyNewUserPassword = "";
        $scope.alerts.push({type: "success", msg: "User successfully created! Please log in."});
      });
    }
  };

  $scope.signIn = function() {
    mainService.signIn($scope.existingUsername, $scope.existingUserPassword)
    .then(function(response) {
      $scope.existingUsername = '';
      $scope.existingUserPassword = '';
      $cookies.putObject('signedIn', 1);
      $scope.signedIn = true;
      $scope.alerts.push({type: 'success', msg: "Log in successful!"});
    }, function(error) {
      $scope.alerts.push({type: 'danger', msg: "Username/Password combination not valid"});
    });
  };

  $scope.logout = function() {
    mainService.logout().then(function() {
      $cookies.putObject('signedIn', 0);
      $scope.signedIn = false;
      $scope.logoutAlerts.push({type: 'success', msg: "Logout successful"});
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.closeLogoutAlert = function(index) {
    $scope.logoutAlerts.splice(index, 1);
  };
});

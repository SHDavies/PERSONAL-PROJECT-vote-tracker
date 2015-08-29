app.controller('MainCtrl', function($scope, mainService) {
  $scope.alerts = [];

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
      $scope.signedIn = true;
      $scope.alerts.push({type: 'success', msg: "Log in successful!"});
    }, function(error) {
      $scope.alerts.push({type: 'danger', msg: "Username/Password combination not valid"});
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});

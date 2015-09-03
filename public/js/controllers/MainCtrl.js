app.controller('MainCtrl', function($scope, mainService, $cookies, $modal, $modalInstance) {
  if ($cookies.getObject('signedIn')) {
    $scope.signedIn = true;
    $scope.user = $cookies.getObject('signedIn');
  } else {
    $cookies.putObject('signedIn', "");
    $scope.signedIn = false;
  }
  $scope.alerts = [];
  $scope.signedInAlerts = [];

  $scope.open = function(modal) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: modal
    });

    modalInstance();
  };

  $scope.addUser = function() {
    if ($scope.newUserPassword !== $scope.verifyNewUserPassword) {
      $scope.alerts.push({type: "danger", msg: "Passwords do not match. Please try again."});
    } else {
      mainService.addUser($scope.newUsername, $scope.newUserPassword)
      .then(function(response) {
        $scope.newUsername = "";
        $scope.newUserPassword = "";
        $scope.verifyNewUserPassword = "";
        $modalInstance.close();
      });
    }
  };

  $scope.signIn = function() {
    mainService.signIn($scope.existingUsername, $scope.existingUserPassword)
    .then(function(response) {
      $scope.user = response;
      $scope.existingUsername = '';
      $scope.existingUserPassword = '';
      $cookies.putObject('signedIn', $scope.user);
      $scope.signedIn = true;
      $modalInstance.close();
    }, function(error) {
      $scope.alerts.push({type: 'danger', msg: "Username/Password combination not valid"});
    });
  };

  $scope.logout = function() {
    mainService.logout().then(function() {
      $cookies.putObject('signedIn', "");
      $scope.signedIn = false;
      $scope.signedInAlerts.push({type: 'success', msg: "Logout successful"});
      $scope.user = {};
    });
  };

  $scope.close = function() {
    $modalInstance.dismiss();
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.closeSignedInAlert = function(index) {
    $scope.signedInAlerts.splice(index, 1);
  };
});

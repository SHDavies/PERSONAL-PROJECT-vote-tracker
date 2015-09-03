app.controller('SignUpCtrl', function($scope, $modalInstance, mainService) {
  $scope.alerts = [];

  $scope.close = function() {
    $modalInstance.dismiss();
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
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
        $modalInstance.close(response);
      });
    }
  };
});

app.controller('SignInCtrl', function($scope, $modalInstance, mainService){
  $scope.alerts = [];

  $scope.close = function() {
    $modalInstance.dismiss();
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.signIn = function() {
    mainService.signIn($scope.existingUsername, $scope.existingUserPassword)
    .then(function(response) {
      $scope.existingUsername = '';
      $scope.existingUserPassword = '';
      $modalInstance.close(response);
    }, function(error) {
      $scope.alerts.push({type: 'danger', msg: "Username/Password combination not valid"});
    });
  };
});

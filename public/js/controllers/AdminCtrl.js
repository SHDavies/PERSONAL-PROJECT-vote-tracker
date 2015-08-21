app.controller('AdminCtrl', function($scope, adminService) {
  $scope.addBill = function() {
    var billObj = {
      official_title: $scope.officialTitle,
      short_title: $scope.shortTitle,
      description: $scope.billDescription,
      status: $scope.status,
      results: {
        house_votes: {
          aye: $scope.houseVotesFor,
          nay: $scope.houseVotesAgainst,
          present: $scope.houseVotesPresent
        },
        senate_votes: {
          aye: $scope.senateVotesFor,
          nay: $scope.senateVotesAgainst,
          present: $scope.senateVotesPresent
        }
      }
    };
    adminService.addBill(billObj).then(function(response) {
      alert("The bill was successfully added");
      $scope.officialTitle = "";
      $scope.shortTitle = "";
      $scope.billDescription = "";
      $scope.status = "";
      $scope.houseVotesFor = "";
      $scope.houseVotesAgainst = "";
      $scope.houseVotesPresent = "";
      $scope.senateVotesFor = "";
      $scope.senateVotesAgainst = "";
      $scope.senateVotesPresent = "";
    });
  };
});

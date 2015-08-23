app.controller('HomeCtrl', function($scope, homeService) {
  $scope.getAllBills = function() {
    homeService.getAllBills().then(function(response) {
      $scope.bills = response;
    });
  };

  $scope.bills = $scope.getAllBills();

  $scope.billVote = function(vote, index) {
    var billId = bills[index]._id;
    homeService.billVote(vote, billId)
  }
});

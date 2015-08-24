app.controller('HomeCtrl', function($scope, homeService) {
  $scope.getAllBills = function() {
    homeService.getAllBills().then(function(response) {
      $scope.bills = response;
    });
  };

  $scope.bills = $scope.getAllBills();

  $scope.showDescription = false;

  $scope.billVote = function(vote, index) {
    var billId = $scope.bills[index]._id;
    if (vote === "up") {
      if (!$scope.bills[index].vote) {
        $scope.bills[index].vote = "up";
        homeService.billVote('up', billId).then(function(response) {
          $scope.bills[index].upvotes++;
        });
      } else if ($scope.bills[index].vote === "up") {
        $scope.bills[index].vote = "";
        homeService.billVote('unUp', billId).then(function(response) {
          $scope.bills[index].upvotes--;
        });
      } else if ($scope.bills[index].vote === "down") {
        $scope.bills[index].vote = "up";
        homeService.billVote('downToUp', billId).then(function(response) {
          $scope.bills[index].upvotes++;
          $scope.bills[index].downvotes--;
        });
      }
    } else if (vote === "down") {
      if (!$scope.bills[index].vote) {
        $scope.bills[index].vote = "down";
        homeService.billVote('down', billId).then(function(response) {
          $scope.bills[index].downvotes++;
        });
      } else if ($scope.bills[index].vote === "up") {
        $scope.bills[index].vote = "down";
        homeService.billVote('upToDown', billId).then(function(response) {
          $scope.bills[index].upvotes--;
          $scope.bills[index].downvotes++;
        });
      } else if ($scope.bills[index].vote === "down") {
        $scope.bills[index].vote = "";
        homeService.billVote('unDown', billId).then(function(response) {
          $scope.bills[index].downvotes--;
        });
      }
    }
  };
});

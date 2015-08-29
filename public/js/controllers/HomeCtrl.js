app.controller('HomeCtrl', function($scope, homeService, $cookies) {

  $scope.alerts = [];

  $scope.getAllBills = function() {
    homeService.getAllBills().then(function(response) {
      $scope.bills = response;
    });
  };

  $scope.bills = $scope.getAllBills();

  $scope.showDescription = false;

  $scope.billVote = function(vote, index) {
    if ($scope.$parent.signedIn) {
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
    } else {
      $scope.alerts.push({type:'danger', msg:'You must sign in to vote'});
    }
  };

  $scope.addBill = function() {
    var billObj = {
      official_title: $scope.official_title,
      short_title: $scope.short_title,
      description: $scope.description,
      status: $scope.status,
      results: {
        house_votes: $scope.house_votes,
        senate_votes: $scope.senate_votes
      },
      created_by: $cookies.getObject('signedIn').username
    };
    homeService.addBill(billObj).then(function(response) {

    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});

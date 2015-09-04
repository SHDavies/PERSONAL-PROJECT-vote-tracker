app.controller('HomeCtrl', function($scope, homeService, $cookies, $position) {

  $scope.alerts = [];

  $scope.getAllBills = function() {
    homeService.getAllBills().then(function(response) {
      $scope.bills = response;
      if($cookies.getObject('signedIn')) {
        var user = $cookies.getObject('signedIn');
        var upvoteArray = user.upvotes;
        var downvoteArray = user.downvotes;
        for (var bill in $scope.bills) {
          var billId = $scope.bills[bill]._id;
          if (upvoteArray.map(function(x) {return x.bill;}).indexOf(billId) === -1 && downvoteArray.map(function(x) {return x.bill;}).indexOf(billId) === -1) {
            $scope.bills[bill].voteStatus = "";
          } else if (upvoteArray.map(function(x) {return x.bill;}).indexOf(billId) !== -1) {
            $scope.bills[bill].voteStatus = "upvoted";
          } else if (downvoteArray.map(function(x) {return x.bill;}).indexOf(billId) !== -1) {
            $scope.bills[bill].voteStatus = "downvoted";
          }
        }
      }
    });
  };

  $scope.bills = $scope.getAllBills();

  $scope.showDescription = false;

  $scope.billVote = function(vote, index) {
    if ($scope.$parent.signedIn) {
      var user = $cookies.getObject('signedIn');
      var userId = user._id;
      var billId = $scope.bills[index]._id;
      var upvoteIndex = user.upvotes.map(function(x) {return x.bill;}).indexOf(billId);
      var downvoteIndex = user.downvotes.map(function(x) {return x.bill;}).indexOf(billId);
      if (vote === "up") {
        if (upvoteIndex === -1 && downvoteIndex === -1) {
          homeService.billVote('up', userId, billId).then(function(response) {
            $scope.bills[index].upvotes++;
            $scope.bills[index].voteStatus = "upvoted";
            $cookies.putObject('signedIn', response);
          });
        } else if (upvoteIndex !== -1) {
          homeService.billVote('unUp', userId, billId, user.upvotes[upvoteIndex]._id).then(function(response) {
            $scope.bills[index].upvotes--;
            $scope.bills[index].voteStatus = "";
            $cookies.putObject('signedIn', response);
          });
        } else if (downvoteIndex !== -1) {
          homeService.billVote('downToUp', userId, billId, user.downvotes[downvoteIndex]._id).then(function(response) {
            $scope.bills[index].upvotes++;
            $scope.bills[index].downvotes--;
            $scope.bills[index].voteStatus = "upvoted";
            $cookies.putObject('signedIn', response);
          });
        }
      } else if (vote === "down") {
        if (upvoteIndex === -1 && downvoteIndex === -1) {
          homeService.billVote('down', userId, billId).then(function(response) {
            $scope.bills[index].downvotes++;
            $scope.bills[index].voteStatus = "downvoted";
            $cookies.putObject('signedIn', response);
          });
        } else if (upvoteIndex !== -1) {
          homeService.billVote('upToDown', userId, billId, user.upvotes[upvoteIndex]._id).then(function(response) {
            $scope.bills[index].upvotes--;
            $scope.bills[index].downvotes++;
            $scope.bills[index].voteStatus = "downvoted";
            $cookies.putObject('signedIn', response);
          });
        } else if (downvoteIndex !== -1) {
          homeService.billVote('unDown', userId, billId, user.downvotes[downvoteIndex]._id).then(function(response) {
            $scope.bills[index].downvotes--;
            $scope.bills[index].voteStatus = "";
            $cookies.putObject('signedIn', response);
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
      created_by: $cookies.getObject('signedIn')._id
    };
    homeService.addBill(billObj).then(function(response) {
      $scope.bills.unshift(response);
      $scope.official_title = '';
      $scope.short_title = '';
      $scope.description = '';
      $scope.status = '';
      $scope.house_votes.aye = '';
      $scope.house_votes.nay = '';
      $scope.house_votes.present = '';
      $scope.senate_votes.aye = '';
      $scope.senate_votes.nay = '';
      $scope.senate_votes.present = '';
      $scope.alerts.push({type: 'important', msg: 'Your bill has successfully been added'});
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});

app.controller('CommentsCtrl', function($scope, commentsService, bill, $cookies) {
  $scope.bill = bill;
  $scope.alerts = [];

  $scope.postComment = function() {
    if($scope.$parent.signedIn) {
      commentsService.postComment($scope.commentArea, $cookies.getObject('signedIn')._id, $scope.bill._id)
      .then(function(response) {
        commentsService.getComments(bill._id).then(function(response) {
          $scope.bill = response;
          $scope.commentArea = "";
        });
      });
    } else {
      $scope.alerts.push({type: 'danger', msg: 'You must be logged in to comment'});
    }
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});

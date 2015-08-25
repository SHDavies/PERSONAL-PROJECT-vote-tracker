app.controller('CommentsCtrl', function($scope, commentsService, bill) {
  $scope.bill = bill;

  $scope.postComment = function() {
    commentsService.postComment($scope.commentArea, $scope.bill._id)
    .then(function(response) {

    });
  };
});

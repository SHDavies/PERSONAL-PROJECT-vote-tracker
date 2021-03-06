app.service('commentsService', function($q, $http) {
  this.getComments = function(billId) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'bill/comments/' + billId
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  this.postComment = function(comment, userId, billId) {
    var date = new Date();
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: 'bill/comments/' + billId,
      data: {
        comment: comment,
        commenter: userId,
        timestamp: date
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
});

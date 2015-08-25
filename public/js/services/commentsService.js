app.service('commentsService', function($q, $http) {
  this.getComments = function(billId) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'http://localhost:4000/bill/comments/' + billId
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  this.postComment = function(comment, billId) {
    var date = new Date();
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: 'http://localhost:4000/bill/comments/' + billId,
      data: {
        comment: comment,
        timestamp: date
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
});

app.service('homeService', function($http, $q) {
  this.getAllBills = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'http://localhost:4000/bill'
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  this.billVote = function(vote, userId, billId, voteId) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: 'http://localhost:4000/bill/' + billId,
      data: {
        vote: vote,
        userId: userId,
        voteId: voteId
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  this.addBill = function(billObj) {
    var deferred = $q.defer();
    $http({
      url: 'http://localhost:4000/bill',
      method: 'POST',
      data: billObj
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
});

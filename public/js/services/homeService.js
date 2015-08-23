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

  this.billVote = function(vote, billId) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: 'http://localhost:4000/bill/' + billId,
      data: {
        vote: vote
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
});

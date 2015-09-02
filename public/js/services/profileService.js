app.service('profileService', function($http, $q) {
  this.getUser = function(userId) {
    var deferred = $q.defer();
    $http({
      method: "GET",
      url: "http://localhost:4000/user/" + userId
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
});

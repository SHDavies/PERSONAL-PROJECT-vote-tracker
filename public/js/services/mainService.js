app.service('mainService', function($q, $http) {
  this.addUser = function(username, password) {
    var deferred = $q.defer();
    $http({
      url: 'user/new',
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    }, function(error) {
      deferred.reject(error.data);
    });
    return deferred.promise;
  };

  this.signIn = function(username, password) {
    var deferred = $q.defer();
    $http({
      url: 'user/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    }, function(error) {
      deferred.reject(error.data);
    });
    return deferred.promise;
  };

  this.logout = function() {
    var deferred = $q.defer();
    $http({
      url: 'user/logout',
      method: 'GET',
    }).then(function() {
      deferred.resolve();
    });
    return deferred.promise;
  };
});

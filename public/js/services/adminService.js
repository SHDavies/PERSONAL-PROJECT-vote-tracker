app.service('adminService', function($q, $http) {
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

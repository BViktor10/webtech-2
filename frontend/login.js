angular.module('loginApp', ['ngMaterial', 'ngMessages'])
  .controller('LoginCtrl', function($scope, $http) {
    $scope.user = {};
    $scope.loading = false;
    $scope.error = null;

    $scope.login = function() {
      $scope.loading = true;
      $scope.error = null;

      $http.post('http://localhost:5000/api/login', $scope.user)
        .then(function(response) {
          window.location.href = '/dashboard.html';
        })
        .catch(function(err) {
          $scope.error = (err.data && err.data.message) || 'Hibás felhasználónév vagy jelszó';
        })
        .finally(function() {
          $scope.loading = false;
        });
    };
  });

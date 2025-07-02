angular.module('dashApp', ['ngMaterial'])
.controller('DashCtrl', function($scope, $http) {

  $scope.products = [];
  $scope.filter   = {};
  $scope.new      = {};

  const api = 'http://localhost:5000/api/products';

  function load(params={}) {
    $http.get(api, { params }).then(res => $scope.products = res.data);
  }
  load();

  $scope.search = () => load($scope.filter);

  $scope.add = () => {
    $scope.error = null;
    $http.post(api, $scope.new)
      .then(() => { load(); $scope.new = {}; })
      .catch(err => { $scope.error = err.data && err.data.msg || 'Hiba'; });
  };
});
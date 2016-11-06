var myApp = angular.module('myModule', ['angularUtils.directives.dirPagination']);

myApp.controller("myController", ['$scope', '$http', function ($scope, $http) {
    $http.get('hw.php')
    .success(function(data) {
        $scope.contents = data.results;
    });
}]);
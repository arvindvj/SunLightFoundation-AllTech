var myApp = angular.module('myModule', ['angularUtils.directives.dirPagination']);

myApp.controller("myController", ['$scope', '$http', function ($scope, $http) {
    debugger;
    console.log("Hello");
    $scope.avail=false;
    $scope.go = function() {
        $scope.avail=true;
    }
    
    $scope.states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District Of Columbia','Florida',
                  'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
                  'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York',
                  'North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
                  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    
    $http.get('leg.json')
    .success(function(data) {
            console.log("Hello");
        //alert(data);

        $scope.contents = data.results;
            console.log(data.results);

    });
    $http.get('bills.json')
    .success(function(response) {
            console.log("Hello");
        // alert(data);

        $scope.stuff = response.results;
            console.log(response.results);

    });
    $http.get('comm.json')
    .success(function(something) {
            console.log("Hello");
        // alert(data);

        $scope.bleh = something.results;
            console.log(something.results);

    });
    /*if (typeof(Storage) !== "undefined") {
        localStorage.setItem("legislators",$scope.contents);
        localStorage.setItem("bills",$scope.stuff);
        localStorage.setItem("committees",$scope.bleh);
    } else {
    // Sorry! No Web Storage support..
    }*/
    $scope.leg = function() {
        document.getElementById("legislator").style.display="block";
        document.getElementById("bill").style.display="none";
        document.getElementById("committee").style.display="none";
    }
    $scope.bil = function() {
        document.getElementById("bill").style.display="block";
        document.getElementById("legislator").style.display="none";
        document.getElementById("committee").style.display="none";
    }
    $scope.comm = function() {
        document.getElementById("committee").style.display="block";
        document.getElementById("legislator").style.display="none";
        document.getElementById("bill").style.display="none";
    }
    
    $scope.legsenate = function() {
        document.getElementById("legsen").style.display="block";
        document.getElementById("leghou").style.display="none";
        document.getElementById("sta").style.display="none";
    }
    $scope.leghouse = function() {
        document.getElementById("leghou").style.display="block";
        document.getElementById("legsen").style.display="none";
        document.getElementById("sta").style.display="none";
    }
    $scope.lega = function() {
        document.getElementById("sta").style.display="block";
        document.getElementById("legsen").style.display="none";
        document.getElementById("leghou").style.display="none";
    }
    
    $scope.comsenate = function() {
        document.getElementById("comsen").style.display="block";
        document.getElementById("comhou").style.display="none";
        document.getElementById("comjoint").style.display="none";
    }
    $scope.comhouse = function() {
        document.getElementById("comhou").style.display="block";
        document.getElementById("comsen").style.display="none";
        document.getElementById("comjoint").style.display="none";
    }
    $scope.comjoint = function() {
        document.getElementById("comjoint").style.display="block";
        document.getElementById("comsen").style.display="none";
        document.getElementById("comhou").style.display="none";
    }
    
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
}]);
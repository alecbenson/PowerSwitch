var iotdash = angular.module('iotdash', []);

iotdash.controller('layoutController', ['$scope', function($scope) {
  //Use material design
  $(document).ready(function(){
    $.material.init();
  });

}]);
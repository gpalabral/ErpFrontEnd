'use strict';

/**
 * @ngdoc function
 * @name myApp1App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myApp1App
 */
angular.module('myApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

/**
 * Created by VLADY on 08/01/2015.
 */

'use strict';
angular.module('myApp').controller('mainCtrl', function($scope,modalService, $rootScope, localStorageService,
                                                        userControlService, serverConf) {
  $scope.documentControls = {
    showLoadingAnimation : false
  };

  $scope.showLoadingAnimation = false;

  $rootScope.handleErrors = function (errorResponse) {
    if( errorResponse && ( errorResponse.code == 403 || errorResponse.code == 401 ) ) {
      $scope.logout();
    }
  };



  $scope.showLoader = $rootScope.showLoader = function  () {
    $scope.documentControls.showLoadingAnimation = true;
    if(!$scope.$$phase){
      $scope.$apply();
    }
  };

  $scope.hideLoader = $rootScope.hideLoader = function () {
    $scope.documentControls.showLoadingAnimation = false;
    if(!$scope.$$phase){
      $scope.$apply();
    }
  };

  function verifySession () {
    var userData = localStorageService.get('user');
    if (userData) {
      var params = {
        username: userData['userName'],
        token: userData['token']
      };

      userControlService.verificaSesion({}, params, serverConf.TEST_SERVER, function() {
        // every thing ok.
      }, function() {
        $rootScope.logout();
      });
    }
  }

  verifySession();

  $scope.abrirTreeModal = function (modalDefaults,modalOptions,callbackExito,callbackFalla) {
    //$templateCache.put("views/modalTemplates/modal.html");
    modalService.show(modalDefaults,modalOptions).then(callbackExito,callbackFalla);
  };

  /*$scope.logout = function () {
    userControlService.logout('','POST', function () {
      $rootScope.moduloSeleccionado = undefined;
      $rootScope.userData = undefined;
      $state.go('login');
      $rootScope.cancelSessionWatcher();
    });
  };*/

  $scope.validUserSession = function () {
    var signedIn = !!localStorageService.get('user');
    var signedInTS = localStorageService.get('signedInTS');
    if( !signedInTS ) {
      localStorageService.set( new Date().getTime() );
    }
    return signedIn;
  };

  $scope.$on('$destroy', function() {
    $rootScope.cancelSessionWatcher();
  });

  $scope.showCustomModal = function ( modalOptions, successCallback, failureCallback ) {
    var modalDefaults = {
      templateUrl: 'views/modalTemplates/customModal.html'
    };
    successCallback = successCallback && successCallback instanceof Function ?
      successCallback : function () {};
    failureCallback = failureCallback && failureCallback instanceof Function ?
      failureCallback : function () {};
    modalService.show(modalDefaults,modalOptions).then(successCallback, failureCallback);
  };
});

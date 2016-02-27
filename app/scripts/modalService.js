'use strict';

app.service('modalService',function ($modal, $timeout) {
  var modalDefaults = {
    backdrop: 'static',
    keyboard: true,
    modalFade: true,
    templateUrl: 'views/modalTemplates/modal.html'
  };

  var modalOptions = {
    closeButtonText: 'Cerrar',
    actionButtonText: 'Aceptar',
    headerText: 'Proceed?',
    bodyText: 'Perform this action?'
  };

  /*this.showModal = function (customModalDefaults, customModalOptions) {
    if (!customModalDefaults) customModalDefaults = {};
    customModalDefaults.backdrop = 'static';
    return this.show(customModalDefaults, customModalOptions);
  };*/

  this.show = function (customModalDefaults, customModalOptions) {
    //Create temp objects to work with since we're in a singleton service
    var tempModalDefaults = {};
    var tempModalOptions = {};

    //Map angular-ui modal custom defaults to modal defaults defined in service
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

    //Map modal.html $scope custom properties to defaults defined in service
    angular.extend(tempModalOptions, modalOptions, customModalOptions);

    if (!tempModalDefaults.controller) {
      tempModalDefaults.controller = function ($scope, $modalInstance) {
        $scope.modalOptions = tempModalOptions;
        $scope.modalOptions.ok = function (result) {
          $modalInstance.close(result);
        };
        $scope.modalOptions.close = function (result) {
          $modalInstance.dismiss('cancel');
        };

        if( $scope.modalOptions.closeAfter  && $scope.modalOptions.closeAfter > 0 ){
          $timeout(function () {
            $scope.modalOptions.ok();
          },$scope.modalOptions.closeAfter);
        }

      }
    } else {
      tempModalDefaults.resolve = {
        modalOptions : function () {
          return tempModalOptions;
        }
      }
    }

    return $modal.open(tempModalDefaults).result;
  };

});

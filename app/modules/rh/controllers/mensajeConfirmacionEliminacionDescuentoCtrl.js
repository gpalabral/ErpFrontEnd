'use strict';

app.controller('mensajeConfirmacionEliminacionDescuentoCtrl', function ($scope, $modalInstance, $state, modalOptions, localStorageService) {
    $scope.modalOptions = modalOptions;


    function init() {
        $scope.mensaje = "Esta seguro de eliminar el Descuento?.";
        $scope.rhDescuento = angular.copy(modalOptions.descuentoEnviado);
        $scope.periodoGestion = localStorageService.get('periodoGestionObjeto');
        console.info("DESCUENTO:", $scope.rhDescuento.idDescuento);
    }

    $scope.retornaPaginaBlanco = function () {
        $modalInstance.close(false);
    };


    $scope.eliminaDescuento = function () {
        $modalInstance.close(true);
    };

    init();


});
'use strict';

app.controller('mensajeConfirmacionEliminacionCriterioDeIngresoCtrl', function ($scope, $modalInstance, $state, modalOptions,localStorageService) {
    $scope.modalOptions = modalOptions;

    function init() {
        $scope.mensaje = "Esta seguro de eliminar el Criterio de Ingreso?.";
        $scope.rhCriterioDeIngreso = angular.copy(modalOptions.criterioDeIngresoEnviado);
        $scope.periodoGestion = localStorageService.get('periodoGestionObjeto');
        console.info("CRITERIO DE INGRESO:", $scope.rhCriterioDeIngreso.idCriterioDeIngreso);
    }

    $scope.cancelarEliminacionCriterioIngreso = function () {
        $modalInstance.close(false);
    };


    $scope.eliminaCriterioIngreso = function () {
        $modalInstance.close(true);
    };

    init();


});
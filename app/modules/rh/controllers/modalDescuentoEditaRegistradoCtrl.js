/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalDescuentoEditaRegistradoCtrl', function ($scope, tempCache, $modalInstance, modalOptions, rhDescuentoModel, $timeout, cxcService, serverConf) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;
    $scope.readOnlyEnable = true;
    $scope.readOnlyEnableReprogramacion = false;

    $scope.activaMensajeErroneo = false;
    $scope.activaMensajeReprogramacion = false;
    $scope.activaMensajeValidadorPorcentaje = false;

    $scope.tipoCambioRecuperado = "";

    var rhDescuentoObjeto = new rhDescuentoModel();


    function init() {

        if (modalOptions.descuentoEnviado != null) {
            $scope.rhDescuento = rhDescuentoObjeto.getObject();
            $scope.rhDescuento = angular.copy(modalOptions.descuentoEnviado);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    }


    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.seleccionar = function () {
        $modalInstance.close($scope.rhDescuento);
    };


    init();


});

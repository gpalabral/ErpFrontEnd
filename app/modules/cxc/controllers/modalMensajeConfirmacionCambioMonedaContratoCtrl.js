/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalMensajeConfirmacionCambioMonedaContratoCtrl', function ($scope, $modalInstance, tempCache) {


    /*Creado por: Henrry Guzman
     Mensaje confirmacion cambio monto contrato*/

    $scope.listaServiciosBienes = [];


    function init() {
        $scope.listaServiciosBienes = tempCache.listaServiciosBienes;
        $scope.listaPlanFacturacion = tempCache.listaPlanFacturacion;
        console.info("LISTA",$scope.listaPlanFacturacion);
        $scope.muestraAlertaPlanFacturacion = $scope.listaPlanFacturacion.length > 0;
        $scope.muestraAlertaServiciosBienes = $scope.listaServiciosBienes.length > 0;
    }

    $scope.confirmar = function () {
        $modalInstance.close(true);
    };


    $scope.cancelar = function () {
        //$modalInstance.dismiss('cancel');
        $modalInstance.close(false);
    };


    init();


});

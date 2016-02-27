/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalMensajeConfirmacionCambioMonedaRetencionCtrl', function ($scope, $modalInstance,modalOptions) {


    /*Creado por: Henrry Guzman
     Mensaje confirmacion cambio moneda retencion*/


    function init() {
        //$scope.listaServiciosBienes = tempCache.listaServiciosBienes;

        $scope.mensaje = modalOptions.mensaje;
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

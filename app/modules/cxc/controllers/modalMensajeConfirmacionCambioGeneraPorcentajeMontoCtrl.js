/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalMensajeConfirmacionCambioGeneraPorcentajeMontoCtrl', function ($scope, $modalInstance, tempCache) {


    /*Creado por: Henrry Guzman
     Mensaje confirmacion cambio Genra Por Porcentaje o Monto*/

    function init() {
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

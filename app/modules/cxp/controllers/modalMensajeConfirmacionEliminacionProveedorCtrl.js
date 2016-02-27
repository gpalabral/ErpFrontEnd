/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalMensajeConfirmacionEliminacionProveedorCtrl', function ($scope, $modalInstance,modalOptions) {


    /*Creado por: Henrry Guzman
     Mensaje confirmacion eliminacion proveedor*/


    function init() {

        $scope.mensaje = modalOptions.mensaje;
    }

    $scope.confirmarEliminacion = function () {
        $modalInstance.close(true);
    };


    $scope.cancelarEliminacion = function () {
        //$modalInstance.dismiss('cancel');
        $modalInstance.close(false);
    };


    init();


});

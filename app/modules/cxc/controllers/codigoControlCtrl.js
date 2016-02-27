/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('codigoControlCtrl', function ($rootScope, $scope, cxcService, serverConf, $state, $timeout, tempCache, contabilidadService, codigoControlModel, localStorageService) {
    $scope.readOnlyEnable = false;

    $scope.botonAdiciona = true;
    $scope.botonModifica = false;


    var codigoControl = new codigoControlModel();
    $scope.codigoControl = codigoControl.getObject();

    $scope.codigoControlGenerado="";


    function init() {

    }

    $scope.limpiaFormulario=function(){
        $scope.codigoControl = codigoControl.getObject();
    };


    $scope.generaCodigoControl = function () {
        $scope.showLoader();
        console.log(JSON.stringify($scope.codigoControl, null, 4));
        if (codigoControl.validate($scope.codigoControl)) {
            $scope.datosCodigoControl={
                nit:$scope.codigoControl.nit,
                numeroFactura:$scope.codigoControl.numeroFactura,
                numeroAutorizacion:$scope.codigoControl.numeroAutorizacion,
                fechaFactura: new Date($scope.codigoControl.fechaFactura),
                monto: $scope.codigoControl.monto,
                llaveDosificacion:$scope.codigoControl.llaveDosificacion
            };
            console.log(JSON.stringify($scope.datosCodigoControl, null, 4));
            cxcService.getCodigoControlFactura($scope.datosCodigoControl, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                // EXITO
                console.info("CODIGO:"+respuesta.data.codigoControl);
                $scope.codigoControlGenerado=respuesta.data.codigoControl;
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje de Confirmacion",
                    bodyText: "Se genero el codigo de manera correcta:",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 3000
                });
                //$state.transitionTo('servicioTemplate.empty', {}, {reload: true});
            }, function (respuestaDeError) {
                // ERROR
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje de Error",
                    bodyText: "Surgio error al registrar.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 3000
                });
            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje de Validacion",
                bodyText: "Puede ser que exista un campo vacio, o exista un dato no valido en algun campo.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 3000
            });
        }


    };




    init();


});

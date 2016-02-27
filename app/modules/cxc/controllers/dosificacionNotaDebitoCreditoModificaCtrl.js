/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('dosificacionNotaDebitoCreditoModificaCtrl', function ($scope, cxcService, serverConf, $state, $timeout, tempCache, dosificacionModel) {
    $scope.readOnlyEnable = true;

    var dosificacion = new dosificacionModel();
    $scope.cpcdosificaciones=dosificacion.getObject();

    function init() {

        //cxcService.getParActividadEconomica({}, {}, serverConf.ERPCONTA_WS, function (response) {
        //    $scope.listParActividadEconomica = response.data;
        //}, function (responseError) {
        //    //error
        //});

        cxcService.getParCaracteristicaEspecial({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listParCaracteristicaEspecial = response.data;
        }, function (responseError) {
            //error
        });
        if ($scope.dosificacionSeleccionado.idDosificacion != null) {
            console.info("ID:",$scope.dosificacionSeleccionado.idDosificacion);
            cxcService.getCpcDosificacionesPorId({}, {}, $scope.dosificacionSeleccionado.idDosificacion, serverConf.ERPCONTA_WS, function (response) {
                $scope.cpcdosificaciones = response.data;
                $scope.cpcdosificaciones.fechaLimiteEmision = new Date($scope.cpcdosificaciones.fechaLimiteEmision);

                var pact=$scope.cpcdosificaciones.parEstadoProceso.codigo=="PACT"?false:true;
                $scope.desactivaEdicionCampos=pact;
                $scope.desactivaEdicionRadioPACT=pact;
                $scope.desactivaEdicionRadioACT=$scope.cpcdosificaciones.parEstadoProceso.codigo=="ACT"?false:pact;
                $scope.desactivaEdicionRadioPAS=$scope.cpcdosificaciones.parEstadoProceso.codigo=="PAS"?false:$scope.cpcdosificaciones.parEstadoProceso.codigo=="ACT"?false:pact;

            }, function (responseError) {
                //error
            });
        }
    };

    $scope.$on("dosificacionNotaDebidoCreditoSeleccionada", function (event, datos) {
        //$scope.dosificacionSeleccionado = {idDosificacion: datos.idEntidadPojo};
        $scope.dosificacionSeleccionado = {idDosificacion: datos.idDosificacion};
        init();
    });


    $scope.modificaDosificacion = function () {
        $scope.showLoader();
        if (dosificacion.validate($scope.cpcdosificaciones)) {
            cxcService.modificaDosificacion($scope.cpcdosificaciones, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mansaje Confirmacion",
                    bodyText: "Se registro de manera correcta.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 1000
                });
                $scope.activar.treeDosificacionNotaDebitoCredito = true;
                $scope.activar.adicionaDosificacionNotaDebidoCredito = false;
                $scope.activar.modifcaDosificacionNotaDebidoCredito = false;
                $scope.elementoModificado('dosificacionNotaDebitoCredito');
            }, function (responseError) {
                //error
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Error: No se pudo registrar existe un error al registrar. ",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 1000
                });
            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Error Validacion: Verifique que no exista campos vacios o datos incorrectos",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 1000
            });
        }
    };


    $scope.cancelarDosificacion = function () {
        $scope.activar.treeDosificacionNotaDebitoCredito = true;
        $scope.activar.adicionaDosificacionNotaDebidoCredito = false;
        $scope.activar.modifcaDosificacionNotaDebidoCredito = false;
    };

    $scope.isBotonClickSI = function (preEstablecido1) {
        if (preEstablecido1)
            return false;
        else
            return true;
    };

    $scope.isBotonClickNO = function (preEstablecido2) {
        if (!preEstablecido2)
            return false;
        else
            return true;
    };

    //init();


});

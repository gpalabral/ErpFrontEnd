/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('dosificacionNotaDebitoCreditoAdicionaCtrl', function ($scope, cxcService, serverConf, $state, $timeout, tempCache, dosificacionModel, localStorage) {
    $scope.readOnlyEnable = false;
    var dosificacion = new dosificacionModel();
    $scope.cpcdosificaciones = dosificacion.getObject();
    $scope.llaveDosificacion = {
        confirmacion: ""
    };

    function init() {
        var dosificacion = new dosificacionModel();
        $scope.cpcdosificaciones = dosificacion.getObject();
        $scope.cpcdosificaciones.parTipoDocumentoMercantil.codigo = "NODE";
        $scope.cpcdosificaciones.fechaLimiteEmision = new Date();
        $scope.llaveDosificacion = {
            confirmacion: ""
        };

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

        cxcService.getParValorByCodigoGenerico({}, {}, "NDC", serverConf.ERPCONTA_WS, function (response) {
            $scope.cpcdosificaciones.parCaracteristicaEspecial = response.data;
        }, function (responseError) {
            //error
        });
        //if ($scope.sucursalSeleccionado.idSucursal != null) {
        //    cxcService.getVerificaExistenciaPreEstablecidoParaDosificacionesByIdSucursal({}, {}, $scope.sucursalSeleccionado.idSucursal, serverConf.ERPCONTA_WS, function (response) {
        //        $scope.activaRadioPreEstablecido = response.data;
        //    }, function (responseError) {
        //        //error
        //    });
        //};

        $scope.activaRadioPreEstablecido = true;


    };

    $scope.$on("adicionaDosificacionNotaDebitoCredito", function (event, datos) {
        $scope.sucursalSeleccionado = {idSucursal: datos.idSucursal};
        init();
    });

    $scope.guardaDosificacion = function () {
        $scope.showLoader();
        $scope.cpcdosificaciones.cpcSucursal.idSucursal = $scope.cpcsucursal.idSucursal;
        if (dosificacion.validate($scope.cpcdosificaciones)) {
            console.log(JSON.stringify($scope.cpcdosificaciones, null, 4));
            cxcService.adicionaDosificacion($scope.cpcdosificaciones, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                // EXITO
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Confirmacion",
                    bodyText: "Se registro de Exitosamente.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 3000
                });
                $scope.activar.treeDosificacionNotaDebitoCredito = true;
                $scope.activar.adicionaDosificacionNotaDebidoCredito = false;
                $scope.activar.modifcaDosificacionNotaDebidoCredito = false;
                $scope.elementoModificado('dosificacionNotaDebitoCredito');
            }, function (respuestaDeError) {
                // ERROR
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Error al registrar",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 3000
                });
            });
        } else {
            console.info("DOSIFICACION ERROR::", $scope.cpcdosificaciones);
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validacion",
                bodyText: "Existen campos vacios, o datos incorrectos, verifique porfavor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 3000
            });
        }

    };


    $scope.validaLlaveDosificacion = function (objeto, funcion) {
        if (objeto.llave != "" && objeto.confirmacionLlave != "") {
            if (objeto.llave == objeto.confirmacionLlave)
                funcion(true);
            else
                funcion(false);
        } else {
            funcion(false);
        }
    };


    $scope.cancelarDosificacion = function () {
        $scope.activar.treeDosificacionNotaDebitoCredito = true;
        $scope.activar.adicionaDosificacionNotaDebidoCredito = false;
        $scope.activar.modifcaDosificacionNotaDebidoCredito = false;
    };


    $scope.isBotonClickSI = function (preEstablecido1) {
        if ($scope.activaRadioPreEstablecido) {
            if (preEstablecido1)
                return false;
            else
                return true;
        } else {
            return false;
        }
    };

    $scope.isBotonClickNO = function (preEstablecido2) {
        if ($scope.activaRadioPreEstablecido) {
            if (!preEstablecido2)
                return false;
            else
                return true;
        } else {
            return false;
        }
    };


    //init();


});

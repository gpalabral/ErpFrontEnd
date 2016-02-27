/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalPagoContratoReprogramacionCtrl', function ($scope, tempCache, cxcService, serverConf, $modalInstance, modalOptions, pagoContratoModel, $filter, $timeout) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;
    $scope.readOnlyEnable = true;
    $scope.readOnlyEnableReprogramacion = true;

    $scope.activaMensajeErroneo = false;
    $scope.activaMensajeReprogramacion = false;
    $scope.activaMensajeValidadorPorcentaje = false;

    $scope.mensajeReprogramacionLabel = "";


    var pagoContrato = new pagoContratoModel();

    function init() {
        $scope.readOnlyEnable = true;
        $scope.readOnlyEnableReprogramacion = true;
        if (tempCache.pagoContrato != null) {
            $scope.cpcPagoContrato = tempCache.pagoContrato;
            $scope.cpcPagoContratoAux = pagoContrato.getObject();
            $scope.cpcPagoContratoAux.descripcionPago = $scope.cpcPagoContrato.descripcionPago;
            $scope.cpcPagoContratoAux.fechaProgramada = $scope.cpcPagoContrato.fechaProgramada;
            $scope.cpcPagoContratoAux.montoProgramado = $scope.cpcPagoContrato.montoProgramado;
            $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = $scope.cpcPagoContrato.montoProgramadoSegMoneda;
            $scope.cpcPagoContratoAux.nroPago = $scope.cpcPagoContrato.nroPago;
            $scope.cpcPagoContratoAux.porcentajeProgramado = $scope.cpcPagoContrato.porcentajeProgramado;
            $scope.cpcPagoContratoAux.parEstadoPago.codigo = $scope.cpcPagoContrato.parEstadoPago.codigo;
            $scope.cpcPagoContratoAux.parTipoHito = $scope.cpcPagoContrato.parTipoHito;
            $scope.labelBoton = $scope.cpcPagoContrato.montoProgramado == null;
            $scope.labelBotonReprogramado = $scope.cpcPagoContrato.idPagoContrato != 0;

            $scope.cpcPagoContratoAux["fechaProgramadaOriginal"] = new Date($scope.cpcPagoContrato.fechaProgramada);
            if ($scope.cpcPagoContratoAux.idPagoContrato != 0) {
                $scope.readOnlyEnable = true;
                $scope.cpcPagoContratoAux.fechaProgramada = new Date($scope.cpcPagoContratoAux.fechaProgramada);
            } else {
                $scope.readOnlyEnable = true;
                $scope.cpcPagoContratoAux.fechaProgramada = $scope.cpcPagoContratoAux.fechaProgramada == null ? new Date() : new Date($scope.cpcPagoContratoAux.fechaProgramada);
            }
            if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
                $scope.muestraPrimeraMoneda = true;
                $scope.muestraSegundaMoneda = false;
            } else {
                $scope.muestraPrimeraMoneda = false;
                $scope.muestraSegundaMoneda = true;
            }
            $scope.montoContrato = tempCache.montoContrato;
            $scope.saldo = tempCache.saldoTotal;
            $scope.fechaMin = $filter("date")(new Date($scope.cpcPagoContratoAux.fechaProgramada), "yyyy-MM-dd");
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        muestraListaParTipoMoneda();
    }


    $scope.cancelar = function () {
        $modalInstance.close(null);
    };


    $scope.modificaPagoContratoReprogramacion = function () {
        $scope.cpcPagoContrato.descripcionPago = $scope.cpcPagoContratoAux.descripcionPago;
        $scope.cpcPagoContrato.fechaProgramada = $scope.cpcPagoContratoAux.fechaProgramada;
        $scope.cpcPagoContrato.montoProgramado = $scope.cpcPagoContratoAux.montoProgramado;
        $scope.cpcPagoContrato.montoProgramadoSegMoneda = $scope.cpcPagoContratoAux.montoProgramadoSegMoneda;
        $scope.cpcPagoContrato.nroPago = $scope.cpcPagoContratoAux.nroPago;
        $scope.cpcPagoContrato.porcentajeProgramado = $scope.cpcPagoContratoAux.porcentajeProgramado;
        $scope.cpcPagoContrato.fechaProgramada = new Date($scope.cpcPagoContrato.fechaProgramada);
        $scope.cpcPagoContrato.parEstadoPago.codigo = "PEND";

        var anioOriginal = $scope.cpcPagoContratoAux.fechaProgramadaOriginal.getFullYear();
        var mesOriginal = $scope.cpcPagoContratoAux.fechaProgramadaOriginal.getMonth() + 1;
        var diaOriginal = $scope.cpcPagoContratoAux.fechaProgramadaOriginal.getDate();

        console.info("A1:", anioOriginal, " M1:", mesOriginal, "D1:", diaOriginal);

        var anioActual = $scope.cpcPagoContratoAux.fechaProgramada.getFullYear();
        var mesActual = $scope.cpcPagoContratoAux.fechaProgramada.getMonth() + 1;
        var diaActual = $scope.cpcPagoContratoAux.fechaProgramada.getDate();

        console.info("A2:", anioActual, " M2:", mesActual, "D2:", diaActual);

        console.info("fecha 1:", new Date($scope.cpcPagoContratoAux.fechaProgramada).getTime());
        console.info("fecha 2:", new Date($scope.cpcPagoContratoAux.fechaProgramadaOriginal).getTime());
        cxcService.verificaTiempoDisponible($scope.cpcPagoContrato, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            if (respuesta.data) {
                if (new Date($scope.cpcPagoContratoAux.fechaProgramada).getTime() > new Date($scope.cpcPagoContratoAux.fechaProgramadaOriginal).getTime()) {
                    $modalInstance.close($scope.cpcPagoContrato);
                    //cxcService.verificaTiempoDisponible($scope.cpcPagoContrato, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                    //    if (respuesta.data) {
                    //        cxcService.modificaPagoContrato($scope.cpcPagoContrato, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                    //            console.info("REGISTRO OK cpcPagoContrato:", $scope.cpcPagoContrato);
                    //            $modalInstance.close($scope.cpcPagoContrato);
                    //        }, function (respuestaDeError) {
                    //            $scope.mensajeReprogramacionLabel = "Se produjo un error al realizar la reprogramacion.";
                    //            $scope.muestraAlertaReprogramacion(true);
                    //        });
                    //    } else {
                    //        $scope.mensajeReprogramacionLabel = "La fecha a reprogramar debe estar en un rango de 15 dias.";
                    //        $scope.muestraAlertaReprogramacion(true);
                    //    }
                    //});
                } else {
                    console.info("ENTROOOOOOOO");
                    $scope.mensajeReprogramacionLabel = "La fecha debe ser mayor a la original.";
                    $scope.muestraAlertaReprogramacion(true);
                }
            } else {
                $scope.mensajeReprogramacionLabel = "La fecha a reprogramar debe estar en un rango de 15 dias.";
                $scope.muestraAlertaReprogramacion(true);
            }


        });

    };

    $scope.muestraAlertaReprogramacion = function (valor) {
        $scope.activaMensajeReprogramacion = valor;
        $timeout(function () {
            $scope.activaMensajeReprogramacion = false;
        }, 3000);
    };

    function muestraListaParTipoMoneda() {
        cxcService.getParTipoHito({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParTipoHito = response.data;
        }, function (responseError) {
            //error
        });
    }


    init();


});

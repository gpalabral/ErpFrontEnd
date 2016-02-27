/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalPagoContratoModificaCtrl', function ($scope, tempCache, $modalInstance, modalOptions, pagoContratoModel, $timeout, $filter,cxcService,serverConf) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;
    $scope.readOnlyEnable = true;
    $scope.readOnlyEnableReprogramacion = false;

    $scope.activaMensajeErroneo = false;
    $scope.activaMensajeReprogramacion = false;
    $scope.activaMensajeValidadorPorcentaje = false;
    $scope.tipoCambioRecuperado = "";

    var pagoContrato = new pagoContratoModel();

    function init() {
        $scope.tipoCambioRecuperado = tempCache.tipoCambioContrato;
        $scope.readOnlyEnableReprogramacion = false;
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

            $scope.labelBoton = $scope.cpcPagoContratoAux.montoProgramado == null;
            $scope.labelBotonReprogramado = $scope.cpcPagoContratoAux.idPagoContrato != 0;
            if ($scope.cpcPagoContratoAux.idPagoContrato != 0) {
                $scope.readOnlyEnable = true;
                $scope.cpcPagoContratoAux.fechaProgramada = new Date($scope.cpcPagoContratoAux.fechaProgramada);
            } else {
                $scope.readOnlyEnable = false;
                $scope.cpcPagoContratoAux.fechaProgramada = $scope.cpcPagoContratoAux.fechaProgramada == null ? new Date() : new Date($scope.cpcPagoContratoAux.fechaProgramada);
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
        $modalInstance.close($scope.cpcPagoContrato);
    };

    $scope.seleccionar = function () {
        $scope.cpcPagoContrato.descripcionPago = $scope.cpcPagoContratoAux.descripcionPago;
        $scope.cpcPagoContrato.fechaProgramada = $scope.cpcPagoContratoAux.fechaProgramada;
        $scope.cpcPagoContrato.montoProgramado = $scope.cpcPagoContratoAux.montoProgramado;
        $scope.cpcPagoContrato.montoProgramadoSegMoneda = $scope.cpcPagoContratoAux.montoProgramadoSegMoneda;
        $scope.cpcPagoContrato.nroPago = $scope.cpcPagoContratoAux.nroPago;
        $scope.cpcPagoContrato.porcentajeProgramado = $scope.cpcPagoContratoAux.porcentajeProgramado;
        $scope.cpcPagoContrato.parEstadoPago.codigo = $scope.cpcPagoContratoAux.parEstadoPago.codigo;
        if (pagoContrato.validate($scope.cpcPagoContrato)) {
            $modalInstance.close($scope.cpcPagoContrato);
        } else {
            $scope.muestraAlerta(true);
        }
    };


    $scope.muestraAlerta = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 3000);
    };

    $scope.convierteMonedaDolarGeneral = function (objeto, funcion) {
        if (objeto.monto != "") {
            $scope.calculaMontoDolares(objeto.monto, objeto.tipoCambio, objeto.tipoMoneda, function (resultadoNumero) {
                funcion(resultadoNumero);
            });
        } else {
            funcion(0);
        }
    };

    $scope.convierteMonedaDolar = function () {
        var objetoTipoCambio = {
            monto: $scope.cpcPagoContratoAux.montoProgramado,
            tipoCambio: $scope.tipoCambioRecuperado,
            tipoMoneda: "SUS"
        };
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = valorConvertido;
            $scope.convierteValorAPorcentaje($scope.montoContrato, $scope.cpcPagoContratoAux.montoProgramado, function (resultadoNumero) {
                $scope.cpcPagoContratoAux.porcentajeProgramado = resultadoNumero;
            });
        });
    };

    $scope.convierteValorAPorcentaje = function (valorTotal, valor, funcion) {
        funcion((Number(valor) * Number(100)) / Number(valorTotal));
    };


    $scope.convierteMonedaBolivianos = function () {
        var objetoTipoCambio = {
            monto: $scope.cpcPagoContratoAux.montoProgramadoSegMoneda,
            tipoCambio: $scope.tipoCambioRecuperado,
            tipoMoneda: "BOL"
        };
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpcPagoContratoAux.montoProgramado = valorConvertido;
            $scope.convierteValorAPorcentaje($scope.montoContrato, $scope.cpcPagoContratoAux.montoProgramado, function (resultadoNumero) {
                $scope.cpcPagoContratoAux.porcentajeProgramado = resultadoNumero;
            });
        });
    };


    $scope.obtieneMontoMonedaPorProcentaje = function (objetoPorcentaje, funcion) {
        funcion((Number(objetoPorcentaje.montoTotal) * Number(objetoPorcentaje.porcentaje)) / Number(100));
    };

    $scope.convieteMontosPorPorcentaje = function () {
        var objetoPorcentaje = {
            montoTotal: $scope.montoContrato,
            porcentaje: $scope.cpcPagoContratoAux.porcentajeProgramado
        };
        if (objetoPorcentaje.porcentaje <= 100) {
            $scope.obtieneMontoMonedaPorProcentaje(objetoPorcentaje, function (valorPorcentaje) {
                $scope.cpcPagoContratoAux.montoProgramado = valorPorcentaje;
                $scope.convierteMonedaDolar();
            });
        } else {
            $scope.muestraAlertaPorcentaje(true);
            objetoPorcentaje.porcentaje = 100;
            $scope.cpcPagoContratoAux.porcentajeProgramado = 100;
            $scope.obtieneMontoMonedaPorProcentaje(objetoPorcentaje, function (valorPorcentaje) {
                $scope.cpcPagoContratoAux.montoProgramado = valorPorcentaje;
                $scope.convierteMonedaDolar();
            });

        }
    };

    $scope.muestraAlertaPorcentaje = function (valor) {
        $scope.activaMensajeValidadorPorcentaje = valor;
        $timeout(function () {
            $scope.activaMensajeValidadorPorcentaje = false;
        }, 7000);
    };

    $scope.calculaMontoDolares = function (monto, montoDolar, tipoMoneda, funcion) {
        if (tipoMoneda == "SUS") {
            funcion(Number(monto) / Number(montoDolar));
        } else {
            funcion(Number(monto) * Number(montoDolar));
        }
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

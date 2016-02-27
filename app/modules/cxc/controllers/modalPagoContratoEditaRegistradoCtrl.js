/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalPagoContratoEditaRegistradoCtrl', function ($scope, tempCache, $modalInstance, modalOptions, pagoContratoModel, $timeout, cxcService,serverConf) {
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


        //console.info("OBJETO RECIBIDO;",tempCache.pagoContrato);

        $scope.tipoCambioRecuperado = tempCache.tipoCambioContrato;


        console.info("PRUEBA ATRIBUTO:", $scope.modalOptions.pagoContratoEnviado);

        if ($scope.modalOptions.pagoContratoEnviado != null) {
            $scope.cpcPagoContratoAux = pagoContrato.getObject();
            $scope.cpcPagoContratoAux = angular.copy(modalOptions.pagoContratoEnviado);
            $scope.cpcPagoContratoAux.fechaProgramada = new Date($scope.cpcPagoContratoAux.fechaProgramada);
            $scope.labelBoton = $scope.cpcPagoContratoAux.montoProgramado == null;
            $scope.labelBotonReprogramado = $scope.cpcPagoContratoAux.idPagoContrato != 0;


            $scope.muestraPrimeraMoneda = $scope.cpcPagoContratoAux.cpcContrato.montoPrimeraMoneda != 0;
            $scope.muestraSegundaMoneda = $scope.cpcPagoContratoAux.cpcContrato.montoSegundaMoneda != 0;
            $scope.generarPorPorcentaje = $scope.cpcPagoContratoAux.porcentajeProgramado != 0;


            if ($scope.muestraPrimeraMoneda) {
                $scope.montoContrato = $scope.cpcPagoContratoAux.cpcContrato.montoPrimeraMoneda;
                $scope.saldo = tempCache.saldoTotalPrimeraMoneda;
            }
            if ($scope.muestraSegundaMoneda) {
                $scope.montoContrato = $scope.cpcPagoContratoAux.cpcContrato.montoSegundaMoneda;
                $scope.saldo = tempCache.saldoTotalSegundaMoneda;
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        muestraListaParTipoMoneda();
    }


    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.seleccionar = function () {
        if (pagoContrato.validate($scope.cpcPagoContratoAux)) {
            $modalInstance.close($scope.cpcPagoContratoAux);
        } else {
            $scope.mensajeErrorPagoContrato = "Validación: Existen campos vacios o datos incorrectos, verifique por favor.";
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
            $scope.convierteValorAPorcentaje($scope.montoContrato, $scope.cpcPagoContratoAux.montoProgramadoSegMoneda, function (resultadoNumero) {
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

    $scope.convieteMontosPorPorcentajeV1 = function () {
        if ($scope.cpcPagoContratoAux.porcentajeProgramado <= 100) {
            if ($scope.muestraPrimeraMoneda) {
                $scope.cpcPagoContratoAux.montoProgramado = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = 0;
            } else {
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramado = 0;
            }

        } else {
            $scope.muestraAlertaPorcentaje(true);
            $scope.cpcPagoContratoAux.porcentajeProgramado = 100;
            if ($scope.muestraPrimeraMoneda) {
                $scope.cpcPagoContratoAux.montoProgramado = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = 0;
            } else {
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramado = 0;
            }

        }
        console.info("PORDENTAJE:", $scope.cpcPagoContratoAux.porcentajeProgramado);
    };

    $scope.muestraAlertaCampoPorcentajeMayorAlSaldo = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $scope.mensajeErrorPagoContrato = "Validacion: Es necesario que el 'Monto' no supere al 'Saldo', se cambiará el 'Monto' por el valor del 'Saldo'.";
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 7000);
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

    $scope.adicionaConceptoPorMedioDeHito = function(){
        console.info("ENTRO UNO");
        cxcService.getParValorByCodigoGenerico({}, {},$scope.cpcPagoContratoAux.parTipoHito.codigo, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.cpcPagoContratoAux.parTipoHito=respuesta.data;
            $scope.cpcPagoContratoAux.descripcionPago = $scope.cpcPagoContratoAux.parTipoHito.descripcion;
        });

    };


    init();


});

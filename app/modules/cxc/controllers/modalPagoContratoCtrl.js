/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalPagoContratoCtrl', function ($scope, tempCache, $modalInstance, modalOptions, pagoContratoModel, $timeout, $filter, cxcService, serverConf) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;
    $scope.readOnlyEnable = true;
    $scope.readOnlyEnableReprogramacion = false;

    $scope.activaMensajeErroneo = false;
    $scope.tipoCambioRecuperado = "";

    $scope.mensajeErrorPagoContrato = "";


    var pagoContrato = new pagoContratoModel();

    function init() {
        $scope.tipoCambioRecuperado = tempCache.tipoCambioContrato;
        $scope.readOnlyEnableReprogramacion = false;
        if (tempCache.pagoContrato != null) {
            $scope.cpcPagoContrato = tempCache.pagoContrato;
            $scope.cpcPagoContratoAux = pagoContrato.getObject();
            $scope.cpcPagoContratoAux.nroPago = $scope.cpcPagoContrato.nroPago;
            $scope.labelBoton = $scope.cpcPagoContratoAux.montoProgramado == null;
            $scope.labelBotonReprogramado = $scope.cpcPagoContratoAux.idPagoContrato != 0;
            if ($scope.cpcPagoContratoAux.idPagoContrato != 0) {
                $scope.readOnlyEnable = true;
                $scope.cpcPagoContratoAux.fechaProgramada = new Date($scope.cpcPagoContratoAux.fechaProgramada);
            } else {
                $scope.readOnlyEnable = false;
                $scope.cpcPagoContratoAux.fechaProgramada = $scope.cpcPagoContratoAux.fechaProgramada == null ? new Date() : new Date($scope.cpcPagoContratoAux.fechaProgramada);
            }

            if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
                $scope.muestraPrimeraMoneda = true;
                $scope.muestraSegundaMoneda = false;
                $scope.montoContrato = tempCache.montoContratoPrimeraMoneda;
                $scope.saldo = tempCache.saldoTotalPrimeraMoneda;
            } else {
                $scope.muestraPrimeraMoneda = false;
                $scope.muestraSegundaMoneda = true;
                $scope.montoContrato = tempCache.montoContratoSegundaMoneda;
                $scope.saldo = tempCache.saldoTotalSegundaMoneda;
            }

            //$scope.montoContrato = tempCache.montoContrato;
            //$scope.saldo = tempCache.saldoTotal;
            $scope.generarPorPorcentaje = tempCache.generarPorPorcentajeCache;
            $scope.generarPorMontoCache = tempCache.generarPorMontoCache;
            if ($scope.generarPorPorcentaje) {
                $scope.cpcPagoContratoAux.porcentajeProgramado = tempCache.porcentajeRestante;
            } else {
                $scope.cpcPagoContratoAux.porcentajeProgramado = 0;
            }
            //$scope.convieteMontosPorPorcentajeInit();
            $scope.convieteMontosPorPorcentajeInitV1();

            $scope.fechaMin = $filter("date")(new Date($scope.cpcPagoContratoAux.fechaProgramada), "yyyy-MM-dd");
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            muestraListaParTipoMoneda();

            console.info("OBJETO $scope.cpcPagoContratoAux:", $scope.cpcPagoContratoAux);
        }
    }


    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.seleccionar = function () {
        if (pagoContrato.validate($scope.cpcPagoContratoAux)) {
            cxcService.getParValorByCodigoGenerico({}, {}, $scope.cpcPagoContratoAux.parEstadoPago.codigo, serverConf.ERPCONTA_WS, function (respuesta) {
                $scope.cpcPagoContratoAux.parEstadoPago = respuesta.data;
                cxcService.getParValorByCodigoGenerico({}, {}, $scope.cpcPagoContratoAux.parTipoHito.codigo, serverConf.ERPCONTA_WS, function (respuesta) {
                    $scope.cpcPagoContratoAux.parTipoHito = respuesta.data;
                    $modalInstance.close($scope.cpcPagoContratoAux);
                });
            });

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


    //ng-blur="conviertePorcentajeAmbasMonedas() Metodo que se ejecuta en la vista en el campo Monto
    $scope.conviertePorcentajeAmbasMonedas = function () {
        if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
            //$scope.cpcPagoContratoAux.porcentajeProgramado = (Number($scope.cpcPagoContratoAux.montoProgramado) * Number(100)) / Number($scope.montoContrato);
            if ($scope.cpcPagoContratoAux.montoProgramado > $scope.saldo) {
                $scope.cpcPagoContratoAux.montoProgramado = $scope.saldo;
                $scope.cpcPagoContratoAux.porcentajeProgramado = tempCache.porcentajeRestante;
                $scope.muestraAlertaCampoPorcentajeMayorAlSaldo(true);
            }

        } else {
            //$scope.cpcPagoContratoAux.porcentajeProgramado = (Number($scope.cpcPagoContratoAux.montoProgramadoSegMoneda) * Number(100)) / Number($scope.montoContrato);
            if ($scope.cpcPagoContratoAux.montoProgramadoSegMoneda > $scope.saldo) {
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = $scope.saldo;
                $scope.cpcPagoContratoAux.porcentajeProgramado = tempCache.porcentajeRestante;
                $scope.muestraAlertaCampoPorcentajeMayorAlSaldo(true);
            }
        }
    };

    $scope.convierteMonedaDolar = function () {
        if ($scope.cpcPagoContratoAux.montoProgramado <= $scope.saldo) {
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
        } else {
            $scope.cpcPagoContratoAux.montoProgramado = $scope.saldo;
            $scope.mensajeErrorPagoContrato = "Validación: Existen campos vacios o datos incorrectos, verifique por favor.";
            $scope.muestraAlerta(true);
        }
    };

    $scope.convierteMonedaDolarPorcentaje = function () {
        if ($scope.cpcPagoContratoAux.montoProgramado <= $scope.saldo) {
            var objetoTipoCambio = {
                monto: $scope.cpcPagoContratoAux.montoProgramado,
                tipoCambio: $scope.tipoCambioRecuperado,
                tipoMoneda: "SUS"
            };
            $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = valorConvertido;
            });
        } else {
            $scope.cpcPagoContratoAux.montoProgramado = $scope.saldo;
            $scope.mensajeErrorPagoContrato = "Validación: Existen campos vacios o datos incorrectos, verifique por favor.";
            $scope.muestraAlerta(true);
        }
    };

    $scope.convierteMonedaDolarInit = function () {
        if ($scope.cpcPagoContrato.montoProgramado <= $scope.saldo) {
            var objetoTipoCambio = {
                monto: $scope.cpcPagoContratoAux.montoProgramado,
                tipoCambio: $scope.tipoCambioRecuperado,
                tipoMoneda: "SUS"
            };
            $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = valorConvertido;
            });
        } else {
            $scope.cpcPagoContratoAux.montoProgramado = $scope.saldo;
            $scope.mensajeErrorPagoContrato = "Validación: Existen campos vacios o datos incorrectos, verifique por favor.";
            $scope.muestraAlerta(true);
        }
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
        funcion(((Number(objetoPorcentaje.montoTotal) * Number(objetoPorcentaje.porcentaje)) / Number(100)).toFixed(5));
    };

    $scope.convieteMontosPorPorcentaje = function () {
        var objetoPorcentaje = {
            montoTotal: $scope.montoContrato,
            porcentaje: $scope.cpcPagoContratoAux.porcentajeProgramado
        };
        if (objetoPorcentaje.porcentaje <= 100) {
            $scope.obtieneMontoMonedaPorProcentaje(objetoPorcentaje, function (valorPorcentaje) {
                $scope.cpcPagoContratoAux.montoProgramado = valorPorcentaje;
                $scope.convierteMonedaDolarPorcentaje();
            });
        } else {
            $scope.muestraAlertaPorcentaje(true);
            objetoPorcentaje.porcentaje = 100;
            $scope.cpcPagoContratoAux.porcentajeProgramado = 100;
            $scope.obtieneMontoMonedaPorProcentaje(objetoPorcentaje, function (valorPorcentaje) {
                $scope.cpcPagoContratoAux.montoProgramado = valorPorcentaje;
                $scope.convierteMonedaDolarPorcentaje();
            });

        }
    };

    $scope.convieteMontosPorPorcentajeV1 = function () {
        if ($scope.cpcPagoContratoAux.porcentajeProgramado <= 100) {
            if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
                $scope.cpcPagoContratoAux.montoProgramado = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = 0;
                if ($scope.cpcPagoContratoAux.montoProgramado > $scope.saldo) {
                    $scope.cpcPagoContratoAux.montoProgramado = $scope.saldo;
                    $scope.cpcPagoContratoAux.porcentajeProgramado = tempCache.porcentajeRestante;
                    $scope.muestraAlertaCampoPorcentajeMayorAlSaldo(true);
                }
            } else {
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramado = 0;
                if ($scope.cpcPagoContratoAux.montoProgramadoSegMoneda > $scope.saldo) {
                    $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = $scope.saldo;
                    $scope.cpcPagoContratoAux.porcentajeProgramado = tempCache.porcentajeRestante;
                    $scope.muestraAlertaCampoPorcentajeMayorAlSaldo(true);
                }
            }
        } else {
            $scope.muestraAlertaPorcentaje(true);
            $scope.cpcPagoContratoAux.porcentajeProgramado = 100;
            if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
                $scope.cpcPagoContratoAux.montoProgramado = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = 0;
                if ($scope.cpcPagoContratoAux.montoProgramado > $scope.saldo) {
                    $scope.cpcPagoContratoAux.montoProgramado = $scope.saldo;
                    $scope.cpcPagoContratoAux.porcentajeProgramado = tempCache.porcentajeRestante;
                    $scope.muestraAlertaCampoPorcentajeMayorAlSaldo(true);
                }
            } else {
                $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
                $scope.cpcPagoContratoAux.montoProgramado = 0;
                if ($scope.cpcPagoContratoAux.montoProgramadoSegMoneda > $scope.saldo) {
                    $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = $scope.saldo;
                    $scope.cpcPagoContratoAux.porcentajeProgramado = tempCache.porcentajeRestante;
                    $scope.muestraAlertaCampoPorcentajeMayorAlSaldo(true);
                }
            }

        }

    };

    $scope.convieteMontosPorPorcentajeInit = function () {
        var objetoPorcentaje = {
            montoTotal: $scope.montoContrato,
            porcentaje: $scope.cpcPagoContratoAux.porcentajeProgramado
        };
        $scope.obtieneMontoMonedaPorProcentaje(objetoPorcentaje, function (valorPorcentaje) {
            $scope.cpcPagoContratoAux.montoProgramado = valorPorcentaje;
            $scope.convierteMonedaDolarInit();
        });
    };

    $scope.convieteMontosPorPorcentajeInitV1 = function () {
        if ($scope.generarPorPorcentaje) {
            var valorConvertido = (Number($scope.montoContrato) * Number($scope.cpcPagoContratoAux.porcentajeProgramado)) / Number(100);
        } else {
            var valorConvertido = Number($scope.saldo);
        }
        if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
            $scope.cpcPagoContratoAux.montoProgramado = valorConvertido;
            $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = 0;
        } else {
            $scope.cpcPagoContratoAux.montoProgramadoSegMoneda = valorConvertido;
            $scope.cpcPagoContratoAux.montoProgramado = 0;
        }
    };

    $scope.muestraAlertaPorcentaje = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $scope.mensajeErrorPagoContrato = "Validacion: Es necesario que el porcentaje no supere el 100 %, se cambiara el valor a 100 %.";
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 7000);
    };

    $scope.muestraAlertaCampoPorcentajeMayorAlSaldo = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $scope.mensajeErrorPagoContrato = "Validacion: Es necesario que el 'Monto' no supere al 'Saldo', se cambiará el 'Monto' por el valor del 'Saldo'.";
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 7000);
    };

    $scope.muestraAlertaCampoMontoMayorAlSaldo = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $scope.mensajeErrorPagoContrato = "Validacion: Es necesario que el 'Monto' no supere al 'Saldo'.";
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
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

    $scope.adicionaConceptoPorMedioDeHito = function () {
        cxcService.getParValorByCodigoGenerico({}, {}, $scope.cpcPagoContratoAux.parTipoHito.codigo, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.cpcPagoContratoAux.parTipoHito = respuesta.data;
            $scope.cpcPagoContratoAux.descripcionPago = $scope.cpcPagoContratoAux.parTipoHito.descripcion;
        });

    };


    init();


});

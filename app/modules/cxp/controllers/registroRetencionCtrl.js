'use strict';

app.controller('registroRetencionCtrl', function ($scope, cxpService, serverConf, $http, $modal, modalService,
                                                  localStorageService, tempCache, cxcService, retencionModel,
                                                  detalleRetencionModel, $timeout, $state) {

    /************************Definicion de variables*********************************/

    var primeraMonedaEnum = "BOL";
    var retencion = new retencionModel();
    var detalleRetencion = new detalleRetencionModel();

    $scope.listaDepartamento = [];
    $scope.listaAplicante = [];
    $scope.listaTipoDocumento = [];
    $scope.activaCampo = false;
    $scope.activaBotonGuarda = false;
    $scope.activaBotonContinua = false;
    $scope.valores = {nombreRazonSocial: "", nit: ""};

    /******************************Fin Definicion de variables****************************/


    /* Creado por: Henrry Guzmán*/
    var init = function () {
        $scope.cpcRetencion = retencion.getObject();

        $scope.cpcRetencion.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
        $scope.itemSeleccionado = tempCache.proveedorGrupoConcepto;
        $scope.cpcRetencion.parTipoMoneda.codigo = "BOL";
        $scope.cpcRetencion.parModalidadTransaccion.codigo = "CONT";
        $scope.cpcRetencion.fechaRegistro = new Date();
        $scope.muestraPrimeraMoneda = true;
        $scope.activaBotonGuarda = true;
        $scope.activaBotonContinua = false;
        $scope.muestraListaParTipoMoneda();
        $scope.muestraListaDepartamento();
        $scope.listaParTipoDocumento();
        $scope.muestraListaParTipoRetencion();
        $scope.muestraListParTipoAplicacionRetencion();
        obtenerListaTipoTransacciones();
    };

    $scope.muestraListaParTipoRetencion = function () {
        cxpService.getListParTipoRetencion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaRetencion = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.muestraListParTipoAplicacionRetencion = function () {
        cxpService.getListParTipoAplicacionRetencion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaAplicacionRetencion = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.muestraListaParTipoMoneda = function () {
        cxcService.getParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParTipoMoneda = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.muestraListaDepartamento = function () {
        cxpService.getListaDepartamentosByEstado({}, {}, "VIG", serverConf.ERPCONTA_WS, function (response) {
            $scope.listaDepartamento = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.listaParTipoDocumento = function () {
        cxpService.getListParTipoDocumento({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoDocumento = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });


    };

    function obtenerListaTipoTransacciones() {
        cxpService.getParTipoTransaccionRetencion({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.listaTransacciones = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR
        });
    }

    $scope.calculaRetencion = function (cpcRetencion) {

        var valorPrimeraMoneda = $scope.cpcRetencion.montoPrimeraMoneda != null && $scope.cpcRetencion.montoPrimeraMoneda != undefined && $scope.cpcRetencion.montoPrimeraMoneda != 0;
        var valorSegundaMoneda = $scope.cpcRetencion.montoSegundaMoneda != null && $scope.cpcRetencion.montoSegundaMoneda != undefined && $scope.cpcRetencion.montoSegundaMoneda != 0;
        var monto = valorPrimeraMoneda ? cpcRetencion.montoPrimeraMoneda : valorSegundaMoneda ? cpcRetencion.montoSegundaMoneda : 0;
        var montoGeneral = 0;

        switch (cpcRetencion.parTipoRetencion.codigo) {
            case "RIIPS"://RETENCION IUE - IT POR SERVICIO
                //RIUES:RETENCIONES IUE POR SERVICIOS
                $scope.obtieneParametricaAlicuotaPorCodigo("RIUES", function (resultado) {
                    $scope.retencionPorServicio = resultado;
                    cpcRetencion.parTipoAlicuota.codigo = $scope.retencionPorServicio.codigo;
                    //RIT: RETENCION IT
                    $scope.obtieneParametricaAlicuotaPorCodigo("RIT", function (resultado) {
                        $scope.retencionIt = resultado;
                        //DPAG:DECUENTO PAGO , GROS:GROSSING UP

                        montoGeneral = monto;
                        if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                            var IueRestaIt = 100 - (parseFloat($scope.retencionPorServicio.valor) + parseFloat($scope.retencionIt.valor));
                            var nuevoPorcentaje = (IueRestaIt / 100);
                            var nuevoMonto = monto / nuevoPorcentaje;
                            montoGeneral = nuevoMonto;
                        }
                        var retencionPorServicio = (parseFloat($scope.retencionPorServicio.valor) / 100) * montoGeneral;
                        var retencionItValor = (parseFloat($scope.retencionIt.valor) / 100) * montoGeneral;
                        retencionPorServicio = Math.round(retencionPorServicio * 100) / 100;
                        retencionItValor = Math.round(retencionItValor * 100) / 100;

                        var suma = parseFloat(retencionPorServicio) + parseFloat(retencionItValor);
                        var valorContraCuenta = parseFloat(montoGeneral) - parseFloat(suma);
                        console.info("retencionPorServicio:", retencionPorServicio);
                        console.info("retencionItValor:", retencionItValor);
                        console.info("retencionPorServicioR:", Math.round(retencionPorServicio * 100) / 100);
                        console.info("retencionItValorR:", Math.round(retencionItValor * 100) / 100);
                        if (valorPrimeraMoneda) {
                            cpcRetencion.montoPrimeraMoneda = montoGeneral;
                            cpcRetencion.iuePrimeraMoneda = retencionPorServicio;
                            cpcRetencion.itPrimeraMoneda = retencionItValor;
                            cpcRetencion.ivaPrimeraMoneda = 0;
                            cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                        } else {
                            cpcRetencion.montoSegundaMoneda = montoGeneral;
                            cpcRetencion.iueSegundaMoneda = retencionPorServicio;
                            cpcRetencion.itSegundaMoneda = retencionItValor;
                            cpcRetencion.ivaSegundaMoneda = 0;
                            cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                        }
                    });
                });
                break;
            case "RIIPB"://RETENCION IUE - IT POR BIENES
                //RIUEB:RETENCIONES IUE POR BIENES
                $scope.obtieneParametricaAlicuotaPorCodigo("RIUEB", function (resultado) {
                    $scope.retencionPorBienes = resultado;
                    cpcRetencion.parTipoAlicuota.codigo = $scope.retencionPorBienes.codigo;
                    //RIT: RETENCION IT
                    $scope.obtieneParametricaAlicuotaPorCodigo("RIT", function (resultado) {
                        $scope.retencionIt = resultado;
                        //DPAG:DECUENTO PAGO , GROS:GROSSING UP
                        montoGeneral = monto;
                        if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                            var IueRestaIt = 100 - (parseFloat($scope.retencionPorBienes.valor) + parseFloat($scope.retencionIt.valor));
                            var nuevoPorcentaje = (IueRestaIt / 100);
                            var nuevoMonto = monto / nuevoPorcentaje;
                            montoGeneral = nuevoMonto;
                        }
                        var retencionPorBienes = (parseFloat($scope.retencionPorBienes.valor) / 100) * montoGeneral;
                        var retencionItValor = (parseFloat($scope.retencionIt.valor) / 100) * montoGeneral;
                        retencionPorBienes = Math.round(retencionPorBienes * 100) / 100;
                        retencionItValor = Math.round(retencionItValor * 100) / 100;

                        var suma = parseFloat(retencionPorBienes) + parseFloat(retencionItValor);
                        console.info("SUMA:", suma);
                        var valorContraCuenta = parseFloat(montoGeneral) - parseFloat(suma);

                        console.info(montoGeneral);
                        console.info(retencionPorBienes);
                        console.info(retencionItValor);
                        console.info(valorContraCuenta);

                        if (valorPrimeraMoneda) {
                            cpcRetencion.montoPrimeraMoneda = montoGeneral;
                            cpcRetencion.iuePrimeraMoneda = retencionPorBienes;
                            cpcRetencion.itPrimeraMoneda = retencionItValor;
                            cpcRetencion.ivaPrimeraMoneda = 0;
                            cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                        } else {
                            cpcRetencion.montoSegundaMoneda = montoGeneral;
                            cpcRetencion.iueSegundaMoneda = retencionPorBienes;
                            cpcRetencion.itSegundaMoneda = retencionItValor;
                            cpcRetencion.ivaSegundaMoneda = 0;
                            cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                        }
                    });
                });

                break;
            case "RRIT"://RETENCION RC - IVA - IT
                //RRIVA:RETENCIONES RC-IVA
                $scope.obtieneParametricaAlicuotaPorCodigo("RRIVA", function (resultado) {
                    $scope.retencionPorRcIva = resultado;
                    cpcRetencion.parTipoAlicuota.codigo = $scope.retencionPorRcIva.codigo;
                    //RIT: RETENCION IT
                    $scope.obtieneParametricaAlicuotaPorCodigo("RIT", function (resultado) {
                        $scope.retencionIt = resultado;
                        //DPAG:DECUENTO PAGO , GROS:GROSSING UP
                        montoGeneral = monto;
                        if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                            var IueRestaIt = 100 - (parseFloat($scope.retencionPorRcIva.valor) + parseFloat($scope.retencionIt.valor));
                            var nuevoPorcentaje = (IueRestaIt / 100);
                            var nuevoMonto = monto / nuevoPorcentaje;
                            montoGeneral = nuevoMonto;
                        }
                        var retencionPorRcIva = (parseFloat($scope.retencionPorRcIva.valor) / 100) * montoGeneral;
                        var retencionItValor = (parseFloat($scope.retencionIt.valor) / 100) * montoGeneral;
                        retencionPorRcIva = Math.round(retencionPorRcIva * 100) / 100;
                        retencionItValor = Math.round(retencionItValor * 100) / 100;
                        var suma = parseFloat(retencionPorRcIva) + parseFloat(retencionItValor);
                        var valorContraCuenta = parseFloat(montoGeneral) - parseFloat(suma);
                        if (valorPrimeraMoneda) {
                            cpcRetencion.montoPrimeraMoneda = montoGeneral;
                            cpcRetencion.iuePrimeraMoneda = 0;
                            cpcRetencion.itPrimeraMoneda = retencionItValor;
                            cpcRetencion.ivaPrimeraMoneda = retencionPorRcIva;
                            cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                        } else {
                            cpcRetencion.montoSegundaMoneda = montoGeneral;
                            cpcRetencion.iueSegundaMoneda = 0;
                            cpcRetencion.itSegundaMoneda = retencionItValor;
                            cpcRetencion.ivaSegundaMoneda = retencionPorRcIva;
                            cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                        }
                    });
                });

                break;
            case "RRI"://RETENCION RC - IVA
                //RRIVA: RETENCIONES RC-IVA
                $scope.obtieneParametricaAlicuotaPorCodigo("RRIVA", function (resultado) {
                    $scope.retencionPorRcIva = resultado;
                    cpcRetencion.parTipoAlicuota.codigo = $scope.retencionPorRcIva.codigo;
                    //DPAG:DECUENTO PAGO , GROS:GROSSING UP
                    montoGeneral = monto;
                    if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                        var IueRestaIt = 100 - (parseFloat($scope.retencionPorRcIva.valor));
                        var nuevoPorcentaje = (IueRestaIt / 100);
                        var nuevoMonto = monto / nuevoPorcentaje;
                        montoGeneral = nuevoMonto;
                    }
                    var retencionPorRcIva = (parseFloat($scope.retencionPorRcIva.valor) / 100) * montoGeneral;
                    var suma = retencionPorRcIva;
                    retencionPorRcIva = Math.round(retencionPorRcIva * 100) / 100;
                    suma = Math.round(suma * 100) / 100;

                    var valorContraCuenta = parseFloat(montoGeneral) - parseFloat(suma);
                    if (valorPrimeraMoneda) {
                        cpcRetencion.montoPrimeraMoneda = montoGeneral;
                        cpcRetencion.iuePrimeraMoneda = 0;
                        cpcRetencion.itPrimeraMoneda = 0;
                        cpcRetencion.ivaPrimeraMoneda = retencionPorRcIva;
                        cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                    } else {
                        cpcRetencion.montoSegundaMoneda = montoGeneral;
                        cpcRetencion.iueSegundaMoneda = 0;
                        cpcRetencion.itSegundaMoneda = 0;
                        cpcRetencion.ivaSegundaMoneda = retencionPorRcIva;
                        cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                    }
                });
                break;
            case "RIPBE"://RETENCION IUE POR BENEFICIARIO AL EXTERIOR
                //RPRE: RETENCIONES IUE POR REMESAS AL EXTERIOR
                $scope.obtieneParametricaAlicuotaPorCodigo("RPRE", function (resultado) {
                    $scope.retencionExterior = resultado;
                    cpcRetencion.parTipoAlicuota.codigo = $scope.retencionExterior.codigo;
                    //DPAG:DECUENTO PAGO , GROS:GROSSING UP
                    montoGeneral = monto;
                    if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                        var IueRestaIt = 100 - (parseFloat($scope.retencionExterior.valor));
                        var nuevoPorcentaje = (IueRestaIt / 100);
                        var nuevoMonto = monto / nuevoPorcentaje;
                        montoGeneral = nuevoMonto;
                    }
                    var retencionExterior = (parseFloat($scope.retencionExterior.valor) / 100) * montoGeneral;
                    var suma = retencionExterior;
                    retencionExterior = Math.round(retencionExterior * 100) / 100;
                    suma = Math.round(suma * 100) / 100;

                    var valorContraCuenta = parseFloat(montoGeneral) - parseFloat(suma);
                    if (valorPrimeraMoneda) {
                        cpcRetencion.montoPrimeraMoneda = montoGeneral;
                        cpcRetencion.iuePrimeraMoneda = retencionExterior;
                        cpcRetencion.itPrimeraMoneda = 0;
                        cpcRetencion.ivaPrimeraMoneda = 0;
                        cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                    } else {
                        cpcRetencion.montoSegundaMoneda = montoGeneral;
                        cpcRetencion.iueSegundaMoneda = retencionExterior;
                        cpcRetencion.itSegundaMoneda = 0;
                        cpcRetencion.ivaSegundaMoneda = 0;
                        cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                    }
                });
                break;
            default:
                break;
        }


    };


    $scope.obtieneParametricaAlicuotaPorCodigo = function (codigoAlicuota, funcion) {
        $scope.alicuotaPar = {};
        cxpService.findParAlicuotaByCodigo({}, {}, codigoAlicuota, serverConf.ERPCONTA_WS, function (response) {
            $scope.alicuotaPar = response.data;
            funcion($scope.alicuotaPar);
        }, function (responseError) {
            funcion($scope.alicuotaPar);
        });
    };


    $scope.modalCreacionRetencionGrossingUp = function () {
        var modalCreacionRetencionGrossingUp = modalService.show(
            {
                templateUrl: 'modules/cxp/views/modalCreacionRetencionGrossingUp.html',
                controller: 'modalCreacionRetencionGrossingUpCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {

            });

    };

    $scope.monedaRetencionGrossingUpCombo = function () {
        if ($scope.listaDetalleRetencion.length <= 0) {
            if ($scope.cpcRetencion.parTipoMoneda.codigo == primeraMonedaEnum) {
                $scope.muestraPrimeraMoneda = true;
                $scope.muestraSegundaMoneda = false;
            } else {
                $scope.muestraPrimeraMoneda = false;
                $scope.muestraSegundaMoneda = true;
            }
            $scope.cpcRetencion.montoPrimeraMoneda = null;
            $scope.cpcRetencion.montoSegundaMoneda = null;
        } else {
            var mensaje = "Si cambia el tipo de Moneda, se eliminaran los registro del 'Detalle Retención'";
            $scope.modalMensajeConfirmacionCambioMonedaRetencion(mensaje);
        }

    };

    $scope.modalMensajeConfirmacionCambioMonedaRetencion = function (mensaje) {
        var modalMensajeConfirmacion = modalService.show(
            {
                templateUrl: 'modules/cxp/views/modalMensajeConfirmacionCambioMonedaRetencion.html',
                controller: 'modalMensajeConfirmacionCambioMonedaRetencionCtrl',
                size: 'md'
            }, {
                mensaje: mensaje
            }
        ).then(function (respModal) {
                if (respModal) {
                    $scope.listaDetalleRetencion = [];
                } else {
                    $scope.cpcRetencion.parTipoMoneda.codigo = $scope.cpcRetencion.parTipoMoneda.codigo == "BOL" ? "SUS" : "BOL";
                }
            });
    };

    $scope.seleccionaAplicantesPorDepartamentoCombo = function () {
        var idDepartamento = $scope.cpcRetencion.erpAplicante.erpDepartamento.idDepartamento;
        cxpService.getListErpAplicanteByIdDepartamento({}, {}, idDepartamento, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaAplicante = response.data;
        });
    };

    $scope.guardaRetencion = function () {
        $scope.showLoader();
        cxpService.adicionaRetencion($scope.cpcRetencion, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.activaBotonGuarda = false;
            $scope.activaBotonContinua = true;
            $scope.activaCampo = true;
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Los datos se guardaron correctamente",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 6000
            });
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Ocurrió un error.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 6000
            });
        });
    };

    $scope.continuarRetencion = function () {
        $scope.activaBotonGuarda = true;
        $scope.activaCampo = false;
        $scope.activaBotonContinua = false;
        $scope.listaDetalleRetencion = [];
        $scope.cpcRetencion = retencion.getObject();
        $scope.cpcRetencion.parTipoMoneda.codigo = "BOL";
        $scope.muestraPrimeraMoneda = true;
    };

    $scope.cancelarRetencion = function () {
        if ($scope.cpcRetencion.parTipoMoneda.codigo == "BOL") {
            $scope.verificaCamposLlenosBOB(function (respuesta) {
                if (!respuesta) {
                    $state.transitionTo('splashScreen', {}, {reload: true});
                } else {
                    if (!$scope.activaCampo) {
                        var mensaje = "Si cancela, se perderan los datos del formulario.";
                        $scope.modalMensajeConfirmacionCancelaRetencion(mensaje);
                    } else {
                        $state.transitionTo('splashScreen', {}, {reload: true});
                    }
                }
            });
        } else {
            $scope.verificaCamposLlenosUSD(function (respuesta) {
                if (!respuesta) {
                    $state.transitionTo('splashScreen', {}, {reload: true});
                } else {
                    if (!$scope.activaCampo) {
                        var mensaje = "Si cancela, se perderan los datos del formulario.";
                        $scope.modalMensajeConfirmacionCancelaRetencion(mensaje);
                    } else {
                        $state.transitionTo('splashScreen', {}, {reload: true});
                    }
                }
            });
        }

    };

    $scope.modalMensajeConfirmacionCancelaRetencion = function (mensaje) {
        var modalMensajeConfirmacion = modalService.show(
            {
                templateUrl: 'modules/cxp/views/modalMensajeConfirmacionCambioMonedaRetencion.html',
                controller: 'modalMensajeConfirmacionCambioMonedaRetencionCtrl',
                size: 'md'
            }, {
                mensaje: mensaje
            }
        ).then(function (respModal) {
                if (respModal) {
                    $state.transitionTo('splashScreen', {}, {reload: true});
                }
            });
    };


// CODIGO NUEVO


    $scope.eventoCalculaRetencionBOB = function () {
        $scope.verificaCamposLlenosBOB(function (respuesta) {
            if (respuesta) {
                $scope.cpcRetencion.montoSegundaMoneda = 0;
                $scope.calculaRetencion($scope.cpcRetencion);
            }
        });
    };

    $scope.eventoCalculaRetencionUSD = function () {
        $scope.verificaCamposLlenosUSD(function (respuesta) {
            if (respuesta) {
                $scope.cpcRetencion.montoPrimeraMoneda = 0;
                $scope.calculaRetencion($scope.cpcRetencion);
            }
        });
    };

    $scope.verificaCamposLlenosBOB = function (funcion) {
        if ($scope.cpcRetencion.concepto != "" && $scope.cpcRetencion.concepto != null && typeof $scope.cpcRetencion.concepto != "undefined") {
            if ($scope.cpcRetencion.montoPrimeraMoneda != "" && $scope.cpcRetencion.montoPrimeraMoneda != null && typeof $scope.cpcRetencion.montoPrimeraMoneda != "undefined") {
                if ($scope.cpcRetencion.parTipoRetencion.codigo != "" && $scope.cpcRetencion.parTipoRetencion.codigo != null && typeof $scope.cpcRetencion.parTipoRetencion.codigo != "undefined") {
                    if ($scope.cpcRetencion.parTipoAplicacionRetencion.codigo != "" && $scope.cpcRetencion.parTipoAplicacionRetencion.codigo != null && $scope.cpcRetencion.parTipoAplicacionRetencion.codigo != "undefined") {
                        funcion(true);
                    } else {
                        funcion(false);
                    }
                } else {
                    funcion(false);
                }
            } else {
                funcion(false);
            }
        } else {
            funcion(false);
        }
    };

    $scope.verificaCamposLlenosUSD = function (funcion) {
        if ($scope.cpcRetencion.concepto != "" && $scope.cpcRetencion.concepto != null && typeof $scope.cpcRetencion.concepto != "undefined") {
            if ($scope.cpcRetencion.montoSegundaMoneda != "" && $scope.cpcRetencion.montoSegundaMoneda != null && typeof $scope.cpcRetencion.montoSegundaMoneda != "undefined") {
                if ($scope.cpcRetencion.parTipoRetencion.codigo != "" && $scope.cpcRetencion.parTipoRetencion.codigo != null && typeof $scope.cpcRetencion.parTipoRetencion.codigo != "undefined") {
                    if ($scope.cpcRetencion.parTipoAplicacionRetencion.codigo != "" && $scope.cpcRetencion.parTipoAplicacionRetencion.codigo != null && $scope.cpcRetencion.parTipoAplicacionRetencion.codigo != "undefined") {
                        funcion(true);
                    } else {
                        funcion(false);
                    }
                } else {
                    funcion(false);
                }
            } else {
                funcion(false);
            }
        } else {
            funcion(false);
        }
    };

    $scope.modalBuscadorProveedoresRetenciones = function () {
        var modalProveedores = modalService.show(
            {
                templateUrl: 'modules/cxp/views/buscadorProveedores.html',
                controller: 'buscadorProveedoresCtrl',
                size: 'md'
            }/*, {
             idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
             }*/
        ).then(function (respModal) {
                $scope.cpcRetencion.cppProveedorCliente.idProveedorCliente = respModal.idProveedorCliente;
                $scope.valores.nombreRazonSocial = respModal.nombreCompleto;
                $scope.valores.nit = respModal.nitCi;
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    init();

});

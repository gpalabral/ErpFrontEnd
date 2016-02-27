/**
 * Created by paola on 23-02-15.
 */
'use strict';

app.controller('registroSinFacturaCtrl', function ($scope, cxpService, serverConf, $http, $modal, modalService,
                                                   localStorageService, tempCache, cxcService, retencionModel,
                                                   detalleRetencionModel, $timeout, $state) {

    /************************Definicion de variables*********************************/
    $scope.activaBotonesRetencionGrossingUp = false;

    var primeraMonedaEnum = "BOL";
    var retencion = new retencionModel();
    var detalleRetencion = new detalleRetencionModel();

    $scope.listaDetalleRetencion = [];
    $scope.listaDepartamento = [];
    $scope.listaAplicante = [];
    $scope.listaTipoDocumento = [];
    $scope.activaCampo = false;
    $scope.activaBotonGuarda = false;
    $scope.activaBotonContinua = false;


    /******************************Fin Definicion de variables****************************/


    /* Creado por: Paola Mejia
     Funcionalidad de la grilla de conceptos*/
    var init = function () {
        $scope.cpcRetencion = retencion.getObject();

        $scope.cpcRetencion.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
        $scope.itemSeleccionado = tempCache.proveedorGrupoConcepto;
        $scope.activaBotonGuarda = true;
        $scope.activaBotonContinua = false;
        $scope.muestraListaParTipoMoneda();
        $scope.muestraListaDepartamento();
        $scope.listaParTipoDocumento();

        $timeout(function () {
            visibleColumnasGridDetalleRetencion();
        }, 2000);

    };


    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridDetalleRetencion = {
        data: 'listaDetalleRetencion',
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        showFooter: true,
        enableColumnResize: true,
        footerTemplate: '<div style="width: 50%; display: inline-block; text-align: right"><label class="control-label">TOTALES&nbsp;&nbsp;</label></div>' +
        '<div ng-style="{width:muestraPrimeraMoneda?\'25%\':\'0%\', opacity:muestraPrimeraMoneda?1:0}" style="display: inline-block;"><input type="text" class="form-control text-right" ng-model="objetoSumaTotal.montoDebitoPrimeraMoneda" ng-show="muestraPrimeraMoneda" ui-number-mask disabled></div>' +
        '<div ng-style="{width:muestraSegundaMoneda?\'25%\':\'0%\', opacity:muestraSegundaMoneda?1:0}" style="display: inline-block;"><input type="text" class="form-control text-right" ng-model="objetoSumaTotal.montoDebitoSegundaMoneda" ng-show="muestraSegundaMoneda" ui-number-mask disabled></div>' +
        '<div ng-style="{width:muestraPrimeraMoneda?\'25%\':\'0%\', opacity:muestraPrimeraMoneda?1:0}" style="display: inline-block;"><input type="text" class="form-control text-right" ng-model="objetoSumaTotal.montoCreditoPrimeraMoneda" ng-show="muestraPrimeraMoneda" ui-number-mask disabled></div>' +
        '<div ng-style="{width:muestraSegundaMoneda?\'25%\':\'0%\', opacity:muestraSegundaMoneda?1:0}" style="display: inline-block;"><input type="text" class="form-control text-right" ng-model="objetoSumaTotal.montoCreditoSegundaMoneda" ng-show="muestraSegundaMoneda" ui-number-mask disabled></div>',
        footerRowHeight: 32,
        columnDefs: [
            {
                field: 'concepto',
                displayName: "Concepto",
                width: '50%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: 'text-left'
            },
            {
                field: "montoDebitoPrimeraMoneda",
                displayName: "Débito (BOB)",
                //width: '25%',
                enableCellSelection: true,
                enableCellEdit: true,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplate
            },
            {
                field: "montoDebitoSegundaMoneda",
                displayName: "Débito (USD)",
                //width: '25%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplate
            },
            {
                field: "montoCreditoPrimeraMoneda",
                displayName: "Crédito (BOB)",
                //width: '25%',
                enableCellSelection: true,
                enableCellEdit: true,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplate
            },
            {
                field: "montoCreditoSegundaMoneda",
                displayName: "Crédito (USD)",
                //width: '25%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplate
            }
        ]
    };

    function visibleColumnasGridDetalleRetencion() {
        for (var i = 0; i < $scope.gridDetalleRetencion.$gridScope.columns.length; i++) {
            var column = $scope.gridDetalleRetencion.$gridScope.columns[i];
            console.info("column.field:", column.field);
            switch (column.field) {
                case "montoDebitoPrimeraMoneda":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "montoDebitoSegundaMoneda":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                case "montoCreditoPrimeraMoneda":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "montoCreditoSegundaMoneda":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.buttonActive = {
        tipoDeRegistro: "SFAC", // SFAC RET GROS
        tiposDeRetencion: "SRET"//SRET	SIN RETENCION,BIEN	BIENES,SERV	SERVICIOS,RIVA	RC-IVA,ALQU	ALQUILERES,REXT	REMESAS AL EXTERIOR,IUIT	IUE-IT IND. EXPORTADOR
    };

    $scope.accionBotonesRetencion = function () {
        console.info("ENTRO:", $scope.activaBotonesRetencionGrossingUp);
        $scope.activaBotonesRetencionGrossingUp = true;
    };
    $scope.accionBotonesGrossingUp = function () {
        console.info("ENTRO:", $scope.activaBotonesRetencionGrossingUp);
        $scope.activaBotonesRetencionGrossingUp = true;
    };
    $scope.accionBotonesSinFactura = function () {
        console.info("ENTRO:", $scope.activaBotonesRetencionGrossingUp);
        $scope.activaBotonesRetencionGrossingUp = false;
    };


    //CODIGO NUEVO

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

    $scope.habilitaCampoTipoCambio = function (valor) {
        $scope.habilitaInputTipoCambio = true;
    };


    $scope.calculaRetencion = function (cpcRetencion) {

        var valorPrimeraMoneda = $scope.cpcRetencion.montoPrimeraMoneda != null && $scope.cpcRetencion.montoPrimeraMoneda != undefined && $scope.cpcRetencion.montoPrimeraMoneda != 0;
        var valorSegundaMoneda = $scope.cpcRetencion.montoSegundaMoneda != null && $scope.cpcRetencion.montoSegundaMoneda != undefined && $scope.cpcRetencion.montoSegundaMoneda != 0;
        var monto = valorPrimeraMoneda ? cpcRetencion.montoPrimeraMoneda : valorSegundaMoneda ? cpcRetencion.montoSegundaMoneda : 0;
        var montoGeneral = 0;

        $scope.cpcDetalleRetencionPrimero = detalleRetencion.getObject();
        $scope.cpcDetalleRetencionSegundo = detalleRetencion.getObject();
        $scope.cpcDetalleRetencionTercero = detalleRetencion.getObject();
        $scope.cpcDetalleRetencionCuarto = detalleRetencion.getObject();

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
                        $scope.cpcDetalleRetencionPrimero.concepto = $scope.conceptoRetencion;
                        $scope.cpcDetalleRetencionSegundo.concepto = $scope.retencionPorServicio.descripcion + " " + $scope.retencionPorServicio.valor + "%";
                        $scope.cpcDetalleRetencionTercero.concepto = $scope.retencionIt.descripcion + " " + $scope.retencionIt.valor + "%";
                        $scope.cpcDetalleRetencionCuarto.concepto = "MONTO REMANENTE";
                        montoGeneral = monto;
                        if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                            var IueRestaIt = 100 - (parseFloat($scope.retencionPorServicio.valor) + parseFloat($scope.retencionIt.valor));
                            var nuevoPorcentaje = (IueRestaIt / 100);
                            var nuevoMonto = monto / nuevoPorcentaje;
                            montoGeneral = nuevoMonto;
                        }
                        var retencionPorServicio = (parseFloat($scope.retencionPorServicio.valor) / 100) * montoGeneral;
                        var retencionItValor = (parseFloat($scope.retencionIt.valor) / 100) * montoGeneral;
                        var suma = retencionPorServicio + retencionItValor;
                        var valorContraCuenta = montoGeneral - suma;
                        if (valorPrimeraMoneda) {
                            $scope.cpcDetalleRetencionPrimero.montoDebitoPrimeraMoneda = montoGeneral;
                            $scope.cpcDetalleRetencionSegundo.montoCreditoPrimeraMoneda = retencionPorServicio;
                            $scope.cpcDetalleRetencionTercero.montoCreditoPrimeraMoneda = retencionItValor;
                            $scope.cpcDetalleRetencionCuarto.montoCreditoPrimeraMoneda = valorContraCuenta;

                            cpcRetencion.montoPrimeraMoneda = montoGeneral;
                            cpcRetencion.iuePrimeraMoneda = retencionPorServicio;
                            cpcRetencion.itPrimeraMoneda = retencionItValor;
                            cpcRetencion.ivaPrimeraMoneda = 0;
                            cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;

                        } else {
                            $scope.cpcDetalleRetencionPrimero.montoDebitoSegundaMoneda = montoGeneral;
                            $scope.cpcDetalleRetencionSegundo.montoCreditoSegundaMoneda = retencionPorServicio;
                            $scope.cpcDetalleRetencionTercero.montoCreditoSegundaMoneda = retencionItValor;
                            $scope.cpcDetalleRetencionCuarto.montoCreditoSegundaMoneda = valorContraCuenta;

                            cpcRetencion.montoSegundaMoneda = montoGeneral;
                            cpcRetencion.iueSegundaMoneda = retencionPorServicio;
                            cpcRetencion.itSegundaMoneda = retencionItValor;
                            cpcRetencion.ivaSegundaMoneda = 0;
                            cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                        }
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionPrimero);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionSegundo);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionTercero);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionCuarto);

                        sumaMonto($scope.listaDetalleRetencion);

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
                        $scope.cpcDetalleRetencionPrimero.concepto = $scope.conceptoRetencion;
                        $scope.cpcDetalleRetencionSegundo.concepto = $scope.retencionPorBienes.descripcion + " " + $scope.retencionPorBienes.valor + "%";
                        $scope.cpcDetalleRetencionTercero.concepto = $scope.retencionIt.descripcion + " " + $scope.retencionIt.valor + "%";
                        $scope.cpcDetalleRetencionCuarto.concepto = "MONTO REMANENTE";
                        montoGeneral = monto;
                        if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                            var IueRestaIt = 100 - (parseFloat($scope.retencionPorBienes.valor) + parseFloat($scope.retencionIt.valor));
                            var nuevoPorcentaje = (IueRestaIt / 100);
                            var nuevoMonto = monto / nuevoPorcentaje;
                            montoGeneral = nuevoMonto;
                        }
                        var retencionPorBienes = (parseFloat($scope.retencionPorBienes.valor) / 100) * montoGeneral;
                        var retencionItValor = (parseFloat($scope.retencionIt.valor) / 100) * montoGeneral;
                        var suma = retencionPorBienes + retencionItValor;
                        var valorContraCuenta = montoGeneral - suma;
                        if (valorPrimeraMoneda) {
                            $scope.cpcDetalleRetencionPrimero.montoDebitoPrimeraMoneda = montoGeneral;
                            $scope.cpcDetalleRetencionSegundo.montoCreditoPrimeraMoneda = retencionPorBienes;
                            $scope.cpcDetalleRetencionTercero.montoCreditoPrimeraMoneda = retencionItValor;
                            $scope.cpcDetalleRetencionCuarto.montoCreditoPrimeraMoneda = valorContraCuenta;

                            cpcRetencion.montoPrimeraMoneda = montoGeneral;
                            cpcRetencion.iuePrimeraMoneda = retencionPorBienes;
                            cpcRetencion.itPrimeraMoneda = retencionItValor;
                            cpcRetencion.ivaPrimeraMoneda = 0;
                            cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                        } else {
                            $scope.cpcDetalleRetencionPrimero.montoDebitoSegundaMoneda = montoGeneral;
                            $scope.cpcDetalleRetencionSegundo.montoCreditoSegundaMoneda = retencionPorBienes;
                            $scope.cpcDetalleRetencionTercero.montoCreditoSegundaMoneda = retencionItValor;
                            $scope.cpcDetalleRetencionCuarto.montoCreditoSegundaMoneda = valorContraCuenta;

                            cpcRetencion.montoSegundaMoneda = montoGeneral;
                            cpcRetencion.iueSegundaMoneda = retencionPorBienes;
                            cpcRetencion.itSegundaMoneda = retencionItValor;
                            cpcRetencion.ivaSegundaMoneda = 0;
                            cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                        }
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionPrimero);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionSegundo);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionTercero);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionCuarto);

                        sumaMonto($scope.listaDetalleRetencion);
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
                        $scope.cpcDetalleRetencionPrimero.concepto = $scope.conceptoRetencion;
                        $scope.cpcDetalleRetencionSegundo.concepto = $scope.retencionPorRcIva.descripcion + " " + $scope.retencionPorRcIva.valor + "%";
                        $scope.cpcDetalleRetencionTercero.concepto = $scope.retencionIt.descripcion + " " + $scope.retencionIt.valor + "%";
                        $scope.cpcDetalleRetencionCuarto.concepto = "MONTO REMANENTE";
                        montoGeneral = monto;
                        if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                            var IueRestaIt = 100 - (parseFloat($scope.retencionPorRcIva.valor) + parseFloat($scope.retencionIt.valor));
                            var nuevoPorcentaje = (IueRestaIt / 100);
                            var nuevoMonto = monto / nuevoPorcentaje;
                            montoGeneral = nuevoMonto;
                        }
                        var retencionPorRcIva = (parseFloat($scope.retencionPorRcIva.valor) / 100) * montoGeneral;
                        var retencionItValor = (parseFloat($scope.retencionIt.valor) / 100) * montoGeneral;
                        var suma = retencionPorRcIva + retencionItValor;
                        var valorContraCuenta = montoGeneral - suma;
                        if (valorPrimeraMoneda) {
                            $scope.cpcDetalleRetencionPrimero.montoDebitoPrimeraMoneda = montoGeneral;
                            $scope.cpcDetalleRetencionSegundo.montoCreditoPrimeraMoneda = retencionPorRcIva;
                            $scope.cpcDetalleRetencionTercero.montoCreditoPrimeraMoneda = retencionItValor;
                            $scope.cpcDetalleRetencionCuarto.montoCreditoPrimeraMoneda = valorContraCuenta;

                            cpcRetencion.montoPrimeraMoneda = montoGeneral;
                            cpcRetencion.iuePrimeraMoneda = 0;
                            cpcRetencion.itPrimeraMoneda = retencionItValor;
                            cpcRetencion.ivaPrimeraMoneda = retencionPorRcIva;
                            cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                        } else {
                            $scope.cpcDetalleRetencionPrimero.montoDebitoSegundaMoneda = montoGeneral;
                            $scope.cpcDetalleRetencionSegundo.montoCreditoSegundaMoneda = retencionPorRcIva;
                            $scope.cpcDetalleRetencionTercero.montoCreditoSegundaMoneda = retencionItValor;
                            $scope.cpcDetalleRetencionCuarto.montoCreditoSegundaMoneda = valorContraCuenta;

                            cpcRetencion.montoSegundaMoneda = montoGeneral;
                            cpcRetencion.iueSegundaMoneda = 0;
                            cpcRetencion.itSegundaMoneda = retencionItValor;
                            cpcRetencion.ivaSegundaMoneda = retencionPorRcIva;
                            cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                        }
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionPrimero);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionSegundo);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionTercero);
                        $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionCuarto);

                        sumaMonto($scope.listaDetalleRetencion);
                    });
                });

                break;
            case "RRI"://RETENCION RC - IVA
                //RRIVA: RETENCIONES RC-IVA
                $scope.obtieneParametricaAlicuotaPorCodigo("RRIVA", function (resultado) {
                    $scope.retencionPorRcIva = resultado;
                    cpcRetencion.parTipoAlicuota.codigo = $scope.retencionPorRcIva.codigo;

                    //DPAG:DECUENTO PAGO , GROS:GROSSING UP
                    $scope.cpcDetalleRetencionPrimero.concepto = $scope.conceptoRetencion;
                    $scope.cpcDetalleRetencionSegundo.concepto = $scope.retencionPorRcIva.descripcion + " " + $scope.retencionPorRcIva.valor + "%";
                    $scope.cpcDetalleRetencionTercero.concepto = "MONTO REMANENTE";
                    montoGeneral = monto;
                    if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                        var IueRestaIt = 100 - (parseFloat($scope.retencionPorRcIva.valor));
                        var nuevoPorcentaje = (IueRestaIt / 100);
                        var nuevoMonto = monto / nuevoPorcentaje;
                        montoGeneral = nuevoMonto;
                    }
                    var retencionPorRcIva = (parseFloat($scope.retencionPorRcIva.valor) / 100) * montoGeneral;
                    var suma = retencionPorRcIva;
                    var valorContraCuenta = montoGeneral - suma;
                    if (valorPrimeraMoneda) {
                        $scope.cpcDetalleRetencionPrimero.montoDebitoPrimeraMoneda = montoGeneral;
                        $scope.cpcDetalleRetencionSegundo.montoCreditoPrimeraMoneda = retencionPorRcIva;
                        $scope.cpcDetalleRetencionTercero.montoCreditoPrimeraMoneda = valorContraCuenta;

                        cpcRetencion.montoPrimeraMoneda = montoGeneral;
                        cpcRetencion.iuePrimeraMoneda = 0;
                        cpcRetencion.itPrimeraMoneda = 0;
                        cpcRetencion.ivaPrimeraMoneda = retencionPorRcIva;
                        cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                    } else {
                        $scope.cpcDetalleRetencionPrimero.montoDebitoSegundaMoneda = montoGeneral;
                        $scope.cpcDetalleRetencionSegundo.montoCreditoSegundaMoneda = retencionPorRcIva;
                        $scope.cpcDetalleRetencionTercero.montoCreditoSegundaMoneda = valorContraCuenta;

                        cpcRetencion.montoSegundaMoneda = montoGeneral;
                        cpcRetencion.iueSegundaMoneda = 0;
                        cpcRetencion.itSegundaMoneda = 0;
                        cpcRetencion.ivaSegundaMoneda = retencionPorRcIva;
                        cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                    }
                    $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionPrimero);
                    $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionSegundo);
                    $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionTercero);

                    sumaMonto($scope.listaDetalleRetencion);
                });
                break;
            case "RIPBE"://RETENCION IUE POR BENEFICIARIO AL EXTERIOR
                //RPRE: RETENCIONES IUE POR REMESAS AL EXTERIOR
                $scope.obtieneParametricaAlicuotaPorCodigo("RPRE", function (resultado) {
                    $scope.retencionExterior = resultado;
                    cpcRetencion.parTipoAlicuota.codigo = $scope.retencionExterior.codigo;

                    //DPAG:DECUENTO PAGO , GROS:GROSSING UP
                    $scope.cpcDetalleRetencionPrimero.concepto = $scope.conceptoRetencion;
                    $scope.cpcDetalleRetencionSegundo.concepto = $scope.retencionExterior.descripcion + " " + $scope.retencionExterior.valor + "%";
                    $scope.cpcDetalleRetencionTercero.concepto = "MONTO REMANENTE";
                    montoGeneral = monto;
                    if (cpcRetencion.parTipoAplicacionRetencion.codigo == "GROS") {
                        var IueRestaIt = 100 - (parseFloat($scope.retencionExterior.valor));
                        var nuevoPorcentaje = (IueRestaIt / 100);
                        var nuevoMonto = monto / nuevoPorcentaje;
                        montoGeneral = nuevoMonto;
                    }
                    var retencionExterior = (parseFloat($scope.retencionExterior.valor) / 100) * montoGeneral;
                    var suma = retencionExterior;
                    var valorContraCuenta = montoGeneral - suma;
                    if (valorPrimeraMoneda) {
                        $scope.cpcDetalleRetencionPrimero.montoDebitoPrimeraMoneda = montoGeneral;
                        $scope.cpcDetalleRetencionSegundo.montoCreditoPrimeraMoneda = retencionExterior;
                        $scope.cpcDetalleRetencionTercero.montoCreditoPrimeraMoneda = valorContraCuenta;

                        cpcRetencion.montoPrimeraMoneda = montoGeneral;
                        cpcRetencion.iuePrimeraMoneda = retencionExterior;
                        cpcRetencion.itPrimeraMoneda = 0;
                        cpcRetencion.ivaPrimeraMoneda = 0;
                        cpcRetencion.montoRemanentePrimeraMoneda = valorContraCuenta;
                    } else {
                        $scope.cpcDetalleRetencionPrimero.montoDebitoSegundaMoneda = montoGeneral;
                        $scope.cpcDetalleRetencionSegundo.montoCreditoSegundaMoneda = retencionExterior;
                        $scope.cpcDetalleRetencionTercero.montoCreditoSegundaMoneda = valorContraCuenta;

                        cpcRetencion.montoSegundaMoneda = montoGeneral;
                        cpcRetencion.iueSegundaMoneda = retencionExterior;
                        cpcRetencion.itSegundaMoneda = 0;
                        cpcRetencion.ivaSegundaMoneda = 0;
                        cpcRetencion.montoRemanenteSegundaMoneda = valorContraCuenta;
                    }
                    $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionPrimero);
                    $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionSegundo);
                    $scope.listaDetalleRetencion.push($scope.cpcDetalleRetencionTercero);

                    sumaMonto($scope.listaDetalleRetencion);
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
            $scope.cpcRetencion.montoPrimeraMoneda = 0;
            $scope.cpcRetencion.montoSegundaMoneda = 0;
            visibleColumnasGridDetalleRetencion();
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
                    sumaMonto($scope.listaDetalleRetencion);

                } else {
                    $scope.cpcRetencion.parTipoMoneda.codigo = $scope.cpcRetencion.parTipoMoneda.codigo == "BOL" ? "SUS" : "BOL";
                }
            });
    };

    $scope.modalFormularioEmiteRetencionGrossinUp = function () {
        $scope.showLoader();
        tempCache.conceptoRetencion = "";
        console.info("CODIGO M:", $scope.cpcRetencion.parTipoMoneda.codigo);
        if ($scope.cpcRetencion.parTipoMoneda.codigo != "") {
            $scope.hideLoader();
            var modalRetencionGrossingUp = modalService.show(
                {
                    templateUrl: 'modules/cxp/views/modalCreacionRetencionGrossingUp.html',
                    controller: 'modalCreacionRetencionGrossingUpCtrl',
                    size: 'md'
                }, {
                    cpcRetencionEnviando: $scope.cpcRetencion
                }
            ).
                then(function (respModal) {
                    $scope.conceptoRetencion = tempCache.conceptoRetencion;
                    $scope.calculaRetencion(respModal);
                    $scope.muestraPrimeraMoneda = $scope.cpcRetencion.parTipoMoneda.codigo == "BOL" ? true : false;
                    $scope.muestraSegundaMoneda = $scope.cpcRetencion.parTipoMoneda.codigo == "SUS" ? true : false;
                    visibleColumnasGridDetalleRetencion();


                });
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validación",
                bodyText: "Es necesario seleccionar la 'Moneda'.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });

        }
    };

    $scope.seleccionaAplicantesPorDepartamentoCombo = function () {
        var idDepartamento = $scope.cpcRetencion.erpAplicante.erpDepartamento.idDepartamento;
        cxpService.getListErpAplicanteByIdDepartamento({}, {}, idDepartamento, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaAplicante = response.data;
        });
    };

    function sumaMonto(objetoListaDetalle) {
        console.info("LISTA:", objetoListaDetalle);

        $scope.sumarDebitoPrimeraMoneda = 0;
        $scope.sumarDebitoSegundaMoneda = 0;
        $scope.sumarCreditoPrimeraMoneda = 0;
        $scope.sumarCreditoSegundaMoneda = 0;
        angular.forEach(objetoListaDetalle, function (detalle) {
            console.info("A:", detalle.montoDebitoPrimeraMoneda, "B:", detalle.montoDebitoSegundaMoneda, "C:", detalle.montoCreditoPrimeraMoneda, "D:", detalle.montoCreditoSegundaMoneda);
            $scope.sumarDebitoPrimeraMoneda = $scope.sumarDebitoPrimeraMoneda + Number(detalle.montoDebitoPrimeraMoneda);
            $scope.sumarDebitoSegundaMoneda = $scope.sumarDebitoSegundaMoneda + Number(detalle.montoDebitoSegundaMoneda);
            $scope.sumarCreditoPrimeraMoneda = $scope.sumarCreditoPrimeraMoneda + Number(detalle.montoCreditoPrimeraMoneda);
            $scope.sumarCreditoSegundaMoneda = $scope.sumarCreditoSegundaMoneda + Number(detalle.montoCreditoSegundaMoneda);
        });

        $scope.objetoSumaTotal = {
            montoDebitoPrimeraMoneda: $scope.sumarDebitoPrimeraMoneda,
            montoDebitoSegundaMoneda: $scope.sumarDebitoSegundaMoneda,
            montoCreditoPrimeraMoneda: $scope.sumarCreditoPrimeraMoneda,
            montoCreditoSegundaMoneda: $scope.sumarCreditoSegundaMoneda
        };

        //funcion($scope.objetoSumaTotal);
    };

    $scope.guardaRetencion = function () {
        $scope.showLoader();
        cxpService.adicionaRetencion($scope.cpcRetencion, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.activaBotonGuarda = false;
            $scope.activaBotonContinua = true;
            $scope.activaCampo = true;
            $scope.showCustomModal({
                headerText: "Mensaje Confirmación",
                bodyText: "Se registro exitosamente el Contrato.",
                actionButtonText: "Continuar",
                type: 'exito',
                closeAfter: 6000
            });
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Existe un error al registrar el Contrato.",
                actionButtonText: "Continuar",
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
        sumaMonto($scope.listaDetalleRetencion);
        $scope.cpcRetencion = retencion.getObject();
    };

    $scope.cancelarRetencion = function () {
        console.info("LISTA:", $scope.listaDetalleRetencion.length);
        console.info("ACTIVA:", $scope.activaCampo);
        if ($scope.listaDetalleRetencion.length <= 0) {
            $state.transitionTo('splashScreen', {}, {reload: true});
        } else {
            if (!$scope.activaCampo) {
                var mensaje = "Si cancela, se perderan los datos del formulario y los registro del 'Detalle Retención'";

                $scope.modalMensajeConfirmacionCancelaRetencion(mensaje);
            } else {
                $state.transitionTo('splashScreen', {}, {reload: true});
            }


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


    init();

})
;

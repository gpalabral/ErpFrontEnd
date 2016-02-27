/**
 * Created by paola on 17-04-15.
 */
'use strict';

app.controller('emisionFacturaNotaDebitoCreditoCtrl', function ($scope, $state, cxcService, cxpService, serverConf, tempCache,
                                                                localStorageService, modalService, qr_generator, emisionFacturaModel,
                                                                facturaEmitidaModel, facturaEmitidaPojoModel,
                                                                cpanelService, erpNotaCreditoDebitoModel, erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojoModel,
                                                                erpDetalleFacturaModel, $timeout) {


    $scope.tipoCambioObjeto = localStorageService.get('tipoCambioObjeto');
    $scope.tipoCambio = $scope.tipoCambioObjeto.tipoCambio;
    $scope.fechaTipoCambio = $scope.tipoCambioObjeto.fecha;//fecha obtenida desde Contabilidad
    $scope.idSucursal = tempCache.idSucursalSeleccionada;
    $scope.idDosificacionSel = tempCache.idDosificacionSeleccionada;
    $scope.modo = {
        valor: false
    };

    $scope.activar = {
        gridNotasCreditoDebito: true
    };

    var facturaEmitidaPojo = new emisionFacturaModel();
    var erpDetalleFacturaModel = new erpDetalleFacturaModel();

    $scope.mostrar = {datosSucursal: false};
    $scope.datosEmpresa = {nit: '00147612027'};

    $scope.muestraGeneraQR = false;
    $scope.muestraCodigoControl = false;
    $scope.totalPrimera = 0;
    $scope.totalSegunda = 0;

    $scope.bloqueaCamposFormulario = false;

    $scope.activaBotonImprimir = false;
    $scope.activaBotonGuardar = true;
    $scope.activaBotonContinua = false;

    $scope.facturaEmitida = {
        "cpcDosificacion": {
            "llaveDosificacion": "",
            "numeroFacturaInicial": 0,
            "numeroAutorizacion": 0,
            "parEstadoProceso": {
                "codigo": "",
                "descripcion": ""
            },
            "idDosificacion": 0,
            "parCaracteristicaEspecial": {
                "codigo": "",
                "descripcion": ""
            },
            "parModalidadFacturacion": {
                "codigo": "",
                "descripcion": ""
            },
            "cpcSucursal": {
                "codigo": "",
                "descripcion": "",
                "direccion": "",
                "numeroSucursal": 0,
                "idSucursal": 0,
                "nombreLocalizacion": "",
                "parDepartamento": {
                    "codigo": "",
                    "descripcion": ""
                },
                "parLocalizacion": {
                    "codigo": "",
                    "descripcion": ""
                },
                "telefonoUno": "",
                "telefonoDos": "",
                "parEstado": {
                    "codigo": "",
                    "descripcion": ""
                },
                "emiteFactura": false,
                "parMunicipio": {
                    "codigo": "",
                    "descripcion": "",
                    "grupo": ""
                }
            },
            "numeroFacturaFinal": 0,
            "cpcActividadEconomica": {
                "codigo": "",
                "descripcion": ""
            },
            "fechaActivacion": "",
            "fechaSolicitud": "",
            "fechaLimiteEmision": ""
        },
        "idPadre": 0,
        "motivo": "",
        "cpcPagoContrato": null,
        "cppProveedorCliente": {
            "nombre": "",
            "razonSocial": "",
            "direccion": "",
            "correoElectronico": "",
            "parTipoDocumento": {
                "codigo": "",
                "descripcion": ""
            },
            "nit": 0,
            "logo": "",
            "parTipoRegistro": {
                "codigo": "",
                "descripcion": ""
            },
            "primerApellido": "",
            "segundoApellido": "",
            "numeroDocumento": "",
            "sigla": "",
            "idProveedorCliente": 0,
            "parTipoProveedorCliente": {
                "codigo": "",
                "descripcion": ""
            },
            "fechaAniversario": "",
            "telefonoUno": "",
            "telefonoDos": "",
            "numeroFax": "",
            "numeroCelular": "",
            "direccionWeb": "",
            "parEstado": {
                "codigo": "",
                "descripcion": ""
            }
        },
        "montoPrimeraMoneda": 0,
        "montoSegundaMoneda": 0,
        "numeroFactura": 0,
        "concepto": "",
        "codigoControl": "",
        "fechaFactura": new Date($scope.fechaTipoCambio),
        "glosa": "",
        "parModalidadTransaccion": {
            "codigo": "CONT",
            "descripcion": ""
        },
        "transporteInternacional": 0,
        "idFacturaEmitida": 0,
        "gastosTransporte": 0,
        "seguroInternacional": 0,
        "idCbteContable": 0,
        "totalDescuentoPrimeraMoneda": 0,
        "totalDescuentoSegundaMoneda": 0,
        "parTipoTransaccion": {
            "codigo": "VENT",
            "descripcion": ""
        },
        "parEstadoFactura": {
            "codigo": "",
            "descripcion": ""
        },
        "tipoCambioFactura": $scope.tipoCambio,
        "incoterm": "",
        "puertoDestino": "",
        "valorBruto": 0,
        "gastosSeguro": 0,
        "totalFob": 0,
        "otrosGastos": 0,
        "icePrimeraMoneda": 0,
        "iceSegundaMoneda": 0
    };

    var columnaSeleccionadaFacturaEmitida = null;
    var facturaEmitida = new facturaEmitidaModel();
    var erpNotaCreditoDebito = new erpNotaCreditoDebitoModel();
    var erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojo = new erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojoModel();

    $scope.erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojo = erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojo.getObject();
    $scope.erpNotaCreditoDebito = erpNotaCreditoDebito.getObject();
    $scope.cpcFacturaEmitida = facturaEmitida.getObject();
    $scope.facturaEmitidaPojo = facturaEmitidaPojo.getObject();
    $scope.datosDetalleFactura = $scope.facturaEmitidaPojo.listaCpcDetalleFactura;

    $scope.seleccionFacturaObjeto = [];
    $scope.datosDetalleFacturaNotaDebitoCredito = [];
    $scope.datosDetalleFactura = [];

    $scope.modo = {
        valor: false
    };


    function init() {

        $scope.fechaRegistro = new Date();
        $scope.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
        console.info("OBJETO LLEGO:", tempCache.facturaEmitidaCache);
        if (tempCache.facturaEmitidaCache != null) {
            $scope.cpcFacturaEmitida = tempCache.facturaEmitidaCache;

            $scope.ocultaColumnaPrimeraMoneda = tempCache.facturaEmitidaCache.cpcFacturaEmitida.cpcPagoContrato != null ? tempCache.facturaEmitidaCache.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.montoPrimeraMoneda == 0 : false;
            $scope.ocultaColumnaSegundaMoneda = tempCache.facturaEmitidaCache.cpcFacturaEmitida.cpcPagoContrato != null ? tempCache.facturaEmitidaCache.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.montoSegundaMoneda == 0 : false;
            $scope.ocultaColumnaCantidadConcepto = false;

            $scope.cpcFacturaEmitida.cpcFacturaEmitida.fechaFactura = new Date($scope.cpcFacturaEmitida.cpcFacturaEmitida.fechaFactura);

            cxcService.getCpcDetalleFacturaByIdFacturaEmitida({}, {}, $scope.cpcFacturaEmitida.cpcFacturaEmitida.idFactura, serverConf.ERPCONTA_WS, function (response) {
                //exito
                $scope.datosDetalleFactura = response.data;
                $scope.datosDetalleFacturaAux = [];
                angular.forEach($scope.datosDetalleFactura, function (data) {
                    if (data.precioUnitarioPrimeraMoneda != 0) {
                        data.precioUnitarioSegundaMoneda = parseFloat(data.precioUnitarioPrimeraMoneda) / $scope.tipoCambio;
                        data.subtotalSegundaMoneda = parseFloat(data.cantidad) * parseFloat(data.precioUnitarioSegundaMoneda);

                    }
                    if (data.precioUnitarioSegundaMoneda != 0) {
                        data.precioUnitarioPrimeraMoneda = parseFloat(data.precioUnitarioSegundaMoneda) * $scope.tipoCambio;
                        data.subtotalPrimeraMoneda = parseFloat(data.cantidad) * parseFloat(data.precioUnitarioPrimeraMoneda);
                    }
                });

                $timeout(function () {
                    console.info("ENTRO VISIBLE GRID DETALLE FACTURA");
                    $scope.visibleColumnasGridDetalleFactura();
                }, 1000);

                //$timeout(function () {
                //    console.info("ENTRO VISIBLE GRID DETALLE CREDITO DEBITO");
                //    $scope.visibleGridNotaCreditoDebitoLista();
                //}, 1000);
            }, function (responseError) {
                //error
            });
            cxcService.getListaCpcDosificacionByIdSucursalAndCodigoDocMercantil({}, {}, $scope.cpcFacturaEmitida.cpcFacturaEmitida.cpcDosificacion.cpcSucursal.idSucursal, "NODE", serverConf.ERPCONTA_WS, function (response) {
                //exito
                $scope.cpcdosificacionesNotaDebito = response.data[0];
                $scope.cpcdosificacionesNotaDebito.fechaLimiteEmision = new Date($scope.cpcdosificacionesNotaDebito.fechaLimiteEmision);
            }, function (responseError) {
                //error
            });
            $scope.getErpNotaCreditoDebitoByIdFactura();
        }

        cxcService.getNumeroNotaCreditoDebito({}, {}, tempCache.idDosificacionCreditoDebito, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.erpNotaCreditoDebito.numeroNotaCreditoDebito = response.data;
        }, function (responseError) {
            //error
        });

        obtenerEmpresaPorId(1);//Obtiene los datos de la empresa
        obtenerCazaMatriz();//Obtiene Caza Matriz
        obtieneDosificacionCreditoDebitoPorID(tempCache.idDosificacionCreditoDebito);
        $scope.erpNotaCreditoDebito.fechaNotaCreditoDebito = new Date();
    }

    $scope.getErpNotaCreditoDebitoByIdFactura = function () {
        cxcService.getErpNotaCreditoDebitoByIdFactura({}, {}, $scope.cpcFacturaEmitida.cpcFacturaEmitida.idFactura, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaNotasCerditoDebitoPorFactura = response.data;
            $scope.activar.gridNotasCreditoDebito = $scope.listaNotasCerditoDebitoPorFactura.length > 0;

            $scope.sumaImporteTotalPrimeraMoneda($scope.listaNotasCerditoDebitoPorFactura, function (resultadoNumero) {
                $scope.totalPrimeraImporteTotalPrimeraMoneda = resultadoNumero;
            });
            $scope.sumaImporteTotalSegundaMoneda($scope.listaNotasCerditoDebitoPorFactura, function (resultadoNumero) {
                $scope.totalSegundaImporteTotalPrimeraMoneda = resultadoNumero;
            });
            $timeout(function () {
                updateGridSize();
            }, 10);

        }, function (responseError) {
            //error
        });
    };

    function obtenerEmpresaPorId(idEmpresa) {
        cpanelService.getDatosEmpresaById({}, {}, idEmpresa, serverConf.CPANEL_WS, function (response) {
            $scope.datosEmpresa = response.data;
        });
    }

    function obtenerCazaMatriz() {
        cxcService.getCasaMatriz({}, {}, 0, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.sucursalCasaMatriz = response.data;
        }, function (responseError) {
            //error
        });
    }

    function obtieneDosificacionCreditoDebitoPorID(idDosificacionCreditoDebito) {
        cxcService.getCpcDosificacionesPorId({}, {}, idDosificacionCreditoDebito, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.erpNotaCreditoDebito.numeroNotaCreditoDebito = response.data.numeroFacturaInicial;
            $scope.erpNotaCreditoDebito.numeroAutorizacion = response.data.numeroAutorizacion;
            $scope.llaveDosificacion = response.data.llaveDosificacion;
            $scope.parModalidadFacturacionCodigo = response.data.parModalidadFacturacion.codigo;
        }, function (responseError) {
            //error
        });
    }

    $scope.limpiarFila = function (row) {
        var index = row.rowIndex;
        $scope.gridOptions.selectItem(index, false);
        $scope.datosDetalleFactura.splice(index, 1);
        $scope.sumarValores();
    };


    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
    $scope.currencySubTotalTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.btnAgregarDetalleFacturaNotaDebitoCredito = '<div align="center"><button type="button" height="5" class="btn btn-default" ng-click="seleccionarFacturasParaNotaDebitoCredito(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-circle-arrow-down"></span></button></div>';

    $scope.gridOptions = {
        data: 'datosDetalleFactura',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        selectedItems: $scope.seleccionFacturaObjeto,
        enableSorting: true,
        rowHeight: 33,
        headerRowHeight: 45,
        columnDefs: [
            {
                field: 'cantidad',
                displayName: "Cant.",
                width: '10%',
                enableCellSelection: true,
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'detalleFactura',
                displayName: "Concepto",
                width: '30%',
                headerClass: "header-center",
                cellClass: 'text-left'
            },
            {
                field: "precioUnitarioPrimeraMoneda",
                displayName: "Precio Unitario (BOB)",
                width: '13%',
                enableCellSelection: true,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplate
            },
            {
                field: "precioUnitarioSegundaMoneda",
                displayName: "Precio Unitario (USD)",
                width: '13%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplate
            },
            {
                field: "subtotalPrimeraMoneda",
                displayName: "SubTotal (BOB)",
                width: '13%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencySubTotalTemplate
            },
            {
                field: "subtotalSegundaMoneda",
                displayName: "SubTotal (USD)",
                width: '13%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencySubTotalTemplate
            },
            {
                displayName: "Agregar",
                cellTemplate: $scope.btnAgregarDetalleFacturaNotaDebitoCredito,
                width: '8%',
                visible: true,
                enableCellEdit: false
            }
        ]
    };


    $scope.validaRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura = function (erpDetalleFactura, calculaPrimera, calculaSegunda, funcion) {
        var sw = false;
        angular.forEach($scope.datosDetalleFactura, function (detalleFactura) {
            if (detalleFactura.idDetalleFactura == erpDetalleFactura.idPadre) {
                if (calculaPrimera) {
                    sw = erpDetalleFactura.subtotalPrimeraMoneda <= detalleFactura.subtotalPrimeraMoneda;
                } else {
                    if (calculaSegunda) {
                        sw = erpDetalleFactura.subtotalSegundaMoneda <= detalleFactura.subtotalSegundaMoneda;
                    }
                }
            }
        });
        funcion(sw);
    };

    $scope.obtieneRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura = function (erpDetalleFactura, funcion) {
        $scope.detalleFacturaAux = erpDetalleFacturaModel.getObject();
        angular.forEach($scope.datosDetalleFactura, function (detalleFactura) {
            if (detalleFactura.idDetalleFactura == erpDetalleFactura.idPadre) {
                $scope.detalleFacturaAux = detalleFactura;
            }
        });
        funcion($scope.detalleFacturaAux);
    };


    $scope.totalesTemplate = '<div style="width:  58%; display: inline-block; text-align: right">' +
    '<label class="control-label">Importe Total Devuelto&nbsp;&nbsp;</label></div>' +
    '<div style="width: 13%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalPrimera" ui-number-mask disabled></div>' +
    '<div style="width: 13%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalSegunda" ui-number-mask disabled></div>';

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
    $scope.currencySubTotalTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.btnEliminaDetalleFacturaNotaDebitoCredito = '<div align="center"><button id="eliminaPlanFacturacion" type="button" height="5" class="btn btn-default" ng-click="quitaFacturasParaNotaDebitoCredito(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-minus"></span></button></div>';

    $scope.gridOptionsNotaDebitoCredito = {
        data: 'datosDetalleFacturaNotaDebitoCredito',
        enableRowSelection: false,
        enableCellEditOnFocus: !$scope.modo.valor,
        enableColumnResize: true,
        rowHeight: 33,
        headerRowHeight: 45,
        enableCellSelection: false,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,
        columnDefs: [
            {
                field: 'cantidad',
                displayName: "Cant.",
                width: '10%',
                enableCellSelection: true,
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: '<input type="text" class="form-control text-center" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD" ng-disabled="ocultaColumnaCantidadConcepto" ng-click="$event.stopPropagation()"/>'
            },
            {
                field: 'detalleFactura',
                displayName: "Concepto",
                width: '30%',
                headerClass: "header-center",
                enableCellEdit: false,
                cellClass: 'text-left',
                cellTemplate: '<input type="text" class="form-control text-left" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD" ng-disabled="ocultaColumnaCantidadConcepto" ng-click="$event.stopPropagation()"/>'
            },
            {
                field: "precioUnitarioPrimeraMoneda",
                displayName: "Precio Unitario (BOB)",
                width: '13%',
                enableCellSelection: true,
                headerClass: "header-center",
                enableCellEdit: false,
                cellClass: "text-right",
                cellTemplate: '<input type="text" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD" currency-input decimals="5" ng-disabled="ocultaColumnaPrimeraMoneda" ng-click="$event.stopPropagation()"/>'
            },
            {
                field: "precioUnitarioSegundaMoneda",
                displayName: "Precio Unitario (USD)",
                width: '13%',
                enableCellSelection: true,
                headerClass: "header-center",
                enableCellEdit: false,
                cellClass: "text-right",
                cellTemplate: '<input type="text" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD" currency-input decimals="5" ng-disabled="ocultaColumnaSegundaMoneda" ng-click="$event.stopPropagation()"/>'
            },
            {
                field: "subtotalPrimeraMoneda",
                displayName: "SubTotal (BOB)",
                width: '13%',
                headerClass: "header-center",
                enableCellEdit: false,
                cellClass: "text-right",
                cellTemplate: $scope.currencySubTotalTemplate
            },
            {
                field: "subtotalSegundaMoneda",
                displayName: "SubTotal (USD)",
                width: '13%',
                headerClass: "header-center",
                enableCellEdit: false,
                cellClass: "text-right",
                cellTemplate: $scope.currencySubTotalTemplate
            },
            {
                displayName: "Quitar",
                cellTemplate: $scope.btnEliminaDetalleFacturaNotaDebitoCredito,
                width: '8%',
                enableCellEdit: false
            }
        ]
    };

    $scope.$on('ngGridEventEndCellEdit', function (event) {
            var columnaSeleccionada = event.targetScope.col.field;
            var datosFila = event.targetScope.row.entity;

            switch (event.targetScope.gridId) {
                case $scope.gridOptionsNotaDebitoCredito.$gridScope.gridId:
                    switch (columnaSeleccionada) {
                        case 'cantidad':
                            datosFila.subtotalSegundaMoneda = parseFloat(datosFila.cantidad) * parseFloat(datosFila.precioUnitarioSegundaMoneda);
                            datosFila.subtotalPrimeraMoneda = parseFloat(datosFila.cantidad) * parseFloat(datosFila.precioUnitarioPrimeraMoneda);
                            $scope.validaRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura(datosFila, true, false, function (respuesta) {
                                $scope.hideLoader();
                                if (!respuesta) {
                                    $scope.obtieneRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura(datosFila, function (respuesta) {
                                        datosFila.precioUnitarioPrimeraMoneda = respuesta.precioUnitarioPrimeraMoneda;
                                        datosFila.precioUnitarioSegundaMoneda = respuesta.precioUnitarioSegundaMoneda;
                                        datosFila.subtotalSegundaMoneda = respuesta.subtotalSegundaMoneda;
                                        datosFila.subtotalPrimeraMoneda = respuesta.subtotalPrimeraMoneda;
                                        datosFila.cantidad = respuesta.cantidad;

                                        $scope.showCustomModal({
                                            headerText: "Mensaje Validación",
                                            bodyText: "Sobrepaso el valor de los SubTotal(BOB) y SubTotal(USD)",
                                            actionButtonText: "Continuar",
                                            type: 'error',
                                            closeAfter: 6000
                                        });

                                    });

                                } else {
                                    $scope.sumaMontoTotalPrimeraMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                                        $scope.totalPrimera = resultadoNumero;
                                    });
                                    $scope.sumaMontoTotalSegundaMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                                        $scope.totalSegunda = resultadoNumero;
                                    });
                                }
                            });
                            break;
                        case 'precioUnitarioPrimeraMoneda':
                            $scope.showLoader();
                            datosFila.precioUnitarioSegundaMoneda = parseFloat(datosFila.precioUnitarioPrimeraMoneda) / parseFloat($scope.tipoCambio);
                            datosFila.subtotalSegundaMoneda = parseFloat(datosFila.cantidad) * parseFloat(datosFila.precioUnitarioSegundaMoneda);
                            datosFila.subtotalPrimeraMoneda = parseFloat(datosFila.cantidad) * parseFloat(datosFila.precioUnitarioPrimeraMoneda);
                            $scope.validaRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura(datosFila, true, false, function (respuesta) {
                                $scope.hideLoader();
                                if (!respuesta) {
                                    $scope.obtieneRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura(datosFila, function (respuesta) {
                                        datosFila.precioUnitarioPrimeraMoneda = respuesta.precioUnitarioPrimeraMoneda;
                                        datosFila.precioUnitarioSegundaMoneda = respuesta.precioUnitarioSegundaMoneda;
                                        datosFila.subtotalSegundaMoneda = respuesta.subtotalSegundaMoneda;
                                        datosFila.subtotalPrimeraMoneda = respuesta.subtotalPrimeraMoneda;

                                        $scope.showCustomModal({
                                            headerText: "Mensaje Validación",
                                            bodyText: "Sobrepaso el valor de los SubTotal(BOB) y SubTotal(USD)",
                                            actionButtonText: "Continuar",
                                            type: 'error',
                                            closeAfter: 6000
                                        });

                                    });

                                } else {
                                    $scope.sumaMontoTotalPrimeraMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                                        $scope.totalPrimera = resultadoNumero;
                                    });
                                    $scope.sumaMontoTotalSegundaMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                                        $scope.totalSegunda = resultadoNumero;
                                    });
                                }
                            });
                            break;
                        case 'precioUnitarioSegundaMoneda':
                            $scope.showLoader();
                            datosFila.precioUnitarioPrimeraMoneda = parseFloat(datosFila.precioUnitarioSegundaMoneda) * parseFloat($scope.tipoCambio);
                            datosFila.subtotalPrimeraMoneda = parseFloat(datosFila.cantidad) * parseFloat(datosFila.precioUnitarioPrimeraMoneda);
                            datosFila.subtotalSegundaMoneda = parseFloat(datosFila.cantidad) * parseFloat(datosFila.precioUnitarioSegundaMoneda);
                            $scope.validaRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura(datosFila, false, true, function (respuesta) {
                                $scope.hideLoader();
                                if (!respuesta) {
                                    $scope.obtieneRegistroNgGridDatosDetalleFacturaPorIdDetalleFactura(datosFila, function (respuesta) {
                                        datosFila.precioUnitarioPrimeraMoneda = respuesta.precioUnitarioPrimeraMoneda;
                                        datosFila.precioUnitarioSegundaMoneda = respuesta.precioUnitarioSegundaMoneda;
                                        datosFila.subtotalSegundaMoneda = respuesta.subtotalSegundaMoneda;
                                        datosFila.subtotalPrimeraMoneda = respuesta.subtotalPrimeraMoneda;

                                        $scope.showCustomModal({
                                            headerText: "Mensaje Validación",
                                            bodyText: "Sobrepaso el valor de los SubTotal(BOB) y SubTotal(USD)",
                                            actionButtonText: "Continuar",
                                            type: 'error',
                                            closeAfter: 6000
                                        });

                                    });

                                } else {
                                    $scope.sumaMontoTotalPrimeraMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                                        $scope.totalPrimera = resultadoNumero;
                                    });
                                    $scope.sumaMontoTotalSegundaMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                                        $scope.totalSegunda = resultadoNumero;
                                    });
                                }
                            });

                            break;
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    break;
                case $scope.gridOptions.$gridScope.gridId:
                    break;
            }


        }
    );

    $scope.obtieneSubTotalEnFuncionDeCantidad = function (objeto, funcion) {
        if (objeto.cantidad != null || objeto.cantidad != "") {
            objeto.subtotal = Number(objeto.precioUnitarioPrimeraMoneda) * Number(objeto.cantidad);
            funcion(objeto.subtotal);
        } else {
            objeto.subtotal = Number(objeto.precioUnitarioPrimeraMoneda) * Number(1);
            funcion(objeto.subtotal);
        }
    };


    $scope.$on('ngGridEventStartCellEdit', function (event) {
        switch (event.targetScope.gridId) {
            case $scope.gridOptionsNotaDebitoCredito.$gridScope.gridId:
                columnaSeleccionadaFacturaEmitida = event.targetScope.col.field;
                break;
        }
    });


    $scope.sumaMontoTotalPrimeraMoneda = function (objetoListaFacturasEmitidas, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaFacturasEmitidas, function (facturaEmitida) {
            $scope.sumar = $scope.sumar + Number(facturaEmitida.subtotalPrimeraMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.sumaMontoTotalSegundaMoneda = function (objetoListaFacturasEmitidas, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaFacturasEmitidas, function (facturaEmitida) {
            $scope.sumar = $scope.sumar + Number(facturaEmitida.subtotalSegundaMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.seleccionarFacturasParaNotaDebitoCredito = function (row) {
        $scope.showLoader();
        $scope.facturaEmitidaAux = erpDetalleFacturaModel.getObject();
        $scope.facturaEmitidaAux.cantidad = row.entity.cantidad;
        $scope.facturaEmitidaAux.detalleFactura = row.entity.detalleFactura;
        $scope.facturaEmitidaAux.erpFactura = row.entity.erpFactura;
        $scope.facturaEmitidaAux.precioUnitarioPrimeraMoneda = row.entity.precioUnitarioPrimeraMoneda;
        $scope.facturaEmitidaAux.precioUnitarioSegundaMoneda = row.entity.precioUnitarioSegundaMoneda;
        $scope.facturaEmitidaAux.subtotalPrimeraMoneda = row.entity.subtotalPrimeraMoneda;
        $scope.facturaEmitidaAux.subtotalSegundaMoneda = row.entity.subtotalSegundaMoneda;
        $scope.facturaEmitidaAux.porcentajeDescuento = 0;
        $scope.facturaEmitidaAux.descuentoPrimeraMoneda = 0;
        $scope.facturaEmitidaAux.descuentoSegundaMoneda = 0;
        $scope.facturaEmitidaAux.idPadre = row.entity.idDetalleFactura;
        $scope.facturaEmitidaAux.idDetalleFactura = row.entity.idDetalleFactura;
        if (typeof $scope.facturaEmitidaAux != "undefined") {
            $scope.verificaFacturaNotaDebitoCreditoSeleccionadoRepetido($scope.facturaEmitidaAux, $scope.datosDetalleFacturaNotaDebitoCredito, function (resultado) {
                if (resultado) {
                    $scope.hideLoader();
                    //$scope.facturaEmitidaAux.idDetalleFactura = null;
                    $scope.datosDetalleFacturaNotaDebitoCredito.push($scope.facturaEmitidaAux);
                    $scope.sumaMontoTotalPrimeraMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                        $scope.totalPrimera = resultadoNumero;
                    });
                    $scope.sumaMontoTotalSegundaMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                        $scope.totalSegunda = resultadoNumero;
                    });
                } else {
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Validacion",
                        bodyText: "Seleccione otro registro, este ya se selecciono.",
                        actionButtonText: "Continuar",
                        type: 'error',
                        closeAfter: 3000
                    });
                }
            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validacion",
                bodyText: "Seleccione un registro.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 3000
            });
        }
    };

    $scope.guardaNotaCreditoDebitoPojo = function () {

        cxcService.putErpNotaCreditoDebitoCpcDetalleFacturaPojo($scope.erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojo, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.bloqueaCamposFormulario = true;
            $scope.ocultaColumnaPrimeraMoneda = true;
            $scope.ocultaColumnaSegundaMoneda = true;
            $scope.ocultaColumnaCantidadConcepto = true;
            $scope.visibleColumnasGridDetalleFactura();
            $scope.visibleGridNotaCreditoDebitoLista();
            console.info("CODIGO:", $scope.parModalidadFacturacionCodigo);
            if ($scope.parModalidadFacturacionCodigo != "MAN") {
                $scope.activaBotonImprimir = true;
                $scope.activaBotonGuardar = false;
                $scope.muestraCodigoControl = true;
                $scope.activaBotonContinua = false;

            } else {
                $scope.activaBotonImprimir = false;
                $scope.activaBotonGuardar = false;
                $scope.muestraCodigoControl = false;
                $scope.activaBotonContinua = true;

            }

            $scope.facturaNotaDebitoGuardata = response.data;
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 5000
            });
        }, function (responseError) {
            //error
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Ocurrio un error.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 5000
            });
        });


    };

    $scope.cancelarRegistroNotaDebitoCredito = function () {

        $state.transitionTo('listaFacturaClienteNotaDebitoCredito', {}, {reload: true});
    };

    $scope.quitaFacturasParaNotaDebitoCredito = function (row) {
        var index = row.rowIndex;
        console.info("ROW:", index);
        $scope.gridOptionsNotaDebitoCredito.selectItem(index, false);
        $scope.datosDetalleFacturaNotaDebitoCredito.splice(index, 1);
        $scope.sumaMontoTotalPrimeraMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
            $scope.totalPrimera = resultadoNumero;
        });
        $scope.sumaMontoTotalSegundaMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
            $scope.totalSegunda = resultadoNumero;
        });

    };

    $scope.verificaFacturaNotaDebitoCreditoSeleccionadoRepetido = function (facturaNotaDebitoCreditoSeleccionado, listaDatosDetalleFacturaNotaDebitoCredito, funcion) {
        var activa = true;
        angular.forEach(listaDatosDetalleFacturaNotaDebitoCredito, function (facturaNotaDebitoCredito) {
            if (facturaNotaDebitoCredito.idDetalleFactura == facturaNotaDebitoCreditoSeleccionado.idDetalleFactura) {
                activa = false;
            }
        });
        funcion(activa);
    };

    $scope.totalesTemplate = '<div style="width:60%; display: inline-block; text-align: right">' +
    '<label class="control-label">TOTALES&nbsp;&nbsp;</label></div>' +
    '<div style="width: 15%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalPrimeraImporteTotalPrimeraMoneda" ui-number-mask disabled></div>' +
    '<div style="width: 15%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalSegundaImporteTotalPrimeraMoneda" ui-number-mask disabled></div>'+
    '<div style="width: 10%; display: inline-block;"></div>';
    $scope.currencyTemplateCinco = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
    $scope.btnDetalleNotaCreditoDebito = '<div align="center"><button id="eliminaPlanFacturacion" type="button" height="5" class="btn btn-default" ng-click="modalDetalleNotaCreditoDebito(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-th-list"></span></button></div>';
    $scope.gridNotaCreditoDebitoLista = {
        data: 'listaNotasCerditoDebitoPorFactura',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        selectedItems: $scope.seleccionFacturaObjeto,
        enableSorting: true,
        rowHeight: 33,
        headerRowHeight: 45,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,

        columnDefs: [
            {
                field: 'numeroNotaCreditoDebito',
                displayName: "N°",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'fechaNotaCreditoDebito',
                displayName: "Fecha Nota Crédito - Débito.",
                width: '20%',
                enableCellSelection: true,
                headerClass: "header-center",
                cellClass: "text-center",
                cellFilter: 'date:\'dd/MM/yyyy\''
            },
            {
                field: "parModalidadTransaccion.descripcion",
                displayName: "Modalidad Transacción",
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: "parTipoTransaccion.descripcion",
                displayName: "Tipo Transacción",
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: "importeTotalPrimeraMoneda",
                displayName: "Precio Unitario (BOB)",
                width: '15%',
                enableCellSelection: true,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: "importeTotalSegundaMoneda",
                displayName: "Precio Unitario (USD)",
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                displayName: "Detalle",
                cellTemplate: $scope.btnDetalleNotaCreditoDebito,
                headerClass: "header-center",
                width: '10%',
                enableCellEdit: false
            }
        ]
    };


    $scope.sumaImporteTotalPrimeraMoneda = function (objetoListaNotasCerditoDebitoPorFactura, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaNotasCerditoDebitoPorFactura, function (notasCerditoDebitoPorFactura) {
            $scope.sumar = $scope.sumar + Number(notasCerditoDebitoPorFactura.importeTotalPrimeraMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.sumaImporteTotalSegundaMoneda = function (objetoListaNotasCerditoDebitoPorFactura, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaNotasCerditoDebitoPorFactura, function (notasCerditoDebitoPorFactura) {
            $scope.sumar = $scope.sumar + Number(notasCerditoDebitoPorFactura.importeTotalSegundaMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.visibleGridNotaCreditoDebitoLista = function () {

        for (var i = 0; i < $scope.gridNotaCreditoDebitoLista.$gridScope.columns.length; i++) {
            var column = $scope.gridNotaCreditoDebitoLista.$gridScope.columns[i];
            switch (column.field) {
                case "cantidad":
                    column.visible = $scope.ocultaColumnaCantidadConcepto;
                    break;
                case "importeTotalPrimeraMoneda":
                    column.visible = $scope.ocultaColumnaPrimeraMoneda;
                    break;
                case "importeTotalSegundaMoneda":
                    column.visible = $scope.ocultaColumnaSegundaMoneda;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    $scope.addNotaCreditoDebito = function () {
        $scope.activar.gridNotasCreditoDebito = false;
        $scope.visibleColumnasGridDetalleFactura();
        updateGridSize();
    };

    $scope.cancelarAddNotaCreditoDebito = function () {
        if ($scope.datosDetalleFacturaNotaDebitoCredito.length > 0) {
            var modalMensajeConfirmacion = modalService.show(
                {
                    templateUrl: 'modules/cxc/views/modalMensajeConfirmacionRetornarNotaCreditoDebito.html',
                    controller: 'modalMensajeConfirmacionRetornarNotaCreditoDebitoCtrl',
                    size: 'md'
                }, {
                    //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
                }
            ).then(function (respModal) {
                    if (respModal) {
                        $scope.datosDetalleFacturaNotaDebitoCredito = [];
                        $scope.totalPrimera = 0;
                        $scope.totalSegunda = 0;
                        if ($scope.listaNotasCerditoDebitoPorFactura == 0) {
                            $state.transitionTo('listaFacturaClienteNotaDebitoCredito', {}, {reload: true});
                        } else {
                            $scope.activar.gridNotasCreditoDebito = true;
                            $scope.visibleColumnasGridDetalleFactura();
                            $timeout(function () {
                                updateGridSize();
                            }, 10);
                        }
                    }
                });
        } else {
            $scope.datosDetalleFacturaNotaDebitoCredito = [];
            if ($scope.listaNotasCerditoDebitoPorFactura == 0) {
                $state.transitionTo('listaFacturaClienteNotaDebitoCredito', {}, {reload: true});
            } else {
                $scope.activar.gridNotasCreditoDebito = true;
                $scope.visibleColumnasGridDetalleFactura();
                $timeout(function () {
                    updateGridSize();
                }, 10);
            }
        }

    };

    $scope.volverNotaCreditoDebitoDespuesDeGuardar = function () {
        $scope.activar.gridNotasCreditoDebito = true;
        $timeout(function () {
            updateGridSize();
        }, 10);
        $scope.muestraGeneraQR = false;
        $scope.muestraCodigoControl = false;
        $scope.activaBotonImprimir = false;
        $scope.activaBotonGuardar = true;
        $scope.activaBotonContinua = false;
        $scope.datosDetalleFacturaNotaDebitoCredito = [];
        $scope.totalPrimera = 0;
        $scope.totalSegunda = 0;
        $scope.visibleColumnasGridDetalleFactura();
        $scope.getErpNotaCreditoDebitoByIdFactura();
        $scope.visibleGridNotaCreditoDebitoLista();
    };

    function updateGridSize() {
        var grids = angular.element(document).find('[ng-grid]');
        for (var i = 0; i < grids.length; i++) {
            angular.element(grids[i]).trigger('resize.nggrid');
        }
    }

    $scope.imprimeNotaCreditoDebitoDespuesDeGuardar = function () {
        $state.go('facturaExportacionNotaDebitoCredito', {idFacturaEmitida: $scope.facturaNotaDebitoGuardata.idNotaCreditoDebito})
    };


    $scope.modalDetalleNotaCreditoDebito = function (row) {
        tempCache.erpNotaCreditoDebitoTempCache = row.entity;
        var modalDetalleNotaCreditoDebito = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalDetalleNotaCreditoDebito.html',
                controller: 'modalDetalleNotaCreditoDebitoCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {

            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    $scope.visibleColumnasGridDetalleFactura = function () {

        for (var i = 0; i < $scope.gridOptions.$gridScope.columns.length; i++) {
            var column = $scope.gridOptions.$gridScope.columns[i];
            switch (column.displayName) {
                case "Agregar":
                    column.visible = !$scope.activar.gridNotasCreditoDebito;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.generaQR_Y_GuardaNotaCreditoDebito = function () {
        $scope.showLoader();

        if ($scope.totalPrimera > 0 && $scope.totalSegunda > 0) {
            $scope.erpNotaCreditoDebito.cpcDosificacion.idDosificacion = tempCache.idDosificacionCreditoDebito;
            $scope.erpNotaCreditoDebito.erpFactura.idFactura = $scope.cpcFacturaEmitida.cpcFacturaEmitida.idFactura;
            $scope.erpNotaCreditoDebito.importeTotalPrimeraMoneda = $scope.totalPrimera;
            $scope.erpNotaCreditoDebito.importeTotalSegundaMoneda = $scope.totalSegunda;
            $scope.erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojo.erpNotaCreditoDebito = $scope.erpNotaCreditoDebito;
            $scope.erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojo.listaCpcDetalleFactura = $scope.datosDetalleFacturaNotaDebitoCredito;


            $scope.datosCodigoControl = {
                nit: $scope.cpcFacturaEmitida.cpcFacturaEmitida.cppProveedorCliente.nit,
                numeroFactura: $scope.erpNotaCreditoDebito.numeroNotaCreditoDebito,
                numeroAutorizacion: $scope.erpNotaCreditoDebito.numeroAutorizacion,
                fechaFactura: new Date($scope.erpNotaCreditoDebito.fechaNotaCreditoDebito),
                monto: $scope.erpNotaCreditoDebito.importeTotalPrimeraMoneda,
                llaveDosificacion: $scope.llaveDosificacion
            };


            cxcService.getCodigoControlFactura($scope.datosCodigoControl, {}, serverConf.ERPCONTA_WS, function (response) {


                console.info("CODIGO DE CONTROL:", response.data.codigoControl);
                $scope.erpNotaCreditoDebito.codigoControlNotaDebitoCredito = response.data.codigoControl;
                $scope.fechaCadena = convertirFecha(new Date($scope.erpNotaCreditoDebito.fechaNotaCreditoDebito));

                $scope.mensaje = $scope.datosEmpresa.nit + '|' + $scope.erpNotaCreditoDebito.numeroNotaCreditoDebito +
                '|' + $scope.erpNotaCreditoDebito.numeroAutorizacion + '|' + $scope.fechaCadena +
                '|' + $scope.erpNotaCreditoDebito.importeTotalPrimeraMoneda + '|' + $scope.erpNotaCreditoDebito.importeTotalSegundaMoneda +
                '|' + $scope.erpNotaCreditoDebito.codigoControlNotaDebitoCredito +
                '|' + $scope.datosCodigoControl.nit +
                '|' + 0 + '|' + 0 + '|' + 0 + '|' + 0;

                console.log("Cadena enviada:", $scope.mensaje);
                console.info("VALOR BOLLEAN:", $scope.parModalidadFacturacionCodigo);
                if ($scope.parModalidadFacturacionCodigo != "MAN")
                    qr_generator.generar_qrcode($scope.mensaje, 'qr');

                $scope.guardaNotaCreditoDebitoPojo();
                $scope.hideLoader();
            }, function (responseError) {
                //error
                $scope.hideLoader();
            });


        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validación",
                bodyText: "Es necesario tener registros en 'DETALLE DE LA DEVOLUCIÓN O RESCISIÓN DE SERVICIOS'.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 5000
            });
        }

    };

    function convertirFecha(fechaOrigen) {

        var fechadias;
        var anio = fechaOrigen.getFullYear();
        var mes = fechaOrigen.getMonth() + 1;
        var dia = fechaOrigen.getDate();

        if (mes.toString().length < 2) {
            mes = "0".concat(mes);
        }

        if (dia.toString().length < 2) {
            dia = "0".concat(dia);
        }
        fechadias = dia + "/" + mes + "/" + anio;

        return fechadias;
    }

    $scope.cancelarFacturaEmitida = function () {
        $state.go('dosificacionEmisionFactura');
    };

    init();

});
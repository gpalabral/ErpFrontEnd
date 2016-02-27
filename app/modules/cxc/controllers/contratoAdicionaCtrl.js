/**
 * Created by HENRRY on 24/04/2015.
 */

'use strict';

app.controller('contratoAdicionaCtrl', function ($scope, cxcService, serverConf, $state, tempCache, contratoModel, localStorageService, modalService, pagoContratoModel, contratoItemModel, planPagosPeriodoModel, localStorage) {
    console.log("ADICIONA CONTRATO!!!!!!!!!!");
    $scope.readOnlyEnable = false;
    var parMonedaBolivianos = "BOL";
    var parMonedaDolares = "SUS";
    var primeraMonedaEnum = "BOL";
    var segundaMonedaEnum = "SUS";
    var columnaSeleccionadaContratoItem = null;
    var columnaSeleccionadaPagoContrato = null;
    var planPagosPeriodo = new planPagosPeriodoModel();
    var contrato = new contratoModel();
    var pagoContrato = new pagoContratoModel();
    var contratoItem = new contratoItemModel();
    $scope.planPagosPeriodoObjeto = planPagosPeriodo.getObject();
    $scope.cpccontrato = contrato.getObject();
    $scope.cpccontratoitem = contratoItem.getObject();
    $scope.modificaMontoTotalDeContratoSW = true;
    $scope.generarPorPorcentaje = true;
    $scope.generarPorMonto = false;
    $scope.bloqueaMontoTotalDeContrato = false;
    $scope.activaCamposPagosPeriodicos = true;
    $scope.muestraPrimeraMoneda = false;
    $scope.muestraSegundaMoneda = false;
    $scope.botonAdiciona = true;
    $scope.botonModifica = false;
    $scope.numeroDePagos = 0;
    $scope.cantDias = 0;
    $scope.pagoContratoTotalPrimera = 0;
    $scope.pagoContratoTotalSegunda = 0;
    $scope.pagoContratoTotalPorcentaje = 0;
    $scope.montoPrimeraMonedaAux = 0;
    $scope.montoSegundaMonedaAux = 0;
    $scope.idSucursalCombo = "";
    $scope.monedaContratoCodigoAux = "";
    $scope.pagoContratoAdicionados = [];
    $scope.listaActividadEconomica = [];
    $scope.contratoItemsAdicionados = [];
    $scope.fechaInicio = new Date();
    $scope.activar = {
        tab: true
    };

    $scope.valor = {
        generarPorPorcentajeMonto: "PORC"//Valores : PORC , MONT
    };


    $scope.cpccontratoPojo = {
        "cpcContrato": {
            "idContrato": 0,
            "nombreContrato": "",
            "cppProveedorCliente": {
                "idProveedorCliente": 0,
                "parTipoProveedorCliente": {
                    "codigo": "",
                    "descripcion": ""
                },
                "razonSocial": "",
                "nombre": "",
                "primerApellido": "",
                "segundoApellido": "",
                "parEstado": {
                    "codigo": "",
                    "descripcion": ""
                },
                "parTipoRegistro": {
                    "codigo": "",
                    "descripcion": ""
                },
                "parTipoDocumento": {
                    "codigo": "",
                    "descripcion": ""
                },
                "numeroDocumento": "",
                "sigla": "",
                "direccion": "",
                "telefonoUno": "",
                "telefonoDos": "",
                "numeroFax": "",
                "numeroCelular": "",
                "correoElectronico": "",
                "direccionWeb": "",
                "logo": "",
                "fechaAniversario": "",
                "nit": 0
            },
            "cpcSucursal": {
                "idSucursal": 0,
                "numeroSucursal": 0,
                "codigo": "",
                "direccion": "",
                "telefonoUno": "",
                "telefonoDos": "",
                "descripcion": "",
                "emiteFactura": false,
                "nombreLocalizacion": "",
                "parEstado": {
                    "codigo": "",
                    "descripcion": ""
                },
                "parDepartamento": {
                    "codigo": "",
                    "descripcion": ""
                },
                "parMunicipio": {
                    "codigo": "",
                    "descripcion": "",
                    "grupo": ""
                },
                "parLocalizacion": {
                    "codigo": "",
                    "descripcion": ""
                }
            },
            "nroContrato": "",
            "fechaContrato": "",
            "fechaVigenciaInicio": "",
            "fechaVigenciaFin": "",
            "nroCuotas": 0,
            "montoPrimeraMoneda": 0,
            "montoSegundaMoneda": 0,
            "tipoCambio": 0,
            "nroContratoCliente": "",
            "cuentaBancaria": {
                "idCuentaBancaria": 0,
                "parBanco": {
                    "codigo": "",
                    "descripcion": "",
                    "nit": ""
                },
                "numeroCuenta": "",
                "parTipoMoneda": {
                    "codigo": "",
                    "descripcion": ""
                },
                "propietarioCuenta": "",
                "cppProveedorCliente": {
                    "idProveedorCliente": 0,
                    "parTipoProveedorCliente": {
                        "codigo": "",
                        "descripcion": ""
                    },
                    "razonSocial": "",
                    "nombre": "",
                    "primerApellido": "",
                    "segundoApellido": "",
                    "parEstado": {
                        "codigo": "",
                        "descripcion": ""
                    },
                    "parTipoRegistro": {
                        "codigo": "",
                        "descripcion": ""
                    },
                    "parTipoDocumento": {
                        "codigo": "",
                        "descripcion": ""
                    },
                    "numeroDocumento": "",
                    "sigla": "",
                    "direccion": "",
                    "telefonoUno": "",
                    "telefonoDos": "",
                    "numeroFax": "",
                    "numeroCelular": "",
                    "correoElectronico": "",
                    "direccionWeb": "",
                    "logo": "",
                    "fechaAniversario": "",
                    "nit": 0
                }
            },
            "parTipoMoneda": {
                "codigo": "",
                "descripcion": ""
            }
        },
        "listaCpcContratoItem": [
            {
                "idContratoItem": 0,
                "cpcItem": {
                    "idItem": 0,
                    "codigo": "",
                    "descripcion": "",
                    "precioUnitarioPrimeraMoneda": 0,
                    "precioUnitarioSegundaMoneda": 0,
                    "idCtaIngreso": 0,
                    "montoFijo": false,
                    "parTipoItem": {
                        "codigo": "",
                        "descripcion": ""
                    }
                },
                "cpcContrato": {
                    "idContrato": 0,
                    "cppProveedorCliente": {
                        "idProveedorCliente": 0,
                        "parTipoProveedorCliente": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "razonSocial": "",
                        "nombre": "",
                        "primerApellido": "",
                        "segundoApellido": "",
                        "parEstado": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parTipoRegistro": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parTipoDocumento": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "numeroDocumento": "",
                        "sigla": "",
                        "direccion": "",
                        "telefonoUno": "",
                        "telefonoDos": "",
                        "numeroFax": "",
                        "numeroCelular": "",
                        "correoElectronico": "",
                        "direccionWeb": "",
                        "logo": "",
                        "fechaAniversario": "",
                        "nit": 0
                    },
                    "cpcSucursal": {
                        "idSucursal": 0,
                        "numeroSucursal": 0,
                        "codigo": "",
                        "direccion": "",
                        "telefonoUno": "",
                        "telefonoDos": "",
                        "descripcion": "",
                        "emiteFactura": false,
                        "nombreLocalizacion": "",
                        "parEstado": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parDepartamento": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parMunicipio": {
                            "codigo": "",
                            "descripcion": "",
                            "grupo": ""
                        },
                        "parLocalizacion": {
                            "codigo": "",
                            "descripcion": ""
                        }
                    },
                    "nroContrato": "",
                    "fechaContrato": "",
                    "fechaVigenciaInicio": "",
                    "fechaVigenciaFin": "",
                    "nroCuotas": 0,
                    "montoPrimeraMoneda": 0,
                    "montoSegundaMoneda": 0,
                    "tipoCambio": 0,
                    "nroContratoCliente": "",
                    "cuentaBancaria": {
                        "idCuentaBancaria": 0,
                        "parBanco": {
                            "codigo": "",
                            "descripcion": "",
                            "nit": ""
                        },
                        "numeroCuenta": "",
                        "parTipoMoneda": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "propietarioCuenta": "",
                        "cppProveedorCliente": {
                            "idProveedorCliente": 0,
                            "parTipoProveedorCliente": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "razonSocial": "",
                            "nombre": "",
                            "primerApellido": "",
                            "segundoApellido": "",
                            "parEstado": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "parTipoRegistro": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "parTipoDocumento": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "numeroDocumento": "",
                            "sigla": "",
                            "direccion": "",
                            "telefonoUno": "",
                            "telefonoDos": "",
                            "numeroFax": "",
                            "numeroCelular": "",
                            "correoElectronico": "",
                            "direccionWeb": "",
                            "logo": "",
                            "fechaAniversario": "",
                            "nit": 0
                        }
                    },
                    "parTipoMoneda": {
                        "codigo": "",
                        "descripcion": ""
                    }
                },
                "montoPrimeraMoneda": 0,
                "montoSegundaMoneda": 0,
                "cantidad": 0,
                "subtotalPrimeraMoneda": 0,
                "subtotalSegundaMoneda": 0
            }
        ],
        "listaCpcPagoContrato": [
            {
                "idPagoContrato": 0,
                "cpcContrato": {
                    "idContrato": 0,
                    "cppProveedorCliente": {
                        "idProveedorCliente": 0,
                        "parTipoProveedorCliente": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "razonSocial": "",
                        "nombre": "",
                        "primerApellido": "",
                        "segundoApellido": "",
                        "parEstado": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parTipoRegistro": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parTipoDocumento": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "numeroDocumento": "",
                        "sigla": "",
                        "direccion": "",
                        "telefonoUno": "",
                        "telefonoDos": "",
                        "numeroFax": "",
                        "numeroCelular": "",
                        "correoElectronico": "",
                        "direccionWeb": "",
                        "logo": "",
                        "fechaAniversario": "",
                        "nit": 0
                    },
                    "cpcSucursal": {
                        "idSucursal": 0,
                        "numeroSucursal": 0,
                        "codigo": "",
                        "direccion": "",
                        "telefonoUno": "",
                        "telefonoDos": "",
                        "descripcion": "",
                        "emiteFactura": false,
                        "nombreLocalizacion": "",
                        "parEstado": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parDepartamento": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "parMunicipio": {
                            "codigo": "",
                            "descripcion": "",
                            "grupo": ""
                        },
                        "parLocalizacion": {
                            "codigo": "",
                            "descripcion": ""
                        }
                    },
                    "nroContrato": "",
                    "fechaContrato": "",
                    "fechaVigenciaInicio": "",
                    "fechaVigenciaFin": "",
                    "nroCuotas": 0,
                    "montoPrimeraMoneda": 0,
                    "montoSegundaMoneda": 0,
                    "tipoCambio": 0,
                    "nroContratoCliente": "",
                    "cuentaBancaria": {
                        "idCuentaBancaria": 0,
                        "parBanco": {
                            "codigo": "",
                            "descripcion": "",
                            "nit": ""
                        },
                        "numeroCuenta": "",
                        "parTipoMoneda": {
                            "codigo": "",
                            "descripcion": ""
                        },
                        "propietarioCuenta": "",
                        "cppProveedorCliente": {
                            "idProveedorCliente": 0,
                            "parTipoProveedorCliente": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "razonSocial": "",
                            "nombre": "",
                            "primerApellido": "",
                            "segundoApellido": "",
                            "parEstado": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "parTipoRegistro": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "parTipoDocumento": {
                                "codigo": "",
                                "descripcion": ""
                            },
                            "numeroDocumento": "",
                            "sigla": "",
                            "direccion": "",
                            "telefonoUno": "",
                            "telefonoDos": "",
                            "numeroFax": "",
                            "numeroCelular": "",
                            "correoElectronico": "",
                            "direccionWeb": "",
                            "logo": "",
                            "fechaAniversario": "",
                            "nit": 0
                        }
                    },
                    "parTipoMoneda": {
                        "codigo": "",
                        "descripcion": ""
                    }
                },
                "nroPago": 0,
                "descripcionPago": "",
                "montoProgramado": 0,
                "montoProgramadoSegMoneda": 0,
                "fechaProgramada": "",
                "montoFacturado": 0,
                "montoFacturadoSegMoneda": 0,
                "porcentajeProgramado": 0,
                "porcentajeFacturado": 0,
                "montoPagadoPrimeraMoneda": 0,
                "montoPagadoSegundaMoneda": 0,
                "parEstadoPago": {
                    "codigo": "",
                    "descripcion": ""
                }
            }
        ],
        "listaCpcActividadEconomica": [
            {
                "idActividadEconomica": 0,
                "codigo": "",
                "descripcion": "",
                "estado": ""
            }
        ]
    };


    function init() {
        var perfilUsuario = localStorage.get('atributosPerfil');
        $scope.cpccontrato.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
        $scope.parValorTipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
        $scope.parValorPrimeraMoneda = "BOB";//Valor del localStorage tipoMoneda primera.
        $scope.parValorSegundaMoneda = "USD ";//Valor del localStorage tipoMoneda segunda.
        $scope.muestraPrimeraMoneda = true;
        $scope.muestraSegundaMoneda = false;
        $scope.pagoItemTotalPrimera = 0;
        $scope.pagoItemTotalSegunda = 0;
        $scope.pagoContratoTotalPrimera = 0;
        $scope.pagoContratoTotalSegunda = 0;
        $scope.pagoContratoTotalPorcentaje = 0;
        $scope.cpccontrato.fechaContrato = new Date();
        $scope.cpccontrato.fechaVigenciaInicio = new Date();
        //$scope.cpccontrato.parTipoMoneda.codigo = primeraMonedaEnum;
        $scope.monedaContratoCodigoAux = $scope.cpccontrato.parTipoMoneda.codigo;

        cxcService.getSucursalesAll({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaSucursales = response.data;
        }, function (responseError) {
            //error
        });

        /*cxcService.getListaClientes({}, {}, "CLI", serverConf.ERPCONTA_WS, function (response) {
         console.log(response.data)
         //$scope.clientes = response.data;
         }, function (responseError) {
         //error
         });*/

        cxcService.getCpcSucursalByIdSucursal({}, {}, perfilUsuario.sucursalPredeterminada, serverConf.ERPCONTA_WS, function (response) {
            $scope.cpccontrato.cpcSucursal = response.data || {};
        }, function (responseError) {
            //error
        });

        $scope.muestraListaCuentasBancarias();
        $scope.muestraListaParTipoMoneda();
        $scope.muestraGridContratoItem();
    }


    $scope.convierteMonedaDolar = function () {
        var objetoTipoCambio = {
            monto: $scope.cpccontrato.montoPrimeraMoneda,
            tipoCambio: $scope.cpccontrato.tipoCambio,
            tipoMoneda: "SUS"

        };
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpccontrato.montoSegundaMoneda = valorConvertido;
            if (objetoTipoCambio.monto != "") {
                $scope.activaCamposPagosPeriodicos = false;
            } else {
                $scope.activaCamposPagosPeriodicos = true;
                $scope.planPagosPeriodoObjeto.numeroDePagos = null;
                $scope.planPagosPeriodoObjeto.cantidadDias = null;
                $scope.pagoContratoAdicionados = [];
            }
        });
    };

    $scope.convierteMonedaDolar_validaCambioTotalContrato = function () {

        if ($scope.cpccontrato.montoPrimeraMoneda != undefined) {
            $scope.visibleColumnasGridContratoItem();
            $scope.visibleColumnasGridPlanPagos();
            $scope.cpccontrato.montoSegundaMoneda = 0;
            $scope.validaAccionParaElCampoMontoTotalDeContrato();

        } else {

            $scope.cambiaListaPlanFacturacion();
            if ($scope.contratoItemsAdicionados.length > 0) {
                $scope.modalMensajeConfirmacionCambioMontoContrato();
            }
        }
    };

    $scope.validaAccionParaElCampoMontoTotalDeContrato = function () {
        if ($scope.muestraPrimeraMoneda) {
            var valor = $scope.contratoItemsAdicionados.length > 0 && $scope.montoPrimeraMonedaAux != $scope.cpccontrato.montoPrimeraMoneda;
        } else {
            var valor = $scope.contratoItemsAdicionados.length > 0 && $scope.montoSegundaMonedaAux != $scope.cpccontrato.montoSegundaMoneda;
        }
        if (valor) {
            $scope.modalMensajeConfirmacionCambioMontoContrato();
        } else {
            $scope.cambiaListaPlanFacturacion();
        }
    };


    $scope.convierteMonedaBolivianos = function () {

        var objetoTipoCambio = {
            monto: $scope.cpccontrato.montoSegundaMoneda,
            tipoCambio: $scope.cpccontrato.tipoCambio,
            tipoMoneda: "BOL"

        };
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpccontrato.montoPrimeraMoneda = valorConvertido;
            if (objetoTipoCambio.monto != "") {
                $scope.activaCamposPagosPeriodicos = false;
            } else {
                $scope.activaCamposPagosPeriodicos = true;
                $scope.planPagosPeriodoObjeto.numeroDePagos = null;
                $scope.planPagosPeriodoObjeto.cantidadDias = null;
                $scope.pagoContratoAdicionados = [];
            }
        });
    };

    $scope.convierteMonedaBolivianos_validaCambioTotalContrato = function () {
        if ($scope.cpccontrato.montoSegundaMoneda != undefined) {
            $scope.visibleColumnasGridContratoItem();
            $scope.visibleColumnasGridPlanPagos();
            $scope.cpccontrato.montoPrimeraMoneda = 0;
            $scope.validaAccionParaElCampoMontoTotalDeContrato();

        } else {
            $scope.cpccontrato.montoSegundaMoneda = 0;
            $scope.cambiaListaPlanFacturacion();
            if ($scope.contratoItemsAdicionados.length > 0) {
                $scope.modalMensajeConfirmacionCambioMontoContrato();
            }
        }
    };

    $scope.muestraGridContratoItem = function () {
        $scope.totalesTemplate = '<div style="width:86%; display: inline-block; text-align: right">' +
        '<label class="control-label">TOTAL&nbsp;&nbsp;</label></div>' +
        '<div style="width: 14%; display: inline-block;" ng-show="muestraPrimeraMoneda"><input type="text" class="form-control text-right" ng-model="pagoItemTotalPrimera" ui-number-mask disabled></div>' +
        '<div style="width: 14%; display: inline-block;" ng-show="muestraSegundaMoneda"><input type="text" class="form-control text-right" ng-model="pagoItemTotalSegunda" ui-number-mask disabled></div>';
       /* $scope.btnEditaServicioBien = '<div align="center"><button type="button" height="5" class="btn btn-default" ng-click="modalServicioBienesEdita(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Servicio o Bien">' +
        '<span class="glyphicon glyphicon-pencil"></span></button></div>';*/
        $scope.btnAdicionaContratoItem = '<div align="center"><button id="adicionaContratoItem" type="button" height="5" class="btn btn-default" ng-click="modalBuscadorItemsParaContratoItem(row)" style="cursor: pointer;" data-placement="bottom" title="Adicionar item">' +
        '<span class="glyphicon glyphicon glyphicon-plus"></span></button></div>';
        $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';
        $scope.currencyTemplateCinco = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';

        /*$scope.btnEliminaContratoItem = '<div align="center"><button id="eliminaContratoItem" type="button" height="5" class="btn btn-default" ng-show="disabledBotonEliminaContratoItemActiva(row)" ng-click="quitaContratoItem(row)" style="cursor: pointer;">' +
        '<span class="glyphicon glyphicon-trash"></span></button></div>';*/

        $scope.btnOpcionesItem='<div align="center" class="ngCellText ng-scope col0 colt0" ng-class="col.colIndex()">'+
        '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="modalServicioBienesEdita(row);$event.stopPropagation();">'+
        '<span class="glyphicon glyphicon-pencil"></span></button></span>' +
        '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="quitaContratoItem(row);$event.stopPropagation();" ng-show="!disabledBotonEliminaContratoItemActiva(row)">'+
        '<span class="glyphicon glyphicon-trash"></span></button></span>'+
        '</div>';

        $scope.headerPlantillaItem='<div class="ngHeaderSortColumn ngCellText {{col.headerClass}}"><span ng-cell-text="" class="ng-binding">'+
        '<div><button type="button" class="btn btn-default btn-sm" ng-click="modalServicioBienes()"  ng-show="readOnlyEnable?false:true">'+
        '<span class="glyphicon glyphicon-plus"></span></button></div></span></div>';

        $scope.gridContratoItem = {
            data: 'contratoItemsAdicionados',
            enableRowSelection: true,
            enableCellSelection: false,
            enableColumnResize: true,
            multiSelect: false,
            showFooter: true,
            enableSorting: true,
            footerTemplate: $scope.totalesTemplate,
            footerRowHeight: 32,
            rowHeight: 33,
            headerRowHeight:45,
            columnDefs: [
                {   field:'', displayName: '',
                    width: '6%',
                    sortable: false,
                    enableCellEdit: false,
                    resizable: false,
                    cellTemplate: $scope.btnOpcionesItem,
                    headerCellTemplate:  $scope.headerPlantillaItem
                },
                {
                    field: 'cpcItem.codigo',
                    displayName: "Código",
                    width: '10%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    align: "center",
                    sortable: true
                },
                {
                    field: 'cpcItem.descripcion',
                    displayName: "Descripción",
                    width: '34%',
                    headerClass: "header-center",
                    cellClass: "text-left",
                    sortable: true
                },
                {
                    field: 'montoPrimeraMoneda',
                    displayName: "Precio Unitario (BOB)",
                    width: '11%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    sortable: true,
                    cellTemplate: $scope.currencyTemplateCinco
                },
                {
                    field: 'montoSegundaMoneda',
                    displayName: 'Precio Unitario (USD)',
                    width: '11%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    sortable: true,
                    cellTemplate: $scope.currencyTemplateCinco
                },
                {
                    field: 'cantidad',
                    displayName: 'Cantidad',
                    width: '6%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    sortable: true
                },
                {
                    field: 'subtotalPrimeraMoneda',
                    displayName: 'Subtotal (BOB)',
                    width: '11%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    sortable: true,
                    cellTemplate: $scope.currencyTemplate
                },
                {
                    field: 'subtotalSegundaMoneda',
                    displayName: 'Subtotal (USD)',
                    width: '11%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    sortable: true,
                    cellTemplate: $scope.currencyTemplate
                }/*,
                {
                    displayName: "Modificar",
                    cellTemplate: $scope.btnEditaServicioBien,
                    headerClass: "header-center",
                    width: '8%',
                    enableCellEdit: false
                },
                {
                    displayName: "Eliminar",
                    cellTemplate: $scope.btnEliminaContratoItem,
                    headerClass: "header-center",
                    width: '8%',
                    enableCellEdit: false
                }*/
            ]
        };


    };

    $scope.disabledBotonEliminaContratoItemActiva = function (row) {
        return row.entity.cpcItem.codigo == "";
    };


    $scope.obtieneSubTotalEnFuncionDeCantidad = function (objeto, funcion) {
        if (objeto.cantidad != null || objeto.cantidad != "") {
            objeto.subtotalPrimeraMoneda = Number(objeto.montoPrimeraMoneda) * Number(objeto.cantidad);
            funcion(objeto);
        } else {
            objeto.subtotalPrimeraMoneda = Number(objeto.montoPrimeraMoneda) * Number(1);
            funcion(objeto);
        }
    };

    $scope.obtieneSubTotalSegundaMonedaEnFuncionDeCantidad = function (objeto, funcion) {
        if (objeto.cantidad != null || objeto.cantidad != "") {
            objeto.subtotalSegundaMoneda = Number(objeto.montoSegundaMoneda) * Number(objeto.cantidad);
            funcion(objeto);
        } else {
            objeto.subtotalSegundaMoneda = Number(objeto.montoSegundaMoneda) * Number(1);
            funcion(objeto);
        }
    };


    $scope.$on('ngGridEventEndCellEdit', function (event) {
        switch (event.targetScope.gridId) {
            case $scope.gridPlanPagos.$gridScope.gridId:
                //Controla el evento del ng-grid gridPlanPagos
                event.targetScope.row.entity.fechaProgramada = new Date(event.targetScope.row.entity.fechaProgramada);
                break;
            case $scope.gridContratoItem.$gridScope.gridId:
                //Controla el evento del ng-grid griditem

                if (columnaSeleccionadaContratoItem == "cantidad") {
                    $scope.obtieneSubTotalEnFuncionDeCantidad(event.targetScope.row.entity, function (valor) {
                    });
                    $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                        $scope.pagoItemTotalPrimera = resultadoNumero;
                    });
                }
                if (columnaSeleccionadaContratoItem == "montoPrimeraMoneda") {
                    var rowData = event.targetScope.row.entity;
                    var objetoTipoCambio = {
                        monto: rowData.montoPrimeraMoneda,
                        tipoCambio: $scope.cpccontrato.tipoCambio,
                        tipoMoneda: "SUS"
                    };
                    $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
                        event.targetScope.row.entity.montoSegundaMoneda = valorConvertido;
                        $scope.obtieneSubTotalEnFuncionDeCantidad(event.targetScope.row.entity, function (valor) {
                        });
                        $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                            $scope.pagoItemTotalPrimera = resultadoNumero;
                        });
                    });

                }
                if (columnaSeleccionadaContratoItem == "montoSegundaMoneda") {
                    var rowData = event.targetScope.row.entity;
                    var objetoTipoCambio = {
                        monto: rowData.montoSegundaMoneda,
                        tipoCambio: $scope.cpccontrato.tipoCambio,
                        tipoMoneda: "BOL"

                    };
                    $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
                        event.targetScope.row.entity.montoPrimeraMoneda = valorConvertido;
                        $scope.obtieneSubTotalEnFuncionDeCantidad(event.targetScope.row.entity, function (valor) {
                        });
                        $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                            $scope.pagoItemTotalPrimera = resultadoNumero;
                        });
                    });

                }
                break;
        }
    });

    $scope.$on('ngGridEventStartCellEdit', function (event) {

        switch (event.targetScope.gridId) {
            case $scope.gridPlanPagos.$gridScope.gridId:
                columnaSeleccionadaPagoContrato = event.targetScope.col.field;
                break;
            case $scope.gridContratoItem.$gridScope.gridId:
                columnaSeleccionadaContratoItem = event.targetScope.col.field;
                break;
        }


    });


    $scope.totalesTemplate = '<div ng-style="{width: generarPorPorcentaje ? \'56%\' : \'65%\'}" style="display: inline-block; text-align: right">' +
    '<label class="control-label">TOTAL&nbsp;&nbsp;</label></div>' +
    '<div style="width: 13%; display: inline-block;" ng-show="muestraPrimeraMoneda"><input type="text" class="form-control text-right" ng-model="pagoContratoTotalPrimera" ui-number-mask disabled></div>' +
    '<div style="width: 13%; display: inline-block;" ng-show="muestraSegundaMoneda"><input type="text" class="form-control text-right" ng-model="pagoContratoTotalSegunda" ui-number-mask disabled></div>' +
    '<div style="width: 12%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="pagoContratoTotalPorcentaje" ng-show="generarPorPorcentaje" currency-input decimals="2" disabled></div>';
    $scope.btnEditaPlanPagos = '<div align="center"><button type="button" height="5" class="btn btn-default" ng-click="modalFormularioPagoContratoEdita(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Plan Pago">' +
    '<span class="glyphicon glyphicon-pencil"></span></button></div>';
    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';
    $scope.currencyTemplateCinco = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
    $scope.porcentajeTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';
    $scope.btnEliminaPago = '<div align="center"><button id="eliminaPlanFacturacion" type="button" height="5" class="btn btn-default" ng-click="quitaPago(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-trash"></span></button></div>';

    $scope.gridPlanPagos = {
        data: 'pagoContratoAdicionados',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,
        rowHeight: 33,
        headerRowHeight: 45,
        columnDefs: [
            {
                field: 'nroPago',
                displayName: "N°",
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'fechaProgramada',
                displayName: 'Fecha',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                sortable: true
            },
            {
                field: 'parTipoHito.descripcion',
                displayName: "Hito",
                width: '13%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'descripcionPago',
                displayName: "Concepto",
                width: '12%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parEstadoPago.descripcion',
                displayName: "Estado",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'montoProgramado',
                displayName: "Monto (BOB)",
                width: '12%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'montoProgramadoSegMoneda',
                displayName: "Monto (USD)",
                width: '12%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'porcentajeProgramado',
                displayName: "Porcentaje",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate: $scope.porcentajeTemplate
            },
            {
                displayName: "Editar",
                cellTemplate: $scope.btnEditaPlanPagos,
                headerClass: "header-center",
                width: '8%',
                enableCellEdit: false
            },
            {
                displayName: "Eliminar",
                cellTemplate: $scope.btnEliminaPago,
                headerClass: "header-center",
                width: '8%',
                enableCellEdit: false
            }
        ]
    };

    $scope.adicionaPlanPago = function () {
        $scope.cpcPagoContrato = pagoContrato.getObject();
        $scope.pagoContratoAdicionados.push($scope.cpcPagoContrato);

    };

    $scope.modalBuscadorItemsParaContratoItem = function (row) {
        var modalConceptos = modalService.show(
            {
                templateUrl: 'modules/cxc/views/buscadorServiciosParaContrato.html',
                controller: 'buscadorServiciosParaContratoCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                $scope.showLoader();
                cxcService.getCpcItemByIdItem({}, {}, respModal.idEntidadPojo, serverConf.ERPCONTA_WS, function (response) {
                    //exito

                    $scope.cpcitems = response.data;

                    row.entity.cpcItem = $scope.cpcitems;
                    row.entity.montoPrimeraMoneda = $scope.cpcitems.precioUnitarioPrimeraMoneda;
                    row.entity.montoSegundaMoneda = $scope.cpcitems.precioUnitarioSegundaMoneda;
                    row.entity.cantidad = 1;
                    $scope.obtieneSubTotalEnFuncionDeCantidad(row.entity, function (valor) {
                    });
                    $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                        $scope.pagoItemTotalPrimera = resultadoNumero;
                    });
                    $scope.hideLoader();

                }, function (responseError) {
                    //error
                    $scope.hideLoader();
                });
                if (row.entity.cpcItem.codigo == "") {
                    $scope.cpccontratoitem = contratoItem.getObject();
                    $scope.contratoItemsAdicionados.push($scope.cpccontratoitem);
                }

            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
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

    $scope.$watchCollection("[cpccontrato]", function (val) {
        console.log(val[0]);
    });


    $scope.guardarContratoPojo = function () {
        $scope.showLoader();
        if ($scope.idSucursalCombo != "")
            $scope.cpccontrato.cpcSucursal.idSucursal = $scope.idSucursalCombo;
        $scope.cpccontratoPojo.cpcContrato = $scope.cpccontrato;
        $scope.cpccontratoPojo.listaCpcContratoItem = $scope.contratoItemsAdicionados;

        $scope.cpccontratoPojo.listaCpcActividadEconomica = $scope.listaActividadEconomica;

        $scope.cpccontratoPojo.listaCpcPagoContrato = $scope.pagoContratoAdicionados;
        if (contrato.validate($scope.cpccontrato)) {
            if ($scope.listaActividadEconomica.length > 0) {
                $scope.verificaMontosListaitems(function (respuesta) {
                    if (respuesta) {
                        $scope.verificaMontosListaPagoContrato(function (respuesta) {
                            if (respuesta) {
                                cxcService.guardaCpcContratoPojo($scope.cpccontratoPojo, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                                    $scope.hideLoader();
                                    $scope.showCustomModal({
                                        headerText: "Mensaje Confirmación",
                                        bodyText: "Se registro exitosamente el Contrato.",
                                        actionButtonText: "Continuar",
                                        type: 'exito',
                                        closeAfter: 6000
                                    });
                                    $state.transitionTo('contratoTemplate.empty', {}, {reload: true});
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
                            } else {
                                $scope.verificaMontosListaPagoContratoMuestraMensaje(function (respuesta) {
                                    $scope.hideLoader();
                                    $scope.showCustomModal({
                                        headerText: "Mensaje Validación",
                                        bodyText: respuesta,
                                        actionButtonText: "Continuar",
                                        type: 'error',
                                        closeAfter: 6000
                                    });
                                });
                            }
                        });

                    } else {
                        $scope.verificaMontosListaitemsMuestraMensaje(function (respuesta) {
                            $scope.hideLoader();
                            $scope.showCustomModal({
                                headerText: "Mensaje Error",
                                bodyText: respuesta,
                                actionButtonText: "Continuar",
                                type: 'error',
                                closeAfter: 6000
                            });
                        });

                    }
                });
            } else {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Validación",
                    bodyText: "Validación: La lista de Actividad Economica, se encuentra vacia, es necesario adicionar al menos un registro.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            }

        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validación",
                bodyText: "Validación: Existen campos vacios o datos incorrectos, verifique por favor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        }
    };

    $scope.generaNumeroPago = function (objetoListaPagoContrato, funcion) {
        $scope.numero = 0;
        angular.forEach(objetoListaPagoContrato, function (pagoContrato) {
            $scope.numero++;
        });
        $scope.numero++;
        funcion($scope.numero);
    };

    $scope.sumaMontoPagoContratoTotal = function (objetoListaPagoContrato, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaPagoContrato, function (pagoContrato) {
            $scope.sumar = $scope.sumar + Number(pagoContrato.montoProgramado);
        });
        funcion($scope.sumar);
    };

    $scope.sumaMontoPagoContratoTotalSegunda = function (objetoListaPagoContrato, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaPagoContrato, function (pagoContrato) {
            $scope.sumar = $scope.sumar + Number(pagoContrato.montoProgramadoSegMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.sumaMontoPagoContratoTotalPorcentaje = function (objetoListaPagoContrato, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaPagoContrato, function (pagoContrato) {
            $scope.sumar = $scope.sumar + Number(pagoContrato.porcentajeProgramado);
        });
        funcion($scope.sumar);
    };

    $scope.sumaMontoContratoItemsTotal = function (objetoListaContratoItems, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaContratoItems, function (contratoItem) {
            $scope.sumar = $scope.sumar + Number(contratoItem.subtotalPrimeraMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.obtieneSaldoListaPagoContrato = function (objeto, funcion) {
        $scope.sumaMontoPagoContratoTotal(objeto.listaPagoContrato, function (resultadoNumero) {
            funcion(Number(objeto.monto) - Number(resultadoNumero));
        });
    };


    $scope.modalFormularioPagoContrato = function () {

        if ($scope.muestraPrimeraMoneda) {
            var valor = $scope.cpccontrato.montoPrimeraMoneda != null && $scope.cpccontrato.montoPrimeraMoneda != undefined && $scope.cpccontrato.montoPrimeraMoneda != 0;
        } else {
            var valor = $scope.cpccontrato.montoSegundaMoneda != null && $scope.cpccontrato.montoSegundaMoneda != undefined && $scope.cpccontrato.montoSegundaMoneda != 0;
        }
        if (valor) {
            if ($scope.muestraPrimeraMoneda ? $scope.cpccontrato.montoPrimeraMoneda != $scope.pagoContratoTotalPrimera : $scope.cpccontrato.montoSegundaMoneda != $scope.pagoContratoTotalSegunda) {
                tempCache.tipoMonedaUniversal = $scope.cpccontrato.parTipoMoneda.codigo;
                tempCache.primeraMonedaEnum = primeraMonedaEnum;
                tempCache.tipoCambioContrato = $scope.cpccontrato.tipoCambio;
                tempCache.montoContratoPrimeraMoneda = $scope.cpccontrato.montoPrimeraMoneda;
                tempCache.montoContratoSegundaMoneda = $scope.cpccontrato.montoSegundaMoneda;
                tempCache.porcentajeRestante = 100 - $scope.pagoContratoTotalPorcentaje;
                tempCache.saldoTotalPrimeraMoneda = $scope.cpccontrato.montoPrimeraMoneda - $scope.pagoContratoTotalPrimera;
                tempCache.saldoTotalSegundaMoneda = $scope.cpccontrato.montoSegundaMoneda - $scope.pagoContratoTotalSegunda;
                tempCache.generarPorPorcentajeCache = $scope.generarPorPorcentaje;
                tempCache.generarPorMontoCache = $scope.generarPorMonto;

                var objetoPagoContratoPojo = {
                    listaPagoContrato: $scope.pagoContratoAdicionados,
                    monto: $scope.cpccontrato.montoPrimeraMoneda
                };
                $scope.cpcPagoContrato = pagoContrato.getObject();
                $scope.generaNumeroPago($scope.pagoContratoAdicionados, function (resultadoNumero) {
                    $scope.cpcPagoContrato.nroPago = resultadoNumero;
                });
                tempCache.pagoContrato = $scope.cpcPagoContrato;
                var modalPagoContrato = modalService.show(
                    {
                        templateUrl: 'modules/cxc/views/modalPagoContrato.html',
                        controller: 'modalPagoContratoCtrl',
                        size: 'md'
                    }, {
                        //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
                    }
                ).then(function (respModal) {
                        $scope.cpcPagoContrato = respModal;

                        console.info("OBJETO PARAMETRICA UNO:", $scope.cpcPagoContrato.parEstadoPago.descripcion);
                        $scope.pagoContratoAdicionados.push($scope.cpcPagoContrato);


                        $scope.sumaMontoPagoContratoTotal($scope.pagoContratoAdicionados, function (resultadoNumero) {
                            $scope.pagoContratoTotalPrimera = resultadoNumero;
                        });

                        $scope.sumaMontoPagoContratoTotalSegunda($scope.pagoContratoAdicionados, function (resultadoNumero) {
                            $scope.pagoContratoTotalSegunda = resultadoNumero;
                        });

                        $scope.sumaMontoPagoContratoTotalPorcentaje($scope.pagoContratoAdicionados, function (resultadoNumero) {
                            $scope.pagoContratoTotalPorcentaje = resultadoNumero;
                        });
                        $scope.bloqueaMontoTotalDeContrato = true;

                    });
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            } else {
                $scope.showCustomModal({
                    headerText: "Mensaje Validación",
                    bodyText: "Validación: No puede adicionar un nuevo registro llego al limite del 'Monto Total de Contrato'",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });

            }
        } else {
            $scope.showCustomModal({
                headerText: "Mensaje Validación",
                bodyText: "Validación: Es necesario llenar el campo 'Monto Total de Contrato'.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        }
    };

    $scope.modalFormularioPagoContratoEdita = function (row) {
        tempCache.pagoContrato = row.entity;
        tempCache.tipoMonedaUniversal = $scope.cpccontrato.parTipoMoneda.codigo;
        tempCache.primeraMonedaEnum = primeraMonedaEnum;
        tempCache.tipoCambioContrato = $scope.cpccontrato.tipoCambio;
        tempCache.montoContratoPrimeraMoneda = $scope.cpccontrato.montoPrimeraMoneda;
        tempCache.montoContratoSegundaMoneda = $scope.cpccontrato.montoSegundaMoneda;
        tempCache.porcentajeRestante = 100 - $scope.pagoContratoTotalPorcentaje;
        tempCache.saldoTotalPrimeraMoneda = $scope.cpccontrato.montoPrimeraMoneda - $scope.pagoContratoTotalPrimera;
        tempCache.saldoTotalSegundaMoneda = $scope.cpccontrato.montoSegundaMoneda - $scope.pagoContratoTotalSegunda;

        tempCache.generarPorPorcentajeCache = $scope.generarPorPorcentaje;
        tempCache.generarPorMontoCache = $scope.generarPorMonto;

        var modalPagoContrato = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalPagoContrato.html',
                controller: 'modalPagoContratoEditaCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                row.entity = respModal;
                $scope.sumaMontoPagoContratoTotal($scope.pagoContratoAdicionados, function (resultadoNumero) {
                    $scope.pagoContratoTotalPrimera = resultadoNumero;
                });

                $scope.sumaMontoPagoContratoTotalSegunda($scope.pagoContratoAdicionados, function (resultadoNumero) {
                    $scope.pagoContratoTotalSegunda = resultadoNumero;
                });

                $scope.sumaMontoPagoContratoTotalPorcentaje($scope.pagoContratoAdicionados, function (resultadoNumero) {
                    $scope.pagoContratoTotalPorcentaje = resultadoNumero;
                });

                $scope.bloqueaMontoTotalDeContrato = true;
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    //ng-change="moodificaValorAlModificarTipoCambio(cpccontrato.tipoCambio)", este se ejecutaba en el campo del formulario Tipo Cambio
    $scope.moodificaValorAlModificarTipoCambio = function (tipoCambio) {
        var objetoTipoCambio,
            tipoMoneda = $scope.cpccontrato.parTipoMoneda.codigo;

        if (tipoMoneda === 'SUS') {
            objetoTipoCambio = {
                monto: $scope.cpccontrato.montoSegundaMoneda,
                tipoCambio: tipoCambio,
                tipoMoneda: "BOL"
            };
        } else {
            objetoTipoCambio = {
                monto: $scope.cpccontrato.montoPrimeraMoneda,
                tipoCambio: tipoCambio,
                tipoMoneda: "SUS"
            };
        }


        if (objetoTipoCambio.monto != null) {
            $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
                if (tipoMoneda === 'SUS') {
                    $scope.cpccontrato.montoPrimeraMoneda = valorConvertido;
                } else {
                    $scope.cpccontrato.montoSegundaMoneda = valorConvertido;
                }

            });
        }
        $scope.cambiaTipoCambioListaPlanFacturacion($scope.pagoContratoAdicionados, tipoCambio, function (valor) {
            $scope.pagoContratoAdicionados = valor;
        });

        $scope.cambiaTipoCambioListaServicioBien($scope.contratoItemsAdicionados, tipoCambio, function (valor) {
            $scope.contratoItemsAdicionados = valor;
        });

        objetoTipoCambio = {
            monto: $scope.pagoContratoTotalPrimera,
            tipoCambio: $scope.cpccontrato.tipoCambio,
            tipoMoneda: "SUS"

        };
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valor) {
            $scope.pagoContratoTotalSegunda = valor;
        });


    };

    $scope.verificaMontosListaitems = function (funcion) {
        if ($scope.cpccontrato.parTipoMoneda.codigo == primeraMonedaEnum) {
            var montoContrato = $scope.cpccontrato.montoPrimeraMoneda;
            var montoTotal = $scope.pagoItemTotalPrimera;
        } else {
            var montoContrato = $scope.cpccontrato.montoSegundaMoneda;
            var montoTotal = $scope.pagoItemTotalSegunda;
        }
        if (montoTotal != 0) {
            if (montoTotal > montoContrato) {
                funcion(false);
            } else {
                if (montoTotal == montoContrato) {
                    funcion(true);
                } else {
                    funcion(false);
                }
            }
        } else {
            funcion(false);
        }


    };

    $scope.verificaMontosListaitemsMuestraMensaje = function (funcion) {
        if ($scope.cpccontrato.parTipoMoneda.codigo == primeraMonedaEnum) {
            var montoContrato = $scope.cpccontrato.montoPrimeraMoneda;
            var montoTotal = $scope.pagoItemTotalPrimera;
        } else {
            var montoContrato = $scope.cpccontrato.montoSegundaMoneda;
            var montoTotal = $scope.pagoItemTotalSegunda;
        }
        if (montoTotal != 0) {
            if (montoTotal > montoContrato) {
                funcion("Validación: La suma de los Montos en el 'Listado de Bienes o servicios', sobrepaso el Monto Total de Contrato.");
            } else {
                if (montoTotal != montoContrato) {
                    funcion("Validación: La suma de los Montos en el 'Listado de Bienes o servicios', es menor al Monto Total de Contrato.");
                }
            }
        } else {
            funcion("Validación: La lista de Bienes o Servicios, no tiene registros, se encuentra vacia.");
        }
    };


    $scope.obtienSumaTotalPrimeraMonedaListaContratoItem = function (listaContratoItem, funcion) {
        var sumaTotal = 0;
        angular.forEach(listaContratoItem, function (contratoItem) {
            sumaTotal = sumaTotal + Number(contratoItem.subtotalPrimeraMoneda);
        });
        funcion(sumaTotal);
    };


    $scope.verificaMontosListaPagoContrato = function (funcion) {
        if ($scope.cpccontrato.parTipoMoneda.codigo == primeraMonedaEnum) {
            var montoContrato = $scope.cpccontrato.montoPrimeraMoneda;
            var montoTotal = $scope.pagoContratoTotalPrimera;
        } else {
            var montoContrato = $scope.cpccontrato.montoSegundaMoneda;
            var montoTotal = $scope.pagoContratoTotalSegunda;
        }
        if (montoTotal != 0) {
            if (montoTotal > montoContrato) {
                funcion(false);
            } else {
                if (montoTotal == montoContrato) {
                    funcion(true);
                } else {
                    funcion(false);
                }
            }
        } else {
            funcion(false);
        }
    };

    $scope.verificaMontosListaPagoContratoMuestraMensaje = function (funcion) {

        if ($scope.cpccontrato.parTipoMoneda.codigo == primeraMonedaEnum) {
            var montoContrato = $scope.cpccontrato.montoPrimeraMoneda;
            var montoTotal = $scope.pagoContratoTotalPrimera;
        } else {
            var montoContrato = $scope.cpccontrato.montoSegundaMoneda;
            var montoTotal = $scope.pagoContratoTotalSegunda;
        }
        if (montoTotal != 0) {
            if (montoTotal > montoContrato) {
                funcion("Validación: La suma de los Montos en el 'Lista de Plan Facturacion', sobrepaso el Monto Total de Contrato.");
            } else {
                if (montoTotal != montoContrato) {
                    funcion("Validación: La suma de los Montos en el 'Lista de Plan Facturacion', es menor al Monto Total de Contrato.");
                }
            }
        } else {
            funcion("Validación: La 'Lista de Plan Facturacion', no tiene registros, se encuentra vacia.");
        }


    };

    $scope.obtienSumaTotalPrimeraMonedaListaPagoContrato = function (listaPagoContrato, funcion) {
        var sumaTotal = 0;
        angular.forEach(listaPagoContrato, function (pagoContrato) {
            sumaTotal = sumaTotal + Number(pagoContrato.montoProgramado);
        });
        funcion(sumaTotal);
    };


    $scope.cambiaSucursal = function () {
        if ($scope.idSucursalCombo != null) {
            cxcService.getCpcSucursalByIdSucursal({}, {}, $scope.idSucursalCombo, serverConf.ERPCONTA_WS, function (respuesta) {
                // EXITO
                $scope.cpccontrato.cpcSucursal.descripcion = respuesta.data.descripcion;
            }, function (respuestaDeError) {
                // ERROR
            });
        }
    };

    $scope.obtienePorcentajeDesdeElMontoMoneda = function (objetoMonto, funcion) {
        funcion((Number(objetoMonto.montoMonedaDividida) * Number(100)) / Number(objetoMonto.montoTotal));
    };


    $scope.generarPlanPagos = function () {
        $scope.divisionMontoPrimera = $scope.cpccontrato.montoPrimeraMoneda / $scope.planPagosPeriodoObjeto.numeroDePagos;
        $scope.divisionMontoSegunda = $scope.cpccontrato.montoSegundaMoneda / $scope.planPagosPeriodoObjeto.numeroDePagos;
        var objetoPorcentaje = {
            montoTotal: $scope.cpccontrato.montoPrimeraMoneda,
            montoMonedaDividida: $scope.divisionMontoPrimera

        };
        $scope.obtienePorcentajeDesdeElMontoMoneda(objetoPorcentaje, function (valorPorcentaje) {
            $scope.valorPorcentaje = valorPorcentaje;
        });
        if ($scope.planPagosPeriodoObjeto.numeroDePagos != null) {
            if ($scope.planPagosPeriodoObjeto.cantidadDias != null) {
                $scope.pagoContratoAdicionados = [];
                var fechaProcesar = $scope.fechaInicio;
                var nroPagos = parseInt($scope.planPagosPeriodoObjeto.numeroDePagos);
                var nroPagoCont = 0;
                $scope.generaNumeroPago($scope.pagoContratoAdicionados, function (resultadoNumero) {
                    nroPagoCont = resultadoNumero;
                });
                for (var i = 0; i < nroPagos; i++) {

                    $scope.cpcPagoContrato = pagoContrato.getObject();
                    $scope.cpcPagoContrato.nroPago = nroPagoCont++;
                    $scope.cpcPagoContrato.montoProgramado = $scope.divisionMontoPrimera;
                    $scope.cpcPagoContrato.montoProgramadoSegMoneda = $scope.divisionMontoSegunda;
                    $scope.cpcPagoContrato.porcentajeProgramado = $scope.valorPorcentaje;
                    $scope.cpcPagoContrato.fechaProgramada = addDays(fechaProcesar, $scope.planPagosPeriodoObjeto.cantidadDias);
                    fechaProcesar = $scope.cpcPagoContrato.fechaProgramada;

                    $scope.pagoContratoAdicionados.push($scope.cpcPagoContrato);
                    $scope.sumaMontoPagoContratoTotal($scope.pagoContratoAdicionados, function (resultadoNumero) {
                        $scope.pagoContratoTotalPrimera = resultadoNumero;
                    });

                    $scope.sumaMontoPagoContratoTotalSegunda($scope.pagoContratoAdicionados, function (resultadoNumero) {
                        $scope.pagoContratoTotalSegunda = resultadoNumero;
                    });

                    $scope.sumaMontoPagoContratoTotalPorcentaje($scope.pagoContratoAdicionados, function (resultadoNumero) {
                        $scope.pagoContratoTotalPorcentaje = resultadoNumero;
                    });
                }

                $scope.sumaMontoPagoContratoTotal($scope.pagoContratoAdicionados, function (resultadoNumero) {
                });
            }

        }


    };

    function adicionaDiasFecha(infecha, dias) {

        var fechadias = "";
        var cadadias = parseInt(dias);
        infecha.setDate(infecha.getDate() + cadadias);

        var anio = infecha.getFullYear();
        var mes = infecha.getMonth() + 1;
        var dia = infecha.getDate();

        if (mes.toString().length < 2) {
            mes = "0".concat(mes);
        }

        if (dia.toString().length < 2) {
            dia = "0".concat(dia);
        }

        fechadias = dia + "/" + mes + "/" + anio;

        return fechadias;

    }

    $scope.sumaMontoSubTotalItems = function (contratoItemsAdicionados, funcion) {
        $scope.sumar = 0;
        angular.forEach(contratoItemsAdicionados, function (contratoItem) {
            $scope.sumar = $scope.sumar + Number(contratoItem.subtotalPrimeraMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.sumaMontoSubSegundaMonedaTotalItems = function (contratoItemsAdicionados, funcion) {
        $scope.sumar = 0;
        angular.forEach(contratoItemsAdicionados, function (contratoItem) {
            $scope.sumar = $scope.sumar + Number(contratoItem.subtotalSegundaMoneda);
        });
        funcion($scope.sumar);
    };


    $scope.convierteMonedaValor = function (valor, tipoMoneda, tipoCambio, funcion) {
        var respuesta = 0;
        switch (tipoMoneda) {
            case parMonedaBolivianos:
                respuesta = Number(valor) * Number(tipoCambio);
                break;
            case parMonedaDolares:
                respuesta = Number(valor) / Number(tipoCambio);
                break;
        }
        funcion(respuesta);

    };

    $scope.limpiaListaPlanFacturacion = function () {
        $scope.planPagosPeriodoObjeto.numeroDePagos = null;
        $scope.planPagosPeriodoObjeto.cantidadDias = null;
        $scope.pagoContratoAdicionados = [];
    };


    $scope.quitaPago = function (row) {
        $scope.pagoContratoTotalPorcentaje = $scope.pagoContratoTotalPorcentaje - row.entity.porcentajeProgramado;
        $scope.pagoContratoTotalPrimera = (Number($scope.cpccontrato.montoPrimeraMoneda) * Number($scope.pagoContratoTotalPorcentaje)) / Number(100);
        $scope.pagoContratoTotalSegunda = (Number($scope.cpccontrato.montoSegundaMoneda) * Number($scope.pagoContratoTotalPorcentaje)) / Number(100);
        var index = row.rowIndex;
        $scope.gridPlanPagos.selectItem(index, false);
        $scope.pagoContratoAdicionados.splice(index, 1);

        if ($scope.contratoItemsAdicionados.length == 0 && $scope.pagoContratoAdicionados.length == 0) {
            $scope.bloqueaMontoTotalDeContrato = false;
        } else {
            $scope.bloqueaMontoTotalDeContrato = true;
        }
    };

    $scope.quitaContratoItem = function (row) {
        var index = row.rowIndex;
        $scope.gridContratoItem.selectItem(index, false);
        $scope.contratoItemsAdicionados.splice(index, 1);
        $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
            $scope.pagoItemTotalPrimera = resultadoNumero;
        });

        $scope.sumaMontoSubSegundaMonedaTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
            $scope.pagoItemTotalSegunda = resultadoNumero;
        });

        if ($scope.contratoItemsAdicionados.length == 0 && $scope.pagoContratoAdicionados.length == 0) {
            $scope.bloqueaMontoTotalDeContrato = false;
        } else {
            $scope.bloqueaMontoTotalDeContrato = true;
        }
    };

    function addDays(fecha, days) {
        return new Date(new Date(fecha).getTime() + days * 24 * 60 * 60 * 1000);
    }


    /*$scope.btnEliminaActividadEconomica = '<div align="center"><button id="eliminaActividadEconomica" type="button" height="5" class="btn btn-default" ng-click="quitaActividadEconomica(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-trash"></span></button></div>';*/

    $scope.btnEliminaActividadEconomica='<div align="center" class="ngCellText ng-scope col0 colt0" ng-class="col.colIndex()">'+
    '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="quitaActividadEconomica(row);$event.stopPropagation();" ng-disabled="modo.valor">'+
    '<span class="glyphicon glyphicon-trash"></span></button>'+
    '</span></div>';

    $scope.headerPlantilla='<div class="ngHeaderSortColumn ngCellText {{col.headerClass}}"><span ng-cell-text="" class="ng-binding">'+
    '<div><button type="button" class="btn btn-default btn-sm" ng-click="modalAsignaActividadEconomica()" ng-if="!modo.valor">'+
    '<span class="glyphicon glyphicon-plus"></span></button></div></span></div>';


    $scope.gridActividadEconomica = {
        data: 'listaActividadEconomica',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        selectedItems: $scope.mySelections,
        enableSorting: true,
        rowHeight: 33,
        headerRowHeight:40,
        columnDefs: [
            {   field:'', displayName: '',
                width: '6%',
                sortable: false,
                enableCellEdit: false,
                resizable: false,
                cellTemplate: $scope.btnEliminaActividadEconomica,
                headerCellTemplate:  $scope.headerPlantilla
            },
            {
                field: 'codigo',
                displayName: "Código",
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-right",
                align: "center",
                sortable: true
            },
            {
                field: 'descripcion',
                displayName: "Descripción",
                width: '74%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }/*,
            {
                displayName: "Eliminar",
                cellTemplate: $scope.btnEliminaActividadEconomica,
                headerClass: "header-center",
                width: '10%',
                enableCellEdit: false
            }*/
        ]
    };

    $scope.quitaActividadEconomica = function (row) {
        var index = row.rowIndex;
        $scope.gridActividadEconomica.selectItem(index, false);
        $scope.listaActividadEconomica.splice(index, 1);
    };


    $scope.modalAsignaActividadEconomica = function () {

        tempCache.listaActividadEconomica = $scope.listaActividadEconomica;

        var modalAsignaActividadEconomica = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalAsignaActividadEconomica.html',
                controller: 'modalAsignaActividadEconomicaCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                //$scope.actualizaListaActividadEconomica();
                cxcService.obtieneConcatenaModalidadFacturacionPorActividadEconomica({}, {}, respModal.idActividadEconomica, serverConf.ERPCONTA_WS, function (response) {
                    console.info("VALOR:",response.data );
                    respModal.descripcion = respModal.descripcion + "(" + response.data.cadenaModalidadFacturacion + ")";
                    $scope.listaActividadEconomica.push(respModal);
                }, function (responseError) {
                    //error
                });

            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };
    $scope.muestraListaCuentasBancarias = function () {
        cxcService.getCuentaBancariaPojoByEmpresa({}, {}, "EMP", serverConf.ERPCONTA_WS, function (response) {
            $scope.listaCuentaBancaria = response.data || {};
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

    $scope.modalServicioBienes = function () {

        if ($scope.cpccontrato.parTipoMoneda.codigo == primeraMonedaEnum) {
            var valor = $scope.cpccontrato.montoPrimeraMoneda != null && $scope.cpccontrato.montoPrimeraMoneda != undefined && $scope.cpccontrato.montoPrimeraMoneda != 0;
        } else {
            var valor = $scope.cpccontrato.montoSegundaMoneda != null && $scope.cpccontrato.montoSegundaMoneda != undefined && $scope.cpccontrato.montoSegundaMoneda != 0;
        }
        if (valor) {
            tempCache.listaContratoItem = $scope.contratoItemsAdicionados;
            var modalConceptos = modalService.show(
                {
                    templateUrl: 'modules/cxc/views/buscadorServiciosParaContrato.html',
                    controller: 'buscadorServiciosParaContratoCtrl',
                    size: 'md'
                }, {
                    //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
                }
            ).then(function (respModal) {
                    if ($scope.contratoItemsAdicionados.length == 0) {
                        $scope.montoPrimeraMonedaAux = $scope.cpccontrato.montoPrimeraMoneda;
                        $scope.montoSegundaMonedaAux = $scope.cpccontrato.montoSegundaMoneda;
                    }
                    $scope.contratoItem = pagoContrato.getObject();
                    $scope.contratoItem.cpcItem = respModal;

                    $scope.contratoItem.montoPrimeraMoneda = respModal.precioUnitarioPrimeraMoneda;
                    $scope.contratoItem.montoSegundaMoneda = respModal.precioUnitarioSegundaMoneda;
                    $scope.contratoItem.cantidad = 1;
                    $scope.obtieneSubTotalEnFuncionDeCantidad($scope.contratoItem, function (valor) {
                    });

                    $scope.obtieneSubTotalSegundaMonedaEnFuncionDeCantidad($scope.contratoItem, function (valor) {
                    });

                    $scope.contratoItemsAdicionados.push($scope.contratoItem);
                    $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                        $scope.pagoItemTotalPrimera = resultadoNumero;
                    });

                    $scope.sumaMontoSubSegundaMonedaTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                        $scope.pagoItemTotalSegunda = resultadoNumero;
                    });
                    $scope.bloqueaMontoTotalDeContrato = true;

                });
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        } else {
            $scope.showCustomModal({
                headerText: "Mensaje Validación",
                bodyText: "Validación: Es necesario llenar el campo 'Monto Total de Contrato'.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        }

    };


    $scope.cambiaTipoCambioListaPlanFacturacion = function (pagoContratoAdicionados, tipoCambio, funcion) {
        angular.forEach(pagoContratoAdicionados, function (pagoContrato) {
            var objetoTipoCambio = {
                monto: pagoContrato.montoProgramado,
                tipoCambio: tipoCambio,
                tipoMoneda: "SUS"

            };
            $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valor) {
                pagoContrato.montoProgramadoSegMoneda = valor;
            });
        });
        funcion(pagoContratoAdicionados);
    };


    $scope.cambiaTipoCambioListaServicioBien = function (contratoItemsAdicionados, tipoCambio, funcion) {
        angular.forEach(contratoItemsAdicionados, function (contratoItems) {
            var objetoTipoCambio = {
                monto: contratoItems.montoPrimeraMoneda,
                tipoCambio: tipoCambio,
                tipoMoneda: "SUS"

            };
            $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valor) {
                contratoItems.montoSegundaMoneda = valor;
            });
        });
        funcion(contratoItemsAdicionados);
    };


    $scope.modalServicioBienesEdita = function (row) {
        tempCache.contratoitem = row.entity;
        tempCache.tipoCambioContratoItem = $scope.cpccontrato.tipoCambio;


        tempCache.tipoMonedaUniversal = $scope.cpccontrato.parTipoMoneda.codigo;
        tempCache.primeraMonedaEnum = primeraMonedaEnum;

        var modalServicioBienes = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalModificaServicioBien.html',
                controller: 'modalModificaServicioBienCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                    $scope.pagoItemTotalPrimera = resultadoNumero;
                });

                $scope.sumaMontoSubSegundaMonedaTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                    $scope.pagoItemTotalSegunda = resultadoNumero;
                });
                $scope.bloqueaMontoTotalDeContrato = true;

            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };

    $scope.modalMensajeConfirmacionCambioMontoContrato = function () {
        tempCache.listaServiciosBienes = $scope.contratoItemsAdicionados;
        var modalMensajeConfirmacion = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalMensajeConfirmacionCambioMontoContrato.html',
                controller: 'modalMensajeConfirmacionCambioMontoContratoCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                if (respModal) {
                    $scope.montoPrimeraMonedaAux = $scope.cpccontrato.montoPrimeraMoneda;
                    $scope.montoSegundaMonedaAux = $scope.cpccontrato.montoSegundaMoneda;
                    $scope.contratoItemsAdicionados = [];
                    $scope.pagoItemTotalPrimera = 0;
                    $scope.pagoItemTotalSegunda = 0;
                    $scope.cambiaListaPlanFacturacion();
                } else {
                    $scope.cpccontrato.montoPrimeraMoneda = $scope.montoPrimeraMonedaAux;
                    $scope.cpccontrato.montoSegundaMoneda = $scope.montoSegundaMonedaAux;
                }
            });
    };

    $scope.cambiaListaPlanFacturacion = function () {
        $scope.pagoContratoAdicionadosAux = [];

        angular.forEach($scope.pagoContratoAdicionados, function (pagoContrato) {

            var objetoPorcentaje = {
                montoTotal: $scope.cpccontrato.montoPrimeraMoneda,
                porcentaje: pagoContrato.porcentajeProgramado

            };

            $scope.obtieneMontoMonedaPorProcentaje(objetoPorcentaje, function (valorPorcentaje) {
                pagoContrato.montoProgramado = valorPorcentaje;
                var objetoTipoCambio = {
                    monto: pagoContrato.montoProgramado,
                    tipoCambio: $scope.cpccontrato.tipoCambio,
                    tipoMoneda: "SUS"

                };
                $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
                    pagoContrato.montoProgramadoSegMoneda = valorConvertido;
                    $scope.pagoContratoAdicionadosAux.push(pagoContrato);
                    $scope.sumaMontoPagoContratoTotal($scope.pagoContratoAdicionadosAux, function (resultadoNumero) {
                        $scope.pagoContratoTotalPrimera = resultadoNumero;
                        $scope.sumaMontoPagoContratoTotalSegunda($scope.pagoContratoAdicionadosAux, function (resultadoNumero) {
                            $scope.pagoContratoTotalSegunda = resultadoNumero;
                            $scope.sumaMontoPagoContratoTotalPorcentaje($scope.pagoContratoAdicionadosAux, function (resultadoNumero) {
                                $scope.pagoContratoTotalPorcentaje = resultadoNumero;
                            });
                        });
                    });
                });


            });

        });
        $scope.pagoContratoAdicionados = [];
        $scope.pagoContratoAdicionados = $scope.pagoContratoAdicionadosAux;
    };

    $scope.obtieneMontoMonedaPorProcentaje = function (objetoPorcentaje, funcion) {
        funcion((Number(objetoPorcentaje.montoTotal) * Number(objetoPorcentaje.porcentaje)) / Number(100));
    };

    $scope.calculaMontoDolares = function (monto, montoDolar, tipoMoneda, funcion) {
        if (tipoMoneda == "SUS") {
            funcion(Number(monto) / Number(montoDolar));
        } else {
            funcion(Number(monto) * Number(montoDolar));
        }
    };

    $scope.monedaContratoCombo = function () {
        if ($scope.contratoItemsAdicionados.length > 0 || $scope.pagoContratoAdicionados.length > 0) {
            $scope.modalMensajeConfirmacionCambioMonedaContrato();
        } else {

            if ($scope.cpccontrato.parTipoMoneda.codigo == primeraMonedaEnum) {
                $scope.muestraPrimeraMoneda = true;
                $scope.muestraSegundaMoneda = false;
            } else {
                $scope.muestraPrimeraMoneda = false;
                $scope.muestraSegundaMoneda = true;
            }
            $scope.visibleColumnasGridContratoItem();
            $scope.visibleColumnasGridPlanPagos();
            $scope.monedaContratoCodigoAux = $scope.cpccontrato.parTipoMoneda.codigo;
        }
    };


    $scope.visibleColumnasGridContratoItem = function () {
        for (var i = 0; i < $scope.gridContratoItem.$gridScope.columns.length; i++) {
            var column = $scope.gridContratoItem.$gridScope.columns[i];
            switch (column.field) {
                case "montoPrimeraMoneda":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "montoSegundaMoneda":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                case "subtotalPrimeraMoneda":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "subtotalSegundaMoneda":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    $scope.visibleColumnasGridPlanPagos = function () {
        for (var i = 0; i < $scope.gridPlanPagos.$gridScope.columns.length; i++) {
            var column = $scope.gridPlanPagos.$gridScope.columns[i];
            switch (column.field) {
                case "montoProgramado":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "montoProgramadoSegMoneda":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.modalMensajeConfirmacionCambioMonedaContrato = function () {
        tempCache.listaServiciosBienes = $scope.contratoItemsAdicionados;
        tempCache.listaPlanFacturacion = $scope.pagoContratoAdicionados;
        var modalMensajeConfirmacion = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalMensajeConfirmacionCambioMonedaContrato.html',
                controller: 'modalMensajeConfirmacionCambioMonedaContratoCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                if (respModal) {
                    $scope.contratoItemsAdicionados = [];
                    $scope.pagoContratoAdicionados = [];
                    if ($scope.cpccontrato.parTipoMoneda.codigo == primeraMonedaEnum) {
                        $scope.muestraPrimeraMoneda = true;
                        $scope.muestraSegundaMoneda = false;
                    } else {
                        $scope.muestraPrimeraMoneda = false;
                        $scope.muestraSegundaMoneda = true;
                    }
                    $scope.visibleColumnasGridContratoItem();
                    $scope.visibleColumnasGridPlanPagos();
                    $scope.monedaContratoCodigoAux = $scope.cpccontrato.parTipoMoneda.codigo;
                    $scope.cpccontrato.montoPrimeraMoneda = 0;
                    $scope.cpccontrato.montoSegundaMoneda = 0;
                    $scope.pagoItemTotalPrimera = 0;
                    $scope.pagoItemTotalSegunda = 0;
                    $scope.pagoContratoTotalPrimera = 0;
                    $scope.pagoContratoTotalSegunda = 0;
                    $scope.pagoContratoTotalPorcentaje = 0;
                } else {
                    $scope.cpccontrato.parTipoMoneda.codigo = $scope.monedaContratoCodigoAux;
                }


            });
    };


    $scope.cambiaValorVaribleMonto = function () {


        if ($scope.pagoContratoAdicionados.length > 0) {

            var modalMensajeConfirmacion = modalService.show(
                {
                    templateUrl: 'modules/cxc/views/modalMensajeConfirmacionCambioGeneraPorcentajeMontoContrato.html',
                    controller: 'modalMensajeConfirmacionCambioGeneraPorcentajeMontoCtrl',
                    size: 'md'
                }, {
                    //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
                }
            ).then(function (respModal) {
                    if (respModal) {
                        $scope.pagoContratoAdicionados = [];
                        $scope.pagoContratoTotalPrimera = 0;
                        $scope.pagoContratoTotalSegunda = 0;
                        $scope.pagoContratoTotalPorcentaje = 0;
                        $scope.generarPorPorcentaje = false;
                        $scope.generarPorMonto = true;
                        $scope.visibleColumnasGridPlanPagosPorcentaje_o_Monto();
                    } else {
                        $scope.valor.generarPorPorcentajeMonto = "PORC"; //Valores : PORC , MONT
                        $scope.visibleColumnasGridPlanPagosPorcentaje_o_Monto();

                    }
                });
        } else {
            $scope.generarPorPorcentaje = false;
            $scope.generarPorMonto = true;
            $scope.visibleColumnasGridPlanPagosPorcentaje_o_Monto();

        }
    };

    $scope.cambiaValorVariblePorcentaje = function () {


        if ($scope.pagoContratoAdicionados.length > 0) {

            var modalMensajeConfirmacion = modalService.show(
                {
                    templateUrl: 'modules/cxc/views/modalMensajeConfirmacionCambioGeneraPorcentajeMontoContrato.html',
                    controller: 'modalMensajeConfirmacionCambioGeneraPorcentajeMontoCtrl',
                    size: 'md'
                }, {
                    //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
                }
            ).then(function (respModal) {
                    if (respModal) {
                        $scope.pagoContratoAdicionados = [];
                        $scope.pagoContratoTotalPrimera = 0;
                        $scope.pagoContratoTotalSegunda = 0;
                        $scope.pagoContratoTotalPorcentaje = 0;
                        $scope.generarPorPorcentaje = true;
                        $scope.generarPorMonto = false;
                        $scope.visibleColumnasGridPlanPagosPorcentaje_o_Monto();
                    } else {
                        $scope.valor.generarPorPorcentajeMonto = "MONT"; //Valores : PORC , MONT
                        $scope.visibleColumnasGridPlanPagosPorcentaje_o_Monto();

                    }
                });
        } else {
            $scope.generarPorPorcentaje = true;
            $scope.generarPorMonto = false;
            $scope.visibleColumnasGridPlanPagosPorcentaje_o_Monto();

        }
    };

    $scope.visibleColumnasGridPlanPagosPorcentaje_o_Monto = function () {
        for (var i = 0; i < $scope.gridPlanPagos.$gridScope.columns.length; i++) {
            var column = $scope.gridPlanPagos.$gridScope.columns[i];
            switch (column.field) {
                case "porcentajeProgramado":
                    column.visible = $scope.generarPorPorcentaje;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    init();


});

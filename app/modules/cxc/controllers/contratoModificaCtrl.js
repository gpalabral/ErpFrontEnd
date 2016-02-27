/**
 * Created by HENRRY on 24/04/2015.
 */

'use strict';

app.controller('contratoModificaCtrl', function ($scope, cxcService, serverConf, $state, tempCache, $stateParams, modalService, contratoItemModel, pagoContratoModel, contratoModel, $timeout) {
    console.log("INGRESANDO A MODIFICACION DE CONTRATO!!!!!!!!!!");
    $scope.readOnlyEnable = true;
    console.log($scope.readOnlyEnable);
    $scope.idSucursalCombo = "";

    $scope.botonAdiciona = false;
    $scope.botonModifica = true;

    $scope.bloqueaMontoTotalDeContrato = true;

    var tipoMonedaUniversal = "";
    var primeraMonedaEnum = "BOL";


    var contratoItem = new contratoItemModel();
    $scope.cpccontratoitem = contratoItem.getObject();
    $scope.contratoItemsAdicionados = [];

    var pagoContrato = new pagoContratoModel();


    $scope.generarPorPorcentaje = true;
    $scope.generarPorMonto = false;

    $scope.montoPrimeraMonedaAux = 0;
    $scope.montoSegundaMonedaAux = 0;

    $scope.valor = {
        generarPorPorcentajeMonto: ""//Valores : PORC , MONT
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


    var contrato = new contratoModel();
    $scope.cpccontrato = contrato.getObject();

    function init() {
        $scope.showLoader();
        $scope.parValorPrimeraMoneda = "BOB";//Valor del localStorage tipoMoneda primera.
        $scope.parValorSegundaMoneda = "USD";//Valor del localStorage tipoMoneda segunda.

        cxcService.getCpcContratoByIdContrato({}, {}, $stateParams.idContrato, serverConf.ERPCONTA_WS, function (response) {
            $scope.cpccontrato = response.data;
            console.log("DATOS DEL CONTRATO",$scope.cpccontrato);
            $scope.hideLoader();
            //$scope.cliSeleccionado = $scope.obtieneDescripcionProveedorCliente($scope.cpccontrato.cppProveedorCliente);
            $scope.cpccontrato.fechaContrato = new Date($scope.cpccontrato.fechaContrato);
            $scope.cpccontrato.fechaVigenciaInicio = new Date($scope.cpccontrato.fechaVigenciaInicio);
            $scope.cpccontrato.fechaVigenciaFin = new Date($scope.cpccontrato.fechaVigenciaFin);
            tipoMonedaUniversal = $scope.cpccontrato.parTipoMoneda.codigo;

            $scope.montoPrimeraMonedaAux = $scope.cpccontrato.montoPrimeraMoneda;
            $scope.montoSegundaMonedaAux = $scope.cpccontrato.montoSegundaMoneda;

            $scope.muestraPrimeraMoneda = $scope.cpccontrato.montoPrimeraMoneda != 0;
            $scope.muestraSegundaMoneda = $scope.cpccontrato.montoSegundaMoneda != 0;

            $scope.monedaContratoCodigoAux = $scope.cpccontrato.parTipoMoneda.codigo;

            cxcService.getCpcContratoItem({}, {}, $scope.cpccontrato.idContrato, serverConf.ERPCONTA_WS, function (response) {
                $scope.contratoItemsAdicionados = response.data;


                $scope.sumaMontoSubTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                    $scope.pagoItemTotalPrimera = resultadoNumero;
                });
                $scope.sumaMontoSubSegundaMonedaTotalItems($scope.contratoItemsAdicionados, function (resultadoNumero) {
                    $scope.pagoItemTotalSegunda = resultadoNumero;
                });
            }, function (responseError) {
                //error
            });

            listaCpcPagoContratoPorIdContrato();
            cxcService.getActividadEconomicaByIdContrato({}, {}, $scope.cpccontrato.idContrato, serverConf.ERPCONTA_WS, function (response) {
                $scope.listaActividadEconomica = response.data;
            }, function (responseError) {
                //error
            });

            cxcService.getModificaContrato({}, {}, $scope.cpccontrato.idContrato, serverConf.ERPCONTA_WS, function (response) {
                $scope.habilitaEdicionDeContratoSinFacturar = false;//Metodo JONAS WS que verificque si existe una traccion facturada para este contrato
                $scope.habilitaEdicionDeContratoSinFacturar = response.data;//Metodo JONAS WS que verificque si existe una traccion facturada para este contrato
                $scope.readOnlyEnable = !$scope.habilitaEdicionDeContratoSinFacturar;
                $scope.botonModifica = $scope.habilitaEdicionDeContratoSinFacturar;

            }, function (responseError) {
                //error
            });
            seleccionar();
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });

        $scope.muestraListaParTipoMoneda();

        $timeout(function () {
            visibleColumnasGridActividadEconomicaBotonEliminar();
        }, 2000);

        $timeout(function () {
            visibleColumnasGridContratoItemBotonEditaEliminar();
        }, 2000);

        $timeout(function () {
            visibleColumnasGridPlanPagos();
        }, 2000);

    }


    function seleccionar() {
        var idCuentaBancaria = $scope.cpccontrato.cuentaBancaria.idCuentaBancaria;

        cxcService.getCuentaBancariaPojoByEmpresa({}, {}, "EMP", serverConf.ERPCONTA_WS, function (response) {
            $scope.listaCuentaBancaria = response.data || {};

            var listaCuentaBancaria = $scope.listaCuentaBancaria;

            if (listaCuentaBancaria && listaCuentaBancaria.length) {
                for (var i = 0; i < listaCuentaBancaria.length; i++) {
                    if (listaCuentaBancaria[i].idCuentaBancaria == idCuentaBancaria) {
                        $scope.cpccontrato.cuentaBancaria = listaCuentaBancaria[i];
                        break;
                    }
                }
            }
        }, function (responseError) {
            //error
        });

        var idSucursal = $scope.cpccontrato.cpcSucursal.idSucursal;

        cxcService.getSucursalesAll({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaSucursales = response.data;

            var listaSucursales = $scope.listaSucursales;

            if (listaSucursales && listaSucursales.length) {
                for (var i = 0; i < listaSucursales.length; i++) {
                    if (listaSucursales[i].idSucursal == idSucursal) {
                        $scope.cpccontrato.cpcSucursal = listaSucursales[i];
                        break;
                    }
                }
            }
        }, function (responseError) {
            //error
        });

        var idProveedorCliente = $scope.cpccontrato.cppProveedorCliente.idProveedorCliente;

        /*function selectCliente(listclientes) {
            if (listclientes && listclientes.length) {
                for (var i = 0; i < listclientes.length; i++) {
                    if (listclientes[i].idProveedorCliente == idProveedorCliente) {
                        $scope.cpccontrato.cppProveedorCliente = listclientes[i];
                        break;
                    }
                }
            }
        }*/

        /*cxcService.getListaClientes({}, {}, "CLI", serverConf.ERPCONTA_WS, function (response) {
         $scope.clientes = response.data;
         }, function (responseError) {
         //error
         });*/
    }

    function visibleColumnasGridPlanPagos() {
        for (var i = 0; i < $scope.gridPlanPagos.$gridScope.columns.length; i++) {
            var column = $scope.gridPlanPagos.$gridScope.columns[i];
            switch (column.displayName) {
                case "Monto (BOB)":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "Monto (USD)":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                case "Porcentaje":
                    column.visible = $scope.generarPorPorcentaje;
                    break;
                case "Editar":
                    column.visible = $scope.habilitaEdicionDeContratoSinFacturar;
                    break;
                case "Eliminar":
                    column.visible = $scope.habilitaEdicionDeContratoSinFacturar;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    function listaCpcPagoContratoPorIdContrato() {
        cxcService.getCpcPagoContratoPorIdContrato({}, {}, $scope.cpccontrato.idContrato, serverConf.ERPCONTA_WS, function (response) {
            $scope.pagoContratoAdicionados = response.data;
            $scope.valor.generarPorPorcentajeMonto = $scope.pagoContratoAdicionados[0].porcentajeProgramado != 0 ? "PORC" : "MONT";
            $scope.generarPorPorcentaje = $scope.pagoContratoAdicionados[0].porcentajeProgramado != 0;

            $scope.sumaMontoPagoContratoTotal($scope.pagoContratoAdicionados, function (resultadoNumero) {
                $scope.pagoContratoTotalPrimera = resultadoNumero;
            });
            $scope.sumaMontoPagoContratoTotalSegunda($scope.pagoContratoAdicionados, function (resultadoNumero) {
                $scope.pagoContratoTotalSegunda = resultadoNumero;
            });
            $scope.sumaMontoPagoContratoTotalPorcentaje($scope.pagoContratoAdicionados, function (resultadoNumero) {
                $scope.pagoContratoTotalPorcentaje = resultadoNumero;
            });
        }, function (responseError) {
            //error
        });
    }

    $scope.sumaMontoSubTotalItems = function (contratoItemsAdicionados, funcion) {
        $scope.sumar = 0;
        angular.forEach(contratoItemsAdicionados, function (contratoItem) {
            $scope.sumar = $scope.sumar + Number(contratoItem.subtotalPrimeraMoneda);
        });
        funcion($scope.sumar);
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

    $scope.totalesTemplate = '<div ng-style="{width: habilitaEdicionDeContratoSinFacturar ? \'65%\':\'82%\'}"  style="display: inline-block; text-align: right">' +
    '<label class="control-label">TOTAL&nbsp;&nbsp;</label></div>' +
    '<div ng-style="{width: habilitaEdicionDeContratoSinFacturar ? \'13%\':\'18%\'}" style="display: inline-block;" ng-show="muestraPrimeraMoneda"><input type="text" class="form-control text-right" ng-model="pagoItemTotalPrimera" ui-number-mask disabled></div>' +
    '<div ng-style="{width: habilitaEdicionDeContratoSinFacturar ? \'13%\':\'18%\'}" style="display: inline-block;" ng-show="muestraSegundaMoneda"><input type="text" class="form-control text-right" ng-model="pagoItemTotalSegunda" ui-number-mask disabled></div>';

    /*$scope.btnEditaServicioBien = '<div align="center"><button type="button" height="5" class="btn btn-default" ng-click="modalServicioBienesEdita(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Servicio o Bien">' +
    '<span class="glyphicon glyphicon-pencil"></span></button></div>';*/


    $scope.btnAdicionaContratoItem = '<div align="center"><button id="adicionaContratoItem" type="button" height="5" class="btn btn-default" ng-click="modalBuscadorItemsParaContratoItem(row)" style="cursor: pointer;" data-placement="bottom" title="Adicionar item">' +
    '<span class="glyphicon glyphicon glyphicon-plus"></span></button></div>';

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';
    $scope.currencyTemplateCinco = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';

/*
    $scope.btnEliminaContratoItem = '<div align="center"><button id="eliminaContratoItem" type="button" height="5" class="btn btn-default" ng-click="quitaContratoItem(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-trash"></span></button></div>';
*/
    $scope.btnOpcionesItem='<div align="center" class="ngCellText ng-scope col0 colt0" ng-class="col.colIndex()">'+
    '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="modalServicioBienesEdita(row);$event.stopPropagation();">'+
    '<span class="glyphicon glyphicon-pencil"></span></button></span>' +
    '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="quitaContratoItem(row);$event.stopPropagation();">'+
    '<span class="glyphicon glyphicon-trash"> </span></button></span>'+
    '</div>';

    $scope.headerPlantillaItem='<div class="ngHeaderSortColumn ngCellText {{col.headerClass}}"><span ng-cell-text="" class="ng-binding">'+
    '<div><button type="button" class="btn btn-default btn-sm" ng-click="modalServicioBienes()">'+
    '<span class="glyphicon glyphicon-plus"></span></button></div></span></div>';

    $scope.gridContratoItem = {
        data: 'contratoItemsAdicionados',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 32,
        rowHeight: 33,
        headerRowHeight: 45,
        columnDefs: [
            //{displayName: "", cellTemplate: $scope.btnAdicionaContratoItem, width: '7%', enableCellEdit: false},
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
                cellClass: "text-left",
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

    $scope.modalServicioBienesEdita = function (row) {
        tempCache.contratoitem = row.entity;
        tempCache.tipoCambioContratoItem = $scope.cpccontrato.tipoCambio;


        tempCache.tipoMonedaUniversal = tipoMonedaUniversal;
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


    function visibleColumnasGridContratoItemBotonEditaEliminar() {
        for (var i = 0; i < $scope.gridContratoItem.$gridScope.columns.length; i++) {
            var column = $scope.gridContratoItem.$gridScope.columns[i];
            switch (column.displayName) {

                case "Precio Unitario(BOB)":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "Precio Unitario(USD)":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                case "Subtotal(BOB)":
                    column.visible = $scope.muestraPrimeraMoneda;
                    break;
                case "Subtotal(USD)":
                    column.visible = $scope.muestraSegundaMoneda;
                    break;
                case "Modificar":
                    column.visible = $scope.habilitaEdicionDeContratoSinFacturar;
                    break;
                case "Eliminar":
                    column.visible = $scope.habilitaEdicionDeContratoSinFacturar;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    $scope.btnAdicionaPlanPagos = '<div align="center"><button id="adicionaPlanPagos" type="button" height="5" class="btn btn-primary" ng-click="modalBuscadoritems(row)" style="cursor: pointer;" data-placement="bottom" title="Emitir Factura">' +
    '<span class="glyphicon glyphicon glyphicon-plus"></span></button></div>';

    $scope.btnReprogramacionPlanPagos = '<div align="center"><button id="reprogramacionPlanPagos" type="button" height="5" class="btn btn-default" ng-disabled="disabledBotonReprogramacionActiva(row)" ng-click="modalFormularioPagoContratoReprograma(row)" style="cursor: pointer;" data-placement="bottom" title="Reprogramar">' +
    '<span class="glyphicon glyphicon-log-out"></span></button></div>';

    $scope.totalesTemplate = '<div ng-style="{width: habilitaEdicionDeContratoSinFacturar ? generarPorPorcentaje?\'54%\':\'60%\':generarPorPorcentaje?\'62%\':\'70%\'}" style="display: inline-block; text-align: right">' +
    '<label class="control-label">TOTAL&nbsp;&nbsp;</label></div>' +
    '<div ng-style="{width: habilitaEdicionDeContratoSinFacturar ? generarPorPorcentaje?\'16%\':\'17%\':generarPorPorcentaje?\'20%\':\'20%\'}" style="display: inline-block;" ng-show="muestraPrimeraMoneda"><input type="text" class="form-control text-right" ng-model="pagoContratoTotalPrimera" ui-number-mask disabled></div>' +
    '<div ng-style="{width: habilitaEdicionDeContratoSinFacturar ? generarPorPorcentaje?\'16%\':\'17%\':generarPorPorcentaje?\'20%\':\'20%\'}" style="display: inline-block;" ng-show="muestraSegundaMoneda"><input type="text" class="form-control text-right" ng-model="pagoContratoTotalSegunda" ui-number-mask disabled></div>' +
    '<div style="width: 10%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="pagoContratoTotalPorcentaje" ng-show="generarPorPorcentaje" currency-input decimals="2" disabled></div>';


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
                width: '6%',
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
                width: '14%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'montoProgramadoSegMoneda',
                displayName: "Monto (USD)",
                width: '14%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'porcentajeProgramado',
                displayName: "Porcentaje",
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate: $scope.porcentajeTemplate
            },
            {
                displayName: "Editar",
                cellTemplate: $scope.btnEditaPlanPagos,
                headerClass: "header-center",
                width: '6%',
                enableCellEdit: false
            },
            {
                displayName: "Eliminar",
                cellTemplate: $scope.btnEliminaPago,
                headerClass: "header-center",
                width: '6%',
                enableCellEdit: false
            },
            {
                displayName: "",
                cellTemplate: $scope.btnReprogramacionPlanPagos,
                headerClass: "header-center",
                width: '6%',
                enableCellEdit: false
            }
        ]
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

    $scope.modalFormularioPagoContratoEdita = function (row) {
        tempCache.saldoTotalPrimeraMoneda = $scope.cpccontrato.montoPrimeraMoneda - $scope.pagoContratoTotalPrimera;
        tempCache.saldoTotalSegundaMoneda = $scope.cpccontrato.montoSegundaMoneda - $scope.pagoContratoTotalSegunda;

        var modalPagoContrato = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalPagoContratoEditaRegistrado.html',
                controller: 'modalPagoContratoEditaRegistradoCtrl',
                size: 'md'
            }, {
                pagoContratoEnviado: row.entity
            }
        ).
            then(function (respModal) {
                row.entity.cpcContrato = respModal.cpcContrato;
                row.entity.descripcionPago = respModal.descripcionPago;
                row.entity.fechaProgramada = respModal.fechaProgramada;
                row.entity.idPagoContrato = respModal.idPagoContrato;
                row.entity.montoFacturado = respModal.montoFacturado;
                row.entity.montoFacturadoSegMoneda = respModal.montoFacturadoSegMoneda;
                row.entity.montoPagadoPrimeraMoneda = respModal.montoPagadoPrimeraMoneda;
                row.entity.montoPagadoSegundaMoneda = respModal.montoPagadoSegundaMoneda;
                row.entity.montoProgramado = respModal.montoProgramado;
                row.entity.montoProgramadoSegMoneda = respModal.montoProgramadoSegMoneda;
                row.entity.nroPago = respModal.nroPago;
                row.entity.parEstadoPago = respModal.parEstadoPago;
                row.entity.porcentajeFacturado = respModal.porcentajeFacturado;
                row.entity.porcentajeProgramado = respModal.porcentajeProgramado;
                row.entity.parTipoHito = respModal.parTipoHito;

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

    $scope.cancelar = function () {
        $state.transitionTo('sucursalTemplate.empty', {}, {reload: true});
    };

    $scope.obtieneDescripcionProveedorCliente = function (proveedorCliente) {
        if (proveedorCliente.parTipoProveedorCliente.codigo == 'JUR') {
            return proveedorCliente.razonSocial;
        } else {
            return proveedorCliente.nombre + " " + proveedorCliente.primerApellido + " " + proveedorCliente.segundoApellido;
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

    $scope.calculaMontoDolares = function (monto, montoDolar, tipoMoneda, funcion) {
        if (tipoMoneda == "SUS") {
            funcion(Number(monto) / Number(montoDolar));
        } else {
            funcion(Number(monto) * Number(montoDolar));
        }
    };

    //$scope.convierteMonedaDolarGeneral = function (objeto, funcion) {
    //    if (objeto.monto != "") {
    //        cxcService.getCambioDeMoneda({}, {}, objeto.monto, objeto.tipoCambio, objeto.tipoMoneda, serverConf.ERPCONTA_WS, function (respuesta) {
    //            // EXITO
    //            var valor = respuesta.data;
    //            funcion(valor);
    //
    //        }, function (respuestaDeError) {
    //            // ERROR
    //            funcion(0);
    //        });
    //    } else {
    //        funcion(0);
    //    }
    //};

    $scope.convierteMonedaDolar = function () {

        var objetoTipoCambio = {
            monto: $scope.cpccontrato.montoPrimeraMoneda,
            tipoCambio: $scope.cpccontrato.tipoCambio,
            tipoMoneda: "SUS"

        }
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpccontrato.montoSegundaMoneda = valorConvertido;
        });
    };

    $scope.convierteMonedaBolivianos = function () {

        var objetoTipoCambio = {
            monto: $scope.cpccontrato.montoSegundaMoneda,
            tipoCambio: $scope.cpccontrato.tipoCambio,
            tipoMoneda: "BOL"

        }
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpccontrato.montoPrimeraMoneda = valorConvertido;
        });
    };

    $scope.cambiaSucursal = function () {
        $scope.idSucursalCombo = "";
    };

    $scope.modalFormularioPagoContratoReprograma = function (row) {
        tempCache.pagoContrato = row.entity;
        var modalPagoContrato = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalPagoContratoReprogramacion.html',
                controller: 'modalPagoContratoReprogramacionCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                if (respModal != null) {
                    $scope.cpcPagoContrato = respModal;
                    cxcService.modificaPagoContrato($scope.cpcPagoContrato, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                        console.info("REGISTRO OK cpcPagoContrato:", $scope.cpcPagoContrato);
                        listaCpcPagoContratoPorIdContrato();
                        $scope.showCustomModal({
                            headerText: "Mensaje Confirmación",
                            bodyText: "Se realizó la reprogramación exitosamente.",
                            actionButtonText: "Continuar",
                            type: 'exito',
                            closeAfter: 6000
                        });
                    }, function (respuestaDeError) {
                        $scope.showCustomModal({
                            headerText: "Mensaje Error",
                            bodyText: "Error al modificar la Reprogramamcion.",
                            actionButtonText: "Continuar",
                            type: 'error',
                            closeAfter: 6000
                        });
                    });
                }

            })
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.disabledBotonReprogramacionActiva = function (row) {
        tempCache.pagoContrato = row.entity;
        switch (row.entity.parEstadoPago.codigo) {
            case 'PAG' : // PAGADOS
                $scope.disabledBotonReprogramacion = true;
                break;
            case 'PEND' : // PENDIENTES
                $scope.disabledBotonReprogramacion = false;
                break;
            case 'MOR' : // MORA
                $scope.disabledBotonReprogramacion = false;
                break;
            case 'BAN' : // MORA
                $scope.disabledBotonReprogramacion = false;
                break;
            default :    // POR DEFECTO
                $scope.disabledBotonReprogramacion = false;
                break;
        }
        return $scope.disabledBotonReprogramacion;
    };


    $scope.muestraListaParTipoMoneda = function () {
        cxcService.getParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParTipoMoneda = response.data;
        }, function (responseError) {
            //error
        });
    };
    $scope.btnEliminaActividadEconomica='<div align="center" class="ngCellText ng-scope col0 colt0" ng-class="col.colIndex()">'+
    '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="quitaActividadEconomica(row);$event.stopPropagation();" ng-disabled="modo.valor">'+
    '<span class="glyphicon glyphicon-trash"></span></button>'+
    '</span></div>';

    $scope.headerPlantilla='<div class="ngHeaderSortColumn ngCellText {{col.headerClass}}"><span ng-cell-text="" class="ng-binding">'+
    '<div><button type="button" class="btn btn-default btn-sm" ng-click="modalAsignaActividadEconomica()">'+
    '<span class="glyphicon glyphicon-plus"></span></button></div></span></div>';

/*
    $scope.btnEliminaActividadEconomica = '<div align="center"><button id="eliminaActividadEconomica" type="button" height="5" class="btn btn-default" ng-click="quitaActividadEconomica(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-trash"></span></button></div>';
*/

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
                cellClass: "text-left",
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

    function visibleColumnasGridActividadEconomicaBotonEliminar() {
        for (var i = 0; i < $scope.gridActividadEconomica.$gridScope.columns.length; i++) {
            var column = $scope.gridActividadEconomica.$gridScope.columns[i];
            switch (column.displayName) {
                case "Eliminar":
                    column.visible = $scope.habilitaEdicionDeContratoSinFacturar;
                    break;
                //case "Descripción":
                //    column.width = $scope.habilitaEdicionDeContratoSinFacturar ? "50%" : "60%";
                //    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
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
                $scope.listaActividadEconomica.push(respModal);
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };

    $scope.sumaMontoSubSegundaMonedaTotalItems = function (contratoItemsAdicionados, funcion) {
        $scope.sumar = 0;
        angular.forEach(contratoItemsAdicionados, function (contratoItem) {
            $scope.sumar = $scope.sumar + Number(contratoItem.subtotalSegundaMoneda);
        });
        funcion($scope.sumar);
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
                montoTotal: $scope.muestraPrimeraMoneda ? $scope.cpccontrato.montoPrimeraMoneda : $scope.cpccontrato.montoSegundaMoneda,
                porcentaje: pagoContrato.porcentajeProgramado

            };

            $scope.obtieneMontoMonedaPorProcentaje(objetoPorcentaje, function (valorPorcentaje) {
                if ($scope.muestraPrimeraMoneda) {
                    pagoContrato.montoProgramado = valorPorcentaje;
                } else {
                    pagoContrato.montoProgramadoSegMoneda = valorPorcentaje;
                }
                var objetoTipoCambio = {
                    monto: $scope.muestraPrimeraMoneda ? pagoContrato.montoProgramado : $scope.cpccontrato.montoSegundaMoneda,
                    tipoCambio: $scope.cpccontrato.tipoCambio,
                    tipoMoneda: "SUS"

                };

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


                //$scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
                //    pagoContrato.montoProgramadoSegMoneda = valorConvertido;
                //    $scope.pagoContratoAdicionadosAux.push(pagoContrato);
                //    $scope.sumaMontoPagoContratoTotal($scope.pagoContratoAdicionadosAux, function (resultadoNumero) {
                //        $scope.pagoContratoTotalPrimera = resultadoNumero;
                //        $scope.sumaMontoPagoContratoTotalSegunda($scope.pagoContratoAdicionadosAux, function (resultadoNumero) {
                //            $scope.pagoContratoTotalSegunda = resultadoNumero;
                //            $scope.sumaMontoPagoContratoTotalPorcentaje($scope.pagoContratoAdicionadosAux, function (resultadoNumero) {
                //                $scope.pagoContratoTotalPorcentaje = resultadoNumero;
                //            });
                //        });
                //    });
                //});


            });

        });
        $scope.pagoContratoAdicionados = [];
        $scope.pagoContratoAdicionados = $scope.pagoContratoAdicionadosAux;
    };


    $scope.obtieneMontoMonedaPorProcentaje = function (objetoPorcentaje, funcion) {
        funcion((Number(objetoPorcentaje.montoTotal) * Number(objetoPorcentaje.porcentaje)) / Number(100));
    };


    $scope.modalServicioBienes = function () {

        if ($scope.muestraPrimeraMoneda) {
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

    $scope.verificaMontosListaPagoContrato = function (funcion) {
        if ($scope.muestraPrimeraMoneda) {
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

    $scope.verificaMontosListaitems = function (funcion) {
        if ($scope.muestraPrimeraMoneda) {
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

    $scope.verificaMontosListaPagoContratoMuestraMensaje = function (funcion) {

        if ($scope.muestraPrimeraMoneda) {
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

    $scope.verificaMontosListaitemsMuestraMensaje = function (funcion) {
        if ($scope.muestraPrimeraMoneda) {
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

    $scope.monedaContratoCombo = function () {
        if ($scope.contratoItemsAdicionados.length > 0 || $scope.pagoContratoAdicionados.length > 0) {
            $scope.modalMensajeConfirmacionCambioMonedaContrato();
        } else {

            if ($scope.cpccontrato.parTipoMoneda.codigo == "BOL") {
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
                    if ($scope.cpccontrato.parTipoMoneda.codigo == "BOL") {
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


    $scope.modalFormularioPagoContrato = function () {

        if ($scope.muestraPrimeraMoneda) {
            var valor = $scope.cpccontrato.montoPrimeraMoneda != null && $scope.cpccontrato.montoPrimeraMoneda != undefined && $scope.cpccontrato.montoPrimeraMoneda != 0;
        } else {
            var valor = $scope.cpccontrato.montoSegundaMoneda != null && $scope.cpccontrato.montoSegundaMoneda != undefined && $scope.cpccontrato.montoSegundaMoneda != 0;
        }
        if (valor) {
            if ($scope.muestraPrimeraMoneda ? $scope.cpccontrato.montoPrimeraMoneda != $scope.pagoContratoTotalPrimera : $scope.cpccontrato.montoSegundaMoneda != $scope.pagoContratoTotalSegunda) {
                tempCache.tipoMonedaUniversal = $scope.cpccontrato.parTipoMoneda.codigo;
                tempCache.primeraMonedaEnum = "BOL";
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

    $scope.generaNumeroPago = function (objetoListaPagoContrato, funcion) {
        $scope.numero = 0;
        angular.forEach(objetoListaPagoContrato, function (pagoContrato) {
            $scope.numero++;
        });
        $scope.numero++;
        funcion($scope.numero);
    };

    init();


})
;

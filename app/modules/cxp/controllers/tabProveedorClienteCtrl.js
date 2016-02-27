/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('tabProveedorClienteCtrl', function ($scope, cxpService, proveedorModel, serverConf, $state, $timeout, tempCache) {
    var proveedor = new proveedorModel();
    //$scope.cpproveedor = proveedor.getObject();

    $scope.readOnlyEnable = false;
    $scope.activaMensajeConfirmacion = false;
    $scope.concepto = [];
    $scope.conceptosTree = [];
    $scope.conceptosAsignados = [];
    $scope.modelSelected = null;
    $scope.activar = {
        tab: true
    };
    $scope.proveedorClientePojo = {
        "cppFormaPagoCobro": {
            "cppProveedorCliente": {
                "nombre": "",
                "sigla": "",
                "parTipoRegistro": {
                    "descripcion": "",
                    "codigo": "PROV"
                },
                "razonSocial": "",
                "direccion": "",
                "logo": "",
                "telefonoUno": "",
                "telefonoDos": "",
                "numeroFax": "",
                "numeroCelular": "",
                "direccionWeb": "",
                "parEstado": {
                    "descripcion": "",
                    "codigo": ""
                },
                "idProveedorCliente": 0,
                "parTipoProveedorCliente": {
                    "descripcion": "",
                    "codigo": ""
                },
                "correoElectronico": "",
                "fechaAniversario": "",
                "primerApellido": "",
                "segundoApellido": "",
                "numeroDocumento": "",
                "parTipoDocumento": {
                    "descripcion": "",
                    "codigo": ""
                }
            },
            "parEstado": {
                "descripcion": "",
                "codigo": ""
            },
            "limiteCredito": "",
            "numeroCuenta": "",
            "beneficiario": "",
            "parTipoMoneda": {
                "descripcion": "",
                "codigo": ""
            },
            "banco": "",
            "idFormaPagoCobro": 0,
            "diasPagoCredito": "",
            "parFormaDePago": {
                "descripcion": "",
                "codigo": ""
            },
            "proveedorCombustible": false
        },
        "cppProveedorCliente": {
            "nombre": "",
            "sigla": "",
            "parTipoRegistro": {
                "descripcion": "",
                "codigo": "PROV"
            },
            "razonSocial": "",
            "direccion": "",
            "logo": "",
            "telefonoUno": "",
            "telefonoDos": "",
            "numeroFax": "",
            "numeroCelular": "",
            "direccionWeb": "",
            "parEstado": {
                "descripcion": "",
                "codigo": ""
            },
            "idProveedorCliente": 0,
            "parTipoProveedorCliente": {
                "descripcion": "",
                "codigo": "NAT"
            },
            "correoElectronico": "",
            "fechaAniversario": "",
            "primerApellido": "",
            "segundoApellido": "",
            "numeroDocumento": "",
            "parTipoDocumento": {
                "descripcion": "",
                "codigo": "CI"
            },
            "vendorNumber":""
        },
        "listaCppContacto": [
            {
                "nombre": "",
                "cppProveedorCliente": {
                    "nombre": "",
                    "sigla": "",
                    "parTipoRegistro": {
                        "descripcion": "",
                        "codigo": ""
                    },
                    "razonSocial": "",
                    "direccion": "",
                    "logo": "",
                    "telefonoUno": "",
                    "telefonoDos": "",
                    "numeroFax": "",
                    "numeroCelular": "",
                    "direccionWeb": "",
                    "parEstado": {
                        "descripcion": "",
                        "codigo": ""
                    },
                    "idProveedorCliente": 0,
                    "parTipoProveedorCliente": {
                        "descripcion": "",
                        "codigo": ""
                    },
                    "correoElectronico": "",
                    "fechaAniversario": "",
                    "primerApellido": "",
                    "segundoApellido": "",
                    "numeroDocumento": "",
                    "parTipoDocumento": {
                        "descripcion": "",
                        "codigo": ""
                    }
                },
                "idContacto": 0,
                "telefono": "",
                "interno": "",
                "celular": "",
                "cargo": "",
                "correoElectronico": "",
                "fechaAniversario": "",
                "parTipoContacto": {
                    "descripcion": "",
                    "codigo": ""
                },
                "primerApellido": "",
                "segundoApellido": ""
            }
        ]
    };
    $scope.proveedorCliente = {
        "logo": "",
        "sigla": "",
        "nombre": "",
        "razonSocial": "",
        "direccion": "",
        "correoElectronico": "",
        "telefonoUno": "",
        "telefonoDos": "",
        "idProveedorCliente": 0,
        "primerApellido": "",
        "segundoApellido": "",
        "numeroDocumento": "",
        "numeroFax": "",
        "numeroCelular": "",
        "direccionWeb": "",
        "fechaAniversario": "",
        "parTipoProveedorCliente": {
            "descripcion": "",
            "codigo": ""
        },
        "parEstado": {
            "descripcion": "",
            "codigo": ""
        },
        "parTipoRegistro": {
            "descripcion": "",
            "codigo": ""
        },
        "parTipoDocumento": {
            "descripcion": "",
            "codigo": ""
        },
        "vendorNumber":"",
        "usuarioAlta": "",
        "usuarioBaja": "",
        "fechaBaja": "",
        "fechaModificacion": "",
        "usuarioModificacion": "",
        "fechaAlta": ""
    };

    /********************************ASIGNAR CONCEPTOS**************************************/
    /*Creado por: Paola Mejia
     *Obtiene los Grupos y conceptos para asignar al Proveedor*/
    function initGrupos() {

        var cellTemplate = "<div>{{item.descripcion}} <i>{{ item._nodeLevel === 0 ? item.mascara : ''}}</i></div>";

        cxpService.getGrupoConceptoTree({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            console.info("Listado de Grupos y Conceptos exitoso");
            $scope.conceptosTree = respuesta.data;
            console.log($scope.conceptosTree);
            $scope.treeGruposConceptos = {
                collection: $scope.conceptosTree,
                childrenField: 'children',
                iconExpanded: 'fa fa-angle-down',
                iconCollapsed: 'fa fa-angle-right',
                onClickRow: $scope.elementSelected,
                collapseElements: true,
                padding: 30,
                contentColor: '#f5f5f5',
                disabledLevels: [],
                enableHeader: false,
                colDefinition: [
                    {field: 'descripcion', displayName: 'Conceptos', treeField: true, cellTemplate: cellTemplate}
                ]
            };
            $scope.hideLoader();
        }, function (responseError) {
            //error
        });

        $scope.treeConceptosAsignados = {
            collection: $scope.conceptosAsignados,
            childrenField: 'children',
            iconExpanded: 'fa fa-angle-down',
            iconCollapsed: 'fa fa-angle-right',
            onClickRow: $scope.itemSelected,
            collapseElements: false,
            padding: 0,
            enableHeader: false,
            colDefinition: [
                {field: 'descripcion', displayName: 'Grupos y Conceptos', treeField: true}
            ]
        };

    };

    $scope.itemSelected = function (modelo) {
        if (modelo) {
            $scope.modelSelected2 = modelo;
            console.log("ITEM SELECCIONADO", $scope.modelSelected2);
        } else {
            $scope.modelSelected2 = {};
        }
    };

    $scope.elementSelected = function (model) {
        if (model) {
            $scope.modelSelected = model;
            console.log("ITEM SELECCIONADO", $scope.modelSelected);
        } else {
            $scope.modelSelected = {};
        }
    };
    var left = [];
    /*Creado por: Paola Mejia
     * Adiciona al listado derecho los conceptos seleccionados*/
    $scope.moveRight = function () {
        console.log("SELECCIONADO-", $scope.modelSelected);
        //console.log($scope.concepto.cppGrupo.idGrupo);
        left = $scope.modelSelected;
        if ($scope.conceptosAsignados.indexOf(left) < 0) {
            $scope.conceptosAsignados.push(left);

            $scope.indice = $scope.conceptosTree.indexOf(left);

            if ($scope.indice > -1) {
                $scope.conceptosTree.splice($scope.indice, 1);
            }
        }
    };
    $scope.moveLeft = function () {
        var toMove = $scope.modelSelected2;
        //console.log(el);
        $scope.conceptosTree.push(toMove);
        var indexOf = $scope.conceptosAsignados.indexOf(toMove);
        $scope.conceptosAsignados.splice(indexOf, 1);
    };

    function clean() {
        var conceptos = [];
        for (var j = 0; j < $scope.conceptosAsignados.length; j++) {
            conceptos[j] = {
                idEntidadPojo: $scope.conceptosAsignados[j].idEntidadPojo

            };
            conceptos[j]['children'] = [];
            for (var k = 0; k < $scope.conceptosAsignados[j]['children'].length; k++) {
                conceptos[j]['children'][k] = {
                    idEntidadPojo: $scope.conceptosAsignados[j]['children'][k].idEntidadPojo
                }

            }
        }
        return conceptos;
    }

    $scope.guardarProveedorClientePojo = function () {
        $scope.showLoader();
        $scope.proveedorClientePojo.listaCppContacto = $scope.contactos;
        $scope.proveedorClientePojo.listaCppGruposConceptos = clean();
        cxpService.adicionaProveedorClientePojo($scope.proveedorClientePojo, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.showLoader();
            // EXITO
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Confirmación",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 6000
            });
            $state.transitionTo('panelProveedorCliente', {}, {reload: true});
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Ocurrió un error.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 6000
            });
        });
    };

    $scope.listaParConceptos = function () {
        cxpService.getListaConceptos({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaConcepto = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });


    };

    $scope.listaParTipoRegistro = function () {
        cxpService.getListParTipoRegistro({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoRegistro = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });


    };

    $scope.listaParTipoProveedorCliente = function () {
        cxpService.getListParTipoProveedorCliente({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoProveedorCliente = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
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

    $scope.listParTipoMoneda = function () {
        cxpService.getListParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoMoneda = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });


    };
    $scope.listParFormaPago = function () {
        cxpService.getListParFormaPago({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaFormaPago = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });


    };
    $scope.listaParConceptos();
    $scope.listaParTipoRegistro();
    $scope.listaParTipoProveedorCliente();
    $scope.listaParTipoDocumento();

    $scope.listParTipoMoneda();
    $scope.listParFormaPago();


    var init = function () {
        cxpService.listaContacto($scope.contacto, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.contactos = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    init();
    initGrupos();

    /*****************************TAB CONTACTOS***************************************/
    $scope.contacto = {
        "nombre": "",
        "correoElectronico": "",
        "fechaAniversario": "",
        "parTipoContacto": {
            "descripcion": "",
            "codigo": ""
        },
        "primerApellido": "",
        "segundoApellido": "",
        "cppProveedorCliente": {
            "razonSocial": "",
            "direccion": "",
            "sigla": "",
            "nombre": "",
            "idProveedorCliente": 0,
            "logo": "",
            "correoElectronico": "",
            "fechaAniversario": "",
            "primerApellido": "",
            "segundoApellido": "",
            "numeroDocumento": "",
            "parTipoDocumento": {
                "descripcion": "",
                "codigo": ""
            },
            "parTipoRegistro": {
                "descripcion": "",
                "codigo": ""
            },
            "telefonoUno": "",
            "telefonoDos": "",
            "numeroFax": "",
            "numeroCelular": "",
            "direccionWeb": "",
            "parEstado": {
                "descripcion": "",
                "codigo": ""
            },
            "parTipoProveedorCliente": {
                "descripcion": "",
                "codigo": ""
            }
        },
        "cargo": "",
        "telefono": "",
        "idContacto": 0,
        "interno": "",
        "celular": ""
    };
    $scope.mostrar = {
        formContacto: false
    };

    $scope.listaContacto = function () {
        cxpService.listaContacto($scope.contacto, {"idCppProveedorCliente": null}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.contactos = respuesta.data;
            console.log("tabProveedorCliente: Contactos", $scope.contactos);
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.formularioContacto = function (row) {
        $scope.mostrar.formContacto = true;
        /*      $scope.indice=row.rowIndex;
         console.log(row.rowIndex);*/
    };
    $scope.guardarContacto = function () {
        $scope.contactos.push($scope.contacto);
        $scope.mostrar.formContacto = false;

    };

    //  $scope.listParTipoContacto = function () {
    cxpService.getListParTipoContacto({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
        // EXITO
        $scope.listaTipoContacto = respuesta.data;
    }, function (respuestaDeError) {
        // ERROR\
    });
    //};
    var ngGridConfig = function () {

        $scope.btnAdicionar = '<button id="formularioContacto" type="button" height="5" class="btn btn-primary" ng-click="formularioContacto(row)" style="cursor: pointer;" data-placement="bottom" title="Adicionar Contacto">' +
        '<span class="glyphicon glyphicon-plus"></span></button>';
        $scope.btnEditar = '<button id="editarContacto" type="button" height="5" class="btn btn-primary" ng-click="editarContacto(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Contacto">' +
        '<span class="glyphicon glyphicon-pencil"></span></button>';
        $scope.gridOptions = {
            data: 'contactos',
            enableRowSelection: false,
            columnDefs: [
                //{displayName:'Tipo Contacto',cellTemplate:$scope.opTipoContacto,width:'20%', enableCellEdit:false},
                {
                    field: 'parTipoContacto.descripcion',
                    width: '22%',
                    displayName: 'Tipo Contacto',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'nombre',
                    width: '30%',
                    displayName: 'Nombre Completo',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                //{ field: 'cargo',width: '20%', displayName:'Cargo',  headerClass: "header-center" },
                {
                    field: 'correoElectronico',
                    width: '20%',
                    displayName: 'Correo Electrónico',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'telefono',
                    width: '13%',
                    displayName: 'Teléfono',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: 'celular',
                    width: '10%',
                    displayName: 'Celular',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                //{ cellTemplate: $scope.btnAdicionar, width: '5%', enableCellEdit: false},
                {cellTemplate: $scope.btnEditar, width: '5%', enableCellEdit: false}
            ]
        };
        $scope.listaContacto();
    };
    ngGridConfig();
});

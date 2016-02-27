/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('tabProveedorClienteDetalleCtrl', function ($scope, cxpService, serverConf, $state, $timeout, localStorageService, tempCache, $filter, $stateParams,modalService) {

    console.log("INGRESANDO A MODIFICACION!!!!!!!!!!!!");
    $scope.readOnlyEnable = true;
    $scope.operacion;
    $scope.idProveedor = $stateParams.idEntidadPojo;
    $scope.concepto = [];
    $scope.contacto = {
        "cargo": "",
        "nombre": "",
        "correoElectronico": "",
        "idContacto": 0,
        "cppProveedorCliente": {
            "nombre": "",
            "correoElectronico": "",
            "logo": "",
            "nit": 0,
            "sigla": "",
            "razonSocial": "",
            "direccion": "",
            "parTipoProveedorCliente": {
                "descripcion": "",
                "codigo": ""
            },
            "parTipoRegistro": {
                "descripcion": "",
                "codigo": ""
            },
            "idProveedorCliente": $scope.idProveedor,
            "primerApellido": "",
            "segundoApellido": "",
            "fechaAniversario": "",
            "numeroDocumento": "",
            "parTipoDocumento": {
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
            }
        },
        "primerApellido": "",
        "segundoApellido": "",
        "parTipoContacto": {
            "descripcion": "",
            "codigo": ""
        },
        "fechaAniversario": "",
        "telefono": "",
        "interno": "",
        "celular": ""
    };
    $scope.conceptosAsignados = [];
    $scope.conceptosTree = [];
    $scope.ocultaBotonElimina=false;
    $scope.activar = {
        tab: false
    };

    var init = function () {
        cxpService.getCppProveedorClientePojoPorIdProveedorCliente({}, {idProveedorCliente: $scope.idProveedor}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.proveedorClientePojo = respuesta.data;
            console.log("OBJETO PROVEEDOR POR ID DEL ARBOL--->>>>", $scope.proveedorClientePojo);
            $scope.tipoDocumento = $scope.proveedorClientePojo.cppProveedorCliente.parTipoDocumento.descripcion;
            $scope.contactos = $scope.proveedorClientePojo.listaCppContacto;
            //console.log("OBJETO PROVEEDOR POR ID DEL ARBOL--->>>>",$scope.proveedorClientePojo);
            $scope.conceptosAsignados = $scope.proveedorClientePojo.listaCppGruposConceptos;
            $scope.proveedorClientePojo.cppProveedorCliente.fechaAniversario = new Date($scope.proveedorClientePojo.cppProveedorCliente.fechaAniversario);

            cxpService.verificaSiProveedorClienteNoEstaAsociado({}, {}, $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente, serverConf.ERPCONTA_WS, function (respuesta) {
                $scope.ocultaBotonElimina = respuesta.data;
            });

            initGrupos();

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
            console.log("DOCUMENTOS---", $scope.listaTipoDocumento);
        }, function (respuestaDeError) {
            // ERROR\
        });
    };
    $scope.listParTipoContacto = function () {
        cxpService.getListParTipoContacto({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoContacto = respuesta.data;
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
    $scope.listadoContactos = function () {
        cxpService.listaContacto({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.contactos = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };
    $scope.listaParTipoRegistro();
    $scope.listaParTipoProveedorCliente();
    $scope.listaParTipoDocumento();
    $scope.listParTipoContacto();
    $scope.listParTipoMoneda();
    $scope.listParFormaPago();
    /********************************TAB CONTACTOS*************************************************/
    $scope.mostrar = {
        formContacto: false
    };

    $scope.nuevoContacto = function () {
        $scope.operacion = 'adiciona';
        $scope.mostrar.formContacto = true;
        //$scope.contacto=[];

    };
    function actualizarContactos() {
        cxpService.listaContacto({}, {idCppProveedorCliente: $stateParams.idEntidadPojo}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.contactos = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    }

    $scope.ngGridConfig = function () {
        $scope.btnEditar = '<button id="editarContacto" type="button" height="5" class="btn btn-primary" ng-click="editarContacto(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Contacto">' +
        '<span class="glyphicon glyphicon-pencil"></span></button>';
        $scope.gridOptions = {
            data: 'contactos',
            enableRowSelection: false,
            multiSelect: false,
            columnDefs: [
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
                    cellClass: "text-center"
                },
                {
                    field: 'telefono',
                    width: '13%',
                    displayName: 'Telefono',
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
                {cellTemplate: $scope.btnEditar, width: '5%', enableCellEdit: false}
            ]
        };
    };
    $scope.ngGridConfig();
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene los datos de contacto seleccionado al hacer click en el boton editarContacto*/
    $scope.editarContacto = function (row) {
        $scope.operacion = 'edita';
        $scope.mostrar.formContacto = true;
        console.log("Contactos:editarContacto", row.entity);
        $scope.contacto = {};
        $scope.contacto.idContacto = row.entity.idContacto;
        $scope.contacto.nombre = row.entity.nombre;
        $scope.contacto.primerApellido = row.entity.primerApellido;
        $scope.contacto.segundoApellido = row.entity.segundoApellido;
        $scope.contacto.fechaAlta = row.entity.fechaAlta;
        $scope.contacto.usuarioAlta = row.entity.usuarioAlta;
        $scope.contacto.cargo = row.entity.cargo;
        $scope.contacto.parTipoContacto = {};
        $scope.contacto.parTipoContacto.codigo = row.entity.parTipoContacto.codigo;

        $scope.contacto.parTipoContacto.descripcion = row.entity.parTipoContacto.descripcion;
        $scope.contacto.fechaAniversario = new Date(row.entity.fechaAniversario);
        $scope.contacto.telefono = parseInt(row.entity.telefono);
        $scope.contacto.interno = row.entity.interno;
        $scope.contacto.celular = parseInt(row.entity.celular);
        $scope.contacto.correoElectronico = row.entity.correoElectronico;
        $scope.contacto.cppProveedorCliente = {
            idProveedorCliente: $scope.idProveedor
        };
    };

    $scope.cancelarContacto = function () {
        $scope.mostrar.formContacto = false;
    };
    /********************************FIN TAB CONTACTOS*************************************************/


    /********************************ASIGNAR CONCEPTOS*************************************************/
    /*Creado por: Paola Mejia
     *Obtiene los Grupos y conceptos para asignar al Proveedor*/
    var initGrupos = function () {
        var cellTemplate = "<div ng-class='{negrita:item._nodeLevel === 0}'>{{item.descripcion}}</div>";

        cxpService.getTreeConceptosNoAsignados({}, {}, $scope.idProveedor, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("Listado de Grupos y Conceptos NO ASIGNADOS exitoso");
            $scope.conceptosTree = response.data;
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
                disabledLevels: [0],
                enableHeader: true,
                colDefinition: [
                    {field: 'descripcion', displayName: 'Conceptos', treeField: true, cellTemplate: cellTemplate}
                ]
            };
            $scope.hideLoader();
        }, function (responseError) {
            //error
            console.log(responseError);
        });

        $scope.treeConceptosAsignados = {
            collection: $scope.conceptosAsignados,
            childrenField: 'children',
            iconExpanded: 'fa fa-angle-down',
            iconCollapsed: 'fa fa-angle-right',
            onClickRow: $scope.elementSelected,
            collapseElements: true,
            padding: 30,
            contentColor: '#f5f5f5',
            disabledLevels: [0],
            enableHeader: true,
            colDefinition: [
                {
                    field: 'descripcion',
                    displayName: 'Asignar Concepto al Proveedor',
                    treeField: true,
                    cellTemplate: cellTemplate
                }
            ]
        };
    };
    $scope.elementSelected = function (model) {
        if (model) {
            $scope.modelSelected = model;
            console.log("ITEM SELECCIONADO", $scope.modelSelected);
        } else {
            $scope.modelSelected = {};
        }
    };
    /*    $scope.itemSelected = function (modelo) {
     if ( modelo ) {
     $scope.modelSelected2 = modelo;
     console.log("ITEM SELECCIONADO",  $scope.modelSelected2);
     } else {
     $scope.modelSelected2 = {};
     }
     };*/

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
        var toMove = $scope.modelSelected;
        $scope.conceptosTree.push(toMove);
        var indexOf = $scope.conceptosAsignados.indexOf(toMove);
        $scope.conceptosAsignados.splice(indexOf, 1);

    };
    init();

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

    /********************************FIN ASIGNAR CONCEPTOS*************************************************/

    $scope.guardarContacto = function () {
        $scope.mostrar.formContacto = false;
        //$scope.contacto.cppProveedorCliente.idProveedorCliente=$scope.idProveedor;

        console.log("tabproveedorClienteDetalle:Datos para grabar-->", $scope.contacto);
        if ($scope.operacion == 'adiciona') {
            cxpService.adicionaContacto($scope.contacto, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                console.log("tabproveedorClienteDetalle:adicionaProveedorClientePojo-->", respuesta);
                actualizarContactos();
                //$scope.proveedorClientePojo=[];
                //$scope.contactos=[];
            }, function (respuestaDeError) {
                // ERROR
            });
        } else if ($scope.operacion == 'edita') {
            cxpService.editContacto($scope.contacto, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                console.log("tabproveedorClienteDetalle:editarProveedorClientePojo-->", respuesta);
                actualizarContactos();
                //$scope.proveedorClientePojo=[];
                //$scope.contactos=[];
            }, function (respuestaDeError) {
                // ERROR
            });
        }

        $scope.ngGridConfig();
        $scope.contacto = {};
    };
    $scope.guardarProveedorClientePojo = function () {

        $scope.showLoader();
        cxpService.editProveedorClientePojo($scope.proveedorClientePojo, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Los datos se modificarón correctamente.",
                actionButtonText: "Continuar",
                type: 'exito',
                closeAfter: 6000
            });
            $state.transitionTo('panelProveedorCliente', {}, {reload: true});
        }, function (respuestaDeError) {
            // ERROR
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Ocurrió un error.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        });
    };


    $scope.eliminaProveedor = function () {
        $scope.showLoader();
        console.info("CONSOLE ELIMINA OBJETO PRO:",$scope.proveedorClientePojo);
        console.info("CONSOLE ELIMINA OBJETO PRO ID:",$scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente);
        cxpService.verificaSiProveedorClienteNoEstaAsociado({}, {}, $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            console.info("PUEDO ELIMINAR?:",respuesta.data);
            console.info("ID A ELIMINAR :",$scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente);
            $scope.hideLoader();
            if (respuesta.data) {
                var mensaje = "¿Está seguro de eliminar al Proveedor?.";
                $scope.modalMensajeConfirmacionCambioMonedaRetencion(mensaje);
            } else {
                $scope.showCustomModal({
                    headerText: "Mensaje del Sistema",
                    bodyText: "No se puede eliminar el Proveedor, ya que esta relacionado con algún proceso.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            }
        }, function (respuestaDeError) {
            // ERROR
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Existe un error al eliminar el Proveedor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        });

    };


    $scope.modalMensajeConfirmacionCambioMonedaRetencion = function (mensaje) {
        var modalMensajeConfirmacion = modalService.show(
            {
                templateUrl: 'modules/cxp/views/modalMensajeConfirmacionEliminacionProveedor.html',
                controller: 'modalMensajeConfirmacionEliminacionProveedorCtrl',
                size: 'md'
            }, {
                mensaje: mensaje
            }
        ).then(function (respModal) {
                $scope.showLoader();
                if (respModal) {

                    cxpService.deleteProveedorCliente({}, {}, $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente, serverConf.ERPCONTA_WS, function (respuesta) {
                        // EXITO
                        $scope.hideLoader();
                        $scope.showCustomModal({
                            headerText: "Mensaje del Sistema",
                            bodyText: "Los datos se modificarón correctamente.",
                            actionButtonText: "Aceptar",
                            type: 'exito',
                            closeAfter: 6000
                        });
                        $state.transitionTo('panelProveedorCliente', {}, {reload: true});
                    }, function (respuestaDeError) {
                        // ERROR
                        $scope.hideLoader();
                        $scope.showCustomModal({
                            headerText: "Mensaje del Sistema",
                            bodyText: "Ocurrió un error.",
                            actionButtonText: "Aceptar",
                            type: 'error',
                            closeAfter: 6000
                        });
                    });
                }else{
                    $scope.hideLoader();
                }

            });
    };
});

'use strict';

app.controller('conceptoAdicionaCtrl', function ($scope, $state, serverConf, cxpService, $stateParams, $http,
                                                 contabilidadService, conceptoModel, $filter, modalService, tempCache, $timeout) {
    var concepto = new conceptoModel();
    $scope.concepto = concepto.getObject();
    $scope.proveedores = [];

    $scope.activaBotonGuarda = true;
    $scope.activaBotonModifica = false;


    $scope.activaMensajeConfirmado = false;
    $scope.activaMensajeErroneo = false;

    $scope.muestraAlerta = function (valor) {
        $scope.activaMensajeConfirmado = valor;
        $scope.activaMensajeErroneo = !valor;
        $timeout(function () {
            $scope.activaMensajeConfirmado = false;
            $scope.activaMensajeErroneo = false;
        }, 2000);
    };

    $scope.cppConceptoProveedoresPojo = {
        "listaProveedoresClientes": [ ],
        "cppConcepto": {
            "idConcepto": {
                "required": false,
                "type": "number",
                "value": 0
            },
            "descripcion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "cppGrupo": {
                "type": "object",
                "fields": {
                    "idGrupo": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "monto": {
                "required": true,
                "type": "number",
                "value": null
            },
            "parPeriodo": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            }
        }
    };


    $scope.concepto.cppGrupo = {
        idGrupo: $stateParams.idGrupo
    };

    $scope.conceptoData = {
        nroCuenta: '',
        descripcionCuenta: ''
    };


    $scope.listaProveedoresSiAsignados = [];
    function init() {
        console.info("ARBOL:::INITTTTTT");
        $scope.grupoInfo = tempCache.grupoInfo;
        console.info("GRUPO TEMP:::");

        console.info($scope.grupoInfo);

        //$http.get('data/contabilidadJson.json').success(function (response) {
        //    $scope.contaTree = {
        //        children: createTree(response)
        //    }
        //});

        var parametros = {
            "idCppGrupo": tempCache.grupoInfo != null ? tempCache.grupoInfo.idEntidadPojo : null
        };

        cxpService.getGrupoPorId({}, parametros, serverConf.ERPCONTA_WS, function (response) {
            $scope.grupo = response.data;
        });
        cxpService.getListParPeriodo({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listParPeriodo = response.data;
        });
        cxpService.getProveedorClientePorIdConcepto({}, {}, $scope.concepto.idConcepto, "N", serverConf.ERPCONTA_WS, function (response) {
            $scope.listaProveedoresNoAsignados = response.data;
        });
        cxpService.getProveedorClientePorIdConcepto({}, {}, $scope.concepto.idConcepto, "S", serverConf.ERPCONTA_WS, function (response) {
            $scope.listaProveedoresSiAsignados = response.data;
        });
        cxpService.getProveedorClientePorIdConcepto({}, {}, $scope.concepto.idConcepto, "N", serverConf.ERPCONTA_WS, function (response) {
            $scope.listaProveedoresNoAsignados = response.data;
        });

        //contabilidadService.getList({}, {gruponivel: 'PCTA'}, serverConf.ERPCONTA, function (respuesta) {
        //    $scope.contaTree = createTree(respuesta.data);
        //}, function (respuestaDeError) {
        //
        //});

    }

    $scope.seleccionNoAsignados = [];
    $scope.seleccionSiAsignados = [];

    $scope.btnAsigna = '<div align="center">' +
    '<button type="button" height="5" class="btn btn-default" ng-click="asignaProveedor(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Concepto">' +
    '<span class="glyphicon glyphicon-chevron-right"></span>' +
    '</button>' +
    '</div>';


    $scope.gridProveedorNoAsignados = {
        data: 'listaProveedoresNoAsignados',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        selectedItems: $scope.seleccionNoAsignados,
        columnDefs: [
            {
                field: 'descripcion',
                displayName: "Nombre",
                width: '50%',
                headerClass: "header-center",
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'mascara',
                displayName: "Tipo",
                width: '35%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                cellTemplate: $scope.btnAsigna,
                width: '15%',
                enableCellEdit: false
            }
        ]
    };

    $scope.asignaProveedor = function (row) {
        console.info("CONCEPTO A EDITAR:", row.entity);
        $scope.listaProveedoresSiAsignados.push(row.entity);
        var index = row.rowIndex;
        $scope.gridProveedorNoAsignados.selectItem(index, false);
        $scope.listaProveedoresNoAsignados.splice(index, 1);

    };


    $scope.btnQuitarAsignacion = '<div align="center">' +
    '<button type="button" height="5" class="btn btn-default" ng-click="quitarAsignacionProveedor(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Concepto">' +
    '<span class="glyphicon glyphicon-chevron-left"></span>' +
    '</button>' +
    '</div>';


    $scope.gridProveedorSiAsignados = {
        data: 'listaProveedoresSiAsignados',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        selectedItems: $scope.seleccionSiAsignados,
        columnDefs: [
            {
                cellTemplate: $scope.btnQuitarAsignacion,
                width: '15%',
                enableCellEdit: false
            },
            {
                field: 'descripcion',
                displayName: "Nombre",
                width: '50%',
                headerClass: "header-center",
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'mascara',
                displayName: "Tipo",
                width: '35%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }
        ]
    };

    $scope.quitarAsignacionProveedor = function (row) {
        $scope.listaProveedoresNoAsignados.push(row.entity);
        var index = row.rowIndex;
        $scope.gridProveedorSiAsignados.selectItem(index, false);
        $scope.listaProveedoresSiAsignados.splice(index, 1);


    };

    $scope.elementSelectedNoAsignados = function (model) {
        if (model) {
            $scope.modelSelected1 = model;
        } else {
            $scope.modelSelected1 = {};
        }
    };

    $scope.elementSelectedAsignados = function (model) {
        if (model) {
            $scope.modelSelected2 = model;
        } else {
            $scope.modelSelected2 = {};
        }
    };


    var left = [];

    $scope.moveRight = function () {
        console.log("SELECCIONADO-", $scope.modelSelected1);
        left = $scope.modelSelected1;
        if ($scope.listaProveedoresSiAsignados.indexOf(left) < 0) {
            console.info("<<---------------------");
            console.info(left);
            console.info("--------------------->>");
            $scope.listaProveedoresSiAsignados.push(left);

            $scope.indice = $scope.listaProveedoresNoAsignados.indexOf(left);

            if ($scope.indice > -1) {
                $scope.listaProveedoresNoAsignados.splice($scope.indice, 1);
            }
        }
        console.info("LISTA");
        console.info($scope.listaProveedoresSiAsignados);
    };
    $scope.moveLeft = function () {
        var toMove = $scope.modelSelected2;
        //console.log(el);
        $scope.listaProveedoresNoAsignados.push(toMove);
        var indexOf = $scope.conceptosAsignados.indexOf(toMove);
        $scope.conceptosAsignados.splice(indexOf, 1);
    };


    $scope.guardarConcepto = function () {

        $scope.showCustomModal();

        $scope.concepto.cppGrupo.idGrupo = $scope.grupoInfo.idEntidadPojo;

        $scope.showLoader();
        //if (concepto.validate($scope.concepto)) {
        cxpService.adicionarConcepto($scope.concepto, {}, serverConf.ERPCONTA_WS, function () {
            //$state.go('grupos.detalle', {idGrupo: $stateParams.idGrupo});
            $scope.muestraAlerta(true);
            //$state.go('gruposTree.modificaGrupo');
            $scope.hideLoader();
        }, function (error) {
            console.log("error");
            console.log(error);
            $scope.muestraAlerta(false);
            $scope.hideLoader();
        });
        //} else {
        //    // by error
        //}
    };


    $scope.volver = function () {
        $state.go('grupos.detalle', {idGrupo: $stateParams.idGrupo});
    };

    init();


    /*Creado por: Paola Mejia
     * Obtiene el listado de proveedores*/
    cxpService.getProveedores({}, {tipoRegistro: "PROV"}, serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("Listado de Proveedores exitoso");
        $scope.proveedores = response.data;
        console.log($scope.proveedores);
    }, function (responseError) {
        //error
    });


    $scope.guardarModificacionConcepto = function () {
        console.info("ENTRO METODO MODIFICA:::");
    };

    $scope.copiaValorRetencionGrossing = function (valor) {
        console.info("ENTRO METODO COPIA");
        $scope.concepto.parGrossing.codigo = valor;
    };

    $scope.copiaValorGrossingRetencion = function (valor) {
        console.info("ENTRO METODO COPIA");
        $scope.concepto.parRetencion.codigo = valor;
    };

    //$scope.mySelectionsSinAsignar = [];
    //$scope.myDataSinAsignar = [{name: "Moroni", age: 50},
    //    {name: "Tiancum", age: 43},
    //    {name: "Jacob", age: 27},
    //    {name: "Nephi", age: 29},
    //    {name: "Enos", age: 34}];
    $scope.gridOptionsSinAsignar = {
        data: 'listaProveedoresNoAsignados',
        selectedItems: $scope.mySelectionsSinAsignar,
        multiSelect: false,
        columnDefs: [{field: 'descripcion', displayName: 'Proveedor Sin Asignar'}]
    };
    //
    //$scope.mySelectionsAsignados = [];
    //$scope.myDataAsignados = [{name: "Moroni", age: 50},
    //    {name: "Henrry", age: 43},
    //    {name: "Jonas", age: 27},
    //    {name: "Juan", age: 29},
    //    {name: "Bap", age: 34}];
    $scope.gridOptionsAsignados = {
        data: 'listaProveedoresSiAsignados',
        selectedItems: $scope.mySelectionsAsignados,
        multiSelect: false,
        columnDefs: [{field: 'descripcion', displayName: 'Proveedor Asignados'}]
    };

    function clean() {
        var conceptos = [];
        for (var j = 0; j < $scope.listaProveedoresSiAsignados.length; j++) {
            conceptos[j] = {
                idEntidadPojo: $scope.listaProveedoresSiAsignados[j].idEntidadPojo

            };
            conceptos[j]['children'] = [];
            for (var k = 0; k < $scope.listaProveedoresSiAsignados[j]['children'].length; k++) {
                conceptos[j]['children'][k] = {
                    idEntidadPojo: $scope.listaProveedoresSiAsignados[j]['children'][k].idEntidadPojo
                }

            }
        }
        return conceptos;
    }


    $scope.adicionarConceptoConAsignacionProveedor = function () {

        $scope.showLoader();
        $scope.cppConceptoProveedoresPojo.listaProveedoresClientes = $scope.listaProveedoresSiAsignados;
        $scope.concepto.cppGrupo.idGrupo = $scope.grupoInfo.idEntidadPojo;
        $scope.cppConceptoProveedoresPojo.cppConcepto = $scope.concepto;




        if (concepto.validate($scope.concepto)) {
            cxpService.adicionarConceptoConAsignacionProveedor($scope.cppConceptoProveedoresPojo, {}, serverConf.ERPCONTA_WS, function () {
                //$state.go('grupos.detalle', {idGrupo: $stateParams.idGrupo});
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Confirmacion",
                    bodyText: "Correcto message",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 4000
                });
                //$state.go('templateGrupo.modificaGrupo');
                $state.transitionTo('templateGrupo.empty', {}, {reload: true});
            }, function (error) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Se produjo un error al registrar el concepto",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 4000
                });
            });
        } else {
            // by error
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Error Modal",
                bodyText: "Error validacion de campos vacios o incorrectos",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 4000
            });
        }
    };


    $scope.abrirModal = function () {
        var modalDefaults = {
            controller: 'modal1'
        };

        var modalOptions = {
            headerText: 'Plan de cuentas',
            tree: $scope.contaTree
        };

        $scope.abrirTreeModal(modalDefaults, modalOptions, function (respuesta) {
            $scope.concepto.idCntEntidad = respuesta.idEntidad;
            $scope.conceptoData = {
                nroCuenta: respuesta.mascaraGenerada,
                descripcionCuenta: respuesta.descripcion
            };
        });
    };


    $scope.volverGrupo = function () {
        //$state.go('templateGrupo.adicion');
        console.info("ID:", $scope.grupo.idGrupo);
        //tempCache.grupoInfo = $scope.grupo.idGrupo;
        tempCache.idGrupo=$scope.grupo.idGrupo;
        $state.transitionTo('templateGrupo.modifica', {idEntidadPojo: $scope.grupo.idGrupo});

        //$state.transitionTo('servicioTemplate.modifica', {idEntidadPojo: model.idEntidadPojo});


    };
});

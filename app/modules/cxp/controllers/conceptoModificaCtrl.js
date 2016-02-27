'use strict';

app.controller('conceptoModificaCtrl', function ($scope, $state, serverConf, cxpService, $stateParams, $http,
                                                 contabilidadService, conceptoModel, $filter, modalService, tempCache, $timeout) {
    var concepto = new conceptoModel();
    //$scope.concepto = concepto.getObject();
    $scope.proveedores = [];

    $scope.activaBotonGuarda = false;
    $scope.activaBotonModifica = true;

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

    function init() {

        var parametros = {
            "idCppConcepto": tempCache.idConceptoCache
        };

        cxpService.getConcepto({}, parametros, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.concepto = response.data;

            console.info("OBJETO CONCEPTO:",$scope.concepto);
            $scope.grupo = $scope.concepto.cppGrupo;
            //cxpService.getCuentaPorID({}, {}, $scope.concepto.idCntEntidad, serverConf.ERPCONTA_WS, function (response) {
            //    $scope.cntEntidad = response.data;
            //});

            cxpService.getProveedorClientePorIdConcepto({}, {}, $scope.concepto.idConcepto, "N", serverConf.ERPCONTA_WS, function (response) {
                $scope.listaProveedoresNoAsignados = response.data;

                console.info("OBJETO CONCEPTO LISTA 1:",$scope.listaProveedoresNoAsignados);


                //$scope.treeConfigNoAsignados = {
                //    collection: $scope.listaProveedoresNoAsignados,
                //    childrenField: 'children',
                //    iconExpanded: 'fa fa-angle-down',
                //    iconCollapsed: 'fa fa-angle-right',
                //    onClickRow: $scope.elementSelectedNoAsignados,
                //    collapseElements: true,
                //    selectByDefault: {
                //        triggerClick: true,
                //        firstByDefault: true
                //    },
                //    padding: 30,
                //    enableHeader: true,
                //    colDefinition: [
                //        {field: 'descripcion', displayName: 'Proveedores Sin Asignar', treeField: true}
                //    ]
                //};
            }, function (responseError) {
                //error
            });

            cxpService.getProveedorClientePorIdConcepto({}, {}, $scope.concepto.idConcepto, "S", serverConf.ERPCONTA_WS, function (response) {
                $scope.listaProveedoresSiAsignados = response.data;

                console.info("OBJETO CONCEPTO LISTA 2:",$scope.listaProveedoresSiAsignados);

                //$scope.treeConfigAsignados = {
                //    collection: $scope.listaProveedoresSiAsignados,
                //    childrenField: 'children',
                //    iconExpanded: 'fa fa-angle-down',
                //    iconCollapsed: 'fa fa-angle-right',
                //    onClickRow: $scope.elementSelectedAsignados,
                //    collapseElements: true,
                //    selectByDefault: {
                //        triggerClick: true,
                //        firstByDefault: true
                //    },
                //    padding: 30,
                //    enableHeader: true,
                //    colDefinition: [
                //        {field: 'descripcion', displayName: 'Proveedores Asignados', treeField: true}
                //    ]
                //};
                //$scope.hideLoader();
            }, function (responseError) {
                //error
            });

        }, function (responseError) {
            //error
        });

        //$scope.gridProveedorNoAsignados = {
        //    data : 'listaProveedoresNoAsignados',
        //    enableRowSelection: true,
        //    enableCellSelection:false,
        //    enableColumnResize: true,
        //    headerRowHeight:40,
        //    rowHeight:40,
        //    multiSelect: false,
        //    columnDefs : [
        //        {
        //            field: 'descripcion',
        //            displayName: "Nombre",
        //            width: '50%',
        //            headerClass: "header-center",
        //            cellClass: "text-left",
        //            sortable: true
        //        },
        //        {
        //            field: 'mascara',
        //            displayName: 'Tipo',
        //            width: '50%',
        //            headerClass: "header-center",
        //            cellClass: "text-left",
        //            sortable: true
        //        }
        //    ]
        //};

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

            console.info("CONCEPTO A EDITAR:", row.entity);
            $scope.listaProveedoresNoAsignados.push(row.entity);
            var index = row.rowIndex;
            $scope.gridProveedorSiAsignados.selectItem(index, false);
            $scope.listaProveedoresSiAsignados.splice(index, 1);


        };


        $http.get('data/contabilidadJson.json').success(function (response) {
            $scope.contaTree = {
                children: createTree(response)
            };
        });

        cxpService.getListParTipoDocumentoMercantil({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listParTipoDocumentoMercantil = response.data;
        });
        cxpService.getListParPeriodo({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listParPeriodo = response.data;
        });
        cxpService.getListParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listParTipoMoneda = response.data;
        });
        cxpService.getListParTipoRetencion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listParTipoRetencion = response.data;
        });


    }

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
        //console.log("SELECCIONADO-", $scope.modelSelected1);
        //left = $scope.modelSelected1;
        //if ($scope.listaProveedoresSiAsignados.indexOf(left) < 0) {
        //    console.info(left);
        //    $scope.listaProveedoresSiAsignados.push(left);
        //    $scope.indice = $scope.listaProveedoresNoAsignados.indexOf(left);
        //    if ($scope.indice > -1) {
        //        $scope.listaProveedoresNoAsignados.splice($scope.indice, 1);
        //    }
        //}

        if (typeof $scope.seleccionNoAsignados[0] != "undefined") {

            console.info("ELEMENTO:", $scope.seleccionNoAsignados[0]);
            $scope.listaProveedoresSiAsignados.push($scope.seleccionNoAsignados[0]);

            //$scope.gridProveedorNoAsignados.selectItem(index, false);
            //$scope.listaProveedoresNoAsignados.splice(index, 1);
            $scope.listaProveedoresNoAsignados.remove($scope.seleccionNoAsignados[0]);

        } else {
            console.info("SELECIONJE UN ELEMENTO");


        }
    };
    $scope.moveLeft = function () {
        var toMove = $scope.modelSelected2;
        $scope.listaProveedoresNoAsignados.push(toMove);
        var indexOf = $scope.listaProveedoresSiAsignados.indexOf(toMove);
        $scope.listaProveedoresSiAsignados.splice(indexOf, 1);
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

    $scope.volver = function () {
        $state.go('grupos.detalle', {idGrupo: $stateParams.idGrupo});
    };

    init();


    /*Creado por: Paola Mejia
     * Obtiene el listado de proveedores*/
    cxpService.getProveedores({}, {tipoRegistro: "PROV"}, serverConf.ERPCONTA_WS, function (response) {
        //exito
        $scope.proveedores = response.data;
    }, function (responseError) {
        //error
    });


    $scope.volverGrupo = function () {
        //$state.go('templateGrupo.adicion');
        console.info("ID:", $scope.concepto.cppGrupo.idGrupo);
        tempCache.grupoInfo.idEntidadPojo = $scope.concepto.cppGrupo.idGrupo;
        $state.transitionTo('templateGrupo.modifica', {idEntidadPojo: $scope.concepto.cppGrupo.idGrupo});
    };

    $scope.modificaConcepto = function () {
        console.info("CONCEPTO A MODIFICAR::::");
        console.info($scope.concepto);
        $scope.showLoader();
        cxpService.editConcepto($scope.concepto, {}, serverConf.ERPCONTA_WS, function (response) {
            //OK
            console.info("OK");
            //$state.go('gruposTree.adicion');
            $scope.muestraAlerta(true);
            $scope.hideLoader();
        }, function (respuestaDeError) {
            // ERROR
            console.info("ERROR");
            $scope.muestraAlerta(false);
            $scope.hideLoader();
        });
    };
});

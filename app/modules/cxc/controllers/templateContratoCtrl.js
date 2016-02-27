/**
 * Created by Renan on 21/04/2015.
 */

'use strict';

app.controller('templateContratoCtrl', function ($scope, $state, cxcService, serverConf, modalService, tempCache) {

    $scope.contratosCliente = [];

    $scope.registroNuevoCliente = function () {
        $state.go('panelCliente.nuevo');
    };

    var filterBarPlugin = {
        init: function (scope, grid) {
            filterBarPlugin.scope = scope;
            filterBarPlugin.grid = grid;
            $scope.$watch(function () {
                var searchQuery = "";
                angular.forEach(filterBarPlugin.scope.columns, function (col) {
                    if (col.visible && col.filterText) {
                        var filterText = (col.filterText.indexOf('*') == 0 ? col.filterText.replace('*', '') : "^" + col.filterText) + ";";
                        searchQuery += col.displayName + ": " + filterText;
                    }
                });
                return searchQuery;
            }, function (searchQuery) {
                filterBarPlugin.scope.$parent.filterText = searchQuery;
                filterBarPlugin.grid.searchProvider.evalFilter();
            });
        },
        scope: undefined,
        grid: undefined
    };

    $scope.onRowSelected = function (row) {
        var model = row.entity;

        if (model) {
            $scope.modelSelected = model;
            console.info("objeto 1:", model);
            console.info("objeto id 1:", $scope.modelSelected.idEntidadPojo);
            $state.transitionTo('contratoTemplate.modifica', {idContrato: $scope.modelSelected.idEntidadPojo});
        }
    };

    $scope.myHeaderCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
    '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>' +
    '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
    '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
    '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
    '</div>' +
    '<input type="text" class="form-control" ng-click="stopClickProp($event)" placeholder="Buscar ..." ng-model="col.filterText" ng-style="{ \'width\' : col.width - 14 + \'px\' }" style="position: absolute; top: 30px; bottom: 30px; left: 5px; right:5px;"/>' +
    '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

    var cellTemplate = '<div  ng-click="onRowSelected(row)" ng-bind="row.getProperty(col.field)"></div>';

    $scope.mySelections = [];

    $scope.gridConfig = {
        data: 'contratosCliente.tree',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        headerRowHeight: 66,
        rowHeight: 40,
        selectedItems:$scope.mySelections,
        //afterSelectionChange: onRowSelected,
        plugins: [filterBarPlugin],
        multiSelect: false,
        columnDefs: [
            {
                field: 'tipo',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: "OC",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: cellTemplate,
                sortable: true
            },
            {
                field: 'mascara',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'N° Contrato',
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: cellTemplate,
                sortable: true
            },
            {
                field: 'descripcion',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'Cliente',
                width: '40%',
                headerClass: "header-center",
                cellClass: "text-left",
                cellTemplate: cellTemplate,
                sortable: true
            }
        ]
    };

    $scope.$watch(function () { return $scope.mySelections[0] }, function(mySelections) {
        if ( mySelections ) {
            $scope.showLoader();
            $state.transitionTo('contratoTemplate.modifica', {idContrato: mySelections.idEntidadPojo});
        }
    }, true);

    var init = function () {
        $scope.showLoader();
        cxcService.actualizaPagosContratoEnMora({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
        }, function (responseError) {
            //error
        });


        var once = true;
        $scope.$on('ngGridEventData', function () {
            if (once) {
                $scope.gridConfig.selectRow(0, true);
                once = false;
            }
        });

        /*Creado por: Paola Mejia
         * Descripcion: Obtiene el listado de Contratos por Cliente y se establece en el listado del arbol*/
        cxcService.getContratoArbolFiltro({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("menuContratoCliente: Contratos por Cliente", response.data);
            $scope.contratosCliente.tree = response.data;

            if ($scope.contratosCliente && $scope.contratosCliente.tree.length > 0) {
                $scope.contratosCliente.elementSelected($scope.contratosCliente.tree[0]);
            }
            $scope.hideLoader();
        }, function (responseError) {
            //error
            console.log(responseError);
            $scope.hideLoader();
        });
    };

    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el elemento seleccionado del arbol de clientes y envia el id del Cliente/Cliente y Proveedor*/
    $scope.contratosCliente.elementSelected = function (model) {
        console.log("menuContratoCliente: Contrato seleccionado=>", model);
        if (model) {
            $scope.showLoader();
            console.info("objeto:", model);
            $scope.modelSelected = model;
            console.info("objeto id:", $scope.modelSelected.idEntidadPojo);
            $state.transitionTo('contratoTemplate.modifica', {idContrato: $scope.modelSelected.idEntidadPojo});
        }
    };

    $scope.addContrato = function () {
        //$scope.treeContratoConfig.controls.selectByKeyAndValue(null,null);
        $state.go('contratoTemplate.adiciona');
    };

    $scope.validaListaActividadEconomica = false;
    $scope.validaListaClientes = false;
    $scope.validaListaServicioBienes = false;
    function validar() {
        $scope.actualizaListaCliente(function (resultado) {
            $scope.validaListaClientes = resultado;
            $scope.actualizaListaServiciosBienes(function (resultado) {
                $scope.validaListaServicioBienes = resultado;
                $scope.actualizaListaActividadesEconomicasWithDosificacion(function (resultado) {
                    $scope.validaListaActividadEconomica = resultado;

                    console.info("VALOR 1", $scope.validaListaActividadEconomica);
                    console.info("VALOR 2", $scope.validaListaClientes);
                    console.info("VALOR 3", $scope.validaListaServicioBienes);
                    if ($scope.validaListaClientes || $scope.validaListaServicioBienes || $scope.validaListaActividadEconomica) {
                        modal();
                    } else {
                        init();
                    }
                });
            });
        });
    }

    function modal() {
        tempCache.validaListaActividadEconomica = $scope.validaListaActividadEconomica;
        tempCache.validaListaClientes = $scope.validaListaClientes;
        tempCache.validaListaServicioBienes = $scope.validaListaServicioBienes;
        modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalValidaIngresoContratos.html',
                controller: 'modalValidaIngresoContratosCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                $state.go('paginaInicialMenu');

            });
    }

    $scope.actualizaListaActividadesEconomicasWithDosificacion = function (funcion) {
        cxcService.getActividadesEconomicasWithDosificacion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("LENG AE:", response.data.length);
            funcion(response.data.length == 0);
        }, function (responseError) {
            //error
            funcion(false);
        });
    };

    $scope.actualizaListaServiciosBienes = function (funcion) {
        cxcService.getCpcItemList({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            console.info("LENG BS:", respuesta.data.length);
            funcion(respuesta.data.length == 0);
        }, function (responseError) {
            //error
            funcion(false);
        });
    };


    $scope.actualizaListaCliente = function (funcion) {
        cxcService.getListaClientes({}, {}, "CLI", serverConf.ERPCONTA_WS, function (response) {
            $scope.listclientes = response.data;
            funcion($scope.listclientes.length == 0);
            /*$scope.listclientes = response.data;
            if ($scope.listclientes) {
                $scope.clientes = $scope.listclientes;
                /!*cxcService.getListaClientes({}, {}, "AMB", serverConf.ERPCONTA_WS, function (respuesta) {
                    $scope.clientes = $scope.listclientes.concat(respuesta.data);
                    console.info("LENG CLI:", $scope.clientes.length);
                    funcion($scope.clientes.length == 0);
                });*!/
                funcion($scope.clientes.length == 0);
            }*/
        }, function (responseError) {
            //error
            funcion(false);
        });
    };


    validar();

    //$scope.listaCppProveedorClientePorTipoRegistro();
});

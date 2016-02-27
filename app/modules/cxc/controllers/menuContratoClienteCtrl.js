/**
 * Created by paola on 06-05-15.
 */

'use strict';

app.controller('menuContratoClienteCtrl', function ($scope, $state, cxcService, serverConf, $timeout) {

    $scope.contratosCliente=[];

    $scope.registroNuevoCliente = function () {
        $state.go('panelCliente.nuevo');
    };

    var filterBarPlugin = {
        init: function(scope, grid) {
            filterBarPlugin.scope = scope;
            filterBarPlugin.grid = grid;
            $scope.$watch(function() {
                var searchQuery = "";
                angular.forEach(filterBarPlugin.scope.columns, function(col) {
                    if (col.visible && col.filterText) {
                        var filterText = (col.filterText.indexOf('*') == 0 ? col.filterText.replace('*', '') : "^" + col.filterText) + ";";
                        searchQuery += col.displayName + ": " + filterText;
                    }
                });
                return searchQuery;
            }, function(searchQuery) {
                filterBarPlugin.scope.$parent.filterText = searchQuery;
                filterBarPlugin.grid.searchProvider.evalFilter();
            });
        },
        scope: undefined,
        grid: undefined
    };

    $scope.onRowSelected = function (row) {
        var model = row.entity;

        if ( model ) {
            $scope.modelSelected = model;
            $state.transitionTo('panelCobrosPorFacturar.detalle', {'idEntidadPojo':$scope.modelSelected.idEntidadPojo});
        }
    };

    var init=function(){

        $scope.myHeaderCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">'+
          '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>'+
          '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'+
          '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'+
          '<div class="ngSortPriority">{{col.sortPriority}}</div>'+
          '</div>'+
          '<input type="text" class="form-control" ng-click="stopClickProp($event)" placeholder="Buscar ..." ng-model="col.filterText" ng-style="{ \'width\' : col.width - 14 + \'px\' }" style="position: absolute; top: 30px; bottom: 30px; left: 5px; right:5px;"/>' +
          '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

        var cellTemplate = '<div  ng-click="onRowSelected(row)" ng-bind="row.getProperty(col.field)"></div>'

        $scope.gridConfig = {
            data : 'contratosCliente.tree',
            enableRowSelection: true,
            enableCellSelection:false,
            enableColumnResize: true,
            headerRowHeight:66,
            rowHeight:40,
            plugins: [filterBarPlugin],
            multiSelect: false,
            columnDefs : [
                {
                    field: 'mascara',
                    headerCellTemplate: $scope.myHeaderCellTemplate,
                    displayName: "OC",
                    width: '30%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate: cellTemplate,
                    sortable: true
                },
                {
                    field: 'descripcion',
                    headerCellTemplate: $scope.myHeaderCellTemplate,
                    displayName: 'N° Contrato',
                    width: '30%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate: cellTemplate,
                    sortable: true
                },
                {
                    field: 'tipo',
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

        var once = true;
        function byDefault() {
            if( once ) {
                $scope.gridConfig.selectRow(0, true);
                once = false;
            }
        }

        $scope.showLoader();
        /*Creado por: Paola Mejia
         * Descripcion: Obtiene el listado de Contratos por Cliente y se establece en el listado del arbol*/
        cxcService.getTreeContratoCliente({},{},serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("menuContratoCliente: Contratos por Cliente",response.data);
            $scope.contratosCliente.tree = response.data;

            if ( $scope.contratosCliente && $scope.contratosCliente.tree.length > 0 ) {
                $scope.contratosCliente.elementSelected($scope.contratosCliente.tree[0]);
            }
            $scope.hideLoader();
            $timeout(function() {
                byDefault();
            }, 1);

        }, function (responseError) {
            //error
            $scope.hideLoader();
        });
    };

    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el elemento seleccionado del arbol de clientes y envia el id del Cliente/Cliente y Proveedor*/
    $scope.contratosCliente.elementSelected = function (model) {
        console.log("menuContratoCliente: Contrato seleccionado=>",model);
        if(model)
        {
            $scope.modelSelected = model;
            $state.transitionTo('panelCobrosPorFacturar.detalle', {'idEntidadPojo':$scope.modelSelected.idEntidadPojo});
        }
    };
    init();
    //$scope.listaCppProveedorClientePorTipoRegistro();
});




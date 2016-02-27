/**
 * Created by paola on 27-06-15.
 */
'use strict';

app.controller('menuFacturasCtrl', function ($scope, $state, cxcService, serverConf, $timeout) {

    $scope.listadoFacturas=[];
    $scope.mySelections = [];
    $scope.registroNuevoCliente = function () {
        //$scope.treeConfig.controls.selectByKeyAndValue(null,null);
        $state.go('panelCliente.nuevo');
    };

    function onRowSelected (data) {

    }

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
    $scope.myHeaderCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">'+
    '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>'+
    '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'+
    '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'+
    '<div class="ngSortPriority">{{col.sortPriority}}</div>'+
    '</div>'+
    '<input type="text" class="form-control" ng-click="stopClickProp($event)"ng-model="col.filterText" ng-style="{ \'width\' : col.width - 10 + \'px\' }" style="position: absolute; top: 30px; bottom: 30px; left: 5px; right:5px;"/>' +
    '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

    $scope.gridOptions = {
        data: 'listadoFacturas',
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        enableColumnResize: true,
        multiSelect:false,
        selectedItems:$scope.mySelections,
        afterSelectionChange: onRowSelected,
        headerRowHeight:66,
        plugins: [filterBarPlugin],
        columnDefs: [
            {
                field: 'fechaFactura',
                displayName: "Fecha",
                width: '30%',
                enableCellEdit:  false,
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass:'text-center'
            },
            {
                field: 'numeroFactura',
                displayName: "N° Factura",
                headerCellTemplate: $scope.myHeaderCellTemplate,
                width: '40%',
                enableCellSelection: true,
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'parEstadoFactura.descripcion',
                displayName: "Estado",
                headerCellTemplate: $scope.myHeaderCellTemplate,
                width: '30%',
                enableCellSelection: true,
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: "text-left"
            }
        ]
    };

    var once = true;
    function selectFirstsByDefault() {
        if( once ) {
            $scope.gridOptions.selectRow(0, true);
            once = false;
        }
    }
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el listado de Clientes y Proveedores y Clientes*/
    $scope.listaFacturas = function () {

        cxcService.getListaFacturas({}, {},serverConf.ERPCONTA_WS, function (response) {
            // EXITO
            $scope.listadoFacturas = response.data;
            console.log("LISTADO DE FACTURAS",$scope.listadoFacturas);
            $timeout(function(){
                selectFirstsByDefault();
            }, 1);

                $scope.hideLoader();

        });
    };

    $scope.$watch(function () { return $scope.mySelections[0] }, function(mySelections){
        console.log("Seleccionado del menu",mySelections);
        if ( mySelections ) {
            $state.go("panelFacturas.consulta",{idFacturaEmitida:mySelections.idFactura});
        }
    }, true);
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el elemento seleccionado del arbol de clientes y envia el id del Cliente/Cliente y Proveedor*/
/*    $scope.listaClientesProveedores.elementSelected = function (model) {
        console.log("menuCliente: Cliente seleccionado=>",model);
        if(model)
        {
            $scope.modelSelected = model;
            $state.transitionTo('panelCliente.editar', {'idEntidadPojo':$scope.modelSelected.idEntidadPojo});
        }

    };*/

    $scope.listaFacturas();
});

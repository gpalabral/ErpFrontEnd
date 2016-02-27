/**
 * Created by paola on 17-09-15.
 */

'use strict';

app.controller('buscadorProveedoresCtrl', function  ($scope,$rootScope,tempCache,cxpService,serverConf,$modalInstance, modalOptions,$state) {
    $scope.modalOptions = modalOptions;
    $scope.mySelections = [];
    $scope.proveedorSeleccionado = false;

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


    function obtenerProveedores(){
        cxpService.getListaProveedores({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.listaProveedores = respuesta.data;
            console.log("LISTA PROVEEDORES", $scope.listaProveedores);
        });
    };
    function grillaProveedores(){

        $scope.myHeaderCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">'+
        '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>'+
        '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'+
        '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'+
        '<div class="ngSortPriority">{{col.sortPriority}}</div>'+
        '</div>'+
        '<input type="text" class="form-control" ng-click="stopClickProp($event)" placeholder="Buscar ..." ng-model="col.filterText" ng-style="{ \'width\' : col.width - 14 + \'px\' }" style="position: absolute; top: 30px; bottom: 30px; left: 5px; right:5px;"/>' +
        '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

        var cellTemplate = '<div  ng-click="onRowSelected(row)" ng-bind="row.getProperty(col.field)"></div>'

        $scope.gridOptions = {
            data: 'listaProveedores',
            enableRowSelection: true,
            enableColumnResize: true,
            enableCellSelection:false,
            headerRowHeight:70,
            multiSelect: false,
            plugins: [filterBarPlugin],
            selectedItems:$scope.mySelections,
            enableSorting:true,
            columnDefs: [
                {
                    field: 'nombreCompleto',
                    displayName: "Nombre/Razón Social",
                    headerCellTemplate: $scope.myHeaderCellTemplate,
                    width: '65%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass:'text-left',
                    cellTemplate: cellTemplate,
                    sortable: true
                },
                {
                    field: "nitCi",
                    displayName: "NIT/CI",
                    headerCellTemplate: $scope.myHeaderCellTemplate,
                    width: '35%',
                    headerClass: "header-center",
                    cellClass: "text-left",
                    cellTemplate: cellTemplate,
                    sortable: true
                }
            ]
        };
    };

    function init () {
        grillaProveedores();
        obtenerProveedores();

    };

    $scope.cancelar=function(){
        $modalInstance.dismiss('cancel');
    };
    $scope.seleccionar=function(){
        if($scope.mySelections[0].idProveedorCliente) {
            $modalInstance.close($scope.mySelections[0]);
            //$state.go('registroFactura');
        }
        console.log($scope.mySelections[0].idProveedorCliente);

    };
    $scope.$watch(function(){
        return $scope.mySelections ? $scope.mySelections.length : 0;
    }, function(itemSelected){
        $scope.proveedorSeleccionado = itemSelected > 0;
    });


    init();


});
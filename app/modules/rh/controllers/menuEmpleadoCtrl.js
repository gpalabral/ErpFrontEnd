/**
 * Created by paola on 07-10-15.
 */

'use strict';

app.controller('menuEmpleadoCtrl', function ($scope, $state, rhServices, serverConf, $timeout,localStorageService) {

    $scope.empleado = [];

    $scope.periodoGestion = localStorageService.get('periodoGestionObjeto');

    $scope.registroNuevoEmpleado = function () {
        $state.go('panelEmpleado.nuevo');
    };

    var init = function () {
        //rhServices.listaRhEmpleado({}, {}, serverConf.ERPCONTA_WS, function (response) {
        rhServices.listaRhEmpleadoPorPeriodo({}, {},$scope.periodoGestion.idPeriodoGestion, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.empleado.tree = response.data;
            if ($scope.empleado && $scope.empleado.tree.length > 0) {
                $scope.empleado.elementSelected($scope.empleado.tree[0]);
            }
            $scope.hideLoader();
            $timeout(function () {
                byDefault();
            }, 100);
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });
    }


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


    $scope.myHeaderCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
    '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>' +
    '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
    '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
    '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
    '</div>' +
    '<input type="text" class="form-control" ng-click="stopClickProp($event)" placeholder="Buscar ..." ng-model="col.filterText" ng-style="{ \'width\' : col.width - 14 + \'px\' }" style="position: absolute; top: 30px; bottom: 30px; left: 5px; right:5px;"/>' +
    '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

    var cellTemplate = '<div  ng-click="onRowSelected(row)" ng-bind="row.getProperty(col.field)"></div>'
    $scope.mySelections = [];

    $scope.gridConfig = {
        data: 'empleado.tree',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        headerRowHeight: 66,
        rowHeight: 40,
        plugins: [filterBarPlugin],
        multiSelect: false,
        columnDefs: [
            {
                field: 'codigo',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: "Codigo",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: cellTemplate,
                sortable: true
            },
            {
                field: 'numeroDocumento',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'N° Documento',
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: cellTemplate,
                sortable: true
            },
            {
                field: 'nombreCompleto',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'Empleado',
                width: '40%',
                headerClass: "header-center",
                cellClass: "text-left",
                cellTemplate: cellTemplate,
                sortable: true
            }
        ]
    };

    $scope.onRowSelected = function (row) {
        var model = row.entity;

        if (model) {
            $scope.modelSelected = model;
            $state.transitionTo('panelEmpleado.edita', {idEmpleado: $scope.modelSelected.idEmpleado});
        }
    };

    $scope.empleado.elementSelected = function (model) {
        console.log("menuContratoCliente: Contrato seleccionado=>", model);
        if (model) {
            console.info("OBJETO SELECT:", model.idEmpleado);
            $scope.modelSelected = model;
            $state.transitionTo('panelEmpleado.edita', {idEmpleado: $scope.modelSelected.idEmpleado});
        }
    };

    var once = true;

    function byDefault() {
        if (once) {
            $scope.gridConfig.selectRow(0, true);
            once = false;
        }
    }

    init();
});




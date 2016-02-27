/**
 * Created by paola on 22-04-15.
 */
'use strict';

app.controller('conciliacionCtrl', function ($scope, $state, cxcService, cxpService, serverConf, commonMethods, $filter) {
    $scope.muestraBotonGuardaReferenciacion = false;
    $scope.conciliacionPojoLista = [];
    $scope.activaBotonReferenciacionAutomatica = true;

    $scope.nombreArchivoUno = "";
    $scope.nombreArchivoDos = "";
    function init() {
        $scope.activaBotonReferenciacionAutomatica = true;
        $scope.muestraBotonGuardaReferenciacion = $scope.conciliacionPojoLista.length > 0;
        grillaConciliacion();
    }

    function grillaConciliacion() {


        var rowTemplate = '<div style="height: 100%" ng-class="{red: (row.getProperty(\'conciliado\') == \'A\'), yellow: (row.getProperty(\'conciliado\') == \'M\' )}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>';

        $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

        $scope.gridConciliacion = {
            data: 'conciliacionPojoLista',
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            enableColumnResize: true,
            footerRowHeight: 66,
            headerRowHeight: 45,
            rowTemplate: rowTemplate,
            columnDefs: [
                {
                    field: 'numero',
                    displayName: "Número",
                    width: '6%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: 'text-right'
                },
                {
                    field: 'fechaFactura',
                    displayName: "Fecha Factura",
                    width: '6%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellFilter: 'date:\'dd/MM/yyyy\'',
                    cellClass: 'text-right'
                },
                {
                    field: 'numeroDeFactura',
                    displayName: "N° de Factura",
                    width: '10%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: 'text-right'
                },
                {
                    field: 'nroFacturaInterno',
                    displayName: "N° Factura Interno",
                    width: '10%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: 'text-right'
                },
                {
                    field: 'debitoFiscal',
                    displayName: "Débito Fiscal",
                    width: '10%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: 'text-right',
                    cellTemplate: $scope.currencyTemplate
                },
                {
                    field: "batchNameDebitoFiscal",
                    displayName: "Batch Name Débito Fiscal",
                    width: '20%',
                    enableCellSelection: false,
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellEditableCondition: "row.getProperty(\'conciliado\') != 'A'",
                    cellTemplate: '<input ng-class="{red: (row.getProperty(\'conciliado\') == \'A\'), yellow: (row.getProperty(\'conciliado\') == \'M\' )}" type="text" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="disabledCampoBatchName(row)"/>'
                },
                {
                    field: "entryItem",
                    displayName: "Entry Item",
                    width: '6%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "credits",
                    displayName: "Credits",
                    width: '6%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "salesContractNo",
                    displayName: "Sales Contract No",
                    width: '6%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "cuentaContable",
                    displayName: "Cuenta Contable",
                    width: '10%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellEditableCondition: "row.getProperty(\'conciliado\') != 'A'",
                    cellTemplate: '<input ng-class="{red: (row.getProperty(\'conciliado\') == \'A\'), yellow: (row.getProperty(\'conciliado\') == \'M\' )}" type="text" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="disabledCampoBatchName(row)"/>'
                },
                {
                    field: "conciliado",
                    displayName: "Referenciado",
                    width: '10%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-left",
                    cellTemplate: '<div>{{row.entity[col.field]=="A"?"AUTOMATICO":row.entity[col.field]=="M"?"MANUAL":"NO REFERENCIADO"}}</div>'
                }
            ]
        };
    }

    $scope.disabledCampoBatchName = function (row) {
        console.info("row.entity.parEstadoPago.codigo:", row.entity);
        var valor = false;
        switch (row.entity.conciliado) {
            case 'A' : // PAGADOS
                valor = true;
                break;
            default :
                valor = false;
                break;
        }
        return valor;
    };

    $scope.disabledCampoBatchNameIngresos = function (row) {
        console.info("VALOR BAP:", row.entity.batchNameIngresos );
        var valor = false;
        switch (row.entity.conciliado) {
            case 'A' : // PAGADOS
                valor = row.entity.batchNameIngresos != undefined ? true : false;
                break;
            default :
                valor = false;
                break;
        }
        return valor;
    };


    $scope.$on('ngGridEventEndCellEdit', function (event) {
            var columnaSeleccionada = event.targetScope.col.field;
            var datosFila = event.targetScope.row.entity;
            switch (event.targetScope.gridId) {
                case $scope.gridConciliacion.$gridScope.gridId:
                    switch (columnaSeleccionada) {
                        case 'batchNameDebitoFiscal':
                            if (datosFila.conciliado != 'A') {
                                if (datosFila.batchNameDebitoFiscal) {
                                    datosFila.conciliado = "M";
                                } else {
                                    datosFila.conciliado = "N";
                                }
                            }
                            break;
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    break;
            }
        }
    );


    $scope.editableColumnasBatchName = function () {

        for (var i = 0; i < $scope.gridConciliacion.$gridScope.columns.length; i++) {
            var column = $scope.gridConciliacion.$gridScope.columns[i];
            console.info("VALOR:", column.enableCellEdit = $scope.gridConciliacion.$gridScope.columns[i]);
            switch (column.field) {
                case "batchNameDebitoFiscal":
                    //column.enableCellEdit = $scope.gridConciliacion.$gridScope.columns[i].value;
                    break;
                default:
                    break;
            }
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.cancelarConciliacion = function () {
        $state.go('dosificacionEmisionFactura');
    };

    $scope.importarXLS = function (files) {
        if (files && files.length) {
            $scope.myData = [];
            cxcService.conciliacionExcelImport(files[files.length - 1], 'xls', serverConf.ERPCONTA_WS, function (response) {
                var xls = response.data,
                    row;
                for (var i = 0; i < xls.length; i++) {
                    row = xls[i];
                    if (!$.isEmptyObject(row)) {


                        console.info("OBJETO RES:", row);
                        $scope.conciliacionPojoLista.push(row);
                    }
                }
                $scope.muestraBotonGuardaReferenciacion = $scope.conciliacionPojoLista.length > 0;
            });
        }
    };


    $scope.importarXLSMayorContableDebitoFiscal = function (files) {
        if (files && files.length) {
            console.log(files[files.length - 1]);
            $scope.objetoCargadoMayorContableDebitoFiscal = files[files.length - 1];
            console.log("$scope.objetoCargadoMayorContableDebitoFiscal:", $scope.objetoCargadoMayorContableDebitoFiscal);
            $scope.nombreArchivoUno = files[files.length - 1].name;
            $scope.activaBotonReferenciacionAutomatica = false;
        }
    };

    $scope.importarXLSMayorContableVentas = function (files) {
        if (files && files.length) {
            $scope.objetoCargadoMayorContableVentas = files[files.length - 1];
            console.log("$scope.objetoCargadoMayorContableVentas:", $scope.objetoCargadoMayorContableVentas);
            $scope.nombreArchivoDos = files[files.length - 1].name;
            $scope.activaBotonReferenciacionAutomatica = false;
        }
    };

    $scope.limpiaGrillasReferenciacion = function () {
        $scope.activaBotonReferenciacionAutomatica = true;
        $scope.objetoCargadoMayorContableDebitoFiscal = {};
        $scope.objetoCargadoMayorContableVentas = {};
        $scope.nombreArchivoUno = "";
        $scope.nombreArchivoDos = "";
        $scope.conciliacionPojoLista = [];
    };

    $scope.actionRefernciar = function () {
        var xlsFiles = [], xlsNames = [];

        if ($scope.objetoCargadoMayorContableDebitoFiscal) {
            xlsFiles.push($scope.objetoCargadoMayorContableDebitoFiscal);
            xlsNames.push("uploadFile");
        }
        //if ($scope.objetoCargadoMayorContableVentas) {
        //    xlsFiles.push($scope.objetoCargadoMayorContableVentas);
        //    xlsNames.push("uploadFileIngreso");
        //}


        cxcService.conciliacionExcelImport(xlsFiles, 'xls', xlsNames, serverConf.ERPCONTA_WS, function (response) {
            var xls = response.data,
                row;
            for (var i = 0; i < xls.length; i++) {
                row = xls[i];
                if (!$.isEmptyObject(row)) {


                    console.info("OBJETO RES:", row);
                    $scope.conciliacionPojoLista.push(row);
                }
            }
            $scope.muestraBotonGuardaReferenciacion = $scope.conciliacionPojoLista.length > 0;
        });
    };

    $scope.guardaReferenciacionContable = function () {
        $scope.showLoader();
        cxcService.putReferenciacionContable($scope.conciliacionPojoLista, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "La referenciación se registró correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 6000
            });
            $state.transitionTo('splashScreen', {}, {reload: true});
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Ocurrió un error al registrar la referenciación.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 6000
            });
        });

    };

    $scope.exportacionXLS = function () {
        var columnDefs = $scope.gridConciliacion.columnDefs,
          xlsRowContent,
          columnasDeFecha = ['fechaFactura'],
          field,
          xlsContent = [],
          columnName,
          value,
          row;

        for(var i = 0; i < $scope.conciliacionPojoLista.length; i++) {
            row = $scope.conciliacionPojoLista[i];
            xlsRowContent = {};
            for(var j = 0; j < columnDefs.length; j++) {
                columnName = columnDefs[j]['displayName'];
                field = columnDefs[j]['field'];
                value = row[field];
                if( columnasDeFecha.indexOf(field) > -1 ) {
                    if( !isNaN(new Date(value).getTime()) ) {
                        value = $filter('date')(value,'dd/MM/yyyy');
                    }
                } else if( field === 'conciliado' ) {
                    switch(value) {
                        case 'N': value = 'No Referenciado'; break;
                        case 'A': value = 'Automático'; break;
                        case 'M': value = 'Manual'; break;
                    }
                }

                xlsRowContent[columnName] = value || '';
            }
            xlsContent.push(xlsRowContent);
        }

        commonMethods.exportarXLS('Excel Mayor Debito Fiscal', xlsContent, true);
    };

    init();
});
/**
 * Created by paola on 09-09-15.
 */

app.controller('reporteGeneradoControlIngCtrl', function ($scope, $state, cxcService, serverConf,tempCache, $timeout) {
    $scope.colSeleccionadas=tempCache.listaColumnasReporte;
    $scope.fechaActual=new Date();
    $scope.datosEmpresa={
        gestion: $scope.fechaActual.getFullYear(),
        mes: ($scope.fechaActual.getMonth()+1).toString(),
        fechaInicial: '',
        fechaFinal: ''
    };

    $scope.mostrar={grilla:false,mensaje:false};

    $scope.nombreReporte="reporteVentas_0"+$scope.datosEmpresa.mes+$scope.datosEmpresa.gestion+"_"+$scope.datosEmpresa.nit;
    var columnasDefinidas = [],
      countableColumnsFound = false;

    function obtenerMeses(){
        cxcService.getParMes({}, {},serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteVentas: Meses",response.data);
            $scope.listaMeses = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    }
    function obtenerGestionesFacturadas(){
        cxcService.getListaGestionesFacturadas({}, {},serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteVentas: Gestiones",response.data);
            $scope.listaGestiones = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    };
    function grilla(){
        $scope.gridGenerado = {
            data: 'datosReporteVentas',
            enableColumnResize: true,
            enableRowSelection: true,
            headerRowHeight:55,
            multiSelect:false,
            columnDefs: 'myDefs',
            rowTemplate:'<div style="height: 100%" ng-class="{\'totals-row\': row.getProperty(\'__totals\')}" ng-style="rowStyle(row)">' +
            '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>'
        };
    }
    function generarReporte(){
        console.log("LISTA DE COLUMNAS SELECCIONADAS---",$scope.colSeleccionadas);

         $scope.myDefs=[];
         for(var i=0;i<$scope.colSeleccionadas.length;i++)
         {
             $scope.myDefs.push({
                 field: $scope.colSeleccionadas[i].nombreCol,
                 displayName: $scope.colSeleccionadas[i].displayNombre,
                 width: '*',
                 enableCellEdit: true,
                 headerClass: "header-center"
             });
             columnasDefinidas.push($scope.colSeleccionadas[i].nombreCol);
         }
         console.log("lista generada", $scope.myDefs);
    }

    $scope.cancelar=function(){
        $state.go('controlIngresos');
    };

    function init(){
        grilla();
        if($scope.colSeleccionadas.length==0) {
            $state.go('controlIngresos');
            return;
        };
        generarReporte();
        obtenerMeses();
        obtenerGestionesFacturadas();

    }

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';
    $scope.percentageTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)}}%</span></div>';

    $scope.exportar = function (format) {
        $scope.valor=["gestionFactura","nitCliente"];
        var columnasSeleccionadas = [], result = [];

        for( var i = 0; i < $scope.myDefs.length; i++ ) {
            // guardando los nombres de las columnas seleccionadas.
            columnasSeleccionadas.push($scope.colSeleccionadas[i].nombreCol);
        }
        for( i = 0; i < $scope.datosReporteVentas.length; i++ ) {
            var excelRow = {};
            // guardando solo las columnas seleccionadas definidas en los rows del excel.
            for( var j = 0; j < columnasSeleccionadas.length; j++ ) {
                excelRow[columnasSeleccionadas[j]] = $scope.datosReporteVentas[i][columnasSeleccionadas[j]];
            }
            result.push(excelRow);
        }
        if ( format === 'xlsx' ) {

            alasql('SELECT * INTO XLSX("ventas.xlsx",{headers:true}) FROM ?',[result]);
        } else if ( format === 'csv' ) {
            var tmpResults = result;
            if( countableColumnsFound ) {
                tmpResults.pop();
            }
            return tmpResults;
        }
    };

    /*Creado por: Paola Mejia
     * Descripcion: Obtiene listado de facturas con importe mayor o igual a 50000 Bs. por Mes y Anio*/
    $scope.procesar=function(fechaInicial,fechaFinal){
        $scope.showLoader();
        fechaInicial = new Date(fechaInicial).getTime();
        fechaFinal = new Date(fechaFinal).getTime();
        //cxcService.getListaReporteVentas({}, {},valorMes, valorAnio,serverConf.ERPCONTA_WS, function (response) {
        cxcService.getListReporteVentasInterval({}, {}, fechaInicial, fechaFinal, serverConf.ERPCONTA_WS, function(response) {
            //exito
            console.info("reporteVentas: Lista reporte",response.data);
            $scope.datosReporteVentas = response.data;
            if($scope.datosReporteVentas.length>0){
                $scope.mostrar.grilla=true;
                $scope.mostrar.mensaje=false;

                var keyWords = ['anticipo','ingreso','it','iva','monto','porcentaje','revenue'],
                  omittedKeys = ['nitCliente'],
                  rowTotals = {},
                  value;

                countableColumnsFound = false;

                for( var i = 0; i < $scope.datosReporteVentas.length; i++ ) {
                    for( var key in $scope.datosReporteVentas[i] ) {
                        if( $scope.datosReporteVentas[i].hasOwnProperty(key) && columnasDefinidas.indexOf(key) > -1 ) {
                            if( !rowTotals.hasOwnProperty(key) && i === 0 ) {
                                for( var k = 0 ; k < keyWords.length; k++ ) {
                                    if( (key + '').toLowerCase().indexOf(keyWords[k]) > -1 && omittedKeys.indexOf(key) === -1 ) {
                                        countableColumnsFound = true;
                                        rowTotals[key] = 0;
                                    }
                                }
                            }

                            if( rowTotals.hasOwnProperty(key) ) {
                                value = $scope.datosReporteVentas[i][key];
                                if( !isNaN(value) ) {
                                    rowTotals[key] += value;
                                }
                            }
                        }
                    }
                }
                if( countableColumnsFound ) {
                    rowTotals['__totals'] = true;
                    $scope.datosReporteVentas.push(rowTotals);
                }

                $timeout(function() {
                    updateGridSize();
                }, 1);
            } else {
                $scope.mostrar.mensaje=true;
                $scope.mostrar.grilla=false;
            }
            $scope.hideLoader();

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    };

    function updateGridSize() {
        var grids = angular.element(document).find('[ng-grid]');
        for (var i = 0; i < grids.length; i++) {
            angular.element(grids[i]).trigger('resize.nggrid');
        }
        if( !$scope.$$phase ) {
            $scope.$apply();
        }
    }

    $scope.limpiar=function(){
        $scope.mostrar.mensaje=false;
        $scope.mostrar.grilla=false;
    };
    init();
});

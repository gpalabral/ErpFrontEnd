/**
 * Created by paola on 13-11-15.
 */
'use strict';

app.controller('reporteTransBancariasCtrl', function ($scope, rhServices, serverConf, modalService, localStorageService, $timeout, tempCache) {
    $scope.idPeriodo = localStorageService.get('periodoGestionObjeto').idPeriodoGestion;
    $scope.periodo = localStorageService.get('periodoGestionObjeto').periodo;
    $scope.gestion = localStorageService.get('periodoGestionObjeto').gestion;

    function obtenerTransferencias(idPeriodo){
        rhServices.getTransferencias({}, {},idPeriodo,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteTransBancarias: datos",response.data);
            $scope.datosTransferencias = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    };

    function init(){
        obtenerTransferencias($scope.idPeriodo);
    }


    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridTransferencias = {
        data: 'datosTransferencias',
        enableRowSelection: false,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        enableSorting:true,
        headerRowHeight:48,
        columnDefs: [
            {
                field: '',
                displayName: 'N° Cuenta Bancaria',
                width: '50%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: '',
                displayName: 'Monto Abonar',
                width: '50%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            }
        ]
    };
    init();
    $scope.exportar = function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosTransferencias.length; i++) {
            row = $scope.datosTransferencias[i];
            if( format === 'xlsx' ) {
                exportArray.push({
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.rhEmpleadoCargo.numeroItem
                });
            }
        }

        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("TransferenciasAbonar.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
    };
});
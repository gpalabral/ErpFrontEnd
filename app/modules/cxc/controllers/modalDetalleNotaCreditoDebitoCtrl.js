/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalDetalleNotaCreditoDebitoCtrl', function ($scope, tempCache, cxcService, serverConf, $modalInstance, localStorageService) {


    function init() {
        if (tempCache.erpNotaCreditoDebitoTempCache != null) {
            $scope.erpNotaCreditoDebito = tempCache.erpNotaCreditoDebitoTempCache;
            cxcService.getErpNotaCreditoDebito({}, {}, $scope.erpNotaCreditoDebito.idNotaCreditoDebito, serverConf.ERPCONTA_WS, function (response) {
                //exito
                $scope.datosDetalleFacturaNotaDebitoCredito = response.data.listaCpcDetalleFactura;
                $scope.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;

                angular.forEach($scope.datosDetalleFacturaNotaDebitoCredito, function (data) {
                    if (data.precioUnitarioPrimeraMoneda != 0) {
                        data.precioUnitarioSegundaMoneda = parseFloat(data.precioUnitarioPrimeraMoneda) / $scope.tipoCambio;
                        data.subtotalSegundaMoneda = parseFloat(data.cantidad) * parseFloat(data.precioUnitarioSegundaMoneda);
                    }
                    if (data.precioUnitarioSegundaMoneda != 0) {
                        data.precioUnitarioPrimeraMoneda = parseFloat(data.precioUnitarioSegundaMoneda) * $scope.tipoCambio;
                        data.subtotalPrimeraMoneda = parseFloat(data.cantidad) * parseFloat(data.precioUnitarioPrimeraMoneda);
                    }
                });
                $scope.sumaMontoTotalPrimeraMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                    $scope.totalPrimera = resultadoNumero;
                });
                $scope.sumaMontoTotalSegundaMoneda($scope.datosDetalleFacturaNotaDebitoCredito, function (resultadoNumero) {
                    $scope.totalSegunda = resultadoNumero;
                });
            }, function (responseError) {
                //error
            });
        }
    }

    $scope.sumaMontoTotalPrimeraMoneda = function (objetoListaFacturasEmitidas, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaFacturasEmitidas, function (facturaEmitida) {
            $scope.sumar = $scope.sumar + Number(facturaEmitida.subtotalPrimeraMoneda);
        });
        funcion($scope.sumar);
    };

    $scope.sumaMontoTotalSegundaMoneda = function (objetoListaFacturasEmitidas, funcion) {
        $scope.sumar = 0;
        angular.forEach(objetoListaFacturasEmitidas, function (facturaEmitida) {
            $scope.sumar = $scope.sumar + Number(facturaEmitida.subtotalSegundaMoneda);
        });
        funcion($scope.sumar);
    };


    $scope.datosDetalleFacturaNotaDebitoCredito = [];

    $scope.totalesTemplate = '<div style="width:  70%; display: inline-block; text-align: right">' +
    '<label class="control-label">TOTAL&nbsp;&nbsp;</label></div>' +
    '<div style="width: 15%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalPrimera" ui-number-mask disabled></div>' +
    '<div style="width: 15%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalSegunda" ui-number-mask disabled></div>';

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
    $scope.currencySubTotalTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.btnEliminaDetalleFacturaNotaDebitoCredito = '<div align="center"><button id="eliminaPlanFacturacion" type="button" height="5" class="btn btn-default" ng-click="quitaFacturasParaNotaDebitoCredito(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-minus"></span></button></div>';
    $scope.currencyTemplateCinco = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';

    $scope.gridOptionsNotaDebitoCredito = {
        data: 'datosDetalleFacturaNotaDebitoCredito',
        enableRowSelection: false,
        enableColumnResize: true,
        rowHeight: 33,
        headerRowHeight: 53,
        enableCellSelection: false,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,
        columnDefs: [
            {
                field: 'cantidad',
                displayName: "Cant.",
                width: '10%',
                enableCellSelection: true,
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'detalleFactura',
                displayName: "Detalle",
                width: '30%',
                headerClass: "header-center",
                cellClass: 'text-left'
            },
            {
                field: "precioUnitarioPrimeraMoneda",
                displayName: "Precio Unitario (BOB)",
                width: '15%',
                enableCellSelection: true,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: "precioUnitarioSegundaMoneda",
                displayName: "Precio Unitario (USD)",
                width: '15%',
                enableCellSelection: true,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: "subtotalPrimeraMoneda",
                displayName: "SubTotal (BS)",
                width: '15%',
                headerClass: "header-center",
                enableCellEdit: false,
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: "subtotalSegundaMoneda",
                displayName: "SubTotal (USD)",
                width: '15%',
                headerClass: "header-center",
                enableCellEdit: false,
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplateCinco
            }
        ]
    };


    $scope.continuar = function () {
        $modalInstance.dismiss('cancel');
    };

    init();

});

/**
 * Created by paola on 22-04-15.
 */
//BANCARIZACION
app.controller('listaFacturaClienteNotaDebitoCreditoCtrl', function ($scope, $state, cxcService, serverConf, $http,
                                                                     $modal, localStorageService, MODULES, $rootScope,
                                                                     menuModulo, tempCache,modalService) {

    $scope.datosEmpresa = {gestion: 2015, mes: ''};
    $scope.mySelections = [];

    $scope.btnRegistrarDocumento = '<button id="emitirFactura" type="button" height="5" class="btn btn-primary" ng-click="registrarPago(row)" style="cursor: pointer;" data-placement="bottom" title="Registrar Pago">' +
    '<span class="glyphicon glyphicon-save-file"></span></button>';

    $scope.checkboxCellTemplate = '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>';

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
    '<input type="text" class="form-control" ng-click="stopClickProp($event)"ng-model="col.filterText" ng-style="{ \'width\' : col.width - 10 + \'px\' }" style="position: absolute; top: 30px; bottom: 30px; left: 5px; right:5px;"/>' +
    '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.btnSeleccionarFactura = '<div align="center"><button type="button" height="5" class="btn btn-default" ng-click="selecionaFacturaNgGrid(row)" style="cursor: pointer;" data-placement="bottom" title="Nota Debito-Credito">' +
    '<span class="glyphicon glyphicon-share"></span></button></div>';

    $scope.gridOptionsCompras = {
        data: 'facturasPorBancarizar',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        selectedItems: $scope.mySelections,
        enableSorting: true,
        headerRowHeight: 66,
        plugins: [filterBarPlugin],
        columnDefs: [
            //  {   cellTemplate: $scope.checkboxCellTemplate, width: '4%', enableCellEdit: true },
            {
                field: 'cpcFacturaEmitida.fechaFactura',
                //headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'Fecha',
                width: '7%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'nroContratoCliente',
                displayName: 'Orden de Compra',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nroContrato',
                displayName: 'N° Contrato',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nombre',
                displayName: 'Cliente',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'cpcFacturaEmitida.cppProveedorCliente.nit',
                displayName: 'NIT Cliente',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'cpcFacturaEmitida.numeroFactura',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'N° Factura',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'cpcFacturaEmitida.cpcDosificacion.numeroAutorizacion',
                //headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'N° Autorización',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'cpcFacturaEmitida.parModalidadTransaccion.descripcion',
                //headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'Modalidad',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'cpcFacturaEmitida.parTipoTransaccion.descripcion',
                displayName: 'Transacción',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'cpcFacturaEmitida.montoPrimeraMoneda',
                displayName: 'Monto (BOB)',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate: $scope.currencyTemplate
            },
            {displayName: "Emitir", cellTemplate: $scope.btnSeleccionarFactura, width: '5%', enableCellEdit: false}
        ]
    };


    $scope.selecionaFacturaNgGrid = function (row) {
        tempCache.facturaEmitidaCache= row.entity;
        console.info("ENTIDAD:",tempCache.facturaEmitidaCache);
        //$state.go('emisionFacturaNotaDebitoCredito');
        buscadorDosificacionesCreditoDebito();
    };

    $scope.seleccionarFacturas = function () {
        console.log("lista facturas para BANCARIZAR", $scope.mySelections);

        //tempCache.listaFacturasBancarizar = $scope.mySelections;
        //if (tempCache.listaFacturasBancarizar) {
        //    $state.go('pagoBancarizado');
        //}
    };

    $scope.exportar = function () {
        var exportArray = [], row;
        for (var i = 0; i < $scope.facturasPorBancarizar.length; i++) {
            row = $scope.facturasPorBancarizar[i];
            exportArray.push({
                nombre: row.nombre,
                concepto: row.cpcFacturaEmitida.concepto,
                codigoControl: row.cpcFacturaEmitida.codigoControl,
                montoPrimeraMoneda: row.cpcFacturaEmitida.montoPrimeraMoneda,
                numeroFactura: row.cpcFacturaEmitida.numeroFactura
            })
        }
        console.log(exportArray);
        return exportArray;
    };

    $scope.procesar = function (valorMes, valorAnio) {
        //cxcService.getFacturasParaBancarizar({}, {}, valorMes, valorAnio, serverConf.ERPCONTA_WS, function (response) {
        console.info("valorMes",valorMes);
        console.info("valorAnio",valorAnio);
        $scope.showLoader();
        cxcService.getCpcNotaDebitoCreditoByMonthAndYear({}, {}, valorMes, valorAnio,"FACT","BAN","V", serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("listaFacturaCliente: facturasPorBancarizar", response.data);
            $scope.facturasPorBancarizar = response.data;
            // DATOS REQUERIDOS: cpcFacturaEmitida/getCpcNotaDebitoCreditoByMonthAndYear/{mes}/{anio}/{codigoDocMercantil}/{estadoPago}/{codigoEstadoFactura}
            cxcService.getCpcNotaDebitoCreditoByMonthAndYear({}, {}, valorMes, valorAnio,"FACT","NBAN","V", serverConf.ERPCONTA_WS, function (response) {
                //exito
                console.info("listaFacturaCliente: facturasPorBancarizar", response.data);
                $scope.facturasPorBancarizar = $scope.facturasPorBancarizar.concat(response.data);
                cxcService.getCpcNotaDebitoCreditoByMonthAndYear({}, {}, valorMes, valorAnio,"FACT","PEND","V", serverConf.ERPCONTA_WS, function (response) {
                    //exito
                    console.info("listaFacturaCliente: facturasPorBancarizar", response.data);
                    $scope.facturasPorBancarizar = $scope.facturasPorBancarizar.concat(response.data);
                    $scope.hideLoader();
                }, function (responseError) {
                    console.log(responseError);
                    $scope.hideLoader();
                    //error
                });

            }, function (responseError) {
                console.log(responseError);
                $scope.hideLoader();
                //error
            });

        }, function (responseError) {
            console.log(responseError);
            $scope.hideLoader();
            //error
        });

    };


    function buscadorDosificacionesCreditoDebito() {
        var modalDosificacionesCreditoDebito = modalService.show(
            {
                templateUrl: 'modules/cxc/views/buscadorDosificacionesCreditoDebito.html',
                controller: 'buscadorDosificacionesCreditoDebitoCtrl',
                size: 'md'
            }, {
                //idContrato: ""
            }
        );
    };

})

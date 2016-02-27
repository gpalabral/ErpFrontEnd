/**
 * Created by paola on 22-09-15.
 */

//LISTADO DE DOCUMENTOS PARA BANCARIZAR
app.controller('listaBancarizacionComprasCtrl', function ($scope, $state, cxpService,cxcService, serverConf, $http, $modal,
                                                    localStorageService,MODULES,$rootScope,menuModulo,tempCache,modalService) {

    $scope.mostrar={grilla:false};
    $scope.mySelections=[];

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene la lista de Clientes*/
    cxpService.getListProveedores({},{},serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("listaFacturaCliente: Lista Proveedores",response.data);
        $scope.listaProveedores = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });

    $scope.checkboxCellTemplate='<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>';

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

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.btnOption = '<button id="noBank" type="button" height="5" class="btn btn-primary" ng-click="modificarNoBancarizar(row)" style="cursor: pointer;" >' +
    '<span class="glyphicon glyphicon-minus" data-placement="bottom" title="No Bancarizar"></span></button>';

    $scope.gridOptions = {
        data: 'docPorBancarizar',
        enableRowSelection: true,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:true,
        selectWithCheckboxOnly:true,
        showSelectionCheckbox:true,
        selectedItems:$scope.mySelections,
        enableSorting:true,
        headerRowHeight:66,
        plugins: [filterBarPlugin],
        columnDefs: [
            {
                field: 'fechaRegistro',
                displayName: 'Fecha',
                width: '8%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"
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
                field: 'nroFacturaRetencion',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'N° Factura',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroAutorizacion',
                displayName: 'N° Autorización',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'modalidadTransaccion',
                displayName: 'Modalidad',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'tipoTransaccion',
                displayName: 'Tipo Transacción',
                width: '14%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'montoEmitido',
                displayName: 'Monto Factura Emitida (BOB)',
                width: '11%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoBancarizado',
                displayName: 'Monto Bancarizado (BOB)',
                width: '11%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoABancarizar',
                displayName: 'Monto a Bancarizar (BOB)',
                width: '11%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {cellTemplate: $scope.btnOption, width:'5%', enableCellEdit: false},
        ]
    };
    /*Creado por: Paola Mejia
    * Descripción: Establece en el tempcache la lista documentos seleccionados*/
    $scope.seleccionarFacturas=function(){
        console.log("lista documentos para BANCARIZAR",$scope.mySelections);
        tempCache.listaComprasPorBancarizar=$scope.mySelections;

        if(tempCache.listaComprasPorBancarizar){
            $state.go('documentoPago');
        }
    };
    $scope.cancelar=function(){
        $state.go('cxcEnBlanco');
    };

    $scope.modificarNoBancarizar=function(row){
        $scope.facturaModificada={
            "idFacturaRetencion":row.entity.idFacturaRetencion,
            "tipoDocumentoMercantil": row.entity.tipoDocumentoMercantil
        };

        var index  = row.rowIndex;
        console.log("FILA SELECCIONADA", row.entity);

        var modalDefaults = {
            templateUrl: 'views/modalTemplates/verificarEliminacion.html',
            controller: 'modalDelete'
        };

        var modalOptions = {
            headerText: 'Mensaje de Sistema',
            bodyText: 'El Documento N°: '+row.entity.nroFacturaRetencion+ ' no será bancarizado, ¿Desea continuar?',
            actionButtonText: "Aceptar",
            cancelButtonText: "cancelar"
        };
        modalService.show(modalDefaults,modalOptions).then( function () {
            console.log('eliminar');
            $scope.gridOptions.selectItem(index , false);
            $scope.docPorBancarizar.splice(index , 1);

            /*Creado por: Paola Mejia
             * Descripcion: Elimina de la lista el registro seleccionado por idUsuario y lo establece como NBAN: No Bancarizado*/
            cxpService.editFacturaRetencion({}, {},$scope.facturaModificada.idFacturaRetencion,$scope.facturaModificada.tipoDocumentoMercantil, serverConf.ERPCONTA_WS, function (response) {
                console.info("Modificado exitosamente", response.data);
            });
        }, function () {
            console.log('cancelar');
        });

    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene listado de facturas con importe mayor o igual a 50000 Bs. por Mes y Anio*/
    $scope.procesar=function(idProveedor){
        $scope.showLoader();
        cxpService.getDocPorBancarizarCompras({}, {},idProveedor,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("listaBancarizacionCompras: documentosPorBancarizar",response.data);
            $scope.docPorBancarizar = response.data;
            if($scope.docPorBancarizar.length>0){
                    $scope.mostrar.grilla=true;
            }
            $scope.hideLoader();
        }, function (responseError) {
            console.log(responseError);
            //error
        });

    };
    $scope.limpiar=function(){
        $scope.mostrar.grilla=false;
    };
})

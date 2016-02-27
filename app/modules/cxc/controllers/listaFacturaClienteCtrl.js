/**
 * Created by paola on 22-04-15.
 */
//LISTADO DE FACTURAS PARA BANCARIZAR
app.controller('listaFacturaClienteCtrl', function ($scope, $state, cxcService, serverConf, $http, $modal,
                                          localStorageService,MODULES,$rootScope,menuModulo,tempCache,modalService) {

    $scope.mostrar={grilla:false};
    $scope.mySelections=[];

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene la lista de Clientes*/
    cxcService.getListaClienteParaBancarizar({},{},"CLI",serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("listaFacturaCliente: Lista Clientes",response.data);
        $scope.listaClientes = response.data;
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
        data: 'facturasPorBancarizar',
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
                field: 'cpcFacturaEmitida.fechaFactura',
                displayName: 'Fecha',
                width: '8%',
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
                field: 'cpcFacturaEmitida.numeroFactura',
                headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'N° Factura',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'cpcFacturaEmitida.cpcDosificacion.numeroAutorizacion',
                //headerCellTemplate: $scope.myHeaderCellTemplate,
                displayName: 'N° Autorización',
                width: '9%',
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
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'cpcFacturaEmitida.montoPrimeraMoneda',
                displayName: 'Monto Factura Emitida (BOB)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'cpcFacturaEmitida.otrosGastos',//se utilizo esta variable como auxiliar solo para la vista
                displayName: 'Monto Bancarizado (BOB)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'saldoPrimeraMoneda',
                displayName: 'Monto a Bancarizar (BOB)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {cellTemplate: $scope.btnOption, width:'4%', enableCellEdit: false},
        ]
    };


    $scope.seleccionarFacturas=function(){
      console.log("lista facturas para BANCARIZAR",$scope.mySelections);
        tempCache.listaFacturasBancarizar=$scope.mySelections;

        if(tempCache.listaFacturasBancarizar){
            $state.go('pagoBancarizado');
        }
    };
    $scope.cancelar=function(){
        $state.go('cxcEnBlanco');
    };

   $scope.modificarNoBancarizar=function(row){
      $scope.facturaModificada={
           "cpcDosificacion": {
               "idDosificacion":row.entity.cpcFacturaEmitida.cpcDosificacion.idDosificacion
           },
           "cppProveedorCliente": {
               "idProveedorCliente":row.entity.cpcFacturaEmitida.cppProveedorCliente.idProveedorCliente
           },
           "idFactura":row.entity.cpcFacturaEmitida.idFactura,
           "parEstadoFactura": {
               "codigo": "V",
               "descripcion": ""
           },
          "parEstadoPago": {
              "codigo": "NBAN",
              "descripcion": ""
          }
       };

       var index = row.rowIndex;
       console.log("FILA SELECCIONADA", row);

       var modalDefaults = {
           templateUrl: 'views/modalTemplates/verificarEliminacion.html',
           controller: 'modalDelete'
       };
       //Esta seguro de no bancarizar la factura con numero tal ?
       var modalOptions = {
         headerText: 'Mensaje del Sistema',
         bodyText: 'La Factura N°: '+row.entity.cpcFacturaEmitida.numeroFactura+ ' no será bancarizada, ¿Desea continuar?',
         actionButtonText: "Aceptar",
         cancelButtonText: "cancelar"
       };
       modalService.show(modalDefaults,modalOptions).then( function () {
           console.log('eliminar');
           $scope.gridOptions.selectItem( $scope.index , false);
           $scope.facturasPorBancarizar.splice(index, 1);

           /*Creado por: Paola Mejia
            * Descripcion: Elimina el registro seleccionado por idUsuario*/
           cxcService.editFacturaEmitida($scope.facturaModificada, {}, serverConf.ERPCONTA_WS, function (response) {
               console.info("Modificado correctamente", response.data);
           });
       }, function () {
           console.log('cancelar');
       });

   };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene listado de facturas con importe mayor o igual a 50000 Bs. por Mes y Anio*/
    $scope.procesar=function(idCliente){
        $scope.showLoader();
        cxcService.getFacturasParaBancarizar({}, {},idCliente,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("listaFacturaCliente: facturasPorBancarizar",response.data);
            $scope.facturasPorBancarizar = response.data;
            if($scope.facturasPorBancarizar.length>0){
                $scope.mostrar.grilla=true;
                angular.forEach($scope.facturasPorBancarizar,function(data,index){
                   console.log(data);
                    data.cpcFacturaEmitida.otrosGastos=parseFloat(data.cpcFacturaEmitida.montoPrimeraMoneda)-parseFloat(data.saldoPrimeraMoneda);
                    console.log("datos fila", data.cpcFacturaEmitida.otrosGastos);

                });
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

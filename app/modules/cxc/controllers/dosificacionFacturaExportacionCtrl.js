/**
 * Created by paola on 22-04-15.
 */
'use strict';

app.controller('dosificacionFacturaExportacionCtrl', function ($scope, $state, cxcService, serverConf, tempCache,localStorageService) {
    /************************Definición de variables*********************************/
 $scope.sucursalPredeterminada = localStorageService.get('atributosPerfil').sucursalPredeterminada;

    /*Creado por: Paola Mejia
     Obtiene el listado de dosificaciones ACTIVAS, modalidad de facturacion Electronica y Computarizada y caracteristica especial FACTURA COMERCIAL DE EXPORTACION por idSucurcsal */
    function obtieneDosificacion(idSucursalSel){
      $scope.showLoader();
        cxcService.getDosificacionPorIdSucursal({}, {}, idSucursalSel,'ACT','FCE',serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            console.info("dosificaccionFacturaExportacion: Lista Dosificaciones",respuesta.data);
            $scope.dosificaciones = respuesta.data;
          $scope.hideLoader();
        }, function (responseError) {
            //error
          $scope.hideLoader();
        });
    };

  $scope.showLoader();
   /*Creado por: Paola Mejia
   Obtiene el listado de sucursales vigentes, que si emiten factura,con dosificacion ACTIVA y caracteristica especial FACTURA COMERCIAL DE EXPORTACION*/
   function obtenerSucursales(){
      if($scope.sucursalPredeterminada) {
          cxcService.getSucursalesDosificacion({}, {}, 'FCE', 'ACT', serverConf.ERPCONTA_WS, function (response) {
              //exito
              console.info("dosificaccionFacturaExportacion: Lista Sucursales", response.data);
              $scope.sucursales = response.data;
            $scope.hideLoader();
          }, function (responseError) {
              //error
            $scope.hideLoader();
          });
          obtieneDosificacion($scope.sucursalPredeterminada);
      }
   }
    $scope.btnEmitirFactura = '<button id="emitirFactura"' +
    'type="button" ' +
    'height="5"' +
    'class="btn btn-primary" ' +
    'ng-click="emitirFactura(row)"' +
    'style="cursor: pointer;width:95%"' +
    'data-placement="bottom"' +
    'title="Facturar">' +
    '<span class="glyphicon glyphicon-open-file"></span>' +
    '&nbsp;{{ [\'COMPUTARIZADA\',\'ELECTRONICA\'].indexOf(row.getProperty(\'parModalidadFacturacion.descripcion\')) > -1 ?  \' Emitir Factura  \' : ([\'MANUAL\',].indexOf(row.getProperty(\'parModalidadFacturacion.descripcion\')) > -1 ? \'Registrar Factura\' : \'\')}}</button>';

    $scope.gridDosificacionesPorSucursal = {
        data: 'dosificaciones',
        enableRowSelection: true,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        enableSorting:true,
        rowHeight:34,
        columnDefs: [
            {
                field: 'parModalidadFacturacion.descripcion',
                displayName: "Modalidad Facturación",
                width: '14%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'cpcActividadEconomica.descripcion',
                displayName: "Actividad Económica",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'numeroAutorizacion',
                displayName: "N° Autorización",
                width: '18%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'fechaLimiteEmision',
                displayName: "Fecha Límite Emisión",
                width: '13%',
                headerClass: "header-center",
                cellClass: "text-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                sortable: true
            },
            {
                field: 'numeroFacturaInicial',
                displayName: 'N° Factura',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            { displayName:"Acción",cellTemplate: $scope.btnEmitirFactura, width: '15%', enableCellEdit: false }
        ]
    };
 function init(){
     obtenerSucursales();
 };

    /*Creado por: Paola Mejia
     * Obtiene las dosificaciones por idSucursal */
    $scope.sucursalSeleccionada = function (itemsucursal) {
        console.log(itemsucursal);
        $scope.gridDosificacionesPorSucursal = {};
        obtieneDosificacion(itemsucursal)
    };
    $scope.emitirFactura=function(row){
        console.log("Dosificacion seleccionada",row.entity);
        tempCache.dosificacionInfo=row.entity.idDosificacion;
        tempCache.idSucursalSeleccionada=$scope.idSucursal;
        if(tempCache.dosificacionInfo)
            $state.go('facturaComercialExportacion');
    };

    init();

})


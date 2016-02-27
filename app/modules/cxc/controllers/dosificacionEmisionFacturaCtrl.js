/**
 * Created by paola on 17-04-15.
 */
'use strict';

app.controller('dosificacionEmisionFacturaCtrl', function ($scope, $state, cxcService, serverConf, tempCache, localStorageService) {
/************************Definición de variables*********************************/
var atributosPerfil =  localStorageService.get('atributosPerfil');

    function obtieneDosificacion(idSucursalSel){
        $scope.showLoader();
        cxcService.getDosificacionPorIdSucursal({}, {}, idSucursalSel,'ACT','NIN',serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            $scope.hideLoader();
            console.info("dosificaccionEmisionFactura: Lista Dosificaciones",respuesta.data);
            $scope.dosificaciones = respuesta.data;
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });
    };
    if(atributosPerfil) {
        /*Creado por: Paola Mejia
         Obtiene el listado de sucursales vigentes, que si emiten factura,con dosificacion ACTIVA y caracteristica especial NINGUNA*/
        cxcService.getSucursalesDosificacion({}, {},'NIN','ACT',serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("dosificaccionEmisionFactura: Lista Sucursales",response.data);
            $scope.sucursales = response.data;

        }, function (responseError) {
            //error
        });
             $scope.itemsucursal = atributosPerfil['sucursalPredeterminada'];
             console.log("dosificacionEmisionFactura:SUCURSAL PREDETERMINADA::::",$scope.itemsucursal),
             obtieneDosificacion($scope.itemsucursal);
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
                field: 'numeroFacturaActual',
                displayName: 'N° Factura',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            { displayName:"Acción",cellTemplate: $scope.btnEmitirFactura, width: '15%', enableCellEdit: false }
        ]
    };
    /*Creado por: Paola Mejia
     * Obtiene el id de la sucursal seleccionada en el buscador,
     * */
    $scope.sucursalSeleccionada = function (itemsucursal) {
     /*   var z = $('#listasucursales');
        var val = $(z).find('option[value="' + itemsucursal + '"]');
        $scope.idSucursal = val.attr('data-id') || "";*/
        console.log("ID DE LA SUCURSAL SELECCIONADA",itemsucursal);
        $scope.gridDosificacionesPorSucursal = {};
        obtieneDosificacion(itemsucursal)

    };
    $scope.emitirFactura=function(row){
        console.log("Dosificacion seleccionada",row.entity);
        tempCache.idDosificacionSeleccionada=row.entity.idDosificacion;
        tempCache.idSucursalSeleccionada=$scope.idSucursal;
        if(tempCache.idDosificacionSeleccionada)
            $state.go('emisionFactura');
    };

})

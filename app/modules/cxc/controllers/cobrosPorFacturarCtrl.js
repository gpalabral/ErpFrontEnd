/**
 * Created by paola on 25-04-15.
 */

'use strict';

app.controller('cobrosPorFacturarCtrl', function ($scope, $state, cxcService, serverConf, tempCache,$stateParams, $filter,modalService, localStorageService) {
    /************************Definición de variables*********************************/
    var atributosPerfil =  localStorageService.get('atributosPerfil');//Obtiene datos del perfil
    $scope.pagos=[];
    $scope.idContrato=$stateParams.idEntidadPojo;
    tempCache.temp_idContrato=$scope.idContrato;
    console.log("cobrosPorFacturar: id del contrato---",$scope.idContrato);

    $scope.fechaActual= new Date( $filter('date')(new Date().getTime(),'M/d/yy')).getTime();
    $scope.vencimiento=addDays(15, $scope.fechaActual).getTime();
    //$scope.columna={mostrarBob:true, mostrarSeg:false};

    /*Creado por: Paola Mejia
    * Descripcion: Genera la lista de pagos pendientes por cobrar, genera cálculos de saldos*/
    var obtieneLista=function (){
        for (var i = 0; i < $scope.pagosPorCobrar.length; i++) {
            $scope.pagos.push({idPagoContrato:$scope.pagosPorCobrar[i].idPagoContrato,
                fechaProgramada:$scope.pagosPorCobrar[i].fechaProgramada,
                // fechaProgramadaTs fecha temporal para validar que rows van a mostrarse con la clase roja.
                fechaProgramadaTs : (new Date($scope.pagosPorCobrar[i].fechaProgramada)).getTime(),
                descripcionPago:$scope.pagosPorCobrar[i].descripcionPago,
                montoPorFacturarPrimeraMoneda:$scope.pagosPorCobrar[i].montoProgramado.toFixed(5)-$scope.pagosPorCobrar[i].montoFacturado.toFixed(5),
                montoPorFacturarSegundaMoneda:$scope.pagosPorCobrar[i].montoProgramadoSegMoneda.toFixed(5)-$scope.pagosPorCobrar[i].montoFacturadoSegMoneda.toFixed(5),
                montoProgramado:$scope.pagosPorCobrar[i].montoProgramado.toFixed(5),
                montoProgramadoSegMoneda:$scope.pagosPorCobrar[i].montoProgramadoSegMoneda.toFixed(5),
                montoPagadoPrimeraMoneda:$scope.pagosPorCobrar[i].montoPagadoPrimeraMoneda.toFixed(5),
                montoPagadoSegundaMoneda:$scope.pagosPorCobrar[i].montoPagadoSegundaMoneda.toFixed(5),
                montoFacturado:$scope.pagosPorCobrar[i].montoFacturado.toFixed(5),
                montoFacturadoSegMoneda:$scope.pagosPorCobrar[i].montoFacturadoSegMoneda.toFixed(5),
                nroPago:$scope.pagosPorCobrar[i].nroPago
                });
        }
    };
    $scope.showLoader();

    /*Creado por: Paola Mejia
     * Descripcion: Obtiene los datos Pagos por Contrato programados, parametro PEND (pendiente) y por idContrato*/
     function obtenerCobrosPorFacturar(idContrato){
         cxcService.getCobrosPorFacturar({},{},idContrato,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("cobrosPorFactura: Por Cobrar",response.data);
            $scope.pagos = response.data;
             /* obtieneLista();
            console.log( "DATOS PAGOS POR COBRAR",$scope.pagos);*/
            angular.forEach($scope.pagos,function(row){
              row.fechaProgramadaTs = (new Date(row.fechaProgramada)).getTime();
              row.getSaldoBs = function(){
                 console.log("grilla---->",this.montoProgramado-this.montoFacturado)
                 return this.montoProgramado-this.montoFacturado;
               };
              row.getSaldoSus= function(){
              return this.montoProgramadoSegMoneda-this.montoFacturadoSegMoneda;
              };
            });
            $scope.hideLoader();
          },function (responseError) {
            //error
            $scope.hideLoader();
        });
     };

    function obtenerDosificacionesPorActEconomica(modalidad){
        cxcService.getDosificacionesByContrato({}, {},atributosPerfil['sucursalPredeterminada'],$scope.idContrato,'ACT','NIN',modalidad,serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            $scope.dosificacionPorActividad=respuesta.data;
            console.info("buscadorDosificaciones: Lista Dosificaciones",respuesta.data);
            console.log("TAMAÑO DE LA LISTA", $scope.dosificacionPorActividad.length);
          }, function (respuestaError) {
        });
    };
    function obtenerDatosContrato(idContrato){
        cxcService.getCpcContratoByIdContrato({},{},idContrato,serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            $scope.datosContrato=respuesta.data;
            for(var i = 0; i < $scope.gridCobros.$gridScope.columns.length; i++ ){
                var column = $scope.gridCobros.$gridScope.columns[i];
                if( column.displayName === 'Saldo por Facturar (BOB)') {
                    column.visible = $scope.datosContrato.parTipoMoneda.codigo=="BOL";
                    continue;
                }
                if( column.displayName === 'Saldo por Facturar (USD)' ) {
                    column.visible = $scope.datosContrato.parTipoMoneda.codigo!="BOL";
                }
                switch (column.field) {
                    case "montoPorFacturarPrimeraMoneda":
                        column.visible = $scope.datosContrato.parTipoMoneda.codigo=="BOL";
                        break;
                    case "montoFacturado":
                        column.visible = $scope.datosContrato.parTipoMoneda.codigo=="BOL";
                        break;
                    case "montoProgramado":
                        column.visible = $scope.datosContrato.parTipoMoneda.codigo=="BOL";
                        break;
                    case "montoPorFacturarSegundaMoneda":
                        column.visible = $scope.datosContrato.parTipoMoneda.codigo!="BOL";
                        break;
                    case "montoProgramadoSegMoneda":
                        column.visible = $scope.datosContrato.parTipoMoneda.codigo!="BOL";
                        break;
                    case "montoFacturadoSegMoneda":
                        column.visible = $scope.datosContrato.parTipoMoneda.codigo!="BOL";
                        break;
                    default: break;
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (respuestaError) {
        });
    };
    function init(){
        obtenerCobrosPorFacturar($scope.idContrato);
        obtenerDatosContrato($scope.idContrato);
    };

    function addDays(days, customDate) {
        return new Date( (customDate ? new Date(customDate).getTime() : new Date().getTime()) + days*24*60*60*1000);
    }

    $scope.btnEmitirFactura = '<button id="emitirFactura" type="button" height="5" class="btn btn-primary" ng-click="emitirFactura(row)" style="cursor: pointer;" data-placement="bottom" title="Emitir Factura">' +
    '<span class="glyphicon glyphicon-save-file"></span></button>';
    $scope.btnRegistrarFactura = '<button id="registrarFactura" type="button" height="5" class="btn btn-primary" ng-click="registrarFactura(row)" style="cursor: pointer;" data-placement="bottom" title="Registrar Factura Manual">' +
    '<span class="glyphicon glyphicon-save-file"></span></button>';

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';

    $scope.gridCobros = {
        data: 'pagos',
        enableRowSelection: true,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        headerRowHeight:52,
        rowHeight:34,
        enableSorting:true,
            rowTemplate:'<div style="height: 100%" ng-class="{red: (row.getProperty(\'fechaProgramadaTs\') < fechaActual), yellow: (fechaActual <= row.getProperty(\'fechaProgramadaTs\') && row.getProperty(\'fechaProgramadaTs\') < vencimiento) }"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>',
        showFooter: true,
        //footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 32,
        columnDefs: [
            {
                field: 'nroPago',
                displayName: "N°",
                width: '3%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'fechaProgramada',
                displayName: "Fecha",
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                sortable: true
            },
            {
                field: 'descripcionPago',
                displayName: "Concepto",
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'montoProgramado',
                displayName: 'Monto Programado (BOB)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoFacturado',
                displayName: "Monto Facturado (BOB)",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'getSaldoBs()',
                displayName: 'Saldo por Facturar (BOB)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoProgramadoSegMoneda',
                displayName: 'Monto Programado (USD)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoFacturadoSegMoneda',
                displayName: "Monto Facturado (USD)",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'getSaldoSus()',
                displayName: 'Saldo por Facturar (USD)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            { displayName:"Emitir Factura",cellTemplate: $scope.btnEmitirFactura, width: '5%', enableCellEdit: false },
            { displayName:"Registrar Factura",cellTemplate: $scope.btnRegistrarFactura, width: '6%', enableCellEdit: false }
        ]
    };

    /*Creado por: Paola Mejia
     * Descripcion: Despliega modal para seleccionar una dosificación*/
     function buscadorDosificaciones(accion) {
        console.log("cobrosPorFacturar===>",accion);
        var modalDosificacionesPorContrato = modalService.show(
            {
                templateUrl: 'modules/cxc/views/buscadorDosificaciones.html',
                controller: 'buscadorDosificacionesCtrl',
                size: 'md'
            }, {
                idContrato: $scope.idContrato,
                facturacion:accion
            }
        );
    };
    init();
     $scope.emitirFactura=function(row){
            console.log("Cobro seleccionado",row.entity);
            tempCache.pagoContratoInfo=row.entity.idPagoContrato;
            tempCache.tipoCobroFactura="EMITIR";
            if(tempCache.pagoContratoInfo)
                buscadorDosificaciones("EMITIR");
        };
    $scope.registrarFactura=function(row){
        console.log("Cobro seleccionado",row.entity);
        tempCache.pagoContratoInfo=row.entity.idPagoContrato;
        tempCache.tipoCobroFactura="REGISTRAR";
        if(tempCache.pagoContratoInfo)
            buscadorDosificaciones("REGISTRAR");
    };
});

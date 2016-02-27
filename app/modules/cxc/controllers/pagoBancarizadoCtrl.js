/**
 * Created by paola on 28-04-15.
 */
app.controller('pagoBancarizadoCtrl', function ($scope, $state, cxcService, serverConf, $http, $modal,
                                                    localStorageService,MODULES,$rootScope,menuModulo,tempCache,modalService) {

    /****************Definción de variables********************/

    $scope.modo={lectura:false};
    $scope.pagoFacturaPojo={
        "documentoPago": {
            "idDocumentoPago": 0,
            "nroDocumento": 0,
            "parTipoDocumentoPago": {
                "codigo": "",
                "descripcion": ""
            },
            "cppBanco": {
                "idBanco": 0,
                "nombre": "",
                "nroCta": 0,
                "nit": ""
            },
            "nitEntidadEmisora": "",
            "nroCtaEntidadEmisora": "",
            "parBanco": {
                "descripcion": "",
                "codigo": "",
                "nit": ""
            },
            "montoDocumentoPago": 0,
            "montoDocumentoPagoSegMoneda": 0,
            "montoAcumulado": 0,
            "montoAcumuladoSegMoneda": 0,
            "fechaDocumentoPago": "",
            "numeroPago": 0,
            "tipoCambio": localStorageService.get('tipoCambioObjeto').tipoCambio,
            "parTipoMoneda": {
                "codigo": "BOL",
                "descripcion": ""
            }
        },
        "listaPagoPojo": [
            {
                "idFacturaEmitida": 0,
                "montoPrimeraMoneda": 0,
                "montoSegundaMoneda": 0,
                "montoAcumuladoPrimeraMoneda": 0,
                "montoAcumuladoSegundaMoneda": 0
            }
        ]
    };
    function obtenerFacturasPorBancarizar(){
        $scope.facturasSeleccionadas=tempCache.listaFacturasBancarizar;
       /* angular.forEach($scope.facturasSeleccionadas,function(row){
            row.getMontoBancarizado = function(row){
                console.log("grilla---->",this.montoProgramado-this.saldoPrimeraMoneda)
                return (this.cpcFacturaEmitida.montoPrimeraMoneda-this.saldoPrimeraMoneda).toFixed(2);
            };
        });*/
    };
    function init(){
        obtenerFacturasPorBancarizar();
    }
    $scope.sumarValores=function () {
        var totalMontoFacturadoBs = 0.00;
        var totalMontoFacturadoSus = 0.00;
        var totalMontoPorPagarBs=0.00;
        var totalMontoPorPagarSus=0.00;

        angular.forEach($scope.facturasSeleccionadas, function (data, index) {
            totalMontoFacturadoBs = parseFloat(totalMontoFacturadoBs) + parseFloat(data.cpcFacturaEmitida.montoPrimeraMoneda);
            totalMontoFacturadoSus = parseFloat(totalMontoFacturadoSus) + parseFloat(data.cpcFacturaEmitida.montoSegundaMoneda);
            totalMontoPorPagarBs = parseFloat(totalMontoPorPagarBs) + parseFloat(data.saldoPrimeraMoneda);
            totalMontoPorPagarSus = parseFloat(totalMontoPorPagarSus) + parseFloat(data.saldoSegundaMoneda);
        });
        $scope.totalFacturasPrimeraMoneda = totalMontoFacturadoBs.toFixed(2);
        $scope.totalPorPagarPrimeraMoneda = totalMontoPorPagarBs.toFixed(2);
        $scope.totalFacturasSegundaMoneda = totalMontoFacturadoSus.toFixed(2);
        $scope.totalPorPagarSegundaMoneda = totalMontoPorPagarSus.toFixed(2);
    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene listado de tipos de Documentos Pago*/
    cxcService.getParTipoDocumentoPago({}, {},serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("pagoBancarizado: datosTipoDocumentoPago",response.data);
        $scope.listaDocumentosPago = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene listado de Monedas*/
    cxcService.getParTipoMoneda({}, {},serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("pagoBancarizado: datosTipoMoneda",response.data);
        $scope.listaMonedas = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });
     cxcService.getParBanco({},{},serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("pagoBancarizado: listaBancos",response.data);
        $scope.listaBancos = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });
    $scope.obtenerNit=function(codBanco){
        /*Creado por: Paola Mejia
         *Descripcion: Obtiene nit Banco por su codigo*/
        cxcService.getParValorByCodigoGenerico({}, {},codBanco,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("pagoBancarizado: datos Banco",response.data);
            $scope.pagoFacturaPojo.documentoPago.nitEntidadEmisora = response.data.valor;
        }, function (responseError) {
            console.log(responseError);
            //error
        });
    };
    function validarMontoDocPago(){
        if($scope.totalPorPagarPrimeraMoneda>$scope.totalFacturasPrimeraMoneda)
        {
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "El monto a pagar es mayor al monto facturado",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 3000
            });
        }
    };
    $scope.guardarPago=function(){
        $scope.listaPago=[];
        for (var i = 0; i < $scope.facturasSeleccionadas.length; i++) {
            $scope.listaPago.push({idFacturaEmitida:$scope.facturasSeleccionadas[i].cpcFacturaEmitida.idFactura,
                montoPrimeraMoneda:$scope.facturasSeleccionadas[i].saldoPrimeraMoneda,
                montoSegundaMoneda:$scope.facturasSeleccionadas[i].saldoSegundaMoneda,
                montoAcumuladoPrimeraMoneda:0,
                montoAcumuladoSegundaMoneda:0
            });
        };
        $scope.pagoFacturaPojo.listaPagoPojo=$scope.listaPago;
        $scope.pagoFacturaPojo.documentoPago.montoDocumentoPago=$scope.totalPorPagarPrimeraMoneda;
        $scope.pagoFacturaPojo.documentoPago.montoDocumentoPagoSegMoneda=$scope.totalPorPagarSegundaMoneda;
        //$scope.pagoFacturaPojo.documentoPago=$scope.documentoPago;
        console.log(JSON.stringify($scope.pagoFacturaPojo,null,4));

        if( $scope.pagoFacturaPojo.listaPagoPojo>0);
        {
            cxcService.adicionaPagoBancarizado($scope.pagoFacturaPojo, {},serverConf.ERPCONTA_WS,function (response) {
            //exito
            console.info("pagoBancarizado:grabado Pago--->>>>",response.data);
                $scope.showCustomModal({
                    headerText: "MENSAJE DE CONFIRMACION",
                    bodyText: "Los datos se guardaron correctamente.",
                    actionButtonText: "Aceptar",
                    type: 'exito',
                    closeAfter: 3000
                });
                $scope.modo.lectura=true;
             }, function (responseError) {
            //error
            });
        }

    };
    $scope.cancelarPago= function(){
        $state.go('listaFacturaCliente');
    };

    $scope.convertirMoneda=function(monto, tipoCambio){
        //$scope.documentoPago.montoDocumentoPagoSegMoneda=($scope.documentoPago.montoDocumentoPago/$scope.documentoPago.tipoCambio).toFixed(2);
    };
    $scope.totalesTemplate='<div style="width: 85%; display: inline-block; text-align: right"><label class="control-label">MONTO TOTAL DOC. PAGO&nbsp;&nbsp;</label></div>' +
    '<div style="width: 15%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalPorPagarPrimeraMoneda"  ui-number-mask readonly></div>'/*+
    '<div style="width: 12%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="totalPorPagarSegundaMoneda"  readonly></div>'*/;

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridOptions = {
        data: 'facturasSeleccionadas',
        enableRowSelection: true,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        enableSorting:true,
        headerRowHeight:40,
        showFooter: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 32,
        columnDefs: [
            {
                field: 'cpcFacturaEmitida.fechaFactura',
                displayName: 'Fecha',
                width: '10%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'nroContratoCliente',
                displayName: 'Orden de Compra',
                width: '11%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nroContrato',
                displayName: 'N° Contrato',
                width: '11%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'cpcFacturaEmitida.numeroFactura',
                displayName: 'N° Factura',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'cpcFacturaEmitida.cpcDosificacion.numeroAutorizacion',
                displayName: 'N° Autorización',
                width: '13%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'cpcFacturaEmitida.montoPrimeraMoneda',
                displayName: 'Monto Factura Emitida (BOB)',
                width: '15%',
                headerClass: "header-center",
                enableCellEdit:false,
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'cpcFacturaEmitida.otrosGastos',
                displayName: 'Monto Bancarizado (BOB)',
                width: '15%',
                headerClass: "header-center",
                enableCellEdit:!$scope.modo.lectura,
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'saldoPrimeraMoneda',
                displayName: 'Monto a Bancarizar (BOB)',
                width: '15%',
                headerClass: "header-center",
                enableCellEdit:!$scope.modo.lectura,
                cellClass: "text-right",
                cellTemplate:'<input type="text" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD" currency-input decimals="2"/>'
            }
        ]
    };
    $scope.$on('ngGridEventEndCellEdit', function (event) {
        $scope.datosFila=event.targetScope.row.entity;
        $scope.sumarValores();
        console.log("EVENTO",event.targetScope.row.entity);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    $scope.sumarValores();
    init();
})

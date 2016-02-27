/**
 * Created by paola on 25-09-15.
 */

app.controller('documentoPagoCtrl', function ($scope, $state, cxcService,cxpService, serverConf, $http, $modal,
                                                localStorageService,MODULES,$rootScope,menuModulo,tempCache,modalService) {

    /****************Definción de variables********************/
    $scope.facturasSeleccionadas=tempCache.listaComprasPorBancarizar;
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

    $scope.sumarValores=function () {
        var totalMontoFacturadoBs = 0.00;
        var totalMontoFacturadoSus = 0.00;
        var totalMontoPorPagarBs=0.00;
        var totalMontoPorPagarSus=0.00;

        angular.forEach($scope.facturasSeleccionadas, function (data, index) {
            totalMontoFacturadoBs = parseFloat(totalMontoFacturadoBs) + parseFloat(data.montoEmitido);
            totalMontoPorPagarBs = parseFloat(totalMontoPorPagarBs) + parseFloat(data.montoABancarizar);
        });
        $scope.totalFacturasPrimeraMoneda = totalMontoFacturadoBs.toFixed(2);
        $scope.montoTotalDocumentoPago = totalMontoPorPagarBs.toFixed(2);

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
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene listado de Bancos*/
    cxcService.getParBanco({},{},serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("pagoBancarizado: listaBancos",response.data);
        $scope.listaBancos = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene el nit de un Banco por codBanco*/
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
            $scope.listaPago.push({idFacturaEmitida:$scope.facturasSeleccionadas[i].idFacturaRetencion,
                montoPrimeraMoneda:$scope.facturasSeleccionadas[i].montoABancarizar,
                tipoDocumentoMercantil: $scope.facturasSeleccionadas[i].tipoDocumentoMercantil,
                //montoSegundaMoneda:$scope.facturasSeleccionadas[i].saldoSegundaMoneda,
                montoAcumuladoPrimeraMoneda:0,
                montoAcumuladoSegundaMoneda:0
            });
        };
        $scope.pagoFacturaPojo.listaPagoPojo=$scope.listaPago;
        $scope.pagoFacturaPojo.documentoPago.montoDocumentoPago=$scope.montoTotalDocumentoPago;
        //$scope.pagoFacturaPojo.documentoPago.montoDocumentoPagoSegMoneda=$scope.totalPorPagarSegundaMoneda;
        //$scope.pagoFacturaPojo.documentoPago=$scope.documentoPago;
        console.log(JSON.stringify($scope.pagoFacturaPojo,null,4));

        if( $scope.pagoFacturaPojo.listaPagoPojo>0);
        {
            cxpService.adicionaPagoBancarizadoCompras($scope.pagoFacturaPojo, {},serverConf.ERPCONTA_WS,function (response) {
                //exito
                console.info("pagoBancarizado Compras:grabado Pago--->>>>",response.data);
                $scope.showCustomModal({
                    headerText: "Mensaje del Sistema",
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
        $state.go('listaBancarizacionCompras');
    };

    $scope.convertirMoneda=function(monto, tipoCambio){
        //$scope.documentoPago.montoDocumentoPagoSegMoneda=($scope.documentoPago.montoDocumentoPago/$scope.documentoPago.tipoCambio).toFixed(2);
    };
    $scope.totalesTemplate='<div style="width: 86%; display: inline-block; text-align: right"><label class="control-label">MONTO TOTAL DOC. PAGO&nbsp;&nbsp;</label></div>' +
    '<div style="width: 14%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="montoTotalDocumentoPago"  ui-number-mask readonly></div>'/*+
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
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nroFacturaRetencion',
                displayName: 'N° Factura',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroAutorizacion',
                displayName: 'N° Autorización',
                width: '11%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'modalidadTransaccion',
                displayName: 'Modalidad',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'tipoTransaccion',
                displayName: 'Tipo Transacción',
                width: '16%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'montoEmitido',
                displayName: 'Monto Factura Emitida (BOB)',
                width: '14%',
                headerClass: "header-center",
                enableCellEdit:false,
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoBancarizado',
                displayName: 'Monto Bancarizado (BOB)',
                width: '14%',
                headerClass: "header-center",
                enableCellEdit:!$scope.modo.lectura,
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoABancarizar',
                displayName: 'Monto a Bancarizar (BOB)',
                width: '14%',
                headerClass: "header-center",
                enableCellEdit:!$scope.modo.lectura,
                cellClass: "text-right",
                cellTemplate:'<input type="text" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD" currency-input decimals="2"/>'
            }
        ]
    };
    angular.forEach($scope.facturasSeleccionadas,function(row){
        row.getMontoBancarizado = function(row){
            //console.log("grilla---->",this.montoProgramado-this.montoFacturado)
            return this.montoEmitido-this.montoABancarizar;
        };
    });

    $scope.$on('ngGridEventEndCellEdit', function (event) {
        $scope.datosFila=event.targetScope.row.entity;
        $scope.sumarValores();
        console.log("EVENTO",event.targetScope.row.entity);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    $scope.sumarValores();
})

/**
 * Created by paola on 22-04-15.
 */
'use strict';

app.controller('facturaComercialExportacionCtrl', function ($scope, $state, cxcService, cxpService,serverConf,
                                                            tempCache, localStorageService,modalService,cpanelService) {
    $scope.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
    $scope.fechaTipoCambio = localStorageService.get('tipoCambioObjeto').fecha;
    $scope.idDosificacionSel=tempCache.dosificacionInfo;
    var atributosPerfil =  localStorageService.get('atributosPerfil'); //Obtiene los datos del perfil

    $scope.mostrar={datosSucursal:false};
    $scope.total=0.00;
    $scope.valorBrutoBs=0.00;
    $scope.modo={
        valor:false
    };

    $scope.facturaEmitidaPojo={
        "cpcFacturaEmitida": {
            "cpcDosificacion": {
                "idDosificacion": 0,
                "cpcActividadEconomica": {
                    "idActividadEconomica": 0,
                    "codigo": "",
                    "descripcion": "",
                    "estado": ""
                }
            },
            "idPadre": 0,
            "motivo": "",
            "cpcPagoContrato":null,
            "cppProveedorCliente": {
                "idProveedorCliente": 0,
                "nit":0
            },
            "montoPrimeraMoneda": "",
            "montoSegundaMoneda": "",
            "numeroFactura": 0,
            "concepto": "",
            "codigoControl": "",
            "fechaFactura":"",
            "glosa": "",
            "parModalidadTransaccion": {
                "codigo": "CRED",
                "descripcion": ""
            },
            "transporteInternacional": 0,
            "idFacturaEmitida": 0,
            "gastosTransporte": 0,
            "seguroInternacional": 0,
            "idCbteContable": 0,
            "totalDescuentoPrimeraMoneda": 0,
            "totalDescuentoSegundaMoneda": 0,
            "parTipoTransaccion": {
                "codigo": "EXPO",
                "descripcion": ""
            },
            "parEstadoFactura": {
                "codigo": "",
                "descripcion": ""
            },
            "tipoCambioFactura":  $scope.tipoCambio,
            "incoterm": "",
            "puertoDestino": "",
            "valorBruto": 0,
            "gastosSeguro": 0,
            "totalFob": 0,
            "otrosGastos": 0,
            "icePrimeraMoneda": 0,
            "iceSegundaMoneda": 0,
            "referencia": " ",
            "parTipoDocumentoMercantil": {
                "codigo": "FACT",
                "descripcion": ""
            },
            "cuentaBancaria": {
                "idCuentaBancaria": 0
            },
            "parTipoModulo": {
                "codigo": "CPC",
                "descripcion": ""
            }
        },
        "listaCpcDetalleFactura": [
            {
                "idDetalleFactura": 0,
                "cpcItem": {
                    "idItem": 0,
                    "codigo": "",
                    "descripcion": "",
                    "precioUnitarioPrimeraMoneda": 0,
                    "precioUnitarioSegundaMoneda": 0,
                    "idCtaIngreso": 0,
                    "montoFijo": false,
                    "parTipoItem": {
                        "codigo": "",
                        "descripcion": ""
                    }
                },
                "cantidad": 0,
                "partidaArancelaria": "",
                "unidadMedida": "",
                "precioUnitarioPrimeraMoneda": 0,
                "precioUnitarioSegundaMoneda": 0,
                "porcentajeDescuento": 0,
                "descuentoPrimeraMoneda": 0,
                "descuentoSegundaMoneda": 0,
                "subtotalPrimeraMoneda": 0,
                "subtotalSegundaMoneda": 0,
                "detalleFactura": "",
                "codigo": ""
            }
        ]
    };

    $scope.datosDetalleFactura={
        "idDetalleFactura": 0,
        "cpcItem": {
            "idItem": 0,
            "codigo": "",
            "descripcion": "",
            "precioUnitarioPrimeraMoneda": 0,
            "precioUnitarioSegundaMoneda": 0,
            "idCtaIngreso": 0,
            "montoFijo": false,
            "parTipoItem": {
                "codigo": "",
                "descripcion": ""
            }
        },
        "cantidad": 0,
        "partidaArancelaria": "",
        "unidadMedida": "",
        "precioUnitarioPrimeraMoneda": 0,
        "precioUnitarioSegundaMoneda": 0,
        "porcentajeDescuento": 0,
        "descuentoPrimeraMoneda": 0,
        "descuentoSegundaMoneda": 0,
        "subtotalPrimeraMoneda": 0,
        "subtotalSegundaMoneda": 0,
        "detalleFactura": "",
        "codigo": ""
    };

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene los datos de la Empresa*/
    function obtenerEmpresaPorId(idEmpresa){
        cpanelService.getDatosEmpresaById({}, {},idEmpresa,serverConf.CPANEL_WS, function (response) {
            console.info("emisionFacturaContrato: Datos de empresa",response.data);
            $scope.datosEmpresa=response.data;
        });
    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene los datos de la Dosificacion seleccionada*/
    function obtenerDosificacionPorId(idDosificacion){
        cxcService.getCpcDosificacionesPorId({},{},idDosificacion,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("facturaComercialExportacion: DOSIFICACION",response.data);
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion=response.data;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.fechaLimiteEmision=new Date($scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.fechaLimiteEmision);

        }, function (responseError) {
            //error
        });
    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene los datos de la Casa Matriz*/
    function obtenerCasaMatriz(){
        cxcService.getCasaMatriz({}, {},0,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFactura: Casa matriz",response.data);
            $scope.sucursalCasaMatriz = response.data;
        }, function (responseError) {
            //error
        });
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene los datos de la Sucursal, si la sucursal predeterminada no es la casa matriz obtiene los datos de la casa matriz*/
    function obtenerDatosSucursal(){
        cxcService.getCpcSucursalByIdSucursal({},{},atributosPerfil['sucursalPredeterminada'],serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFacturaContrato: Sucursal preestablecida",response.data);
            //$scope.sucursal = response.data;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.cpcSucursal = response.data;
            //si la sucursal predeterminada no es la casa matriz obtener datos de la casa matriz
            if( $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.cpcSucursal .numeroSucursal>0) {
                $scope.mostrar.datosSucursal=true;
                obtenerCasaMatriz();
            }
        }, function (responseError) {
            //error
        });
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el nro correlativo de factura segun corresponda a la dosificacion*/
    function obtenerNroFacturaPorIdDosificacion(idDosificacion){
        cxcService.getNumeroFacturaPorIdDosificacion({}, {},idDosificacion,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFacturaContrato: Numero Factura",response.data);
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.numeroFactura = response.data;
        });
    };

    function init(){
        obtenerDatosSucursal();
        obtenerEmpresaPorId(1);//Obtiene los datos de la empresa
        obtenerDosificacionPorId($scope.idDosificacionSel);
        obtenerNroFacturaPorIdDosificacion( $scope.idDosificacionSel);
        if( !$scope.idDosificacionSel ) {
            $state.go('dosificacionFacturaExportacion');
            return;
        }

        /*Creado por: Paola Mejia
         Obtiene el listado de clientes y concatena con los clientes/proveedores*/
        cxcService.getListaClientes({},{},"CLI",serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFactura: Lista Clientes",response.data);
            $scope.clientes = response.data;
         /*   if($scope.listclientes)
            { cxcService.getListaClientes({},{},"AMB",serverConf.ERPCONTA_WS, function (respuesta) {
                $scope.clientes=$scope.listclientes.concat(respuesta.data);
            });}*/
        }, function (responseError) {
            //error
        });

        $scope.clienteSeleccionado = function (itemcliente) {
            var z = $('#listaclientes');
            var val = $(z).find('option[value="' + itemcliente + '"]');
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.idProveedorCliente = val.attr('data-id') || "";
            console.log("emisionFactura: clienteSeleccionado",$scope.idCliente);
            if( $scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.idProveedorCliente){
                /*Creado por: Paola Mejia
                 * Descripcion: Obtiene los datos del Cliente seleccionado por idProveedorCliente (establece su NIT)*/
                cxpService.getConceptosByProveedor({}, {}, $scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.idProveedorCliente, serverConf.ERPCONTA_WS, function (respuesta) {
                    //exito
                    console.info("dosificaccionEmisionFactura: Lista Dosificaciones",respuesta.data);
                    $scope.datosCliente = respuesta.data;
                    console.log("emisionFactura: Datos clienteSeleccionado",$scope.datosCliente);

                }, function (responseError) {
                    //error
                });
            }
        };
        grillaConceptos();
    }

    function grillaConceptos() {
        //$scope.myData = [{idServicio:'',servicio:'',partidaArancelaria: '', cantidad: 0, unidadMedida:'',precioUnitario:0.00,porcentajeDescuento:0.00,descuento:0.00,montoFactPrimeraMoneda:0.0}];

        $scope.btnOption = '<button id="buscarServicio" type="button" height="5" class="btn btn-primary" ng-click="modalBuscadorServicios(row)" style="cursor: pointer;">' +
        '<span class="glyphicon glyphicon-plus"></span></button>';

        $scope.totalesTemplate='<div style="width: 82%; display: inline-block; text-align: right"><label class="control-label">Precio o Valor Bruto:&nbsp;&nbsp;</label></div>' +
        '<div style="width: 9%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="valorBrutoBs" currency-input decimals="2"  readonly></div>' +
        '<div style="width: 9%; display: inline-block;"><input type="text" class="form-control text-right" name="valorBruto" ng-model="facturaEmitidaPojo.cpcFacturaEmitida.valorBruto"  currency-input decimals="2" required readonly></div>';

         $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
        $scope.currencySubTotalTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

        $scope.gridOptions = {
            data: 'facturaEmitidaPojo.listaCpcDetalleFactura',
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            showFooter: true,
            enableColumnResize: true,
            footerTemplate: $scope.totalesTemplate,
            footerRowHeight: 32,
            headerRowHeight:45,
            columnDefs: [
                {
                    field: 'partidaArancelaria',
                    displayName: "NANDINA",
                    width: '8%',
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass:'text-left'
                },
                {
                    field: 'codigo',
                    displayName: "Código",
                    width: '6%',
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass:'text-left'
                },
                {
                    field: 'detalleFactura',
                    displayName: "Detalle",
                    width: '22%',
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass:'text-left'
                },
                {
                    field: 'cantidad',
                    displayName: "Cant.",
                    width: '4%',
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass:'text-right'
                },
                {
                    field: 'unidadMedida',
                    displayName: "Unid. Med.",
                    width: '4%',
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass:'text-left'
                    //cellTemplate: $scope.celdaConcepto
                },
                {
                    field: 'precioUnitarioPrimeraMoneda',
                    displayName: "Precio Unitario (BOB)",
                    width: '10%',
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass:'text-right',
                    cellTemplate:$scope.currencyTemplate
                    //cellTemplate: $scope.celdaConcepto
                },
                {
                    field: "precioUnitarioSegundaMoneda",
                    displayName: "Precio Unitario (USD)",
                    width: '10%',
                    enableCellEdit:true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencyTemplate
                },
                {
                    field:'porcentajeDescuento',
                    displayName: "Desc. (%)",
                    width: '4%',
                    enableCellSelection: true,
                    enableCellEdit: true,
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "descuentoPrimeraMoneda",
                    displayName: "Descuento (BOB)",
                    width: '7%',
                    //enableCellSelection: false,
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellTemplate:$scope.currencyTemplate,
                    cellClass: "text-right"
                },
                {
                    field: "descuentoSegundaMoneda",
                    displayName: "Descuento (USD)",
                    width: '7%',
                    //enableCellSelection: true,
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellTemplate:$scope.currencyTemplate,
                    cellClass: "text-right"
                },
                {
                    field: "subtotalPrimeraMoneda",
                    displayName: "SubTotal (BOB)",
                    width: '9%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellTemplate:$scope.currencySubTotalTemplate,
                    cellClass: "text-right"
                },
                {
                    field: "subtotalSegundaMoneda",
                    displayName: "SubTotal (USD)",
                    width: '9%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencySubTotalTemplate
                }
            ]
        };

        var columnaSeleccionada = null;
        /*Creado por: Paola Mejia
         Genera los montos de la columna Dolares a partir de los valores introducidos en la columna Bolivianos,
         Genera los montos TOTALES de las columnas Bolivianos y Dolares
         Adiciona una nueva fila al perder el foco de la columna Bolivianos*/
        $scope.$on('ngGridEventEndCellEdit', function (event) {
                columnaSeleccionada = event.targetScope.col.field;
                console.log("event",event.targetScope.row);

                var datosFila = event.targetScope.row.entity,
                    cantidad = datosFila.cantidad,
                    tipoCambio = $scope.facturaEmitidaPojo.cpcFacturaEmitida.tipoCambioFactura;

                switch(columnaSeleccionada){
                    case 'precioUnitarioPrimeraMoneda':
                        datosFila.precioUnitarioSegundaMoneda = (datosFila.precioUnitarioPrimeraMoneda/tipoCambio );
                        break;
                    case 'precioUnitarioSegundaMoneda':
                        datosFila.precioUnitarioPrimeraMoneda = (datosFila.precioUnitarioSegundaMoneda * tipoCambio);
                        break;
                    default: {
                        break;
                    }
                }
                datosFila.descuentoPrimeraMoneda=(cantidad*datosFila.precioUnitarioPrimeraMoneda)*(datosFila.porcentajeDescuento/100);
                datosFila.descuentoSegundaMoneda=(cantidad*datosFila.precioUnitarioSegundaMoneda)*(datosFila.porcentajeDescuento/100);


                datosFila.subtotalPrimeraMoneda=(cantidad*datosFila.precioUnitarioPrimeraMoneda)-datosFila.descuentoPrimeraMoneda;
                datosFila.subtotalSegundaMoneda=(cantidad*datosFila.precioUnitarioSegundaMoneda)-datosFila.descuentoSegundaMoneda;

                if (!$scope.$$phase) {
                    $scope.$apply();
                }

                $scope.sumarValores();
            }
        );
    }

    $scope.formValidado = {
        inputsDeshabilitados: false
    };

    $scope.$watch('facturaEmitidaPojo.cpcFacturaEmitida.valorBruto', function(valor) {
        $scope.formValidado.inputsDeshabilitados = valor <= 0;
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.cancelarFactura=function(){
        $state.go('dosificacionFacturaExportacion');
    };
    $scope.sumarValores=function () {
        var totalBs = 0.00;
        var totalSus = 0.00;
        var totalDescPrimeraMoneda=0.00;
        var totalDescSegundaMoneda=0.00;
        console.log($scope.facturaEmitidaPojo.listaCpcDetalleFactura);

        angular.forEach($scope.facturaEmitidaPojo.listaCpcDetalleFactura, function (data, index) {
            console.log($scope.facturaEmitidaPojo.listaCpcDetalleFactura[index]);
            totalDescPrimeraMoneda=parseFloat(totalDescPrimeraMoneda)+((parseInt(data.cantidad)*parseFloat(data.precioUnitarioPrimeraMoneda))*(parseFloat(data.porcentajeDescuento)/100));
            totalDescSegundaMoneda=parseFloat(totalDescSegundaMoneda)+((parseInt(data.cantidad)*parseFloat(data.precioUnitarioSegundaMoneda))*(parseFloat(data.porcentajeDescuento)/100));

            totalBs = parseFloat(totalBs) + parseFloat(data.subtotalPrimeraMoneda);
            totalSus = parseFloat(totalSus) + parseFloat(data.subtotalSegundaMoneda);
        });
        $scope.valorBrutoBs = totalBs;
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.valorBruto = totalSus;
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoSegundaMoneda = totalSus;
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda=totalBs;
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.totalDescuentoPrimeraMoneda=totalDescPrimeraMoneda;
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.totalDescuentoSegundaMoneda=totalDescSegundaMoneda;
    };

    $scope.importarXLS = function (files) {
        if ( files && files.length ) {
            $scope.facturaEmitidaPojo.listaCpcDetalleFactura = [];

            var data = {
                tipoCambio:$scope.facturaEmitidaPojo.cpcFacturaEmitida.tipoCambioFactura
            };
            cxcService.excelImport(files[files.length-1], 'xls', serverConf.ERPCONTA_WS, data, function( response ) {
                var xls = response.data,
                  row;
                console.log(response.data);
                for( var i = 0; i < xls.length; i++ ) {
                    row = xls[i];
                    if( ! $.isEmptyObject(row) ) {
                        $scope.facturaEmitidaPojo.listaCpcDetalleFactura.push({
                            partidaArancelaria:row.partidaArancelaria,
                            codigo:row.codigo,
                            detalleFactura:row.detalleFactura,
                            cantidad: row.cantidad,
                            unidadMedida:row.unidadMedida,
                            precioUnitarioPrimeraMoneda: row.precioUnitarioPrimeraMoneda,
                            precioUnitarioSegundaMoneda: row.precioUnitarioSegundaMoneda,
                            subtotalPrimeraMoneda: row.subtotalPrimeraMoneda,
                            subtotalSegundaMoneda: row.subtotalSegundaMoneda,
                            porcentajeDescuento:row.porcentajeDescuento,
                            descuentoPrimeraMoneda:row.descuentoPrimeraMoneda,
                            descuentoSegundaMoneda:row.descuentoSegundaMoneda
                        })
                    }
                }
                $scope.sumarValores();
                $scope.calcularTotalFOB();
            });
        }
    };

    init();
    function generarCodigoControl(){
        $scope.datosCodigoControl={
            nit:$scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.nit,
            numeroFactura:$scope.facturaEmitidaPojo.cpcFacturaEmitida.numeroFactura,
            numeroAutorizacion:$scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.numeroAutorizacion,
            fechaFactura: new Date($scope.facturaEmitidaPojo.cpcFacturaEmitida.fechaFactura),
            monto: $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda,
            llaveDosificacion:$scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.llaveDosificacion
        };

        console.log("Datos enviados CODIGO CONTROL",$scope.datosCodigoControl);
        /* Creado por: Paola Mejia
         *Descripcion: Obtiene el codigo de control*/
        cxcService.getCodigoControlFactura($scope.datosCodigoControl, {}, serverConf.ERPCONTA_WS,function (response) {
            //exito
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl=response.data.codigoControl;
            console.log("Codigo Control generado:", $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl);
            adicionaFactura($scope.facturaEmitidaPojo);
        }, function (responseError) {
            //error
        });
    };
    function adicionaFactura(factura){
        cxcService.adicionaFacturaEmitida(factura, {},serverConf.ERPCONTA_WS,function (response) {
            //exito
            $scope.facturaGrabada = response.data;
            $scope.modo.valor=true;
            $scope.showCustomModal({
                headerText: "Mensaje de Confirmación",
                bodyText: "La Factura Comercial de Exportación se guardó correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });
            console.log("Factura Grabada----",$scope.facturaGrabada);
        });
    };
    $scope.calcularTotalFOB=function(){
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.totalFob=parseFloat($scope.facturaEmitidaPojo.cpcFacturaEmitida.valorBruto)+
                                                             parseFloat($scope.facturaEmitidaPojo.cpcFacturaEmitida.gastosTransporte)+
                                                             parseFloat($scope.facturaEmitidaPojo.cpcFacturaEmitida.gastosSeguro);


    }
    $scope.calcularTotal=function(){
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoSegundaMoneda=parseFloat($scope.facturaEmitidaPojo.cpcFacturaEmitida.totalFob)+
        parseFloat($scope.facturaEmitidaPojo.cpcFacturaEmitida.transporteInternacional)+
        parseFloat($scope.facturaEmitidaPojo.cpcFacturaEmitida.seguroInternacional)+
        parseFloat($scope.facturaEmitidaPojo.cpcFacturaEmitida.otrosGastos);
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda= ($scope.facturaEmitidaPojo.cpcFacturaEmitida.montoSegundaMoneda*$scope.tipoCambio).toFixed(2);
    }
    $scope.guardarFactura=function(){
        generarCodigoControl();
        console.log(JSON.stringify($scope.facturaEmitidaPojo,null,4));

    };

    $scope.visualizarPDF = function() {
        $state.go('facturaExportacion',{idFacturaEmitida:$scope.facturaGrabada.idFactura});
    }
});
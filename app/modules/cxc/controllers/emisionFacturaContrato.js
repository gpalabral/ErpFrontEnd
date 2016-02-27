/**
 * Created by paola on 24-04-15.
 */
'use strict';

app.controller('emisionFacturaContratoCtrl', function ($rootScope,$scope, $state, cxcService, cxpService,serverConf, tempCache,
                                               localStorageService, modalService, qr_generator, detalleFacturaGridModel,cpanelService) {
    $scope.tipoCobroFactura=tempCache.tipoCobroFactura;
    //console.log("EMISION/REGISTRO FACTURA POR CONTRATO", $scope.tipoCobroFactura);
    $scope.idPagoContrato=tempCache.pagoContratoInfo;//dato obtenido de cobrosPorFacturar
    $scope.idDosificacion=tempCache.idDosificacionPorContrato;//datos obtenido del modal de dosificaciones por contrato
    $scope.idContrato=tempCache.temp_idContrato;
    $scope.tipoCambio =  localStorageService.get('tipoCambioObjeto').tipoCambio;
    $scope.fechaTipoCambio =  localStorageService.get('tipoCambioObjeto').fecha;
    var atributosPerfil =  localStorageService.get('atributosPerfil'); //Obtiene los datos del perfil
    var detalleFactura = new detalleFacturaGridModel()

    $scope.modo={
        valor:false,
        moneda:false,
        mostrar:true,
        codControl:false
    };
    $scope.mostrar={datosSucursal:false};

    $scope.datosDetalleFactura=[{
        "cpcItem": {
            "codigo": "",
            "descripcion": "",
            "idItem": 0,
            "precioUnitarioPrimeraMoneda": 0,
            "precioUnitarioSegundaMoneda": 0,
            "idCtaIngreso": 0,
            "montoFijo": false
        },
        "precioUnitarioPrimeraMoneda": 0,
        "precioUnitarioSegundaMoneda": 0,
        "idDetalleFactura": 0,
        "partidaArancelaria": "",
        "porcentajeDescuento": 0,
        "detalleFactura": "",
        "cantidad": 1,
        "unidadMedida": "",
        "subtotalSegundaMoneda": 0,
        "subtotalPrimeraMoneda": 0
    }];
    $scope.facturaEmitidaPojo={
        "listaCpcDetalleFactura": [
            {
                "precioUnitarioPrimeraMoneda": 0,
                "precioUnitarioSegundaMoneda": 0,
                "cpcItem": {
                    "codigo": "",
                    "descripcion": "",
                    "precioUnitarioPrimeraMoneda": 0,
                    "precioUnitarioSegundaMoneda": 0,
                    "idItem": 0,
                    "idCtaIngreso": 0,
                    "montoFijo": false
                },
                "cpcFacturaEmitida": null,
                "cantidad": 0,
                "unidadMedida": "",
                "idDetalleFactura": 0,
                "partidaArancelaria": "",
                "porcentajeDescuento": 0,
                "descuentoPrimeraMoneda": 0,
                "descuentoSegundaMoneda": 0,
                "subtotalPrimeraMoneda": 0,
                "subtotalSegundaMoneda": 0,
                "detalleFactura": ""
            }
        ],
        "cpcFacturaEmitida": {
            "glosa": "",
            "numeroFactura": 0,
            "concepto": "",
            "codigoControl": "",
            "fechaFactura": "",
            "cpcDosificacion": {
                "idDosificacion": 0,
                "cpcSucursal": {
                    "codigo": "",
                    "descripcion": "",
                    "direccion": "",
                    "idSucursal": 0,
                    "numeroSucursal": 0,
                    "telefonoUno": "",
                    "telefonoDos": "",
                    "parEstado": {
                        "codigo": "",
                        "descripcion": ""
                    },
                    "emiteFactura": false,
                    "parMunicipio": {
                        "grupo": "",
                        "codigo": "",
                        "descripcion": ""
                    },
                    "nombreLocalizacion": "",
                    "parDepartamento": {
                        "codigo": "",
                        "descripcion": ""
                    },
                    "parLocalizacion": {
                        "codigo": "",
                        "descripcion": ""
                    }
                },
                "llaveDosificacion": "",
                "numeroFacturaInicial": 0,
                "numeroAutorizacion": 0,
                "parEstadoProceso": {
                    "codigo": "",
                    "descripcion": ""
                },
                "parCaracteristicaEspecial": {
                    "codigo": "",
                    "descripcion": ""
                },
                "parModalidadFacturacion": {
                    "codigo": "",
                    "descripcion": ""
                },
                "numeroFacturaFinal": 0,
                "fechaLimiteEmision": "",
                "cpcActividadEconomica": {
                    "idActividadEconomica": 0,
                    "codigo": "",
                    "descripcion": "",
                    "estado": ""
                },
                "fechaActivacion": "",
                "fechaSolicitud": ""
            },
            "cpcPagoContrato": {
                "montoFacturadoSegMoneda": 0,
                "cpcContrato": {
                    "tipoCambio": 0,
                    "cpcSucursal": null,
                    "idContrato": 0,
                    "nroContrato": "",
                    "cppProveedorCliente": null,
                    "nroContratoCliente": "",
                    "montoPrimeraMoneda": 0,
                    "montoSegundaMoneda": 0,
                    "fechaContrato": "",
                    "nroCuotas": 0,
                    "fechaVigenciaInicio": "",
                    "fechaVigenciaFin": ""
                },
                "nroPago": 0,
                "montoProgramado": 0,
                "montoFacturado": 0,
                "idPagoContrato": 0,
                "fechaProgramada": "",
                "montoProgramadoSegMoneda": 0,
                "parEstadoPago": {
                    "codigo": "",
                    "descripcion": ""
                },
                "descripcionPago": "",
                "porcentajeProgramado": 0,
                "porcentajeFacturado": 0
            },
            "cppProveedorCliente": {
                "nombre": "",
                "nit": 0,
                "logo": "",
                "correoElectronico": "",
                "parTipoDocumento": {
                    "codigo": "",
                    "descripcion": ""
                },
                "razonSocial": "",
                "direccion": "",
                "parTipoProveedorCliente": {
                    "codigo": "",
                    "descripcion": ""
                },
                "sigla": "",
                "idProveedorCliente": 0,
                "parTipoRegistro": {
                    "codigo": "",
                    "descripcion": ""
                },
                "primerApellido": "",
                "segundoApellido": "",
                "numeroDocumento": "",
                "telefonoUno": "",
                "telefonoDos": "",
                "numeroFax": "",
                "numeroCelular": "",
                "direccionWeb": "",
                "parEstado": {
                    "codigo": "",
                    "descripcion": ""
                },
                "fechaAniversario": ""
            },
            "montoPrimeraMoneda": 0,
            "montoSegundaMoneda": 0,
            "transporteInternacional": 0,
            "parModalidadTransaccion": {
                "codigo": "CONT",
                "descripcion": ""
            },
            "totalDescuentoPrimeraMoneda": 0,
            "totalDescuentoSegundaMoneda": 0,
            "incoterm": "",
            "puertoDestino": "",
            "valorBruto": 0,
            "gastosSeguro": 0,
            "totalFob": 0,
            "otrosGastos": 0,
            "idFacturaEmitida": 0,
            "gastosTransporte": 0,
            "seguroInternacional": 0,
            "idCbteContable": 0,
            "parTipoTransaccion": {
                "codigo": "VENT",
                "descripcion": ""
            },
            "parEstadoFactura": {
                "codigo": "",
                "descripcion": ""
            },
            "tipoCambioFactura": $scope.tipoCambio,
            "icePrimeraMoneda": 0,
            "iceSegundaMoneda": 0,
            "parTipoDocumentoMercantil": {
                "codigo": "FACT",
                "descripcion": ""
            },
            "nroFacturaInterno": "",
            "fechaAceptacion": "",
            "referencia": " ",
            "cuentaBancaria": {
                "idCuentaBancaria": 0
            },
            "parTipoModulo": {
                "codigo": "CPC",
                "descripcion": ""
            }
        }
    };

    /*Creado por: Paola Mejia
     * Descripcion: Recalcula los montos del detalle de la factura*/
    $scope.calcularPorTipoCambio=function(nuevoTipoCambio){
        if(nuevoTipoCambio){
            angular.forEach($scope.datosDetalleFactura, function (data, index) {
                data.precioUnitarioPrimeraMoneda=parseFloat(data.precioUnitarioPrimeraMoneda);
                data.precioUnitarioSegundaMoneda=(data.precioUnitarioPrimeraMoneda/nuevoTipoCambio);

                data.descuentoPrimeraMoneda=((data.cantidad*data.precioUnitarioPrimeraMoneda)*(data.porcentajeDescuento/100));
                data.descuentoSegundaMoneda=((data.cantidad*data.precioUnitarioSegundaMoneda)*(data.porcentajeDescuento/100));

                data.subtotalPrimeraMoneda = parseFloat(data.subtotalPrimeraMoneda);
                data.subtotalPrimeraMoneda=(data.cantidad* data.precioUnitarioPrimeraMoneda)-data.descuentoPrimeraMoneda;

                data.subtotalSegundaMoneda=(data.subtotalPrimeraMoneda/nuevoTipoCambio);
                data.subtotalSegundaMoneda = parseFloat(data.subtotalSegundaMoneda)-data.descuentoSegundaMoneda;
            });
            $scope.sumarValores();
        }
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
    }
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
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene los datos de la Dosificacion por su id*/
    function obtenerDosificacionPorId(idDosificacion){
        cxcService.getCpcDosificacionesPorId({}, {},idDosificacion,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFacturaContrato: datos Dosificacion",response.data);
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion=response.data;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.fechaLimiteEmision=new Date( $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.fechaLimiteEmision);
        });
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
     *Descripcion: Obtiene datos del contrato*/
    function obtenerDatosContratoPorId(idContrato){
        cxcService.getCpcContratoByIdContrato({}, {}, idContrato,serverConf.ERPCONTA_WS, function (response) {
            console.info("emisionFacturaContrato: Datos contrato",response.data);
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato = response.data;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.idProveedorCliente=$scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.cppProveedorCliente.idProveedorCliente;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cuentaBancaria.idCuentaBancaria=$scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.cuentaBancaria.idCuentaBancaria;
            if($scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.parTipoMoneda.codigo=="BOL"){
                $scope.modo.moneda=true;
            }
            obtenerCtasBancariasEmpresa();
        });
    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene datos del pago-contrato*/
    function obtenerDatosPagoContrato(idPagoContrato,items){
        cxcService.getPagoContratoById({}, {},idPagoContrato,serverConf.ERPCONTA_WS, function (response) {
            console.info("emisionFacturaContrato: Datos pago contrato",response.data);
            $scope.datosPagoContrato = response.data;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.idPagoContrato=$scope.datosPagoContrato.cpcPagoContrato.idPagoContrato;
            $scope.montoPrimeraMoneda=0;
            $scope.montoSegundaMoneda=0;
            if($scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.parTipoMoneda.codigo=="BOL") {
                $scope.montoPrimeraMoneda = ($scope.datosPagoContrato.cpcPagoContrato.montoProgramado - $scope.datosPagoContrato.cpcPagoContrato.montoFacturado);
                $scope.montoSegundaMoneda = $scope.montoPrimeraMoneda/$scope.tipoCambio;
            }else{
                $scope.montoSegundaMoneda = ($scope.datosPagoContrato.cpcPagoContrato.montoProgramadoSegMoneda - $scope.datosPagoContrato.cpcPagoContrato.montoFacturadoSegMoneda);
                $scope.montoPrimeraMoneda = $scope.montoSegundaMoneda*$scope.tipoCambio;
            }

            //Lista para el Detalle de la factura y sus totales
            $scope.datosDetalleFactura=[{
                "cpcItem": {
                    "idItem": 0
                },
                "precioUnitarioPrimeraMoneda": $scope.montoPrimeraMoneda,
                "precioUnitarioSegundaMoneda": $scope.montoSegundaMoneda,
                "idDetalleFactura": 0,
                "partidaArancelaria": "",
                "porcentajeDescuento": 0,
                "descuentoPrimeraMoneda": 0,
                "descuentoSegundaMoneda": 0,
                "detalleFactura": $scope.datosPagoContrato.cpcPagoContrato.descripcionPago+" "+ items,
                "cantidad": 1,
                "unidadMedida": "",
                "subtotalSegundaMoneda": $scope.montoSegundaMoneda,
                "subtotalPrimeraMoneda": $scope.montoPrimeraMoneda
            }];
            console.log("DATOS PARA EL DETALLE", $scope.datosDetalleFactura);

            //$scope.adicionaDetalle();
            $scope.sumarValores();
        }, function (responseError) {
            //error
        });
    };
    /*Creado por: Paola Mejia
    *Descripcion: Obtiene y genera el detalle de la factura*/
    function obtenerDatosDetalleFactura(idContrato) {
       //Concatena los items del contrato
        cxcService.getItemsPorContrato({}, {}, idContrato, serverConf.ERPCONTA_WS, function (response) {
            console.info("emisionFacturaContrato: Lista Items por idContrato",response.data);
            $scope.listaItemsPorContrato = response.data;
            $scope.itemsContatenados="";
            for(var i=0;i<$scope.listaItemsPorContrato.length;i++){
                $scope.itemsContatenados=$scope.itemsContatenados+" "+$scope.listaItemsPorContrato[i].descripcion;
            }
            //Obtiene datos del pago para setear el detalle
            obtenerDatosPagoContrato($scope.idPagoContrato,$scope.itemsContatenados);

        }, function (responseError) {
            //error
        });

    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene lista de nros de cuentas*/
    function obtenerCtasBancariasEmpresa(){
        cxcService.getListaCtaBancariaEmpresa({}, {},"EMP", serverConf.ERPCONTA_WS, function (respuesta) {
            //var idCuenta=$scope.facturaEmitidaPojo.cpcFacturaEmitida.cuentaBancaria.idCuentaBancaria;
            $scope.listaCuentas=respuesta.data;
            /*for(var i=0;i<=$scope.listaCuentas.length;i++)
            {
                if($scope.listaCuentas[i].idCuentaBancaria==idCuenta){
                    $scope.facturaEmitidaPojo.cpcFacturaEmitida.cuentaBancaria=$scope.listaCuentas[i];
                    break;
                }
            }*/
            console.log("LISTA CUENTAS",$scope.listaCuentas);
        });
    };

    function init(){
        obtenerDatosSucursal();
        obtenerDosificacionPorId( $scope.idDosificacion);
        obtenerNroFacturaPorIdDosificacion( $scope.idDosificacion);
        obtenerEmpresaPorId(1);//Obtiene los datos de la empresa
        obtenerDatosContratoPorId($scope.idContrato);//Obtiene datos del contrato nroContrato, nroContratoCliente
        obtenerDatosDetalleFactura($scope.idContrato);
        //obtenerCtasBancariasEmpresa();
        if(!$scope.idDosificacion) {
            $state.go('panelCobrosPorFacturar');
            return;
        }
    }
    grillaConceptos();

    $scope.generarCodigoControl=function(){

        $scope.datosCodigoControl={
            nit:$scope.datosPagoContrato.cpcPagoContrato.cpcContrato.cppProveedorCliente.nit,
            numeroFactura:$scope.facturaEmitidaPojo.cpcFacturaEmitida.numeroFactura,
            numeroAutorizacion:  $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.numeroAutorizacion,
            fechaFactura: new Date($scope.facturaEmitidaPojo.cpcFacturaEmitida.fechaFactura),
            monto: $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda,
            llaveDosificacion:  $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.llaveDosificacion
        };
        console.log("Datos enviados CODIGO CONTROL",$scope.datosCodigoControl);
        /* Creado por: Paola Mejia
         *Descripcion: Obtiene el codigo de control*/
        cxcService.getCodigoControlFactura($scope.datosCodigoControl, {}, serverConf.ERPCONTA_WS,function (response) {
            console.info("Emision Factura:Codigo Control--->>>>",response.data);
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl=response.data.codigoControl;
        }, function (responseError) {
            //error
        });
    };

    $scope.limpiarFila = function (row) {
        var index = row.rowIndex;
        $scope.gridOptions.selectItem(index, false);
        $scope.datosDetalleFactura.splice(index, 1);

        $scope.sumarValores();
    };
    function convertirSegundaMoneda(columna){
        console.log("COLUMNA SELECCIONADA",columna);
    };

    function grillaConceptos() {
        $scope.datosDetalleFactura=[{
                "cpcItem": {
                "codigo": "",
                "descripcion": "",
                "idItem": 0,
                "precioUnitarioPrimeraMoneda": 0,
                "precioUnitarioSegundaMoneda": 0,
                "idCtaIngreso": 0,
                "montoFijo": false
            },
            "precioUnitarioPrimeraMoneda": 0,
            "precioUnitarioSegundaMoneda": 0,
            "idDetalleFactura": 0,
            "partidaArancelaria": "",
            "porcentajeDescuento": 0,
            "descuentoPrimeraMoneda": 0,
            "descuentoSegundaMoneda": 0,
            "detalleFactura": "",
            "cantidad": 0,
            "unidadMedida": "",
            "subtotalSegundaMoneda": 0,
            "subtotalPrimeraMoneda": 0
        }];

        $scope.totalesTemplate='<div style="width: 80%; display: inline-block; text-align: right"><label class="control-label">TOTAL&nbsp;&nbsp;</label></div>' +
        '<div style="width: 10%; display: inline-block;"><input type="text" class="form-control text-right" style="font-size: small" ng-model="facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda"  currency-input decimals="2" disabled></div>' +
        '<div style="width: 10%; display: inline-block;"><input type="text" class="form-control text-right" style="font-size: small" ng-model="facturaEmitidaPojo.cpcFacturaEmitida.montoSegundaMoneda"  currency-input decimals="2" disabled></div>';/*+
        '<div style="width: 80%; display: inline-block; text-align: right"><label class="control-label">SALDO&nbsp;&nbsp;</label></div>' +
        '<div style="width: 10%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="facturaEmitida.montoPrimeraMoneda"  disabled></div>' +
        '<div style="width: 10%; display: inline-block;"><input type="text" class="form-control text-right" ng-model="facturaEmitida.montoSegundaMoneda"  disabled></div>';

  */      var dismissTemplate = '<div class="pull-left ngCellText" style="width: 80%">{{row.getProperty(\'detalleFactura\')}}</div>' +
            '<i ng-if="row.getProperty(\'detalleFactura\')" ng-click="limpiarFila(row);$event.stopPropagation();" class="fa fa-times pull-right" style="width: auto;margin: 10px"></i>';

        $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
        $scope.currencySubTotalTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

        $scope.headerPlantilla='<div class="ngHeaderSortColumn ngCellText {{col.headerClass}}"><span ng-cell-text="" class="ng-binding">'+
        '<div><button type="button" class="btn btn-default btn-sm" ng-click="modalBuscadorServicios()" ng-if="!modo.valor">'+
        '<span class="glyphicon glyphicon-plus"></span></button></div></span></div>';

        $scope.btnOpciones='<div align="center" class="ngCellText ng-scope col0 colt0" ng-class="col.colIndex()">'+
        '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="limpiarFila(row);$event.stopPropagation();" ng-disabled="modo.valor">'+
        '<span class="glyphicon glyphicon-minus"></span></button>'+
        '</span></div>';

        $scope.gridOptions = {
            data: 'datosDetalleFactura',
            enableRowSelection: false,
            showFooter: true,
            enableColumnResize: true,
            footerTemplate: $scope.totalesTemplate,
            footerRowHeight: 32,
            rowHeight: 32,
            headerRowHeight:45,
            columnDefs: [
                {   field:'', displayName: '',
                    width: '4%',
                    sortable: false,
                    enableCellEdit: false,
                    resizable: false,
                    cellTemplate:$scope.btnOpciones,
                    headerCellTemplate:  $scope.headerPlantilla
                },
                {
                    field: 'detalleFactura',
                    displayName: "Detalle",
                    width: '31%',
                    headerClass: "header-center",
                    cellClass:'text-left',
                    cellTemplate:'<input type="text" class="form-control text-left" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="modo.valor" required/>'
                },
                {
                    field: 'cantidad',
                    displayName: "Cant.",
                    width: '5%',
                    enableCellSelection: true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="number" min="0" step="1" class="form-control text-right" style="font-size: 100%" ' +
                    'ng-input="COL_FIELD" ng-model="COL_FIELD" ng-disabled="modo.valor" required/>'
                },
                {
                    field: "precioUnitarioPrimeraMoneda",
                    displayName: "Precio Unitario (BOB)",
                    width: '10%',
                    enableCellSelection: true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="text" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" currency-input decimals="5" ng-readonly="!modo.valor" ng-disabled="!modo.moneda ? \'disabled\' : \'\'" required/>'
                },
                {
                    field: "precioUnitarioSegundaMoneda",
                    displayName: "Precio Unitario (USD)",
                    width: '10%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="text" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD"  currency-input decimals="5" ng-disabled="modo.moneda ? \'disabled\' : \'\'" required/>'
                },
                {
                    field: "porcentajeDescuento",
                    displayName: "Descuento (%)",
                    width: '6%',
                    enableCellSelection: true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="number"  min="0" step="1" max="100" class="form-control text-right" style="font-size: 100%" ' +
                    'ng-input="COL_FIELD" ng-model="COL_FIELD" ng-disabled="modo.valor"/>'
                },
                {
                    field: "descuentoPrimeraMoneda",
                    displayName: "Desc. (BOB)",
                    width: '7%',
                    enableCellSelection: true,
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellTemplate:$scope.currencyTemplate,
                    cellClass: "text-right"
                },
                {
                    field: "descuentoSegundaMoneda",
                    displayName: "Descuento (USD)",
                    width: '7%',
                    enableCellSelection: true,
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellTemplate:$scope.currencyTemplate,
                    cellClass: "text-right"
                },
                {
                    field: "subtotalPrimeraMoneda",
                    displayName: "SubTotal (BOB)",
                    width: '10%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencySubTotalTemplate
                },
                {
                    field: "subtotalSegundaMoneda",
                    displayName: "SubTotal (USD)",
                    width: '10%',
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencySubTotalTemplate
                }
            ]
        };

        $scope.sumarValores=function () {
            var totalBs = 0.00;
            var totalSus = 0.00;
            var totalDescPrimeraMoneda=0.00;
            var totalDescSegundaMoneda=0.00;

            angular.forEach($scope.datosDetalleFactura, function (data, index) {
                totalDescPrimeraMoneda=parseFloat(totalDescPrimeraMoneda)+((parseInt(data.cantidad)*parseFloat(data.precioUnitarioPrimeraMoneda))*(parseFloat(data.porcentajeDescuento)/100));
                totalDescSegundaMoneda=parseFloat(totalDescSegundaMoneda)+((parseInt(data.cantidad)*parseFloat(data.precioUnitarioSegundaMoneda))*(parseFloat(data.porcentajeDescuento)/100));

                totalBs = parseFloat(totalBs) + parseFloat(data.subtotalPrimeraMoneda);
                totalSus = parseFloat(totalSus) + parseFloat(data.subtotalSegundaMoneda);
            });
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda = totalBs;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoSegundaMoneda = totalSus;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.totalDescuentoPrimeraMoneda=totalDescPrimeraMoneda;
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.totalDescuentoSegundaMoneda=totalDescSegundaMoneda;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        function obtenerDatosItem(idItem){
            cxcService.getCpcItemByIdItem({},{},idItem, serverConf.ERPCONTA_WS, function (response) {
                //exito
                $scope.datosItem = response.data;

                $scope.datosDetalleFactura.push({
                    "cpcItem": {
                        "idItem": $scope.datosItem.idItem
                    },
                    "precioUnitarioPrimeraMoneda": $scope.datosItem.precioUnitarioPrimeraMoneda,
                    "precioUnitarioSegundaMoneda": $scope.datosItem.precioUnitarioSegundaMoneda,
                    "idDetalleFactura": 0,
                    "partidaArancelaria": "",
                    "porcentajeDescuento": 0,
                    "descuentoPrimeraMoneda": 0,
                    "descuentoSegundaMoneda": 0,
                    "detalleFactura": $scope.datosItem.descripcion,
                    "cantidad": 1,
                    "unidadMedida": "",
                    "subtotalSegundaMoneda": $scope.datosItem.precioUnitarioSegundaMoneda,
                    "subtotalPrimeraMoneda": $scope.datosItem.precioUnitarioPrimeraMoneda
                });

                $scope.sumarValores();

            }, function (responseError) {
                //error
            });
        };
        /*Creado por: Paola Mejia
         * Descripcion: Muestra el modal para seleccionar un servicio, y lo adiciona al grid*/
        $scope.modalBuscadorServicios = function () {

            var modalConceptos = modalService.show(
                {
                    templateUrl: 'modules/cxc/views/buscadorServicios.html',
                    controller: 'buscadorServiciosCtrl',
                    size: 'md'
                }, {
                    idContrato: $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.idContrato
                }
            ).then(function (respuesta) {
                    var respModalIdItem = respuesta.respModal.idEntidadPojo;
                    console.log("buscadorServicios:Respuesta del Modal===", respModalIdItem);
                    //Obtener datos del item
                    obtenerDatosItem(respModalIdItem);
                });
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        var columnaSeleccionada = null;
        /*Creado por: Paola Mejia
         Genera los montos de la columna Dolares a partir de los valores introducidos en la columna Bolivianos,
         Genera los montos TOTALES de las columnas Bolivianos y Dolares
         Adiciona una nueva fila al perder el foco de la columna Bolivianos*/
        $scope.$on('ngGridEventEndCellEdit', function (event) {
                console.log("event",event.targetScope.row);
                columnaSeleccionada = event.targetScope.col.field;
                var datosFila = event.targetScope.row.entity,
                    cantidad = datosFila.cantidad,
                    tipoCambio = $scope.facturaEmitidaPojo.cpcFacturaEmitida.tipoCambioFactura;

                switch(columnaSeleccionada){
                    case 'precioUnitarioPrimeraMoneda':
                        datosFila.precioUnitarioSegundaMoneda = (datosFila.precioUnitarioPrimeraMoneda/tipoCambio);
                        break;
                    case 'precioUnitarioSegundaMoneda':
                        datosFila.precioUnitarioPrimeraMoneda = (datosFila.precioUnitarioSegundaMoneda * tipoCambio );
                        break;
                    default: {
                        break;
                    }
                }
                datosFila.descuentoPrimeraMoneda=(cantidad*datosFila.precioUnitarioPrimeraMoneda)*(datosFila.porcentajeDescuento/100);
                datosFila.descuentoSegundaMoneda=(cantidad*datosFila.precioUnitarioSegundaMoneda)*(datosFila.porcentajeDescuento/100);

                datosFila.subtotalPrimeraMoneda=(cantidad*datosFila.precioUnitarioPrimeraMoneda)-datosFila.descuentoPrimeraMoneda;
                datosFila.subtotalSegundaMoneda=(cantidad*datosFila.precioUnitarioSegundaMoneda)-datosFila.descuentoSegundaMoneda;

                $scope.sumarValores();
            }
        );

        $scope.$on('ngGridEventStartCellEdit', function (event) {
            columnaSeleccionada = event.targetScope.col.field;
            console.log("Columna seleccionada------",columnaSeleccionada);
        });
    }

    init();


    function convertirFecha( fechaOrigen) {

        var fechadias;
        var anio = fechaOrigen.getFullYear();
        var mes = fechaOrigen.getMonth() + 1;
        var dia = fechaOrigen.getDate();

        if (mes.toString().length < 2) {
            mes = "0".concat(mes);
        }

        if (dia.toString().length < 2) {
            dia = "0".concat(dia);
        }
        fechadias = dia + "/" + mes + "/" + anio;

        return fechadias;
    }

    $scope.cancelarFacturaEmitida=function(){
        $state.go('panelCobrosPorFacturar');
    };

    var generarPojoGuardar=function(){
        //$scope.datosDetalleFactura.pop();
        console.log("INDICE",$scope.datosDetalleFactura.length);
        $scope.facturaEmitidaPojo.listaCpcDetalleFactura=$scope.datosDetalleFactura;
        console.log("DATOS PARA GUARDAR::::::",$scope.facturaEmitidaPojo);
        console.log(JSON.stringify($scope.facturaEmitidaPojo,null,4));

        if ( ! detalleFactura.validate( { "datosDetalleFactura": $scope.datosDetalleFactura } ) ) {
            $scope.showCustomModal({
                headerText: "Error Modal",
                bodyText: "Existen campos vacios, verifique porfavor.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 3000
            });
            $scope.adicionaDetalle();
            return;
        }

        /*Descripcion: Adiciona la factura establece el formulario en modo lectura*/
        cxcService.adicionaFacturaEmitida($scope.facturaEmitidaPojo, {},serverConf.ERPCONTA_WS,function (response) {
            //exito
            $scope.facturaGrabada=response.data;
            console.log("DATOS DEL GRID",$scope.gridOptions);
            $scope.modo.valor=true;//mostrar boton Enviar/Imprimir
            $scope.modo.mostrar=false;//no mostrar boton Guardar
            //Datos adicionales detalle de la factura
            $scope.numContratoCliente="OC:"+$scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.nroContratoCliente;
            $scope.nroContrato="CONTRATO HUAWEI:"+$scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.nroContrato;
            if($scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcPagoContrato.cpcContrato.parTipoMoneda.codigo=="SUS") {
                $scope.importeUSD = "Importe en USD:" + $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoSegundaMoneda;
                $scope.tasaCambio = "Tasa de Cambio (Bs/USD):" + $scope.facturaEmitidaPojo.cpcFacturaEmitida.tipoCambioFactura;
            }
            $scope.showCustomModal({
                headerText: "Mensaje de Confirmación",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });

            console.info("Emision Factura:grabado Factura--->>>>",$scope.facturaGrabada);
            if($scope.tipoCobroFactura=="EMITIR")
            {   $scope.modo.codControl=true;
                //GENERACION CODIGO QR
                //Convierte la fecha de la emision de la factura en cadena formato dd/mm/aaaa
                $scope.fechaCadena=convertirFecha(new Date($scope.facturaGrabada.fechaFactura));

                $scope.mensaje=$scope.datosEmpresa.nit+'|'+$scope.facturaGrabada.numeroFactura+
                '|'+$scope.datosCodigoControl.numeroAutorizacion+'|'+$scope.fechaCadena+
                '|'+$scope.facturaGrabada.montoPrimeraMoneda+'|'+$scope.facturaGrabada.montoPrimeraMoneda+
                '|'+$scope.facturaGrabada.codigoControl+
                '|'+$scope.datosCodigoControl.nit+
                '|'+0+'|'+0+'|'+0+'|'+0;
                console.log("Cadena enviada",$scope.mensaje);
                qr_generator.generar_qrcode($scope.mensaje,'qr');
            }else    {$scope.modo.mostrar=false;}

        }, function (responseError) {
            //error
        });
    };
    $scope.guardarFacturaEmitida=function(){
        if($scope.tipoCobroFactura=="EMITIR")
        {   $scope.modo.codControl=true;
            //$scope.generarCodigoControl();
            $scope.datosCodigoControl={
                nit:$scope.datosPagoContrato.cpcPagoContrato.cpcContrato.cppProveedorCliente.nit,
                numeroFactura:$scope.facturaEmitidaPojo.cpcFacturaEmitida.numeroFactura,
                numeroAutorizacion:  $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.numeroAutorizacion,
                fechaFactura: new Date($scope.facturaEmitidaPojo.cpcFacturaEmitida.fechaFactura),
                monto: $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda,
                llaveDosificacion: $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.llaveDosificacion
            };

            //$scope.datosDetalleFactura.pop();
            if ( ! detalleFactura.validate( { "datosDetalleFactura": $scope.datosDetalleFactura } ) ) {
                $scope.showCustomModal({
                    headerText: "Mensaje de Validación",
                    bodyText: "Existen campos vacios o invalidos en el detalle de la factura, verifique por favor...",
                    actionButtonText: "Aceptar",
                    type: 'error',
                    closeAfter: 3000
                });
                return;
            }

            console.log("Datos enviados CODIGO CONTROL",$scope.datosCodigoControl);
            /* Creado por: Paola Mejia
             *Descripcion: Obtiene el codigo de control*/
            cxcService.getCodigoControlFactura($scope.datosCodigoControl, {}, serverConf.ERPCONTA_WS,function (response) {
                console.info("Emision Factura:Codigo Control--->>>>",response.data);
                $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl=response.data.codigoControl;
                generarPojoGuardar();
                console.log("Codigo Control generado:", $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl);
                //generacionQR();
            }, function (responseError) {
                //error
            });
        }else  generarPojoGuardar();
     };

    $scope.visualizarPdf=function(){
        $state.go('facturaViewer',{idFacturaEmitida:$scope.facturaGrabada.idFactura});
    };

    function downloadInnerHtml(filename, text, mimeType) {
        var elHtml = text;
        var link = document.createElement('a');
        mimeType = mimeType || 'text/plain';

        link.setAttribute('download', filename);
        link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
        link.click();
    }

    $scope.exportarXML = function() {
        var nombreArchivo = 'factura.xml';
        cxcService.getXML($scope.facturaGrabada.idFactura, serverConf.ERPCONTA_WS, function(response){
            downloadInnerHtml(nombreArchivo, response.data, 'text/plain');
        });
    };

});
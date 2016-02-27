/**
 * Created by paola on 23-02-15.
 */
'use strict';

app.controller('registroFacturaCtrl', function ($scope,cxcService,$state,cxpService, serverConf, $http, $modal, modalService, localStorageService, tempCache) {

    /************************Definicion de variables*********************************/
    $scope.documento={factura:"Factura",alquiler:"Recibo Alquiler",bsp:"Boleto de avión BSP",dui:"Póliza de Importación"};
    $scope.modo={
        valor:false,
        mostrar:true
    };
    $scope.habilita = false;
    $scope.valores={nombreRazonSocial:"",nit:"",baseCreditoFiscal:0.00,nomDocumento:"FACTURA",porcentajeIVA:13};

    $scope.factura = {
        "cpcFacturaEmitida": {
            "idFactura": 0,
            "numeroFactura": "",
            "numeroAutorizacion": "",
            "numeroDui": 0,
            "cppProveedorCliente": {
                "idProveedorCliente": 0
            },
            "montoPrimeraMoneda": 0,
            "montoSegundaMoneda": 0,
            "fechaFactura":"",
            "fechaRegistro": new Date(),
            "excentoPrimeraMoneda": 0,
            "ivaPrimeraMoneda": 0,

            "parEstadoFactura": {
                "codigo": "",
                "descripcion": ""
            },
            "parTipoDocumentoMercantil": {
                "codigo": "FACT",
                "descripcion": ""
            },
            "codigoControl": "",
            "incoterm": "",
            "puertoDestino": "",
            "valorBruto": 0,
            "gastosTransporte": 0,
            "gastosSeguro": 0,
            "totalFob": 0,
            "transporteInternacional": 0,
            "seguroInternacional": 0,
            "otrosGastos": 0,
            "idCbteContable": 0,
            "tipoCambioFactura": 0,
            "totalDescuentoPrimeraMoneda":0,
            "totalDescuentoSegundaMoneda":0,
            "parModalidadTransaccion": {
                "codigo": "CRED",
                "descripcion": ""
            },
            "parTipoTransaccion": {
                "codigo": "",
                "descripcion": "",
                "grupo": "CPP"
            },
            "glosa": "",
            "concepto": "",
            "icePrimeraMoneda": 0,
            "iceSegundaMoneda":0,
            "nroFacturaInterno": "",
            "cuentaBancaria": null,
            "fechaAceptacion": "",
            "nroContrato": "",
            "cuentaContable": "",
            "parTipoModulo": {
                "codigo": "CPP",
                "descripcion": ""
            },
            "parTipoMoneda": {
                "codigo": "BOL",
                "descripcion": ""
            },
            "parEstadoPago": {
                "codigo": "FACT",
                "descripcion": ""
            },
            "erpAplicante": null
        },
        "listaCpcDetalleFactura":null
    };


    $scope.checkCopiarConcepto = false;
    $scope.totalBs = 0.00;
    $scope.totalSus = 0.00;
    $scope.proveedores = [];

    $scope.factura.cpcFacturaEmitida.tipoCambioFactura = localStorageService.get('tipoCambioObjeto').tipoCambio;
    /******************************Fin Definicion de variables****************************/

    /*Creado por: Paola Mejia
     Obtiene el listado de proveedores, se envia como parametro idEntidadPojo*/
    function obtenerDatosProveedor(idProveedor){
        cxpService.getConceptosByProveedor({}, {},idProveedor, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.proveedor = response.data;
            console.info("Registro Factura:getDatosProveedor===>",$scope.proveedor);
        }, function (responseError) {
            //error
        });
    };
    function limpiar(){
      $scope.factura.cpcFacturaEmitida.parTipoTransaccion.codigo="";
      $scope.factura.cpcFacturaEmitida.nroContrato="";
      $scope.valores.nombreRazonSocial="";
      $scope.valores.nit="";
      $scope.factura.cpcFacturaEmitida.numeroDui="";
      $scope.factura.cpcFacturaEmitida.numeroFactura="";
      $scope.factura.cpcFacturaEmitida.numeroAutorizacion="";
      $scope.factura.cpcFacturaEmitida.fechaFactura="";
      $scope.factura.cpcFacturaEmitida.codigoControl="";
      $scope.factura.cpcFacturaEmitida.concepto="";
      $scope.factura.cpcFacturaEmitida.montoPrimeraMoneda=0;
      $scope.factura.cpcFacturaEmitida.icePrimeraMoneda=0;
      $scope.factura.cpcFacturaEmitida.excentoPrimeraMoneda=0;
      $scope.factura.cpcFacturaEmitida.subtotalPrimeraMoneda=0;
      $scope.factura.cpcFacturaEmitida.totalDescuentoPrimeraMoneda=0;
      $scope.valores.baseCreditoFiscal=0;
      $scope.factura.cpcFacturaEmitida.ivaPrimeraMoneda=0;
    };
    $scope.documentoSeleccionado=function(valor){
        limpiar();
        console.log("Documento seleccionado",valor);
        switch(valor) {
            case 'BSP':
               $scope.factura.cpcFacturaEmitida.numeroAutorizacion=1;
               $scope.valores.nomDocumento="BOLETO DE AVION";
               //$scope.factura.cpcFacturaEmitida.numeroFactura="";
               $scope.factura.cpcFacturaEmitida.numeroDui=0;
                break;
            case 'POLIM':
                $scope.factura.cpcFacturaEmitida.numeroAutorizacion=3;
                $scope.factura.cpcFacturaEmitida.numeroFactura=0;
                //$scope.factura.cpcFacturaEmitida.numeroDui="";
                $scope.valores.nomDocumento="POLIZA DE IMPORTACION";
                break;
            case 'FACT':
                $scope.valores.nomDocumento="FACTURA";
                //$scope.factura.cpcFacturaEmitida.numeroAutorizacion="";
                //$scope.factura.cpcFacturaEmitida.numeroFactura="";
                $scope.factura.cpcFacturaEmitida.numeroDui=0;
                break;
            case 'RALQ':
                $scope.valores.nomDocumento="RECIBO DE ALQUILER";
                //$scope.factura.cpcFacturaEmitida.numeroAutorizacion="";
                //$scope.factura.cpcFacturaEmitida.numeroFactura="";
                $scope.factura.cpcFacturaEmitida.numeroDui=0;
                break;
        }
    };
    $scope.calcular=function(){
        console.log("INGRESANDO A CALCULAR");
        $scope.factura.cpcFacturaEmitida.subtotalPrimeraMoneda=parseFloat($scope.factura.cpcFacturaEmitida.montoPrimeraMoneda)-(parseFloat($scope.factura.cpcFacturaEmitida.icePrimeraMoneda)+parseFloat($scope.factura.cpcFacturaEmitida.excentoPrimeraMoneda));
        $scope.valores.baseCreditoFiscal=parseFloat($scope.factura.cpcFacturaEmitida.subtotalPrimeraMoneda)-parseFloat($scope.factura.cpcFacturaEmitida.totalDescuentoPrimeraMoneda);
        $scope.factura.cpcFacturaEmitida.ivaPrimeraMoneda=parseFloat($scope.valores.baseCreditoFiscal)*($scope.valores.porcentajeIVA/100);
    };
    $scope.calcularPOLIM=function(){
        console.log("INGRESANDO A CALCULAR POLIZA DE IMPORTACIONnnn");
        //$scope.factura.cpcFacturaEmitida.subtotalPrimeraMoneda=parseFloat($scope.factura.cpcFacturaEmitida.montoPrimeraMoneda)-(parseFloat($scope.factura.cpcFacturaEmitida.icePrimeraMoneda)+parseFloat($scope.factura.cpcFacturaEmitida.excentoPrimeraMoneda));
        $scope.valores.baseCreditoFiscal=(parseFloat($scope.factura.cpcFacturaEmitida.ivaPrimeraMoneda)*100)/$scope.valores.porcentajeIVA;
        $scope.factura.cpcFacturaEmitida.montoPrimeraMoneda=$scope.valores.baseCreditoFiscal+parseFloat($scope.factura.cpcFacturaEmitida.icePrimeraMoneda)+parseFloat($scope.factura.cpcFacturaEmitida.excentoPrimeraMoneda);
        $scope.factura.cpcFacturaEmitida.subtotalPrimeraMoneda=parseFloat($scope.factura.cpcFacturaEmitida.montoPrimeraMoneda)-(parseFloat($scope.factura.cpcFacturaEmitida.icePrimeraMoneda)+parseFloat($scope.factura.cpcFacturaEmitida.excentoPrimeraMoneda));
        console.log("Subtotal",$scope.factura.cpcFacturaEmitida.subtotalPrimeraMoneda);

        //$scope.factura.cpcFacturaEmitida.ivaPrimeraMoneda=parseFloat($scope.valores.baseCreditoFiscal)*$scope.valores.porcentajeIVA;

    };
    $scope.modalBuscadorProveedores = function () {
        var modalProveedores = modalService.show(
            {
                templateUrl: 'modules/cxp/views/buscadorProveedores.html',
                controller: 'buscadorProveedoresCtrl',
                size: 'md'
            }
        ).then(function (respModal) {
                console.log("buscadorProveedores: Respuesta del Modal===", respModal);
                $scope.factura.cpcFacturaEmitida.cppProveedorCliente.idProveedorCliente=respModal.idProveedorCliente;
                $scope.valores.nombreRazonSocial=respModal.nombreCompleto;
                $scope.valores.nit=respModal.nitCi;
            })
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    /* Creado por: Paola Mejia
       Copia el texto de Concepto a la Glosa si se habilita el checkbox */
    $scope.copiarConcepto = function () {

        if ($scope.checkCopiarConcepto == true) {
            $scope.facturaPojo.cntComprobantePojo.glosa = $scope.facturaPojo.cntComprobantePojo.concepto;
        } else
            $scope.facturaPojo.cntComprobantePojo.glosa = "";
    };
    /*Creado por: Paola Mejia
     * Habilita el input de Codigo de Control si el cuarto digito de la Autorizacion es 4*/
    $scope.habilitaCodigoControl = function (valor) {
        if ($scope.factura.cpcFacturaEmitida.parTipoDocumentoMercantil.codigo!= "FACT")
            valor = $scope.factura.cpcFacturaEmitida.parTipoDocumentoMercantil.codigo.concat(valor);

        if (valor && valor.length >= 4 && valor.indexOf("4", 3) == 3)
            $scope.habilita = true;
        else
            $scope.habilita = false;
    };
    /*Creado por: Paola Mejia
     * Obtiene el nombre del archivo seleccionado para adjuntar factura*/
    $scope.obtenerAdjunto = function (adj) {
        console.log(adj);
        $scope.nombreAdjunto = adj;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    function generarEntryItem(nroFactura, nroAutorizacion, codigoControl){
        $scope.factura.cpcFacturaEmitida.nroFacturaInterno=nroFactura+nroAutorizacion+codigoControl;
    };

    $scope.guardarFactura = function () {
        console.log("DATOS DE LA FACTURA:",  $scope.factura.cpcFacturaEmitida);
        console.log(JSON.stringify($scope.factura,null,4));
        generarEntryItem($scope.factura.cpcFacturaEmitida.numeroFactura,$scope.factura.cpcFacturaEmitida.numeroAutorizacion,$scope.factura.cpcFacturaEmitida.codigoControl);
        $scope.modo.valor=true;
        cxcService.adicionaFacturaEmitida($scope.factura, {},serverConf.ERPCONTA_WS,function (response) {
            //exito
            $scope.facturaGrabada=response.data;

            console.info("Emision Factura:grabado Factura--->>>>",$scope.facturaGrabada);
            $scope.modo.mostrar=false;//no mostrar boton Guardar desdpues de registrar
            $scope.showCustomModal({
                headerText: "Mensaje de Confirmacion",
                bodyText: "La Factura se guardaró correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });
        }, function (responseError) {
            //error
        });
    };
    /*Creado por: Paola Mejia
     Descripción: Obtiene el listado de departamentos*/
    function obtenerListaTipoTransacciones(){
        cxpService.getListaTipoTransaccionesFactura({}, {},serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.listaTransacciones=respuesta.data;
            console.info("Lista Transacciones",respuesta.data);
        }, function (respuestaDeError) {
            // ERROR
        });
    };
    $scope.obtenerAplicantes=function(idDepartamento){
        cxpService.getAplicanteByIdDepartamento({}, {},idDepartamento, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.listaAplicantes=respuesta.data;
            console.info("Lista Aplicantes",respuesta.data);
        }, function (respuestaDeError) {
            // ERROR
        });
    };
    /*Creado por: Paola Mejia
      Descripción: Obtiene el listado de departamentos*/
    function obtenerListaDepartamentos(estado){
        cxpService.getListaDepartamentos({}, {},estado, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.listaDepartamentos=respuesta.data;
            console.info("Lista Departamentos",respuesta.data);
            // EXITO
        }, function (respuestaDeError) {
            // ERROR
        });
    };
    /*Creado por: Paola Mejia
     Descripción: Obtiene el listado de Tipos Compra*/
    function obtenerListaTipoCompras(){
        cxpService.getListaTipoCompras({}, {},serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.listaCompras=respuesta.data;
            console.info("Lista Compras",respuesta.data);
            // EXITO
        }, function (respuestaDeError) {
            // ERROR
        });
    };
    $scope.nuevoRegistro=function(){
        console.log("INGRESANDO A NUEVA FACTURA");
        //$state.go('registroFactura');
        $state.transitionTo('registroFactura', {}, {reload: true});
    }
    /*Creado por: Paola Mejia
     Descripción: Obtiene el listado de Documentos Fiscales de Compra*/
    function obtenerDocumentoFiscalesCompras(modulo){
        cxpService.getParListaDocumentosFiscales({}, {},modulo,serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.docFiscalesCompra=respuesta.data;
            console.info("Lista Documentos Compras",respuesta.data);
        }, function (respuestaDeError) {
        });
    };
    /*Creado por: Paola Mejia
      Descripción: Funcion inicial*/
    function init() {
        obtenerListaTipoCompras();
        obtenerListaTipoTransacciones();
        obtenerListaDepartamentos('VIG');//Obtiene Listado de Departamentos Vigentes
        obtenerDocumentoFiscalesCompras('CPP');//Obtiene Listado de Documentos Fiscales para Compras
        //grillaCompra();
    };
    init();
    $scope.cancelar=function(){
        $state.go('cxcEnBlanco');
    };
});

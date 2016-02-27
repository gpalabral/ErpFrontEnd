/**
 * Created by paola on 17-04-15.
 */
'use strict';

app.controller('emisionFacturaCtrl', function ($scope, $state, cxcService, cxpService,serverConf, tempCache,cpanelService,
                                               localStorageService, modalService, qr_generator,commoncxc, detalleFacturaGridModel) {

    $scope.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
    $scope.fechaTipoCambio = localStorageService.get('tipoCambioObjeto').fecha;//fecha obtenida desde Contabilidad
    $scope.idDosificacionSel=tempCache.idDosificacionSeleccionada;
    var atributosPerfil =  localStorageService.get('atributosPerfil'); //Obtiene los datos del perfil

    $scope.modo={
        valor:false,
        mostrar:true,
        codControl:false
    };

    $scope.mostrar={datosSucursal:false};

    var detallerFactura = new detalleFacturaGridModel();

    $scope.facturaEmitidaPojo={
        "cpcFacturaEmitida": {
            "cpcDosificacion": {
                "idDosificacion": 0
            },
            "idPadre": 0,
            "motivo": "",
            "cpcPagoContrato":null,
            "cppProveedorCliente": {
                "idProveedorCliente": 0,
                "nit":0
            },
            "montoPrimeraMoneda": 0,
            "montoSegundaMoneda": 0,
            "numeroFactura": 0,
            "concepto": "",
            "codigoControl": "",
            "fechaFactura": "",
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
                "codigo": "VENT",
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
            "nroContrato": "",
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

    $scope.datosDetalleFactura =[];

   /*Creado por: Paola Mejia
   *Descripcion: Obtiene los datos de la Empresa*/
   function obtenerEmpresaPorId(idEmpresa){
        cpanelService.getDatosEmpresaById({}, {},idEmpresa,serverConf.CPANEL_WS, function (response) {
            console.info("emisionFacturaContrato: Datos de empresa",response.data);
            $scope.datosEmpresa=response.data;
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
    }
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene los datos de la Sucursal*/
    function obtenerDatosSucursal(idSucursal){
        cxcService.getCpcSucursalByIdSucursal({}, {},atributosPerfil['sucursalPredeterminada'],serverConf.ERPCONTA_WS, function (response) {
            $scope.sucursal = response.data;
            console.log($scope.sucursal);
            //si la sucursal predeterminada no es la casa matriz obtener datos de la casa matriz
            if( $scope.sucursal.numeroSucursal>0) {
                $scope.mostrar.datosSucursal=true;
                obtenerCasaMatriz();
            }
        }, function (responseError) {
            //error
        });
    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene lista de nros de cuentas*/
    function obtenerCtasBancariasEmpresa(){
        cxcService.getListaCtaBancariaEmpresa({}, {},"EMP", serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.listaCuentas=respuesta.data;
        });
    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene los datos de la Dosificacion por su id*/
    function obtenerDosificacionPorId(idDosificacion){
        cxcService.getCpcDosificacionesPorId({}, {},idDosificacion,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFactura: Dosificacion seleccionada",response.data);
            $scope.dosificacion=response.data;
            $scope.dosificacion.fechaLimiteEmision=new Date( $scope.dosificacion.fechaLimiteEmision);
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
     Obtiene el listado de clientes y concatena con los clientes y proveedores*/
    function obtenerClientes(){
        cxcService.getListaClientes({},{},"CLI",serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFactura: Lista Clientes",response.data);
            $scope.clientes = response.data;
          }, function (responseError) {
        });
    };
    $scope.clienteSeleccionado = function (idCliente) {
        if( idCliente){
            /*Creado por: Paola Mejia
             * Descripcion: Obtiene los datos del Cliente seleccionado por idProveedorCliente (establece su NIT)*/
            cxpService.getConceptosByProveedor({}, {}, idCliente, serverConf.ERPCONTA_WS, function (respuesta) {
                //exito
                console.info("dosificaccionEmisionFactura: Lista Dosificaciones",respuesta.data);
                //$scope.datosCliente = respuesta.data;
                $scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.nit=respuesta.data.nit;
                //$scope.facturaEmitida.cppProveedorCliente.idProveedorCliente=$scope.datosCliente.idProveedorCliente;
                console.log("emisionFactura: Datos clienteSeleccionado",$scope.datosCliente);
            }, function (responseError) {
                //error
            });
        }
    };
    $scope.generarCodigoControl=function(){
        $scope.datosCodigoControl={
            nit:$scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.nit,
            numeroFactura:$scope.facturaEmitidaPojo.cpcFacturaEmitida.numeroFactura,
            numeroAutorizacion:$scope.dosificacion.numeroAutorizacion,
            fechaFactura: new Date($scope.facturaEmitidaPojo.cpcFacturaEmitida.fechaFactura),
            monto: $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda,
            llaveDosificacion:$scope.dosificacion.llaveDosificacion
        };
        console.log("Datos enviados CODIGO CONTROL",$scope.datosCodigoControl);
        /* Creado por: Paola Mejia
         *Descripcion: Obtiene el codigo de control*/
        cxcService.getCodigoControlFactura($scope.datosCodigoControl, {}, serverConf.ERPCONTA_WS,function (response) {
            //exito
            console.info("Emision Factura:Codigo Control--->>>>",response.data);
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl=response.data.codigoControl;
            console.log("Codigo Control generado:", $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl);
            //generacionQR();
        }, function (responseError) {
            //error
        });
    };

   function init(){
       obtenerDatosSucursal($scope.idSucursal);
       obtenerDosificacionPorId($scope.idDosificacionSel);
       obtenerNroFacturaPorIdDosificacion( $scope.idDosificacionSel);
       obtenerEmpresaPorId(1);//Obtiene los datos de la empresa
       obtenerCtasBancariasEmpresa();
       obtenerClientes();
       if( !$scope.idDosificacionSel ) {
           $state.go('dosificacionEmisionFactura');
           return;
       }
       grillaConceptos();
   }

    $scope.limpiarFila = function (row) {
        var index = row.rowIndex;
        $scope.gridOptions.selectItem(index, false);
        $scope.datosDetalleFactura.splice(index, 1);

        $scope.sumarValores();
    };
    function grillaConceptos() {
        $scope.enableDismiss = true;

        $scope.totalesTemplate='<div style="width: 80%; display: inline-block; text-align: right"><label class="control-label">DESCUENTO&nbsp;&nbsp;</label></div>' +
        '<div style="width: 10%; display: inline-block;"><input class="form-control text-right" type="text" ng-cell-inpput  ng-model="facturaEmitidaPojo.cpcFacturaEmitida.totalDescuentoPrimeraMoneda" ui-number-mask disabled/></div>' +
        '<div style="width: 10%; display: inline-block;"><input class="form-control text-right" type="text" ng-cell-inpput  ng-model="facturaEmitidaPojo.cpcFacturaEmitida.totalDescuentoSegundaMoneda" ui-number-mask disabled/></div>'+
        '<div style="width: 80%; display: inline-block; text-align: right"><label class="control-label">TOTALES&nbsp;&nbsp;</label></div>' +
        '<div style="width: 10%; display: inline-block;"><input class="form-control text-right" type="text" ng-cell-inpput  ng-model="facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda" ui-number-mask disabled/></div>' +
        '<div style="width: 10%; display: inline-block;"><input class="form-control text-right" type="text" ng-cell-inpput  ng-model="facturaEmitidaPojo.cpcFacturaEmitida.montoSegundaMoneda" ui-number-mask disabled/></div>';


        $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
        $scope.currencySubTotalTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

        $scope.headerPlantilla='<div class="ngHeaderSortColumn ngCellText {{col.headerClass}}"><span ng-cell-text="" class="ng-binding">'+
        '<div><button type="button" class="btn btn-default btn-sm" ng-click="modalBuscadorServicios()" ng-if="!modo.valor">'+
        '<span class="glyphicon glyphicon-plus"></span></button></div></span></div>';
        /*
        '<button type="button" class="btn btn-default btn-sm" ng-click="editarFila()" ng-if="modo.botonEditar">'+
        '<span class="glyphicon glyphicon-pencil"></span></button>*/

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
            footerRowHeight: 66,
            rowHeight: 33,
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
                    width: '33%',
                    headerClass: "header-center",
                    cellClass:'text-left',
                    cellTemplate:'<input type="text"  name="detalle" class="form-control text-left" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="modo.valor" required/>'
                },
                {
                    field: 'cantidad',
                    displayName: "Cant.",
                    width: '5%',
                    enableCellSelection: true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="number"  name="cant" min="0" step="1" class="form-control text-left" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="modo.valor" required/>'
                },
                {
                    field: "precioUnitarioPrimeraMoneda",
                    displayName: "Precio Unitario (BOB)",
                    width: '10%',
                    enableCellSelection: true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="text" name="pUniBob" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="modo.valor" currency-input decimals="5" required/>'
                },
                {
                    field: "precioUnitarioSegundaMoneda",
                    displayName: "Precio Unitario (USD)",
                    width: '10%',
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="text"  name="pUniSus" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="modo.valor" currency-input decimals="5" required/>'
                },
                {
                    field: "porcentajeDescuento",
                    displayName: "Desc. (%)",
                    width: '4%',
                    enableCellSelection: true,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:'<input type="text" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" ng-disabled="modo.valor"/>'
                },
                {
                    field: "descuentoPrimeraMoneda",
                    displayName: "Descuento (BOB)",
                    width: '7%',
                    enableCellSelection: false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencyTemplate
                },
                {
                    field: "descuentoSegundaMoneda",
                    displayName: "Descuento (USD)",
                    width: '7%',
                    enableCellSelection: false,
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencyTemplate
                },
                {
                    field: "subtotalPrimeraMoneda",
                    displayName: "SubTotal (BS)",
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
        }
        /*Creado por: Paola Mejia
        * Descripcion: Muestra el modal para seleccionar un servicio, y lo adiciona al grid*/
        $scope.modalBuscadorServicios = function () {
            //console.log("Emitir Factura:modalBuscadorServicios===>",row.entity);
            var modalConceptos = modalService.show(
                {
                    templateUrl: 'modules/cxc/views/buscadorServicios.html',
                    controller: 'buscadorServiciosCtrl',
                    size: 'md'
                }, {
                    //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
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
         Genera los subTotales si cambia la cantidad,
         Genera los subTotales si cambia el precio unitario primera moneda y precio unitario segunda moneda
         Adiciona una nueva fila al adicionar un bien o servicio en el detalle*/
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
    init();

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

    $scope. cancelarFacturaEmitida=function(){
        $state.go('dosificacionEmisionFactura');
    };

    var generarPojoGuardar=function(){
        //$scope.datosDetalleFactura.pop();
        console.log("INDICE",$scope.datosDetalleFactura.length);
        $scope.facturaEmitidaPojo.cpcFacturaEmitida.cpcDosificacion.idDosificacion=$scope.dosificacion.idDosificacion;
        $scope.facturaEmitidaPojo.listaCpcDetalleFactura=$scope.datosDetalleFactura;
        console.log("CODIGO DE CONTROL EN OBJETO",$scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl);
        //$scope.facturaEmitidaPojo.cpcFacturaEmitida=$scope.facturaEmitida;
        console.log($scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl);
        console.log(JSON.stringify($scope.facturaEmitidaPojo,null,4));

        if ( detallerFactura.validate( { "datosDetalleFactura": $scope.facturaEmitidaPojo.listaCpcDetalleFactura  }) ) {
            cxcService.adicionaFacturaEmitida($scope.facturaEmitidaPojo, {},serverConf.ERPCONTA_WS,function (response) {
                //exito
                $scope.facturaGrabada=response.data;
                $scope.enableDismiss = false;
                $scope.modo.valor=true;//mostrar boton Enviar/Imprimir
                $scope.modo.mostrar=false;
                console.info("Emision Factura:grabado Factura--->>>>",$scope.facturaGrabada);
                if($scope.dosificacion.parModalidadFacturacion.codigo!="MAN")
                 {
                     $scope.modo.codControl=true;
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

                $scope.showCustomModal({
                    headerText: "Mensaje de Confirmacion",
                    bodyText: "Los datos se guardaron correctamente.",
                    actionButtonText: "Aceptar",
                    type: 'exito',
                    closeAfter: 3000
                });

            }, function (responseError) {
                    //error
                });
        } else {

            $scope.showCustomModal({
                headerText: "MENSAJE DE VALIDACION",
                bodyText: "Existe un campo vacío, o un dato no válido. Verifique por favor...",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 3000
            });
        }
    };
    $scope.guardarFacturaEmitida=function(){
      if($scope.dosificacion.parModalidadFacturacion.codigo!="MAN")
      {     $scope.datosCodigoControl={
                nit:$scope.facturaEmitidaPojo.cpcFacturaEmitida.cppProveedorCliente.nit,
                numeroFactura:$scope.facturaEmitidaPojo.cpcFacturaEmitida.numeroFactura,
                numeroAutorizacion:$scope.dosificacion.numeroAutorizacion,
                fechaFactura: new Date($scope.facturaEmitidaPojo.cpcFacturaEmitida.fechaFactura),
                monto: $scope.facturaEmitidaPojo.cpcFacturaEmitida.montoPrimeraMoneda,
                llaveDosificacion:$scope.dosificacion.llaveDosificacion
            };

        console.log("Datos enviados CODIGO CONTROL",$scope.datosCodigoControl);
        /* Creado por: Paola Mejia
         *Descripcion: Obtiene el codigo de control*/
        cxcService.getCodigoControlFactura($scope.datosCodigoControl, {}, serverConf.ERPCONTA_WS,function (response) {
            //exito
            console.info("Emision Factura:Codigo Control--->>>>",response.data);
            $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl=response.data.codigoControl;
            generarPojoGuardar();
            console.log("Codigo Control generado:", $scope.facturaEmitidaPojo.cpcFacturaEmitida.codigoControl);
            //generacionQR();
        }, function (responseError) {
            //error
        });
      } else generarPojoGuardar();
    };


    $scope.importarXLS = function (files) {
        if (files && files.length) {
            cxcService.emisionFacturaExcelImport(files[files.length-1], 'xls', serverConf.ERPCONTA_WS, function( response ) {
                console.log("response");
                console.log(response);
            });
        }
    };

    $scope.visualizarPdf=function(){
        $state.go('pdfViewer',{idFacturaEmitida:$scope.facturaGrabada.idFactura});
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
            downloadInnerHtml(nombreArchivo,response.data,'text/plain');
        });
    };

});
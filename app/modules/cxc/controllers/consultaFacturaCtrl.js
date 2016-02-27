/**
 * Created by paola on 27-06-15.
 */
'use strict';

app.controller('consultaFacturaCtrl', function ($scope, $state, cxcService,cxpService,serverConf, tempCache, $stateParams,
                                                modalService) {
    $scope.idFactura=$stateParams.idFacturaEmitida;//Recibe el idFacturaEmitida

    $scope.modo={
        valor:false,
        mostrarCodigo:false,
        exportacion:false
    };

    $scope.mostrar={datosSucursal:false};

    function defineBackgroundImage () {
        var codigo = $scope.factura.parEstadoFactura.codigo;
        $scope.imageBackground = null;

        if ( codigo === 'A' ) {
            $scope.imageBackground = {
                'background-image' : 'url(../images/anulada.png)'
            }
        } else if ( codigo === 'E' ) {
            $scope.imageBackground = {
                'background-image' : 'url(../images/extraviada.png)'
            }
        }
    };

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene el listado del detalle de la factura por idFactura*/
    function obtieneDetalleFactura(idFactura){
      cxcService.getDetalleFacturaByIdFacturaEmitida({},{},idFactura,serverConf.ERPCONTA_WS, function (response) {
        console.info("consultaFactura: detalle factura",response.data);
        $scope.datosDetalleFactura=response.data;
      });
    };
    /*Creado por: Paola Mejia
     *Descripcion: Concatena el nombre del cliente si es Natural si es Juridico establece la razon social*/
    function datosCliente(){
        if ($scope.factura.cppProveedorCliente.parTipoProveedorCliente.codigo == "JUR") {
            $scope.nombreCliente= $scope.factura.cppProveedorCliente.razonSocial;
        }
        else {
            $scope.nombreCliente = $scope.factura.cppProveedorCliente.nombre + " " + $scope.factura.cppProveedorCliente.primerApellido + " " + $scope.factura.cppProveedorCliente.segundoApellido;
        }
        $scope.direccion=$scope.factura.cppProveedorCliente.direccion;
    };
    /*Creado por: Paola Mejia
     *Descripcion: Obtiene los datos de la factura emitida por id*/
    function obtieneFactura(idFactura){
        cxcService.getFacturaEmitidaById({}, {},idFactura,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("emisionFactura: Datos de la factura",response.data);
            $scope.factura=response.data;
            $scope.dosificacion=$scope.factura.cpcDosificacion;
            $scope.dosificacion.fechaLimiteEmision=new Date( $scope.dosificacion.fechaLimiteEmision);
            $scope.factura.fechaAceptacion=new Date( $scope.factura.fechaAceptacion);
            $scope.sucursal=$scope.factura.cpcDosificacion.cpcSucursal;

            if($scope.factura.cpcPagoContrato) $scope.modo.valor=true; //habilita para mostrar Datos del Contrato

            if($scope.dosificacion.parModalidadFacturacion.codigo!="MAN") $scope.modo.mostrarCodigo=true;
            if($scope.factura.parTipoTransaccion.codigo=="EXPO") $scope.modo.exportacion=true;

            defineBackgroundImage();// este parametro es para controlar la marca de agua "si corresponde que se mostrara"
            datosCliente();//Establece nombre del cliente

        }, function (responseError) {
            console.info("consultaFactura: ERROR",responseError);
        });
    };
    function init(){

        obtieneFactura($scope.idFactura);
        obtieneDetalleFactura($scope.idFactura);
        grillaConceptos();

    }

    function grillaConceptos() {

        $scope.totalesTemplate='<div style="width: 80%; display: inline-block; text-align: right"><label class="control-label">TOTALES&nbsp;&nbsp;</label></div>' +
        '<div style="width: 10%; display: inline-block;"><input class="form-control text-right" type="text" ng-cell-inpput  ng-model="factura.montoPrimeraMoneda" ui-number-mask disabled/></div>' +
        '<div style="width: 10%; display: inline-block;"><input class="form-control text-right" type="text" ng-cell-inpput  ng-model="factura.montoSegundaMoneda" ui-number-mask disabled/></div>';

        $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":5}}</span></div>';
        $scope.currencySubTotalTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

        $scope.gridOptions = {
            data: 'datosDetalleFactura',
            enableRowSelection: false,
            enableCellEditOnFocus: false,
            showFooter: true,
            enableColumnResize: true,
            footerTemplate: $scope.totalesTemplate,
            footerRowHeight: 32,
            rowHeight: 33,
            headerRowHeight:55,
            columnDefs: [
                {
                    field: 'detalleFactura',
                    displayName: "Detalle",
                    width: '32%',
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellClass:'text-left'
                },
                {
                    field: 'cantidad',
                    displayName: "Cant.",
                    width: '5%',
                    enableCellSelection: true,
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "precioUnitarioPrimeraMoneda",
                    displayName: "Precio Unitario (BOB)",
                    width: '10%',
                    enableCellSelection: true,
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencyTemplate
                },
                {
                    field: "precioUnitarioSegundaMoneda",
                    displayName: "Precio Unitario (USD)",
                    width: '10%',
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellClass: "text-right",
                    cellTemplate:$scope.currencyTemplate
                },
                {
                    field: "porcentajeDescuento",
                    displayName: "Desc. (%)",
                    width: '5%',
                    enableCellSelection: true,
                    enableCellEdit:  false,
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "descuentoPrimeraMoneda",
                    displayName: "Descuento (BOB)",
                    width: '9%',
                    enableCellSelection: false,
                    enableCellEdit: false,
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "descuentoSegundaMoneda",
                    displayName: "Descuento (USD)",
                    width: '9%',
                    enableCellSelection: false,
                    enableCellEdit: false,
                    headerClass: "header-center",
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
    }
    init();

    $scope.goHome=function(){
        $state.go('cxcEnBlanco');
    };

    $scope.importarXLS = function (files) {
        if (files && files.length) {
            cxcService.emisionFacturaExcelImport(files[files.length-1], 'xls', serverConf.ERPCONTA_WS, function( response ) {
                console.log("response");
                console.log(response);
            });
        }
    };

    $scope.anularFactura=function(){
        //$scope.facturaModificada.parEstadoFactura.codigo="A";

        console.log(JSON.stringify($scope.factura,null,4));
        var modalDefaults = {
            templateUrl: 'views/modalTemplates/verificarEliminacion.html'
        }, modalOptions = {
            headerText: "Mensaje del Sistema.",
            bodyText: "Â¿Esta seguro de ANULAR la factura?",
            actionButtonText: "Aceptar",
            cancelButtonText: "cancelar"
        };

        modalService.show(modalDefaults, modalOptions).then(function() {
            // cuando se confirma el estado anulada.
            $scope.factura.parEstadoFactura.codigo="A";
            cxcService.editFacturaEmitida($scope.factura, {}, serverConf.ERPCONTA_WS, function (response) {
                $state.go('panelFacturas.consulta',{idFacturaEmitida:$stateParams.idFacturaEmitida},{reload:true});
                console.info("Modificado correctamente", response.data);
            });
        });
    };
    $scope.reportarExtraviado=function(){

        var modalDefaults = {
            templateUrl: 'views/modalTemplates/verificarEliminacion.html'
        }, modalOptions = {
            headerText: "Mensaje del Sistema.",
            bodyText: "¿Esta seguro de reportar la factura como EXTRAVIADA?",
            actionButtonText: "Aceptar",
            cancelButtonText: "cancelar"
        };

        modalService.show(modalDefaults, modalOptions).then(function() {
            // cuando se confirma el estado extraviado.
            $scope.factura.parEstadoFactura.codigo="E";
            cxcService.editFacturaEmitida($scope.factura, {}, serverConf.ERPCONTA_WS, function (response) {
                $state.go('panelFacturas.consulta',{idFacturaEmitida:$stateParams.idFacturaEmitida},{reload:true});
                console.info("Modificado correctamente", response.data);
            });
        }, function(){

        })

    };
    $scope.editarFactura=function(){
        console.log(JSON.stringify($scope.factura,null,4));
        cxcService.editFacturaEmitida($scope.factura, {}, serverConf.ERPCONTA_WS, function (response) {
            console.info("Modificado correctamente", response.data);
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema.",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });

            $state.go('panelFacturas.consulta',{idFacturaEmitida:$stateParams.idFacturaEmitida});
        }, function(){
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Ocurrio un error.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 3000
            });
        });
    };

    $scope.imprimirFactura = function() {
        if( $scope.factura.parEstadoFactura.codigo === 'E' ){
            $state.go('facturaExtraviada',{idFacturaEmitida:$stateParams.idFacturaEmitida});
        } else if ( $scope.factura.parEstadoFactura.codigo === 'A' ) {
            $state.go('facturaAnulada',{idFacturaEmitida:$stateParams.idFacturaEmitida});
        }
    };

    $scope.reimpresion = function () {
        $state.go('facturaComputarizada', {idFacturaEmitida: $stateParams.idFacturaEmitida});
    };

});

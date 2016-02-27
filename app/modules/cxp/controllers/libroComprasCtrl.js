/**
 * Created by paola on 30-04-15.
 */
app.controller('libroComprasCtrl', function ($scope, $state, cxcService,cxpService, serverConf) {
    $scope.fechaActual=new Date();

    $scope.datosEmpresa={
        gestion: $scope.fechaActual.getFullYear(),
        mes: ($scope.fechaActual.getMonth()+1).toString()};
    $scope.mostrar={grilla:false,mensaje:false};

    $scope.nombreReporte="compras_0"+$scope.datosEmpresa.mes+$scope.datosEmpresa.gestion+"_"+$scope.datosEmpresa.nit;

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene la lista de Meses*/
    function obtenerMeses(){
        cxcService.getParMes({}, {},serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("libroCompras: Meses",response.data);
            $scope.listaMeses = response.data;

        }, function (responseError) {
            console.log(responseError);
        });
    }

    function obtenerGestionesFacturadas(modulo){
        cxcService.getListaGestionesFacturadas({}, {},modulo,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("libroCompras: Gestiones",response.data);
            $scope.listaGestiones = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    }

    function init(){
        obtenerMeses();
        obtenerGestionesFacturadas('CPP');
    }

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridOptionsCompras = {
        data: 'datosLibroCompras',
        enableRowSelection: false,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        enableSorting:true,
        headerRowHeight:48,
        columnDefs: [
            {
                field: 'numero',
                displayName: 'N°',
                width: '3%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'fechaFacturaODui',
                displayName: 'Fecha',
                width: '7%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'nitProveedor',
                displayName: 'NIT Proveedor',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nombreRazonSocial',
                displayName: 'Nombre/Razón Social',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'numeroDeFactura',
                displayName: 'N° Factura',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroDeDui',
                displayName: 'N° DUI',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroAutorizacion',
                displayName: 'N° Autorización',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'importeTotal',
                displayName: 'Importe Total',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'importeNoSujetoACreditoFiscal',
                displayName: 'No Sujeto a Crédito Fiscal',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'subtotal',
                displayName: 'Subtotal',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'descuentoBonificacionYrebajas',
                displayName: 'Descuento',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'importeBaseCreditoFiscal',
                displayName: 'Imp. Base Crédito Fiscal',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'creditoFiscal',
                displayName: 'Crédito Fiscal',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'codigoControl',
                displayName: 'Código de Control',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-center"
            },
            {
                field: 'tipoDeCompra',
                displayName: 'Tipo Compra',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right"
            }
        ]
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

    $scope.exportar = function (format) {
        var exportArray = [], row;
        for ( var i = 0; i < $scope.datosLibroCompras.length; i++ ) {
            row = $scope.datosLibroCompras[i];
            if( format === 'xlsx' ) {
                exportArray.push({
                    especificacion:1,
                    numero:row.numero,
                    fecha:convertirFecha(new Date(row.fechaFacturaODui)),
                    nitProveedor:row.nitProveedor,
                    nombreRazonSocial:row.nombreRazonSocial,
                    numeroFactura:row.numeroDeFactura,
                    numeroDui:row.numeroDeDui,
                    numeroAutorizacion:row.numeroAutorizacion,
                    importeTotal:row.importeTotal.toFixed(2),
                    subtotal: row.subtotal.toFixed(2),
                    descuento:row.descuentoBonificacionYrebajas.toFixed(2),
                    importeNoSujetoACreditoFiscal:row.importeNoSujetoACreditoFiscal.toFixed(2),
                    importeCreditoFiscal:row.importeBaseCreditoFiscal.toFixed(2),
                    creditoFiscal:row.creditoFiscal.toFixed(2),
                    codigoControl:row.codigoControl,
                    tipoCompra:row.tipoCompra
                });
            } else {
                exportArray.push({
                    especificacion:1,
                    numero:row.numero,
                    fecha:convertirFecha(new Date(row.fechaFacturaODui)),
                    nitProveedor:row.nitProveedor,
                    nombreRazonSocial:row.nombreRazonSocial,
                    numeroFactura:row.numeroDeFactura,
                    numeroDui:row.numeroDeDui,
                    numeroAutorizacion:row.numeroAutorizacion,
                    importeTotal:row.importeTotal.toFixed(2),
                    subtotal: row.subtotal.toFixed(2),
                    descuento:row.descuentoBonificacionYrebajas.toFixed(2),
                    importeNoSujetoACreditoFiscal:row.importeNoSujetoACreditoFiscal.toFixed(2),
                    importeCreditoFiscal:row.importeBaseCreditoFiscal.toFixed(2),
                    creditoFiscal:row.creditoFiscal.toFixed(2),
                    codigoControl:row.codigoControl,
                    tipoCompra:row.tipoCompra
                });
            }
        }

        if ( format === 'xlsx' ) {
            alasql('SELECT * INTO XLSX("ventas.xlsx",{headers:true}) FROM ?',[exportArray]);
        } else if ( format === 'csv' ) {
            return exportArray;
        }
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene listado de facturas*/
    $scope.procesar=function(valorMes,valorAnio){
        //$scope.showLoader();
        console.log("procesando......");
        cxpService.getLibroDeCompras({}, {},valorMes,valorAnio,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("libroCompras:",response.data);
            $scope.datosLibroCompras = response.data;
            if($scope.datosLibroCompras.length>0){
                $scope.mostrar.grilla=true;
                $scope.mostrar.mensaje=false;
            }else
            { $scope.mostrar.mensaje=true;
                $scope.mostrar.grilla=false;     }

            $scope.hideLoader();

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    };
    $scope.limpiar=function(){
        $scope.mostrar.mensaje=false;
        $scope.mostrar.grilla=false;
    };
    init();
});

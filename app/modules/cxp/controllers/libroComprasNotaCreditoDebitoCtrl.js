/**
 * Created Henrry Guzmán
 */
app.controller('libroComprasNotaCreditoDebitoCtrl', function ($scope, $state, cxpService, serverConf,cxcService) {
    $scope.fechaActual=new Date();

    $scope.datosEmpresa={
        gestion: $scope.fechaActual.getFullYear(),
        mes: ($scope.fechaActual.getMonth()+1).toString()};
    $scope.mostrar={grilla:false,mensaje:false};

    $scope.nombreReporte="compras_0"+$scope.datosEmpresa.mes+$scope.datosEmpresa.gestion+"_"+$scope.datosEmpresa.nit;

    function obtenerMeses(){
        cxcService.getParMes({}, {},serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteVentas: Meses",response.data);
            $scope.listaMeses = response.data;

        }, function (responseError) {
            console.log(responseError);
        });
    }

    function obtenerGestionesFacturadas(){
        cxcService.getListaGestionesFacturadas({}, {},'CPP',serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteVentas: Gestiones",response.data);
            $scope.listaGestiones = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    }

    function init(){
        obtenerMeses();
        obtenerGestionesFacturadas();
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
                width: '4%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'fechaNotaCreditoDebito',
                displayName: 'Fecha Nota Crédito - Débito',
                width: '9%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"

            },
            {
                field: 'numeroNotaCreditoDebito',
                displayName: 'N° Nota Crédito - Débito',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroAutorizacion',
                displayName: 'N° Autorización',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'parEstadoFacturaNotaCreditoDebito.descripcion',
                displayName: 'Estado',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'nitCi',
                displayName: 'NIT Cliente',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nombreRazonSocial',
                displayName: 'Nombre / Razón Social',
                width: '40%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'montoTotalDevolucionPrimeraMonedaNotaCreditoDebito',
                displayName: 'Importe Total Devolución',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ivaNotaCreditoDebito',
                displayName: 'Crédito Fiscal',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'codigoControlNotaCreditoDebito',
                displayName: 'Código Control Nota Crédito - Débito',
                width: '12%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'fechaFacturaOriginal',
                displayName: 'Fecha Factura Original',
                width: '10%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'numeroFacturaOriginal',
                displayName: 'N° Factura Original',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroAutorizacionFacturaOriginal',
                displayName: 'N° Autorización Factura Original',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'montoTotalFacturaOriginalPrimeraMoneda',
                displayName: 'Importe Total Factura Original',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
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

    $scope.exportarLibroCompras = function (format) {
        var exportArray = [], row;
        for ( var i = 0; i < $scope.datosLibroCompras.length; i++ ) {
            row = $scope.datosLibroCompras[i];
            if( format === 'xlsx' ) {
                exportArray.push({
                    especificacion:2,
                    numero:row.numero,
                    fechaNotaCreditoDebito:convertirFecha(new Date(row.fechaNotaCreditoDebito)),
                    numeroNotaCreditoDebito:row.numeroNotaCreditoDebito,
                    numeroAutorizacionNotaCreditoDebito:row.numeroAutorizacionNotaCreditoDebito,
                    estado:row.parEstadoFacturaNotaCreditoDebito.descripcion,
                    nitCi:row.nitCi,
                    nombreRazonSocial:row.nombreRazonSocial,
                    importeTotalDevolucion:row.montoTotalDevolucionPrimeraMonedaNotaCreditoDebito.toFixed(2),
                    creditoFiscal:row.ivaNotaCreditoDebito.toFixed(2),
                    codigoControlNotaCreditoDebito:row.codigoControlNotaCreditoDebito,
                    fechaFacturaOriginal:convertirFecha(new Date(row.fechaFacturaOriginal)),
                    numeroFacturaOriginal:row.numeroFacturaOriginal,
                    numeroAutorizacionFacturaOriginal:row.numeroAutorizacionFacturaOriginal,
                    importeTotalFacturaOriginal: row.montoTotalFacturaOriginalPrimeraMoneda.toFixed(2)
                });
            } else {
                exportArray.push({
                    especificacion:2,
                    numero:row.numero,
                    fechaNotaCreditoDebito:convertirFecha(new Date(row.fechaNotaCreditoDebito)),
                    numeroNotaCreditoDebito:row.numeroNotaCreditoDebito,
                    numeroAutorizacionNotaCreditoDebito:row.numeroAutorizacionNotaCreditoDebito,
                    estado:row.parEstadoFacturaNotaCreditoDebito.descripcion,
                    nitCi:row.nitCi,
                    nombreRazonSocial:row.nombreRazonSocial,
                    importeTotalDevolucion:row.montoTotalDevolucionPrimeraMonedaNotaCreditoDebito.toFixed(2),
                    creditoFiscal:row.ivaNotaCreditoDebito.toFixed(2),
                    codigoControlNotaCreditoDebito:row.codigoControlNotaCreditoDebito,
                    fechaFacturaOriginal:convertirFecha(new Date(row.fechaFacturaOriginal)),
                    numeroFacturaOriginal:row.numeroFacturaOriginal,
                    numeroAutorizacionFacturaOriginal:row.numeroAutorizacionFacturaOriginal,
                    importeTotalFacturaOriginal: row.montoTotalFacturaOriginalPrimeraMoneda.toFixed(2)
                });
            }
        }

        if ( format === 'xlsx' ) {
            alasql('SELECT * INTO XLSX("compras.xlsx",{headers:true}) FROM ?',[exportArray]);
        } else if ( format === 'csv' ) {
            return exportArray;
        }
    };


    $scope.procesarLibroCompras=function(valorMes,valorAnio){
        $scope.showLoader();
        cxpService.getNotaDebitoCreditoValidasByMonthyYear({}, {},valorMes,valorAnio,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("listaFacturaCliente: Libro ventas",response.data);
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

/**
 * Created by paola on 25-08-15.
 */
app.controller('reporteVentasCtrl', function ($scope, $state, cxcService, serverConf) {
    $scope.fechaActual=new Date();

    $scope.datosEmpresa={
        gestion: $scope.fechaActual.getFullYear(),
        mes: ($scope.fechaActual.getMonth()+1).toString()};

    $scope.mostrar={grilla:false,mensaje:false};

    $scope.nombreReporte="reporteVentas_0"+$scope.datosEmpresa.mes+$scope.datosEmpresa.gestion+"_"+$scope.datosEmpresa.nit;

    function obtenerMeses(){
        cxcService.getParMes({}, {},serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteVentas: Meses",response.data);
            $scope.listaMeses = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    };
    function obtenerGestionesFacturadas(modulo){
        cxcService.getListaGestionesFacturadas({}, {},modulo,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteVentas: Gestiones",response.data);
            $scope.listaGestiones = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    };
    function init(){
        console.log("ANIO ACTUAL", $scope.fechaActual.getFullYear());
        obtenerMeses();
        obtenerGestionesFacturadas('CPC');
    }

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';
    $scope.percentageTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)}}%</span></div>';

    $scope.gridOptionsVentas = {
        data: 'datosReporteVentas',
        enableRowSelection: false,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        enableSorting:true,
        headerRowHeight:52,
        columnDefs: [
            {
                field: 'fechaAceptacionFactura',
                displayName: 'Acceptance Date',
                width: '7%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'nitCliente',
                displayName: 'Client NIT',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nombreCliente',
                displayName: 'Name of Customer',
                width: '18%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'gestionFactura',
                displayName: 'Gestión',
                width: '5%',
                headerClass: "header-center",
                //cellFilter: 'date:\'yyyy\'',
                cellClass: "text-right"
            },
            {
                field: 'numeroContrato',
                displayName: 'Contract No.',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroContratoCliente',
                displayName: 'PO-Client Ref.',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
           /* {
                field: 'nombreContrato',
                displayName: 'Sale Project Name',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left"
            },*/
            {
                field: 'montoTotalContratoDolares',
                displayName: 'Contract Amount in $us.',
               width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoTotalContratoBolivianos',
                displayName: 'Contract Amount in Bs.',
               width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'tipoCambioContrato',
                displayName: 'EX. CH.',
               width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoTotalContratoUSD',
                displayName: 'Contract Amount USD',
               width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoTotalContratoBOB',
                displayName: 'Contract Amount BOB',
               width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'anticipo',
                displayName: 'DP',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.percentageTemplate
            },
            {
                field: 'entrega',
                displayName: 'DEL',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.percentageTemplate
            },
            {
                field: 'facturacionPorPac',
                displayName: 'PAC',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.percentageTemplate
            },
            {
                field: 'facturacionPorFac',
                displayName: 'FAC',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.percentageTemplate
            },

          /*  {
                field: 'detalleFactura',
                displayName: 'Detalle de la factura',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left"
            },*/
            {
                field: 'tipoFactura',
                displayName: 'Invoice Type',
               width: '5%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
           /* {
                field: 'plazoCredito',
                displayName: 'Credit Term',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-left"
            },*/
            {
                field: 'montoFacturaDolares',
                displayName: 'Invoicing Amount in $us.',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoFacturaBolivianos',
                displayName: 'Invoicing Amount in Bs.',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoFacturaUSD',
                displayName: 'Invoicing USD',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoFacturaBOB',
                displayName: 'Invocing BOB',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ingresoFacturado',
                displayName: 'Revenue billed',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ingresoPorExportacion',
                displayName: 'Export',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ingresoPorVentasAlExteriorSinFacturar',
                displayName: 'Sale offshore',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'iva',
                displayName: 'IVA 13%',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'it',
                displayName: 'IT 3%',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ingresoNeto',
                displayName: 'Net Revenue',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'porcentajeFacturacion',
                displayName: '% Fact',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.percentageTemplate
            },
            {
                field: 'estadoFacturacion',
                displayName: 'Status',
               width: '5%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'noCompensable',
                displayName: 'No compensable',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'numeroFactura',
                displayName: 'Ref. N.',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-center"
            },
            {
                field: 'fechaEmisionFactura',
                displayName: 'Invoice Issuing Date',
                width: '7%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'mesDeLaFactura',
                displayName: 'Invoice Month',
                width: '5%',
                headerClass: "header-center",
                cellFilter: 'date:\'MMM-yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'diasDeRetraso',
                displayName: 'Delayed days',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'mesDeFacturacion',
                displayName: 'Month',
                width: '5%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd.MMM\'',
                cellClass: "text-left"
            },
            {
                field: 'revenueAccrued',
                displayName: 'Revenue Accrued',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'numeroFacturaInterno',
                displayName: 'CFS INVOICE NUMBER',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'batchNameDebitoFiscal',
                displayName: 'BATCH NAME DEBITO FISCAL',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'batchNameIngresos',
                displayName: 'BATCH NAME CUENTA DE INGRESOS',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'cuentaContable',
                displayName: 'Cuenta Contable',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
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
    };

    $scope.exportar = function (format) {
        if ( format === 'xlsx' ) {
            alasql('SELECT * INTO XLSX("ventas.xlsx",{headers:true}) FROM ?',[$scope.datosReporteVentas]);

        } else if ( format === 'csv' ) {

            return $scope.datosReporteVentas;
        }
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene listado de facturas con importe mayor o igual a 50000 Bs. por Mes y Anio*/
    $scope.procesar=function(valorMes,valorAnio){
        $scope.showLoader();
        cxcService.getListaReporteVentas({}, {},valorMes, valorAnio,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("reporteVentas: Lista reporte",response.data);
            $scope.datosReporteVentas = response.data;
            if($scope.datosReporteVentas.length>0){
                $scope.mostrar.grilla=true;
                $scope.mostrar.mensaje=false;
            }else
            {
              $scope.mostrar.mensaje=true;
              $scope.mostrar.grilla=false;}
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
})

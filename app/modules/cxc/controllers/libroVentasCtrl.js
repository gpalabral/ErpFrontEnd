/**
 * Created by paola on 30-04-15.
 */
app.controller('libroVentasCtrl', function ($scope, $state, cxcService, serverConf) {
    $scope.fechaActual=new Date();

    $scope.datosEmpresa={
        gestion: $scope.fechaActual.getFullYear(),
        mes: ($scope.fechaActual.getMonth()+1).toString()};
    $scope.mostrar={grilla:false,mensaje:false};

    $scope.nombreReporte="ventas_0"+$scope.datosEmpresa.mes+$scope.datosEmpresa.gestion+"_"+$scope.datosEmpresa.nit;

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene la lista de Meses*/
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
        cxcService.getListaGestionesFacturadas({}, {},'CPC',serverConf.ERPCONTA_WS, function (response) {
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
        data: 'datosLibroVentas',
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
                field: 'fechaFactura',
                displayName: 'Fecha',
                width: '7%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"

            },
            {
                field: 'numeroDeFactura',
                displayName: 'N° Factura',
                width: '7%',
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
                field: 'estado',
                displayName: 'Estado',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'nit',
                displayName: 'NIT Cliente',
                width: '7%',
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
                field: 'importeTotal',
                displayName: 'Importe Total (BOB)',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'importeIceIehdTasas',
                displayName: 'ICE (BOB)',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'exportacionesYoperacionesExentas',
                displayName: 'Exp. y Op. Exentas (BOB)',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ventasGravadasAtasaCero',
                displayName: 'Ventas Tasa Cero (BOB)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'subtotal',
                displayName: 'Subtotal (BOB)',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'descuentoBonificacionYrebajas',
                displayName: 'Desc.(BOB)',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'importeBaseDebitoFiscal',
                displayName: 'Imp. Débito Fiscal (BOB)',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'debitoFiscal',
                displayName: 'Débito Fiscal (BOB)',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'codigoControl',
                displayName: 'Código de Control',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-left"
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
        for ( var i = 0; i < $scope.datosLibroVentas.length; i++ ) {
            row = $scope.datosLibroVentas[i];
            if( format === 'xlsx' ) {
                exportArray.push({
                    especificacion:3,
                    numero:row.numero,
                    fecha:convertirFecha(new Date(row.fechaFactura)),
                    numeroFactura:row.numeroDeFactura,
                    numeroAutorizacion:row.numeroAutorizacion,
                    estado:row.estado,
                    nitCliente:row.nit,
                    nombreRazonSocial:row.nombreRazonSocial,
                    importeTotal:row.importeTotal.toFixed(2),
                    ice:row.importeIceIehdTasas.toFixed(2),
                    exportaciones:row.exportacionesYoperacionesExentas.toFixed(2),
                    ventasTasaCero:row.ventasGravadasAtasaCero.toFixed(2),
                    subtotal: row.subtotal.toFixed(2),
                    descuento:row.descuentoBonificacionYrebajas.toFixed(2),
                    importeDebitoFiscal:row.importeBaseDebitoFiscal.toFixed(2),
                    debitoFiscal:row.debitoFiscal.toFixed(2),
                    codigoControl:row.codigoControl
                });
            } else {
                exportArray.push({
                    especificacion:3,
                    numero:row.numero,
                    fecha:convertirFecha(new Date(row.fechaFactura)),
                    numeroFactura:row.numeroDeFactura,
                    numeroAutorizacion:row.numeroAutorizacion,
                    estado:row.estado,
                    nitCliente:row.nit,
                    nombreRazonSocial:row.nombreRazonSocial,
                    importeTotal:(parseFloat(row.importeTotal)).toFixed(2),
                    ice:(parseFloat(row.importeIceIehdTasas)).toFixed(2),
                    exportaciones:(parseFloat(row.exportacionesYoperacionesExentas)).toFixed(2),
                    ventasTasaCero:(parseFloat(row.ventasGravadasAtasaCero)).toFixed(2),
                    subtotal:(parseFloat(row.subtotal)).toFixed(2),
                    descuento:(parseFloat(row.descuentoBonificacionYrebajas)).toFixed(2),
                    importeDebitoFiscal:(parseFloat(row.importeBaseDebitoFiscal)).toFixed(2),
                    debitoFiscal:(parseFloat(row.debitoFiscal)).toFixed(2),
                    codigoControl:row.codigoControl
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
        $scope.showLoader();
        cxcService.getLibroVentas({}, {},valorMes,valorAnio,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("listaFacturaCliente: Libro ventas",response.data);
            $scope.datosLibroVentas = response.data;
            if($scope.datosLibroVentas.length>0){
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

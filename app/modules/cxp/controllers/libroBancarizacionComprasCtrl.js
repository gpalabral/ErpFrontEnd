/**
 * Created by paola on 29-09-15.
 */

app.controller('libroBancarizacionComprasCtrl', function ($scope, $state, cxcService, cxpService,serverConf) {
    $scope.datosEmpresa={
        gestion:2015,
        mes:"",
        nit:"00147612027"
        };

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene la lista de meses*/
    cxcService.getParMes({},{},serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("listaFacturaCliente: Lista Meses",response.data);
        $scope.listaMeses = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridOptions = {
        data: 'datosLibroBanCompras',
        enableRowSelection: false,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        enableSorting:true,
        headerRowHeight:48,
        columnDefs: [
            {
                field: 'modalidadDeTransaccion',
                displayName: 'Modalidad Transacción',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'fechaFactura',
                displayName: 'Fecha Factura',
                width: '7%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"
            },
            {
                field: 'tipoTransaccion',
                displayName: 'Tipo de Transacción',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'numeroFactura',
                displayName: 'N° Factura',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'montoFactura',
                displayName: 'Monto Factura',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'nroAutorizacion',//max 15 digitos
                displayName: 'N° Autorización',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nitCiCliente',//max 12 digitos
                displayName: 'NIT/CI Proveedor',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'razonSocialNombreCliente',
                displayName: 'Nombre/Razón Social',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: 'nroCuentaDocumentoPago',
                displayName: 'N° Cuenta Doc. de Pago',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'montoPagadoDocPago',
                displayName: 'Monto ' +
                'Pagado Doc. de Pago',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoAcumulado',
                displayName: 'Monto Acumulado',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'nitEntidadFinanciera',
                displayName: 'NIT Entidad Financiera',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'nroDocumentoPago',
                displayName: 'N° Documento Pago',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'tipoDeDocumentoDePago',
                displayName: 'Tipo Doc. Pago',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'fechaDelDocumentoDePago',
                displayName: 'Fecha Doc. Pago',
                width: '7%',
                headerClass: "header-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: "text-center"
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
    };

    $scope.exportar = function (format) {
        if($scope.datosEmpresa.mes.length==1) $scope.datosEmpresa.mes="0"+$scope.datosEmpresa.mes;
        $scope.nombreReporte="compras_auxiliar_"+$scope.datosEmpresa.mes+$scope.datosEmpresa.gestion+"_"+$scope.datosEmpresa.nit;
        var exportArray = [], row;
        for ( var i = 0; i < $scope.datosLibroBanCompras.length; i++ ) {
            row = $scope.datosLibroBanCompras[i];
            console.log("datos a exportar",row);
            exportArray.push({
                modalidadDeTransaccion:row.modalidadDeTransaccion,
                fechaFactura:convertirFecha(new Date(row.fechaFactura)),
                tipoTransaccion:row.tipoTransaccion,
                numeroFactura:row.numeroFactura,
                montoFactura:(parseFloat(row.montoFactura)).toFixed(2),
                nroAutorizacion:row.nroAutorizacion,
                nitCiCliente:row.nitCiCliente,
                razonSocialNombreCliente:row.razonSocialNombreCliente,
                nroCuentaDocumentoPago:row.nroCuentaDocumentoPago,
                montoPagadoDocPago:(parseFloat(row.montoPagadoDocPago)).toFixed(2),
                montoAcumulado:(parseFloat(row.montoAcumulado)).toFixed(2),
                nitEntidadFinanciera:row.nitEntidadFinanciera,
                nroDocumentoPago:row.nroDocumentoPago,
                tipoDeDocumentoDePago:row.tipoDeDocumentoDePago,
                fechaDelDocumentoDePago:convertirFecha( new Date(row.fechaDelDocumentoDePago))
            });
        }

        if ( format === 'xlsx' ) {
            alasql('SELECT * INTO XLSX("compras.xlsx",{headers:true}) FROM ?',[exportArray]);
        } else if ( format === 'csv' ) {
            return exportArray;
        }
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene listado de documentos bancarizados*/
    $scope.procesar=function(valorMes,valorAnio){
        cxpService.getLibroBancarizacionCompras({},{},valorMes,valorAnio,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("librosBancarizacionCompras: Libro Bancarizacion",response.data);
            $scope.datosLibroBanCompras = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });

    }
});

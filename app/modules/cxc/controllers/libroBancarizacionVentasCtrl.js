/**
 * Created by paola on 07-07-15.
 */

app.controller('libroBancarizacionVentasCtrl', function ($scope, $state, cxcService, serverConf) {
    $scope.datosEmpresa={
        gestion:2015,
        mes:"",
        nit:"00147612027"};

    $scope.mostrar={grilla:false,mensaje:false};

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
    function obtenerGestionesBancarizadas(){
        cxcService.getListaGestionesBancarizadas({}, {},'CPC',serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("libroBancarizacionVentas: Gestiones",response.data);
            $scope.listaGestiones = response.data;

        }, function (responseError) {
            console.log(responseError);
            //error
        });
    }
    $scope.btnRegistrarDocumento = '<button id="emitirFactura" type="button" height="5" class="btn btn-primary" ng-click="registrarPago(row)" style="cursor: pointer;" data-placement="bottom" title="Registrar Pago">' +
    '<span class="glyphicon glyphicon-save-file"></span></button>';

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridOptions = {
        data: 'datosLibroBanVentas',
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
                displayName: 'Monto Factura (BOB)',
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
                displayName: 'NIT/CI Cliente',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'razonSocialNombreCliente',
                displayName: 'Nombre o Razón Social',
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
                displayName: 'Monto Pagado Doc. de Pago (BOB)',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'montoAcumulado',
                displayName: 'Monto Acumulado (BOB)',
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
        $scope.nombreReporte="ventas_auxiliar_"+$scope.datosEmpresa.mes+$scope.datosEmpresa.gestion+"_"+$scope.datosEmpresa.nit;
        var exportArray = [], row;
        for ( var i = 0; i < $scope.datosLibroBanVentas.length; i++ ) {
            row = $scope.datosLibroBanVentas[i];
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
            alasql('SELECT * INTO XLSX("ventas.xlsx",{headers:true}) FROM ?',[exportArray]);
        } else if ( format === 'csv' ) {
            return exportArray;
        }
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene listado de facturas con importe mayor o igual a 50000 Bs. por Mes y Anio*/
    $scope.procesar=function(valorMes,valorAnio){
        $scope.showLoader();
        cxcService.getLibroBancarizacionVentas({},{},valorMes,valorAnio,serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("librosBancarizacionVentas: Libro Bancarizacion",response.data);
            $scope.datosLibroBanVentas = response.data;
            if($scope.datosLibroBanVentas.length>0){
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
        console.log("NGCHANGE");
        $scope.mostrar.mensaje=false;
        $scope.mostrar.grilla=false;
    };
    obtenerGestionesBancarizadas();
})

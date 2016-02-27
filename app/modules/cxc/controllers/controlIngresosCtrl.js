/**
 * Created by paola on 05-09-15.
 */
//LISTADO DE COLUMNAS
app.controller('controlIngresosCtrl', function ($scope, $state, cxcService, serverConf, $http, $modal,
                                                    localStorageService,MODULES,$rootScope,menuModulo,tempCache) {
    $scope.listaColumnas=[
        {nombreCol:"fechaAceptacionFactura",displayNombre:"Acceptance Date"},
        {nombreCol:"nitCliente",displayNombre:"Client NIT"},
        {nombreCol:"nombreCliente",displayNombre:"Name of Customer"},
        {nombreCol:"gestionFactura",displayNombre:"Gestion"},
        {nombreCol:"numeroContrato",displayNombre:"Contract No."},
        {nombreCol:"numeroContratoCliente",displayNombre:"PO-Client Ref."},
        {nombreCol:"montoTotalContratoDolares",displayNombre:"Contract Amount in $us."},
        {nombreCol:"montoTotalContratoBolivianos",displayNombre:"Contract Amount in Bs."},
        {nombreCol:"tipoCambioContrato",displayNombre:"EX.CH."},
        {nombreCol:"montoTotalContratoUSD",displayNombre:"Contract Amount USD"},
        {nombreCol:"montoTotalContratoBOB",displayNombre:"Contract Amount BOB"},
        {nombreCol:"anticipo",displayNombre:"DP"},
        {nombreCol:"entrega",displayNombre:"DEL"},
        {nombreCol:"facturacionPorPac",displayNombre:"PAC"},
        {nombreCol:"facturacionPorFac",displayNombre:"FAC"},
        {nombreCol:"tipoFactura",displayNombre:"Invoice Type"},
        {nombreCol:"montoFacturaDolares",displayNombre:"Invoicing Amount in $us."},
        {nombreCol:"montoFacturaBolivianos",displayNombre:"Invoicing Amount in Bs."},
        {nombreCol:"montoFacturaUSD",displayNombre:"Invoicing USD"},
        {nombreCol:"montoFacturaBOB",displayNombre:"Invoicing BOB"},
        {nombreCol:"ingresoFacturado",displayNombre:"Revenue billed"},
        {nombreCol:"ingresoPorExportacion",displayNombre:"Export"},
        {nombreCol:"ingresoPorVentasAlExteriorSinFacturar",displayNombre:"Sale offshore"},
        {nombreCol:"iva",displayNombre:"IVA 13%"},
        {nombreCol:"it",displayNombre:"IT 3%"},
        {nombreCol:"ingresoNeto",displayNombre:"Net Revenue"},
        {nombreCol:"porcentajeFacturacion",displayNombre:"% Fact"},
        {nombreCol:"estadoFacturacion",displayNombre:"Status"},
        {nombreCol:"noCompensable",displayNombre:"No compensable"},
        {nombreCol:"numeroFactura",displayNombre:"Ref.N."},
        {nombreCol:"fechaEmisionFactura",displayNombre:"Invoice Issuing Date"},
        {nombreCol:"mesDeLaFactura",displayNombre:"Invoice month"},
        {nombreCol:"diasDeRetraso",displayNombre:"Delayed days"},
        {nombreCol:"mesDeFacturacion",displayNombre:"Month"},
        {nombreCol:"revenueAccrued",displayNombre:"Revenue Accrued"},
        {nombreCol:"numeroFacturaInterno",displayNombre:"CFS INVOICE NUMBER"},
        {nombreCol:"batchNameDebitoFiscal",displayNombre:"BATCH NAME DEBITO FISCAL"},
        {nombreCol:"batchNameIngresos",displayNombre:"BATCH NAME CUENTA DE INGRESOS"},
        {nombreCol:"cuentaContable",displayNombre:"Cuenta Contable"}
    ];

    $scope.listaSeleccionadas=[];
    $scope.mySelections=[];
    $scope.myRemoves=[];

    $scope.gridColumnas = {
        data: 'listaColumnas',
        enableRowSelection: true,
        enableCellSelection:false,
        multiSelect:true,
        showSelectionCheckbox:true,
        selectedItems: $scope.mySelections,
        //showColumnMenu:true,
        enableSorting:true,
        columnDefs: [
            {
                field:'displayNombre',
                displayName: 'COLUMNAS',
                width: '100%',
                sortable: true,
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass:'text-left'
            }]
    };
    $scope.gridSeleccionadas = {
        data: 'listaSeleccionadas',
        enableRowSelection: true,
        enableCellSelection:false,
        multiSelect:false,
        selectedItems: $scope.myRemoves,
        enableSorting:true,
        columnDefs: [
            {   field:'displayNombre',
                displayName: 'COLUMNAS SELECIONADAS',
                width: '100%',
                sortable: true,
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass:'text-left'

            }]
    };
    /*Creado por: Paola Mejia
     * Adiciona al listado derecho los roles seleccionados*/
    $scope.moveRight = function() {
        console.log("SELECCIONADOS",$scope.mySelections);
        var left=[];
        left = $scope.mySelections;
        for(var i=0;i<left.length;i++)
        {
            if ($scope.listaSeleccionadas.indexOf(left[i]) < 0) {
                $scope.listaSeleccionadas.push(left[i]);

                $scope.indice=$scope.listaColumnas.indexOf(left[i]);

                if ($scope.indice > -1) {
                    $scope.listaColumnas.splice($scope.indice, 1);
                }
            }
        }
    };

    $scope.moveLeft = function() {
        console.log("DATOS PARA REMOVER-->",$scope.myRemoves);
        var toMove = $scope.myRemoves;

        for(var i=0;i<toMove.length;i++)
        {
            if ($scope.listaColumnas.indexOf(toMove[i]) < 0) {
                $scope.listaColumnas.push(toMove[i]);

                $scope.indice = $scope.listaSeleccionadas.indexOf(toMove[i]);

                if ($scope.indice > -1) {
                $scope.listaSeleccionadas.splice($scope.indice, 1);
              }
            }
        }
    };

    $scope.generarReporte=function(){
        tempCache.listaColumnasReporte=$scope.listaSeleccionadas;

        if(tempCache.listaColumnasReporte){
            $state.go('reporteGeneradoControlIng');
        }
    };
    $scope.cancelar=function(){
        $state.go('cxcEnBlanco');
    };
});
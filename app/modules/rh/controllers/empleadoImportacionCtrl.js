'use strict';

app.controller('empleadoImportacionCtrl', function ($scope) {
  console.log('empleadoImportacionCtrl online');
    $scope.gridEmpleados = {
        data: 'listaEmpleados',
        enableRowSelection: false,
        enableCellEditOnFocus: false,
        showFooter: true,
        enableColumnResize: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 32,
        headerRowHeight:45,
        columnDefs: [
            {
                field: '',
                displayName: "Código",
                width: '8%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass:'text-left'
            },
            {
                field: '',
                displayName: "Sexo",
                width: '6%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass:'text-left'
            },
            {
                field: '',
                displayName: "Nombres",
                width: '10%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass:'text-left'
            },
            {
                field: '',
                displayName: "Primer Apellido",
                width: '10%',
                enableCellEdit: true,
                headerClass: "header-center",
                cellClass:'text-right'
            },
            {
                field: '',
                displayName: "Segundo Apellido",
                width: '4%',
                enableCellEdit: true,
                headerClass: "header-center",
                cellClass:'text-left'
            },
            {
                field: '',
                displayName: "Nacionalidad",
                width: '10%',
                enableCellEdit: true,
                headerClass: "header-center",
                cellClass:'text-right'
            },
            {
                field: "",
                displayName: "Fecha Nacimiento",
                width: '10%',
                enableCellEdit:true,
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field:'porcentajeDescuento',
                displayName: "Desc. (%)",
                width: '4%',
                enableCellSelection: true,
                enableCellEdit: true,
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: "descuentoPrimeraMoneda",
                displayName: "Descuento (BOB)",
                width: '7%',
                //enableCellSelection: false,
                enableCellEdit: false,
                headerClass: "header-center",
                cellTemplate:$scope.currencyTemplate,
                cellClass: "text-right"
            },
            {
                field: "descuentoSegundaMoneda",
                displayName: "Descuento (USD)",
                width: '7%',
                //enableCellSelection: true,
                enableCellEdit:  false,
                headerClass: "header-center",
                cellTemplate:$scope.currencyTemplate,
                cellClass: "text-right"
            },
            {
                field: "subtotalPrimeraMoneda",
                displayName: "SubTotal (BOB)",
                width: '9%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellTemplate:$scope.currencySubTotalTemplate,
                cellClass: "text-right"
            },
            {
                field: "subtotalSegundaMoneda",
                displayName: "SubTotal (USD)",
                width: '9%',
                enableCellEdit: false,
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencySubTotalTemplate
            }
        ]
    };
});

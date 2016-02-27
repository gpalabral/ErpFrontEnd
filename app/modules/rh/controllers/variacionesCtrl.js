/**
 * Created by paola on 09-10-15.
 */
app.controller('variacionesCtrl', function ($scope, $state, cxcService, serverConf) {
    $scope.datosVariaciones=[{}];
    $scope.gridVariaciones = {
        data: 'datosVariaciones',
        enableRowSelection: false,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        enableSorting:true,
        headerRowHeight:48,
        columnDefs: [
            {
                field: '',
                displayName: 'N° Item',
                width: '3%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: '',
                displayName: 'Nombre Empleado',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-center"

            },
            {
                field: '',
                displayName: 'Departamento',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: '',
                displayName: 'Sección',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: '',
                displayName: 'Días Trabajados',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: '',
                displayName: 'Días No Trabajados',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: '',
                displayName: 'Dias de Faltas',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left"
            },
            {
                field: '',
                displayName: 'Días de Multas',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Dias Ajuste',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Días Feriado',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Días Domingo',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Horas Extras',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Horas Nocturnas.',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Horas Ajuste',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Horas Feriados',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: '',
                displayName: 'Horas Domingos',
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-left"
            }
        ]
    };

});
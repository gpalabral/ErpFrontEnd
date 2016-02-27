/**
 * Created by paola on 20-04-15.
 */
'use strict';

app.controller('modalBuscadorDosificacionCtrl', function  ($scope,$rootScope,tempCache,cxcService,serverConf,$modalInstance, modalOptions,$state) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;

    function init () {

        cxcService.getDosificaciones({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito

            $scope.dosificaciones = respuesta.data;



        }, function (responseError) {
            //error
        });



    }

    $scope.radioButton = {
        indexSelected : null
    };


    $scope.radioPreEstablecido = '<div class="ngSelectionCell">' +
    '<input tabindex="-1" ng-model="radioButton.indexSelected" ng-value="row.rowIndex" name="radio" type="radio" ng-checked="isChecked(row.entity)" /></div>';

    $scope.gridDosificacion = {
        data: 'dosificaciones',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        afterSelectionChange: function (data) {
            console.info("DATA:",data.entity);
            $scope.valorSel=data.entity;
            $scope.radioButton.indexSelected = data ? data.rowIndex : null;
            if ( !$scope.$$phase ) {
                $scope.$apply();
            }
        },
        enableSorting: true,
        columnDefs: [
            {
                field: 'name',
                displayName: '',
                width: '10%',
                cellTemplate: $scope.radioPreEstablecido
            },
            {
                field: 'numeroAutorizacion',
                displayName: 'N° Autorizacion',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'numeroFacturaInicial',
                displayName: "N° Factura",
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'parEstadoProceso.descripcion',
                displayName: 'Estado',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parModalidadFacturacion.descripcion',
                displayName: 'Modalidad Facturacion',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parActividadEconomica.descripcion',
                displayName: 'Actividad Economica',
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }
        ]
    };

    $scope.cancelar=function(){
        $modalInstance.dismiss('cancel');
    };

    $scope.seleccionar=function(){
        $modalInstance.close($scope.valorSel);

    };


    init();


});

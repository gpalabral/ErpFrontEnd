/**
 * Created by paola on 18-03-15.
 */

'use strict';

app.controller('facturaAnularEliminarCtrl', function ($scope, cxpService, serverConf, $http, $modal, modalService, localStorageService) {



    /* Creado por: Paola Mejia
     Funcionalidad de la grilla de conceptos*/
    var init = function () {
        grillaProveedores();
    };

    function grillaProveedores() {
        //$scope.datosProveedores = [{denominacion: '', NIT:''}];

        /*Creado por: Paola Mejia
         Obtiene el listado de proveedores que tienen asignados un concepto*/
        cxpService.getProveedorConceptos({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("Listado de Proveedores-Concepto exitoso");
            $scope.datosProveedores = response.data;
            console.log($scope.datosProveedores);
        }, function (responseError) {
            //error
        });

        $scope.gridOptionsProveedores = {
            data: 'datosProveedores',
            enableRowSelection: true,
            enableColumnResize: true,
            multiple:false,
            columnDefs: [
                {
                    field: 'cppProveedorCliente.razonSocial',
                    displayName: "Razon Social / Nombre",
                    width: '70%',
                    headerClass: "header-center",
                    enableCellEdit: false,
                    cellClass: "text-left"
                },
                {
                    field: "nit",
                    displayName: "NIT",
                    width: '30%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                }]
        };
        $scope.datosConceptos = [{concepto: '', nroFactura:'',montoBs:'',montoSus:''}];
        $scope.btnAnular = '<button id="anularFactura" type="button" height="5" class="btn btn-primary" ng-click="anularFactura(row)" style="cursor: pointer;" data-placement="bottom" title="Anular Factura">' +
        '<span class="glyphicon glyphicon-ban-circle"></span></button>';
        $scope.btnEliminar = '<button id="eliminarFactura" type="button" height="5" class="btn btn-primary" ng-click="anularFactura(row)" style="cursor: pointer;" data-placement="bottom" title="Eliminar Factura">' +
        '<span class="glyphicon glyphicon-trash"></span></button>';

        $scope.gridOptionsConceptos = {
            data: 'datosConceptos',
            enableRowSelection: true,
            enableColumnResize: true,
            columnDefs: [
                {
                    field: "nroFactura",
                    displayName: "Nro. Factura",
                    width: '13%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: 'concepto',
                    displayName: "Concepto",
                    width: '35%',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: "montoBs",
                    displayName: "Monto(Bs)",
                    width: '20%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: "montoSus",
                    displayName: "Monto($us)",
                    width: '20%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {cellTemplate: $scope.btnAnular, width: '6%', enableCellEdit: false},
                {cellTemplate: $scope.btnEliminar, width: '6%', enableCellEdit: false}
            ]
        };
    };
    init();

});

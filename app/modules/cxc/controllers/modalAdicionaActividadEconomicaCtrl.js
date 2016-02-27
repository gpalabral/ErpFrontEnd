/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalAdicionaActividadEconomicaCtrl', function ($scope, cxcService, serverConf, $modalInstance, cpcActividadEconomicaModel, $timeout) {


    /*Creado por: Henrry Guzman
     Obtiene el listado de servicios para Contratos*/


    $scope.listaActividadEconomica = [];
    var actividadEconomica = new cpcActividadEconomicaModel();
    $scope.cpcActividadEconomica = actividadEconomica.getObject();

    $scope.activaMensajeExitoso = false;
    $scope.activaMensajeErroneo = false;
    $scope.activaMensajeValidacion = false;
    $scope.activaMensajeValidacionCodigo = false;

    function init() {
        $scope.actualizaListaActividadEconomica();

    }


    $scope.muestraMensajeExitoso = function (valor) {
        $scope.activaMensajeExitoso = valor;
        $timeout(function () {
            $scope.activaMensajeExitoso = false;
        }, 4000);
    };
    $scope.muestraMensajeError = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 4000);
    };
    $scope.muestraMensajeValidacion = function (valor) {
        $scope.activaMensajeValidacion = valor;
        $timeout(function () {
            $scope.activaMensajeValidacion = false;
        }, 4000);
    };
    $scope.muestraMensajeValidacionCodigo = function (valor) {
        $scope.activaMensajeValidacionCodigo = valor;
        $timeout(function () {
            $scope.activaMensajeValidacionCodigo = false;
        }, 4000);
    };

    $scope.actualizaListaActividadEconomica = function () {
        cxcService.getListaActividadEconomica({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaActividadEconomica = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.guardaActividadEconomica = function () {
        if (actividadEconomica.validate($scope.cpcActividadEconomica)) {
            cxcService.getVerificaSiCodigoExiste({}, {}, $scope.cpcActividadEconomica.codigo, serverConf.ERPCONTA_WS, function (response) {
                //exito
                if (!response.data) {
                    cxcService.adicionaActividadEconomica($scope.cpcActividadEconomica, {}, serverConf.ERPCONTA_WS, function (response) {
                        //exito
                        $scope.actualizaListaActividadEconomica();
                        $scope.muestraMensajeExitoso(true);
                    }, function (responseError) {
                        //error
                        $scope.muestraMensajeError(true);
                    });
                } else {
                    $scope.muestraMensajeValidacionCodigo(true);
                }

            }, function (responseError) {
                //error
                $scope.muestraMensajeError(true);
            });
        } else {
            $scope.muestraMensajeValidacion(true);
        }
    };


    $scope.gridActividadEconomica = {
        data: 'listaActividadEconomica',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        columnDefs: [
            {
                field: 'codigo',
                displayName: "Código",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'descripcion',
                displayName: "Descripción",
                width: '70%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }
        ]
    };


    $scope.cancelar = function () {
        $modalInstance.close(null);
    };


    init();


});

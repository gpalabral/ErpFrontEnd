/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalListaAdicionaCargoCtrl', function ($scope, cxcService, serverConf, $modalInstance, rhCargoModel, $timeout, rhServices, cxpService) {


    /*Creado por: Henrry Guzman
     Obtiene el listado de servicios para Contratos*/


    $scope.listaRhCargo = [];
    var rhCargoObjeto = new rhCargoModel();
    $scope.rhCargo = rhCargoObjeto.getObject();

    $scope.activaMensajeExitoso = false;
    $scope.activaMensajeErroneo = false;
    $scope.activaMensajeValidacion = false;
    $scope.activaMensajeValidacionCodigo = false;

    function init() {
        $scope.actualizaListaCargo();
        actualizaListaCargo();
        listaDepartamentosAndSeccion();

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

    function actualizaListaCargo() {
        rhServices.listaRhCargo({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaRhCargo = response.data;
        }, function (responseError) {
            //error
        });
    };

    function listaDepartamentosAndSeccion() {
        cxpService.getListaDepartamentosByEstado({}, {}, "VIG", serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaDepartamento = response.data;
        }, function (responseError) {
            //error
        });
    }

    $scope.selecionaSeccionPorIdDepartamento = function () {
        if ($scope.rhCargo.erpDepartamento.idDepartamento != null) {
            rhServices.listaSeccionesPorIdDepartamento({}, {}, $scope.rhCargo.erpDepartamento.idDepartamento, serverConf.ERPCONTA_WS, function (response) {
                //exito
                $scope.listaSecciones = response.data;
            }, function (responseError) {
                //error
            });
        } else {
            $scope.listaSecciones = [];
        }
    };

    $scope.actualizaListaCargo = function () {
        rhServices.listaRhCargo({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaRhCargo = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.guardaRhCargo = function () {
        $scope.showLoader();
        rhServices.verificaExistenciaCodigoRhCargo({}, {}, $scope.rhCargo.codigo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            if (!response.data) {
                rhServices.guardaCargo($scope.rhCargo, {}, serverConf.ERPCONTA_WS, function (response) {
                    //exito
                    $scope.actualizaListaCargo();
                    $scope.muestraMensajeExitoso(true);
                    $scope.rhCargo = rhCargoObjeto.getObject();
                    $scope.hideLoader();
                }, function (responseError) {
                    //error
                    $scope.mensajeError = "Se produjo un error en el sistema al registrar.";
                    $scope.muestraMensajeError(true);
                    $scope.hideLoader();
                });
            } else {
                $scope.muestraMensajeValidacionCodigo(true);
                $scope.hideLoader();
            }

        }, function (responseError) {
            //error

            $scope.mensajeError = "El código a registrar ya existe.";
            $scope.muestraMensajeError(true);
            $scope.hideLoader();
        });
    };

    $scope.mySelections = [];
    $scope.gridActividadEconomica = {
        data: 'listaRhCargo',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        selectedItems: $scope.mySelections,
        enableSorting: true,
        columnDefs: [
            {
                field: 'codigo',
                displayName: "Código",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'nombreCargo',
                displayName: "Nombre Cargo",
                width: '40%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'erpDepartamento.descripcion',
                displayName: "Departamento",
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'rhSeccion.descripcion',
                displayName: "Sección",
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }
        ]
    };


    $scope.seleccionarCargo = function () {

        if (typeof $scope.mySelections[0] != "undefined") {
            $modalInstance.close($scope.mySelections[0]);
        } else {
            $scope.mensajeError = "Es necesario seleecionar un registro para esta acción.";
            $scope.muestraMensajeError(true);
        }

    };

    $scope.volver = function () {
        $modalInstance.dismiss('cancel');
    };

    init();


})
;

/**
 * Created by paola on 14-10-15.
 */
'use strict';

app.controller('panelParamCriterioDeIngresoCtrl', function ($scope, $state, cxcService, rhServices, serverConf, rhCriterioDeIngresoModel, localStorageService, modalService) {
    var rhCriterioDeIngresoModelObjeto = new rhCriterioDeIngresoModel();

    function init() {

        //Autor: Henrry Guzmán Primera Pestaña

        $scope.rhCriterioDeIngreso = rhCriterioDeIngresoModelObjeto.getObject();
        $scope.rhCriterioDeIngreso.parTipoAplicacionDescuentoCriterioDeIngreso.codigo = "MONT";
        $scope.periodoGestion = localStorageService.get('periodoGestionObjeto');
        console.info("PERIODO:", $scope.periodoGestion);
        $scope.listaRhCriterioDeIngreso = [];
        actualistaRhCriterioDeIngreso();

        rhServices.obtieneRegistroPorPeriodoGestion({}, {}, $scope.periodoGestion.periodo, $scope.periodoGestion.gestion, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("ENRTRTTRTRTRTRT");
            $scope.periodoGestion = response.data;
            $scope.disabledBoton = {
                muestraPanelBotones: $scope.periodoGestion.parEstadoPeriodoGestion.codigo != "VIG"
            };
        }, function (responseError) {
            //error
        });
    }

    function actualistaRhCriterioDeIngreso() {
        rhServices.listaRhCriterioDeIngreso({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaRhCriterioDeIngreso = response.data;
        }, function (responseError) {
            //error
        });
    }


    $scope.btnEditaCriterioDeIngreso = '<div align="center"><button type="button" ng-disabled="disabledBoton.muestraPanelBotones" height="5" class="btn btn-default" ng-click="modalFormularioCriterioDeIngresoEdita(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Plan Pago">' +
    '<span class="glyphicon glyphicon-pencil"></span></button></div>';

    $scope.btnEliminaCriterioDeIngreso = '<div align="center"><button id="eliminaPlanFacturacion" type="button" ng-disabled="disabledBoton.muestraPanelBotones" height="5" class="btn btn-default" ng-click="modalMensajeConfirmacionEliminaCriterioDeIngreso(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-trash"></span></button></div>';

    $scope.mySelections = [];
    $scope.gridCriterioDeIngreso = {
        data: 'listaRhCriterioDeIngreso',
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
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'descripcion',
                displayName: "Nombre Bono",
                width: '60%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                displayName: "Editar",
                cellTemplate: $scope.btnEditaCriterioDeIngreso,
                headerClass: "header-center",
                width: '10%',
                enableCellEdit: false
            },
            {
                displayName: "Eliminar",
                cellTemplate: $scope.btnEliminaCriterioDeIngreso,
                headerClass: "header-center",
                width: '10%',
                enableCellEdit: false
            }
            //{
            //    field: 'parTipoAplicacionDescuentoCriterioDeIngreso.descripcion',
            //    displayName: "Tipo Aplicación",
            //    width: '20%',
            //    headerClass: "header-center",
            //    cellClass: "text-left",
            //    sortable: true
            //}
        ]
    };


    $scope.guardaCriterioDeIngreso = function () {
        $scope.showLoader();
        rhServices.verificaExistenciaCodigoCriterioDeIngreso({}, {}, $scope.rhCriterioDeIngreso.codigo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            if (!response.data) {
                rhServices.guardaRhCriterioDeIngreso($scope.rhCriterioDeIngreso, {}, $scope.periodoGestion.idPeriodoGestion, serverConf.ERPCONTA_WS, function (response) {
                    //exito
                    actualistaRhCriterioDeIngreso();
                    $scope.rhCriterioDeIngreso = rhCriterioDeIngresoModelObjeto.getObject();
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Confirmación",
                        bodyText: "Se registro exitosamente el Bono.",
                        actionButtonText: "Continuar",
                        type: 'exito',
                        closeAfter: 6000
                    });
                }, function (responseError) {
                    //error
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Error",
                        bodyText: "Existe un error en el Sistema,al registrar el Bono.",
                        actionButtonText: "Continuar",
                        type: 'error',
                        closeAfter: 6000
                    });
                });
            } else {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "El código a registrar ya existe.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            }

        }, function (responseError) {
            //error
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Existe un error en el Sistema, al verificar existencia de código.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        });
    };

    $scope.modalFormularioCriterioDeIngresoEdita = function (row) {
        var modalCriterioDeIngreso = modalService.show(
            {
                templateUrl: 'modules/rh/views/modalCriterioDeIngresoEditaRegistrado.html',
                controller: 'modalCriterioDeIngresoEditaRegistradoCtrl',
                size: 'md'
            }, {
                criterioDeIngresoEnviado: row.entity
            }
        ).then(function (respModal) {
                $scope.showLoader();
                rhServices.modificaRhCriterioDeIngreso(respModal, {}, serverConf.ERPCONTA_WS, function (response) {
                    //exito
                    //row.entity = respModal;
                    actualistaRhCriterioDeIngreso();
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Confirmación",
                        bodyText: "Se modifico exitosamente el Criterio de Ingreso.",
                        actionButtonText: "Continuar",
                        type: 'exito',
                        closeAfter: 6000
                    });
                }, function (responseError) {
                    //error
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Error",
                        bodyText: "Existe un error en el Sistema,al modificar el Criterio de Ingreso.",
                        actionButtonText: "Continuar",
                        type: 'error',
                        closeAfter: 6000
                    });
                });
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.modalMensajeConfirmacionEliminaCriterioDeIngreso = function (row) {
        rhServices.verificaCriterioDeIngresoEmpleadoCargoPorIdDescuentoAndIdPeriodoParaEliminar({}, {}, row.entity.idCriterioDeIngreso, $scope.periodoGestion.idPeriodoGestion, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("RESPUESTRA:::",response.data);
            if (response.data) {

                var modalMensajeConfirmacion = modalService.show(
                    {
                        templateUrl: 'modules/rh/views/mensajeConfirmacionEliminacionCriterioDeIngreso.html',
                        controller: 'mensajeConfirmacionEliminacionCriterioDeIngresoCtrl',
                        size: 'md'
                    }, {
                        criterioDeIngresoEnviado: row.entity
                    }
                ).then(function (respModal) {
                        if (respModal) {
                            $scope.showLoader();
                            rhServices.deleteRhCriterioDeIngreso({}, {},row.entity.idCriterioDeIngreso, serverConf.ERPCONTA_WS, function (response) {
                                //exito
                                actualistaRhCriterioDeIngreso();
                                $scope.hideLoader();
                                $scope.showCustomModal({
                                    headerText: "Mensaje Confirmación",
                                    bodyText: "Se elimino exitosamente el Criterio de Ingreso.",
                                    actionButtonText: "Continuar",
                                    type: 'exito',
                                    closeAfter: 6000
                                });
                            }, function (responseError) {
                                //error
                                $scope.hideLoader();
                                $scope.showCustomModal({
                                    headerText: "Mensaje Error",
                                    bodyText: "Existe un error en el Sistema,al eliminar el Criterio de Ingreso.",
                                    actionButtonText: "Continuar",
                                    type: 'error',
                                    closeAfter: 6000
                                });
                            });
                        }
                    });
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            } else {
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "No se puede eliminar el Criterio de Ingreso, ya que esta siendo utilizado en algun proceso.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            }

        }, function (responseError) {
            //error
        });
    };


    init();


});

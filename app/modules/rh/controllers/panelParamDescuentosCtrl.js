/**
 * Created by paola on 14-10-15.
 */
'use strict';

app.controller('panelParamDescuentosCtrl', function ($scope, $state, cxcService, rhServices, serverConf, rhDescuentoModel, localStorageService, modalService) {
    var rhDescuentoObjeto = new rhDescuentoModel();

    function init() {

        //Autor: Henrry Guzmán Primera Pestaña

        $scope.rhDescuento = rhDescuentoObjeto.getObject();
        $scope.rhDescuento.parTipoAplicacionDescuentoCriterioDeIngreso.codigo = "MONT";
        $scope.periodoGestion = localStorageService.get('periodoGestionObjeto');
        console.info("PERIODO:", $scope.periodoGestion);
        $scope.listaRhDescuentos = [];
        actuaListaRhDescuentos();

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

    function actuaListaRhDescuentos() {
        rhServices.listaRhDescuento({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaRhDescuentos = response.data;
        }, function (responseError) {
            //error
        });
    }


    $scope.btnEditaDescuento = '<div align="center"><button type="button" ng-disabled="disabledBoton.muestraPanelBotones" height="5" class="btn btn-default" ng-click="modalFormularioDescuentoEdita(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Plan Pago">' +
    '<span class="glyphicon glyphicon-pencil"></span></button></div>';

    $scope.btnEliminaDecuento = '<div align="center"><button id="eliminaPlanFacturacion" type="button" ng-disabled="disabledBoton.muestraPanelBotones" height="5" class="btn btn-default" ng-click="modalMensajeConfirmacionEliminaDescuento(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-trash"></span></button></div>';

    $scope.mySelections = [];
    $scope.gridDescuentos = {
        data: 'listaRhDescuentos',
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
                displayName: "Nombre Descuento",
                width: '60%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                displayName: "Editar",
                cellTemplate: $scope.btnEditaDescuento,
                headerClass: "header-center",
                width: '10%',
                enableCellEdit: false
            },
            {
                displayName: "Eliminar",
                cellTemplate: $scope.btnEliminaDecuento,
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


    $scope.guardaRhDescuento = function () {
        $scope.showLoader();
        rhServices.verificaExistenciaCodigoDescuento({}, {}, $scope.rhDescuento.codigo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            if (!response.data) {
                rhServices.guardaRhDescuento($scope.rhDescuento, {}, $scope.periodoGestion.idPeriodoGestion, serverConf.ERPCONTA_WS, function (response) {
                    //exito
                    actuaListaRhDescuentos();
                    $scope.rhDescuento = rhDescuentoObjeto.getObject();
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Confirmación",
                        bodyText: "Se registro exitosamente el Descuento.",
                        actionButtonText: "Continuar",
                        type: 'exito',
                        closeAfter: 6000
                    });
                }, function (responseError) {
                    //error
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Error",
                        bodyText: "Existe un error en el Sistema,al registrar el Descuento.",
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

    $scope.modalFormularioDescuentoEdita = function (row) {
        var modalDescuento = modalService.show(
            {
                templateUrl: 'modules/rh/views/modalDescuentoEditaRegistrado.html',
                controller: 'modalDescuentoEditaRegistradoCtrl',
                size: 'md'
            }, {
                descuentoEnviado: row.entity
            }
        ).then(function (respModal) {
                $scope.showLoader();
                rhServices.modificaRhDescuento(respModal, {}, serverConf.ERPCONTA_WS, function (response) {
                    //exito
                    //row.entity = respModal;
                    actuaListaRhDescuentos();
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Confirmación",
                        bodyText: "Se modifico exitosamente el Descuento.",
                        actionButtonText: "Continuar",
                        type: 'exito',
                        closeAfter: 6000
                    });
                }, function (responseError) {
                    //error
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Error",
                        bodyText: "Existe un error en el Sistema,al modificar el Descuento.",
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

    $scope.modalMensajeConfirmacionEliminaDescuento = function (row) {

        rhServices.verificaDescuentosPorIdDescuentoAndIdPeriodoParaEliminar({}, {}, row.entity.idDescuento, $scope.periodoGestion.idPeriodoGestion, serverConf.ERPCONTA_WS, function (response) {
            //exito
            if (response.data) {
                var modalMensajeConfirmacion = modalService.show(
                    {
                        templateUrl: 'modules/rh/views/mensajeConfirmacionEliminacionDescuento.html',
                        controller: 'mensajeConfirmacionEliminacionDescuentoCtrl',
                        size: 'md'
                    }, {
                        descuentoEnviado: row.entity
                    }
                ).then(function (respModal) {
                        if (respModal) {
                            $scope.showLoader();
                            rhServices.deleteRhDescuento({}, {},row.entity.idDescuento, serverConf.ERPCONTA_WS, function (response) {
                                //exito
                                actuaListaRhDescuentos();
                                $scope.hideLoader();
                                $scope.showCustomModal({
                                    headerText: "Mensaje Confirmación",
                                    bodyText: "Se elimino exitosamente el Descuento.",
                                    actionButtonText: "Continuar",
                                    type: 'exito',
                                    closeAfter: 6000
                                });
                            }, function (responseError) {
                                //error
                                $scope.hideLoader();
                                $scope.showCustomModal({
                                    headerText: "Mensaje Error",
                                    bodyText: "Existe un error en el Sistema,al eliminar el Descuento.",
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
                    bodyText: "No se puede eliminar el Descuento, ya que esta siendo utilizado en algun proceso.",
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

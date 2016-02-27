'use strict';

app.controller('paginaInicialRecursosHumanosCtrl', function ($scope, $modal, modalService, rhServices, serverConf, rhPeriodoGestionModel, localStorageService, $state) {

    var rhPeriodoGestionObjeto = new rhPeriodoGestionModel();

    var init = function () {
        $scope.rhPeriodoGestion = rhPeriodoGestionObjeto.getObject();
        $scope.showModalRegistroPaginaInicio();
    };


    $scope.showModalRegistroPaginaInicio = function () {
        var modalInicioRecursosHumanos = modalService.show(
            {
                templateUrl: 'modules/rh/views/periodoRegistroPaginaInicio.html',
                controller: 'periodoRegistroPaginaInicioCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                $scope.showLoader();
                $scope.rhPeriodoGestion = respModal;
                rhServices.existeGestion({}, {}, $scope.rhPeriodoGestion.periodo, $scope.rhPeriodoGestion.gestion, serverConf.ERPCONTA_WS, function (response) {
                    //exito
                    if (response.data) {
                        rhServices.obtieneRegistroPorPeriodoGestion({}, {}, $scope.rhPeriodoGestion.periodo, $scope.rhPeriodoGestion.gestion, serverConf.ERPCONTA_WS, function (response) {
                            //exito
                            $scope.hideLoader();
                            localStorageService.set('periodoGestionObjeto', response.data);
                            $state.go('rhEnBlanco');
                        }, function (responseError) {
                            //error
                        });
                    } else {
                        rhServices.obtienePeriodoGestionUltimoVigente({}, {}, serverConf.ERPCONTA_WS, function (response) {
                            //exito
                            $scope.hideLoader();
                            if (response.data == 0) {
                                $scope.showModalRegistroPerioGestion();
                            } else {
                                $scope.rhPeriodoGestion = response.data;
                                $scope.showModalMensajePerioGestion();
                            }
                        }, function (responseError) {
                            //error
                        });
                    }
                }, function (responseError) {
                    //error
                });
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };


    $scope.showModalRegistroPerioGestion = function () {
        var modalRegistroPerioGestion = modalService.show(
            {
                templateUrl: 'modules/rh/views/registroPeriodoGestionConfirmacion.html',
                controller: 'registroPeriodoGestionConfirmacionCtrl',
                size: 'md'
            }, {
                rhPeriodoGestion: $scope.rhPeriodoGestion
            }
        ).then(function (respModal) {
                $scope.rhPeriodoGestion = respModal;
                rhServices.persistRhPeriodoGestionCompleto($scope.rhPeriodoGestion, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                    console.info("OBJETO PERIODO:",$scope.rhPeriodoGestion);
                    $scope.hideLoader();
                    localStorageService.set('periodoGestionObjeto', respuesta.data);
                    $scope.showCustomModal({
                        headerText: "Mensaje Confirmación",
                        bodyText: "Se registro exitosamente el Periodo. Se realizó el registro automático de la parametrización con los datos anteriores a la gestión pasada, ahora puede continuar con la modificación.",
                        actionButtonText: "Continuar",
                        type: 'exito',
                        closeAfter: 10000
                    });
                    $state.transitionTo('panelParamGeneral', {}, {reload: true});
                }, function (respuestaDeError) {
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Error",
                        bodyText: "Existe un error al registrar el Periodo.",
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

    $scope.showModalMensajePerioGestion = function () {
        var modalRegistroPerioGestion = modalService.show(
            {
                templateUrl: 'modules/rh/views/mensajePeriodoGestion.html',
                controller: 'mensajePeriodoGestionCtrl',
                size: 'md'
            }, {
                rhPeriodoGestion: $scope.rhPeriodoGestion
            }
        ).then(function (respModal) {
                if (respModal) {
                    $scope.showModalRegistroPaginaInicio();
                }
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };


    init();


});
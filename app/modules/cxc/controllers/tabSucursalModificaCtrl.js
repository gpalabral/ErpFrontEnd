/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('tabSucursalModificaCtrl', function ($rootScope, $scope, cxcService, serverConf, $state, $timeout, tempCache, sucursalModel, $stateParams) {
    $scope.readOnlyEnable = true;

    $scope.botonAdiciona = false;
    $scope.botonModifica = true;

    $scope.activar = {
        treeDosificacion: true,
        adicionaDosificacion: false,
        modificaDosificacion: false,
        treeDosificacionNotaDebitoCredito: true,
        adicionaDosificacionNotaDebidoCredito: false,
        modifcaDosificacionNotaDebidoCredito: false
    };

    $scope.elementoSeleccionado = function (model, type) {
        console.log("type: "+type);
        if( type == 'dosificacion' ) {
            $scope.$broadcast("dosificacionSeleccionada", model);
        } else {
            $scope.$broadcast("dosificacionNotaDebidoCreditoSeleccionada", model);
        }
    };

    $scope.elementoModificado = function (type) {
        if( type === 'dosificacion'  ) {
            $scope.$broadcast("actualizaListaDosificacion");
        } else {
            $scope.$broadcast("actualizaListaDosificacionNotaDebitoCredito");
        }

    };

    $scope.crearNuevaDosificacion = function (model, type) {
        if( type === 'dosificacion' ) {
            $scope.$broadcast("adicionaDosificacion", model);
        } else {
            $scope.$broadcast("adicionaDosificacionNotaDebitoCredito", model);
        }

    };

    var sucursal = new sucursalModel();

    function init() {
        $scope.showLoader();
        cxcService.getParDepartamento({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParDepartamento = response.data;
        }, function (responseError) {
            //error
        });

        cxcService.getParLocalizacion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParLocalizacion = response.data;
        }, function (responseError) {
            //error
        });

        cxcService.getCpcSucursalByIdSucursal({}, {}, $stateParams.idEntidadPojo, serverConf.ERPCONTA_WS, function (response) {
            $scope.cpcsucursal = response.data;
            $scope.hideLoader();
            cxcService.getParMunicipio({}, {}, $scope.cpcsucursal.parDepartamento.codigo, serverConf.ERPCONTA_WS, function (response) {
                $scope.listaParMunicipio = response.data;
                $scope.hideLoader();
            }, function (responseError) {
                //error
                $scope.hideLoader();
            });
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });
    };

    $scope.addDosificacion = function () {
        $state.go('dosificacionAdiciona');
    };

    $scope.modificaSucursal = function () {
        $scope.showLoader();
        if (sucursal.validate($scope.cpcsucursal)) {
            cxcService.modificaSucursal($scope.cpcsucursal, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Confirmación",
                    bodyText: "Se modificó exitosamente la Sucursal.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 5000
                });

                $state.transitionTo('sucursalTemplate.empty', {}, {reload: true});
            }, function (responseError) {
                //error
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Existe un error al modificar la Sucursal.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 5000
                });


            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validación",
                bodyText: "Validación: Existen campos vacios o datos incorrectos, verifique por favor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        }
    };

    $scope.actualizaListaMunicipio = function () {
        cxcService.getParMunicipioPorCodigoDepartamento({}, {}, $scope.cpcsucursal.parDepartamento.codigo, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParMunicipio = response.data;
        }, function (responseError) {
            //error
        });
    };


    $scope.cancelar = function () {
        $state.transitionTo('sucursalTemplate.empty', {}, {reload: true});
    };

    init();


})
;

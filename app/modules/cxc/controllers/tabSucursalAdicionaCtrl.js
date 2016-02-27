/**
 * Created by HENRRY on 16/04/2015.
 */

'use strict';

app.controller('tabSucursalAdicionaCtrl', function ($scope, cxcService, serverConf, $state, $timeout, tempCache, sucursalModel) {
    $scope.readOnlyEnable = false;
    $scope.botonAdiciona=true;
    $scope.botonModifica=false;

    var sucursal = new sucursalModel();
    $scope.cpcsucursal = sucursal.getObject();

    $scope.activar={
        tab:true
    };


    function init() {

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

        cxcService.getNumeroSucursal({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.cpcsucursal.numeroSucursal = response.data;
        }, function (responseError) {
            //error
        });

    }


    $scope.actualizaListaMunicipio = function () {
        cxcService.getParMunicipioPorCodigoDepartamento({}, {}, $scope.cpcsucursal.parDepartamento.codigo, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParMunicipio = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.guardarSucursal = function () {
        $scope.showLoader();
        if (sucursal.validate($scope.cpcsucursal)) {
            cxcService.adicionaSucursal($scope.cpcsucursal, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                // EXITO
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Confirmación",
                    bodyText: "Se registro exitosamente la Sucursal.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 5000
                });
                $state.transitionTo('sucursalTemplate.empty', {}, {reload: true});
            }, function (respuestaDeError) {
                // ERROR
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Existe un error al registrar la Sucursal.",
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
    }


    init();


});

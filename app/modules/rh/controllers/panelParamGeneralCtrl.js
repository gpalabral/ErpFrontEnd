/**
 * Created by paola on 14-10-15.
 */
'use strict';

app.controller('panelParamGeneralCtrl', function ($scope, $state, cxcService, rhServices, serverConf, rhParametrosModel, localStorageService, $timeout) {
    var rhParametrosObjeto = new rhParametrosModel();

    $scope.listaEmpleadoEncargado = [];
    $scope.listaEmpleadoAprueba = [];
    $scope.readOnlyEnable = false;


    $scope.activar = {
        tab: null
    };

    function init() {

        //Autor: Henrry Guzmán Primera Pestaña


        $scope.periodoGestion = localStorageService.get('periodoGestionObjeto');

        //$scope.readOnlyEnable = $scope.periodoGestion.parEstadoPeriodoGestion.codigo == "VIG";
        listaEmpleadoEncargadoAndEmpleadoAprueba();


        $scope.rhParametros = rhParametrosObjeto.getObject();

        rhServices.obtieneRegistroPorPeriodoGestion({}, {}, $scope.periodoGestion.periodo, $scope.periodoGestion.gestion, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.periodoGestion = response.data;
            $scope.muestraPanelBotones = $scope.periodoGestion.parEstadoPeriodoGestion.codigo == "VIG";
        }, function (responseError) {
            //error
        });
        rhServices.obtieneRhParametrosPorPeriodoGestion({}, {}, $scope.periodoGestion.idPeriodoGestion, serverConf.ERPCONTA_WS, function (response) {
            //exito
            if (response.data == 0) {
                $scope.activar.tab = true;
                $scope.rhParametros.rhPeriodoGestion = $scope.periodoGestion;
                $scope.readOnlyEnable = false;
            } else {
                $scope.activar.tab = false;
                $scope.rhParametros = response.data;
                console.info("$scope.rhParametros:", $scope.rhParametros);
                $scope.rhParametros.fechaLiquidacion = new Date($scope.rhParametros.fechaLiquidacion);
                $scope.readOnlyEnable = true;
            }
        }, function (responseError) {
            //error
        });
    }

    function listaEmpleadoEncargadoAndEmpleadoAprueba() {
        rhServices.listaRhEmpleadoConCargoAsignado({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaEmpleadoEncargado = response.data;
            $scope.listaEmpleadoAprueba = response.data;
            console.info("LISTA:", response.data);
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });
    }


    $scope.obtieneCargoPorIdEmpeladoEncargado = function () {

        rhServices.obtieneEmpleadoCargoPorIdEmpleado({}, {}, $scope.rhParametros.rhEmpleadoEncargado.idEmpleado, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.rhParametros.rhCargoEncargado = response.data.rhCargo;
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });

    };

    $scope.obtieneCargoPorIdEmpeladoAprueba = function () {
        console.info("CARGO SELECCIONADO:");
        rhServices.obtieneEmpleadoCargoPorIdEmpleado({}, {}, $scope.rhParametros.rhEmpleadoAprueba.idEmpleado, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.rhParametros.rhCargoAprueba = response.data.rhCargo;
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });

    };


    $scope.guardaDatosGenerales = function () {
        $scope.showLoader();
        rhServices.persistRhParametrosDatosGenearles($scope.rhParametros, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.activar.tab = false;
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Confirmación",
                bodyText: "Se registro exitosamente los Datos Generales.",
                actionButtonText: "Continuar",
                type: 'exito',
                closeAfter: 6000
            });
            //$state.transitionTo('rhEnBlanco', {}, {reload: true});
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Existe un error en el Sistema,al registrar los Datos Generales.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        });

    };

    $scope.modificaRhParametrosPatronalesAndLaborales = function () {
        $scope.showLoader();
        console.info("$scope.rhParametros:", $scope.rhParametros);
        rhServices.persistModificaRhParametrosPatronalesAndLaborales($scope.rhParametros, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.activar.tab = false;
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Confirmación",
                bodyText: "Se registro exitosamente.",
                actionButtonText: "Continuar",
                type: 'exito',
                closeAfter: 6000
            });
            //$state.transitionTo('rhEnBlanco', {}, {reload: true});
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Existe un error en el Sistema.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        });

    };


    init();


});

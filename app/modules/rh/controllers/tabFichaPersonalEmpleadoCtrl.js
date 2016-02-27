/**
 * Created by paola on 08-10-15.
 */
'use strict';

app.controller('tabFichaPersonalEmpleadoCtrl', function ($scope, rhEmpleadoModel, rhServices, cxpService, cxcService, serverConf, $state,rhEmpleadoCargoModel) {


    var rhEmpleadoObjeto = new rhEmpleadoModel();

    var rhEmpleadoCargoObjeto = new rhEmpleadoCargoModel();

    $scope.escondeCampoApellidoCasada = false;

    $scope.activar = {
        tab: true
    };


    function init() {

        //Autor: Henrry Guzmán Primera Pestaña
        $scope.rhEmpleado = rhEmpleadoObjeto.getObject();
        $scope.rhEmpleadoCargo = rhEmpleadoCargoObjeto.getObject();
        $scope.rhEmpleado.diasVacacion=0;
        listaParEstadoCivil();
        listaParTipoDocumento();
        listaParBanco();
        obtieneCodigo();
        //Autor: Henrry Guzmán Segunda Pestaña


    }

    //Autor: Henrry Guzmán Primera Pestaña Metodos

    function listaParEstadoCivil() {
        rhServices.getParEstadoCivil({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParEstadoCivil = response.data;
        }, function (responseError) {
            //error
        });
    }

    function listaParTipoDocumento() {
        cxpService.getListParTipoDocumento({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParTipoDocumento = response.data;
        }, function (responseError) {
            //error
        });
    }

    function listaParBanco() {
        cxcService.getParBanco({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParBanco = response.data;
        }, function (responseError) {
            //error
        });
    }

    function obtieneCodigo() {
        rhServices.obtieneCodigo({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.rhEmpleadoCargo.rhEmpleado.codigo = response.data;
        }, function (responseError) {
            //error
        });
    }

    $scope.guardaDatosEmpleado = function () {
        console.info("OBJETO DATOS EMPLEADO:", $scope.rhEmpleadoCargo.rhEmpleado);
        $scope.showLoader();
        console.log(JSON.stringify($scope.rhEmpleadoCargo.rhEmpleado, null, 4));

        $scope.rhEmpleadoCargo.rhEmpleado.parCondicionPension = null;
        $scope.rhEmpleadoCargo.rhEmpleado.parTipoAFP = null;
        rhServices.adicionaEmpleado($scope.rhEmpleadoCargo.rhEmpleado, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Confirmación",
                bodyText: "Se registro exitosamente el registro de datos empleado.",
                actionButtonText: "Continuar",
                type: 'exito',
                closeAfter: 6000
            });
            $state.transitionTo('panelEmpleado', {}, {reload: true});
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Existe un error al registrar datos empleado.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        });


    };

    $scope.escondeCampoApellidoCasadaAction = function () {
        console.info("ENTROOOO ACCION:",$scope.rhEmpleado.parGenero.codigo);
        $scope.escondeCampoApellidoCasada = $scope.rhEmpleadoCargo.rhEmpleado.parGenero.codigo == "F";
    };


    //Autor: Henrry Guzmán Segunda Pestaña Metodos

    init();

});
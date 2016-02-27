/**
 * Created by paola on 23-02-15.
 */
'use strict';

app.controller('parametrizacionAlicuotasCtrl', function ($scope, cxpService, serverConf, parTipoAlicuotaModel, $state) {

    var parTipoAlicuota = new parTipoAlicuotaModel();

    $scope.listaAlicuotas = [];

    function init() {
        $scope.parTipoAlicuotaRIUES = parTipoAlicuota.getObject();
        $scope.parTipoAlicuotaRIUEB = parTipoAlicuota.getObject();
        $scope.parTipoAlicuotaRPRE = parTipoAlicuota.getObject();
        $scope.parTipoAlicuotaRIT = parTipoAlicuota.getObject();
        $scope.parTipoAlicuotaRRIVA = parTipoAlicuota.getObject();

        //
        //$scope.parTipoAlicuotaRIUES.codigo="RIUES";
        //$scope.parTipoAlicuotaRIUEB.codigo="RIUEB";
        //$scope.parTipoAlicuotaRPRE.codigo="RPRE";
        //$scope.parTipoAlicuotaRIT.codigo="RIT";
        //$scope.parTipoAlicuotaRRIVA.codigo="RRIVA";

        $scope.cargaParametricasPorCodigo();


    }

    $scope.cargaParametricasPorCodigo = function () {
        cxpService.findParAlicuotaByCodigo({}, {}, "RIUES", serverConf.ERPCONTA_WS, function (response) {
            console.info("1:",response.data);
            $scope.parTipoAlicuotaRIUES = response.data;
        }, function (responseError) {
            //error
        });
        cxpService.findParAlicuotaByCodigo({}, {}, "RIUEB", serverConf.ERPCONTA_WS, function (response) {
            console.info("2:",response.data);
            $scope.parTipoAlicuotaRIUEB = response.data;
        }, function (responseError) {
            //error
        });
        cxpService.findParAlicuotaByCodigo({}, {}, "RPRE", serverConf.ERPCONTA_WS, function (response) {
            console.info("3:",response.data);
            $scope.parTipoAlicuotaRPRE = response.data;
        }, function (responseError) {
            //error
        });
        cxpService.findParAlicuotaByCodigo({}, {}, "RIT", serverConf.ERPCONTA_WS, function (response) {
            console.info("4:",response.data);
            $scope.parTipoAlicuotaRIT = response.data;
        }, function (responseError) {
            //error
        });
        cxpService.findParAlicuotaByCodigo({}, {}, "RRIVA", serverConf.ERPCONTA_WS, function (response) {
            console.info("5:",response.data);
            $scope.parTipoAlicuotaRRIVA = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.guardaAlicuotas = function () {
        console.info("$scope.parTipoAlicuotaPIVA :", $scope.parTipoAlicuotaRIUES);
        console.info("$scope.parTipoAlicuotaPIT :", $scope.parTipoAlicuotaRIUEB);
        console.info("$scope.parTipoAlicuotaPRETS :", $scope.parTipoAlicuotaRPRE);
        console.info("$scope.parTipoAlicuotaRSIN :", $scope.parTipoAlicuotaRIT);
        console.info("$scope.parTipoAlicuotaPRBI :", $scope.parTipoAlicuotaRRIVA);
        $scope.listaAlicuotas.push($scope.parTipoAlicuotaRIUES);
        $scope.listaAlicuotas.push($scope.parTipoAlicuotaRIUEB);
        $scope.listaAlicuotas.push($scope.parTipoAlicuotaRPRE);
        $scope.listaAlicuotas.push($scope.parTipoAlicuotaRIT);
        $scope.listaAlicuotas.push($scope.parTipoAlicuotaRRIVA);

        cxpService.editParTipoAlicuota($scope.listaAlicuotas, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Los datos se registrarón correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 6000
            });
            $state.transitionTo('splashScreen', {}, {reload: true});
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Ocurrió un error.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 6000
            });
        });


    };

    $scope.cancelarModificacionAlicuotas=function(){
        $state.transitionTo('splashScreen', {}, {reload: true});
    };


    init();

});

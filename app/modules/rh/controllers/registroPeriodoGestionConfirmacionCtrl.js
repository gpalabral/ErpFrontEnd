'use strict';

app.controller('registroPeriodoGestionConfirmacionCtrl', function ($scope, $rootScope, tempCache, rhServices, serverConf, $modalInstance, $state, localStorageService, rhPeriodoGestionModel,$timeout,modalOptions) {
    $scope.modalOptions = modalOptions;
    console.info("ENTRO CONTROLADOR");
    var rhPeriodoGestionObjeto = new rhPeriodoGestionModel();

    var fechaSistema = new Date();

    var anio = fechaSistema.getFullYear();
    var mes = fechaSistema.getMonth() + 1;

    $scope.activaMensajeErroneo = false;

    function init() {

        $scope.rhPeriodoGestion = rhPeriodoGestionObjeto.getObject();
        if ($scope.modalOptions.rhPeriodoGestion!= null) {
            $scope.rhPeriodoGestion=$scope.modalOptions.rhPeriodoGestion;
        }
    }

    $scope.muestraMensajeError = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 6000);
    };



    $scope.cancelarRegistroPeriodoGestionConfirmacion = function () {
        //tempCache.tipoCambioContabilidad = $scope.tipoCambio = [];
        $modalInstance.dismiss('cancel');
        $state.go('menuBap');


        //$modalInstance.close(false);


    };

    $scope.controlPeriodo = function () {
        if ($scope.rhPeriodoGestion.periodo < 1 || $scope.rhPeriodoGestion.periodo > 12) {
            $scope.mensajeError="El valor del perido sobreapso su rango, se cambiara por el periodo actual.";
            $scope.rhPeriodoGestion.periodo = mes;
            $scope.muestraMensajeError(true);
        }
    };

    $scope.guardaPeriodoGestionConfirmacion=function(){
        $modalInstance.close($scope.rhPeriodoGestion);
    };


    init();


});
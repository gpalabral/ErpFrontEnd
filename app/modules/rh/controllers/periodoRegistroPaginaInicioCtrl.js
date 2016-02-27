'use strict';

app.controller('periodoRegistroPaginaInicioCtrl', function ($scope, $rootScope, tempCache, rhServices, serverConf, $modalInstance, $state, localStorageService, rhPeriodoGestionModel, $timeout) {

    var rhPeriodoGestionObjeto = new rhPeriodoGestionModel();

    var fechaSistema = new Date();
    var anio = fechaSistema.getFullYear();
    var mes = fechaSistema.getMonth() + 1;

    $scope.activaMensajeErroneo = false;

    function init() {
        $scope.rhPeriodoGestion = rhPeriodoGestionObjeto.getObject();


        rhServices.obtienePeriodoGestionUltimoVigente({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            if (response.data == 0) {
                $scope.rhPeriodoGestion.periodo = mes;
                $scope.rhPeriodoGestion.gestion = anio;
            } else {
                $scope.rhPeriodoGestion = response.data;
            }
        }, function (responseError) {
            //error
        });

    }

    $scope.muestraMensajeError = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 6000);
    };

    $scope.cancelarRegistroPeriodoGestion = function () {
        $modalInstance.dismiss('cancel');
        $state.go('menuBap');
    };

    $scope.controlPeriodo = function () {
        if ($scope.rhPeriodoGestion.periodo < 1 || $scope.rhPeriodoGestion.periodo > 12) {
            $scope.mensajeError = "El valor del perido sobreapso su rango, se cambiara por el periodo actual.";
            $scope.rhPeriodoGestion.periodo = mes;
            $scope.muestraMensajeError(true);
        }
    };

    $scope.guardaPeriodoGestion = function () {
        $modalInstance.close($scope.rhPeriodoGestion);
    };


    init();


});
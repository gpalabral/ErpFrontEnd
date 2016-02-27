'use strict';

app.controller('mensajePeriodoGestionCtrl', function ($scope, $rootScope, tempCache, rhServices, serverConf, $modalInstance, $state, localStorageService, rhPeriodoGestionModel, $timeout, modalOptions) {
    $scope.modalOptions = modalOptions;
    var rhPeriodoGestionObjeto = new rhPeriodoGestionModel();

    var fechaSistema = new Date();

    var anio = fechaSistema.getFullYear();
    var mes = fechaSistema.getMonth() + 1;

    $scope.activaMensajeErroneo = false;

    function init() {

        $scope.rhPeriodoGestion = rhPeriodoGestionObjeto.getObject();
        if ($scope.modalOptions.rhPeriodoGestion != null) {
            $scope.rhPeriodoGestion = $scope.modalOptions.rhPeriodoGestion;
        }
    }

    $scope.retornaMenuPrincipal = function () {
        $modalInstance.dismiss('cancel');
        $state.go('menuBap');
    };

    $scope.entrarConOtroPeriodo = function () {
        $modalInstance.close(true);
    };


    init();


});
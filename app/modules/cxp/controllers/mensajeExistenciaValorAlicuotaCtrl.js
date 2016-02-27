'use strict';

app.controller('mensajeExistenciaValorAlicuotaCtrl', function ($scope, $modalInstance, $state, modalOptions) {
    $scope.modalOptions = modalOptions;



    $scope.retornaPaginaBlanco = function () {
        //$modalInstance.dismiss('cancel');
        //$state.go('menuBap');
        $modalInstance.close(false);
    };

    $scope.irAlicuota = function () {
        $modalInstance.close(true);
    };




});
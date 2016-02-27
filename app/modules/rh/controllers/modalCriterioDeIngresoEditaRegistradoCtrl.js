/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalCriterioDeIngresoEditaRegistradoCtrl', function ($scope, tempCache, $modalInstance, modalOptions, rhCriterioDeIngresoModel) {
    $scope.modalOptions = modalOptions;
    var rhCriterioDeIngresoModelObjeto = new rhCriterioDeIngresoModel();
    function init() {

        if (modalOptions.criterioDeIngresoEnviado != null) {
            $scope.rhCriterioDeIngreso = rhCriterioDeIngresoModelObjeto.getObject();
            $scope.rhCriterioDeIngreso = angular.copy(modalOptions.criterioDeIngresoEnviado);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    }


    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.seleccionar = function () {
        $modalInstance.close($scope.rhCriterioDeIngreso);
    };


    init();


});

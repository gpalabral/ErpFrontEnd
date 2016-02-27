/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalValidaIngresoContratosCtrl', function ($scope, $modalInstance,tempCache) {


    /*Creado por: Henrry Guzman*/


    function init() {
        $scope.validaListaActividadEconomica=tempCache.validaListaActividadEconomica;
        $scope.validaListaClientes=tempCache.validaListaClientes;
        $scope.validaListaServicioBienes=tempCache.validaListaServicioBienes;
    }

    $scope.continuar = function () {
        $modalInstance.close();
    };

    init();

});

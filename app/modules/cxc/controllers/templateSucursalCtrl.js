/**
 * Created by VLADY on 27/01/2015.
 */

'use strict';

app.controller('templateSucursalCtrl', function ($scope, $state, cxcService, serverConf, tempCache) {

    // definicon de variables
    $scope.sucursalTree = {};

    var init = function () {
        $scope.showLoader();
        cxcService.getSucursalArbol({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.sucursalTree = response.data;
            $scope.treeConfig = {
                collection: $scope.sucursalTree,
                childrenField: 'children',
                iconExpanded: 'fa fa-angle-down',
                iconCollapsed: 'fa fa-angle-right',
                onClickRow: $scope.elementSelected,
                collapseElements: true,
                selectByDefault: {
                    triggerClick: true,
                    firstByDefault: true
                },
                padding: 30,
                enableHeader: false,
                colDefinition: [
                    {field: 'descripcion', displayName: '', treeField: true}
                ]
            };
            $scope.hideLoader();
        }, function (error) {
            console.log("error");
            $scope.hideLoader();

        });
    };

    $scope.addSucursal = function () {
        //$scope.treeConfig.controls.selectByKeyAndValue(null,null);
        $state.go('sucursalTemplate.adiciona');
    };


    $scope.elementSelected = function (model) {
        if (model) {
            $state.transitionTo('sucursalTemplate.modifica', {idEntidadPojo: model.idEntidadPojo});
        } else {
            $scope.modelSelected = {};
        }
    };

    $scope.guardaSucursal=function(){
        $scope.showCustomModal({
            headerText : "Error Modal",
            bodyText : "Error message",
            actionButtonText : "Continuar",
            type : 'exito',
            closeAfter : 1000
        });


    };


    init();
});

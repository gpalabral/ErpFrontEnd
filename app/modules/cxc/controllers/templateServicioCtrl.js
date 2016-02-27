/**
 * Created by Henrry on 15/04/2015.
 */

'use strict';

app.controller('templateServicioCtrl', function ($rootScope, $scope, $state, cxcService, serverConf, tempCache) {

    // definicon de variables
    $scope.serviciotree = [];

    var init = function () {
        cxcService.getServiciosArbol({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.serviciotree = response.data;
            $scope.treeServicioConfig = {
                collection: $scope.serviciotree,
                childrenField: 'children',
                iconExpanded: 'fa fa-angle-down',
                iconCollapsed: 'fa fa-angle-right',
                onClickRow: $scope.elementSelected,
                collapseElements: true,
                controls: {},
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
        });

    };

    $scope.addServicio = function () {
        //$scope.treeServicioConfig.controls.selectByKeyAndValue(null,null);
        $state.go('servicioTemplate.adiciona');
    };


    $scope.elementSelected = function (model) {
        console.log("Registro Seleccinado=>", model);
        if (model) {
            //tempCache['grupoInfo'] = model;
            $scope.modelSelected = model;


            $state.transitionTo('servicioTemplate.modifica', {idEntidadPojo: model.idEntidadPojo});

        } else {
            //tempCache['grupoInfo'] = '';
            $scope.modelSelected = {};
        }
    };




    init();
});

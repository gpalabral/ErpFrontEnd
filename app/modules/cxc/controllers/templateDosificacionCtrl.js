/**
 * Created by Henrry on 15/04/2015.
 */

'use strict';

app.controller('templateDosificacionCtrl', function ($rootScope, $scope, $state, cxpService, serverConf, tempCache) {

    // definicon de variables
    $scope.grupos = [];

    var init = function () {
        cxpService.getGrupoConceptoTree({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.grupos.tree = response.data;
            $scope.treeConfig = {
                collection : $scope.grupos.tree,
                childrenField : 'children',
                iconExpanded : 'fa fa-angle-down',
                iconCollapsed : 'fa fa-angle-right',
                onClickRow : $scope.grupos.elementSelected,
                collapseElements : true,
                controls : {},
                selectByDefault: {
                    triggerClick: true,
                    firstByDefault: true
                },
                padding : 30,
                enableHeader : false,
                colDefinition : [
                    { field : 'descripcion', displayName : 'Grupos y Conceptos', treeField : true }
                ]
            };
            $scope.hideLoader();
        });

    };

    $scope.addSucursal = function () {
        $state.go('sucursales.adicion');
    };

    tempCache.grupoAdicionado = function () {
        console.log("sucursales adicionado");
        init();
    };


    $scope.grupos.elementSelected = function (model) {
        console.log("Registro Seleccinado=>",model);
        if ( model ) {
            tempCache['grupoInfo'] = model;
            $scope.modelSelected = model;

            if (model.tipo == "GRU")
                $state.transitionTo('sucursal.modifica', {idEntidadPojo:model.idEntidadPojo});
            else
                $state.transitionTo('sucursal.modifica', {idEntidadPojo:model.idEntidadPojo});


        } else {
            tempCache['grupoInfo'] = '';
            $scope.modelSelected = {};
        }
    };


    // ========== ui handlers ========== //
    $scope.carSelected = function (car) {
        alert(car.name);
    };
    $scope.rowClicked = function (item, level, event) {
        event.stopPropagation();
        alert('row clicked' + item.name + '/' + level);
    };

    init();
});

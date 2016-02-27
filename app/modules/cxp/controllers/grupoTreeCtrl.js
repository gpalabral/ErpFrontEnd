/**
 * Created by VLADY on 27/01/2015.
 */

'use strict';

app.controller('grupoTreeCtrl', function ($rootScope, $scope, $state, cxpService, serverConf, tempCache) {

    // definicon de variables
    $scope.grupos = [];

    var init = function () {
        cxpService.getGrupoConceptoTree({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.grupos.tree = response.data;
            $scope.treeConfig = {
                collection: $scope.grupos.tree,
                childrenField: 'children',
                iconExpanded: 'fa fa-angle-down',
                iconCollapsed: 'fa fa-angle-right',
                onClickRow: $scope.grupos.elementSelected,
                collapseElements: true,
                selectByDefault: {
                    triggerClick: true,
                    firstByDefault: true
                },
                padding: 30,
                enableHeader: false,
                colDefinition: [
                    {field: 'descripcion', displayName: 'Grupos y Conceptos', treeField: true}
                ]
            };
            $scope.hideLoader();
        });

    };

    $scope.addGrupo = function () {
        $state.go('templateGrupo.adiciona');
    };

    tempCache.grupoAdicionado = function () {
        console.log("grupo adicionado");
        init();
    };


    $scope.grupos.elementSelected = function (model) {
        console.log("Registro Seleccinado=>", model);
        if (model) {
            tempCache['grupoInfo'] = model;
            $scope.modelSelected = model;

            if (model.tipo == "GRU") {
                tempCache.idGrupo = model.idEntidadPojo;
                console.info("ID GRUPO CACHE:", tempCache.idGrupo);
                $state.transitionTo('templateGrupo.modifica', {idEntidadPojo: model.idEntidadPojo});
            } else {
                tempCache.idConceptoCache = model.idEntidadPojo;
                $state.transitionTo('templateGrupo.modificaConcepto', {idEntidadPojo: model.idEntidadPojo});
            }

        } else {
            tempCache['grupoInfo'] = '';
            $scope.modelSelected = {};
        }
    };
    /*  $scope.viewGroupDetail = function (grupo) {
     tempCache.grupoInfo = grupo;
     //$state.go('grupos.adicionModificacion',{idGrupo:grupo.idGrupo});
     if (grupo.idEntidadPadre == 0)
     $state.transitionTo('gruposTree.modificaGrupo', {}, {reload: true});
     else
     $state.transitionTo('gruposTree.modificaConcepto', {}, {reload: true});
     };
     */
    $scope.root = {
        children: [
            {
                name: 'Bmw',
                priceRange: '30k to 200k',
                children: [
                    {
                        name: '328i',
                        priceRange: '30k to 40k'
                    },
                    {
                        name: '335i',
                        priceRange: '35k to 47k'
                    },
                    {
                        name: '535i',
                        priceRange: '40k to 50k'
                    }
                ]
            },
            {
                name: 'Audi',
                priceRange: '30k to 200k',
                children: [
                    {
                        name: 'A4',
                        priceRange: '30k to 55k',
                        children: [
                            {
                                name: 'Quattro premium plus',
                                priceRange: '35k to 49k'
                            },
                            {
                                name: 'Quattro Prestige',
                                priceRange: '45k to 55k'
                            },
                            {
                                name: 'FWD',
                                priceRange: '35k to 40k'
                            }
                        ]
                    },
                    {
                        name: 'A6',
                        priceRange: '45k to 60k'
                    },
                    {
                        name: 'A8',
                        priceRange: '60k to 80k'
                    }
                ]
            },
            {
                name: 'Honda',
                priceRange: '15k to 50k',
                children: [
                    {
                        name: 'Civic',
                        priceRange: '15k to 20k'
                    },
                    {
                        name: 'Accord',
                        priceRange: '25k to 35k'
                    },
                    {
                        name: 'CRV',
                        priceRange: '25k to 35k'
                    }
                ]
            }
        ]
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

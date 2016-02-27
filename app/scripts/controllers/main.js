'use strict';

/**
 * @ngdoc function
 * @name myApp1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp1App
 */
angular.module('myApp')
    .controller('mainViewCtrl', function ($scope, $rootScope, localStorage, contabilidadService, $http, serverConf,cxpService) {
        $scope.showLoader();

        contabilidadService.getList({}, {gruponivel: 'PCTA'}, serverConf.ERPCONTA, function (respuesta) {

            $scope.treeConfig = {
                collection : createTree(respuesta.data),
                childrenField : 'children',
                iconExpanded : 'fa fa-angle-down',
                iconCollapsed : 'fa fa-angle-right',
                controls : {},
                onClickRow : function (item) {
                    console.log("item");
                    console.log(item);
                },
                collapseElements : true,
                padding: 15,
                enableHeader: true,
                contentColor : '#f5f5f5',
                disabledLevels : [],
                search: '',
                selectByDefault: {
                    triggerClick: true,
                    firstByDefault: true,
                    itemToSelect : {
                        field : "mascaraGenerada",
                        value : "BANCO MERCANTIL SANTA CRUZ M/N"
                    }
                },
                colDefinition : [
                    { field : 'descripcion', displayName : 'Descripcion', treeField : true, width : 60},
                    { field : 'mascaraGenerada', displayName : 'Mascara Generada', width : 40}
                ]
            };

            $scope.hideLoader();

        }, function (respuestaDeError) {

        });

    });

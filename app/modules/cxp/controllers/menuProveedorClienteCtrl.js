/**
 * Created by RENAN on 12/02/2015.
 */

'use strict';

app.controller('menuProveedorClienteCtrl', function ($scope, $state, cxpService, serverConf, tempCache) {

    $scope.listaProveedores=[];

    $scope.registroNuevoProveedor = function () {
        //$scope.treeConfig.controls.selectByKeyAndValue(null,null);
        $state.go('panelProveedorCliente.alta');
    };


    /*Modificado por: Paola Mejia
    * Descripcion: Obtiene el listado de Proveedores y Proveedores y Clientes*/
    $scope.listaCppProveedorClientePorTipoRegistro = function () {

        cxpService.getTreeCppProveedorClientePorTipoRegistro({}, {}, "PROV",serverConf.ERPCONTA_WS, function (response) {
            // EXITO
            $scope.listaProveedores.tree = response.data;
            console.log("LISTADO DE PROVEEDORES ARBOL",$scope.listaProveedores.tree);

            cxpService.getTreeCppProveedorClientePorTipoRegistro({}, {},"AMB", serverConf.ERPCONTA_WS, function (respuesta) {

                $scope.listaProveedores.tree=$scope.listaProveedores.tree.concat(respuesta.data);
                $scope.treeConfig = {
                    collection : $scope.listaProveedores.tree,
                    childrenField : 'children',
                    iconExpanded : 'fa fa-angle-down',
                    iconCollapsed : 'fa fa-angle-right',
                    onClickRow : $scope.listaProveedores.elementSelected,
                    collapseElements : false,
                    padding : 30,
                    enableHeader : false,
                    selectByDefault: {
                        triggerClick: true,
                        firstByDefault: true
                    },
                    colDefinition : [
                        { field : 'descripcion', displayName : 'Proveedores', treeField : true }
                    ]
                };
                $scope.hideLoader();
            })
        });


    };

    $scope.listaProveedores.elementSelected = function (model) {
        console.log("Registro Seleccinado=>",model);
        if(model)
        {
            $scope.modelSelected = model;
            $state.transitionTo('panelProveedorCliente.detalle', {'idEntidadPojo':$scope.modelSelected.idEntidadPojo});
        }

    };

    $scope.listaCppProveedorClientePorTipoRegistro();
});


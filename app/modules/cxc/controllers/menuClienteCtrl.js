/**
 * Created by Paola on 13/04/2015.
 */

'use strict';

app.controller('menuClienteCtrl', function ($scope, $state, cxpService, serverConf) {

    $scope.listaClientesProveedores=[];

    $scope.registroNuevoCliente = function () {
        //$scope.treeConfig.controls.selectByKeyAndValue(null,null);
        $state.go('panelCliente.nuevo');
    };

    /*Creado por: Paola Mejia
    * Descripcion: Obtiene el listado de Clientes y Proveedores y Clientes*/
    $scope.listaCppProveedorClientePorTipoRegistro = function () {
        $scope.showLoader();
        cxpService.getTreeCppProveedorClientePorTipoRegistro({}, {}, "CLI",serverConf.ERPCONTA_WS, function (response) {
            // EXITO
            $scope.listaClientesProveedores.tree = response.data;
                console.log("LISTADO DE CLIENTES ARBOL",$scope.listaClientesProveedores.tree);

            cxpService.getTreeCppProveedorClientePorTipoRegistro({}, {},"AMB", serverConf.ERPCONTA_WS, function (respuesta) {

                $scope.listaClientesProveedores.tree=$scope.listaClientesProveedores.tree.concat(respuesta.data);
                $scope.treeConfig = {
                    collection : $scope.listaClientesProveedores.tree,
                    childrenField : 'children',
                    iconExpanded : 'fa fa-angle-down',
                    iconCollapsed : 'fa fa-angle-right',
                    onClickRow : $scope.listaClientesProveedores.elementSelected,
                    collapseElements : false,
                    padding : 30,
                    enableHeader : false,
                    selectByDefault: {
                        triggerClick: true,
                        firstByDefault: true
                    },
                    colDefinition : [
                        { field : 'descripcion', displayName : 'Clientes', treeField : true }
                    ]
                };
                $scope.hideLoader();
            })
        });
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el elemento seleccionado del arbol de clientes y envia el id del Cliente/Cliente y Proveedor*/
    $scope.listaClientesProveedores.elementSelected = function (model) {
        console.log("menuCliente: Cliente seleccionado=>",model);
        if(model)
        {
            $scope.modelSelected = model;
            $state.transitionTo('panelCliente.editar', {'idEntidadPojo':$scope.modelSelected.idEntidadPojo});
        }

    };

    $scope.listaCppProveedorClientePorTipoRegistro();
});


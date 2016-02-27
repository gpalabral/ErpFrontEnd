/**
 * Created by paola on 09-03-15.
 */
'use strict';

app.controller('buscadorConceptosCtrl', function  ($scope,$rootScope,tempCache,cxpService,serverConf,$modalInstance, modalOptions,$state) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;

    /*Creado por: Paola Mejia
     Obtiene el listado de conceptos a partir del idCppProveedorCliente de proveedor como parametro */

    var paramConceptos = { idCppProveedorCliente: $scope.modalOptions.idProveedor};

    function init () {

        cxpService.getGruposyConceptosByProveedor({}, paramConceptos, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            console.info("Listado de Grupos y Conceptos exitoso");
            $scope.modalOptions.tree = respuesta.data;
            console.log( modalOptions);
            $scope.treeConfig = {
                collection : $scope.modalOptions.tree,
                childrenField : 'children',
                iconExpanded : 'fa fa-angle-down',
                iconCollapsed : 'fa fa-angle-right',
                onClickRow : $scope.modalOptions.elementSelected,
                collapseElements : true,
                padding : 30,
                contentColor : '#f5f5f5',
                disabledLevels : [0],
                enableHeader : false,
                colDefinition : [
                    { field : 'descripcion', displayName : 'Grupos y Conceptos', treeField : true }
                ]
            };
            $scope.hideLoader();
        }, function (responseError) {
            //error
        });
    };

    $scope.cancelar=function(){
        $modalInstance.dismiss('cancel');
    };
    $scope.seleccionar=function(){
        $modalInstance.close($scope.valorSel);

    };


    $scope.modalOptions.elementSelected = function (model) {
        if ( model ) {
            tempCache['idEntidadSeleccionada'] = model.idEntidadPojo;
            $scope.modelSelected = model;
            $scope.valorSel=model;
        } else {
            tempCache['idEntidadSeleccionada'] = '';
            $scope.modelSelected = {};
        }
    };

    init();


});
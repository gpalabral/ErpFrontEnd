/**
 * Created by paola on 20-04-15.
 */
'use strict';

app.controller('buscadorServiciosCtrl', function  ($scope,$rootScope,tempCache,cxcService,serverConf,$modalInstance, modalOptions,$state) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;
    $scope.detalleFactura = "";
    $scope.model = {
        detalleFactura : "",
        elementoSelecciondoTxtarea: false
    };
    /*Creado por: Paola Mejia
     Obtiene el listado de servicios*/

    //var paramConceptos = { idCppProveedorCliente: $scope.modalOptions.idProveedor};

    function init () {
        if( $scope.modalOptions.idContrato)
        {
            cxcService.getTreeItemPorContrato({}, {},$scope.modalOptions.idContrato,serverConf.ERPCONTA_WS, function (respuesta) {
                //exito
                console.info("buscadorServicios:arbol servicios por contrato", respuesta.data);
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
                    //disabledLevels : [0],
                    enableHeader : false,
                    colDefinition : [
                        { field : 'descripcion', displayName : 'Items', treeField : true }
                    ]
                };
                $scope.hideLoader();
            }, function (responseError) {
                //error
            });
        }else
        {
        cxcService.getTreeItems({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            console.info("buscadorServicios:arbol servicios", respuesta.data);
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
                //disabledLevels : [0],
                enableHeader : false,
                colDefinition : [
                    { field : 'descripcion', displayName : 'Items', treeField : true }
                ]
            };
            $scope.hideLoader();
        }, function (responseError) {
            //error
        });
      }
    };

    $scope.cancelar=function(){
        $modalInstance.dismiss('cancel');
    };

    /*Creado por: Paola Mejia
    * Descripcion: Envia el item seleccionado al hacer click en seleccionar*/
    $scope.seleccionar=function(){
        if( $scope.model.elementoSelecciondoTxtarea ) {
            $modalInstance.close({respModal: $scope.valorSel, detalleFactura:$scope.model.detalleFactura});
        }
    };
    $scope.modalOptions.elementSelected = function (model) {
        if ( model ) {
            $scope.valorSel=model;
            console.log("VALOR SELECCIONADO",$scope.valorSel);
            $scope.model.elementoSelecciondoTxtarea = true;
        } else {
            $scope.valorSel = null;
            $scope.model.elementoSelecciondoTxtarea = false;
        }
    };

    init();


});

/**
 * Created by paola on 20-04-15.
 */
'use strict';

app.controller('buscadorServiciosParaContratoCtrl', function ($scope, $rootScope, tempCache, cxcService, serverConf, $modalInstance, modalOptions, $state,$timeout) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;

    /*Creado por: Henrry Guzman
     Obtiene el listado de servicios para Contratos*/


    $scope.listaItem = [];
    $scope.mySelections = [];

    function init() {


        $scope.actualizaListaItem();
        $scope.listaContratoItemAux = tempCache.listaContratoItem;


        //cxcService.getServiciosArbol({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
        //    //exito
        //    //console.info("buscadorServicios:arbol servicios", respuesta.data);
        //    $scope.modalOptions.tree = respuesta.data;
        //    console.log( modalOptions);
        //    $scope.treeConfig = {
        //        collection : $scope.modalOptions.tree,
        //        childrenField : 'children',
        //        iconExpanded : 'fa fa-angle-down',
        //        iconCollapsed : 'fa fa-angle-right',
        //        onClickRow : $scope.modalOptions.elementSelected,
        //        collapseElements : true,
        //        padding : 30,
        //        contentColor : '#f5f5f5',
        //        //disabledLevels : [0],
        //        enableHeader : true,
        //        colDefinition : [
        //            { field : 'descripcion', displayName : 'descripcion', treeField : true },
        //            { field : 'mascara', displayName : 'tipo', treeField : true }
        //        ]
        //    };
        //    $scope.hideLoader();
        //}, function (responseError) {
        //    //error
        //});
    };


    $scope.actualizaListaItem = function () {
        cxcService.getCpcItemList({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            $scope.listaItem = respuesta.data;
        }, function (responseError) {
            //error
        });


    };

    $scope.gridListaItem = {
        data: 'listaItem',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        selectedItems: $scope.mySelections,
        enableSorting: true,
        columnDefs: [
            {
                field: 'codigo',
                displayName: "Código",
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'descripcion',
                displayName: "Nombre",
                width: '50%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parTipoItem.descripcion',
                displayName: "Tipo",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }
        ]
    };


    $scope.seleccionarItem = function () {

        if (typeof $scope.mySelections[0] != "undefined") {
            $scope.verificaRegistroSeleccionadoRepetidoItem($scope.mySelections[0], $scope.listaContratoItemAux, function (resultado) {
                if (resultado) {

                    $modalInstance.close($scope.mySelections[0]);
                } else {
                    $scope.mensajeError = "Seleccione otro registro, este ya se selecciono.";
                    $scope.muestraMensajeError(true);
                }
            });


        } else {
            $scope.mensajeError = "Seleccione un registro";
            $scope.muestraMensajeError(true);

        }

    };

    $scope.verificaRegistroSeleccionadoRepetidoItem = function (itemSeleccionado, listaContratoItem, funcion) {
        var activa = true;
        angular.forEach(listaContratoItem, function (objetoContratoItem) {
            if (objetoContratoItem.cpcItem.codigo == itemSeleccionado.codigo) {
                activa = false;
            }
        });
        funcion(activa);
    };


    $scope.muestraMensajeError = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 4000);
    };


    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };


    /*Creado por: Paola Mejia
     * Descripcion: Envia el item seleccionado al hacer click en seleccionar*/
    $scope.seleccionar = function () {
        $modalInstance.close($scope.valorSel);

    };


    $scope.modalOptions.elementSelected = function (model) {
        if (model) {
            //tempCache['idEntidadSeleccionada'] = model.idEntidadPojo;
            //$scope.modelSelected = model;
            $scope.valorSel = model;
        } else {
            /*
             tempCache['idEntidadSeleccionada'] = '';
             $scope.modelSelected = {};
             */
        }
    };

    init();


});

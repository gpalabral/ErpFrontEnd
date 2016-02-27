/**
 * Created by paola on 20-07-15.
 */

'use strict';

app.controller('buscadorDosificacionesCreditoDebitoCtrl', function  ($scope,$rootScope,tempCache,cxcService,serverConf,$modalInstance, modalOptions,localStorageService,$state) {
    var atributosPerfil =  localStorageService.get('atributosPerfil');//Obtiene datos del perfil
    $scope.modalOptions = modalOptions;
    $scope.mySelections = [];

    $scope.dosificacionSeleccionada = false;


    function init () {
        console.info("VALOR ID SUCU:",atributosPerfil['sucursalPredeterminada']);
        cxcService.getListaCpcDosificacionByIdSucursalAndCodigoDocMercantil({}, {}, atributosPerfil['sucursalPredeterminada'],"NODE", serverConf.ERPCONTA_WS, function (response) {
            $scope.dosificaciones = response.data;
            console.info("LISTA DOSIFICACIONES:",$scope.dosificaciones);
        }, function (error) {
            console.log("error");
        });

    }

    $scope.gridDosificacionCreditoDebito = {
        data: 'dosificaciones',
        enableRowSelection: true,
        enableCellSelection:false,
        enableColumnResize: true,
        multiSelect:false,
        selectedItems:$scope.mySelections,
        enableSorting:true,
        rowHeight:34,
        headerRowHeight:42,
        columnDefs: [
            {
                field: 'numeroAutorizacion',
                displayName: 'N° Autorización',
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'numeroFacturaInicial',
                displayName: "N° Nota Crédito - Débito",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'parEstadoProceso.descripcion',
                displayName: 'Estado',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parModalidadFacturacion.descripcion',
                displayName: 'Modalidad Facturación',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }
        ]
    };




    $scope.cancelar=function(){
        $modalInstance.dismiss('cancel');
    };

    /*Creado por: Paola Mejia
     * Descripcion: Envia el item seleccionado al hacer click en seleccionar*/
    $scope.seleccionar=function(){
        console.info("SELECCION:",$scope.mySelections[0]);
      if($scope.mySelections[0].idDosificacion) {
          tempCache.idDosificacionCreditoDebito=$scope.mySelections[0].idDosificacion;
          $modalInstance.close();
          $state.go('emisionFacturaNotaDebitoCredito');
      }
    };

    $scope.$watch(function(){
        return $scope.mySelections ? $scope.mySelections.length : 0;
    }, function(itemSelected){
        $scope.dosificacionSeleccionada = itemSelected > 0;
    });

    init();


});

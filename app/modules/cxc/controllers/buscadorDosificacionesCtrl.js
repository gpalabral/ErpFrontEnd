/**
 * Created by paola on 20-07-15.
 */

'use strict';

app.controller('buscadorDosificacionesCtrl', function  ($scope,$rootScope,tempCache,cxcService,serverConf,$modalInstance, modalOptions,localStorageService,$state) {
    var atributosPerfil =  localStorageService.get('atributosPerfil');//Obtiene datos del perfil
    $scope.modalOptions = modalOptions;
    $scope.dosificacionesPorContrato=[];
    $scope.mySelections = [];

    var obtenerDosificacionesPorActEconomica= function (modalidad,cbSuccess,cbError){
        console.log("PARAMETROS-->",atributosPerfil['sucursalPredeterminada'],modalOptions.idContrato,modalidad);
        cxcService.getDosificacionesByContrato({}, {},atributosPerfil['sucursalPredeterminada'],modalOptions.idContrato,'ACT','NIN',modalidad,serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            cbSuccess? cbSuccess(respuesta) : null;
            console.info("buscadorDosificaciones: Lista Dosificaciones",respuesta.data);

        }, function (respuestaError) {
            cbError? cbError() : null;
        });
    };

    $scope.dosificacionSeleccionada = false;

    $scope.btnSelDosificacion = '<button id="selServicio" type="button" height="5" class="btn btn-primary" ng-click="modalBuscadorServicios(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-ok"></span></button>';

    $scope.gridDosificaciones = {
        data: 'dosificacionesPorContrato',
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
                field: 'parModalidadFacturacion.descripcion',
                displayName: "Modalidad Facturación",
                width: '21%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'cpcActividadEconomica.descripcion',
                displayName: "Actividad Económica",
                width: '33%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'numeroAutorizacion',
                displayName: "N° Autorización",
                width: '18%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'fechaLimiteEmision',
                displayName: "Fecha Límite Emisión",
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-center",
                cellFilter: 'date:\'dd/MM/yyyy\'',
                sortable: true
            },
            {
                field: 'numeroFacturaActual',
                displayName: 'N° Factura',
                width: '13%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            }
        ]
    };

    function init () {
        if( $scope.modalOptions.facturacion=="REGISTRAR")
        {
           obtenerDosificacionesPorActEconomica("MAN",function(response){
                $scope.dosificacionesPorContrato=response.data;
            });
        }else//SI ES EMISION DE FACTURA: CONCATENA COMPUTARIZADA CON LA ELECTRONICA
        {
            obtenerDosificacionesPorActEconomica("COMP",function(response){
                var computarizada=response.data;
                obtenerDosificacionesPorActEconomica("ELEC",function(response){
                    $scope.dosificacionesPorContrato=computarizada.concat(response.data);
                });
            });
        }
    };

    $scope.cancelar=function(){
        $modalInstance.dismiss('cancel');
    };

    /*Creado por: Paola Mejia
     * Descripcion: Envia el item seleccionado al hacer click en seleccionar*/
    $scope.seleccionar=function(){
      if($scope.mySelections[0].idDosificacion) {
          tempCache.idDosificacionPorContrato=$scope.mySelections[0].idDosificacion;
          $modalInstance.close();
          $state.go('emisionFacturaContrato');
      }
    };

    $scope.$watch(function(){
        return $scope.mySelections ? $scope.mySelections.length : 0;
    }, function(itemSelected){
        $scope.dosificacionSeleccionada = itemSelected > 0;
    });

    init();


});

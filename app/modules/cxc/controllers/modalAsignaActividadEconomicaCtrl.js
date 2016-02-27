/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalAsignaActividadEconomicaCtrl', function ($scope, cxcService, serverConf, cpcActividadEconomicaModel, $modalInstance, $timeout, tempCache) {


    /*Creado por: Henrry Guzman
     Obtiene el listado de servicios para Contratos*/


    $scope.listaActividadEconomica = [];
    var actividadEconomica = new cpcActividadEconomicaModel();
    $scope.cpcActividadEconomica = actividadEconomica.getObject();
    $scope.mySelections = [];
    $scope.activaMensajeErroneo = false;

    $scope.mensajeError="";


    function init() {
        $scope.actualizaListaActividadEconomica();
        $scope.listaActividadEconomicaAux = tempCache.listaActividadEconomica;

    }

    $scope.muestraMensajeError = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 4000);
    };

    $scope.actualizaListaActividadEconomica = function () {
        cxcService.getActividadesEconomicasWithDosificacion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaActividadEconomica = response.data;
        }, function (responseError) {
            //error
        });
    };


    $scope.gridActividadEconomica = {
        data: 'listaActividadEconomica',
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
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'descripcion',
                displayName: "Descripción",
                width: '70%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            }
        ]
    };


    $scope.seleccionarActividadEconomica = function () {

        if (typeof $scope.mySelections[0] != "undefined") {
            $scope.verificaRegistroSeleccionadoRepetido($scope.mySelections[0], $scope.listaActividadEconomicaAux, function (resultado) {
                if (resultado) {
                    $scope.cpcActividadEconomicaSeleccionado = $scope.mySelections[0];
                    $modalInstance.close($scope.cpcActividadEconomicaSeleccionado);
                }else{
                    $scope.mensajeError="Seleccione otro registro, este ya fue seleccionado..";
                    $scope.muestraMensajeError(true);
                }
            });


        } else {
            console.info("SELECIONJE UN ELEMENTO");
            $scope.mensajeError="Es necesario seleecionar un registro para esta acción.";
            $scope.muestraMensajeError(true);

        }

    };


    $scope.verificaRegistroSeleccionadoRepetido = function (actividadEconomicaSeleccionado, listaActividadEconomica, funcion) {
        var activa = true;
        angular.forEach(listaActividadEconomica, function (objetoActividadEconomica) {
            if (objetoActividadEconomica.codigo == actividadEconomicaSeleccionado.codigo) {
                activa = false;
            }
        });
        funcion(activa);
    };




    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };


    init();


});

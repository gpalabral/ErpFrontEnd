/**
 * Created by RENAN on 12/02/2015.
 */


'use strict';

app.controller('proveedorConceptoCtrl', function ($scope, tempCache, cxpService, serverConf) {

    var obtieneConceptosAsignados = function () {


        var paramConceptos = {idCppProveedorCliente: $scope.proveedorConcepto.idProveedorCliente};

        cxpService.getConceptosByProveedor({}, paramConceptos, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            console.info("Listado de Conceptos exitoso");
            $scope.listaConceptosAsignados = respuesta.data;
        }, function (responseError) {
            //error
        });
    };


    $scope.conceptoSeleccionado = function () {
        console.log($scope.proveedorSeleccionado);
    };


    $scope.proveedorConcepto = tempCache.proveedorClienteInfo;
    if ($scope.proveedorConcepto != null) {
        $scope.nombre = $scope.proveedorConcepto.parTipoProveedorCliente.codigo == 'NAT' ? $scope.proveedorConcepto.nombre + " " + $scope.proveedorConcepto.primerApellido + " " + $scope.proveedorConcepto.segundoApellido : $scope.proveedorConcepto.razonSocial;
        console.log("VALOR :::");
        console.log( $scope.proveedorConcepto.idProveedorCliente);
        obtieneConceptosAsignados();
    }
    else {
        $scope.nombre = "";
    }


    $scope.listaConceptosTotales = function () {
        cxpService.getListaConceptos({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaConcepto = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.gridOptions = {
        data: 'listaConcepto',
        enableCellEditOnFocus: true,
        columnDefs: [{field: "descripcion", displayName: "Descripcion"}
        ]
    };


    var checkBoxCellTemplate = '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>';
    $scope.myData = [{name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}];
    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [
            {
                cellTemplate: checkBoxCellTemplate,
                showSelectionCheckbox: true
            }, {field: 'name', displayName: 'Name'}, {field: 'age', displayName: 'Age'}
        ]
    };




});


// definicon de variables

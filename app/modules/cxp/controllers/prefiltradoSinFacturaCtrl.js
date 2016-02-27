/**
 * Created by paola on 28-03-15.
 */
'use strict';

app.controller('prefiltradoSinFacturaCtrl', function ($scope, cxpService, serverConf, $http, $modal, modalService, localStorageService,$state, tempCache) {
    /************************Definición de variables*********************************/
    $scope.busqueda={
        ocurrencia:"",
        criterio:0
    };

    /*************************Fin Definición de variables*****************************/

    /*Creado por: Paola Mejia
     Obtiene el listado de proveedores, grupos y conceptos*/
    cxpService.getProveedoresGruposConceptos({}, {}, serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("Listado Proveedores-Grupos-Conceptos exitoso!!!!!!");
        $scope.proveedoresGruposConceptos = response.data;
        angular.forEach($scope.proveedoresGruposConceptos,function(row){
            console.log(row);
             row.getGrupoRecurrencia = function(){

             return this.grupo.descripcion + " "+"("+this.grupo.mascara+")";
             }
        });

    }, function (responseError) {
        //error
    });
    //$scope.datosResultados = [{'proveedorCliente.descripcion': '', 'grupo.descripcion':'','concepto.descripcion':''}];

    $scope.btnregistrarSinFactura = '<button id="registrarSinFactura" type="button" height="5" class="btn btn-primary" ng-click="registrarSinFactura(row)" style="cursor: pointer;" data-placement="bottom" title="Registrar Factura">' +
    '<span class="glyphicon glyphicon-save-file"></span> Registro Sin Factura</button>';

    $scope.gridOptionsConceptos = {
        data: 'proveedoresGruposConceptos',
        enableRowSelection: true,
        enableCellSelection:false,
        enableColumnResize: true,
        rowHeight:34,
        multiSelect:false,
        enableSorting:true,
      //  filterOptions:{filterText:'',useExternalFilter:false},
        //showFilter:true,
        columnDefs: [
            {
                field: 'proveedorCliente.descripcion',
                displayName: "Nombre/Razón Social",
                width: '35%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'getGrupoRecurrencia(row)',
                displayName: "Grupo",
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'concepto.descripcion',
                displayName: "Concepto",
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {displayName:"Acción",cellTemplate: $scope.btnregistrarSinFactura, width: '15%', enableCellEdit: false},
        ]
    };

   /* $scope.getGrupoRecurrencia=function(proveedoresGruposConceptos){
      return proveedoresGruposConceptos.grupo.descripcion;
    };*/
    $scope.filteringText = '';
    $scope.gridOptionsConceptos.filterOptions = {
        filterText:'',
        useExternalFilter: false
    };


    $scope.$watch('busqueda.ocurrencia', function(searchText) {
        var searchQuery="";
        if($scope.busqueda.criterio=='proveedor')
            searchQuery= 'Nombre/Razón Social:';
        else
            searchQuery= 'Concepto:';
            //searchQuery= searchQuery + searchText + ';';
            $scope.gridOptionsConceptos.filterOptions.filterText = searchQuery + searchText + ';';
            console.log(searchQuery);

    });
    $scope.registrarSinFactura=function(row){
        console.log(row.entity);
        tempCache.proveedorGrupoConcepto=row.entity;
        tempCache.criterioBusquedaFactura=$scope.busqueda.criterio;
        if(tempCache.proveedorGrupoConcepto)
           $state.go('registroSinFactura');
    };
})
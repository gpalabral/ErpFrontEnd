/**
 * Created by henrry on 18-04-15.
 */


app.controller('dosificacionTreeCtrl', function ($scope, $state, cxcService, serverConf, tempCache, $stateParams, $rootScope,localStorage) {


    // definicon de variables
    $scope.dosificacionTree = {};
    $scope.dosificaciones = {};
    var perfilUsuario = localStorage.get('atributosPerfil');

    function init() {
        if ($stateParams.idEntidadPojo != null) {
            cxcService.getListaCpcDosificacionByIdSucursalAndCodigoDocMercantil({}, {}, $stateParams.idEntidadPojo,"FACT", serverConf.ERPCONTA_WS, function (response) {
                $scope.dosificaciones = response.data;
            }, function (error) {
            });
        }
    };


    $scope.btnEditaDosificacion = '<button type="button" class="btn btn-default" ng-click="onSelectRow(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-pencil"></span></button>';

    $scope.radioPreEstablecido = '<div class="ngSelectionCell"><input tabindex="-1" type="radio" ng-disabled="true" ng-checked="isChecked(row.entity)" /></div>';

    $scope.gridDosificacion = {
        data: 'dosificaciones',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        columnDefs: [
           /* {
                field: 'name',
                displayName: '',
                width: '10%',
                cellTemplate: $scope.radioPreEstablecido
            },*/
            {
                field: 'numeroAutorizacion',
                displayName: 'N° Autorización',
                width: '15%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'numeroFacturaInicial',
                displayName: "N° Factura",
                width: '9%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'parEstadoProceso.descripcion',
                displayName: 'Estado',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parModalidadFacturacion.descripcion',
                displayName: 'Modalidad Facturación',
                width: '17%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'cpcActividadEconomica.descripcion',
                displayName: 'Actividad Económica',
                width: '43%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                displayName: "Editar",
                cellTemplate: $scope.btnEditaDosificacion,
                width: '6%',
                enableCellEdit: false
            }
        ]
    };

    //$scope.selID=1;

    $scope.isChecked = function (dosificacion) {
        if (dosificacion.idDosificacion==perfilUsuario.dosificacionPredeterminada)
            return true;
        else
            return false;
    }

    $scope.setSel = function (id) {
        $scope.selID = id;
    }


    $scope.$on("actualizaListaDosificacion", function () {
        init();
    });


    $scope.onSelectRow = function (row) {
        if (row) {
            $scope.activar.treeDosificacion = false;
            $scope.activar.adicionaDosificacion = false;
            $scope.activar.modificaDosificacion = true;
            //$scope.elementoSeleccionado(row);
            $scope.elementoSeleccionado(row.entity,'dosificacion');
        } else {
            $scope.modelSelected = {};
        }
    };


    $scope.elementSelectedDosificaion = function (model) {
        if (model) {
            $scope.activar.treeDosificacion = false;
            $scope.activar.adicionaDosificacion = false;
            $scope.activar.modificaDosificacion = true;
            $scope.elementoSeleccionado(model,'dosificacion');
        } else {
            $scope.modelSelected = {};
        }
    };

    $scope.addDosificacion = function () {
        $scope.activar.treeDosificacion = false;
        $scope.activar.adicionaDosificacion = true;
        $scope.activar.modificaDosificacion = false;
        $scope.crearNuevaDosificacion($scope.cpcsucursal,'dosificacion');
    };



    init();
});


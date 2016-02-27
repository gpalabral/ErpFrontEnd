/**
 * Created by henrry on 18-04-15.
 */


app.controller('dosificacionNotaDebitoCreditoTreeCtrl', function ($scope, $state, cxcService, serverConf, tempCache, $stateParams, $rootScope,localStorage) {


    // definicon de variables
    $scope.dosificacionTree = {};
    $scope.dosificaciones = {};
    var perfilUsuario = localStorage.get('atributosPerfil');

    function init() {
        if ($stateParams.idEntidadPojo != null) {
            //cxcService.getListaCpcDosificacionByIdDosificacion({}, {}, $stateParams.idEntidadPojo, serverConf.ERPCONTA_WS, function (response) {
            //    $scope.dosificaciones = response.data;
            //}, function (error) {
            //    console.log("error");
            //});

            cxcService.getListaCpcDosificacionByIdSucursalAndCodigoDocMercantil({}, {}, $stateParams.idEntidadPojo,"NODE", serverConf.ERPCONTA_WS, function (response) {
                $scope.dosificaciones = response.data;

                console.info("LISTA DOSIFICACIONES:",$scope.dosificaciones);
            }, function (error) {
                console.log("error");
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
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'numeroFacturaInicial',
                displayName: "N° Factura",
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'parEstadoProceso.descripcion',
                displayName: 'Estado',
                width: '19%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parModalidadFacturacion.descripcion',
                displayName: 'Modalidad Facturación',
                width: '25%',
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


    $scope.$on("actualizaListaDosificacionNotaDebitoCredito", function () {
        init();
    });


    $scope.onSelectRow = function (row) {
        console.log("on row selected dosificacion nota debito credito");
        if (row) {
            $scope.activar.treeDosificacionNotaDebitoCredito = false;
            $scope.activar.adicionaDosificacionNotaDebidoCredito = false;
            $scope.activar.modifcaDosificacionNotaDebidoCredito = true;
            $scope.elementoSeleccionado(row.entity,'DosificacionNotaDebitoCredito');
        } else {
            $scope.modelSelected = {};
        }
    };


    $scope.elementSelectedDosificaion = function (model) {
        if (model) {
            $scope.activar.treeDosificacionNotaDebitoCredito = false;
            $scope.activar.adicionaDosificacionNotaDebidoCredito = false;
            $scope.activar.modifcaDosificacionNotaDebidoCredito = true;
            $scope.elementoSeleccionado(model,'DosificacionNotaDebitoCredito');
        } else {
            $scope.modelSelected = {};
        }
    };

    $scope.addDosificacion = function () {
        $scope.activar.treeDosificacionNotaDebitoCredito = false;
        $scope.activar.adicionaDosificacionNotaDebidoCredito = true;
        $scope.activar.modifcaDosificacionNotaDebidoCredito = false;
        $scope.crearNuevaDosificacion($scope.cpcsucursal,'dosificacionNotaDebitoCredito');
    };



    init();
});


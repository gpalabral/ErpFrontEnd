'use strict';

app.controller('empresaCtrl', function ($scope, empresaModel, $filter, cxcService, serverConf, cpanelService, empresaDatos, modalService,cuentaBancariaEmpresaModel) {

    var empresa = new empresaModel();
    empresa.setObject(empresaDatos || {});


    var cuentaBancariaEmpresa= new cuentaBancariaEmpresaModel();

    $scope.cuentasBancarias= [];


    function init() {
        $scope.empresa = empresa.getObject();
        $scope.listaDeCiudades = [];
        $scope.meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        var thisYear = new Date().getFullYear();
        $scope.years = $filter('range')([], 1950, thisYear + 1);
        $scope.tipoMoneda = [];

        cxcService.getParDepartamento({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaDeCiudades = response.data;
        }, function () {
            console.warn('something was wrong... :(');
        });

        cxcService.getParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.tipoMoneda = response.data;
        }, function () {
            console.warn('something was wrong... :(');
        })


    }

    $scope.ciudadActualizada = function (ciudad) {
        $scope.empresa.ciudad = ciudad ? ciudad.descripcion : null;
    };

    $scope.guardarDatosEmpresa = function () {
        if (empresa.validate($scope.empresa)) {


            cpanelService.addEmpresa($scope.empresa, {}, serverConf.CPANEL_WS, function (response) {
                console.log("response");
                console.log(response);
            }, function (response) {
                console.log("response");
                console.log(response);
            });
        } else {

        }
    };

    $scope.btnEliminaCuentaBancaria= '<div align="center"><button id="eliminaCuentaBancaria" type="button" height="5" class="btn btn-default" ng-click="quitaCuentaBancaria(row)" style="cursor: pointer;">' +
    '<span class="glyphicon glyphicon-trash"></span></button></div>';

    $scope.gridCuentasBancarias = {
        data: 'cuentasBancarias',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        rowHeight: 33,
        headerRowHeight: 45,
        columnDefs: [
            {
                field: 'parBanco.descripcion',
                displayName: "Entidad Bancaria",
                width: '33%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'numeroCuenta',
                displayName: 'Numero de Cuenta',
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'parBanco.nit',
                displayName: "NIT",
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'parTipoMoneda.descripcion',
                displayName: "Tipo Moneda",
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {displayName: "Eliminar", cellTemplate: $scope.btnEliminaCuentaBancaria, width: '7%', enableCellEdit: false}
        ]
    };

    $scope.quitaCuentaBancaria = function (row) {
        var index = row.rowIndex;
        console.info("ROW:",index);
        $scope.gridCuentasBancarias.selectItem(index, false);
        $scope.cuentasBancarias.splice(index, 1);

        //$scope.sumarValores();
    };


    $scope.modalFormularioCuentaBancaria = function () {
        //tempCache.pagoContrato = $scope.cpcPagoContrato;
        var modalCuentaBancaria = modalService.show(
            {
                templateUrl: 'modules/cpanel/views/modalCuentaBancaria.html',
                controller: 'modalCuentaBancariaCtrl',
                size: 'ms'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                console.info("RESPUESTA OBJETO:", respModal);
                $scope.cuentaBancariaEmpresaObjeto = cuentaBancariaEmpresa.getObject();
                $scope.cuentaBancariaEmpresaObjeto=respModal;
                $scope.cuentasBancarias.push($scope.cuentaBancariaEmpresaObjeto);
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };


    init();
});

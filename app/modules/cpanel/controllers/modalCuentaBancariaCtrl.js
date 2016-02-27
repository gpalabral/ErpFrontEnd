/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalCuentaBancariaCtrl', function ($scope, $rootScope, tempCache, cxcService, serverConf, $modalInstance, modalOptions, $state, $timeout,cuentaBancariaEmpresaModel) {
    $scope.modalOptions = modalOptions;
    $scope.modelSelected = null;
    $scope.readOnlyEnable = true;

    $scope.activaMensajeErroneo = false;
    $scope.activaMensajeReprogramacion = false;
    $scope.activaMensajeValidadorPorcentaje = false;


    //var pagoContrato = new pagoContratoModel();

    var cuentaBancariaEmpresa= new cuentaBancariaEmpresaModel();

    function init() {
        $scope.cuentaBancariaEmpresaObjeto = cuentaBancariaEmpresa.getObject();

        console.info("OBJETO:",$scope.cuentaBancariaEmpresaObjeto);

        cxcService.getParBanco({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParBanco = response.data;
        }, function (responseError) {
            //error
        });

        cxcService.getParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParTipoMoneda= response.data;
        }, function (responseError) {
            //error
        });

    }

    $scope.bancoSeleccionado=function(){
        console.info("BANCO SELECCIONADO:",$scope.cuentaBancariaEmpresaObjeto.parBanco.codigo);
        //console.info("BANCO SELECCIONADO:",bancoSeleccionado.nit);
        //$scope.cuentaBancariaEmpresaObjeto.parBanco.nit=bancoSeleccionado.nit;
        cxcService.getParValorByCodigoGenerico({}, {}, $scope.cuentaBancariaEmpresaObjeto.parBanco.codigo, serverConf.ERPCONTA_WS, function (response) {
            //$scope.listaParMunicipio = response.data;
            console.info("PARBANCO:",response.data);
            $scope.cuentaBancariaEmpresaObjeto.parBanco.nit=response.data.valor;
            $scope.cuentaBancariaEmpresaObjeto.parBanco.descripcion=response.data.descripcion;
        }, function (responseError) {
            //error
        });

    };

    $scope.monedaSeleccionado=function(){
        console.info("MONEDA SELECCIONADO:",$scope.cuentaBancariaEmpresaObjeto.parTipoMoneda.codigo);
        //console.info("BANCO SELECCIONADO:",bancoSeleccionado.nit);
        //$scope.cuentaBancariaEmpresaObjeto.parBanco.nit=bancoSeleccionado.nit;
        cxcService.getParValorByCodigoGenerico({}, {}, $scope.cuentaBancariaEmpresaObjeto.parTipoMoneda.codigo, serverConf.ERPCONTA_WS, function (response) {
            //$scope.listaParMunicipio = response.data;
            console.info("MONEDA:",response.data);
            $scope.cuentaBancariaEmpresaObjeto.parTipoMoneda.descripcion=response.data.descripcion;
        }, function (responseError) {
            //error
        });

    };

    $scope.adicionarCuentaBancariaEmpresa = function () {
        console.info("--OBJETO CUENTA BANCARIA--");
        console.info($scope.cpcPagoContrato);
        if (cuentaBancariaEmpresa.validate($scope.cuentaBancariaEmpresaObjeto)) {
            console.info("OBJETO ADICIONAR:",$scope.cuentaBancariaEmpresaObjeto);
            $modalInstance.close($scope.cuentaBancariaEmpresaObjeto);
        } else {
            $scope.muestraAlerta(true);
        }
    };

    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.muestraAlerta = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 3000);
    };





    init();


});

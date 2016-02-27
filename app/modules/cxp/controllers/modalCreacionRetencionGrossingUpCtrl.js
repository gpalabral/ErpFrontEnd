/**
 * Created by Henrry Renán Guzmán Saramani 15 Julio 2015
 */
'use strict';

app.controller('modalCreacionRetencionGrossingUpCtrl', function ($scope, $modalInstance, tempCache, cxcService, cxpService, serverConf,
                                                                 retencionGrossingUpModel, $timeout, localStorageService, retencionModel,
                                                                 modalOptions) {


    /*Creado por: Henrry Guzman*/

    $scope.mensaje = "";

    var primeraMonedaEnum = "BOL";
    var retencion = new retencionModel();


    //$scope.listaAlicuotas = [
    //    {'codigio': "RIUES", 'descripcion': "RETENCIONES IUE POR SERVICIOS", 'valor': 12.5},
    //    {'codigio': "RIUEB", 'descripcion': "RETENCIONES IUE POR BIENES", 'valor': 5},
    //    {'codigio': "RPRE", 'descripcion': "RETENCIONES IUE POR REMESAS AL EXTERIOR", 'valor': 12.5},
    //    {'codigio': "RIT", 'descripcion': "RETENCIONES IT", 'valor': 3},
    //    {'codigio': "RRIVA", 'descripcion': "RETENCIONES RC - IVA", 'valor': 13}
    //];

    var objetoRetencionGrossingUp = new retencionGrossingUpModel();


    function init() {
        if (modalOptions.cpcRetencionEnviando != null) {
            $scope.cpcRetencion = retencion.getObject();
            $scope.cpcRetencion = modalOptions.cpcRetencionEnviando;
            //$scope.cpcPagoContratoAux = pagoContrato.getObject();
            //$scope.cpcPagoContratoAux = angular.copy(modalOptions.pagoContratoEnviado);
            console.info("OBJETO :", $scope.cpcRetencion);
            $scope.concepto = tempCache.conceptoRetencion;

        }


        $scope.retencionGrossingUp = objetoRetencionGrossingUp.getObject();
        $scope.retencionGrossingUp.tipoCambio = localStorageService.get('tipoCambioObjeto').tipoCambio;
        $scope.muestraPrimeraMoneda = $scope.cpcRetencion.parTipoMoneda.codigo == "BOL" ? true : false;
        $scope.muestraSegundaMoneda = $scope.cpcRetencion.parTipoMoneda.codigo == "SUS" ? true : false;
        $scope.muestraListaParTipoRetencion();
        $scope.muestraListaParTipoMoneda();

    }


    $scope.continuar = function () {
        $modalInstance.close();
    };


    $scope.monedaRetencionGrossingUpCombo = function () {
        if ($scope.retencionGrossingUp.parTipoMoneda.codigo == primeraMonedaEnum) {
            $scope.muestraPrimeraMoneda = true;
            $scope.muestraSegundaMoneda = false;
        } else {
            $scope.muestraPrimeraMoneda = false;
            $scope.muestraSegundaMoneda = true;
        }
        $scope.retencionGrossingUp.montoPrimeraMoneda = 0;
        $scope.retencionGrossingUp.montoSegundaMoneda = 0;

    };

    $scope.muestraListaParTipoRetencion = function () {
        cxpService.getListParTipoRetencion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaRetencion = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.muestraListaParTipoMoneda = function () {
        cxcService.getParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParTipoMoneda = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.aceptaRetencionGrossingUp = function () {
        //if ($scope.muestraPrimeraMoneda) {
        //    var valor = $scope.retencionGrossingUp.montoPrimeraMoneda != null && $scope.retencionGrossingUp.montoPrimeraMoneda != undefined && $scope.retencionGrossingUp.montoPrimeraMoneda != 0;
        //} else {
        //    var valor = $scope.retencionGrossingUp.montoSegundaMoneda != null && $scope.retencionGrossingUp.montoSegundaMoneda != undefined && $scope.retencionGrossingUp.montoSegundaMoneda != 0;
        //}
        //if (valor) {
        console.info("OBJETO:", $scope.cpcRetencion);
        tempCache.conceptoRetencion = $scope.concepto;


        $modalInstance.close($scope.cpcRetencion);
        //} else {
        //    var mensaje = "Es necesario llenar el campo 'Monto Total de Contrato'.";
        //    $scope.muestraAlerta(mensaje);
        //
        //}
    };

    $scope.muestraAlerta = function (mensaje) {
        $scope.activaMensaje = true;
        $scope.mensaje = mensaje;
        $timeout(function () {
            $scope.activaMensaje = false;
        }, 6000);
    };



    $scope.cancelar = function () {
        $modalInstance.dismiss('cancel');
    };

    init();

});

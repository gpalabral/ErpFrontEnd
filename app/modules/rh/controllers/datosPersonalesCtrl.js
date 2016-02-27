/**
 * Created by HENRRY
 */

'use strict';

app.controller('datosPersonalesCtrl', function ($scope, rhEmpeadoModel, rhServices, cxpService,cxcService, serverConf) {

    var rhEmpeadoObjeto = new rhEmpeadoModel();


    function init() {
        $scope.rhEmpeado = rhEmpeadoObjeto.getObject();
        listaParEstadoCivil();
        listaParTipoDocumento();
        listaParBanco();


    }

    function listaParEstadoCivil() {
        rhServices.getParEstadoCivil({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParEstadoCivil = response.data;
        }, function (responseError) {
            //error
        });
    }

    function listaParTipoDocumento() {
        cxpService.getListParTipoDocumento({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParTipoDocumento = response.data;
        }, function (responseError) {
            //error
        });
    }

    function listaParBanco() {
        cxcService.getParBanco({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParBanco = response.data;
        }, function (responseError) {
            //error
        });
    }

    $scope.guardaDatosEmpleado=function(){
      console.info("OBJETO DATOS EMPLEADO:",$scope.rhEmpeado);
    };

    init();

});

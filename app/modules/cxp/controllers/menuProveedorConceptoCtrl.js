/**
 * Created by RENAN on 12/02/2015.
 */


'use strict';

app.controller('menuProveedorConceptoCtrl', function ($scope, $state, cxpService, serverConf,tempCache) {
    console.log("CONTROLADOR:::");
    var parametros = {
        "tipoRegistro": "PROV"
    };

    var init = function () {
        console.info("ENTRP INIT");
        $scope.listaCppProveedorClientePorTipoRegistro();
    };


    $scope.formularioProvvedorCliente = function () {
        console.info("ENTROOOO FORMUALRIO");
        tempCache.proveedorClientePojo=null;
        $state.go('panelProveedorCliente.alta',{},{reload:true});
    };


    $scope.listaCppProveedorClientePorTipoRegistro = function () {
        console.info("ENTRO LISTADO");
        cxpService.getListaCppProveedorClientePorTipoRegistro({}, parametros, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            console.info("Entro a la Lista con parametro:" + parametros.tipoRegistro);
            $scope.listaCppProveedorClientePorTipoRegistroFiltrado = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    init();


    $scope.edit = function (row) {
        console.log(row.entity.razonSocial);
        console.log(row.entity.idProveedorCliente);

        //tabProveedorClienteCtrl.proveedorCliente.telefono=row.entity.razonSocial;
    };

    $scope.viewProveedorConceptoDetail = function (proveedorClienteInfo) {
        //console.log(proveedorClienteInfo);
        tempCache.proveedorClienteInfo = proveedorClienteInfo;
        //console.log("ENTRO SELECCION TEM:"+tempCache.proveedorClienteInfo.idProveedorCliente);
        //$state.go('panelProveedorConcepto.alta');
        $state.transitionTo('panelProveedorConcepto.alta',{},{reload:true});
        //$state.go('grupos.detalle', {idproveedorCliente: proveedorClienteInfo.idproveedorCliente});
    };


});


// definicon de variables

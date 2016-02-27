/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('tabClienteCtrl', function ($scope, cxpService, serverConf, $state, $timeout, tempCache, clienteModel) {
    $scope.readOnlyEnable = false;
    $scope.activaMensajeConfirmacion = false;
    $scope.concepto = [];
    $scope.conceptosTree = [];
    $scope.conceptosAsignados = [];
    $scope.modelSelected = null;
    $scope.validaCampoNit=false;
    $scope.validaCampoDocumento=false;
    $scope.ocultaBotonElimina=false;
    $scope.activar = {
        tab: true
    };
    var cliente = new clienteModel();
    $scope.cppProveedorCliente = cliente.getObject();

    function init() {
        $scope.cppProveedorCliente.parTipoProveedorCliente.codigo = "NAT";

    }

    init();

    /**********************************ALTA CLIENTE*********************************************/

    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el listado de documentos*/
    $scope.listaParTipoDocumento = function () {
        cxpService.getListParTipoDocumento({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoDocumento = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.listaParConceptos = function () {
        cxpService.getListaConceptos({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaConcepto = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.listaParTipoProveedorCliente = function () {
        cxpService.getListParTipoProveedorCliente({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoProveedorCliente = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.listaParTipoDocumento = function () {
        cxpService.getListParTipoDocumento({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoDocumento = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.listParTipoMoneda = function () {
        cxpService.getListParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoMoneda = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.listParFormaPago = function () {
        cxpService.getListParFormaPago({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaFormaPago = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.listaParConceptos();
    // $scope.listaParTipoRegistro();
    $scope.listaParTipoProveedorCliente();
    $scope.listaParTipoDocumento();
    $scope.listParTipoMoneda();
    $scope.listParFormaPago();


    $scope.guardarProveedorClientePojo = function () {
        console.info("TODO BIEN BAP:::: :)");
        console.log(JSON.stringify($scope.cppProveedorCliente, null, 4));
        $scope.showLoader();
        if (cliente.validate($scope.cppProveedorCliente)) {
            console.info("TODO BIEN:::: :)");
            //$scope.proveedorClientePojo.cppProveedorCliente=$scope.cppProveedorCliente;
            cxpService.adicionaProveedorCliente($scope.cppProveedorCliente, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                // EXITO
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Correcto Modal",
                    bodyText: "Correcto el registrar el cliente.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 3000
                });
                $scope.proveedorClientePojo = [];
                $scope.contactos = [];

                $state.transitionTo('panelCliente', {}, {reload: true});
                //$scope.transitionTo("proveedorClientePojo.cppProveedorCliente", {}, {reload: true});
            }, function (respuesta) {
                // ERROR
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Error: Error al registrar el cliente.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 3000
                });
            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Error Modal",
                bodyText: "Existen campos vacios, verifique por favor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 3000
            });
        }
    };

    $scope.eventoRadioButtonTipoClienteNatural = function () {
        switch ($scope.cppProveedorCliente.parCliente.codigo ) {
            case "CLOC":
                $scope.validaCampoNit=false;
                $scope.validaCampoDocumento=true;
                $scope.cppProveedorCliente.nit=0;
                $scope.cppProveedorCliente.numeroDocumento="";
                break;
            case "CEXT":
                $scope.validaCampoNit=false;
                $scope.validaCampoDocumento=false;
                $scope.cppProveedorCliente.numeroDocumento=0;
                $scope.cppProveedorCliente.nit=0;
                break;
            default:
                break;
        }
    };

    $scope.eventoRadioButtonTipoClienteJuridico= function () {
        switch ($scope.cppProveedorCliente.parCliente.codigo ) {
            case "CLOC":
                $scope.validaCampoNit=true;
                $scope.validaCampoDocumento=false;
                $scope.cppProveedorCliente.numeroDocumento=0;
                $scope.cppProveedorCliente.nit="";
                break;
            case "CEXT":
                $scope.validaCampoNit=false;
                $scope.validaCampoDocumento=false;
                $scope.cppProveedorCliente.numeroDocumento=0;
                $scope.cppProveedorCliente.nit=0;
                break;
            default:
                break;
        }

    };

    $scope.eventoRadioButtonClienteLocal = function () {
        switch ($scope.cppProveedorCliente.parTipoProveedorCliente.codigo ) {
            case "NAT":
                $scope.validaCampoNit=false;
                $scope.validaCampoDocumento=true;
                $scope.cppProveedorCliente.nit=0;
                $scope.cppProveedorCliente.numeroDocumento="";
                break;
            case "JUR":
                $scope.validaCampoNit=true;
                $scope.validaCampoDocumento=false;
                $scope.cppProveedorCliente.numeroDocumento=0;
                $scope.cppProveedorCliente.nit="";
                break;
            default:
                break;
        }
    };

    $scope.eventoRadioButtonClienteExterior = function () {
        $scope.validaCampoNit=false;
        $scope.validaCampoDocumento=false;
        $scope.cppProveedorCliente.numeroDocumento=0;
        $scope.cppProveedorCliente.nit=0;

    };
});

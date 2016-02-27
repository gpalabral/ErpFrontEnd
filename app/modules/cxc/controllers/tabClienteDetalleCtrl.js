/**
 * Created by paola on 21-04-15.
 */

'use strict';

app.controller('tabClienteDetalleCtrl', function ($scope, cxpService, serverConf, $state, $timeout, localStorageService,
                                                  tempCache, $filter, $stateParams, clienteModel,
                                                  cuentaBancariaProveedorClienteModel, formaPagoCobroModel,
                                                  formaPagoCobroCuentasBancariasPojoModel, cxcService, modalService) {


    $scope.readOnlyEnable = true;
    $scope.idProveedor = $stateParams.idEntidadPojo;
    $scope.activar = {
        tab: false
    };
    var cliente = new clienteModel();

    var cuentaBancariaProveedorCliente = new cuentaBancariaProveedorClienteModel();


    var formaPagoCobro = new formaPagoCobroModel();

    var formaPagoCobroCuentasBancariasPojo = new formaPagoCobroCuentasBancariasPojoModel();

    $scope.cuentasBancarias = [];

    $scope.activaBotonGuardaDatosAdicionales = false;
    $scope.activaBotonGuardaCambiosDatosAdicionales = false;
    $scope.ocultaBotonElimina=false;

    var init = function () {
        $scope.cppFormaPagoCobroCuentasBancariasPojo = formaPagoCobroCuentasBancariasPojo.getObject();
        $scope.cppFormaPagoCobro = formaPagoCobro.getObject();
        $scope.cuentaBancariaEmpresaUno = cuentaBancariaProveedorCliente.getObject();
        $scope.cuentaBancariaEmpresaDos = cuentaBancariaProveedorCliente.getObject();
        $scope.showLoader();
        cxpService.getCppProveedorClientePojoPorIdProveedorCliente({}, {idProveedorCliente: $scope.idProveedor}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.hideLoader();
            $scope.proveedorClientePojo = respuesta.data;
            $scope.cppProveedorCliente = $scope.proveedorClientePojo.cppProveedorCliente;
            $scope.tipoDocumento = $scope.proveedorClientePojo.cppProveedorCliente.parTipoDocumento.descripcion;
            $scope.proveedorClientePojo.cppProveedorCliente.fechaAniversario = new Date($scope.proveedorClientePojo.cppProveedorCliente.fechaAniversario);
            cxpService.verificaSiProveedorClienteNoEstaAsociado({}, {}, $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente, serverConf.ERPCONTA_WS, function (respuesta) {
                $scope.ocultaBotonElimina = respuesta.data;
            });
        }, function (respuestaDeError) {
            // ERROR
            $scope.hideLoader();
        });

        console.log(cxpService.getCpcFormaPagoCobroCuentasBancariasPojo({}, {}, $stateParams.idEntidadPojo, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            if (respuesta.data.cppFormaPagoCobro != null) {
                $scope.cppFormaPagoCobro = respuesta.data.cppFormaPagoCobro;
                $scope.activaBotonGuardaCambiosDatosAdicionales = true;
            } else {
                $scope.activaBotonGuardaDatosAdicionales = true;
            }
            if (respuesta.data.listaCuentasBancarias != null) {
                $scope.cuentaBancariaEmpresaUno = respuesta.data.listaCuentasBancarias[0];
                $scope.cuentaBancariaEmpresaDos = respuesta.data.listaCuentasBancarias[1];
            }
        }, function (respuestaDeError) {
            // ERROR\
        }));


        cxpService.getListParFormaPago({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaFormaPago = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });

        cxcService.getParBanco({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParBanco = response.data;
        }, function (responseError) {
            //error
        });

        cxcService.getParTipoMoneda({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaParTipoMoneda = response.data;
        }, function (responseError) {
            //error
        });
    };

    $scope.listaParTipoRegistro = function () {
        cxpService.getListParTipoRegistro({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.listaTipoRegistro = respuesta.data;
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
            console.log("DOCUMENTOS---", $scope.listaTipoDocumento);
        }, function (respuestaDeError) {
            // ERROR\
        });
    };
    $scope.listaParTipoRegistro();
    $scope.listaParTipoProveedorCliente();
    $scope.listaParTipoDocumento();


    init();

    $scope.guardarProveedorClientePojo = function () {

        $scope.showLoader();
        console.log(JSON.stringify($scope.cppProveedorCliente, null, 4));
        cxpService.editProveedorCliente($scope.cppProveedorCliente, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mansaje Confirmacion",
                bodyText: "Se registro de manera correcta.",
                actionButtonText: "Continuar",
                type: 'exito',
                closeAfter: 3000
            });
            $scope.proveedorClientePojo = [];
            $scope.contactos = [];

            $state.transitionTo('panelCliente', {}, {reload: true});
        }, function (respuestaDeError) {
            // ERROR
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Error: No se pudo registrar existe un error al registrar. ",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 3000
            });
        });
    };

    $scope.bancoSeleccionadoComboUno = function () {
        console.info("BANCO SELECCIONADO:", $scope.cuentaBancariaEmpresaUno.parBanco.codigo);
        cxcService.getParValorByCodigoGenerico({}, {}, $scope.cuentaBancariaEmpresaUno.parBanco.codigo, serverConf.ERPCONTA_WS, function (response) {
            $scope.cuentaBancariaEmpresaUno.parBanco.nit = response.data.valor;
            $scope.cuentaBancariaEmpresaUno.parBanco.descripcion = response.data.descripcion;
        }, function (responseError) {
            //error
        });

    };

    $scope.bancoSeleccionadoComboDos = function () {
        cxcService.getParValorByCodigoGenerico({}, {}, $scope.cuentaBancariaEmpresaDos.parBanco.codigo, serverConf.ERPCONTA_WS, function (response) {
            $scope.cuentaBancariaEmpresaDos.parBanco.nit = response.data.valor;
            $scope.cuentaBancariaEmpresaDos.parBanco.descripcion = response.data.descripcion;
        }, function (responseError) {
            //error
        });

    };

    $scope.guardaDatosAdicionales = function () {
        $scope.showLoader();


        if (formaPagoCobro.validate($scope.cppFormaPagoCobro)) {

            $scope.cppFormaPagoCobro.cppProveedorCliente.idProveedorCliente = $stateParams.idEntidadPojo;
            $scope.cuentaBancariaEmpresaUno.cppProveedorCliente.idProveedorCliente = $stateParams.idEntidadPojo;
            $scope.cuentaBancariaEmpresaDos.cppProveedorCliente.idProveedorCliente = $stateParams.idEntidadPojo;
            $scope.cuentasBancarias.push($scope.cuentaBancariaEmpresaUno);
            $scope.cuentasBancarias.push($scope.cuentaBancariaEmpresaDos);
            $scope.cppFormaPagoCobroCuentasBancariasPojo.cppFormaPagoCobro = $scope.cppFormaPagoCobro;
            $scope.cppFormaPagoCobroCuentasBancariasPojo.listaCuentasBancarias = $scope.cuentasBancarias;

            cxpService.putFormaPagoCobroCuentasBancariasPojo($scope.cppFormaPagoCobroCuentasBancariasPojo, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mansaje Confirmacion",
                    bodyText: "Se registro de manera correcta.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 3000
                });
                $state.transitionTo('panelCliente', {}, {reload: true});
            }, function (responseError) {
                //error
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Error: No se pudo registrar existe un error al registrar. ",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 3000
                });
            });


        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Error Modal",
                bodyText: "Existen campos vacios, verifique porfavor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 3000
            });
        }


    };

    $scope.volverArbolMenuClientes = function () {
        $state.transitionTo('panelCliente', {}, {reload: true});
    };

    $scope.eliminaProveedor = function () {
        $scope.showLoader();
        console.info("CONSOLE ELIMINA OBJETO PRO:", $scope.proveedorClientePojo);
        console.info("CONSOLE ELIMINA OBJETO PRO ID:", $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente);
        cxpService.verificaSiProveedorClienteNoEstaAsociado({}, {}, $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente, serverConf.ERPCONTA_WS, function (respuesta) {
            // EXITO
            console.info("PUEDO ELIMINAR?:", respuesta.data);
            console.info("ID A ELIMINAR :", $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente);
            $scope.hideLoader();
            if (respuesta.data) {
                var mensaje = "Se eliminará el proveedor esta seguro?.";
                $scope.modalMensajeConfirmacionCambioMonedaRetencion(mensaje);
            } else {
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "No se puede eliminar el Proveedor, ya que esta relacionado con algún proceso.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            }
        }, function (respuestaDeError) {
            // ERROR
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Existe un error al eliminar el Proveedor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        });

    };


    $scope.modalMensajeConfirmacionCambioMonedaRetencion = function (mensaje) {
        var modalMensajeConfirmacion = modalService.show(
            {
                templateUrl: 'modules/cxp/views/modalMensajeConfirmacionEliminacionProveedor.html',
                controller: 'modalMensajeConfirmacionEliminacionProveedorCtrl',
                size: 'md'
            }, {
                mensaje: mensaje
            }
        ).then(function (respModal) {
                $scope.showLoader();
                if (respModal) {

                    cxpService.deleteProveedorCliente({}, {}, $scope.proveedorClientePojo.cppProveedorCliente.idProveedorCliente, serverConf.ERPCONTA_WS, function (respuesta) {
                        // EXITO
                        $scope.hideLoader();
                        $scope.showCustomModal({
                            headerText: "Mensaje Confirmación",
                            bodyText: "Se modificó exitosamente el Proveedor.",
                            actionButtonText: "Continuar",
                            type: 'exito',
                            closeAfter: 6000
                        });
                        $state.transitionTo('panelProveedorCliente', {}, {reload: true});
                    }, function (respuestaDeError) {
                        // ERROR
                        $scope.hideLoader();
                        $scope.showCustomModal({
                            headerText: "Mensaje Error",
                            bodyText: "Existe un error al eliminar el Proveedor.",
                            actionButtonText: "Continuar",
                            type: 'error',
                            closeAfter: 6000
                        });
                    });
                } else {
                    $scope.hideLoader();
                }

            });
    };


});


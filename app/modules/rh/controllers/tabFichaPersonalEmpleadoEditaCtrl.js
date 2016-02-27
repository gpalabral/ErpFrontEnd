/**
 * Creado por Henrry Guzmán 13-10-15.
 */
'use strict';

app.controller('tabFichaPersonalEmpleadoEditaCtrl', function ($scope, rhEmpleadoModel, rhServices, cxpService, cxcService, serverConf, $stateParams, $state, rhEmpleadoCargoModel, modalService, localStorageService) {


    var rhEmpleadoObjeto = new rhEmpleadoModel();

    var rhEmpleadoCargoObjeto = new rhEmpleadoCargoModel();
    $scope.modificaDatosPersonales = false;
    $scope.modificaDatosLaborales = false;

    $scope.escondeCampoApellidoCasada = false;

    $scope.activaValidacionTipoContrato = {
        requerido: 'false'
    };

    $scope.activaValidacionAFP = {
        requerido: 'false'
    };

    $scope.activaDisableAFP = {
        requerido: 'false'
    };

    $scope.activar = {
        tab: true
    };

    $scope.valor = {
        boolean: true
    };


    function init() {

        $scope.periodoGestion = localStorageService.get('periodoGestionObjeto');
        //Autor: Henrry Guzmán Primera Pestaña
        $scope.rhEmpleado = rhEmpleadoObjeto.getObject();
        listaParEstadoCivil();
        listaParTipoDocumento();
        listaParBanco();
        //obtieneCodigo();

        rhServices.obtieneRegistroPorPeriodoGestion({}, {}, $scope.periodoGestion.periodo, $scope.periodoGestion.gestion, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("ENRTRTTRTRTRTRT");
            $scope.periodoGestion = response.data;
            $scope.disabledBoton = {
                muestraPanelBotones: $scope.periodoGestion.parEstadoPeriodoGestion.codigo == "VIG"
            };
        }, function (responseError) {
            //error
        });

        rhServices.getRhEmpleadoByIdEmpleado({}, {}, $stateParams.idEmpleado, serverConf.ERPCONTA_WS, function (response) {
            //exito

            $scope.activar.tab = false;
            $scope.modificaDatosPersonales = true;

            listaParCondicionPension();
            $scope.rhEmpleado = response.data;
            console.info("$scope.rhEmpleado:", $scope.rhEmpleado);
            $scope.rhEmpleado.fechaNacimiento = new Date($scope.rhEmpleado.fechaNacimiento);
            $scope.rhEmpleado.fechaIngreso = new Date($scope.rhEmpleado.fechaIngreso);
            $scope.rhEmpleado.fechaRetiro = new Date($scope.rhEmpleado.fechaRetiro);
            $scope.rhEmpleado.fechaUltimaLiquidacion = new Date($scope.rhEmpleado.fechaUltimaLiquidacion);
            $scope.escondeCampoApellidoCasada = $scope.rhEmpleado.parGenero.codigo == "F";


            $scope.rhEmpleadoCargo = rhEmpleadoCargoObjeto.getObject();
            $scope.activaValidacionTipoContrato.requerido = $scope.rhEmpleadoCargo.parTipoContratoEmpleado.codigo != "IND";
            $scope.activaValidacionAFP.requerido = $scope.rhEmpleadoCargo.rhEmpleado.aporta;
            $scope.activaDisableAFP.requerido = !$scope.rhEmpleadoCargo.rhEmpleado.aporta;
            rhServices.obtieneEmpleadoCargoPorIdEmpleado({}, {}, $scope.rhEmpleado.idEmpleado, serverConf.ERPCONTA_WS, function (response) {
                //exito
                if (response.data == 0) {
                    $scope.rhEmpleadoCargo.rhEmpleado = angular.copy($scope.rhEmpleado);
                    $scope.generaNumeroSeguroSocial($scope.rhEmpleado, function (numeroSeguroSocial) {
                        $scope.rhEmpleadoCargo.rhEmpleado.numeroSeguroSocial = numeroSeguroSocial;
                    });


                    $scope.modificaDatosLaborales = false;
                } else {
                    $scope.rhEmpleadoCargo = response.data;
                    $scope.rhEmpleadoCargo.rhEmpleado = angular.copy($scope.rhEmpleado);
                    $scope.rhEmpleadoCargo.fechaInicio = new Date($scope.rhEmpleadoCargo.fechaInicio);
                    $scope.rhEmpleadoCargo.fechaFin = new Date($scope.rhEmpleadoCargo.fechaFin);
                    $scope.modificaDatosLaborales = true;
                    $scope.activaValidacionTipoContrato.requerido = $scope.rhEmpleadoCargo.parTipoContratoEmpleado.codigo != "IND";
                    $scope.activaValidacionAFP.requerido = $scope.rhEmpleadoCargo.rhEmpleado.aporta;
                    $scope.activaDisableAFP.requerido = !$scope.rhEmpleadoCargo.rhEmpleado.aporta;
                }
            }, function (responseError) {
                //error
            });
        }, function (responseError) {
            //error
        });


        //Autor: Henrry Guzmán Segunda Pestaña

        listaParTipoContratoEmpleado();


    }

    //Autor: Henrry Guzmán Primera Pestaña Metodos

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

    function obtieneCodigo() {
        rhServices.obtieneCodigo({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.rhEmpleadoCargo.rhEmpleado.codigo = response.data;
        }, function (responseError) {
            //error
        });
    }

    function listaParCondicionPension() {
        rhServices.getParCondicionPension({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParCondicionPension = response.data;
        }, function (responseError) {
            //error
        });
    }

    $scope.modificaDatosEmpleado = function () {
        $scope.showLoader();
        $scope.generaNumeroSeguroSocial($scope.rhEmpleadoCargo.rhEmpleado, function (numeroSeguroSocial) {
            $scope.rhEmpleadoCargo.rhEmpleado.numeroSeguroSocial = numeroSeguroSocial;
            rhServices.modificaRhEmpleado($scope.rhEmpleadoCargo.rhEmpleado, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Confirmación",
                    bodyText: "Se modifico exitosamente el registro de datos empleado.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 6000
                });
                $state.transitionTo('panelEmpleado', {}, {reload: true});
            }, function (respuestaDeError) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Existe un error al modificar datos empleado.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            });
        });
    };


    //Autor: Henrry Guzmán Segunda Pestaña Metodos

    function listaParTipoContratoEmpleado() {
        rhServices.getParTipoContratoEmpleado({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaParTipoContratoEmpleado = response.data;
            console.info("LISTA TIPO:", response.data);
        }, function (responseError) {
            //error
        });
    }

    $scope.modalListaAdicionaRhCargo = function () {
        var modalRhCargo = modalService.show(
            {
                templateUrl: 'modules/rh/views/modalListaAdicionaCargo.html',
                controller: 'modalListaAdicionaCargoCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                //$scope.actualizaListaActividadEconomica();
                $scope.rhEmpleadoCargo.rhCargo.nombreCargo = respModal.nombreCargo;
                $scope.rhEmpleadoCargo.rhCargo.erpDepartamento.descripcion = respModal.erpDepartamento.descripcion;
                if(respModal.rhSeccion)
                  $scope.rhEmpleadoCargo.rhCargo.rhSeccion.descripcion = respModal.rhSeccion.descripcion;
                $scope.rhEmpleadoCargo.rhCargo = respModal;
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };


    $scope.guardaDatosLaborales = function () {
        $scope.showLoader();
        $scope.generaNumeroSeguroSocial($scope.rhEmpleadoCargo.rhEmpleado, function (numeroSeguroSocial) {
            $scope.rhEmpleadoCargo.rhEmpleado.numeroSeguroSocial = numeroSeguroSocial;
            rhServices.guardaEmpleadoCargo($scope.rhEmpleadoCargo, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Confirmación",
                    bodyText: "Se modifico exitosamente el registro de datos empleado.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 6000
                });
                $state.transitionTo('panelEmpleado', {}, {reload: true});
            }, function (respuestaDeError) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Existe un error al modificar datos empleado.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            });
        });
    };

    $scope.generaNumeroSeguroSocial = function (rhEmpleado, funcion) {

        var fechadias = "";

        var anio = rhEmpleado.fechaNacimiento.getFullYear().toString().substr(2, 2);
        var mes = rhEmpleado.fechaNacimiento.getMonth() + 1;
        var dia = rhEmpleado.fechaNacimiento.getDate();

        mes = rhEmpleado.parGenero.codigo == "F" ? mes + 50 : mes;

        var inicialeNombre = rhEmpleado.nombre.substring(0, 1);
        var inicialePrimerApellido = rhEmpleado.primerApellido.substring(0, 1);
        var inicialeSegundoApellido = rhEmpleado.segundoApellido.substring(0, 1);

        fechadias = dia + "" + mes + "" + anio + " - " + inicialePrimerApellido + "" + inicialeSegundoApellido + "" + inicialeNombre;

        funcion(fechadias);

    };


    $scope.modificaDatosEmpleadoAndDatosLaboralesAmbasOpciones = function () {
        //$scope.rhEmpleadoCargo.rhEmpleado = angular.copy($scope.rhEmpleado);
        $scope.showLoader();
        $scope.generaNumeroSeguroSocial($scope.rhEmpleadoCargo.rhEmpleado, function (numeroSeguroSocial) {
            $scope.rhEmpleadoCargo.rhEmpleado.numeroSeguroSocial = numeroSeguroSocial;
            //rhServices.modificaDatosEmpleadoAndDatosLaborales($scope.rhEmpleadoCargo, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            rhServices.modificaRhEmpleadoCargoMasTablasRelacionadas($scope.rhEmpleadoCargo, {}, $scope.periodoGestion.idPeriodoGestion, serverConf.ERPCONTA_WS, function (respuesta) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Confirmación",
                    bodyText: "Se modifico exitosamente el registro.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 6000
                });
                $state.transitionTo('panelEmpleado', {}, {reload: true});
            }, function (respuestaDeError) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Existe un error al modificar en el Sistema..",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            });
        });
    };

    $scope.escondeCampoApellidoCasadaAction = function () {
        $scope.escondeCampoApellidoCasada = $scope.rhEmpleadoCargo.rhEmpleado.parGenero.codigo == "F";
    };

    $scope.activaValidacionFechaRetiroAction = function (codigo) {
        $scope.activaValidacionTipoContrato.requerido = codigo != "IND";
    };

    $scope.adicionaFechaLiquidacion = function () {
        if ($scope.rhEmpleadoCargo.idEmpleadoCargo == null) {
            $scope.rhEmpleadoCargo.rhEmpleado.fechaUltimaLiquidacion = $scope.rhEmpleadoCargo.rhEmpleado.fechaIngreso;
        }
    };

    $scope.activaValidacionAFPAction = function (valor) {
        $scope.activaValidacionAFP.requerido = valor;
        $scope.rhEmpleadoCargo.rhEmpleado.parTipoAFP = null;
        $scope.activaDisableAFP.requerido = !valor;
    };

    init();

});
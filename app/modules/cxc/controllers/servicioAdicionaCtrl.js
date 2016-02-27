/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('servicioAdicionaCtrl', function ($rootScope, $scope, cxcService, serverConf, $state, $timeout, tempCache, contabilidadService, itemModel, localStorageService) {
    $scope.readOnlyEnable = false;

    $scope.botonAdiciona = true;
    $scope.botonModifica = false;


    var item = new itemModel();
    $scope.cpcItem = item.getObject();

    $scope.ctaIngresoData = {
        nroCuenta: '',
        descripcionCuenta: ''
    };

    function init() {
        $scope.campoCosto=true;
        //contabilidadService.getList({}, {gruponivel: 'PCTA'}, serverConf.ERPCONTA, function (respuesta) {
        //    $scope.contaTree = createTree(respuesta.data);
        //}, function (respuestaDeError) {
        //
        //});
    }


    $scope.metodo = function () {
        console.info("ENTROOO HENRRY");
    }


    $scope.guardarServicio = function () {
        $scope.showLoader();
        //$scope.cpcItem.idCtaIngreso = 1;
        if (item.validate($scope.cpcItem)) {
            cxcService.adicionaServicio($scope.cpcItem, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                // EXITO
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mansaje Confirmación",
                    bodyText: "Se registro exitosamente el Bien o Servicio.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 6000
                });
                $state.transitionTo('servicioTemplate.empty', {}, {reload: true});
            }, function (respuestaDeError) {
                // ERROR
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Existe un error al registrar el Bien o Servicio.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 6000
                });
            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validación",
                bodyText: "Validación: Existen campos vacios o datos incorrectos, verifique por favor.",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 6000
            });
        }


    };


    //$scope.abrirModal = function () {
    //    $rootScope.showLoader();
    //
    //    contabilidadService.getList({}, {gruponivel: 'PCTA'}, serverConf.ERPCONTA, function (respuesta) {
    //        $scope.contaTree = createTree(respuesta.data);
    //        console.info("ARBOL");
    //        console.info($scope.contaTree);
    //        var modalDefaults = {
    //            controller: 'modal1'
    //        };
    //
    //        var modalOptions = {
    //            headerText: 'Plan de cuentas',
    //            tree: $scope.contaTree
    //        };
    //
    //        $scope.abrirTreeModal(modalDefaults, modalOptions, function (respuesta) {
    //            $scope.cpcItem.idCtaIngreso = respuesta.idEntidad;
    //            $scope.ctaIngresoData.nroCuenta = respuesta.mascaraGenerada;
    //            $scope.ctaIngresoData.descripcionCuenta = respuesta.descripcion;
    //        });
    //
    //        $rootScope.hideLoader();
    //    }, function (respuestaDeError) {
    //        console.info("ERROR");
    //        $rootScope.hideLoader();
    //    });
    //
    //
    //};


    $scope.convierteMonedaDolarGeneral = function (objeto, funcion) {
        if (objeto.monto != "") {
            cxcService.getCambioDeMoneda({}, {}, objeto.monto, objeto.tipoCambio, objeto.tipoMoneda, serverConf.ERPCONTA_WS, function (respuesta) {
                // EXITO
                var valor = respuesta.data;
                funcion(valor);

            }, function (respuestaDeError) {
                // ERROR
                funcion(0);
            });
        } else {
            funcion(0);
        }
    };

    $scope.convierteMonedaDolar = function () {
        var objetoTipoCambio = {
            monto: $scope.cpcItem.precioUnitarioPrimeraMoneda,
            tipoCambio: $scope.montoTipoDeCambio = localStorageService.get('tipoCambioObjeto').tipoCambio,
            tipoMoneda: "SUS"

        }
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpcItem.precioUnitarioSegundaMoneda = valorConvertido;
        });
    };

    $scope.convierteMonedaBolivianos = function () {
        var objetoTipoCambio = {
            monto: $scope.cpcItem.precioUnitarioSegundaMoneda,
            tipoCambio: $scope.montoTipoDeCambio = localStorageService.get('tipoCambioObjeto').tipoCambio,
            tipoMoneda: "BOL"

        }
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valorConvertido) {
            $scope.cpcItem.precioUnitarioPrimeraMoneda = valorConvertido;
        });
    };

    $scope.activaCamposCosto = function (valor) {
        if (valor)
            $scope.campoCosto = !valor;
        else
            $scope.campoCosto = !valor;
    };

    init();


});

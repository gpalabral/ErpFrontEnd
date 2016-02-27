/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('servicioModificaCtrl', function ($rootScope,$scope,contabilidadService,cxpService, cxcService, serverConf, $state, $timeout, tempCache,$stateParams,itemModel,localStorageService) {
    $scope.readOnlyEnable = true;

    $scope.botonAdiciona = false;
    $scope.botonModifica = true;

    var item = new itemModel();

    $scope.ctaIngresoData = {
        nroCuenta: '',
        descripcionCuenta: ''
    };

    function init(){
        $scope.showLoader();
        cxcService.getCpcItemByIdItem({}, {}, $stateParams.idEntidadPojo, serverConf.ERPCONTA_WS, function (response) {
            $scope.cpcItem = response.data;
            console.info($scope.cpcItem);
            $scope.campoCosto = $scope.cpcItem.montoFijo;
            cxpService.getCuentasExigibles({}, {},$scope.cpcItem.idCtaIngreso, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                console.info("CORRECTO!!!");
                $scope.CntEntidadIngreso = response.data;
                console.info("CUENTA RECUPERADA:",response.data);
                $scope.ctaIngresoData.nroCuenta= $scope.CntEntidadIngreso.mascara;
                $scope.ctaIngresoData.descripcionCuenta=$scope.CntEntidadIngreso.descripcion;
                //$scope.tableData.push({label: 'Cuentas Por Pagar', numCuenta: $scope.CntEntidadAnticipo.mascara, descripcionCuenta: $scope.CntEntidadAnticipo.descripcion, code: 'cxp'});
            }, function (responseError) {
                $scope.hideLoader();
                //error
                console.info("ERROR AL RECUPERAR CUENTA");
            });
        }, function (responseError) {
            //error
            $scope.hideLoader();
        });
        //contabilidadService.getList({}, {gruponivel: 'PCTA'}, serverConf.ERPCONTA, function (respuesta) {
        //    $scope.contaTree = createTree(respuesta.data);
        //}, function (respuestaDeError) {
        //
        //});
    }

    //$scope.abrirModal = function () {
    //    $rootScope.showLoader();
    //
    //    contabilidadService.getList({}, {gruponivel: 'PCTA'}, serverConf.ERPCONTA, function (respuesta) {
    //        $scope.contaTree = createTree(respuesta.data);
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
    //            $rootScope.hideLoader();
    //        });
    //
    //
    //    }, function (respuestaDeError) {
    //        $rootScope.hideLoader();
    //    });
    //
    //
    //};


    $scope.modificaServicio = function () {
        $scope.showLoader();
        if (item.validate($scope.cpcItem)) {
            console.log(JSON.stringify($scope.cpcItem, null, 4));
            cxcService.modificaSservicio($scope.cpcItem, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mansaje Confirmacion",
                    bodyText: "Se registro de manera correcta.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 1000
                });
                $state.transitionTo('servicioTemplate.empty', {}, {reload: true});
            }, function (responseError) {
                //error
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Error: No se pudo registrar existe un error al registrar. ",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 1000
                });
            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Error",
                bodyText: "Error Validacion: Verifique que no exista campos vacios o datos incorrectos",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 1000
            });
        }
    };


    $scope.cancelar = function () {
        $state.transitionTo('servicioTemplate.empty', {}, {reload: true});
    };

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



    init();


});

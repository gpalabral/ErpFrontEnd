/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('dosificacionModificaCtrl', function ($scope, cxcService, serverConf,dosificacionModel,modalService) {
    $scope.readOnlyEnable = true;

    var dosificacion = new dosificacionModel();
    $scope.cpcdosificaciones=dosificacion.getObject();

    function init() {
        $scope.readOnlyEnable = true;

        if ($scope.dosificacionSeleccionado.idDosificacion != null) {
            console.info("ID:",$scope.dosificacionSeleccionado.idDosificacion);
            cxcService.getCpcDosificacionesPorId({}, {}, $scope.dosificacionSeleccionado.idDosificacion, serverConf.ERPCONTA_WS, function (response) {
                $scope.cpcdosificaciones = response.data;
                console.info($scope.cpcdosificaciones);
                $scope.cpcdosificaciones.fechaLimiteEmision = new Date($scope.cpcdosificaciones.fechaLimiteEmision);
                $scope.readOnlyEnable = true;

                var pact=$scope.cpcdosificaciones.parEstadoProceso.codigo!="PAS"?false:true;
                $scope.desactivaEdicionCampos=pact;
                $scope.desactivaEdicionRadioPACT=pact;
                $scope.desactivaEdicionRadioACT=$scope.cpcdosificaciones.parEstadoProceso.codigo=="ACT"?false:pact;
                $scope.desactivaEdicionRadioPAS=$scope.cpcdosificaciones.parEstadoProceso.codigo=="PAS"?false:$scope.cpcdosificaciones.parEstadoProceso.codigo=="ACT"?false:pact;

                 $scope.actualizaListaActividadEconomica();
                 $scope.getParCaracteristicaEspecial();
            }, function (responseError) {
                //error
            });
        }
    }

    $scope.actualizaListaActividadEconomica = function () {
        cxcService.getListaActividadEconomica({}, {}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            $scope.listaActividadEconomica = response.data;
            if( $scope.cpcdosificaciones && $scope.cpcdosificaciones.cpcActividadEconomica && $scope.cpcdosificaciones.cpcActividadEconomica.idActividadEconomica ) {
                var idActividadEconomica = $scope.cpcdosificaciones.cpcActividadEconomica.idActividadEconomica;
                for( var i = 0; i < $scope.listaActividadEconomica.length; i++ ) {
                    if( $scope.listaActividadEconomica[i].idActividadEconomica == idActividadEconomica ) {
                        $scope.cpcdosificaciones.cpcActividadEconomica = $scope.listaActividadEconomica[i];
                        break;
                    }
                }
            }

            if( !$scope.$$phase ) {
                $scope.$apply();
            }
        }, function (responseError) {
            //error
        });
    };

    $scope.getParCaracteristicaEspecial = function (){
        cxcService.getParCaracteristicaEspecial({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listParCaracteristicaEspecial = response.data;

        }, function (responseError) {
            //error
        });
    };

    $scope.$on("dosificacionSeleccionada", function (event, datos) {
        $scope.dosificacionSeleccionado = {idDosificacion: datos.idDosificacion};
        init();
    });


    $scope.modificaDosificacion = function () {
        $scope.showLoader();
        if (dosificacion.validate($scope.cpcdosificaciones)) {
            cxcService.modificaDosificacion($scope.cpcdosificaciones, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mansaje Confirmacion",
                    bodyText: "Se realizaron los cambios Exitosamente.",
                    actionButtonText: "Continuar",
                    type: 'exito',
                    closeAfter: 3000
                });
                $scope.activar.treeDosificacion = true;
                $scope.activar.adicionaDosificacion = false;
                $scope.activar.modificaDosificacion = false;
                $scope.elementoModificado('dosificacion');
            }, function (responseError) {
                //error
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Error",
                    bodyText: "Existe un error al realizar los cambios. ",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 3000
                });
            });
        } else {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje Validacion",
                bodyText: "Error Validacion: Verifique que no exista campos vacios o datos incorrectos",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 4000
            });
        }
    };


    $scope.cancelarDosificacion = function () {
        $scope.activar.treeDosificacion = true;
        $scope.activar.adicionaDosificacion = false;
        $scope.activar.modificaDosificacion = false;
        $scope.listParCaracteristicaEspecial = null;
        $scope.listaActividadEconomica = null;
    };

    $scope.eventoModalidadFacturacion = function () {
    };

    $scope.isBotonClickSI = function (preEstablecido1) {
        if (preEstablecido1)
            return false;
        else
            return true;
    };

    $scope.isBotonClickNO = function (preEstablecido2) {
        if (!preEstablecido2)
            return false;
        else
            return true;
    };
    $scope.modalAdicionaActividadEconomica = function () {
        var modalActividadEconomica = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalAdicionaActividadEconomica.html',
                controller: 'modalAdicionaActividadEconomicaCtrl',
                size: 'md'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                $scope.actualizaListaActividadEconomica();
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };



});

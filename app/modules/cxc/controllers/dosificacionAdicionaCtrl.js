/**
 * Created by RENAN on 29/01/2015.
 */

'use strict';

app.controller('dosificacionAdicionaCtrl', function ($scope, cxcService, serverConf,dosificacionModel,modalService) {
        $scope.readOnlyEnable = false;
        $scope.desactivaEdicionRadioPAS=true;

        var dosificacion = new dosificacionModel();
        var dosificacionAuxNew = new dosificacionModel();

        function init() {
            $scope.cpcdosificaciones = dosificacion.getObject();
            $scope.cpcdosificacionesNew = dosificacionAuxNew.getObject();
            $scope.cpcdosificaciones = $scope.cpcdosificacionesNew;
            $scope.listaActividadEconomica = [];
            $scope.cpcdosificaciones.parTipoDocumentoMercantil.codigo = "FACT";

            $scope.actualizaListaActividadEconomica();

            cxcService.getParCaracteristicaEspecial({}, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.listParCaracteristicaEspecial = response.data;
            }, function (responseError) {
                //error
            });
            $scope.activaRadioPreEstablecido = true;
        }

        $scope.actualizaListaActividadEconomica = function () {
            cxcService.getListaActividadEconomica({}, {}, serverConf.ERPCONTA_WS, function (response) {
                //exito
                $scope.listaActividadEconomica = response.data;
            }, function (responseError) {
                //error
            });
        };


        $scope.$on("adicionaDosificacion", function (event, datos) {
            $scope.sucursalSeleccionado = {idSucursal: datos.idSucursal};
            init();
        });

        $scope.guardaDosificacion = function () {
            $scope.showLoader();
            $scope.cpcdosificaciones.cpcSucursal.idSucursal = $scope.cpcsucursal.idSucursal;
            if (dosificacion.validate($scope.cpcdosificaciones)) {
                cxcService.adicionaDosificacion($scope.cpcdosificaciones, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                    // EXITO
                    $scope.cpcdosificaciones = dosificacion.getObject();
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Confirmacion",
                        bodyText: "Registro Exitoso.",
                        actionButtonText: "Continuar",
                        type: 'exito',
                        closeAfter: 3000
                    });
                    $scope.activar.treeDosificacion = true;
                    $scope.activar.adicionaDosificacion = false;
                    $scope.activar.modificaDosificacion = false;
                    $scope.elementoModificado('dosificacion');
                }, function (respuestaDeError) {
                    // ERROR
                    $scope.hideLoader();
                    $scope.showCustomModal({
                        headerText: "Mensaje Error",
                        bodyText: "Se produjo un error al registrar el formulario.",
                        actionButtonText: "Continuar",
                        type: 'error',
                        closeAfter: 3000
                    });
                });
            } else {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje Validacion",
                    bodyText: "Verifique que los campos requeridos esten llenos o exista campos con datos incorrectos.",
                    actionButtonText: "Continuar",
                    type: 'error',
                    closeAfter: 5000
                });
            }
        };


        $scope.cancelarDosificacion = function () {
            $scope.activar.treeDosificacion = true;
            $scope.activar.adicionaDosificacion = false;
            $scope.activar.modificaDosificacion = false;
        }

        $scope.eventoModalidadFacturacion = function () {
        };

        $scope.isBotonClickSI = function (preEstablecido1) {
            if ($scope.activaRadioPreEstablecido) {
                return preEstablecido1?false:true;
            } else {
                return false;
            }
        };

        $scope.isBotonClickNO = function (preEstablecido2) {
            if ($scope.activaRadioPreEstablecido) {
                if (!preEstablecido2)
                    return false;
                else
                    return true;
            } else {
                return false;
            }
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

    }
)
;

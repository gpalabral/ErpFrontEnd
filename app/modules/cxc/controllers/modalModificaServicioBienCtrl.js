/**
 * Created by Henrry on 29-04-15.
 */
'use strict';

app.controller('modalModificaServicioBienCtrl', function ($scope, tempCache, cxcService, serverConf, $modalInstance, $timeout, contratoItemModel) {
    $scope.activaMensajeErroneo = false;
    $scope.labelMensajeError = "";

    var contratoItem = new contratoItemModel();
    $scope.cpccontratoitem = contratoItem.getObject();

    function init() {
        if (tempCache.contratoitem != null) {
            $scope.cpccontratoitem = tempCache.contratoitem;

            $scope.cpccontratoitemAux = contratoItem.getObject();
            $scope.cpccontratoitemAux.cpcItem = $scope.cpccontratoitem.cpcItem;
            $scope.cpccontratoitemAux.cantidad = $scope.cpccontratoitem.cantidad;

            if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
                $scope.muestraPrimeraMoneda = true;
                $scope.muestraSegundaMoneda = false;
                $scope.cpccontratoitemAux.montoPrimeraMoneda = $scope.cpccontratoitem.montoPrimeraMoneda;
                $scope.cpccontratoitemAux.montoSegundaMoneda = 0;
                $scope.cpccontratoitemAux.subtotalPrimeraMoneda = $scope.cpccontratoitem.subtotalPrimeraMoneda;
                $scope.cpccontratoitemAux.subtotalSegundaMoneda = 0;

            } else {
                $scope.muestraPrimeraMoneda = false;
                $scope.muestraSegundaMoneda = true;
                $scope.cpccontratoitemAux.montoPrimeraMoneda = 0;
                $scope.cpccontratoitemAux.montoSegundaMoneda = $scope.cpccontratoitem.montoSegundaMoneda;
                $scope.cpccontratoitemAux.subtotalPrimeraMoneda = 0;
                $scope.cpccontratoitemAux.subtotalSegundaMoneda = $scope.cpccontratoitem.subtotalSegundaMoneda;

            }
        }
    }

    $scope.cancelar = function () {
        $modalInstance.close($scope.cpccontratoitem);
    };

    $scope.seleccionar = function () {
        $scope.cpccontratoitem.cpcItem = $scope.cpccontratoitemAux.cpcItem;
        $scope.cpccontratoitem.montoPrimeraMoneda = $scope.cpccontratoitemAux.montoPrimeraMoneda;
        $scope.cpccontratoitem.montoSegundaMoneda = $scope.cpccontratoitemAux.montoSegundaMoneda;
        $scope.cpccontratoitem.cantidad = $scope.cpccontratoitemAux.cantidad;
        $scope.cpccontratoitem.subtotalPrimeraMoneda = $scope.cpccontratoitemAux.subtotalPrimeraMoneda;
        $scope.cpccontratoitem.subtotalSegundaMoneda = $scope.cpccontratoitemAux.subtotalSegundaMoneda;
        if ($scope.cpccontratoitem.cantidad != 0) {
            if (contratoItem.validate($scope.cpccontratoitem)) {
                $modalInstance.close($scope.cpccontratoitem);
            } else {
                $scope.labelMensajeError = "Validación: Existen campos vacios o datos incorrectos, verifique por favor.";
                $scope.muestraAlerta(true);
            }
        } else {
            $scope.labelMensajeError = "El campo 'Cantidad' debe ser diferente de cero..";
            $scope.muestraAlerta(true);
        }
    };

    $scope.muestraAlerta = function (valor) {
        $scope.activaMensajeErroneo = valor;
        $timeout(function () {
            $scope.activaMensajeErroneo = false;
        }, 4000);
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
            monto: $scope.cpccontratoitemAux.montoPrimeraMoneda,
            tipoCambio: tempCache.tipoCambioContratoItem,
            tipoMoneda: "SUS"
        };
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valor) {
            $scope.cpccontratoitemAux.montoSegundaMoneda = valor;
            $scope.cpccontratoitemAux.subtotalPrimeraMoneda = Number($scope.cpccontratoitemAux.montoPrimeraMoneda) * Number($scope.cpccontratoitemAux.cantidad);
            $scope.cpccontratoitemAux.subtotalSegundaMoneda = Number($scope.cpccontratoitemAux.montoSegundaMoneda) * Number($scope.cpccontratoitemAux.cantidad);
        });
    };

    $scope.convierteMonedaBolivianos = function () {
        var objetoTipoCambio = {
            monto: $scope.cpccontratoitemAux.montoSegundaMoneda,
            tipoCambio: tempCache.tipoCambioContratoItem,
            tipoMoneda: "BOL"
        };
        $scope.convierteMonedaDolarGeneral(objetoTipoCambio, function (valor) {
            $scope.cpccontratoitemAux.montoPrimeraMoneda = valor;
            $scope.cpccontratoitemAux.subtotalPrimeraMoneda = Number($scope.cpccontratoitemAux.montoPrimeraMoneda) * Number($scope.cpccontratoitemAux.cantidad);
            $scope.cpccontratoitemAux.subtotalSegundaMoneda = Number($scope.cpccontratoitemAux.montoSegundaMoneda) * Number($scope.cpccontratoitemAux.cantidad);
        });
    };

    $scope.cambiaMontosPorCantidad = function () {
        if (tempCache.tipoMonedaUniversal == tempCache.primeraMonedaEnum) {
            $scope.cpccontratoitemAux.subtotalPrimeraMoneda = Number($scope.cpccontratoitemAux.montoPrimeraMoneda) * Number($scope.cpccontratoitemAux.cantidad);
            $scope.cpccontratoitemAux.subtotalSegundaMoneda = 0;

        } else {
            $scope.cpccontratoitemAux.subtotalPrimeraMoneda = 0;
            $scope.cpccontratoitemAux.subtotalSegundaMoneda = Number($scope.cpccontratoitemAux.montoSegundaMoneda) * Number($scope.cpccontratoitemAux.cantidad);

        }
    };

    init();

});

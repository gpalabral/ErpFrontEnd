'use strict';

app.controller('verificaExistenciaDatosAlicuotaCtrl', function  ($scope,$modal,cxpService,serverConf,$state,modalService) {




	var init = function () {

        cxpService.verificaExistenciaDeDatosAlicuota({}, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
           if(respuesta.data){
               console.info("EXISTE");
               $state.transitionTo('registroRetencion', {}, {reload: true});
           }else{
               console.info("NO EXISTE");
               $scope.showModalMensajeExistenciaAlicuotas();
           }
        }, function (responseError) {
            //error
        });



	};


    $scope.showModalMensajeExistenciaAlicuotas = function () {
        var modalAlicuota = modalService.show(
            {
                templateUrl: 'modules/cxp/views/mensajeExistenciaDatosAlicuota.html',
                controller:'mensajeExistenciaValorAlicuotaCtrl',
                backdrop: 'static'
            }, {
                //
            }
        ).then(function (respModal) {
                console.info("RESPUESTA:",respModal);
                if(respModal){
                    $state.transitionTo('parametrizacionAlicuotas', {}, {reload: true});
                }else{
                    $state.transitionTo('rhEnBlanco', {}, {reload: true});
                }
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };



	init();


});
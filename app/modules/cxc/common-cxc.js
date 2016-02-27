(function () {
  'use strict';

  app.factory('commoncxc', function (cxcService,serverConf) {
    return {
        /*Creado por: Paola Mejia
         *Descripcion: Obtiene el numero de factura secuencial segun la dosificacion*/
        obtenerNumeroFactura: function (idDosificacion, cbSuccess, cbError) {
            cxcService.getNumeroFacturaPorIdDosificacion({}, {},idDosificacion,serverConf.ERPCONTA_WS, function (response) {
                cbSuccess? cbSuccess(response) : null;
            }, function (responseError) {
                cbError? cbError() : null;
            });
        }
    }
  });
})();

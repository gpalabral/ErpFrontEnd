(function () {
  'use strict';

  app.factory('commonMethods', function () {
    return {
      /**
       *
       * @param nombre, nombre del archivo a exportar
       * @param content, contenido del archivo a exportar
       * @param headersEnable, define si las cabeceras seran visibles en el excel exportado
       * @param type
       */
      exportarXLS: function(nombre, content, headersEnable, type) {
        var xlsNombre = (nombre || 'Libro') + '.xlsx';
        headersEnable = !!headersEnable;
        if( !type ||  (type && type === 'simple') ) {
          content = [content];
        }

        alasql('SELECT * INTO XLSX("' + xlsNombre + '",{headers: '+ headersEnable +'}) FROM ?',content);
      },
      bsASus: function ( valorBs ) {
        // operations
        //return nuevoValor
      },
      SusAbs: function ( valorSus ) {

      }
    }
  });
})();

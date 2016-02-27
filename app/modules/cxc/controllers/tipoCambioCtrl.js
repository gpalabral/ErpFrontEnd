'use strict';

app.controller('tipoCambioCtrl', function ($scope, cxcService, serverConf) {

  function init () {
    $scope.gridTipoCambio = {
      data: 'datosLibroVentas',
      columnDefs: [
        {
          field: 'fecha',
          displayName: 'Fecha',
          width: '20%',
          headerClass: "header-center",
          cellClass: "text-center"
        },
        {
          field: 'tipoCambio',
          displayName: 'Tipo de Cambio',
          width: '40%',
          enableCellEdit:  true,
          headerClass: "header-center",
          cellClass: "text-right"
        },
        {
          field: 'UFV',
          displayName: 'UFV',
          width: '49%',
          enableCellEdit:  true,
          headerClass: "header-center",
          cellClass: "text-right"
        }
      ]
    };
  }

  $scope.importarXLS = function (files) {
    if (files && files.length) {
      cxcService.emisionFacturaExcelImport(files[files.length-1], 'xls', serverConf.ERPCONTA_WS, function( response ) {
        console.log("response");
        console.log(response);
      });
    }
  };

  init();
});

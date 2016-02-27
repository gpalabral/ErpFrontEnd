
'use strict';

app.controller('pdfViewerCtrl', function ($scope, cxcService, serverConf, $stateParams, $sce, $state, $location) {
    var type = 'computarizada';
    if( $location.$$path && $location.$$path.indexOf('ExportacionNotaDebitoCredito') > -1 ) {
        type = 'ExportacionNotaDebitoCredito';
    } else if( $location.$$path && $location.$$path.indexOf('Exportacion') > -1 ) {
        type = 'exportacion';
    } else if( $location.$$path && $location.$$path.indexOf('facturaAnulada') > -1 ) {
        type = 'exportacion';
    } else if ($location.$$path && $location.$$path.indexOf('facturaComputarizada') > -1) {
        type = 'facturaComputarizada';
    }

    cxcService.getPdf(serverConf.ERPCONTA_WS, type,$stateParams.idFacturaEmitida, function (url){
        console.log(url);
        $scope.pdfName = 'Factura';
        $scope.pdfUrl =  url;
        $scope.iframeSrc = $sce.trustAsResourceUrl(url);

        $scope.scroll = 0;
        $scope.loading = 'loading';

        $scope.getNavStyle = function(scroll) {
            if(scroll > 100) return 'pdf-controls fixed';
            else return 'pdf-controls';
        };

        $scope.onError = function(error) {
            console.log(error);
        };

        $scope.onLoad = function() {
            $scope.loading = '';
        };

        $scope.onProgress = function(progress) {
            //console.log(progress);
        };
    }, function () {

    });

    $scope.printingPdf = function () {
        try {
            var iframe = document.getElementById('iframePDF');
            if (iframe.src) {
                var frm = iframe.contentWindow;

                frm.focus();// focus on contentWindow is needed on some versions
                frm.print();
            }
        } catch (e) {
            console.log(e.description);
        }
    };

    $scope.volver = function () {
        if( $location.$$path && $location.$$path.indexOf('facturaViewer') > -1 ) {
            $state.go('panelCobrosPorFacturar');
        } else if( $location.$$path && ( $location.$$path.indexOf('facturaExtraviada') > -1 || $location.$$path.indexOf('facturaAnulada') > -1  ) ){
            $state.go('panelFacturas.consulta',{idFacturaEmitida:$stateParams.idFacturaEmitida});
        } else if ( $location.$$path && ( $location.$$path.indexOf('ExportacionNotaDebitoCredito') > -1 || $location.$$path.indexOf('ExportacionNotaDebitoCredito') > -1  ) ) {
            $state.go('listaFacturaClienteNotaDebitoCredito');
        } else if ( $location.$$path && ( $location.$$path.indexOf('facturaExportacion') > -1 || $location.$$path.indexOf('facturaExportacion') > -1  ) ) {
            $state.go('dosificacionFacturaExportacion');
        } else {
            $state.go('dosificacionEmisionFactura');
        }
        //dosificacionFacturaExportacion
    };
});


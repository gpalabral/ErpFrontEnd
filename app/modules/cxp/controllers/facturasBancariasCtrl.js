/**
 * Created by paola on 22-04-15.
 */
'use strict';

app.controller('facturasBancariasCtrl', function ($scope, $state, cxcService, cxpService, serverConf, commonMethods, $filter, modalService, facturasBancariasPojoModel) {
    $scope.muestraBotonGuardaReferenciacion = false;
    $scope.facturasBancariasPojoLista = [];
    $scope.activaBotonReferenciacionAutomatica = true;

    $scope.nombreArchivoUno = "";
    $scope.nombreArchivoDos = "";

    $scope.valores = {nombreRazonSocial: "", nit: "", codigoTipoCompra: "", codigoModalidadTransaccion: ""};

    var facturasBancariasPojo = new facturasBancariasPojoModel();
    $scope.facturasBancariasPojo = facturasBancariasPojo.getObject();


    function init() {
        $scope.activaBotonReferenciacionAutomatica = true;

        $scope.muestraListaTipoCompras();
        $scope.muestraListaModalidadTransaccion();
    }


    $scope.cancelarFacturasBancarias = function () {
        $state.go('dosificacionEmisionFactura');
    };

    $scope.importarXLSFacturasBancarias = function (files) {
        console.info("FILE:", files);
        if (files && files.length) {
            console.log(files[files.length - 1]);
            $scope.objetoCargadoFacturasBancarias = files[files.length - 1];
            console.info("OBJETO BAP:" + $scope.objetoCargadoFacturasBancarias);
            $scope.nombreArchivoUno = files[files.length - 1].name;

            var xlsFiles = [], xlsNames = [];

            if ($scope.objetoCargadoFacturasBancarias) {
                xlsFiles.push($scope.objetoCargadoFacturasBancarias);
                xlsNames.push("uploadFileFacturasBancarias");
            }

            cxcService.importaExcelFacturasBancariasXls(xlsFiles, 'xls', xlsNames, serverConf.ERPCONTA_WS, function (response) {
                var xls = response.data,
                    row;
                for (var i = 0; i < xls.length; i++) {
                    row = xls[i];
                    if (!$.isEmptyObject(row)) {


                        console.info("OBJETO RES:", row);
                        $scope.facturasBancariasPojoLista.push(row);
                    }
                }
                console.info("LISTA:", $scope.facturasBancariasPojoLista);
            });


        }
    };

    $scope.limpiaFormularioFacturasBancaria = function () {
        $scope.nombreArchivoUno = "";
        $scope.facturasBancariasPojoLista = [];
        $scope.valores.codigoTipoCompra = "";
        $scope.valores.codigoModalidadTransaccion = "";
        $scope.valores.nombreRazonSocial = "";
        $scope.valores.nit = "";
        $scope.facturasBancariasPojo = null;
    };

    $scope.guardaFacturasBancarias = function () {
        $scope.showLoader();
        $scope.facturasBancariasPojo.listaFacturasBancarias = $scope.facturasBancariasPojoLista;
        $scope.facturasBancariasPojo.codigoTipoCompra = $scope.valores.codigoTipoCompra;
        $scope.facturasBancariasPojo.codigoModalidadTransaccion = $scope.valores.codigoModalidadTransaccion;
        console.info("OBJETOOOOOO:", $scope.facturasBancariasPojo);
        cxcService.putFacturasBancarias($scope.facturasBancariasPojo, {}, serverConf.ERPCONTA_WS, function (respuesta) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Los datos se importaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 6000
            });
            $state.transitionTo('splashScreen', {}, {reload: true});
        }, function (respuestaDeError) {
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje del Sistema",
                bodyText: "Ocurrió un error en la importación.",
                actionButtonText: "Aceptar",
                type: 'error',
                closeAfter: 6000
            });
        });

    };

    $scope.modalBuscadorProveedoresFacturasBancarias = function () {
        var modalProveedores = modalService.show(
            {
                templateUrl: 'modules/cxp/views/buscadorProveedores.html',
                controller: 'buscadorProveedoresCtrl',
                size: 'md'
            }/*, {
             idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
             }*/
        ).then(function (respModal) {
                $scope.facturasBancariasPojo.idProveedorCliente = respModal.idProveedorCliente;
                $scope.valores.nombreRazonSocial = respModal.nombreCompleto;
                $scope.valores.nit = respModal.nitCi;
            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    $scope.muestraListaTipoCompras = function () {
        console.info("ENTROOOOOOOOOO METODO:");
        cxpService.getListaTipoCompras({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaTipoCompras = response.data;
            console.info("LISTA:", $scope.listaTipoCompras);
        }, function (responseError) {
            //error
            console.info("ERROR:", responseError);
        });
    };

    $scope.muestraListaModalidadTransaccion = function () {
        console.info("ENTROOOOOOOOOO METODO MODALIDAD:");
        cxpService.getParModalidadTransaccion({}, {}, serverConf.ERPCONTA_WS, function (response) {
            $scope.listaModalidadTransaccion = response.data;
        }, function (responseError) {
            //error
            console.info("ERRORRRRRR:");
        });
    };

    init();
});
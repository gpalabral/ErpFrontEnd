'use strict';

app.factory('cxpService', function (Server) {
    var connectServer = function (self, success, failure, secure) {
        self.server.httpRequest(secure).then(function (response) {
            success ? success(response) : null;
        }, function (response) {
            failure ? failure(response) : null;
        });
    };

    var setData = function (self, method, data, params, server, url) {
        self.server.setMethod(method);
        self.server.setData(data);
        self.server.setParams(params);
        self.server.setServer(server);
        self.server.setUrl(url);
    };

    var cxpService = function () {
        Server.setUrl('/rest/cppgrupo/get');
        this.server = Server;
    };

    cxpService.prototype = {
        /**
         *
         * @param data  // put post patch
         * @param params // get
         * @param server // ERPCONTA o ERPCONTA_WS
         * @param successCallback
         * @param failureCallback
         */
        getList: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppgrupo/get');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionarGrupo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppgrupo/put');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaDeConceptos: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppconcepto/get');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionarConcepto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppconcepto/put');
            connectServer(_self, successCallback, failureCallback);
        },
        // metodos para conceptos "selectors"
        getListParRecurrencia: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParRecurrencia');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParPeriodo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParPeriodo');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoRetencion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoRetencion');
            connectServer(_self, successCallback, failureCallback);
        },
        // end para conceptos "selectors"
        adicionaProveedorCliente: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppProveedorCliente/put');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaContacto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppcontacto/put');
            connectServer(_self, successCallback, failureCallback);
        },
        listaContacto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppcontacto/getlista');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaFormaPagoCobro: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppFormaPagoCobro/put');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionarPlanPagos: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppPlanPago/put');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaConceptos: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppconcepto/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoRegistro: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoRegistro');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoProveedorCliente: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoProveedorCliente');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoDocumento: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoDocumento');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaCppProveedorClientePorTipoRegistro: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getListaCppProveedorClientePorTipoRegistro');
            connectServer(_self, successCallback, failureCallback);
        },
        getProveedores: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getListaCppProveedorClientePorTipoRegistro');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaProveedorClientePojo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppProveedorCliente/putCppProveedorClientePojo');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoContacto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoContacto');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoMoneda: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoMoneda');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParFormaPago: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParFormaDePago');
            connectServer(_self, successCallback, failureCallback);
        },
        getConceptosByProveedor: function (data, params, idProveedorCliente, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getProveedorCliente/' + idProveedorCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        getTipoCambioByFecha: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cntTipoCambio/getCntTipoCambioPojo');
            connectServer(_self, successCallback, failureCallback);
        },
        getCppProveedorClientePojoPorIdProveedorCliente: function (data, params, server, successCallback, failureCallback) {
            console.log("VALOR::");
            console.log(params.idProveedorCliente);
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getCppProveedorClientePojo');
            connectServer(_self, successCallback, failureCallback);
        },
        getProveedoresByConcepto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorClienteConcepto/getListaPorIdConcepto');
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoDocumentoMercantil: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoDocumentoMercantil');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionarFactura: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppFactura/putCppFacturaCntComprobantePojo');
            connectServer(_self, successCallback, failureCallback);
        },
        getGrupoConceptoTree: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppgrupo/getGruposConceptos');
            connectServer(_self, successCallback, failureCallback);
        },
        getGrupoPorId: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppgrupo/getGrupo');
            connectServer(_self, successCallback, failureCallback);
        },
        getProveedorConceptos: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorClienteConcepto/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getGruposyConceptosByProveedor: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getGruposConceptosByProveedorCliente');
            connectServer(_self, successCallback, failureCallback);
        },
        getCuentasExigibles: function (data, params, idEntidad, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppgrupo/getCntEntidadById/' + idEntidad);
            connectServer(_self, successCallback, failureCallback);
        },
        getTreeCppProveedorClientePorTipoRegistro: function (data, params, tipoRegistro, server, successCallback, failureCallback) {
            //console.log("VALOR ARBOL::", params);
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getProveedorClienteTree/' + tipoRegistro);
            connectServer(_self, successCallback, failureCallback);
        },
        editGrupo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cppgrupo/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        getConcepto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppconcepto/getConcepto');
            connectServer(_self, successCallback, failureCallback);
        },
        getCuentaPorID: function (data, params, idEntidad, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppgrupo/getCntEntidadById/' + idEntidad);
            connectServer(_self, successCallback, failureCallback);
        },
        editConcepto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cppconcepto/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        getTreeConceptosNoAsignados: function (data, params, idProveedorCliente, server, successCallback, failureCallback) {
            console.log("ID PROVEEDOR---->", idProveedorCliente);
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getGruposConceptosNoAsignadosTree/' + idProveedorCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        getProveedoresGruposConceptos: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorClienteConcepto/getProveedorGrupoConcepto');
            connectServer(_self, successCallback, failureCallback);
        },
        postCalculosContabilidad: function (data, server, method, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, {}, server, '/cntCalculosTributarios/getCntComprobantePojo');
            connectServer(_self, successCallback, failureCallback);
        },
        editProveedorClientePojo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cppProveedorCliente/edit');
            connectServer(_self, successCallback, failureCallback);

        },
        getProveedorClientePorIdConcepto: function (data, params, idConcepto, asignados, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getProveedorClientePorIdConcepto/' + idConcepto + '/' + asignados);
            connectServer(_self, successCallback, failureCallback);
        },
        adicionarConceptoConAsignacionProveedor: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppconcepto/putCppConceptoProveedoresPojo');
            connectServer(_self, successCallback, failureCallback);
        },
        editContacto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cppcontacto/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        editProveedorCliente: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cppProveedorCliente/editProveedorCliente');
            connectServer(_self, successCallback, failureCallback);
        },
        putFormaPagoCobroCuentasBancariasPojo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppProveedorCliente/putFormaPagoCobroCuentasBancariasPojo');
            connectServer(_self, successCallback, failureCallback, true);
        },
        getCpcFormaPagoCobroCuentasBancariasPojo: function (data, params, idProveedorCliente, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getCpcFormaPagoCobroCuentasBancariasPojo/' + idProveedorCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        getConceptoAll: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppconcepto/get');
            connectServer(_self, successCallback, failureCallback);
        },
        editParTipoAlicuota: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/parvalor/editParTipoAlicuota');
            connectServer(_self, successCallback, failureCallback);
        },
        findParAlicuotaByCodigo: function (data, params, codigo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/findParAlicuotaByCodigo/' + codigo);
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoAlicuota: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getListParTipoAlicuota');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaDepartamentosByEstado: function (data, params, estado, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpDepartamento/getListaDepartamentosByEstado/' + estado);
            connectServer(_self, successCallback, failureCallback);
        },
        getListErpAplicanteByIdDepartamento: function (data, params, idDepartamento, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpAplicante/getListErpAplicanteByIdDepartamento/' + idDepartamento);
            connectServer(_self, successCallback, failureCallback);
        },
        getAplicanteByIdDepartamento: function (data, params, idDepartamento, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpAplicante/getListErpAplicanteByIdDepartamento/' + idDepartamento);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaDepartamentos: function (data, params, estado, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpDepartamento/getListaDepartamentosByEstado/' + estado);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaTipoTransaccionesFactura: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoTransaccionFactura');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaTipoCompras: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getListParTipoCompra');
            connectServer(_self, successCallback, failureCallback);
        },
        getParListaDocumentosFiscales: function (data, params, grupo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoDocumentoMercantilByGrupo/' + grupo);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaProveedores: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getListProveedorCliente');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaRetencion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cppRetencion/put');
            connectServer(_self, successCallback, failureCallback);
        },
        verificaSiProveedorClienteNoEstaAsociado: function (data, params, idProveedorCliente, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/verificaSiProveedorClienteNoEstaAsociado/' + idProveedorCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        deleteProveedorCliente: function (data, params, idProveedorCliente, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cppProveedorCliente/deleteProveedorCliente/' + idProveedorCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        getNotaDebitoCreditoValidasByMonthyYear: function (data, params, month, year, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpNotaCreditoDebito/getNotaDebitoCreditoValidasByMonthyYear/' + month + '/' + year);
            connectServer(_self, successCallback, failureCallback);
        },
        getLibroDeCompras: function (data, params, month, year, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getLibroDeCompras/' + month + '/' + year);
            connectServer(_self, successCallback, failureCallback);
        },
        getListParTipoAplicacionRetencion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getListParTipoAplicacionRetencion');
            connectServer(_self, successCallback, failureCallback);
        },
        getListProveedores: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getCppProveedorClienteParaBancarizar');
            connectServer(_self, successCallback, failureCallback);
        },
        getDocPorBancarizarCompras: function (data, params, idProveedorCliente, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getFacturaRetencionParaBancarizacion/' + idProveedorCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaPagoBancarizadoCompras: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/documentoPago/putDocumentoPagoFacturasRetencionPojo');
            connectServer(_self, successCallback, failureCallback);
        },
        editFacturaRetencion: function (data, params,idFacturaRetencion,tipoDocumentoMercantil,server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/erpFactura/noBancarizarFacturaRetencion/'+idFacturaRetencion+'/'+tipoDocumentoMercantil);
            connectServer(_self, successCallback, failureCallback);
        },
        getLibroBancarizacionCompras: function (data, params,mes,anio,server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getLibroDeBancarizacionPorCompras/'+mes+'/'+anio);
            connectServer(_self, successCallback, failureCallback);
        },
        getParTipoTransaccionRetencion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoTransaccionRetencion');
            connectServer(_self, successCallback, failureCallback);
        },
        importaExcelFacturasBancariasXls: function (file, typeFile, fileName, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', {}, {}, server, '/import/importaExcelFacturasBancariasXls/xls');
            connectServer(_self, successCallback, failureCallback, false, file, typeFile, fileName);
        },
        getParModalidadTransaccion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParModalidadTransaccion');
            connectServer(_self, successCallback, failureCallback);
        },
        verificaExistenciaDeDatosAlicuota: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/verificaExistenciaDeDatosAlicuota');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaSenapiAll: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
                setData(_self, 'GET', data, params, server, '/test/get');
            connectServer(_self, successCallback, failureCallback);
        }
    };

    return new cxpService();
});


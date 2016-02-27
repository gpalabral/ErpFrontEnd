'use strict';

app.factory('cxcService', function (Server, appConfig, serverConf) {
    var connectServer = function (self, success, failure, secure, file, fileType, fileName) {
        if (file) {
            self.server.httpFileRequest(secure, file, fileType, fileName).then(function (response) {
                success ? success(response) : null;
            }, function (response) {
                failure ? failure(response) : null;
            });
        } else {
            self.server.httpRequest(secure).then(function (response) {
                success ? success(response) : null;
            }, function (response) {
                failure ? failure(response) : null;
            });
        }
    };

    var setData = function (self, method, data, params, server, url) {
        self.server.setMethod(method);
        self.server.setData(data);
        self.server.setParams(params);
        self.server.setServer(server);
        self.server.setUrl(url);
    };

    var cxcService = function () {
        Server.setUrl('/rest/cppgrupo/get');
        this.server = Server;
    };

    cxcService.prototype = {
        // place to services
        getSucursalArbol: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcsucursal/getSucursalArbol');
            connectServer(_self, successCallback, failureCallback);
        }
        ,
        getParDepartamento: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParDepartamento');
            connectServer(_self, successCallback, failureCallback);
        }
        ,
        getParMunicipio: function (data, params, codigoDepartamento, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParMunicipio/' + codigoDepartamento);
            connectServer(_self, successCallback, failureCallback);
        }
        ,
        getCuentaPorID: function (data, params, idEntidad, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppgrupo/getCntEntidadById/' + idEntidad);
            connectServer(_self, successCallback, failureCallback);
        }
        ,
        adicionaSucursal: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cpcsucursal/put');
            connectServer(_self, successCallback, failureCallback);
        },
        getParLocalizacion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParLocalizacion');
            connectServer(_self, successCallback, failureCallback);
        },
        getNumeroSucursal: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, params, server, '/cpcsucursal/getNumeroSucursal');
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcSucursalByIdSucursal: function (data, params, idSucursal, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcsucursal/getCpcSucursalByIdSucursal/' + idSucursal);
            connectServer(_self, successCallback, failureCallback);
        },
        modificaSucursal: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cpcsucursal/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        getSucursalesDosificacion: function (data, params, caracteristicaEspecial, estadoProceso, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcsucursal/getSucursalesDosificacion/' + caracteristicaEspecial + '/' + estadoProceso);
            connectServer(_self, successCallback, failureCallback);
        },
        getDosificacionPorIdSucursal: function (data, params, idSucursal, parEstadoProceso, parCaracteristicaEspecial, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getCpcDosificacionesPorEstadoyCaracEsp/' + idSucursal + '/' + parEstadoProceso + '/' + parCaracteristicaEspecial);
            connectServer(_self, successCallback, failureCallback);
        },
        getCasaMatriz: function (data, params, numeroSucursal, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcsucursal/getSucursal/' + numeroSucursal);
            connectServer(_self, successCallback, failureCallback);
        },
        getTreeItems: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getItemArbol');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaClientes: function (data, params, tipoRegistro, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getProveedorClienteBusquedaPojo/' + tipoRegistro);
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcDosificacionesArbolPorSucursal: function (data, params, idSucursal, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getCpcDosificacionesArbolPorSucursal/' + idSucursal);
            connectServer(_self, successCallback, failureCallback);
        },
        getParActividadEconomica: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParActividadEconomica');
            connectServer(_self, successCallback, failureCallback);
        },
        getParCaracteristicaEspecial: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParCaracteristicaEspecialParaFacturacion');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaDosificacion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cpcdosificaciones/put');
            connectServer(_self, successCallback, failureCallback);
        }
        ,
        getServiciosArbol: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getItemArbol');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaServicio: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cpcitem/put');
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcItemByIdItem: function (data, params, idItem, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getItem/' + idItem);
            connectServer(_self, successCallback, failureCallback);
        },
        modificaSservicio: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cpcitem/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        getNumeroFacturaPorIdDosificacion: function (data, params, idDosificacion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cntComprobante/getNumeroFactura/' + idDosificacion);
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcDosificacionesPorId: function (data, params, idDosificacion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getCpcDosificacionesPorId/' + idDosificacion);
            connectServer(_self, successCallback, failureCallback);
        },
        modificaDosificacion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cpcdosificaciones/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        getCambioDeMoneda: function (data, params, montoMoneda, montoTipoDeCambio, tipoMoneda, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getCambioDeMoneda/' + montoMoneda + "/" + montoTipoDeCambio + "/" + tipoMoneda);
            connectServer(_self, successCallback, failureCallback);
        },
        getCodigoControlFactura: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, params, server, '/erpFactura/generaCodigoDeControl');
            //setData(_self, 'POST', data, params, server, '/erpFactura/generaCodigoDeControl');
            connectServer(_self, successCallback, failureCallback, true);
        },
        getSucursalesAll: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcsucursal/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getContratoArbol: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpccontrato/getContratoArbol');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaContrato: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cpccontrato/put');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaFacturaEmitida: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/erpFactura/putCpcFacturaEmitidaCpcDetalleFacturaPojo');
            connectServer(_self, successCallback, failureCallback);
        },
        guardaCpcContratoPojo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cpccontrato/putCpcContratoPojo');
            connectServer(_self, successCallback, failureCallback);
        },
        /*getDosificacionPreestablecida: function (data, params, server, successCallback, failureCallback) {
         var _self = this;
         setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getCpcDosificacionesPreEstablecido');
         connectServer(_self, successCallback, failureCallback);
         },*/
        getCpcContratoByIdContrato: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpccontrato/getCpcContratoPorId/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcContratoServicio: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getCpcItemByIdContrato/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        getCobrosPorFacturar: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcPagoContrato/getCobrosPorFacturarPorContrato/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        getFacturasParaBancarizar: function (data, params, idCliente, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getCpcFacturaEmitidaByCliente/' + idCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        getPdf: function (server, type, idFacturaEmitida, success, error) {
            var host,
                context,
                url = '/reportes/getFacturaComputarizada/';
            if (type === 'ExportacionNotaDebitoCredito') {
                url = '/reportes/getNotaCreditoDebito/';
            } else if (type === 'exportacion') {
                url = '/reportes/getFacturaExportacion/';
            } else if (type === 'facturaComputarizada') {
                url = '/reportes/getFacturaComputarizada/';
            }
            if (server === serverConf.ERPCONTA_WS) {
                host = appConfig.host_1;
                context = appConfig.context1;
            } else if (self.server === serverConf.ERPCONTA) {
                host = appConfig.host_2;
                context = appConfig.context2;
            } else if (self.server === serverConf.TEST_SERVER) {
                host = appConfig.host_3;
                context = appConfig.context3;
            }

            try {
                success(host + context + url + idFacturaEmitida);
            } catch (e) {
                error('error trying to get pdf');
            }


        },
        getParTipoDocumentoPago: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoDocumentoPago');
            connectServer(_self, successCallback, failureCallback);
        },
        getParTipoMoneda: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoMoneda');
            connectServer(_self, successCallback, failureCallback);
        },
        getBancos: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcbanco/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getBancoById: function (data, params, idBanco, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcbanco/getCpcBanco/' + idBanco);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaCpcDosificacionByIdDosificacion: function (data, params, idSucursal, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getListaCpcDosificacionByIdDosificacion/' + idSucursal);
            connectServer(_self, successCallback, failureCallback);
        },
        getVerificaExistenciaPreEstablecidoParaDosificacionesByIdSucursal: function (data, params, idSucursal, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getVerificaExistenciaPreEstablecidoParaDosificacionesByIdSucursal/' + idSucursal);
            connectServer(_self, successCallback, failureCallback);
        },
        getFacturaById: function (data, params, idFacturaEmitida, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getFacturaEmitidaNombreConcatenadoById/' + idFacturaEmitida);
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaPagoBancarizado: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/documentoPago/putDocumentoPagoFacturasPojo');
            connectServer(_self, successCallback, failureCallback);
        },
        getNumeroPago: function (data, params, idFacturaEmitida, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, params, server, '/documentoPago/getNumeroPago/' + idFacturaEmitida);
            connectServer(_self, successCallback, failureCallback);
        },
        getPagoContratoById: function (data, params, idPagoContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcPagoContrato/getCpcPagoContratoConProveedorClientePorIdPagoContrato/' + idPagoContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        modificaPagoContratoFacturado: function (data, params, idPagoContrato, idFacturaEmitida, montoPagado, montoPagadoSegMoneda, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cpcPagoContrato/actualizaPagoContrato/' + idPagoContrato + '/' + idFacturaEmitida + '/' + montoPagado + '/' + montoPagadoSegMoneda);
            connectServer(_self, successCallback, failureCallback);
        },
        getLibroVentas: function (data, params, mes, anio, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getLibroDeVentas/' + mes + '/' + anio);
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcPagoContratoPorIdContrato: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcPagoContrato/getCpcPagoContratoPorIdContrato/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        sumaMontoServicios: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, params, server, '/cpcitem/sumaMontoItem');
            connectServer(_self, successCallback, failureCallback);
        },
        sumaMontoPagoContrato: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, params, server, '/cpcPagoContrato/sumaMontoPagoContrato');
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcSucursalPreEstablecido: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcsucursal/getCpcSucursalPreEstablecido');
            connectServer(_self, successCallback, failureCallback);
        },
        modificaPagoContrato: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cpcPagoContrato/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        actualizaPagosContratoEnMora: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/cpcPagoContrato/actualizaPagosContratoEnMora');
            connectServer(_self, successCallback, failureCallback);
        },
        getTreeContratoCliente: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpccontrato/getContratoProveedorClienteArbol');
            connectServer(_self, successCallback, failureCallback);
        },
        getTreeItemPorContrato: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getContratoItemArbolByIdContrato/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        getItemsPorContrato: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getCpcItemByIdContrato/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        }, getCpcContratoItem: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpccontratoitem/getCpcContratoItem/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        getDosificacionManual: function (data, params, idSucursal, modalidad, estadoProceso, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getCpcDosificaciones/' + idSucursal + '/' + modalidad + '/' + estadoProceso);
            connectServer(_self, successCallback, failureCallback);
        },
        emisionFacturaExcelImport: function (file, typeFile, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', {}, {}, server, '/import/upload/xls');
            connectServer(_self, successCallback, failureCallback, false, file, typeFile);
        },
        excelImport: function (file, fileType, server, data, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, {}, server, '/import/upload/xls');
            connectServer(_self, successCallback, failureCallback, false, file, fileType);
        },
        verificaTiempoDisponible: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, params, server, '/cpcPagoContrato/verificaTiempoDisponible');
            connectServer(_self, successCallback, failureCallback);
        },
        getParMunicipioPorCodigoDepartamento: function (data, params, codigoDepartamento, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParMunicipio/' + codigoDepartamento);
            connectServer(_self, successCallback, failureCallback);
        },
        getParMes: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParMes');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaFacturasEmitidas: function (data, params, listaIdFacturaEmitida, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getCpcFacturaEmitida/' + listaIdFacturaEmitida);
            connectServer(_self, successCallback, failureCallback);
        },
        getDosificaciones: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaCpcDosificacionByIdSucursalAndCodigoDocMercantil: function (data, params, idSucursal, codigoDocMercantil, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getListaCpcDosificacionByIdSucursalAndCodigoDocMercantil/' + idSucursal + "/" + codigoDocMercantil);
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcNotaDebitoCreditoByMonthAndYear: function (data, params, mes, anio, codigoDocMercantil, estadoPago, codigoEstadoFactura, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getCpcNotaDebitoCreditoByMonthAndYear/' + mes + '/' + anio + '/' + codigoDocMercantil + '/' + estadoPago + '/' + codigoEstadoFactura);
            connectServer(_self, successCallback, failureCallback);
        },
        getCpcDetalleFacturaByIdFacturaEmitida: function (data, params, idFacturaEmitida, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpDetalleFactura/getCpcDetalleFacturaByIdFacturaEmitida/' + idFacturaEmitida);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaFacturas: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getCpcFacturaEmitida');
            connectServer(_self, successCallback, failureCallback);
        },
        getFacturaEmitidaById: function (data, params, idFacturaEmitida, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getCpcFacturaEmitidaById/' + idFacturaEmitida);
            connectServer(_self, successCallback, failureCallback);
        },
        getContratoArbolFiltro: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpccontrato/getContratoArbolFiltro');
            connectServer(_self, successCallback, failureCallback);
        },
        getDetalleFacturaByIdFacturaEmitida: function (data, params, idFacturaEmitida, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpDetalleFactura/getCpcDetalleFacturaByIdFacturaEmitida/' + idFacturaEmitida);
            connectServer(_self, successCallback, failureCallback);
        },
        editFacturaEmitida: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/erpFactura/edit');
            connectServer(_self, successCallback, failureCallback);
        },
        getLibroBancarizacionVentas: function (data, params, mes, anio, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getLibroDeBancarizacionPorVentas/' + mes + '/' + anio);
            connectServer(_self, successCallback, failureCallback);
        },
        getParBanco: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParBanco');
            connectServer(_self, successCallback, failureCallback);
        },
        getParValorByCodigoGenerico: function (data, params, codigo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParValorByCodigo/' + codigo);
            connectServer(_self, successCallback, failureCallback);
        },
        getCuentaBancariaPojoByIdProveedorCliente: function (data, params, idProveedorCliente, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cuentaBancaria/getCuentaBancariaPojoByIdProveedorCliente/' + idProveedorCliente);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaCtaBancariaEmpresa: function (data, params, propietario, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cuentaBancaria/getCuentaBancariaPojoByEmpresa/' + propietario);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaActividadEconomica: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcActividadEconomica/get');
            connectServer(_self, successCallback, failureCallback);
        },
        adicionaActividadEconomica: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/cpcActividadEconomica/put');
            connectServer(_self, successCallback, failureCallback);
        },
        getActividadesEconomicasWithDosificacion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcActividadEconomica/getActividadesEconomicasWithDosificacion');
            connectServer(_self, successCallback, failureCallback);
        },
        getCuentaBancariaPojoByEmpresa: function (data, params, propietarioCuenta, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cuentaBancaria/getCuentaBancariaPojoByEmpresa/' + propietarioCuenta);
            connectServer(_self, successCallback, failureCallback);
        },
        getActividadEconomicaByIdContrato: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcActividadEconomica/getActividadEconomicaByIdContrato/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        getVerificaSiCodigoExiste: function (data, params, codigo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcActividadEconomica/getVerificaSiCodigoExiste/' + codigo);
            connectServer(_self, successCallback, failureCallback);
        },
        getDosificacionesByContrato: function (data, params, idSucursal, idContrato, parEstadoProceso, parCaracEsp, parModFact, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/getCpcDosificacionesPorIdContratoIdSucurEstProcCaracEspModFact/' + idSucursal + '/' + idContrato + '/' + parEstadoProceso + '/' + parCaracEsp + '/' + parModFact);
            connectServer(_self, successCallback, failureCallback);
        },
        conciliacionExcelImport: function (file, typeFile, fileName, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', {}, {}, server, '/import/conciliacion/xls');
            connectServer(_self, successCallback, failureCallback, false, file, typeFile, fileName);
        },
        getCpcItemList: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcitem/getCpcItemList');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaClienteParaBancarizar: function (data, params, tipoRegistro, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cppProveedorCliente/getProveedorClienteParaBancarizar/' + tipoRegistro);
            connectServer(_self, successCallback, failureCallback);
        },
        putErpNotaCreditoDebitoCpcDetalleFacturaPojo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/erpNotaCreditoDebito/putErpNotaCreditoDebitoCpcDetalleFacturaPojo');
            connectServer(_self, successCallback, failureCallback);
        },
        getNumeroNotaCreditoDebito: function (data, params, idDosificacion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpNotaCreditoDebito/getNumeroNotaCreditoDebito/' + idDosificacion);
            connectServer(_self, successCallback, failureCallback);
        },
        getErpNotaCreditoDebitoByIdFactura: function (data, params, idFactura, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpNotaCreditoDebito/getErpNotaCreditoDebitoByIdFactura/' + idFactura);
            connectServer(_self, successCallback, failureCallback);
        },
        getErpNotaCreditoDebito: function (data, params, idNotaCreditoDebito, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpNotaCreditoDebito/getErpNotaCreditoDebito/' + idNotaCreditoDebito);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaReporteVentas: function (data, params, month, year, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getLibroDeVentasHuawei/' + month + '/' + year);
            connectServer(_self, successCallback, failureCallback);
        },
        getListReporteVentasInterval: function (data, params, fechaInicial, fechaFinal, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getReporteControlDeIngresos/' + fechaInicial + '/' + fechaFinal);
            connectServer(_self, successCallback, failureCallback);
        },
        getListaGestionesFacturadas: function (data, params, modulo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/erpFactura/getGestionesFacturadas/' + modulo);
            connectServer(_self, successCallback, failureCallback);
        },
        getXML: function (idFacturaEmitida, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', {}, {}, server, '/erpFactura/getGeneraXML/' + idFacturaEmitida);
            connectServer(_self, successCallback, failureCallback);
        },
        putReferenciacionContable: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/erpFactura/putReferenciacionContable');
            connectServer(_self, successCallback, failureCallback);
        },
        getModificaContrato: function (data, params, idContrato, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpccontrato/getModificaContrato/' + idContrato);
            connectServer(_self, successCallback, failureCallback);
        },
        getParTipoHito: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoHito');
            connectServer(_self, successCallback, failureCallback);
        },
        importaExcelFacturasBancariasXls: function (file, typeFile, fileName, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', {}, {}, server, '/import/importaExcelFacturasBancariasXls/xls');
            connectServer(_self, successCallback, failureCallback, false, file, typeFile, fileName);
        },
        obtieneConcatenaModalidadFacturacionPorActividadEconomica: function (data, params, idActividadEconomica, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cpcdosificaciones/obtieneConcatenaModalidadFacturacionPorActividadEconomica/' + idActividadEconomica);
            connectServer(_self, successCallback, failureCallback);
        },
        putFacturasBancarias: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/erpFactura/putFacturasBancarias');
            connectServer(_self, successCallback, failureCallback);
        },
        getListaGestionesBancarizadas: function (data,params,modulo,server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/documentoPago/getGestionesBancarizadasPorModulo/'+modulo);
            connectServer(_self, successCallback, failureCallback);
        }
    };

    return new cxcService();
})
;


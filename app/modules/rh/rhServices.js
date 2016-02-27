'use strict';

app.factory('rhServices', function (Server) {
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

    var rhServices = function () {
        Server.setUrl('/rest/cppgrupo/get');
        this.server = Server;
    };

    rhServices.prototype = {
        // place to services
        getDescuentosPorPeriodo: function (data, params, idPeriodoGestion, tipoEntidad, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhWS/generaRegistrosPorPeriodo/' + idPeriodoGestion + '/' + tipoEntidad);
            connectServer(_self, successCallback, failureCallback);
        },
        excelImport: function (file, fileType, server, data, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, {}, server, '/rhImport/importacionRRHH/xls');
            connectServer(_self, successCallback, failureCallback, false, file, fileType);
        },
        adicionaEmpleado: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhEmpleado/put');
            connectServer(_self, successCallback, failureCallback);
        },
        listaRhEmpleado: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhEmpleado/listaRhEmpleado');
            connectServer(_self, successCallback, failureCallback);
        },
        getParEstadoCivil: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParEstadoCivil');
            connectServer(_self, successCallback, failureCallback);
        },
        obtieneCodigo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhEmpleado/obtieneCodigo');
            connectServer(_self, successCallback, failureCallback);
        },
        getRhEmpleadoByIdEmpleado: function (data, params, idEmpleado, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhEmpleado/getRhEmpleadoByIdEmpleado/' + idEmpleado);
            connectServer(_self, successCallback, failureCallback);
        },
        modificaRhEmpleado: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhEmpleado/modificaRhEmpleado');
            connectServer(_self, successCallback, failureCallback);
        },
        getParTipoContratoEmpleado: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParTipoContratoEmpleado');
            connectServer(_self, successCallback, failureCallback);
        },
        listaRhCargo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhCargo/listaRhCargo');
            connectServer(_self, successCallback, failureCallback);
        },
        listaSeccionesPorIdDepartamento: function (data, params, idDepartamento, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhSeccion/listaSeccionesPorIdDepartamento/' + idDepartamento);
            connectServer(_self, successCallback, failureCallback);
        },
        guardaCargo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhCargo/put');
            connectServer(_self, successCallback, failureCallback);
        },
        verificaExistenciaCodigoRhCargo: function (data, params, codigo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhCargo/verificaExistenciaCodigoRhCargo/' + codigo);
            connectServer(_self, successCallback, failureCallback);
        },
        getParCondicionPension: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/parvalor/getParCondicionPension');
            connectServer(_self, successCallback, failureCallback);
        },
        guardaEmpleadoCargo: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhEmpleadoCargo/put');
            connectServer(_self, successCallback, failureCallback);
        },
        obtieneEmpleadoCargoPorIdEmpleado: function (data, params, idEmpleado, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhEmpleadoCargo/obtieneEmpleadoCargoPorIdEmpleado/' + idEmpleado);
            connectServer(_self, successCallback, failureCallback);
        },
        existeGestion: function (data, params, periodo, gestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhPeriodoGestion/existeGestion/' + periodo + "/" + gestion);
            connectServer(_self, successCallback, failureCallback);
        },
        obtieneRegistroPorPeriodoGestion: function (data, params, periodo, gestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhPeriodoGestion/obtieneRegistroPorPeriodoGestion/' + periodo + "/" + gestion);
            connectServer(_self, successCallback, failureCallback);
        },
        guardaPeriodoGestion: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhPeriodoGestion/put');
            connectServer(_self, successCallback, failureCallback);
        },
        persistRhParametrosDatosGenearles: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhParametros/persistRhParametrosDatosGenearles');
            connectServer(_self, successCallback, failureCallback);
        },
        obtieneRhParametrosPorPeriodoGestion: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhParametros/obtieneRhParametrosPorPeriodoGestion/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        persistModificaRhParametrosPatronalesAndLaborales: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhParametros/persistModificaRhParametrosPatronalesAndLaborales');
            connectServer(_self, successCallback, failureCallback);
        },
        modificaDatosEmpleadoAndDatosLaborales: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhEmpleadoCargo/modificaRhEmpleadoCargo');
            connectServer(_self, successCallback, failureCallback);
        },
        modificarDescuentos: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhDescuentoEmpleadoCargo/modificaRhDescuentoEmpleadoCargo/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        listaRhDescuento: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhDescuento/listaRhDescuento');
            connectServer(_self, successCallback, failureCallback);
        },
        listaRhCriterioDeIngreso: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhCriterioDeIngreso/listaRhCriterioDeIngreso');
            connectServer(_self, successCallback, failureCallback);
        },
        guardaRhDescuento: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhDescuento/persistRhDescuento/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        guardaRhCriterioDeIngreso: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhCriterioDeIngreso/putRhCriterioDeIngreso/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        verificaExistenciaCodigoDescuento: function (data, params, codigo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhDescuento/verificaExistenciaCodigoDescuento/' + codigo);
            connectServer(_self, successCallback, failureCallback);
        },
        verificaExistenciaCodigoCriterioDeIngreso: function (data, params, codigo, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhCriterioDeIngreso/verificaExistenciaCodigoCriterioDeIngreso/' + codigo);
            connectServer(_self, successCallback, failureCallback);
        },
        obtienePeriodoGestionUltimoVigente: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhPeriodoGestion/obtienePeriodoGestionUltimoVigente');
            connectServer(_self, successCallback, failureCallback);
        },
        persistRhPeriodoGestionCompleto: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhPeriodoGestion/persistRhPeriodoGestionCompleto');
            connectServer(_self, successCallback, failureCallback);
        },
        getVariacionesPorPeriodo: function (data, params, idPeriodoGestion, tipoEntidad, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhWS/generaRegistrosPorPeriodo/' + idPeriodoGestion + '/' + tipoEntidad);
            connectServer(_self, successCallback, failureCallback);
        },
        getRegistrosPorPeriodo: function (data, params, idPeriodoGestion, tipoEntidad, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhWS/generaRegistrosPorPeriodo/' + idPeriodoGestion + '/' + tipoEntidad);
            connectServer(_self, successCallback, failureCallback);
        },
        modificaRhVariacion: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhVariacion/modificaRhVariacion/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        modificarIngresos: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhCriterioDeIngresoEmpleadoCargo/modificaCriterioDeIngresoEmpleadoCargo/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        modificaRhRcIva: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhRcIva/modificaRhRcIva');
            connectServer(_self, successCallback, failureCallback);
        },
        modificaRhDescuento: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhDescuento/modificaRhDescuento');
            connectServer(_self, successCallback, failureCallback);
        },
        modificaRhCriterioDeIngreso: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhCriterioDeIngreso/modificaRhCriterioDeIngreso');
            connectServer(_self, successCallback, failureCallback);
        },
        modificaRhPrimas: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhPrimas/modificaRhPrimas');
            connectServer(_self, successCallback, failureCallback);
        },
        listaRhEmpleadoConCargoAsignado: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhEmpleado/listaRhEmpleadoConCargoAsignado');
            connectServer(_self, successCallback, failureCallback);
        },
        guardarPlanillaSueldos: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhPlanillaSueldos/guardaPlanillaSueldos');
            connectServer(_self, successCallback, failureCallback);
        },
        guardarPlanillaImpositiva: function (data, params, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PUT', data, params, server, '/rhPlanillaImpositiva/guardaPlanillaImpositiva');
            connectServer(_self, successCallback, failureCallback);
        },
        modificaRhEmpleadoCargoMasTablasRelacionadas: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhEmpleadoCargo/modificaRhEmpleadoCargoMasTablasRelacionadas/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        verificarPlanilla: function (idPeriodoGestion, tipoEntidad, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', {}, {}, server, '/rhWS/existeLiquidacion/' + idPeriodoGestion + '/' + tipoEntidad);
            connectServer(_self, successCallback, failureCallback);
        },
        eliminacionPlanilla: function (idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'DELETE', {}, {}, server, '/rhWS/liquidacion/eliminarPlanillas/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        getModulos: function (server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', {}, {}, server, '/admmodulo/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getRoles: function (server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', {}, {}, server, '/admrol/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getPermisos: function (server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', {}, {}, server, '/admpermiso/get');
            connectServer(_self, successCallback, failureCallback);
        },
        getPermisosPorRol: function (idRol, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', {}, {}, server, '/admpermiso/getPermiso/' + idRol);
            connectServer(_self, successCallback, failureCallback);
        },
        listaRhEmpleadoPorPeriodo: function (data, params, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhEmpleado/listaRhEmpleadoPorPeriodo/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        verificaDescuentosPorIdDescuentoAndIdPeriodoParaEliminar: function (data, params, idDescuento, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhDescuento/verificaDescuentosPorIdDescuentoAndIdPeriodoParaEliminar/' + idDescuento + "/" + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        deleteRhDescuento: function (data, params, idDescuento, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhDescuento/deleteRhDescuento/' + idDescuento);
            connectServer(_self, successCallback, failureCallback);
        },
        verificaCriterioDeIngresoEmpleadoCargoPorIdDescuentoAndIdPeriodoParaEliminar: function (data, params, idCriterioDeIngreso, idPeriodoGestion, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhCriterioDeIngreso/verificaCriterioDeIngresoEmpleadoCargoPorIdDescuentoAndIdPeriodoParaEliminar/' + idCriterioDeIngreso + "/" + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        },
        deleteRhCriterioDeIngreso: function (data, params, idCriterioDeIngreso, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'PATCH', data, params, server, '/rhCriterioDeIngreso/deleteRhCriterioDeIngreso/' + idCriterioDeIngreso);
            connectServer(_self, successCallback, failureCallback);
        },
        getTransferencias: function (data, params, idPeriodoGestion,server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/rhPlanillaSueldos/listaTransferenciasBancarias/' + idPeriodoGestion);
            connectServer(_self, successCallback, failureCallback);
        }
    };

    return new rhServices();
});



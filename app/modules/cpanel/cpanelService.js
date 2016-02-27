'use strict';

app.factory('cpanelService', function (Server) {
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

	var cpanelService = function () {
		Server.setUrl('/rest/cppgrupo/get');
		this.server = Server;
	};

	cpanelService.prototype = {
		// place to services
		adicionaUsuarioPersona: function (data, params, server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'PUT', data, params, server, '/admusuario/putAdmUsuarioAdmPersona');
			connectServer(_self, successCallback, failureCallback);
		},getListParTipoDocumento: function (data, params, server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/parvalor/getParTipoDocumento');
			connectServer(_self, successCallback, failureCallback);
		},getListParEstadoUsuario: function (data, params, server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/parvalor/getParEstadoUsuario');
			connectServer(_self, successCallback, failureCallback);
		},getUsuarioPersona: function (data, params, server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/admusuario/getAll');
			connectServer(_self, successCallback, failureCallback);
		},getUsuarioById: function (data, params,idUsuario,server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/admusuario/getById/'+idUsuario);
			connectServer(_self, successCallback, failureCallback);
		},getRolesNoAsignadosPorUsuarioModulo: function (data, params,idUsuario,idModulo,server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/admrol/getAdmUsuarioSinRoles/'+idUsuario+'/'+idModulo);
			connectServer(_self, successCallback, failureCallback);
		},getRolesAsignadosPorUsuarioModulo: function (data, params,idUsuario,idModulo,server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/admrol/getUsuarioRol/'+idUsuario+'/'+idModulo);
			connectServer(_self, successCallback, failureCallback);
		},getListaModulosPorUsuario: function (data, params,idUsuario,server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/admmodulo/getAdmModuloByAdmUsuario/'+idUsuario);
			connectServer(_self, successCallback, failureCallback);
		},getPermisosPorIdRol: function (data, params,idRol,server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/admpermiso/getPermiso/'+idRol);
			connectServer(_self, successCallback, failureCallback);
		},delUsuarioPersona: function (data, params,idUsuario,server, successCallback, failureCallback) {
				var _self = this;
				setData(_self, 'PATCH', data, params, server, '/admusuario/removeAdmUsuarioAdmPersona/'+idUsuario);
				connectServer(_self, successCallback, failureCallback);
		},editUsuarioPersona: function (data, params,server, successCallback, failureCallback) {
				var _self = this;
				setData(_self, 'PATCH', data, params, server, '/admusuario/editAdmUsuarioAdmPersona');
				connectServer(_self, successCallback, failureCallback);
		},
		addEmpresa: function (data, params, server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'PUT', data, params, server, '/cliempresa/put');
			connectServer(_self, successCallback, failureCallback);
		},verificaContrasenia: function (data, params,server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'POST', data, params, server, '/admusuario/verificaContrasenia');
            connectServer(_self, successCallback, failureCallback,true);
        },
		getDatosEmpresa: function(data, params, server, successCallback, failureCallback) {
			var _self = this;
			setData(_self, 'GET', data, params, server, '/cliempresa/get');
			connectServer(_self, successCallback, failureCallback);
		},
        getDatosEmpresaById: function(data, params,idEmpresa, server, successCallback, failureCallback) {
            var _self = this;
            setData(_self, 'GET', data, params, server, '/cliempresa/getById/'+idEmpresa);
            connectServer(_self, successCallback, failureCallback);
        }
	};

	return new cpanelService();
});



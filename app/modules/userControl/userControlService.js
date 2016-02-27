'use strict';

app.factory('userControlService', function (Server, localStorageService) {

	var connectServer = function(self, success, failure, secure){
		self.server.httpRequest(secure).then( function (response) {
			success?success(response):null;
		}, function ( response ) {
			failure?failure(response):null;
		});
	};

	var userControlService = function () {
		Server.setUrl('');
		this.server = Server;
	};

	var setData = function (self, method, data, params, server, url) {
		self.server.setMethod(method);
		self.server.setData(data);
		self.server.setParams(params);
		self.server.setServer(server);
		self.server.setUrl(url);
	};


	userControlService.prototype = {
		login : function (data, server, method, successCallback, failureCallback) {
			var _self = this;
			setData(_self,'POST',data,{}, server,'/admusuario/authenticate');
			connectServer(_self,successCallback,failureCallback, true);
		},
		logout : function (server, method, successCallback, failureCallback) {
			localStorageService.clearAll();
			successCallback('session ended');
		},
		admusuarioGetAll : function (data, params, server, method, successCallback, failureCallback) {
			var _self = this;
			setData(_self,'GET', data, params, server,'/admusuario/getAll');
			connectServer(_self,successCallback,failureCallback);
		},
		verificaSesion: function (data, params, server, successCallback, failureCallback) {
			var _self = this;
			setData(_self,'POST', data, params, server,'/admusuario/validate/token');
			connectServer(_self,successCallback,failureCallback, true);
		}
	};

	return new userControlService();
});

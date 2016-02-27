/**
 * Created by VLADY on 17/01/2015.
 */
app.factory('contabilidadService', function (Server) {
  var connectServer = function(self, success, failure, secure){
    self.server.httpRequest(secure).then( function (response) {
      success?success(response):null;
    }, function ( response ) {
      failure?failure(response):null;
    });
  };

  var setData = function(self,method,data,params,server,url){
    self.server.setMethod(method);
    self.server.setData(data);
    self.server.setParams(params);
    self.server.setServer(server);
    self.server.setUrl(url);
  };

  var contaService = function () {
    Server.setUrl('');
    this.server = Server;
  };

  contaService.prototype = {
    getList : function (data,params,server,successCallback,failureCallback) {
      var _self = this;
      setData(_self,'GET',data,params,server,'/contabilidad/planctas');
      connectServer(_self,successCallback,failureCallback);
    }
  };

  return new contaService();
});

'use strict';

angular.module('myApp').factory('formDataObject', function() {
  return function(data) {
    var fd = new FormData();
    angular.forEach(data, function(value, key) {
      fd.append(key, value);
    });
    return fd;
  };
});

angular.module('myApp')
  .factory('Server', ['$http','$q','$log', 'appConfig','serverConf','localStorageService','Upload','formDataObject',
    function ($http, $q, $log, appConfig,serverConf,localStorageService,Upload,formDataObject) {
      var Server = function () {
        this.service = '';
        this.headers = '';
        this.method = '';  // GET, PUT, POST, PATCH, DELETE
        this.params = '';  // GET
        this.data = '';    // PUT POST PATCH
        this.host = '';
        this.url = '';    // host + context + '/rest/cppgrupo/get'
        this.context = '';
        this.server = '';
      };

      Server.prototype = {
        setHost : function (host) {
          this.host = host;
        },
        getHost : function () {
          return host;
        },
        setContext : function (context) {
          this.context = context;
        },
        getContext : function () {
          return context;
        },
        setService : function (service) {
          this.service = service;
        },
        getService : function () {
          return this.service;
        },
        setHeaders : function (headers) {
          // todo : set api_key in this view
          this.headers = headers;
        },
        getHeaders : function () {
          return this.headers;
        },
        setMethod : function (method) {
          this.method = method;
        },
        getMethod : function () {
          return this.method;
        },
        setData : function (data) {
          this.data = data;
        },
        getData : function () {
          return this.data;
        },
        setUrl : function (url) {
          this.url = url;
        },
        geturl : function () {
          return this.url;
        },
        setParams : function (params) {
          this.params = params;
        },
        getParams : function () {
          return this.params;
        },
        getServer : function () {
          return this.server;
        },
        setServer : function (server) {
          this.server = server;
        },
        initServer : function () {
          var _self = this;
          _self.setHost(appConfig.host_1);
          _self.setHeaders(appConfig.headers);
          _self.setContext(appConfig.context);
        }
      };

      Server.prototype.setServerToRequest = function () {
        var self = this;
        if(self.server === serverConf.ERPCONTA_WS ) {
          self.host = appConfig.host_1;
          self.context = appConfig.context1;
        } else if( self.server === serverConf.ERPCONTA ) {
          self.host = appConfig.host_2;
          self.context = appConfig.context2;
          self.params.token = '23498298'
        } else if( self.server === serverConf.TEST_SERVER ) {
          self.host = appConfig.host_3;
          self.context = appConfig.context3;
        } else if( self.server === serverConf.CPANEL_WS ){
          self.host = appConfig.host_3;
          self.context = appConfig.context3;
        }
      };


      Server.prototype.httpRequest = function(secure){
        var self = this;
        var deferred = $q.defer();

        self.setServerToRequest();

        var userToken = localStorageService.get('user')? localStorageService.get('user')['token'] : "";

        var headers = {
          token : userToken
        };

        if ( self.method === 'POST' && secure ) {
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if( self.method === 'DELETE' ) {
          headers['Content-Type'] = 'application/json'
        }

        $http({
          method: self.method,
          url:    self.host + self.context + self.url,
          params: self.params,
          data:   ( self.method === 'POST' && secure ) ? $.param(self.data) : self.data,
          headers: headers
        }).
          success(function (data,status,headers,config){
            localStorageService.set('signedInTS', new Date().getTime());
            deferred.resolve({data:data,status:status,headers:headers,config:config});
          }).
          error(function (data,status,headers,config){
            deferred.reject({data:data,status:status,headers:headers,config:config});
          });
        return deferred.promise;
      };

      Server.prototype.httpFileRequest = function (secure, file, fileType, fileName) {
        var self = this;
        var deferred = $q.defer();

        self.setServerToRequest();

        var userToken = localStorageService.get('user')? localStorageService.get('user')['token'] : "";

        var headers = {
          token : userToken
        };

        if ( self.method === 'POST' && secure ) {
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        //var deferred = $q.defer();
        /*$http({
          method: self.method,
          url: self.host + self.context + self.url,
          data: file,
          transformRequest: formDataObject,  // this sends your data to the formDataObject provider that we are defining below.
          headers: {'Content-Type': 'multipart/form-data'}
        }).
          success(function(data, status, headers, config){
            deferred.resolve(data);
          }).
          error(function(data, status, headers, config){
            deferred.reject(status);
          });*/
        //return deferred.promise;


        Upload.upload({
          method: self.method,
          url:    self.host + self.context + self.url,
          //url:    self.url,
          file: file,
          fields: self.data,
          fileFormDataName: fileName || 'uploadFile'
        }).progress(function (evt) {
          //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          //$scope.log = 'progress: ' + progressPercentage + '% ' +
          //  evt.config.file.name + '\n' + $scope.log;
        }).success(function (data, status, headers, config) {
          //$scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
          deferred.resolve({data:data,status:status,headers:headers,config:config});
        });
        return deferred.promise;
      };

      return new Server();
    }]);
